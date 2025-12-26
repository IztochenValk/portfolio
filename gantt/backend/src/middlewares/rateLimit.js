// src/middlewares/rateLimit.js
import { rateLimit, ipKeyGenerator } from "express-rate-limit";

/**
 * Limiteur global pour l'API
 * - Pas de keyGenerator custom ici → on laisse celui par défaut
 * - ipv6Subnet pris en compte par le keyGenerator par défaut
 */
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  limit: 100,
  standardHeaders: "draft-8", // en-tête normalisé "RateLimit"
  legacyHeaders: false,       // pas de X-RateLimit-*
  ipv6Subnet: 56,             // /56 par défaut (ajuste si besoin)
  requestPropertyName: "rateLimit", // infos attachées à req.rateLimit
  message: { error: "Trop de requêtes, réessayez plus tard." },
});

/**
 * Limiteur dédié au login
 * - keyGenerator sécurisé IPv6 via ipKeyGenerator()
 * - message JSON personnalisé
 */
export const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 min
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  requestPropertyName: "rateLimit",
  keyGenerator: (req, res) => {
    // Si tu as un user déjà identifié en amont:
    if (req.user?.id) return `user:${req.user.id}`;

    // Sinon fallback IP, sécurisé IPv6 (important)
    // Optionnel: ipKeyGenerator(req.ip, 64) si tu veux forcer un subnet précis
    return ipKeyGenerator(req.ip);
  },
  handler: (req, res) => {
    const info = req.rateLimit; // { limit, used, remaining, resetTime, ... }
    const retryAfterSecs =
      res.getHeader("Retry-After") ??
      (info?.resetTime
        ? Math.max(0, Math.ceil((info.resetTime.getTime() - Date.now()) / 1000))
        : undefined);

    res.status(429).json({
      error: "Trop de tentatives de connexion, réessayez plus tard.",
      remaining: 0,
      ...(retryAfterSecs ? { retryAfter: Number(retryAfterSecs) } : {}),
    });
  },
});

/**
 * Expose proprement le "remaining" au reste de ta stack
 * - Priorité à req.rateLimit (fiable)
 * - Fallback sur les en-têtes si jamais
 */
export function withLoginAttempts(req, res, next) {
  if (req.rateLimit && typeof req.rateLimit.remaining === "number") {
    req.rateRemaining = req.rateLimit.remaining;
    return next();
  }

  // Fallback en-têtes (au cas où tu actives un autre draft/legacy)
  const rlCombined = res.getHeader("RateLimit"); // draft-7/8
  const rlRemaining =
    res.getHeader("RateLimit-Remaining") || // draft-6
    res.getHeader("X-RateLimit-Remaining"); // legacy

  if (typeof rlRemaining !== "undefined") {
    req.rateRemaining = Number(rlRemaining);
  } else if (typeof rlCombined === "string") {
    // Ex: "limit=5, remaining=0, reset=42"
    const m = rlCombined.match(/remaining=(\d+)/);
    req.rateRemaining = m ? Number(m[1]) : null;
  } else {
    req.rateRemaining = null;
  }
  next();
}
