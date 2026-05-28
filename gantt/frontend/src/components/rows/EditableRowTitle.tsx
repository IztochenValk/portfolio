import { useEffect, useMemo, useRef, useState } from "react";
import { Stack, TextField, IconButton, Tooltip, CircularProgress } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

type EditableRowTitleProps = {
  value: string;
  onSave: (next: string) => Promise<void> | void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  validate?: (v: string) => string | null;
};

export default function EditableRowTitle({
  value,
  onSave,
  placeholder = "Nom de la tâche",
  disabled,
  className,
  validate,
}: EditableRowTitleProps) {
  const [editing, setEditing] = useState(false);
  const [local, setLocal] = useState(value ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!editing) setLocal(value ?? "");
  }, [value, editing]);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const canSave = useMemo(() => {
    if (saving) return false;
    const trimmed = local.trim();
    if (validate) return !validate(trimmed) && trimmed !== (value ?? "").trim();
    return trimmed.length > 0 && trimmed !== (value ?? "").trim();
  }, [local, saving, value, validate]);

  const cancel = () => {
    setError(null);
    setLocal(value ?? "");
    setEditing(false);
  };

  const commit = async () => {
    const trimmed = local.trim();
    const maybeErr = validate?.(trimmed) ?? null;
    if (maybeErr) {
      setError(maybeErr);
      return;
    }
    if (trimmed === (value ?? "").trim()) {
      setEditing(false);
      return;
    }
    try {
      setSaving(true);
      await onSave(trimmed);
      setEditing(false);
      setError(null);
    } catch (e: any) {
      setError(e?.message || "Échec de la sauvegarde");
    } finally {
      setSaving(false);
    }
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (canSave) void commit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      cancel();
    }
  };

  // Empêche le drag de la rangée quand on clique/édite le titre
  const stopRowDrag: React.MouseEventHandler = (e) => e.stopPropagation();

  return (
    <Stack
      className={className}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ minHeight: 32, gap: 0.5 }}
      onMouseDown={stopRowDrag}
      onPointerDown={stopRowDrag}
    >
      {editing ? (
        <TextField
          inputRef={inputRef}
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          size="small"
          error={!!error}
          helperText={error ?? " "}
          disabled={disabled || saving}
          fullWidth
          variant="outlined"
          InputProps={{ sx: { height: 32, "& input": { p: "6px 8px" } } }}
        />
      ) : (
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
          title={value}
        >
          <span
            style={{
              fontSize: "0.9rem",
              fontWeight: 600,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {value}
          </span>
        </div>
      )}

      {editing ? (
        <>
          <Tooltip title="Valider">
            <span>
              <IconButton
                size="small"
                onClick={commit}
                disabled={!canSave}
                aria-label="Valider le titre"
              >
                {saving ? <CircularProgress size={18} /> : <CheckIcon fontSize="small" />}
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Annuler">
            <IconButton
              size="small"
              onClick={cancel}
              disabled={saving}
              aria-label="Annuler l’édition"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Tooltip title="Modifier le titre">
          <span>
            <IconButton
              size="small"
              onClick={() => setEditing(true)}
              disabled={disabled}
              aria-label="Modifier le titre"
            >
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
      )}
    </Stack>
  );
}
