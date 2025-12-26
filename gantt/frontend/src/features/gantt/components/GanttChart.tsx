// --- GanttChart.tsx (version stabilisée + couleur dynamique immédiate) ---
import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  CSSProperties,
} from "react";
import { createRoot, Root } from "react-dom/client";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import { ToggleButtonGroup, ToggleButton, Stack } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";

import { Task, Props } from "@types/tasks";
import EditableRowTitle from "@components/rows/EditableRowTitle";
import "@features/gantt/lib/gantt.css";
import {
  selectScale as selectScaleGlobal,
  setScale as setScaleGlobal,
} from "../store/ganttUiSlice";

/* ====================== helpers ====================== */

// parse ISO YYYY-MM-DD en UTC (pas de surprises fuseau) ; falsy -> null
const toDate = (v: any): Date | null => {
  if (!v) return null;
  if (v instanceof Date && Number.isFinite(+v)) return v;
  if (typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v)) {
    const [y, m, d] = v.split("-").map(Number);
    return new Date(Date.UTC(y, m - 1, d));
  }
  const d = new Date(v);
  return Number.isFinite(+d) ? d : null;
};

const getCssVarPx = (name: string, scope?: HTMLElement | null, fallback = 0) => {
  const rawLocal = scope ? getComputedStyle(scope).getPropertyValue(name).trim() : "";
  const raw =
    rawLocal || getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const px = parseFloat(raw);
  return Number.isFinite(px) ? px : fallback;
};

// Seuils d'auto-fit (px par unité)
const MIN_UNIT_PX_DAY = 22;
const MIN_UNIT_PX_WEEK = 96; // évite le resserrement illisible
const MIN_UNIT_PX_MONTH = 28;
const MAX_UNIT_PX = 120;
const CANVAS_MAX_DIM = 16384; // sécurité pour Firefox/Chromium

const PALETTE = [
  "#60a5fa",
  "#34d399",
  "#fbbf24",
  "#f87171",
  "#a78bfa",
  "#f472b6",
  "#22d3ee",
  "#c084fc",
  "#fb7185",
  "#4ade80",
  "#f59e0b",
  "#38bdf8",
];

// diff de jours en UTC (à minuit)
const daysDiff = (a: Date, b: Date) => {
  const Au = Date.UTC(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate());
  const Bu = Date.UTC(b.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate());
  return Math.floor((Au - Bu) / 86400000);
};
const addDays = (d: Date, days: number) => {
  const u = new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())
  );
  u.setUTCDate(u.getUTCDate() + days);
  return u;
};
const iso = (d: Date) =>
  `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(
    d.getUTCDate()
  ).padStart(2, "0")}`;

/* ====================== scale helpers ====================== */
export type ExportScale = "day" | "week" | "month";
type Scale = ExportScale;

const startOfDayUTC = (d: Date) =>
  new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
const startOfWeekUTC = (d: Date) => {
  const x = startOfDayUTC(d);
  const dow = (x.getUTCDay() + 6) % 7; // Lundi=0
  x.setUTCDate(x.getUTCDate() - dow);
  return x;
};
const startOfMonthUTC = (d: Date) =>
  new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1));
const endOfMonthUTC = (d: Date) =>
  new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0));

const startOfUnit = (d: Date, s: Scale) =>
  s === "day" ? startOfDayUTC(d) : s === "week" ? startOfWeekUTC(d) : startOfMonthUTC(d);
const endOfUnit = (start: Date, s: Scale) => {
  if (s === "day") return start;
  if (s === "week") {
    const e = new Date(start);
    e.setUTCDate(e.getUTCDate() + 6);
    return e;
  }
  return endOfMonthUTC(start);
};
const addUnits = (d: Date, n: number, s: Scale) => {
  if (s === "day") {
    const x = startOfDayUTC(d);
    x.setUTCDate(x.getUTCDate() + n);
    return x;
  }
  if (s === "week") {
    const x = startOfWeekUTC(d);
    x.setUTCDate(x.getUTCDate() + 7 * n);
    return x;
  }
  const x = startOfMonthUTC(d);
  return new Date(Date.UTC(x.getUTCFullYear(), x.getUTCMonth() + n, 1));
};
const unitsDiff = (a: Date, b: Date, s: Scale) => {
  if (s === "day") return daysDiff(startOfDayUTC(a), startOfDayUTC(b));
  if (s === "week") return Math.floor(daysDiff(startOfWeekUTC(a), startOfWeekUTC(b)) / 7);
  const ay = a.getUTCFullYear(),
    am = a.getUTCMonth();
  const by = b.getUTCFullYear(),
    bm = b.getUTCMonth();
  return ay * 12 + am - (by * 12 + bm);
};
const isoWeek = (d: Date) => {
  const x = startOfDayUTC(d);
  const thursday = new Date(
    Date.UTC(
      x.getUTCFullYear(),
      x.getUTCMonth(),
      x.getUTCDate() + (3 - ((x.getUTCDay() + 6) % 7))
    )
  );
  const yearStart = new Date(Date.UTC(thursday.getUTCFullYear(), 0, 4));
  return (
    1 +
    Math.floor(
      (thursday.getTime() - startOfWeekUTC(yearStart).getTime()) / (7 * 86400000)
    )
  );
};

/** calcule le nombre d’unités attendu pour (scale,start,end) — utilisé pour bloquer l’export HTML jusqu’au rebuild */
const computeUnitCount = (s: Scale, start: Date, end: Date) => {
  const ps = startOfUnit(start, s);
  let pe = startOfUnit(end, s);
  if (+pe < +ps) pe = addUnits(ps, 1, s);
  return unitsDiff(pe, ps, s) + 1;
};

/* ====================== types DOM ====================== */
type BarEls = {
  row: HTMLDivElement;
  barZone: HTMLDivElement;
  bar: HTMLDivElement;
  title: HTMLSpanElement;
  handleLeft: HTMLDivElement;
  handleRight: HTMLDivElement;
  nameRoot: Root;
  colorRoot: Root;
  deleteRoot: Root;
};
type Frame = {
  host: HTMLDivElement;
  boundaries: HTMLDivElement;
  timeline: HTMLDivElement;
  rows: HTMLDivElement;
  tooltip: HTMLDivElement;
  dayCount: number; // nb d’unités
  totalWidth: string;
  projectStart: Date;
  projectEnd: Date;
};

/* ====================== Export API ====================== */
export type ExportTheme = "light" | "dark" | undefined;

export type ExportHtmlOptions = {
  title?: string;
  startRef?: string;
  endRef?: string;
  timeZone?: string;
  /** si fourni, inliné dans <style> */
  cssText?: string;
  /** sinon, <link rel="stylesheet" href="..."> */
  externalCssHref?: string;
  theme?: ExportTheme;
  scale?: ExportScale;
  addMetaViewport?: boolean;
  displayTitle?: string;
};

export type ExportImageOptions = {
  startRef?: string;
  endRef?: string;
  theme?: ExportTheme;
  scale?: ExportScale;
  /** facteur de résolution relatif au DPR (défaut: 2) */
  pixelRatio?: number;
  /** fond; null => transparent; défaut dérivé du thème */
  background?: string | null;
  displayTitle?: string;
};

export type ExportPdfOptions = ExportImageOptions & {
  orientation?: "portrait" | "landscape";
  format?: "a4" | "letter" | [number, number];
};

export interface GanttHandle {
  exportJSON: () => string;
  downloadJSON: (filename?: string) => void;
  scrollToToday: () => void;
  setRange: (startISO: string, endISO: string) => void;

  // NEW export API
  exportAsHTML: (opts: ExportHtmlOptions) => Promise<string>;
  exportAsPNG: (opts: ExportImageOptions) => Promise<Blob>;
  exportAsPDF: (opts: ExportPdfOptions) => Promise<Blob>;
}

