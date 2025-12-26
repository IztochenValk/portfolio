// frontend/src/store/ganttUiSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Scale = "day" | "week" | "month";

export interface GanttUiState {
  scale: Scale;
  showLabels: boolean;
  showBars: boolean; // NEW
}

const initialState: GanttUiState = {
  scale: "day",
  showLabels: true,
  showBars: true, // NEW: par défaut, barres visibles
};

const ganttUiSlice = createSlice({
  name: "ganttUi",
  initialState,
  reducers: {
    setScale(state, action: PayloadAction<Scale>) {
      state.scale = action.payload;
    },
    setShowLabels(state, action: PayloadAction<boolean>) {
      state.showLabels = action.payload;
    },
    toggleShowLabels(state) {
      state.showLabels = !state.showLabels;
    },

    // NEW: bars visibility
    setShowBars(state, action: PayloadAction<boolean>) {
      state.showBars = action.payload;
    },
    toggleShowBars(state) {
      state.showBars = !state.showBars;
    },
  },
});

export const {
  setScale,
  setShowLabels,
  toggleShowLabels,
  setShowBars,      // NEW
  toggleShowBars,  // NEW
} = ganttUiSlice.actions;

export default ganttUiSlice.reducer;

// Selectors
export const selectScale = (state: { ganttUi: GanttUiState }) => state.ganttUi.scale;
export const selectShowLabels = (state: { ganttUi: GanttUiState }) => state.ganttUi.showLabels;
export const selectShowBars = (state: { ganttUi: GanttUiState }) => state.ganttUi.showBars; // NEW
