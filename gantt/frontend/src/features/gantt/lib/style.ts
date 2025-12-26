// Petit helper pour lire une var CSS (en px)
export const readCssVarPx = (name: string, fallback: number) => {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const n = parseFloat(raw);
  return Number.isFinite(n) ? n : fallback;
};

/**
 * Change dynamiquement la hauteur des barres.
 * Par défaut on ajuste aussi la hauteur de rangée pour garder les barres centrées.
 */
export function setBarHeight(
  px: number,
  opts?: { autoRowHeight?: boolean; rowPadding?: number; minRowHeight?: number }
) {
  const { autoRowHeight = true, rowPadding = 12, minRowHeight = 28 } = opts || {};
  const root = document.documentElement;

  const clamped = Math.max(8, Math.min(px, 64)); // bornes de sécurité
  root.style.setProperty("--bar-height", `${clamped}px`);

  if (autoRowHeight) {
    const rowH = Math.max(clamped + rowPadding, minRowHeight);
    root.style.setProperty("--row-height", `${rowH}px`);
  }
}

export const getBarHeight = () => readCssVarPx("--bar-height", 14);
