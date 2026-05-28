// src/components/ExportGanttButton.tsx
import { useState } from "react";
import { Button, Menu, MenuItem, ListItemText } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import type { GanttHandle } from "@features/gantt/components/GanttChart";

type Props = {
  ganttRef: React.RefObject<GanttHandle>;
  fileBaseName?: string;           // "gantt" par défaut
  externalCssHref?: string;        // ex: "gantt-export.css" si tu fournis un CSS séparé
  cssContent?: string;             // si tu veux aussi proposer le téléchargement du CSS
  title?: string;                  // titre dans le HTML exporté
  startRef?: string;
  endRef?: string;
  timeZone?: string;
};

export default function ExportGanttButton({
  ganttRef,
  fileBaseName = "gantt",
  externalCssHref,
  cssContent,
  title,
  startRef,
  endRef,
  timeZone,
}: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const download = (filename: string, text: string, type = "text/html") => {
    const blob = new Blob([text], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("download", filename);
    a.href = url;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

const handleExport = async () => {
    if (!ganttRef.current) return;
const html = await ganttRef.current!.exportAsHTML({
    title: title || "Diagramme de Gantt",
    
    displayTitle: title || "Diagramme de Gantt",
    startRef,
    endRef,
    timeZone,
    externalCssHref: externalCssHref || "gantt-export.css",
  });
  if (!html) return;
  const filename = `${fileBaseName || "gantt"}.html`;
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};




  const handleExportCSS = () => {
    if (!cssContent) return;
    download(externalCssHref || "gantt-export.css", cssContent, "text/css;charset=utf-8");
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<DownloadIcon />}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        Exporter
      </Button>

      <Menu open={open} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={handleExport}>
          <ListItemText>Exporter en HTML</ListItemText>
        </MenuItem>

        {cssContent && (
          <MenuItem onClick={handleExportCSS}>
            <ListItemText>Exporter CSS</ListItemText>
          </MenuItem>
        )}
      </Menu>
    </>
  );
}
