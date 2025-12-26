import * as projectService from "../services/projects.service.js";

export async function list(req, res, next) {
  try {
    const rows = await projectService.listProjects(req.user.id);
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

export async function getOne(req, res, next) {
  try {
    const projectId = Number(req.params.id);
    if (!Number.isInteger(projectId)) {
      return res.status(400).json({ error: "Id projet invalide" });
    }
    const project = await projectService.getProjectById(req.user.id, projectId);
    if (!project) return res.status(404).json({ error: "Projet introuvable" });
    res.json(project);
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    const { name, description } = req.body || {};
    if (!name?.trim()) return res.status(400).json({ error: "Le nom est requis" });

    const project = await projectService.createProject(req.user.id, name.trim(), description);
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    const projectId = Number(req.params.id);
    if (!Number.isInteger(projectId)) {
      return res.status(400).json({ error: "Id projet invalide" });
    }

    const project = await projectService.updateProject(req.user.id, projectId, req.body);
    if (!project) return res.status(404).json({ error: "Projet introuvable" });
    res.json(project);
  } catch (err) {
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    const projectId = Number(req.params.id);
    if (!Number.isInteger(projectId)) {
      return res.status(400).json({ error: "Id projet invalide" });
    }

    const ok = await projectService.deleteProject(req.user.id, projectId);
    if (!ok) return res.status(404).json({ error: "Projet introuvable" });

    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