/* ========== runtime helpers pour thème / export ========== */
const resolveTheme = (forced?: ExportTheme): "light" | "dark" => {
  if (forced === "dark") return "dark";
  if (forced === "light") return "light";
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
};

/** Copie les variables CSS calculées du host vers un clone (pour export sans CSS global) */
const copyRuntimeVars = (from: HTMLElement, to: HTMLElement) => {
  const src = getComputedStyle(from);
  const set = (name: string, fallback?: string) => {
    const v = src.getPropertyValue(name).trim() || fallback || "";
    if (v) to.style.setProperty(name, v);
  };
  set("--label-width", "200px");
  set("--day-width", "80px");
  set("--row-height", "44px");
  const days =
    src.getPropertyValue("--total-days").trim() ||
    (from.style.getPropertyValue("--total-days") || "").trim();
  if (days) to.style.setProperty("--total-days", days);
};

/** Essaie d’extraire le CSS de la feuille gantt chargée dans la page et le retourne en texte */
const getGanttCSSText = (): string => {
  const wantedHints = ["gantt.css", "/gantt", ".gantt"];
  const cssTexts: string[] = [];
  const sheets = Array.from(document.styleSheets ?? []);
  for (const sheet of sheets) {
    const href = (sheet as any).href as string | null | undefined;
    const owner = ((sheet as any).ownerNode as Element | null) ?? null;
    const hint =
      (href && wantedHints.some((h) => href.includes(h))) ||
      (owner && owner.textContent && owner.textContent.includes(".gantt"));
    try {
      const rules = Array.from((sheet as CSSStyleSheet).cssRules || []);
      const rulesText = rules
        .map((r) => r.cssText)
        .filter((t) => (hint ? true : t.includes(".gantt")))
        .join("\n");
      if (rulesText) cssTexts.push(rulesText);
    } catch {
      // cross-origin — on ignore
    }
  }
  return cssTexts.join("\n");
};

/** Normalise le DOM clôné pour l’export : force les hauteurs, “matérialise” les couleurs des barres */
const materializeForExport = (root: HTMLElement) => {
  // Hauteurs fiables même sans CSS global
  root.querySelectorAll<HTMLElement>(".row").forEach((row) => {
    row.style.height = "var(--row-height,44px)";
  });
  root.querySelectorAll<HTMLElement>(".bar-zone").forEach((bz) => {
    bz.style.height = "var(--row-height,44px)";
    bz.style.position = "relative";
  });

  // Couleur de fond explicite sur les barres/poignées
  root.querySelectorAll<HTMLElement>(".bar").forEach((bar) => {
    const cs = getComputedStyle(bar);
    const varCol = cs.getPropertyValue("--bar-color").trim();
    const bgCol =
      varCol ||
      (cs.backgroundColor && cs.backgroundColor !== "rgba(0, 0, 0, 0)"
        ? cs.backgroundColor
        : "") ||
      cs.color ||
      "#60a5fa";
    bar.style.background = bgCol;
    bar.querySelectorAll<HTMLElement>(".resize-handle").forEach((h) => {
      h.style.background = bgCol;
      h.style.opacity = "0.9";
    });
  });

  // Lignes visibles
  root.querySelectorAll<HTMLElement>(".today-line").forEach((tl) => {
    const c = getComputedStyle(tl).backgroundColor || "rgba(220,38,38,.8)";
    tl.style.background = c;
  });
  root.querySelectorAll<HTMLElement>(".marker-line").forEach((ml) => {
    const c = getComputedStyle(ml).backgroundColor || "rgba(0,0,0,.08)";
    ml.style.background = c;
  });
};

/* --- Export-only: décimer les labels SEMAINE pour éviter le chevauchement --- */
const adjustWeekHeaderDensityForExport = (root: HTMLElement) => {
  const scaleAttr = root.getAttribute("data-scale") || "";
  if (scaleAttr !== "week") return;

  const unitW = getCssVarPx("--day-width", root, 80);
  let step = 1; // afficher toutes les semaines
  if (unitW < 60) step = 2; // 1/2
  if (unitW < 40) step = 4; // 1/4
  if (unitW < 28) step = 8; // 1/8

  const cells = Array.from(
    root.querySelectorAll<HTMLDivElement>(".timeline .day")
  );
  cells.forEach((el, idx) => {
    if (!el.hasAttribute("data-week-label")) {
      el.setAttribute("data-week-label", el.textContent || "");
    }
    const label = el.getAttribute("data-week-label") || "";
    el.textContent = idx % step === 0 ? label : "";
  });
};

/* WEEK_EXPORT_HELPER_START */
function widenWeekForExport(
  root: HTMLElement,
  wrapper?: HTMLElement | null,
  targetPx: number = 96, // largeur mini d'une semaine
  labelStep: number = 2 // n'afficher qu'une étiquette sur 2
) {
  try {
    if (!root || root.getAttribute("data-scale") !== "week") return;

    const cs = getComputedStyle(root);
    const totalDays = parseFloat(cs.getPropertyValue("--total-days")) || 0;
    const labelW = parseFloat(cs.getPropertyValue("--label-width")) || 240;
    const curUnit = parseFloat(cs.getPropertyValue("--day-width")) || 80;
    if (!totalDays) return;

    const unit = Math.max(curUnit, targetPx);
    root.style.setProperty("--day-width", unit + "px");

    // Élargit le conteneur du clone pour éviter le clipping
    const newTotalPx = Math.round(labelW + totalDays * unit);
    (root as HTMLElement).style.width = newTotalPx + "px";
    if (wrapper && (wrapper as any).style) {
      (wrapper as any).style.width = newTotalPx + "px";
    }

    // Allège les libellés de semaines (W12, W13, ...) pour éviter le chevauchement
    const dayEls = root.querySelectorAll<HTMLElement>(".timeline .day");
    dayEls.forEach((el, i) => {
      el.style.whiteSpace = "nowrap";
      el.style.textAlign = "center";
      if (i % labelStep) el.style.visibility = "hidden";
    });
  } catch {
    /* export-only: on ignore */
  }
}
/* WEEK_EXPORT_HELPER_END */

interface ExtendedProps extends Props {
  onReorder?: (newTasks: Task[]) => void;
  onRequestDelete?: (task: Task) => void;
  timeZone?: string;
  loading?: boolean;
  onDragStateChange?: (dragging: boolean) => void;
  allowExternalRangeChange?: boolean;
}

