// src/api.ts
// Offline-friendly API: pas de réseau en mode invité/offline, utilise un cache local.
// Gère Projects + Tasks pour que des imports comme { createTask } continuent de marcher.

import { cacheProjects, readProjects, queueOp, upsertProject, removeProject } from "./repos/localRepo";
import type { Project } from "./types/project";
import type { Task } from "./types/tasks";

/* ---------------- utils: auth/guest ---------------- */

function isGuest() {
  try {
    return localStorage.getItem("authToken") === "guest";
  } catch {
    return false;
  }
}

function authHeaders(): Record<string, string> {
  try {
    const token = localStorage.getItem("authToken");
    if (token === "guest") return {};
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch {
    return {};
  }
}

const makeCid = () => String(Date.now()) + Math.random().toString(16).slice(2);

/* ---------------- local storage pour les tasks ---------------- */

type TaskMap = Record<string, Task[]>; // key = project_id as string

function readTaskMap(): TaskMap {
  try {
    const raw = localStorage.getItem("offline:tasks");
    return raw ? (JSON.parse(raw) as TaskMap) : {};
  } catch {
    return {};
  }
}

function writeTaskMap(map: TaskMap) {
  try {
    localStorage.setItem("offline:tasks", JSON.stringify(map));
  } catch {}
}

function getTasksForProject(projectId: number): Task[] {
  const map = readTaskMap();
  return map[String(projectId)] ?? [];
}

function setTasksForProject(projectId: number, tasks: Task[]) {
  const map = readTaskMap();
  map[String(projectId)] = tasks;
  writeTaskMap(map);
}

const nextTempId = () => -Date.now();

/* ---------------- Projects ---------------- */

export type ProjectInput = Omit<Project, "id"> & { id?: number };

export async function listProjects(): Promise<Project[]> {
  if (isGuest() || !navigator.onLine) return await readProjects();
  try {
    const res = await fetch("/api/projects", { headers: { ...authHeaders() } });
    if (!res.ok) throw new Error("net list fail");
    const data = (await res.json()) as Project[];
    await cacheProjects(data);
    return data;
  } catch {
    return await readProjects();
  }
}

export async function createProject(input: ProjectInput): Promise<Project> {
  if (isGuest() || !navigator.onLine) {
    const temp: Project = { id: nextTempId(), ...(input as any) };
    await upsertProject(temp);
    await queueOp({ cid: makeCid(), type: "create", entity: "project", payload: temp, ts: Date.now() });
    return temp;
  }
  try {
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify(input),
    });
    if (!res.ok) throw new Error("net create fail");
    const created = (await res.json()) as Project;
    await upsertProject(created);
    return created;
  } catch {
    const temp: Project = { id: nextTempId(), ...(input as any) };
    await upsertProject(temp);
    await queueOp({ cid: makeCid(), type: "create", entity: "project", payload: temp, ts: Date.now() });
    return temp;
  }
}

