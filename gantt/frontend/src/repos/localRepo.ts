// frontend/src/repos/localRepo.ts
import { openDB, IDBPDatabase } from 'idb';
import type { Project } from '../types/project';

type PendingOpType = 'create' | 'update' | 'delete';
type Entity = 'project';

export type PendingOp = {
  cid: string;              // client id unique (uuid ou Date.now string)
  type: PendingOpType;
  entity: Entity;
  payload: any;             // données brutes à rejouer
  ts: number;               // timestamp client
};

type IdMap = {
  // clé: `project:-123` => valeur: 42
  [key: string]: number;
};

let dbp: Promise<IDBPDatabase>;

function getDB() {
  if (!dbp) {
    dbp = openDB('gantt-offline', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('projects')) {
          db.createObjectStore('projects', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('pending')) {
          db.createObjectStore('pending', { keyPath: 'cid' });
        }
        if (!db.objectStoreNames.contains('idmap')) {
          db.createObjectStore('idmap'); // key: `project:-123`, value: positive id
        }
      }
    }) as any;
  }
  return dbp;
}

/* ------------ Projects cache ------------ */
export async function cacheProjects(list: Project[]) {
  const db = await getDB();
  const tx = db.transaction('projects', 'readwrite');
  const store = tx.objectStore('projects');
  for (const p of list) await store.put(p);
  await tx.done;
}

export async function readProjects(): Promise<Project[]> {
  const db = await getDB();
  return db.getAll('projects') as Promise<Project[]>;
}

export async function upsertProject(p: Project) {
  const db = await getDB();
  await db.put('projects', p);
}

export async function removeProject(id: number) {
  const db = await getDB();
  await db.delete('projects', id);
}

/* ------------ Pending ops ------------ */
export async function queueOp(op: PendingOp) {
  const db = await getDB();
  await db.put('pending', op);
}

export async function readPending(): Promise<PendingOp[]> {
  const db = await getDB();
  const all = await db.getAll('pending');
  // tri FIFO par ts
  return (all as PendingOp[]).sort((a, b) => a.ts - b.ts);
}

export async function dropPending(cid: string) {
  const db = await getDB();
  await db.delete('pending', cid);
}

/* ------------ Temp id mapping ------------ */
export async function saveIdMap(entity: Entity, tempId: number, realId: number) {
  const db = await getDB();
  const key = `${entity}:${tempId}`;
  await db.put('idmap', realId, key);
}

export async function getMappedId(entity: Entity, maybeTempId: number): Promise<number | null> {
  if (maybeTempId >= 0) return maybeTempId;
  const db = await getDB();
  const key = `${entity}:${maybeTempId}`;
  const v = await db.get('idmap', key);
  return typeof v === 'number' ? v : null;
}

/* Util pour remplacer un id temporaire dans le cache des projets */
export async function replaceProjectTempId(tempId: number, realId: number) {
  const db = await getDB();
  const p = await db.get('projects', tempId) as Project | undefined;
  if (!p) return;
  await db.delete('projects', tempId);
  p.id = realId;
  await db.put('projects', p);
}
