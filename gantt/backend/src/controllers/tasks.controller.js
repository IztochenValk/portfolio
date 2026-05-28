import { logger } from "../utils/logger.js";
import { pool } from "../db.js";
import { dateOnlyOrNull } from "../utils/date.js";

export async function list(req, res, next) {
  try {
    const projectId = Number(req.params.id);
    if (!Number.isInteger(projectId)) return res.status(400).json({ error: "Id projet invalide" });

    const own = await pool.query("SELECT 1 FROM projects WHERE id=$1 AND user_id=$2", [projectId, req.user.id]);
    if (own.rowCount === 0) return res.status(404).json({ error: "Projet introuvable" });

    const q = `
      SELECT id, project_id, name, color, start_date, end_date, position
      FROM tasks
      WHERE project_id=$1
      ORDER BY position NULLS LAST, id ASC
    `;
    const result = await pool.query(q, [projectId]);
    logger.info(`Tasks listed for project ${projectId} by user ${req.user.id}`);
    res.json(result.rows);
  } catch (err) {
    logger.error(err);
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    const projectId = Number(req.params.id);
    if (!Number.isInteger(projectId)) return res.status(400).json({ error: "Id projet invalide" });

    const { name, color, start_date, end_date, position } = req.body || {};
    if (!name) return res.status(400).json({ error: "Champs requis manquants: name" });

    const own = await pool.query("SELECT 1 FROM projects WHERE id=$1 AND user_id=$2", [projectId, req.user.id]);
    if (own.rowCount === 0) return res.status(404).json({ error: "Projet introuvable" });

    const sd = dateOnlyOrNull(start_date);
    const ed = dateOnlyOrNull(end_date);

    const q = `
      INSERT INTO tasks (project_id, name, color, start_date, end_date, position)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, project_id, name, color, start_date, end_date, position
    `;
    const result = await pool.query(q, [projectId, name, color ?? null, sd, ed, position ?? null]);
    logger.info(`Task created in project ${projectId}: ${name}`);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    logger.error(err);
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    const projectId = Number(req.params.projectId);
    const taskId = Number(req.params.taskId);
    if (!Number.isInteger(projectId) || !Number.isInteger(taskId)) {
      return res.status(400).json({ error: "Id invalide" });
    }

    const own = await pool.query("SELECT 1 FROM projects WHERE id=$1 AND user_id=$2", [projectId, req.user.id]);
    if (own.rowCount === 0) return res.status(404).json({ error: "Projet introuvable" });

    const { name, color, start_date, end_date, position } = req.body || {};
    const sd = dateOnlyOrNull(start_date);
    const ed = dateOnlyOrNull(end_date);

    const q = `
      UPDATE tasks
      SET name       = COALESCE($1, name),
          color      = COALESCE($2, color),
          start_date = COALESCE($3, start_date),
          end_date   = COALESCE($4, end_date),
          position   = COALESCE($5, position)
      WHERE id = $6 AND project_id = $7
      RETURNING id, project_id, name, color, start_date, end_date, position
    `;
    const result = await pool.query(q, [name ?? null, color ?? null, sd, ed, position ?? null, taskId, projectId]);

    if (result.rows.length === 0) return res.status(404).json({ error: "Tâche introuvable" });
    logger.info(`Task updated: ID ${taskId} in project ${projectId}`);
    res.json(result.rows[0]);
  } catch (err) {
    logger.error(err);
    next(err);
  }
}

export async function reorder(req, res, next) {
  try {
    const projectId = Number(req.params.id);
    if (!Number.isInteger(projectId)) return res.status(400).json({ error: "Id projet invalide" });

    const { order } = req.body || {};
    if (!Array.isArray(order) || order.length === 0) {
      return res.status(400).json({ error: "Payload invalide: 'order' requis" });
    }

    const own = await pool.query("SELECT 1 FROM projects WHERE id=$1 AND user_id=$2", [projectId, req.user.id]);
    if (own.rowCount === 0) return res.status(404).json({ error: "Projet introuvable" });

    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      for (const { taskId, position } of order) {
        if (!Number.isInteger(taskId)) throw new Error("taskId invalide");
        await client.query(
          "UPDATE tasks SET position=$1 WHERE id=$2 AND project_id=$3",
          [position ?? null, taskId, projectId]
        );
      }
      await client.query("COMMIT");
    logger.info(`Tasks reordered in project ${projectId} by user ${req.user.id}`);
      res.json({ success: true });
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  } catch (err) {
    logger.error(err);
    next(err);
  }
}
