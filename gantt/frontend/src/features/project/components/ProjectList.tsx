// src/components/ProjectList.tsx
import { useEffect, useState } from "react";
import { listProjects, deleteProject, type Project } from "@api";
import {
  List, ListItem, ListItemText, IconButton, Paper, Stack, Typography, Dialog,
  DialogTitle, DialogContent, DialogContentText, DialogActions, Button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ProjectList({ onSelect, activeId, onChanged }: {
  onSelect: (id: number)=>void; activeId: number | null; onChanged: ()=>void;
}) {
  const [items, setItems] = useState<Project[]>([]);
  const [confirmId, setConfirmId] = useState<number | null>(null);

  async function load() {
    setItems(await listProjects());
  }
  useEffect(() => { load(); }, []);

  async function handleDelete() {
    if (!confirmId) return;
    await deleteProject(confirmId);
    setConfirmId(null);
    await load();
    onChanged();
  }

  return (
    <Paper elevation={1} className="p-2">
      <Stack spacing={1}>
        <Typography variant="h6" className="px-2 pt-2">Projets</Typography>
        <List dense>
          {items.map(p => (
            <ListItem key={p.id}
              secondaryAction={
                <IconButton edge="end" onClick={() => setConfirmId(p.id)} aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              }
              onClick={()=>onSelect(p.id)}
              selected={activeId === p.id}
              sx={{ cursor: "pointer" }}
            >
              <ListItemText primary={p.name} secondary={p.description || "—"} />
            </ListItem>
          ))}
          {items.length === 0 && (
            <div className="p-4 text-sm text-slate-500">Aucun projet.</div>
          )}
        </List>
      </Stack>

      <Dialog open={confirmId !== null} onClose={()=>setConfirmId(null)}>
        <DialogTitle>Supprimer ce projet ?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Cette action supprimera également toutes les tâches associées. Opération irréversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setConfirmId(null)}>Annuler</Button>
          <Button color="error" variant="contained" onClick={handleDelete}>Supprimer</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
