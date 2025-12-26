// src/components/ProjectForm.tsx
import { useState } from "react";
import { createProject } from "@api";
import { TextField, Button, Stack, Paper } from "@mui/material";

export default function ProjectForm({ onCreated }: { onCreated: () => void }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    try {
      await createProject({ name: name.trim(), description: desc.trim() || undefined });
      setName(""); setDesc(""); onCreated();
    } finally { setLoading(false); }
  }

  return (
    <Paper className="p-4" elevation={1}>
      <form onSubmit={submit}>
        <Stack spacing={2}>
          <TextField label="Nom du projet" value={name} onChange={e=>setName(e.target.value)} required />
          <TextField label="Description" value={desc} onChange={e=>setDesc(e.target.value)} multiline minRows={2}/>
          <div className="flex justify-end">
            <Button type="submit" variant="contained" disabled={loading || !name.trim()}>
              Créer
            </Button>
          </div>
        </Stack>
      </form>
    </Paper>
  );
}
