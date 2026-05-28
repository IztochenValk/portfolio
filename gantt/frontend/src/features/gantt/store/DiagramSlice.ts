// src/store/diagramsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

/* ================== Types ================== */
export type Task = {
  id: number;
  name: string;
  start_date: string; // ISO YYYY-MM-DD
  end_date: string;   // ISO YYYY-MM-DD
  color?: string;
};

export type Diagram = {
  id: string;                  // uuid
  title: string;
  tasks: Task[];
  updatedAt: number;           // mtime local
  status: "dirty" | "synced" | "conflict";
  serverUpdatedAt?: number;    // mtime serveur connu
  projectId?: string | number; // si tu veux grouper par projet
};

type DiagramsState = {
  version: 1;
  byId: Record<string, Diagram>;
  order: string[];               // ordre d’affichage
  lastLoadedFromLocal: number | null;
  lastSyncAt: number | null;
  lastSyncError?: string | null;
};

const VERSION = 1 as const;
const LS_KEY = "gantt:diagrams:v1";

/* ================== Helpers ================== */
const uuid = () =>
  (typeof crypto !== "undefined" && crypto.randomUUID)
    ? crypto.randomUUID()
    : "dg_" + Math.random().toString(36).slice(2) + Date.now().toString(36);

const now = () => Date.now();

/* -------- localStorage persist / load -------- */
function saveToLocal(state: DiagramsState) {
  try {
    const payload = JSON.stringify(state);
    localStorage.setItem(LS_KEY, payload);
  } catch {}
}

function loadFromLocal(): DiagramsState | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    // migration (simple ici)
    if (parsed.version !== VERSION) {
      // …migration éventuelle si besoin
      parsed.version = VERSION;
    }
    return parsed as DiagramsState;
  } catch {
    return null;
  }
}

/* ================== API (thunk) ================== */
export type SyncAllArgs = { token: string; userId: string | number; preferLocal?: boolean };
export type RootStateLike = { diagrams: DiagramsState };

import * as api from "@/services/diagramsApi"; // ↓ fournis plus bas

export const syncAll = createAsyncThunk<
  { mergedIds: string[] },
  SyncAllArgs,
  { state: RootStateLike }
>("diagrams/syncAll", async (args, thunkApi) => {
  const { getState, rejectWithValue } = thunkApi;
  const state = getState().diagrams;

  try {
    // 1) Pull serveur (tout)
    const serverList = await api.fetchUserDiagrams(args.token);
    const serverById = new Map<string, Diagram>();
    serverList.forEach((d) => serverById.set(d.id, d));

    // 2) Merge & push (upsert) si local est plus récent ou inexistant côté serveur
    const mergedIds: string[] = [];
    for (const id of state.order) {
      const local = state.byId[id];
      const remote = serverById.get(id);

      if (!remote) {
        // n’existe pas côté serveur → créer
        await api.upsertDiagram(args.token, local);
        mergedIds.push(id);
        continue;
      }

      // existe des deux côtés : conflit ?
      const localNewer = (local.updatedAt || 0) > (remote.serverUpdatedAt || remote.updatedAt || 0);
      const remoteNewer = (remote.serverUpdatedAt || remote.updatedAt || 0) > (local.updatedAt || 0);

      if (localNewer || args.preferLocal) {
        await api.upsertDiagram(args.token, local);
        mergedIds.push(id);
      } else if (remoteNewer) {
        // On « préfère serveur » par défaut → renvoyé au reducer côté fulfilled pour écraser local
        // (rien à faire ici, on passe le remote via meta later si besoin)
      } else {
        // à l’heure → rien
      }

      // consommer cette entrée côté map pour détecter celles uniquement coté serveur
      serverById.delete(id);
    }

    // 3) Les restants côté serveur (absents en local) → on les rajoute en local
    const newFromServer = Array.from(serverById.values());

    return { mergedIds, /* utiliser meta to pass newFromServer */ } as any;
  } catch (e: any) {
    return rejectWithValue(e?.message || "sync failed");
  }
});

/* ================== Slice ================== */
const initialState: DiagramsState = {
  version: VERSION,
  byId: {},
  order: [],
  lastLoadedFromLocal: null,
  lastSyncAt: null,
  lastSyncError: null,
};

