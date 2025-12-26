import { pool } from "../db.js";
import { dateOnlyOrNull } from "../utils/date.js";

const PROJECT_FIELDS = "id, name, description, created_at, horizon_months, end_override";

export async function listProjects(userId) {
  const q = `
    SELECT ${PROJECT_FIELDS}
    FROM projects
    WHERE user_id=$1
    ORDER BY created_at DESC
  `;
  const result = await pool.query(q, [userId]);
  return result.rows;
}

export async function getProjectById(userId, projectId) {
  const q = `
    SELECT ${PROJECT_FIELDS}
    FROM projects
    WHERE id=$1 AND user_id=$2
  `;
  const result = await pool.query(q, [projectId, userId]);
  return result.rows[0] || null;
}

export async function createProject(userId, { name, description }) {
  const q = `
    INSERT INTO projects (user_id, name, description)
    VALUES ($1, $2, $3)
    RETURNING ${PROJECT_FIELDS}
  `;
  const result = await pool.query(q, [userId, name.trim(), description || null]);
  return result.rows[0];
}

export async function updateProject(userId, projectId, { horizon_months, end_override }) {
  const sets = [];
  const params = [];
  let idx = 1;

  if (typeof horizon_months === "number" && Number.isFinite(horizon_months)) {
    sets.push(`horizon_months = $${idx++}`);
    params.push(horizon_months);
  }

  if (end_override !== undefined) {
    sets.push(`end_override = $${idx++}`);
    params.push(dateOnlyOrNull(end_override));
  }

  if (sets.length === 0) {
    const q = `SELECT ${PROJECT_FIELDS} FROM projects WHERE id=$1 AND user_id=$2`;
    const result = await pool.query(q, [projectId, userId]);
    return result.rows[0] || null;
  }

  params.push(projectId, userId);

  const q = `
    UPDATE projects
    SET ${sets.join(", ")}
    WHERE id = $${idx++} AND user_id = $${idx++}
    RETURNING ${PROJECT_FIELDS}
  `;
  const result = await pool.query(q, params);
  return result.rows[0] || null;
}

export async function deleteProject(userId, projectId) {
  const q = "DELETE FROM projects WHERE id=$1 AND user_id=$2 RETURNING id";
  const result = await pool.query(q, [projectId, userId]);
  return result.rowCount > 0;
}
