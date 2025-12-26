// frontend/src/pages/MultiProjectView.tsx
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMappedId } from "../repos/localRepo"; // adapte l'alias si besoin

import {
  listProjects,
  listTasks,
  updateTask,
  reorderTasks,
  createProject,
  deleteProject,
  deleteTask,
  updateProject,
  logout,
  type Project as ApiProject,
} from "@api";
import type { Task } from "@types/tasks";

import CreateTask from "@components/CreateTask";
import GanttChart, { GanttHandle } from "@features/gantt/components/GanttChart";
import TimeZoneSelector from "@features/gantt/components/TimeZoneSelector";
import BarHeightControl from "@features/gantt/components/BarHeightControl";
import GanttToolbar from "@features/gantt/components/GanttToolbar";

import {
  Paper,
  Stack,
  TextField,
  Button,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  CircularProgress,
  Alert,
  Collapse,
  Slider,
  Tooltip as MuiTooltip,
  Chip,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Box,
  AppBar,
  Toolbar,
  Drawer,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";

// ⚠️ important: chemin relatif (alias '@/...' à éviter si non configuré)
import { selectScale, setScale } from "@features/gantt/store/ganttUiSlice";

/* ----------------------------- Types locaux ----------------------------- */
interface Project {
  id: number;
  name: string;
  description?: string | null;
  horizon_months?: number | null;
  end_override?: string | null;
}

/* ----------------------------- Helpers dates ---------------------------- */
function toISODate(d: Date) {
  return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
    .toISOString()
    .slice(0, 10);
}
function parseISODate(s?: string | null) {
  if (!s) return null;
  const [y, m, d] = s.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(Date.UTC(y, m - 1, d));
}
function addMonthsUTC(date: Date, months: number) {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  d.setUTCMonth(d.getUTCMonth() + months);
  return d;
}

/* ============================== Composant =============================== */
export default function MultiProjectView() {
  /* ---------- Thème ---------- */
  const [themeMode, setThemeMode] = useState<"light" | "dark">(() => {
    try {
      const saved = localStorage.getItem("themeMode");
      if (saved === "dark" || saved === "light") return saved as "light" | "dark";
    } catch {}
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });
  const muiTheme = useMemo(() => createTheme({ palette: { mode: themeMode } }), [themeMode]);

  useEffect(() => {
    try {
      localStorage.setItem("themeMode", themeMode);
    } catch {}
  }, [themeMode]);

  // === THEME → DOM BRIDGE ===
  // Expose le mode sur <html data-theme="light|dark"> et la classe .dark
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", themeMode);
    html.classList.toggle("dark", themeMode === "dark");
    // Fallback: suivre l’OS si l’utilisateur n’a pas choisi explicitement
    const mql = window.matchMedia?.("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      const saved = localStorage.getItem("themeMode");
      if (saved !== "light" && saved !== "dark") {
        const next = e.matches ? "dark" : "light";
        html.setAttribute("data-theme", next);
        html.classList.toggle("dark", next === "dark");
      }
    };
    try { mql?.addEventListener?.("change", onChange); } catch { mql?.addListener?.(onChange); }
    return () => {
      try { mql?.removeEventListener?.("change", onChange); } catch { mql?.removeListener?.(onChange); }
    };
  }, [themeMode]);

  /* ---------- Router ---------- */
  const routeParams = useParams(); // /projects/:id ou /projects/:projectId
  const projectId = ((routeParams as any).projectId ?? (routeParams as any).id) as string | undefined;
  const navigate = useNavigate();

  /* ---------- Auth ---------- */
  const authed = typeof window !== "undefined" && !!localStorage.getItem("authToken");
  const handleLogoutClick = useCallback(async () => {
    try {
      logout();
    } finally {
      await loadProjects(false);
      navigate("/projects", { replace: true });
    }
  }, [navigate]); // loadProjects est défini plus bas, eslint réagira sinon

  /* ---------- State ---------- */
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [timeZone, setTimeZone] = useState("Europe/Paris");
  const [error, setError] = useState<string | null>(null);

  const [loadingProjects, setLoadingProjects] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState(false);

  // création projet
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [creating, setCreating] = useState(false);

  // juste après les states newName/newDesc/creating
  const handleCreateProject = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!newName.trim()) return;
      setCreating(true);
      setError(null);
      try {
        const created = await createProject({
          name: newName.trim(),
          description: newDesc.trim() || undefined,
        });
        setNewName("");
        setNewDesc("");
        await loadProjects(false);
        // si l'API renvoie l'id, on s'y rend directement
        if (created?.id) navigate(`/projects/${created.id}`, { replace: true });
      } catch (e: any) {
        setError(e?.response?.data?.error || "Impossible de créer le projet");
      } finally {
        setCreating(false);
      }
    },
    [newName, newDesc, navigate]
  );


  // suppression projet
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [deletingProject, setDeletingProject] = useState(false);



  // suppression tâche
  const [confirmTask, setConfirmTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState(false);

  // horizon UI (persisté)
  const [horizonMonths, setHorizonMonths] = useState<number>(6);
  const [endOverride, setEndOverride] = useState<string>("");

  // contrôle des PATCH auto
  const firstRenderRef = useRef(false);
  const initFromProjectRef = useRef(false);

  // drag state pour geler l'horizon pendant le geste
  const [dragging, setDragging] = useState(false);
  const [frozenStart, setFrozenStart] = useState<string | null>(null);
  const [frozenEnd, setFrozenEnd] = useState<string | null>(null);

  // début d'horizon figé par projet
  const startAnchorByProjectRef = useRef<Map<number, string>>(new Map());
  const [viewStartISO, setViewStartISO] = useState<string | null>(null);

  // UI / layout
  const isLgUp = useMediaQuery(muiTheme.breakpoints.up("lg"));
  const SIDEBAR_W = 300;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [openCreateTask, setOpenCreateTask] = useState(false);

  // Référence du Gantt (export/scroll)
  const ganttRef = useRef<GanttHandle>(null);

  // Échelle : pilotée via Redux (utilisée par Toolbar + Gantt)
  const dispatch = useDispatch();
  const scale = useSelector(selectScale);


const handleConfirmDeleteProject = useCallback(async () => {
  if (!confirmDeleteId) return;
  setDeletingProject(true);
  setError(null);
  try {
    const deletedId = confirmDeleteId;

    // Optimiste UI
    setProjects(prev => prev.filter(p => p.id !== deletedId));
    if (activeProject === deletedId) {
      setActiveProject(null);
      setTasks([]);
      navigate("/projects", { replace: true });
    }

    await deleteProject(deletedId);
    setConfirmDeleteId(null);
    await loadProjects(false);
  } catch (e: any) {
    setError(e?.response?.data?.error || "Impossible de supprimer le projet");
    await loadProjects(false);
  } finally {
    setDeletingProject(false);
  }
}, [confirmDeleteId, activeProject, navigate]);



  /* ---------- Data loaders ---------- */
  async function loadProjects(selectFirstIfNone = true) {
    setLoadingProjects(true);
    setError(null);
    try {
      const data: ApiProject[] = await listProjects();
      const normalized: Project[] = (data as any[]).map((p) => ({
        ...p,
        horizon_months: p.horizon_months ?? null,
        end_override: p.end_override ?? null,
      }));
      setProjects(normalized);

      if (selectFirstIfNone) {
        if (normalized.length > 0) {
          setActiveProject((cur) =>
            cur && normalized.some((p) => p.id === cur) ? cur : normalized[0].id
          );
        } else {
          setActiveProject(null);
          setTasks([]);
        }
      }
    } catch (e: any) {
      setError(e?.response?.data?.error || "Impossible de charger les projets");
    } finally {
      setLoadingProjects(false);
    }
  }
  useEffect(() => {
    loadProjects(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // synchro paramètre route -> projet actif
useEffect(() => {
  if (!projectId) return;
  const pid = parseInt(projectId, 10);
  if (Number.isNaN(pid)) return;

  let mounted = true;
  (async () => {
    if (pid < 0) {
      // si temp id, on essaye de le résoudre
      const mapped = await getMappedId("project", pid);
      if (!mounted) return;
      if (typeof mapped === "number" && mapped >= 0) {
        // redirige vers l'id réel
        navigate(`/projects/${mapped}`, { replace: true });
        return;
      } else {
        // mapping non trouvé -> nettoyage défensif pour éviter récidive
        try { localStorage.removeItem("lastProjectId"); } catch {}
        // rester sur /projects sans id
        navigate("/projects", { replace: true });
        return;
      }
    } else {
      // id positif normal
      setActiveProject(pid);
    }
  })();
  return () => { mounted = false; };
}, [projectId, navigate]);


  // si l’id de l’URL ne correspond plus à la liste, on désélectionne
  useEffect(() => {
    if (loadingProjects || projects.length === 0) return;
    if (projectId) {
      const pid = parseInt(projectId, 10);
      if (!Number.isNaN(pid) && !projects.some((p) => p.id === pid)) {
        setActiveProject(null);
      }
    }
  }, [projectId, projects, loadingProjects]);

  // chargement des tâches
  const loadTasks = useCallback(async (projectIdNum: number) => {
    setLoadingTasks(true);
    setError(null);
    try {
      const data = await listTasks(projectIdNum);
      setTasks(data);
    } catch (e: any) {
      setError(e?.response?.data?.error || "Impossible de charger les tâches");
    } finally {
      setLoadingTasks(false);
    }
  }, []);
  useEffect(() => {
    if (activeProject) loadTasks(activeProject);
  }, [activeProject, loadTasks]);

  // quand on change de projet → on initialise l’horizon depuis le projet + ancre de début
  useEffect(() => {
    if (!activeProject) return;
    const p = new Map(projects.map((pr) => [pr.id, pr])).get(activeProject);
    initFromProjectRef.current = true;
    setHorizonMonths(p?.horizon_months ?? 6);
    setEndOverride(p?.end_override ?? "");

    const saved = startAnchorByProjectRef.current.get(activeProject);
    setViewStartISO(saved ?? null);
  }, [activeProject, projects]);

  // si pas d’ancre pour ce projet → on calcule depuis la 1re tâche (ou aujourd’hui)
  useEffect(() => {
    if (!activeProject) return;
    if (viewStartISO) return;
    const dates = tasks.map((t) => parseISODate(t.start_date)).filter(Boolean) as Date[];
    const anchor = dates.length
      ? toISODate(new Date(Math.min(...dates.map((d) => d.getTime()))))
      : toISODate(new Date());
    startAnchorByProjectRef.current.set(activeProject, anchor);
    setViewStartISO(anchor);
  }, [activeProject, tasks, viewStartISO]);

  // persistance horizon / fin forcée (debounce)
  useEffect(() => {
    if (!firstRenderRef.current) {
      firstRenderRef.current = true;
      return;
    }
    if (initFromProjectRef.current) {
      initFromProjectRef.current = false;
      return;
    }
    if (!activeProject) return;

    const t = window.setTimeout(async () => {
      try {
        const updated = await updateProject(activeProject, {
          horizon_months: horizonMonths,
          end_override: endOverride || null,
        });
        setProjects((prev) =>
          prev.map((p) =>
            p.id === activeProject
              ? {
                  ...p,
                  horizon_months: updated.horizon_months ?? horizonMonths,
                  end_override: updated.end_override ?? (endOverride || null),
                }
              : p
          )
        );
      } catch (e: any) {
        setError(e?.response?.data?.error || "Impossible d’enregistrer l’horizon");
      }
    }, 400);

    return () => window.clearTimeout(t);
  }, [activeProject, horizonMonths, endOverride]);

  /* ---------- Tâches ---------- */
  const handleTaskUpdateApi = useCallback(
    async (next: Task) => {
      try {
        const prev = tasks.find((t) => t.id === next.id);
        const payload: any = {};
        if ("name" in next && next.name !== prev?.name) payload.name = next.name ?? null;
        if ("start_date" in next && next.start_date !== prev?.start_date) payload.start_date = next.start_date ?? null;
        if ("end_date" in next && next.end_date !== prev?.end_date) payload.end_date = next.end_date ?? null;
        if ((next as any).color !== (prev as any)?.color) payload.color = (next as any).color ?? null;
        if ((next as any).position != null && (next as any).position !== (prev as any)?.position)
          payload.position = (next as any).position;

        await updateTask((next as any).project_id, next.id, payload);
        setTasks((curr) => curr.map((t) => (t.id === next.id ? { ...t, ...payload } : t)));
      } catch (e: any) {
        setError(e?.response?.data?.error || "Échec de mise à jour de la tâche");
      }
    },
    [tasks]
  );

  const handleReorderApi = useCallback(
    async (newTasks: Task[]) => {
      const prev = tasks;
      setTasks(newTasks);
      try {
        if (!activeProject) throw new Error("Aucun projet actif");
        await reorderTasks(
          activeProject,
          newTasks.map((t, i) => ({ taskId: t.id, position: i }))
        );
      } catch (e: any) {
        setTasks(prev);
        setError(e?.response?.data?.error || "Échec du réordonnancement");
      }
    },
    [tasks, activeProject]
  );

  const handleDeleteTaskConfirmed = useCallback(async () => {
    if (!confirmTask) return;
    setDeletingTask(true);
    try {
      await deleteTask((confirmTask as any).project_id, confirmTask.id);
      const pid = (confirmTask as any).project_id as number;
      setConfirmTask(null);
      await loadTasks(pid);
    } catch (e: any) {
      setError(e?.response?.data?.error || "Impossible de supprimer la tâche");
    } finally {
      setDeletingTask(false);
    }
  }, [confirmTask, loadTasks]);

  /* ---------- Fin horizon calculée ---------- */
  const viewEndISO = useMemo(() => {
    const start = parseISODate(viewStartISO || toISODate(new Date()))!;
    const autoEnd = addMonthsUTC(start, horizonMonths);

    const maxEnd = tasks.map((t) => parseISODate(t.end_date)).filter(Boolean) as Date[];
    const lastTaskEnd = maxEnd.length ? new Date(Math.max(...maxEnd.map((d) => d.getTime()))) : null;

    const forced = endOverride ? parseISODate(endOverride) || autoEnd : autoEnd;
    const finalEnd = lastTaskEnd ? new Date(Math.max(forced.getTime(), lastTaskEnd.getTime())) : forced;

    return toISODate(finalEnd);
  }, [viewStartISO, horizonMonths, endOverride, tasks]);

  // libère le gel d’horizon en fin de drag
  useEffect(() => {
    if (!dragging) {
      setFrozenStart(null);
      setFrozenEnd(null);
    }
  }, [dragging]);

  // Map projets → lookup O(1)
  const projectMap = useMemo(() => new Map(projects.map((p) => [p.id, p])), [projects]);
  const exportTitle = activeProject ? projectMap.get(activeProject)?.name ?? "Diagramme" : "Diagramme";

  /* -------------------------------- Render ------------------------------ */
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />

      {/* BARRE HAUTE */}
      <AppBar position="sticky" elevation={1} color="default">
        <Toolbar sx={{ gap: 1 }}>
          {!isLgUp && (
            <IconButton edge="start" onClick={() => setSidebarOpen(true)} aria-label="Ouvrir le panneau projets">
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ mr: "auto" }}>
            Projets
          </Typography>
        </Toolbar>
      </AppBar>

      {/* LAYOUT PRINCIPAL */}
      <Box sx={{ display: "flex", height: "calc(100vh - 64px)" }}>
        {/* SIDEBAR */}
        {isLgUp ? (
          <Box
            component="aside"
            sx={{
              width: 300,
              flexShrink: 0,
              borderRight: 1,
              borderColor: "divider",
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
            }}
          >
            <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
              <Typography variant="h6" gutterBottom>
                Nouveau projet
              </Typography>
              <form onSubmit={handleCreateProject}>
                <Stack spacing={2}>
                  <TextField label="Nom du projet" value={newName} onChange={(e) => setNewName(e.target.value)} required />
                  <TextField label="Description" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} multiline minRows={2} />
                  <Button type="submit" variant="contained" disabled={creating || !newName.trim()}>
                    {creating ? "Création..." : "Créer"}
                  </Button>
                </Stack>
              </form>
            </Box>

            <Box sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Typography variant="h6">Projets</Typography>
              {activeProject && (
                <Chip size="small" label={`H: ${horizonMonths} mois${endOverride ? ` · fin ${endOverride}` : ""}`} />
              )}
            </Box>

            <Divider />
            <Box sx={{ overflowY: "auto", p: 1, minHeight: 0 }}>
              {loadingProjects ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
                  <CircularProgress size={22} />
                </Box>
              ) : (
                <List dense>
                  {projects.map((p) => (
                    <ListItem
                      key={p.id}
                      disablePadding
                      secondaryAction={
                        <IconButton
                          edge="end"
                          color="error"
                          aria-label={`Supprimer ${p.name}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setConfirmDeleteId(p.id);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <ListItemButton
                        selected={activeProject === p.id}
                        onClick={() => navigate(`/projects/${p.id}`)}
                        sx={{ borderRadius: 1, pr: 6 }}
                      >
                        <ListItemText
                          primary={p.name}
                          secondary={
                            <>
                              {p.description || "—"}
                              {(p.horizon_months || p.end_override) && (
                                <span style={{ display: "block", opacity: 0.7 }}>
                                  {` · durée ${p.horizon_months ?? 6} mois${
                                    p.end_override ? `, fin forcée ${p.end_override}` : ""
                                  }`}
                                </span>
                              )}
                            </>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                  {projects.length === 0 && (
                    <Typography variant="body2" sx={{ p: 2, color: "text.secondary" }}>
                      Aucun projet pour l’instant.
                    </Typography>
                  )}
                </List>
              )}
            </Box>
          </Box>
        ) : (
          <Drawer
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            ModalProps={{ keepMounted: true }}
            PaperProps={{ sx: { width: 300 } }}
          >
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Nouveau projet
              </Typography>
              <form onSubmit={handleCreateProject}>
                <Stack spacing={2}>
                  <TextField label="Nom du projet" value={newName} onChange={(e) => setNewName(e.target.value)} required />
                  <TextField label="Description" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} multiline minRows={2} />
                  <Button type="submit" variant="contained" disabled={creating || !newName.trim()}>
                    {creating ? "Création..." : "Créer"}
                  </Button>
                </Stack>
              </form>

              <Divider sx={{ my: 2 }} />
              <Typography variant="h6">Projets</Typography>
              <List dense>
                {projects.map((p) => (
                  <ListItem key={p.id} disablePadding>
                    <ListItemButton
                      selected={activeProject === p.id}
                      onClick={() => {
                        navigate(`/projects/${p.id}`);
                        setSidebarOpen(false);
                      }}
                    >
                      <ListItemText primary={p.name} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
        )}

        {/* ZONE PRINCIPALE */}
        <Box
          component="main"
          sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 2, p: 2, overflow: "hidden" }}
        >
          <Collapse in={!!error}>
            <Alert severity="error">{error}</Alert>
          </Collapse>

          {/* Contrôles calendrier & tâches */}
          <Paper
            sx={{
              p: 1.5,
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexWrap: "wrap",
            }}
            elevation={1}
          >
            <Typography variant="subtitle2" sx={{ mr: 1 }}>
              Calendrier & tâches
            </Typography>

            <MuiTooltip title={themeMode === "dark" ? "Mode clair" : "Mode sombre"}>
              <IconButton
                size="small"
                onClick={() => setThemeMode((m) => (m === "dark" ? "light" : "dark"))}
              >
                {themeMode === "dark" ? (
                  <LightModeIcon fontSize="small" />
                ) : (
                  <DarkModeIcon fontSize="small" />
                )}
              </IconButton>
            </MuiTooltip>

            <BarHeightControl />
            <TimeZoneSelector value={timeZone} onChange={setTimeZone} />

            <Box sx={{ flexGrow: 1 }} />

            {!authed ? (
              <Button
                size="small"
                variant="outlined"
                startIcon={<LoginIcon />}
                onClick={() => {
                  // sortir du mode invité pour autoriser l’affichage de la page /login
                  localStorage.removeItem("guestMode");
                  if (localStorage.getItem("authToken") === "guest") localStorage.removeItem("authToken");
                  navigate("/login", { state: { forceAuth: true } });
                }}
              >
                Connexion
              </Button>
            ) : (
              <IconButton size="small" onClick={handleLogoutClick} aria-label="Se déconnecter">
                <LogoutIcon fontSize="small" />
              </IconButton>
            )}
          </Paper>

          {/* Horizon compact */}
          <Paper sx={{ p: 2 }} elevation={1}>
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle1">Horizon du diagramme</Typography>
                {endOverride && (
                  <MuiTooltip title="Réinitialiser la fin (auto)">
                    <IconButton size="small" onClick={() => setEndOverride("")}>
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </MuiTooltip>
                )}
              </Stack>

              <Stack direction={{ xs: "column", md: "row" }} gap={2} alignItems={{ md: "center" }}>
                <Stack sx={{ flex: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Durée (mois)
                  </Typography>
                  <Slider
                    size="small"
                    value={horizonMonths}
                    min={1}
                    max={24}
                    step={1}
                    valueLabelDisplay="auto"
                    onChange={(_, v) => setHorizonMonths(v as number)}
                  />
                </Stack>

                <TextField
                  type="date"
                  size="small"
                  label="Fin (auto/forcée)"
                  value={endOverride || ""}
                  onChange={(e) => setEndOverride(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{ width: 220 }}
                />

                <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
                  Début: <b>{viewStartISO || "…"}</b> &nbsp;•&nbsp; Fin effective: <b>{viewEndISO}</b>
                </Typography>
              </Stack>
            </Stack>
          </Paper>

          {/* GANTT */}
          <Paper sx={{ p: 2, flex: 1, minHeight: 0, overflow: "hidden" }} elevation={1}>
            {/* Barre outils Gantt (1 rangée) */}
            <GanttToolbar
              onAddTask={() => setOpenCreateTask(true)}
              chartRef={ganttRef}
              exportTitle={exportTitle}
              startISO={viewStartISO || toISODate(new Date())}
              endISO={viewEndISO}
              scale={scale}
              onScaleChange={(mode) => dispatch(setScale(mode))}
            />

            <Box sx={{ height: "100%", width: "100%", overflowX: "auto" }}>
              {activeProject ? (
                <>
                  <GanttChart
                    ref={ganttRef}
                    tasks={tasks}
                    // On fige la vue pendant un drag pour éviter les décalages visuels.
                    startRef={
                      dragging ? (frozenStart ?? (viewStartISO || toISODate(new Date()))) : (viewStartISO || toISODate(new Date()))
                    }
                    endRef={dragging ? (frozenEnd ?? viewEndISO) : viewEndISO}
                    allowExternalRangeChange
                    onTaskUpdate={handleTaskUpdateApi}
                    onReorder={handleReorderApi}
                    onRequestDelete={(task) => setConfirmTask(task)}
                    timeZone={timeZone}
                    onDragStateChange={(isDragging) => {
                      setDragging(isDragging);
                      if (isDragging) {
                        setFrozenStart(viewStartISO || toISODate(new Date()));
                        setFrozenEnd(viewEndISO);
                      } else {
                        setFrozenStart(null);
                        setFrozenEnd(null);
                      }
                    }}
                  />

                  {tasks.length === 0 && !loadingTasks && (
                    <Box sx={{ mt: 2 }}>
                      <Alert severity="info">
                        Aucune tâche pour ce projet. Ajoute une tâche pour afficher le diagramme.
                      </Alert>
                    </Box>
                  )}
                </>
              ) : (
                <Box sx={{ p: 4 }}>
                  <Typography color="text.secondary">Sélectionne ou crée un projet pour commencer.</Typography>
                </Box>
              )}
            </Box>
          </Paper>

          {/* Dialogs */}
          <Dialog open={confirmDeleteId !== null} onClose={() => setConfirmDeleteId(null)}>
            <DialogTitle sx={{ color: "error.main", fontWeight: "bold" }}>
              Supprimer « {confirmDeleteId ? projects.find((p) => p.id === confirmDeleteId)?.name : ""} » ?
            </DialogTitle>
            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button onClick={() => setConfirmDeleteId(null)}>Annuler</Button>
              <Button color="error" variant="contained" onClick={handleConfirmDeleteProject} disabled={deletingProject}>
                {deletingProject ? "Suppression..." : "Supprimer"}
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog open={!!confirmTask} onClose={() => setConfirmTask(null)}>
            <DialogTitle sx={{ color: "error.main", fontWeight: "bold" }}>Supprimer cette tâche ?</DialogTitle>
            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button onClick={() => setConfirmTask(null)}>Annuler</Button>
              <Button color="error" variant="contained" onClick={handleDeleteTaskConfirmed} disabled={deletingTask}>
                {deletingTask ? "Suppression..." : "Supprimer"}
              </Button>
            </DialogActions>
          </Dialog>

          {/* Popup création de tâche */}
          <Dialog open={openCreateTask} onClose={() => setOpenCreateTask(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Créer une tâche</DialogTitle>
            <Box sx={{ px: 3, pb: 2 }}>
              {activeProject ? (
                <CreateTask
                  projectId={activeProject}
                  onTaskCreated={async () => {
                    setOpenCreateTask(false);
                    await loadTasks(activeProject);
                  }}
                />
              ) : (
                <Alert severity="info">Sélectionne un projet avant d’ajouter une tâche.</Alert>
              )}
            </Box>
            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button onClick={() => setOpenCreateTask(false)}>Fermer</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
