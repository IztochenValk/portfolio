import { logger } from "../utils/logger.js";
/**
 * Middleware global de gestion des erreurs
 */
export function errorHandler(err, _req, res, _next) {
  logger.error({ err }, "Ì¥• ERROR");

  // Statut HTTP par d√©faut
  const status = err.status || 500;

  // R√©ponse JSON unifi√©e
  res.status(status).json({
    success: false,
    error: {
      message: err.message || "Internal server error",
      status,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    },
  });
}
