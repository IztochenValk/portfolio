import { useState } from "react";
import { createTask } from "@api"; // ✅ utilise ton helper API
import { CirclePicker, ChromePicker, ColorResult } from "react-color";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Collapse,
  Alert,
} from "@mui/material";

interface Props {
  projectId: number;
  onTaskCreated: () => void;
}

export default function CreateTask({ projectId, onTaskCreated }: Props) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#4287f5");
  const [showPicker, setShowPicker] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setName("");
    setColor("#4287f5");
    setStart("");
    setEnd("");
    setShowPicker(false);
    setError("");
  };

  const handleColorChange = (c: ColorResult) => {
    setColor(c.hex);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createTask(projectId, {
        name,
        color,
        start_date: start,
        end_date: end,
      });
      resetForm();
      onTaskCreated();
    } catch (err: any) {
      setError(err?.response?.data?.error || "Erreur lors de la création de la tâche");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3, maxWidth: 480, mx: "auto", mt: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Créer une tâche
      </Typography>

      <Collapse in={!!error}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          {/* Nom */}
          <TextField
            label="Nom de la tâche"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
          />

          {/* Couleur */}
          <div>
            <Typography variant="body2" sx={{ mb: 1, }}>
              Couleur :
            </Typography>

            <CirclePicker
              width="inherit" 
              colors={[
                "#4287f5",
                "#34d399",
                "#f59e0b",
                "#ef4444",
                "#8b5cf6",
                "#14b8a6",
                "#f43f5e",
                "#000000",
                "#ffffff",
              ]}
              color={color}
              onChange={handleColorChange}
              
            />

            <Button
              size="small"
              variant="outlined"
              sx={{ mt: 1 }}
              onClick={() => setShowPicker((prev) => !prev)}
            >
              {showPicker ? "Fermer le sélecteur avancé" : "Choisir une couleur personnalisée"}
            </Button>

            <Collapse in={showPicker}>
              <div style={{ marginTop: "12px" }}>
                <ChromePicker color={color} onChange={handleColorChange} />
              </div>
            </Collapse>
          </div>

          {/* Dates */}
          <TextField
            type="date"
            label="Date de début"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            type="date"
            label="Date de fin"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
          />

          {/* Bouton submit */}
          <Button
            type="submit"
            variant="contained"
            color="success"
            disabled={loading}
          >
            {loading ? "Ajout en cours..." : "Ajouter"}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
