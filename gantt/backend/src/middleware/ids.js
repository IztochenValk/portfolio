// backend/src/middleware/ids.js
export const INT32_MAX = 2147483647;
export const INT32_MIN = -2147483648;

/**
 * Valide un param d'URL comme entier dans [min,max] et remplace la string par un Number.
 * Par défaut: min=1 pour refuser 0 et négatifs (évite les IDs temporaires/offline).
 */
export function requireIntIdParam(name = "id", { min = 1, max = INT32_MAX } = {}) {
  return (req, res, next) => {
    const raw = req.params?.[name];
    const n = Number(raw);
    if (!Number.isInteger(n) || n < min || n > max) {
      return res.status(400).json({
        success: false,
        error: { message: `Invalid ${name} (must be integer between ${min} and ${max})`, status: 400 },
      });
    }
    req.params[name] = n;
    next();
  };
}
