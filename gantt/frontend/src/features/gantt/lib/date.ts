export type Scale = "day" | "week" | "month" | "quarter" | "year";

export const toDate = (v: unknown): Date | null => {
  if (!v) return null;
  if (v instanceof Date) return isNaN(+v) ? null : v;
  if (typeof v === "number") {
    const d = new Date(v);
    return isNaN(+d) ? null : d;
    }
  if (typeof v === "string") {
    const s = v.trim();
    if (!s) return null;
    const d = new Date(s);
    if (!isNaN(+d)) return d;
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
    if (m) {
      const [_, Y, M, D] = m;
      const d2 = new Date(Date.UTC(+Y, +M - 1, +D));
      return isNaN(+d2) ? null : d2;
    }
  }
  return null;
};

const sod = (d: Date) => new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
const sow = (d: Date) => {
  const day = d.getUTCDay();               // 0=Sun
  const diff = (day + 6) % 7;              // Monday=0
  const base = sod(d);
  base.setUTCDate(base.getUTCDate() - diff);
  return base;
};
const som = (d: Date) => new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1));
const soq = (d: Date) => new Date(Date.UTC(d.getUTCFullYear(), Math.floor(d.getUTCMonth() / 3) * 3, 1));
const soy = (d: Date) => new Date(Date.UTC(d.getUTCFullYear(), 0, 1));

export const startOfUnit = (d: Date, scale: Scale): Date => {
  switch (scale) {
    case "day": return sod(d);
    case "week": return sow(d);
    case "month": return som(d);
    case "quarter": return soq(d);
    case "year": return soy(d);
    default: return sod(d);
  }
};

export const unitsDiff = (a: Date, b: Date, scale: Scale): number => {
  const A = startOfUnit(a, scale).getTime();
  const B = startOfUnit(b, scale).getTime();
  const oneDay = 24 * 60 * 60 * 1000;

  switch (scale) {
    case "day": return Math.floor((A - B) / oneDay);
    case "week": return Math.floor((A - B) / (7 * oneDay));
    case "month": {
      const ad = new Date(A), bd = new Date(B);
      return (ad.getUTCFullYear() - bd.getUTCFullYear()) * 12 + (ad.getUTCMonth() - bd.getUTCMonth());
    }
    case "quarter": {
      const ad = new Date(A), bd = new Date(B);
      const aq = Math.floor(ad.getUTCMonth() / 3), bq = Math.floor(bd.getUTCMonth() / 3);
      return (ad.getUTCFullYear() - bd.getUTCFullYear()) * 4 + (aq - bq);
    }
    case "year": {
      const ad = new Date(A), bd = new Date(B);
      return ad.getUTCFullYear() - bd.getUTCFullYear();
    }
  }
  return 0;
};

export const blobToDataURL = (blob: Blob): Promise<string> =>
  new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(String(r.result));
    r.onerror = rej;
    r.readAsDataURL(blob);
  });

export const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = src;
  });
