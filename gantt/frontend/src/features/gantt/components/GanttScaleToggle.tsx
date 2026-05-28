// frontend/src/components/GanttScaleToggle.tsx
import * as React from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

export type ScaleMode = "day" | "week" | "month";

export interface GanttScaleToggleProps {
  value: ScaleMode;
  onChange: (mode: ScaleMode) => void;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
}

const LABELS: Record<ScaleMode, string> = {
  day: "Jour",
  week: "Semaine",
  month: "Mois",
};

export default function GanttScaleToggle({
  value,
  onChange,
  size = "small",
  disabled = false,
}: GanttScaleToggleProps) {
  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    next: ScaleMode | null
  ) => {
    if (!next) return; // évite de désélectionner tout
    onChange(next);
  };

  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={handleChange}
      size={size}
      disabled={disabled}
      aria-label="Échelle du diagramme"
    >
      <ToggleButton value="day" aria-label={LABELS.day}>
        {LABELS.day}
      </ToggleButton>
      <ToggleButton value="week" aria-label={LABELS.week}>
        {LABELS.week}
      </ToggleButton>
      <ToggleButton value="month" aria-label={LABELS.month}>
        {LABELS.month}
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
