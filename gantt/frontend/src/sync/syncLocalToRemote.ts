// frontend/src/sync/syncLocalToRemote.ts
import {
  readPending,
  dropPending,
  getMappedId,
  saveIdMap,
  replaceProjectTempId,
  removeProject,
  upsertProject,
} from "../repos/localRepo";
import type { PendingOp } from "../repos/localRepo";

function authHeaders(): Record<string, string> {
  const token =
    (typeof window !== "undefined" &&
      (localStorage.getItem("authToken") || localStorage.getItem("authToken"))) ||
    null;
  if (!token || token === "guest") return {};
  return { Authorization: `Bearer ${token}` };
}

async function applyOp(op: PendingOp) {
  if (op.entity !== "project") return;

  if (op.type === "create") {
    const body = { ...op.payload };
    delete (body as any).id;
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error("create failed");
    const created = await res.json();
    await saveIdMap("project", op.payload.id, created.id);
    await replaceProjectTempId(op.payload.id, created.id);
    await upsertProject(created);
    return;
  }

  if (op.type === "update") {
    let id = op.payload.id as number;
    const mapped = await getMappedId("project", id);
    if (mapped && mapped >= 0) id = mapped;
    const res = await fetch(`/api/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify(op.payload),
    });
    if (!res.ok) throw new Error("update failed");
    const updated = await res.json();
    await upsertProject(updated);
    return;
  }

  if (op.type === "delete") {
    let id = op.payload.id as number;
    const mapped = await getMappedId("project", id);
    if (mapped && mapped >= 0) id = mapped;
    if (id < 0) {
      await removeProject(id);
      return;
    }
    const res = await fetch(`/api/projects/${id}`, {
      method: "DELETE",
      headers: { ...authHeaders() },
    });
    if (!res.ok) throw new Error("delete failed");
    await removeProject(id);
  }
}

export async function syncNow(): Promise<{ done: number; left: number }> {
  if (!navigator.onLine) {
    const q = await readPending();
    return { done: 0, left: q.length };
  }
  const queue = await readPending();
  let done = 0;
  for (const op of queue) {
    try {
      await applyOp(op);
      await dropPending(op.cid);
      done++;
    } catch {
      break;
    }
  }
  const left = (await readPending()).length;
  return { done, left };
}

export { syncNow as syncLocalToRemote };
