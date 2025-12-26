import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

export async function renderExportPNG(
  html: string,
  opts: { cssText: string; pixelRatio?: number; theme?: "light"|"dark"; bg?: string } )
{
  const pixelRatio = opts.pixelRatio ?? 3;
  // conteneur offscreen
  const host = document.createElement("div");
  host.style.cssText = "position:fixed; left:-10000px; top:-10000px; width:fit-content; height:fit-content; pointer-events:none; opacity:0;";
  document.body.appendChild(host);

  // Shadow DOM isolé
  const shadow = host.attachShadow({ mode: "open" });

  // CSS export
  const style = document.createElement("style");
  style.textContent = `:host{all:initial} html,body{margin:0;padding:0}
${opts.cssText}`;
  shadow.appendChild(style);

  // Wrapper + thème
  const wrapper = document.createElement("div");
  const theme = opts.theme ?? (document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");
  if (theme) wrapper.setAttribute("data-theme", theme);
  wrapper.innerHTML = html;
  shadow.appendChild(wrapper);

  // attendre fonts (si supporté)
  if ((document as any).fonts?.ready) { try { await (document as any).fonts.ready; } catch {} }

  const dataUrl = await toPng(wrapper, {
    pixelRatio,
    cacheBust: true,
    backgroundColor: opts.bg ?? (theme === "dark" ? "#0f172a" : "#ffffff"),
  });

  document.body.removeChild(host);
  return dataUrl; // "data:image/png;base64,..."
}

export function pngToPdf(pngDataUrl: string, opts?: { orientation?: "p"|"l"; marginMm?: number }) {
  return new Promise<Blob>((resolve) => {
    const img = new Image();
    img.onload = () => {
      const mmPerPx = 25.4 / 96; // approx 96dpi
      const margin = opts?.marginMm ?? 8;
      const pageW = (opts?.orientation === "l") ? 297 : 210;
      const pageH = (opts?.orientation === "l") ? 210 : 297;

      const maxW = pageW - margin*2;
      const maxH = pageH - margin*2;
      const wMm = img.width * mmPerPx;
      const hMm = img.height * mmPerPx;
      const scale = Math.min(maxW / wMm, maxH / hMm, 1);
      const outW = wMm * scale;
      const outH = hMm * scale;

      const pdf = new jsPDF({ orientation: (opts?.orientation === "l" ? "landscape" : "portrait"), unit: "mm", compress: true });
      pdf.addImage(pngDataUrl, "PNG", (pageW - outW)/2, (pageH - outH)/2, outW, outH, undefined, "FAST");
      const blob = pdf.output("blob");
      resolve(blob);
    };
    img.src = pngDataUrl;
  });
}