const diagramsSlice = createSlice({
  name: "diagrams",
  initialState,
  reducers: {
    loadLocalIfAny(state) {
      const loaded = loadFromLocal();
      if (!loaded) {
        state.lastLoadedFromLocal = now();
        return;
      }
      return loaded; // RTK remplace proprement l’état
    },

    createDiagram(
      state,
      action: PayloadAction<{ id?: string; title?: string; projectId?: string | number }>
    ) {
      const id = action.payload.id || uuid();
      if (state.byId[id]) return;
      const d: Diagram = {
        id,
        title: action.payload.title || "Nouveau diagramme",
        tasks: [],
        updatedAt: now(),
        status: "dirty",
        projectId: action.payload.projectId,
      };
      state.byId[id] = d;
      state.order.unshift(id);
    },

    removeDiagram(state, action: PayloadAction<{ id: string }>) {
      const id = action.payload.id;
      delete state.byId[id];
      state.order = state.order.filter((x) => x !== id);
    },

    setTitle(state, action: PayloadAction<{ id: string; title: string }>) {
      const d = state.byId[action.payload.id];
      if (!d) return;
      d.title = action.payload.title;
      d.updatedAt = now();
      d.status = "dirty";
    },

    replaceAllTasks(state, action: PayloadAction<{ id: string; tasks: Task[] }>) {
      const d = state.byId[action.payload.id];
      if (!d) return;
      d.tasks = action.payload.tasks.slice();
      d.updatedAt = now();
      d.status = "dirty";
    },

    updateTask(state, action: PayloadAction<{ id: string; task: Task }>) {
      const d = state.byId[action.payload.id];
      if (!d) return;
      const t = action.payload.task;
      const i = d.tasks.findIndex((x) => x.id === t.id);
      if (i === -1) d.tasks.push(t);
      else d.tasks[i] = t;
      d.updatedAt = now();
      d.status = "dirty";
    },

    deleteTask(state, action: PayloadAction<{ id: string; taskId: number }>) {
      const d = state.byId[action.payload.id];
      if (!d) return;
      d.tasks = d.tasks.filter((x) => x.id !== action.payload.taskId);
      d.updatedAt = now();
      d.status = "dirty";
    },

    reorderTasks(state, action: PayloadAction<{ id: string; newOrder: Task[] }>) {
      const d = state.byId[action.payload.id];
      if (!d) return;
      d.tasks = action.payload.newOrder.slice();
      d.updatedAt = now();
      d.status = "dirty";
    },

    // Appelé après un push réussi
    markSynced(state, action: PayloadAction<{ id: string; serverUpdatedAt?: number }>) {
      const d = state.byId[action.payload.id];
      if (!d) return;
      d.status = "synced";
      d.serverUpdatedAt = action.payload.serverUpdatedAt || d.updatedAt;
    },

    // Quand on choisit d’écraser par la version serveur
    replaceWithServer(state, action: PayloadAction<Diagram>) {
      const d = action.payload;
      state.byId[d.id] = {
        ...d,
        status: "synced",
        serverUpdatedAt: d.serverUpdatedAt || d.updatedAt,
      };
      if (!state.order.includes(d.id)) state.order.unshift(d.id);
    },

    // Import massif depuis serveur (ex: première connexion)
    importFromServer(state, action: PayloadAction<Diagram[]>) {
      for (const d of action.payload) {
        state.byId[d.id] = {
          ...d,
          status: "synced",
          serverUpdatedAt: d.serverUpdatedAt || d.updatedAt,
        };
        if (!state.order.includes(d.id)) state.order.push(d.id);
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(syncAll.pending, (state) => {
        state.lastSyncError = null;
      })
      .addCase(syncAll.fulfilled, (state, action) => {
        state.lastSyncAt = now();
        // NB: on n’a pas récupéré explicitement les « newFromServer » dans payload (simpleté)
        // => si tu veux rapatrier aussi ceux absents localement, fais-le dans le hook (voir plus bas).
      })
      .addCase(syncAll.rejected, (state, action) => {
        state.lastSyncError = (action.payload as any) || "sync failed";
      });
  },
});

export const {
  loadLocalIfAny,
  createDiagram,
  removeDiagram,
  setTitle,
  replaceAllTasks,
  updateTask,
  deleteTask,
  reorderTasks,
  markSynced,
  replaceWithServer,
  importFromServer,
} = diagramsSlice.actions;

export const diagramsReducer = diagramsSlice.reducer;

/* ================== Selectors ================== */
export const selectAllDiagrams = (s: RootStateLike) =>
  s.diagrams.order.map((id) => s.diagrams.byId[id]).filter(Boolean);

export const selectDiagramById =
  (id: string) =>
  (s: RootStateLike): Diagram | undefined =>
    s.diagrams.byId[id];

export const selectDiagramTasks =
  (id: string) =>
  (s: RootStateLike): Task[] =>
    s.diagrams.byId[id]?.tasks || [];

/* ================== Persistence (à appeler au boot) ================== */
export function attachDiagramsPersistence(store: { getState: () => RootStateLike; subscribe: (fn: () => void) => () => void }) {
  let prev = store.getState().diagrams;
  const debounced = debounce(() => {
    const cur = store.getState().diagrams;
    if (cur !== prev) {
      saveToLocal(cur);
      prev = cur;
    }
  }, 300);
  return store.subscribe(debounced);
}

function debounce<T extends (...a: any[]) => void>(fn: T, ms = 200): T {
  let t: any = null;
  return ((...args: any[]) => {
    if (t) clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  }) as T;
}
