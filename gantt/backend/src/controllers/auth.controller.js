import { logger } from "../utils/logger.js";
import { pool } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export async function signup(req, res, next) {
  try {
    const { email, password, name } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: "Email et mot de passe requis" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const q = `
      INSERT INTO users (email, password_hash, name)
      VALUES ($1, $2, $3)
      RETURNING id, email, name
    `;
    const result = await pool.query(q, [email, hashed, name || null]);
    logger.info(`User signed up: ${email}`);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    logger.error(err);
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: "Email et mot de passe requis" });
    }

    const { rows } = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    const user = rows[0];
    if (!user) {
      return res.status(401).json({
        error: "Identifiants incorrects",
        remaining: req.rateRemaining ?? null,
      });
    }

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.status(401).json({
        error: "Identifiants incorrects",
        remaining: req.rateRemaining ?? null,
      });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "2h" });

    logger.info(`User logged in: ${email}`);
    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name },
      remaining: req.rateRemaining ?? null,
    });
  } catch (err) {
    logger.error(err);
    next(err);
  }
}
