import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";

import { a } from "./middlewares/async.js";
import { pool } from "./db.js";
import { httpLogger } from "./utils/logger.js";
import { errorHandler } from "./middlewares/error.js";
import { loginLimiter, globalLimiter, withLoginAttempts } from "./middlewares/rateLimit.js";

// routes
import authRoutes from "./routes/auth.routes.js";
import projectsRoutes from "./routes/projects.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";

dotenv.config();
const app = express();

/* ---------- Middlewares ---------- */
const RAW_CORS = process.env.CORS_ORIGIN;

//Autorise plusieurs origines via une liste séparée par des virgules dans CORS_ORIGIN
const CORS_ORIGINS = RAW_CORS.split(",").map(s => s.trim()).filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (/^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) return cb(null, true);
    if (CORS_ORIGINS.includes(origin)) return cb(null, true);
    return cb(new Error("CORS blocked: " + origin));
  },
  credentials: true,
}));
app.use(express.json());
app.use(httpLogger);
app.use(helmet());
app.use(globalLimiter);

/* ---------- Health ---------- */
app.get("/health", a(async (_req, res) => {
  const { rows } = await pool.query("SELECT 1 AS ok");
  res.json({ ok: true, db: rows[0]?.ok === 1 });
}));

/* ---------- Routes ---------- */
// anti-bruteforce uniquement sur /login
app.use("/api/auth/login", withLoginAttempts, loginLimiter);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/projects", tasksRoutes);

/* ---------- 404 & Error ---------- */
app.use((_req, res) => res.status(404).json({ error: "Not found" }));
app.use(errorHandler);

export default app;
