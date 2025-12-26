// frontend/src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import ganttUiReducer, { setScale, setShowLabels } from "@features/gantt/store/ganttUiSlice";

// Persistance locale
const LS_SCALE_KEY = "gantt.scale";
const LS_LABELS_KEY = "gantt.showLabels";
type Scale = "day" | "week" | "month";

export const store = configureStore({
  reducer: {
    ganttUi: ganttUiReducer,
  },
});

// --- HYDRATION depuis localStorage (navigateur uniquement) ---
if (typeof window !== "undefined") {
  try {
    const rawScale = localStorage.getItem(LS_SCALE_KEY);
    if (rawScale === "day" || rawScale === "week" || rawScale === "month") {
      store.dispatch(setScale(rawScale as Scale));
    }

    const rawLabels = localStorage.getItem(LS_LABELS_KEY);
    if (rawLabels === "true" || rawLabels === "false") {
      store.dispatch(setShowLabels(rawLabels === "true"));
    }
  } catch {
    // ignore
  }

  // --- PERSISTENCE automatique à chaque changement ---
  store.subscribe(() => {
    try {
      const s = store.getState() as {
        ganttUi: { scale: Scale; showLabels: boolean };
      };
      localStorage.setItem(LS_SCALE_KEY, s.ganttUi.scale);
      localStorage.setItem(LS_LABELS_KEY, String(s.ganttUi.showLabels));
    } catch {
      // ignore
    }
  });
}

// Types usuels
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
