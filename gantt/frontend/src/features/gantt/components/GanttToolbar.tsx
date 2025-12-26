// frontend/src/components/GanttToolbar.tsx
import * as React from "react";
import { Stack, IconButton, Tooltip as MuiTooltip } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";

import ExportGantt from "@features/gantt/components/ExportGantt";
import type { GanttHandle } from "@features/gantt/components/GanttChart";
import GanttScaleToggle, { type ScaleMode } from "@features/gantt/components/GanttScaleToggle";

import { selectShowLabels, toggleShowLabels } from "@features/gantt/store/ganttUiSlice";

export interface GanttToolbarProps {
  onAddTask: () => void;
  chartRef: React.RefObject<GanttHandle>;
  exportTitle: string;
  startISO: string;
  endISO: string;
  cssFilename?: string;
  scale: ScaleMode;
  onScaleChange: (mode: ScaleMode) => void;
  leftExtra?: React.ReactNode;
  rightExtra?: React.ReactNode;
  marginBottom?: number | string;
}

/**
 * Barre d’outils :
 * - À gauche : (leftExtra) + toggle colonne des labels + sélecteur Jour/Semaine/Mois + bouton (+)
 * - À droite : (rightExtra) + export
 */
export default function GanttToolbar({
  onAddTask,
  chartRef,
  exportTitle,
  startISO,
  endISO,
  cssFilename = "gantt-export.css",
  scale,
  onScaleChange,
  leftExtra,
  rightExtra,
  marginBottom = 1,
}: GanttToolbarProps) {
  const dispatch = useDispatch();
  const showLabels = useSelector(selectShowLabels);

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing={2}
      sx={{ mb: marginBottom }}
    >
      {/* GAUCHE : extras + (toggle colonne labels) + échelle + bouton + */}
      <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
        {leftExtra}

        <GanttScaleToggle value={scale} onChange={onScaleChange} />

        <MuiTooltip title="Ajouter une tâche">
          <IconButton
            size="small"
            color="primary"
            onClick={onAddTask}
            aria-label="Ajouter une tâche"
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </MuiTooltip>
      </Stack>

      {/* DROITE : extras + export */}
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        flexWrap="wrap"
        justifyContent="flex-end"
      >
        {rightExtra}
        <ExportGantt
          chartRef={chartRef}
          title={exportTitle}
          startISO={startISO}
          endISO={endISO}
          cssFilename={cssFilename}
        />
      </Stack>
    </Stack>
  );
}
