import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";

type Props = {
  value: string;
  palette: string[];
  onChange: (hex: string) => void;
};

export default function ColorPickerInline({ value, palette, onChange }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const pick = (hex: string) => {
    if (!hex || hex === value) return;
    onChange(hex);
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        size="small"
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => { e.stopPropagation(); setAnchorEl(e.currentTarget); }}
        aria-label="Changer la couleur"
        title="Couleur"
      >
        <Box sx={{ width: 16, height: 16, borderRadius: "50%", border: "1px solid rgba(0,0,0,0.2)", bgcolor: value }} />
      </IconButton>

      <Popover open={open} anchorEl={anchorEl} onClose={() => setAnchorEl(null)} anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
        <Box sx={{ p: 1, display: "grid", gridTemplateColumns: "repeat(6, 24px)", gap: 1, m: 1 }}>
          {palette.map((c) => (
            <Box
              key={c}
              component="button"
              onClick={() => pick(c)}
              onMouseDown={(e) => e.stopPropagation()}
              sx={{ width: 24, height: 24, borderRadius: "50%", border: "1px solid rgba(0,0,0,0.15)", bgcolor: c, cursor: "pointer", p: 0 }}
            />
          ))}
        </Box>
        <Box sx={{ p: 1, borderTop: "1px solid #eee", display: "flex", alignItems: "center", gap: 1 }}>
          <input
            type="color"
            defaultValue={value}
            onChange={(e) => pick(e.target.value)}
            onMouseDown={(e) => e.stopPropagation()}
            style={{ width: 28, height: 28, border: "none", background: "transparent", cursor: "pointer" }}
            aria-label="Couleur personnalisée"
          />
          <Box sx={{ fontSize: 12, color: "text.secondary" }}>Couleur personnalisée</Box>
        </Box>
      </Popover>
    </>
  );
}
