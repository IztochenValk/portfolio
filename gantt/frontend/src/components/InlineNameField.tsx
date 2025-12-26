import * as React from "react";
import TextField from "@mui/material/TextField";

type Props = {
  defaultValue: string;
  onCommit: (next: string) => void;
};

export default function InlineNameField({ defaultValue, onCommit }: Props) {
  return (
    <TextField
      size="small"
      variant="outlined"
      defaultValue={defaultValue}
      inputProps={{ "aria-label": "Nom de la tâche" }}
      sx={{ "& .MuiInputBase-root": { height: 32 }, "& input": { p: "6px 8px" }, width: "100%" }}
      onMouseDown={(e) => e.stopPropagation()}
      onKeyDown={(e) => {
        if (e.key === "Enter") (e.currentTarget as HTMLInputElement).blur();
      }}
      onBlur={(e) => {
        const next = e.target.value.trim();
        if (next && next !== defaultValue) onCommit(next);
      }}
    />
  );
}