export async function updateProject(id: number, patch: Partial<Project>): Promise<Project> {
  const merged: Project = { ...(patch as any), id };
  if (isGuest() || !navigator.onLine) {
    await upsertProject(merged);
    await queueOp({ cid: makeCid(), type: "update", entity: "project", payload: merged, ts: Date.now() });
    return merged;
  }
  try {
    const res = await fetch(`/api/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify(merged),
    });
    if (!res.ok) throw new Error("net update fail");
    const updated = (await res.json()) as Project;
    await upsertProject(updated);
    return updated;
  } catch {
    await upsertProject(merged);
    await queueOp({ cid: makeCid(), type: "update", entity: "project", payload: merged, ts: Date.now() });
    return merged;
  }
}

export async function deleteProject(id: number): Promise<void> {
  if (isGuest() || !navigator.onLine) {
    await removeProject(id);
    await queueOp({ cid: makeCid(), type: "delete", entity: "project", payload: { id }, ts: Date.now() });
    return;
  }
  try {
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE", headers: { ...authHeaders() } });
    if (!res.ok) throw new Error("net delete fail");
    await removeProject(id);
  } catch {
    await removeProject(id);
    await queueOp({ cid: makeCid(), type: "delete", entity: "project", payload: { id }, ts: Date.now() });
  }
}

/* ---------------- Tasks ---------------- */

export async function listTasks(projectId: number): Promise<Task[]> {
  if (isGuest() || !navigator.onLine) {
    return getTasksForProject(projectId);
  }
  try {
    const res = await fetch(`/api/projects/${projectId}/tasks`, { headers: { ...authHeaders() } });
    if (!res.ok) throw new Error("net tasks list fail");
    const tasks = (await res.json()) as Task[];
    setTasksForProject(projectId, tasks);
    return tasks;
  } catch {
    return getTasksForProject(projectId);
  }
}

export async function createTask(
  projectId: number,
  payload: { name: string; color?: string; start_date?: string | null; end_date?: string | null; position?: number | null }
): Promise<Task> {
  if (isGuest() || !navigator.onLine) {
    const tasks = getTasksForProject(projectId);
    const task: Task = {
      id: nextTempId(),
      project_id: projectId,
      name: payload.name,
      color: payload.color ?? null,
      start_date: payload.start_date ?? null,
      end_date: payload.end_date ?? null,
      position: payload.position ?? (tasks.length ? Math.max(...tasks.map(t => t.position ?? 0)) + 1 : 0),
    };
    setTasksForProject(projectId, [...tasks, task]);
    await queueOp({ cid: makeCid(), type: "create", entity: "task", payload: task, ts: Date.now() } as any);
    return task;
  }
  const res = await fetch(`/api/projects/${projectId}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("net create task fail");
  const created = (await res.json()) as Task;
  const tasks = getTasksForProject(projectId);
  setTasksForProject(projectId, [...tasks, created]);
  return created;
}

export async function updateTask(
  projectId: number,
  taskId: number,
  payload: { name?: string | null; color?: string | null; start_date?: string | null; end_date?: string | null; position?: number | null }
): Promise<Task> {
  if (isGuest() || !navigator.onLine) {
    const tasks = getTasksForProject(projectId);
    const idx = tasks.findIndex(t => t.id === taskId);
    const base = idx >= 0 ? tasks[idx] : ({ id: taskId, project_id: projectId } as any);
    const updated: Task = { ...base, ...payload };
    if (idx >= 0) tasks[idx] = updated;
    else tasks.push(updated);
    setTasksForProject(projectId, tasks);
    await queueOp({ cid: makeCid(), type: "update", entity: "task", payload: updated, ts: Date.now() } as any);
    return updated;
  }
  const res = await fetch(`/api/projects/${projectId}/tasks/${taskId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("net update task fail");
  const updated = (await res.json()) as Task;
  const tasks = getTasksForProject(projectId).map(t => (t.id === taskId ? updated : t));
  setTasksForProject(projectId, tasks);
  return updated;
}

export async function reorderTasks(projectId: number, order: Array<{ taskId: number; position: number }>) {
  if (isGuest() || !navigator.onLine) {
    const tasks = getTasksForProject(projectId).map(t => {
      const m = order.find(o => o.taskId === t.id);
      return m ? { ...t, position: m.position } : t;
    });
    setTasksForProject(projectId, tasks);
    await queueOp({
      cid: makeCid(),
      type: "update",
      entity: "task",
      payload: { project_id: projectId, order },
      ts: Date.now(),
    } as any);
    return { success: true as const };
  }
  const res = await fetch(`/api/projects/${projectId}/tasks/reorder`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ order }),
  });
  if (!res.ok) throw new Error("net reorder tasks fail");
  const data = await res.json();
  return data as { success: true };
}

export async function deleteTask(projectId: number, taskId: number): Promise<void> {
  if (isGuest() || !navigator.onLine) {
    const tasks = getTasksForProject(projectId).filter(t => t.id !== taskId);
    setTasksForProject(projectId, tasks);
    await queueOp({
      cid: makeCid(),
      type: "delete",
      entity: "task",
      payload: { id: taskId, project_id: projectId },
      ts: Date.now(),
    } as any);
    return;
  }
  const res = await fetch(`/api/projects/${projectId}/tasks/${taskId}`, {
    method: "DELETE",
    headers: { ...authHeaders() },
  });
  if (!res.ok) throw new Error("net delete task fail");
  const tasks = getTasksForProject(projectId).filter(t => t.id !== taskId);
  setTasksForProject(projectId, tasks);
}

/* ---------------- Auth: login / signup / logout ---------------- */

export async function login(body: { email: string; password: string }) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(
      (data.error || "Échec de connexion") +
        (data.remaining !== undefined ? " (tentatives restantes: " + data.remaining + ")" : "")
    );
  }
  try {
    if (data?.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("authToken", data.token);
      localStorage.removeItem("guestMode");
    }
  } catch {}
  return data as { token: string; user: { id: number; email: string; name?: string | null } };
}

export async function signup(body: { email: string; password: string }) {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Échec d’inscription");
  return res.json();
}

export function setAuthToken(token: string | null) {
  try {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("authToken", token);
      localStorage.removeItem("guestMode");
    } else {
      localStorage.removeItem("authToken");
      localStorage.removeItem("token");
    }
  } catch {}
}

export async function logout() {
  const token =
    (typeof localStorage !== "undefined" &&
      (localStorage.getItem("authToken") || localStorage.getItem("token"))) ||
    null;

  const guestFlag =
    (typeof localStorage !== "undefined" &&
      (localStorage.getItem("guestMode") === "1" || token === "guest")) ||
    false;

  if (!guestFlag && navigator.onLine && token) {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      });
    } catch {
      /* ignore réseau */
    }
  }

  try {
    localStorage.removeItem("authToken");
    localStorage.removeItem("token");
    localStorage.removeItem("guestMode");
  } catch {}
}

/* ---------------- Facade default ---------------- */

const API = {
  listProjects,
  createProject,
  updateProject,
  deleteProject,
  listTasks,
  createTask,
  updateTask,
  reorderTasks,
  deleteTask,
  login,
  signup,
};

export default API;
export { API };
