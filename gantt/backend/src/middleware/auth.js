// backend/src/middleware/auth.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || req.get("Authorization") || "";
  const m = header.match(/^Bearer\s+(.+)$/i);
  if (!m) {
    return res
      .status(401)
      .json({ success: false, error: { message: "Missing or invalid Authorization header", status: 401 } });
  }
  try {
    const payload = jwt.verify(m[1], JWT_SECRET, { algorithms: ["HS256"] });
    const idNum = Number(payload?.id);
    if (!Number.isFinite(idNum)) {
      return res
        .status(401)
        .json({ success: false, error: { message: "Invalid token payload (missing id)", status: 401 } });
    }
    req.user = {
      id: idNum,
      email: typeof payload?.email === "string" ? payload.email : undefined,
      roles: payload?.roles,
    };
    next();
  } catch (err) {
    const msg = err?.name === "TokenExpiredError" ? "Token expired" : "Invalid token";
    return res.status(401).json({ success: false, error: { message: msg, status: 401 } });
  }
}
