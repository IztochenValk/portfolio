import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pg;
export const pool = new Pool({
  user: process.env.DB_USER || "admin",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "gantt",
  password: process.env.DB_PASS || "admin",
  port: Number(process.env.DB_PORT || 3232),
});