/* ====================== composant ====================== */
function GanttChartInner(
  {
    tasks,
    startRef = "2025-09-01",
    endRef = "2026-05-31",
    onTaskUpdate,
    onReorder,
    onRequestDelete,
    timeZone = "Europe/Paris",
    onDragStateChange,
    allowExternalRangeChange = false,
  }: ExtendedProps,
  ref: React.Ref<GanttHandle>
) {
  const ganttRef = useRef<HTMLDivElement | null>(null);
  const tasksRef = useRef<Task[]>(tasks);
  const barsRef = useRef<Map<number, BarEls>>(new Map());
  const rootsRef = useRef<Root[]>([]);
  const frameRef = useRef<Frame | null>(null);

  const rangeRef = useRef<{ start: Date; end: Date }>({
    start: new Date(startRef),
    end: new Date(endRef),
  });
  const [rangeTick, setRangeTick] = useState(0);

  const dispatch = useDispatch();
  const scale = useSelector(selectScaleGlobal as any) as Scale;

  const [showLabelsApp, setShowLabelsApp] = useState(true);
  const labelWidthRef = useRef<number>(240);
  const initialLabelWidthRef = useRef<number>(240);
  const draggingTaskIdRef = useRef<number | null>(null);

  // Mémo des couleurs pour éviter flashs + conserver en cas de latence modèle
  const colorMemoRef = useRef<Map<number, string>>(new Map());

  // Position "sticky" pour éviter un saut visuel lors du changement de couleur
  const stickyPosRef = useRef<
    Map<number, { left: number; width: number; frames: number }>
  >(new Map());

  const pendingRangeRef = useRef<{ start: Date; end: Date } | null>(null);

  // === Toggle colonne des labels (source de vérité unique) ===
  useEffect(() => {
    const host = ganttRef.current;
    if (!host) return;

    // mémorise la largeur initiale une seule fois
    if (!host.hasAttribute("data-initial-label-width")) {
      const lw0 = getCssVarPx("--label-width", host, 240);
      if (lw0 > 0) {
        host.setAttribute("data-initial-label-width", String(lw0));
        initialLabelWidthRef.current = lw0;
      }
    }

    if (showLabelsApp) {
      const memo = host.getAttribute("data-initial-label-width");
      const w = memo ? parseFloat(memo) : NaN;
      const width =
        Number.isFinite(w) && w > 0
          ? w
          : initialLabelWidthRef.current ||
            getCssVarPx("--label-width", host, 240) ||
            240;
      host.style.setProperty("--label-width", `${width}px`);
      host.setAttribute("data-labels", "on");
    } else {
      const cur = getCssVarPx("--label-width", host, 240);
      if (cur > 0) {
        host.setAttribute("data-initial-label-width", String(cur));
        initialLabelWidthRef.current = cur;
      }
      host.style.setProperty("--label-width", "0px");
      host.setAttribute("data-labels", "off");
    }

    requestAnimationFrame(reapplyAllBars);
  }, [showLabelsApp, rangeTick, scale]);

  const reapplyAllBars = () => {
    const f = frameRef.current;
    if (!f) return;
    const unitW = getCssVarPx("--day-width", f.host, 80);
    for (const t of tasksRef.current) {
      const els = barsRef.current.get(t.id);
      if (!els) continue;
      const sDate = toDate(t.start_date) ?? f.projectStart;
      const eDate = toDate(t.end_date) ?? sDate;

      const sUnit = startOfUnit(sDate, scale);
      const eUnit = startOfUnit(eDate, scale);
      const startOffset = unitsDiff(sUnit, f.projectStart, scale);
      const duration = Math.max(1, unitsDiff(eUnit, sUnit, scale) + 1);

      // priorité au sticky si présent
      const sticky = stickyPosRef.current.get(t.id);
      if (sticky) {
        els.bar.style.left = `${sticky.left}px`;
        els.bar.style.width = `${sticky.width}px`;
        sticky.frames -= 1;
        if (sticky.frames <= 0) stickyPosRef.current.delete(t.id);
      } else {
        els.bar.style.left = `${startOffset * unitW}px`;
        els.bar.style.width = `${Math.max(unitW, duration * unitW)}px`;
      }
    }
  };

  useEffect(() => {
    tasksRef.current = tasks;
    tasks.forEach((t) => {
      const c = (t as any).color;
      if (c) colorMemoRef.current.set(t.id, c);
    });
  }, [tasks]);

  // suivre startRef/endRef si demandé
  useEffect(() => {
    if (!allowExternalRangeChange) return;
    const s = toDate(startRef),
      e = toDate(endRef);
    if (!s || !e || s >= e) return;
    if (draggingTaskIdRef.current !== null) {
      pendingRangeRef.current = { start: s, end: e }; // appliqué après drag
      return;
    }
    rangeRef.current = { start: s, end: e };
    setRangeTick((v) => v + 1);
  }, [startRef, endRef, allowExternalRangeChange]);

  /* ---------- EXPORT helpers ---------- */
  const waitNextFrame = () =>
    new Promise<void>((r) =>
      requestAnimationFrame(() => requestAnimationFrame(() => r()))
    );

  const withTempConfig = async <T,>(
    opts: {
      theme?: ExportTheme;
      scale?: ExportScale;
      startRef?: string;
      endRef?: string;
    },
    render: () => Promise<T>
  ): Promise<T> => {
    const host = ganttRef.current!;
    const prev = {
      theme: (document.documentElement.getAttribute("data-theme") ||
        undefined) as ExportTheme,
      scale,
      start: rangeRef.current.start,
      end: rangeRef.current.end,
    };

    const needTheme = !!opts.theme && opts.theme !== prev.theme;
    const needScale = !!opts.scale && opts.scale !== prev.scale;
    const newStart = opts.startRef ? toDate(opts.startRef) : null;
    const newEnd = opts.endRef ? toDate(opts.endRef) : null;
    const needRange =
      !!newStart &&
      !!newEnd &&
      (+newStart !== +prev.start || +newEnd !== +prev.end);

    const oldVis = host.style.visibility;
    if (needTheme || needScale || needRange) host.style.visibility = "hidden";

    if (needTheme && opts.theme) {
      document.documentElement.setAttribute("data-theme", opts.theme);
    }
    // ⚠️ pas de switch UI ici ; on change seulement temporairement pour l’export
    if (needScale) dispatch(setScaleGlobal(opts.scale as any));
    if (needRange && newStart && newEnd) {
      rangeRef.current = { start: newStart, end: newEnd };
      setRangeTick((v) => v + 1);
    }

    // attendre la vraie reconstruction
    if (needTheme || needScale || needRange) {
      const targetScale = (opts.scale as Scale) || prev.scale;
      const targetStart = newStart || prev.start;
      const targetEnd = newEnd || prev.end;
      const expectedUnits = computeUnitCount(targetScale, targetStart, targetEnd);

      for (let i = 0; i < 20; i++) {
        await waitNextFrame();
        if (frameRef.current?.dayCount === expectedUnits) break;
      }
    }

    const res = await render();

    // restore
    if (needTheme) {
      if (prev.theme) document.documentElement.setAttribute("data-theme", prev.theme);
      else document.documentElement.removeAttribute("data-theme");
    }
    if (needScale) dispatch(setScaleGlobal(prev.scale as any));
    if (needRange) {
      rangeRef.current = { start: prev.start, end: prev.end };
      setRangeTick((v) => v + 1);
    }
    if (needTheme || needScale || needRange) {
      await waitNextFrame();
      host.style.visibility = oldVis;
    }
    return res;
  };

  const escapeHtml = (s?: string) =>
    (s || "").replace(
      /[&<>"']/g,
      (m) =>
        ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[m]!
        )
    );

  // CSS de secours injecté dans l’export HTML pour garantir une hauteur correcte
  const exportSafetyCSS = `
html,body{height:auto;min-height:0}
.gantt{height:auto;max-height:none;overflow:auto}
.gantt #rows{position:relative}
.gantt .row{height:var(--row-height,44px)}
.gantt .bar-zone{position:relative;height:var(--row-height,44px)}

/* Forcer la 1re colonne "label" + grille complète en export */
.gantt .timeline{display:grid;grid-auto-flow:column;grid-auto-columns:var(--day-width);
  grid-template-columns:var(--label-width) repeat(var(--total-days),var(--day-width));}
.gantt .row{display:grid;grid-template-columns:var(--label-width) repeat(var(--total-days),var(--day-width));}
.gantt .timeline .label,.gantt .row>.label{
  display:flex !important;position:relative;left:0;z-index:5;
  background:#f8fafc;border-right:1px solid rgba(0,0,0,.08);
  align-items:center;gap:8px;padding:0 12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis
}
.gantt .timeline .day{border-right:1px solid rgba(0,0,0,.06)}
.gantt .row .cell{border-right:1px solid rgba(0,0,0,.06)}
.gantt .today-line{width:2px}
.diagram-title{ text-align:center;font-size:28px;font-weight:700;margin:24px 0 16px 0;color:#0f172a; }
@media print{
  html,body{height:auto}
  .gantt{overflow:visible !important;max-height:none !important;height:auto !important}
  .gantt .timeline .label,.gantt .row>.label{position:static !important}
  .row,.timeline,#rows{break-inside:avoid;page-break-inside:avoid}
}
`;

  /** Construit l’HTML autonome : clone visible, copie des vars CSS, matérialise couleurs, embarque CSS inline */
  const buildStandaloneHTML = (opts: ExportHtmlOptions & { scaleForCSS?: Scale }) => {
    const host = ganttRef.current!;
    const themeAttr =
      opts.theme ??
      ((document.documentElement.getAttribute("data-theme") as ExportTheme) ??
        undefined);

    const clone = host.cloneNode(true) as HTMLElement;
    // S'assure que la colonne labels est visible avec la largeur mémorisée
    const lw =
      initialLabelWidthRef.current || getCssVarPx("--label-width", host, 240);
    clone.setAttribute("data-labels", "on");
    clone.style.setProperty("--label-width", `${lw}px`);
    clone.setAttribute("data-scale", (opts.scaleForCSS || scale) as string);
    clone
      .querySelectorAll(".gantt-controls, .label-toggle, .label-toggle-btn")
      .forEach((el) => el.remove());

    // le host réel peut être hidden pendant le re-render → on annule dans le clone
    clone.style.visibility = "visible";
    clone.style.removeProperty("visibility");

    // fige dimensions + variables (évite shrink-to-fit)
    clone.style.maxWidth = "none";
    clone.style.width = `${host.scrollWidth}px`;
    clone.style.height = `${host.scrollHeight}px`;
    copyRuntimeVars(host, clone);

    // matérialiser couleurs/hauteurs pour fonctionnement sans CSS global
    materializeForExport(clone);
    widenWeekForExport(clone);
    adjustWeekHeaderDensityForExport(clone);

    const htmlAttrs: string[] = ['lang="fr"'];
    if (themeAttr) htmlAttrs.push(`data-theme="${themeAttr}"`);

    const headBits: string[] = [];
    headBits.push(`<meta charset="utf-8">`);
    if (opts.addMetaViewport !== false)
      headBits.push(
        `<meta name="viewport" content="width=device-width, initial-scale=1">`
      );
    if (opts.title) headBits.push(`<title>${escapeHtml(opts.title)}</title>`);

    const cssInline =
      (opts.cssText && String(opts.cssText)) || getGanttCSSText() || "";
    if (cssInline) {
      headBits.push(`<style id="gantt-css">${cssInline}</style>`);
    } else if (opts.externalCssHref) {
      headBits.push(
        `<link rel="stylesheet" href="${opts.externalCssHref}">`
      );
    }
    // CSS de sûreté — vient EN DERNIER pour override (labels visibles, pas de décalage)
    headBits.push(
      `<style id="gantt-export-safety">${exportSafetyCSS}</style>`
    );

    const titleBlock = opts.displayTitle
      ? `<h1 class="diagram-title">${escapeHtml(opts.displayTitle)}</h1>`
      : "";

    return `<!DOCTYPE html>
<html ${htmlAttrs.join(" ")}>
<head>
${headBits.join("\n")}
<style>body{margin:0;background:transparent}</style>
</head>
<body>
${titleBlock}
${clone.outerHTML}
</body>
</html>`;
  };

  const mountCloneOffscreen = (
    theme?: ExportTheme
  ): { wrapper: HTMLDivElement; node: HTMLElement } => {
    const host = ganttRef.current!;
    const wrapper = document.createElement("div");
    if (theme) wrapper.setAttribute("data-theme", theme);
    Object.assign(wrapper.style, {
      position: "fixed",
      left: "-10000px",
      top: "0",
      width: `${host.scrollWidth}px`,
      height: `${host.scrollHeight}px`,
      overflow: "visible",
      zIndex: "-1",
      pointerEvents: "none",
      background: "transparent",
    } as CSSProperties);

    const clone = host.cloneNode(true) as HTMLElement;
    const lw =
      initialLabelWidthRef.current || getCssVarPx("--label-width", host, 240);
    clone.setAttribute("data-labels", "on");
    clone.style.setProperty("--label-width", `${lw}px`);
    clone.setAttribute(
      "data-scale",
      (host.getAttribute("data-scale") || scale) as string
    );
    clone
      .querySelectorAll(".gantt-controls, .label-toggle, .label-toggle-btn")
      .forEach((el) => el.remove());

    // visibilité forcée + dimensions figées
    clone.style.visibility = "visible";
    clone.style.removeProperty("visibility");
    clone.style.maxWidth = "none";
    clone.style.width = `${host.scrollWidth}px`;
    clone.style.height = `${host.scrollHeight}px`;

    // copies des variables CSS calculées
    copyRuntimeVars(host, clone);

    // matérialiser couleurs/hauteurs dans le clone AVANT html2canvas
    materializeForExport(clone);
    widenWeekForExport(clone);
    adjustWeekHeaderDensityForExport(clone);

    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);
    return { wrapper, node: clone };
  };

  const blobToDataURL = (blob: Blob) =>
    new Promise<string>((resolve) => {
      const r = new FileReader();
      r.onload = () => resolve(String(r.result));
      r.readAsDataURL(blob);
    });

  const loadImage = (src: string) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });

  /* ---------- Imperative API ---------- */
  useImperativeHandle(
    ref,
    () => {
      // helper partagé : rendu PNG offscreen
      const renderPNG = async (opts: ExportImageOptions): Promise<Blob> => {
        const html2canvas = (await import("html2canvas")).default;

        return await withTempConfig(
          {
            theme: opts.theme,
            scale: opts.scale,
            startRef: opts.startRef,
            endRef: opts.endRef,
          },
          async () => {
            const { wrapper, node } = mountCloneOffscreen(opts.theme);
            try {
              const widthPx = Math.max(
                1,
                node.scrollWidth ||
                  node.clientWidth ||
                  node.getBoundingClientRect().width ||
                  1
              );
              const heightPx = Math.max(
                1,
                node.scrollHeight ||
                  node.clientHeight ||
                  node.getBoundingClientRect().height ||
                  1
              );

              const prWanted =
                Math.max(0.25, opts.pixelRatio ?? 2) *
                (window.devicePixelRatio || 1);

              const safeByW = (CANVAS_MAX_DIM - 1) / widthPx;
              const safeByH = (CANVAS_MAX_DIM - 1) / heightPx;
              const safeScale = Math.max(
                0.1,
                Math.min(prWanted, safeByW, safeByH)
              );

              const theme = resolveTheme(opts.theme);
              const bg =
                opts.background !== undefined
                  ? opts.background
                  : theme === "dark"
                  ? "#0f172a"
                  : "#ffffff";

              const canvas = await html2canvas(node, {
                backgroundColor: (bg === null ? null : (bg as string)) as any,
                scale: safeScale,
                useCORS: true,
                logging: false,
                windowWidth: widthPx,
                windowHeight: heightPx,
              });

              return await new Promise<Blob>((res) =>
                canvas.toBlob((b) => res(b || new Blob()), "image/png")
              );
            } finally {
              wrapper.remove();
            }
          }
        );
      };

      return {
        exportJSON: () => JSON.stringify(tasksRef.current, null, 2),
        downloadJSON: (filename = "gantt-export.json") => {
          const data = JSON.stringify(tasksRef.current, null, 2);
          const url = URL.createObjectURL(
            new Blob([data], { type: "application/json" })
          );
          const a = document.createElement("a");
          a.href = url;
          a.download = filename;
          a.click();
          URL.revokeObjectURL(url);
        },
        scrollToToday: () => {
          const frame = frameRef.current;
          const host = ganttRef.current;
          if (host) {
            const lw0 = getCssVarPx("--label-width", host, 240);
            if (!host.hasAttribute("data-initial-label-width") && lw0 > 0) {
              host.setAttribute("data-initial-label-width", String(lw0));
              if (!initialLabelWidthRef.current)
                initialLabelWidthRef.current = lw0;
            }
          }
          if (host) {
            initialLabelWidthRef.current =
              getCssVarPx("--label-width", host, 240) || 240;
          }
          if (!frame || !host) return;
          const today = new Date();
          if (today < frame.projectStart || today > frame.projectEnd) return;
          const off = unitsDiff(startOfUnit(today, scale), frame.projectStart, scale);
          const labelW = getCssVarPx("--label-width", frame.host, 200);
          const unitW = getCssVarPx("--day-width", frame.host, 80);
          const x = labelW + off * unitW - host.clientWidth / 2;
          host.scrollTo({ left: Math.max(0, x), behavior: "smooth" });
        },
        setRange: (startISO, endISO) => {
          const s = toDate(startISO),
            e = toDate(endISO);
          if (!s || !e || s >= e) return;
          const cur = rangeRef.current;
          if (cur && +cur.start === +s && +cur.end === +e) return;
          rangeRef.current = { start: s, end: e };
          setRangeTick((v) => v + 1);
        },

        // === EXPORTS ===
        exportAsHTML: async (opts: ExportHtmlOptions) => {
          const targetScale = (opts.scale as Scale) ?? scale;
          return await withTempConfig(
            {
              theme: opts.theme,
              scale: targetScale,
              startRef: opts.startRef,
              endRef: opts.endRef,
            },
            async () => buildStandaloneHTML({ ...opts, scaleForCSS: targetScale })
          );
        },

        exportAsPNG: async (opts: ExportImageOptions) => {
          return await renderPNG(opts);
        },

        exportAsPDF: async (opts: ExportPdfOptions) => {
          // on fabrique un PNG puis on l’insère dans un PDF taille adaptée
          const pngBlob = await renderPNG(opts);
          const { jsPDF } = await import("jspdf");

          const dataUrl = await blobToDataURL(pngBlob);
          const img = await loadImage(dataUrl);

          const pxToPt = 72 / 96; // approx si 96 dpi
          const wPt = img.width * pxToPt;
          const hPt = img.height * pxToPt;

          const orientation =
            opts.orientation || (wPt >= hPt ? "landscape" : "portrait");
          const pdf = new jsPDF({
            orientation,
            unit: "pt",
            format: [wPt, hPt],
          });
          pdf.addImage(dataUrl, "PNG", 0, 0, wPt, hPt);
          return pdf.output("blob");
        },
      };
    },
    [scale]
  );

  /* ---------- build skeleton ---------- */
  useEffect(() => {
    const host = ganttRef.current;
    if (!host) return;

    labelWidthRef.current = getCssVarPx("--label-width", host, 240);
    if (!host.hasAttribute("data-initial-label-width") && labelWidthRef.current > 0) {
      host.setAttribute("data-initial-label-width", String(labelWidthRef.current));
      initialLabelWidthRef.current = labelWidthRef.current;
    }
    // exposer l’échelle (utile CSS + export)
    host.setAttribute("data-scale", scale);

    barsRef.current.clear();
    if (rootsRef.current.length) {
      const toUnmount = [...rootsRef.current];
      rootsRef.current = [];
      setTimeout(() => {
        toUnmount.forEach((r) => {
          try {
            r.unmount();
          } catch {}
        });
      }, 0);
    }
    host.textContent = "";

    const rawStart = toDate(rangeRef.current.start) ?? new Date();
    const rawEnd = toDate(rangeRef.current.end) ?? addDays(rawStart, 30);
    const projectStart = startOfUnit(rawStart, scale);
    let projectEndUnit = startOfUnit(rawEnd, scale);
    if (+projectEndUnit < +projectStart) projectEndUnit = addUnits(projectStart, 1, scale);
    const unitCount = unitsDiff(projectEndUnit, projectStart, scale) + 1;

    const boundaries = document.createElement("div");
    boundaries.id = "boundaries";
    const timeline = document.createElement("div");
    timeline.className = "timeline";
    const rows = document.createElement("div");
    rows.id = "rows";
    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.style.display = "none";
    host.append(boundaries, timeline, rows, tooltip);

    // timeline header
    const emptyLabel = document.createElement("div");
    emptyLabel.className = "label";
    (emptyLabel.style as any).gridRow = "1 / span 2";
    timeline.appendChild(emptyLabel);

    // Ligne 2 : unités
    for (let i = 0; i < unitCount; i++) {
      const cell = document.createElement("div");
      cell.className = "day"; // "unit"
      const uStart = addUnits(projectStart, i, scale);
      cell.textContent =
        scale === "day"
          ? String(uStart.getUTCDate())
          : scale === "week"
          ? `W${isoWeek(uStart)}`
          : uStart.toLocaleDateString("fr-FR", { month: "short" });
      (cell.style as any).gridColumn = `${i + 2}`;
      (cell.style as any).gridRow = "2";
      timeline.appendChild(cell);
    }

    // Ligne 1 : mois (jour/semaine) ou années (mois)
    if (scale === "day" || scale === "week") {
      let cur = startOfMonthUTC(projectStart);
      const hardEnd = endOfUnit(projectEndUnit, scale);
      while (cur <= hardEnd) {
        const next = new Date(Date.UTC(cur.getUTCFullYear(), cur.getUTCMonth() + 1, 1));
        const startIdx = Math.max(0, unitsDiff(startOfUnit(cur, scale), projectStart, scale));
        const endIdx = Math.min(
          unitCount,
          unitsDiff(startOfUnit(addDays(next, -1), scale), projectStart, scale) + 1
        );
        if (endIdx > startIdx) {
          const monthDiv = document.createElement("div");
          monthDiv.className = "month";
          monthDiv.textContent = cur.toLocaleDateString("fr-FR", {
            month: "short",
            year: "numeric",
          });
          (monthDiv.style as any).gridColumn = `${startIdx + 2} / span ${endIdx - startIdx}`;
          (monthDiv.style as any).gridRow = "1";
          timeline.appendChild(monthDiv);
        }
        cur = next;
      }
    } else {
      // scale === "month"
      let y = projectStart.getUTCFullYear();
      const yEnd = endOfUnit(projectEndUnit, "month").getUTCFullYear();
      while (y <= yEnd) {
        const yearStart = new Date(Date.UTC(y, 0, 1));
        const yearEnd = new Date(Date.UTC(y, 11, 31));
        const startIdx = Math.max(
          0,
          unitsDiff(startOfUnit(yearStart, "month"), projectStart, "month")
        );
        const endIdx = Math.min(
          unitCount,
          unitsDiff(startOfUnit(yearEnd, "month"), projectStart, "month") + 1
        );
        if (endIdx > startIdx) {
          const yearDiv = document.createElement("div");
          yearDiv.className = "month";
          yearDiv.textContent = String(y);
          (yearDiv.style as any).gridColumn = `${startIdx + 2} / span ${endIdx - startIdx}`;
          (yearDiv.style as any).gridRow = "1";
          timeline.appendChild(yearDiv);
        }
        y++;
      }
    }

    // CSS vars et largeurs
    host.style.setProperty("--total-days", String(unitCount)); // "days" = unités
    const totalWidth = `calc(var(--label-width) + ${unitCount} * var(--day-width))`;
    (rows.style as any).width = totalWidth;
    (boundaries.style as any).width = totalWidth;
    (timeline.style as any).width = totalWidth;

    // marqueurs: 1er du mois
    let ms = startOfMonthUTC(projectStart);
    const hardEnd = endOfUnit(projectEndUnit, scale);
    while (ms <= hardEnd) {
      const marker = document.createElement("div");
      marker.className = "marker-line";
      const idx = unitsDiff(startOfUnit(ms, scale), projectStart, scale);
      (marker.style as any).left = `calc(var(--label-width) + ${idx} * var(--day-width))`;
      host.appendChild(marker);
      ms = new Date(Date.UTC(ms.getUTCFullYear(), ms.getUTCMonth() + 1, 1));
    }

    // today line
    const today = new Date();
    if (today >= projectStart && today <= hardEnd) {
      const off = unitsDiff(startOfUnit(today, scale), projectStart, scale);
      const todayLine = document.createElement("div");
      todayLine.className = "today-line";
      (todayLine.style as any).left = `calc(var(--label-width) + ${off} * var(--day-width))`;
      host.appendChild(todayLine);
    }

    frameRef.current = {
      host,
      boundaries,
      timeline,
      rows,
      tooltip,
      dayCount: unitCount,
      totalWidth,
      projectStart,
      projectEnd: hardEnd,
    };
  }, [rangeTick, timeZone, scale]);

  // Empêcher l'auto-fit de resserrer trop les semaines (lisibilité)
  useEffect(() => {
    const host = ganttRef.current;
    if (!host) return;
    const frame = frameRef.current;
    if (!frame) return;

    // Forcer un minimum immédiat après construction
    const minByScale =
      scale === "week"
        ? MIN_UNIT_PX_WEEK
        : scale === "month"
        ? MIN_UNIT_PX_MONTH
        : MIN_UNIT_PX_DAY;
    const cur = getCssVarPx("--day-width", host, 80);
    if (cur < minByScale) host.style.setProperty("--day-width", `${minByScale}px`);

    reapplyAllBars();
  }, [rangeTick, scale]);

  // auto-fit du --day-width (largeur d’une unité) au container/horizon, avec min par échelle
  useEffect(() => {
    const host = ganttRef.current;
    if (!host) return;
    let raf = 0;



    
    const computeUnitWidth = () => {
      const frame = frameRef.current;
      if (!frame) return;

      const labelW = getCssVarPx("--label-width", host, 200);
      const gutters = 24;
      const viewWidth = host.clientWidth;
      const available = Math.max(0, viewWidth - labelW - gutters);

      const units = Math.max(1, frame.dayCount);
      const target = Math.floor(available / units);
      const minByScale =
        scale === "week"
          ? MIN_UNIT_PX_WEEK
          : scale === "month"
          ? MIN_UNIT_PX_MONTH
          : MIN_UNIT_PX_DAY;
      const clamped = Math.max(minByScale, Math.min(MAX_UNIT_PX, target));

      const current = getCssVarPx(
        "--day-width",
        host,
        getCssVarPx("--day-width", undefined, 80)
      );
      if (Math.abs(clamped - current) < 0.5) return;

      const maxBefore = Math.max(1, host.scrollWidth - host.clientWidth);
      const ratio = host.scrollLeft / maxBefore;

      host.style.setProperty("--day-width", `${clamped}px`);
      reapplyAllBars();

      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const maxAfter = Math.max(0, host.scrollWidth - host.clientWidth);
        host.scrollLeft = Math.max(0, Math.min(maxAfter, ratio * maxAfter));
      });
    };

    computeUnitWidth();
    const ro = new ResizeObserver(() => computeUnitWidth());
    ro.observe(host);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [rangeTick, scale]);

  /* ---------- rows & bars ---------- */
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const draggedId = draggingTaskIdRef.current;

    const alive = new Set<number>();
    const colorFor = (t: Task) =>
      (t as any).color || colorMemoRef.current.get(t.id) || "#60a5fa";

    const applyBarLayout = (els: BarEls, task: Task) => {
      const f = frameRef.current!;
      const sDate = toDate(task.start_date) ?? f.projectStart;
      const eDate = toDate(task.end_date) ?? sDate;

      const sUnit = startOfUnit(sDate, scale);
      const eUnit = startOfUnit(eDate, scale);

      const startOffset = unitsDiff(sUnit, f.projectStart, scale);
      const duration = Math.max(1, unitsDiff(eUnit, sUnit, scale) + 1);

      const unitW = getCssVarPx("--day-width", f.host, 80);

      // ⚠️ si on est en train de drag cette barre, ne pas écraser sa position en live
      if (draggedId === task.id) return;

      // priorité à une position "sticky" (post changement de couleur)
      const sticky = stickyPosRef.current.get(task.id);
      if (sticky) {
        els.bar.style.left = `${sticky.left}px`;
        els.bar.style.width = `${sticky.width}px`;
        sticky.frames -= 1;
        if (sticky.frames <= 0) stickyPosRef.current.delete(task.id);
      } else {
        els.bar.style.left = `${startOffset * unitW}px`;
        els.bar.style.width = `${Math.max(unitW, duration * unitW)}px`;
      }

      els.bar.style.top = "50%";
      els.bar.style.transform = "translateY(-50%)";

      const color = colorFor(task);
      colorMemoRef.current.set(task.id, color);
      els.bar.style.setProperty("--bar-color", color);
      // feedback direct (au cas où la CSS n'utilise pas la var)
      try {
        els.bar.style.background = color;
        els.handleLeft.style.background = color;
        els.handleRight.style.background = color;
      } catch {}

      if (els.title.textContent !== (task.name || "")) {
        els.title.textContent = task.name || "";
        els.bar.setAttribute("data-title", task.name || "");
      }
    };

    const ensureRow = (task: Task, index: number): BarEls => {
      const cached = barsRef.current.get(task.id);
      if (cached) {
        if (cached.row !== frame.rows.children[index]) {
          frame.rows.insertBefore(cached.row, frame.rows.children[index] || null);
        }
        return cached;
      }

      const row = document.createElement("div");
      row.className = "row";
      (row.style as any).width = frame.totalWidth;
      row.style.height = "var(--row-height, 44px)"; // hauteur fiable

      // reorder
      row.addEventListener("dragover", (e) => {
        e.preventDefault();
        row.classList.add("is-drag-over");
      });
      row.addEventListener("dragleave", () => {
        row.classList.remove("is-drag-over");
      });
      row.addEventListener("drop", (e) => {
        e.preventDefault();
        row.classList.remove("is-drag-over");
        const fromId = parseInt(e.dataTransfer?.getData("task-id") || "-1");
        if (Number.isNaN(fromId) || fromId === -1) return;
        const fromIndex = tasksRef.current.findIndex((t) => t.id === fromId);
        const toIndex = index;
        if (fromIndex === -1 || fromIndex === toIndex) return;
        const newTasks = [...tasksRef.current];
        const [moved] = newTasks.splice(fromIndex, 1);
        newTasks.splice(toIndex, 0, moved);
        onReorder?.(newTasks);
      });

      // label
      const label = document.createElement("div");
      label.className = "label";
      const hostName = document.createElement("div");
      const hostColor = document.createElement("div");
      const hostDelete = document.createElement("div");
      label.append(hostName, hostColor, hostDelete);

      const nameRoot = createRoot(hostName);
      const colorRoot = createRoot(hostColor);
      const deleteRoot = createRoot(hostDelete);
      rootsRef.current.push(nameRoot, colorRoot, deleteRoot);

      nameRoot.render(
        <EditableRowTitle
          value={task.name || ""}
          onSave={(next) => onTaskUpdate?.({ ...task, name: next })}
          validate={(v) => (v.length === 0 ? "Le titre ne peut pas être vide" : null)}
        />
      );

      const ColorPickerInline = () => {
        const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
        const open = Boolean(anchorEl);
        const current = colorFor(task);

        const choose = (hex: string) => {
          if (!hex || hex === current) return;

          // 1) Mémo
          colorMemoRef.current.set(task.id, hex);

          // 2) Figer position courante pendant le rafraîchissement
          const els2 = barsRef.current.get(task.id);
          if (els2) {
            const left =
              parseFloat(els2.bar.style.left || "0") ||
              Math.max(
                0,
                els2.bar.getBoundingClientRect().left -
                  els2.barZone.getBoundingClientRect().left
              );
            const width =
              parseFloat(els2.bar.style.width || "0") ||
              Math.max(1, els2.bar.getBoundingClientRect().width);
            stickyPosRef.current.set(task.id, { left, width, frames: 2 });

            // 3) Feedback DOM immédiat (même si la CSS n'utilise pas la var)
            els2.bar.style.setProperty("--bar-color", hex);
            try {
              els2.bar.style.background = hex;
              els2.handleLeft.style.background = hex;
              els2.handleRight.style.background = hex;
            } catch {}
          }

          // 4) Persister côté modèle / API
          const latest =
            (tasksRef.current.find((t) => t.id === task.id) || task) as Task;
          onTaskUpdate?.({ ...(latest as any), color: hex } as Task);

          // 5) Recalage des barres si besoin
          requestAnimationFrame(reapplyAllBars);
        };

        return (
          <>
            <IconButton
              size="small"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                setAnchorEl(e.currentTarget);
              }}
              aria-label="Changer la couleur"
              title="Couleur"
            >
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  border: "1px solid rgba(0,0,0,0.2)",
                  bgcolor: current,
                }}
              />
            </IconButton>
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
              <Box
                sx={{
                  p: 1,
                  display: "grid",
                  gridTemplateColumns: "repeat(6, 24px)",
                  gap: 1,
                  m: 1,
                }}
              >
                {PALETTE.map((c) => (
                  <Box
                    key={c}
                    component="button"
                    onClick={() => {
                      choose(c);
                      setAnchorEl(null);
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      border: "1px solid rgba(0,0,0,0.15)",
                      bgcolor: c,
                      cursor: "pointer",
                      p: 0,
                    }}
                  />
                ))}
              </Box>
              <Box
                sx={{
                  p: 1,
                  borderTop: "1px solid #eee",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <input
                  type="color"
                  defaultValue={current}
                  onChange={(e) => choose(e.target.value)}
                  onMouseDown={(e) => e.stopPropagation()}
                  style={{
                    width: 28,
                    height: 28,
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                  aria-label="Couleur personnalisée"
                />
                <Box sx={{ fontSize: 12, color: "text.secondary" }}>
                  Couleur personnalisée
                </Box>
              </Box>
            </Popover>
          </>
        );
      };
      colorRoot.render(<ColorPickerInline />);

      deleteRoot.render(
        <IconButton
          size="small"
          color="error"
          aria-label="Supprimer la tâche"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onRequestDelete?.(task);
          }}
        >
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      );

      // drag reorder via label
      label.draggable = true;
      label.addEventListener("dragstart", (e) => {
        const target = e.target as HTMLElement;
        if (target && (target.tagName === "INPUT" || target.closest("button"))) {
          e.preventDefault();
          return;
        }
        e.dataTransfer?.setData("task-id", task.id.toString());
        (row.style as any).opacity = "0.5";
      });
      label.addEventListener("dragend", () => ((row.style as any).opacity = "1"));
      row.appendChild(label);

      // zone barres
      const barZone = document.createElement("div");
      barZone.className = "bar-zone";
      (barZone.style as any).width = `calc(${frame.dayCount} * var(--day-width))`;
      barZone.style.height = "100%";

      // fond cellules unités
      for (let i = 0; i < frame.dayCount; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        (cell.style as any).left = `calc(${i} * var(--day-width))`;
        barZone.appendChild(cell);
      }

      // barre
      const bar = document.createElement("div");
      bar.className = "bar";
      // Couleur initiale immédiate
      const __initColor = colorFor(task);
      bar.style.setProperty("--bar-color", __initColor);
      bar.style.background = __initColor;
      const title = document.createElement("span");
      title.className = "bar-title";
      title.textContent = task.name || "";
      bar.setAttribute("data-title", task.name || "");
      bar.appendChild(title);

      const handleLeft = document.createElement("div");
      handleLeft.className = "resize-handle left";
      const handleRight = document.createElement("div");
      handleRight.className = "resize-handle right";
      bar.append(handleLeft, handleRight);
      try {
        (handleLeft.style as any).background = __initColor;
        (handleRight.style as any).background = __initColor;
      } catch {}

      // tooltip
      bar.addEventListener("mouseenter", (e) => {
        const f = frameRef.current!;
        const host = f.host;
        const tip = f.tooltip;
        const el = e.currentTarget as HTMLElement;
        const s = (toDate(task.start_date) ?? f.projectStart).toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          timeZone,
        });
        const t = (toDate(task.end_date) ?? f.projectEnd).toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          timeZone,
        });
        tip.textContent = `${task.name} (${s} → ${t}, ${timeZone})`;
        tip.style.display = "block";

        requestAnimationFrame(() => {
          const barRect = el.getBoundingClientRect();
          const hostRect = host.getBoundingClientRect();
          const tipRect = tip.getBoundingClientRect();
          const gap = 8;

          const centerX =
            barRect.left +
            barRect.width / 2 -
            hostRect.left +
            host.scrollLeft;
          const viewLeft = host.scrollLeft;
          const viewRight = host.scrollLeft + host.clientWidth;
          const clampedX = Math.max(
            viewLeft + tipRect.width / 2,
            Math.min(centerX, viewRight - tipRect.width / 2)
          );

          let top =
            barRect.top -
            hostRect.top +
            host.scrollTop -
            (tipRect.height + gap);
          let pos: "above" | "below" = "above";
          if (top < host.scrollTop) {
            top =
              barRect.bottom - hostRect.top + host.scrollTop + gap;
            pos = "below";
          }

          (tip.style as any).left = `${clampedX}px`;
          (tip.style as any).top = `${top}px`;
          tip.setAttribute("data-pos", pos);
        });
      });
      bar.addEventListener("mouseleave", () => {
        const f = frameRef.current!;
        f.tooltip.style.display = "none";
        f.tooltip.removeAttribute("data-pos");
      });

      barZone.appendChild(bar);
      row.appendChild(barZone);
      frame.rows.insertBefore(row, frame.rows.children[index] || null);

      // drag/resize handlers (snap à l’unité)
      const bindDrag = (
        target: HTMLElement,
        taskId: number,
        mode: "move" | "resize-left" | "resize-right"
      ) => {
        let ghost: HTMLDivElement | null = null;
        let pointerId = -1,
          barLeft0 = 0,
          barWidth0 = 0,
          unitW = 0,
          startClientX = 0,
          startScrollLeft = 0;

        const getTaskNow = () => tasksRef.current.find((t) => t.id === taskId);
        const cleanup = () => {
          document.body.style.userSelect = "";
          document.body.style.cursor = "";

          (bar.style as any).cursor = "grab";
          try {
            // @ts-ignore
            if ((bar as any).__prevBg !== undefined) {
              // @ts-ignore
              bar.style.background = (bar as any).__prevBg as string;
              // @ts-ignore
              delete (bar as any).__prevBg;
            }
          } catch {}
          if (ghost) ghost.remove();
          if (pointerId !== -1) {
            try {
              barZone.releasePointerCapture(pointerId);
            } catch {}
          }
          pointerId = -1;
          draggingTaskIdRef.current = null;
          onDragStateChange?.(false);

          const pending = pendingRangeRef.current;
          if (pending) {
            rangeRef.current = pending;
            pendingRangeRef.current = null;
            setRangeTick((v) => v + 1);
          }

          requestAnimationFrame(reapplyAllBars);

          barZone.removeEventListener("pointermove", onPointerMove);
          barZone.removeEventListener("pointerup", onPointerUp);
          barZone.removeEventListener("pointercancel", onCancel);
          barZone.removeEventListener("lostpointercapture", onCancel);
          window.removeEventListener("blur", onCancel);
          window.removeEventListener("mouseup", onCancel);
          window.removeEventListener("pointerup", onCancel);
          document.removeEventListener("visibilitychange", onVisibility);
          window.removeEventListener("contextmenu", onContextMenu);
        };
        const endWithApply = () => {
          if (!ghost) {
            cleanup();
            return;
          }
          const leftPx = parseFloat(ghost.style.left);
          const widthPx = parseFloat(ghost.style.width);
          const startUnits = Math.round(leftPx / unitW);
          const durUnits = Math.max(1, Math.round(widthPx / unitW));

          const f = frameRef.current!;
          const maxUnits = f.dayCount;
          const safeStart = Math.max(0, Math.min(startUnits, maxUnits - durUnits));

          const nextStartUnit = addUnits(f.projectStart, safeStart, scale);
          const lastUnitStart = addUnits(nextStartUnit, durUnits - 1, scale);
          const nextStartDate = nextStartUnit;
          const nextEndDate = endOfUnit(lastUnitStart, scale);

          const tNow = getTaskNow();
          if (tNow) {
            const local = {
              ...tNow,
              start_date: iso(nextStartDate),
              end_date: iso(nextEndDate),
            } as Task;
            const els = barsRef.current.get(taskId);
            if (els) applyBarLayout(els, local);
            onTaskUpdate?.(local);
          }
          cleanup();
        };
        const clampPx = (leftPx: number, widthPx: number) => {
          const f = frameRef.current!;
          const maxPx = f.dayCount * unitW;
          leftPx = Math.max(0, Math.min(leftPx, Math.max(0, maxPx - widthPx)));
          widthPx = Math.max(unitW, Math.min(widthPx, maxPx - leftPx));
          return { leftPx, widthPx };
        };
        const onPointerMove = (e: PointerEvent) => {
          if (!ghost) return;
          const host = frameRef.current!.host;
          const deltaX = e.clientX + host.scrollLeft - (startClientX + startScrollLeft);
          const snapPx = Math.round(deltaX / unitW) * unitW;
          if (mode === "move") {
            const { leftPx, widthPx } = clampPx(
              barLeft0 + snapPx,
              parseFloat(ghost.style.width)
            );
            ghost.style.left = `${leftPx}px`;
            ghost.style.width = `${widthPx}px`;
          } else if (mode === "resize-left") {
            const newLeft = barLeft0 + snapPx;
            const newWidth = barWidth0 - snapPx;
            const { leftPx, widthPx } = clampPx(newLeft, newWidth);
            ghost.style.left = `${leftPx}px`;
            ghost.style.width = `${widthPx}px`;
          } else {
            const newWidth = barWidth0 + snapPx;
            const { leftPx, widthPx } = clampPx(
              parseFloat(ghost.style.left),
              newWidth
            );
            ghost.style.left = `${leftPx}px`;
            ghost.style.width = `${widthPx}px`;
          }
        };
        const onPointerUp = () => endWithApply();
        const onCancel = () => cleanup();
        const onVisibility = () => {
          if (document.visibilityState !== "visible") cleanup();
        };
        const onContextMenu = (ev: Event) => {
          ev.preventDefault();
          cleanup();
        };

        const onPointerDown = (e: PointerEvent) => {
          e.preventDefault();
          e.stopPropagation();
          const tNow = getTaskNow();
          if (!tNow) return;
          draggingTaskIdRef.current = taskId;
          onDragStateChange?.(true);

          (bar.style as any).cursor = "grabbing";
          unitW = getCssVarPx("--day-width", frameRef.current?.host || undefined, 80);

          const host = frameRef.current!.host;
          const barRect = bar.getBoundingClientRect();
          const zoneRect = barZone.getBoundingClientRect();
          barLeft0 = Math.max(
            0,
            parseFloat(bar.style.left) || barRect.left - zoneRect.left
          );
          barWidth0 = Math.max(
            unitW,
            parseFloat(bar.style.width) || barRect.width
          );
          startClientX = e.clientX;
          startScrollLeft = host.scrollLeft;

          ghost = bar.cloneNode(true) as HTMLDivElement;
          ghost.style.opacity = "0.5";
          ghost.style.pointerEvents = "none";
          ghost.style.position = "absolute";
          ghost.style.zIndex = "999";
          ghost.style.left = `${barLeft0}px`;
          ghost.style.top = `${barRect.top - zoneRect.top}px`;
          ghost.style.width = `${barWidth0}px`;
          ghost.style.height = `${barRect.height}px`;
          barZone.appendChild(ghost);

          const id = e.pointerId;
          pointerId = id;
          try {
            barZone.setPointerCapture(id);
          } catch {}
          document.body.style.userSelect = "none";
          document.body.style.cursor = "grabbing";
          barZone.addEventListener("pointermove", onPointerMove, { passive: false });
          barZone.addEventListener("pointerup", onPointerUp, { passive: false });
          barZone.addEventListener("pointercancel", onCancel, { passive: false });
          barZone.addEventListener("lostpointercapture", onCancel, { passive: false });
          window.addEventListener("blur", onCancel, { passive: true });
          window.addEventListener("mouseup", onCancel, { passive: true });
          window.addEventListener("pointerup", onCancel, { passive: true });
          document.addEventListener("visibilitychange", onVisibility, { passive: true });
          window.addEventListener("contextmenu", onContextMenu, { passive: false });
        };

        (target as any).draggable = false;
        target.addEventListener("dragstart", (e) => e.preventDefault());
        target.addEventListener("pointerdown", onPointerDown, { passive: false });
      };

      bindDrag(bar, task.id, "move");
      bindDrag(handleLeft, task.id, "resize-left");
      bindDrag(handleRight, task.id, "resize-right");

      const els: BarEls = {
        row,
        barZone,
        bar,
        title,
        handleLeft,
        handleRight,
        nameRoot,
        colorRoot,
        deleteRoot,
      };
      barsRef.current.set(task.id, els);
      return els;
    };

    // create/update
    tasks.forEach((task, index) => {
      alive.add(task.id);
      const els = ensureRow(task, index);
      applyBarLayout(els, task);
    });

    // prune
    for (const [id, els] of barsRef.current.entries()) {
      if (!alive.has(id)) {
        els.row.remove();
        barsRef.current.delete(id);
      }
    }
  }, [
    tasks,
    timeZone,
    onReorder,
    onTaskUpdate,
    onRequestDelete,
    onDragStateChange,
    rangeTick,
    scale,
  ]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ px: 1, pt: 1 }}
      >
        <IconButton
          size="small"
          aria-label={showLabelsApp ? "Masquer les libellés" : "Afficher les libellés"}
          title={showLabelsApp ? "Masquer les libellés" : "Afficher les libellés"}
          onClick={() => setShowLabelsApp((v) => !v)}
          className="label-toggle-btn"
        >
          {showLabelsApp ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </IconButton>

        <ToggleButtonGroup
          size="small"
          value={scale}
          exclusive
          onChange={(_, val: Scale | null) => val && dispatch(setScaleGlobal(val as any))}
        >
          <ToggleButton value="day">Jour</ToggleButton>
          <ToggleButton value="week">Semaine</ToggleButton>
          <ToggleButton value="month">Mois</ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      <div className="gantt" ref={ganttRef} />
    </Box>
  );
}

export default forwardRef<GanttHandle, ExtendedProps>(GanttChartInner);
// --- fin de fichier ---
