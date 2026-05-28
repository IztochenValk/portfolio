import { RefObject, useMemo, useState } from "react";
import type { GanttHandle, ExportScale, ExportTheme } from "@features/gantt/components/GanttChart";
import {
  Button, CircularProgress, Tooltip, Stack, FormControl, InputLabel, Select, MenuItem
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { renderExportPNG, pngToPdf } from "@features/gantt/utils/exportSnapshot";

type Props = {
  chartRef: RefObject<GanttHandle>;
  title: string;
  startISO: string;
  endISO: string;
  cssFilename?: string;  // ex: "gantt-export.css" (dans /public)
  fileBase?: string;
};

function downloadBlob(name: string, blob: Blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function dataURLtoBlob(dataUrl: string): Blob {
  const [meta, b64] = dataUrl.split(",");
  const mime = /data:(.*?);base64/.exec(meta)?.[1] || "image/png";
  const binStr = atob(b64);
  const len = binStr.length;
  const u8 = new Uint8Array(len);
  for (let i = 0; i < len; i++) u8[i] = binStr.charCodeAt(i);
  return new Blob([u8], { type: mime });
}

function extractBodyInner(html: string) {
  const m = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return m ? m[1] : html;
}

export default function ExportGantt({
  chartRef,
  title,
  startISO,
  endISO,
  cssFilename = "gantt-export.css",
  fileBase,
}: Props) {
  const [busy, setBusy] = useState<"html" | "png" | "pdf" | null>(null);
  const [scaleOpt, setScaleOpt] = useState<"current" | ExportScale>("current");
  const [themeOpt, setThemeOpt] = useState<"current" | ExportTheme>("current");

  const safeBase = useMemo(
    () =>
      (fileBase ||
        title.replace(/[^\w\-]+/g, "_").replace(/^_+|_+$/g, "") ||
        "diagramme"),
    [fileBase, title]
  );

  const resolvedScale = scaleOpt === "current" ? undefined : (scaleOpt as ExportScale);
  const resolvedTheme = themeOpt === "current" ? undefined : (themeOpt as ExportTheme);

  const exportHTML = async () => {
    if (!chartRef.current) return;
    setBusy("html");
    try {
      const base = import.meta.env.BASE_URL || "/";
      const cssText = await fetch(`${base}${cssFilename}`, { cache: "no-store" }).then((r) => r.text());
      const html = await chartRef.current.exportAsHTML({
        title,
        displayTitle: title,
        startRef: startISO,
        endRef: endISO,
        cssText,
        theme: resolvedTheme,
        scale: resolvedScale,
      });
      const blob = new Blob([html], { type: "text/html;charset=utf-8" });
      downloadBlob(`${safeBase}.html`, blob);
    } finally {
      setBusy(null);
    }
  };

  // PNG/PDF = snapshot du même HTML export que ci-dessus, avec la CSS d'export appliquée.
  const exportPNG = async () => {
    if (!chartRef.current) return;
    setBusy("png");
    try {
      const base = import.meta.env.BASE_URL || "/";
      const cssText = await fetch(`${base}${cssFilename}`, { cache: "no-store" }).then((r) => r.text());
      const fullHtml = await chartRef.current.exportAsHTML({
        title,
        displayTitle: title,
        startRef: startISO,
        endRef: endISO,
        // NB: on pourrait ne PAS passer cssText pour éviter doublons,
        // mais on extrait juste le <body> ci-dessous, donc ok.
        cssText,
        theme: resolvedTheme,
        scale: resolvedScale,
      });
      const inner = extractBodyInner(fullHtml);
      const dataUrl = await renderExportPNG(inner, {
        cssText,
        pixelRatio: 3,
        theme: resolvedTheme,
      });
      const blob = dataURLtoBlob(dataUrl);
      downloadBlob(`${safeBase}.png`, blob);
    } finally {
      setBusy(null);
    }
  };

  const exportPDF = async () => {
    if (!chartRef.current) return;
    setBusy("pdf");
    try {
      const base = import.meta.env.BASE_URL || "/";
      const cssText = await fetch(`${base}${cssFilename}`, { cache: "no-store" }).then((r) => r.text());
      const fullHtml = await chartRef.current.exportAsHTML({
        title,
        displayTitle: title,
        startRef: startISO,
        endRef: endISO,
        cssText,
        theme: resolvedTheme,
        scale: resolvedScale,
      });
      const inner = extractBodyInner(fullHtml);
      const dataUrl = await renderExportPNG(inner, {
        cssText,
        pixelRatio: 3,
        theme: resolvedTheme,
      });
      const pdfBlob = await pngToPdf(dataUrl, { orientation: "l" });
      downloadBlob(`${safeBase}.pdf`, pdfBlob);
    } finally {
      setBusy(null);
    }
  };

  return (
    <Stack direction="row" gap={1} alignItems="center" flexWrap="wrap">
      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel id="scale-label">Échelle</InputLabel>
        <Select
          labelId="scale-label"
          label="Échelle"
          value={scaleOpt}
          onChange={(e) => setScaleOpt(e.target.value as any)}
        >
          <MenuItem value="current">Affichage courant</MenuItem>
          <MenuItem value="day">Jour</MenuItem>
          <MenuItem value="week">Semaine</MenuItem>
          <MenuItem value="month">Mois</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel id="theme-label">Thème</InputLabel>
        <Select
          labelId="theme-label"
          label="Thème"
          value={themeOpt}
          onChange={(e) => setThemeOpt(e.target.value as any)}
        >
          <MenuItem value="current">Thème courant</MenuItem>
          <MenuItem value="light">Clair</MenuItem>
          <MenuItem value="dark">Sombre</MenuItem>
        </Select>
      </FormControl>

      <Tooltip title="HTML autonome avec CSS inliné">
        <span>
          <Button onClick={exportHTML} disabled={!!busy} variant="outlined" size="small" startIcon={<DownloadIcon />}>
            {busy === "html" ? <CircularProgress size={16} /> : "HTML"}
          </Button>
        </span>
      </Tooltip>

      <Tooltip title="Image PNG (haute résolution)">
        <span>
          <Button onClick={exportPNG} disabled={!!busy} variant="outlined" size="small" startIcon={<DownloadIcon />}>
            {busy === "png" ? <CircularProgress size={16} /> : "PNG"}
          </Button>
        </span>
      </Tooltip>

      <Tooltip title="PDF (taille adaptée)">
        <span>
          <Button onClick={exportPDF} disabled={!!busy} variant="outlined" size="small" startIcon={<DownloadIcon />}>
            {busy === "pdf" ? <CircularProgress size={16} /> : "PDF"}
          </Button>
        </span>
      </Tooltip>
    </Stack>
  );
}
