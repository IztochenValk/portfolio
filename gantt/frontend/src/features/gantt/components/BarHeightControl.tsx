import * as React from "react";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getBarHeight, setBarHeight } from "@features/gantt/lib/style";

type Props = {
  min?: number;
  max?: number;
  step?: number;
  persistKey?: string; // localStorage key
};

const DEFAULT_KEY = "gantt.barHeight";

export default function BarHeightControl({
  min = 10,
  max = 48,
  step = 1,
  persistKey = DEFAULT_KEY,
}: Props) {
  const initial = React.useMemo(() => {
    const saved = Number(localStorage.getItem(persistKey));
    return Number.isFinite(saved) ? saved : getBarHeight();
  }, [persistKey]);

  const [value, setValue] = React.useState<number>(initial);

  // Applique immédiatement (onChange), fluide au drag du slider
  const handleChange = (_: Event, v: number | number[]) => {
    const px = Array.isArray(v) ? v[0] : v;
    setValue(px);
    setBarHeight(px); // ajuste aussi --row-height
  };

  // Persiste à la fin du drag
  const handleCommit = (_: React.SyntheticEvent | Event, v: number | number[]) => {
    const px = Array.isArray(v) ? v[0] : v;
    localStorage.setItem(persistKey, String(px));
  };

  React.useEffect(() => {
    // s'assure que la valeur initiale est bien appliquée au chargement
    setBarHeight(initial);
  }, [initial]);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, minWidth: 220 }}>
      <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
        Hauteur barres
      </Typography>
      <Slider
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        onChangeCommitted={handleCommit}
        valueLabelDisplay="auto"
        marks={[
          { value: 12, label: "12" },
          { value: 16, label: "16" },
          { value: 20, label: "20" },
          { value: 24, label: "24" },
          { value: 32, label: "32" },
          { value: 40, label: "40" },
        ]}
        sx={{ width: 160 }}
        aria-label="Hauteur des barres du Gantt"
      />
      <Typography variant="body2" sx={{ width: 28, textAlign: "right" }}>
        {value}px
      </Typography>
    </Box>
  );
}
