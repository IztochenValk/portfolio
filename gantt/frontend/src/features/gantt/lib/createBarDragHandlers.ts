import type { MutableRefObject } from "react";
import type { Task } from "@types/tasks";

type Frame = {
  host: HTMLDivElement; rows: HTMLDivElement; dayCount: number;
  projectStart: Date; projectEnd: Date;
};

type Deps = {
  frameRef: MutableRefObject<Frame | null>;
  tasksRef: MutableRefObject<Task[]>;
  draggingTaskIdRef: MutableRefObject<number | null>;
  onTaskUpdate?: (t: Task) => void;
  onDragStateChange?: (b: boolean) => void;
  cssDayWidth: () => number;
  addDays: (d: Date, days: number) => Date;
  iso: (d: Date) => string;
  applyBarLayout: (els: any, task: Task) => void;
  barsRef: MutableRefObject<Map<number, any>>;
};

export function createBarDragHandlers(deps: Deps) {
  const {
    frameRef, tasksRef, draggingTaskIdRef, onTaskUpdate, onDragStateChange,
    cssDayWidth, addDays, iso, applyBarLayout, barsRef,
  } = deps;

  const setupHorizontalDrag = (
    target: HTMLElement,
    taskId: number,
    mode: "move" | "resize-left" | "resize-right",
    bar: HTMLElement,
    barZone: HTMLElement
  ) => {
    let ghost: HTMLDivElement | null = null;
    let pointerId = -1;
    let barLeft0 = 0;
    let barWidth0 = 0;
    let dayW = 0;
    let startClientX = 0;

    const getTaskNow = () => tasksRef.current.find((t) => t.id === taskId);

    const cleanup = () => {
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
      bar.classList.remove("dragging");
      bar.style.cursor = "grab";
      if (ghost) { ghost.remove(); ghost = null; }
      if (pointerId !== -1) { try { barZone.releasePointerCapture(pointerId); } catch {} }
      pointerId = -1;
      draggingTaskIdRef.current = null;
      onDragStateChange?.(false);

      barZone.removeEventListener("pointermove", onPointerMove);
      barZone.removeEventListener("pointerup", onPointerUp);
      barZone.removeEventListener("pointercancel", onCancel);
      barZone.removeEventListener("lostpointercapture", onCancel);
      window.removeEventListener("blur", onCancel);
      window.removeEventListener("mouseup", onCancel);
      window.removeEventListener("pointerup", onCancel);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("contextmenu", onContextMenu);
    };

    const endWithApply = () => {
      const frame = frameRef.current!;
      if (!ghost || !frame) { cleanup(); return; }

      const leftPx = parseFloat(ghost.style.left);
      const widthPx = parseFloat(ghost.style.width);
      const startDays = Math.round(leftPx / dayW);
      const durDays = Math.max(1, Math.round(widthPx / dayW));

      const safeStart = Math.max(0, Math.min(startDays, frame.dayCount - durDays));
      const nextStart = addDays(frame.projectStart, safeStart);
      const nextEnd = addDays(nextStart, durDays - 1);

      const tNow = getTaskNow();
      if (tNow) {
        const local = { ...tNow, start_date: iso(nextStart), end_date: iso(nextEnd) };
        const els = barsRef.current.get(taskId);
        if (els) applyBarLayout(els, local);
        onTaskUpdate?.(local);
      }
      cleanup();
    };

    const clampPx = (leftPx: number, widthPx: number) => {
      const frame = frameRef.current!;
      const maxPx = frame.dayCount * dayW;
      leftPx = Math.max(0, Math.min(leftPx, Math.max(0, maxPx - widthPx)));
      widthPx = Math.max(dayW, Math.min(widthPx, maxPx - leftPx));
      return { leftPx, widthPx };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!ghost) return;
      const deltaX = e.clientX - startClientX;
      const snapPx = Math.round(deltaX / dayW) * dayW;

      if (mode === "move") {
        const { leftPx, widthPx } = clampPx(barLeft0 + snapPx, parseFloat(ghost.style.width));
        ghost.style.left = `${leftPx}px`; ghost.style.width = `${widthPx}px`;
      } else if (mode === "resize-left") {
        const newLeft = barLeft0 + snapPx;
        const newWidth = barWidth0 - snapPx;
        const { leftPx, widthPx } = clampPx(newLeft, newWidth);
        ghost.style.left = `${leftPx}px`; ghost.style.width = `${widthPx}px`;
      } else {
        const newWidth = barWidth0 + snapPx;
        const { leftPx, widthPx } = clampPx(parseFloat(ghost.style.left), newWidth);
        ghost.style.left = `${leftPx}px`; ghost.style.width = `${widthPx}px`;
      }
    };

    const onPointerUp = () => endWithApply();
    const onCancel = () => cleanup();
    const onVisibility = () => { if (document.visibilityState !== "visible") cleanup(); };
    const onContextMenu = (ev: Event) => { ev.preventDefault(); cleanup(); };

    const onPointerDown = (e: PointerEvent) => {
      const frame = frameRef.current;
      if (!frame) return;

      e.preventDefault(); e.stopPropagation();

      const t = getTaskNow(); if (!t) return;

      draggingTaskIdRef.current = taskId;
      onDragStateChange?.(true);
      bar.classList.add("dragging"); bar.style.cursor = "grabbing";

      dayW = cssDayWidth();

      const barRect = bar.getBoundingClientRect();
      const zoneRect = barZone.getBoundingClientRect();
      barLeft0 = Math.max(0, parseFloat(bar.style.left) || (barRect.left - zoneRect.left));
      barWidth0 = Math.max(dayW, parseFloat(bar.style.width) || barRect.width);
      startClientX = e.clientX;

      // ghost
      ghost = bar.cloneNode(true) as HTMLDivElement;
      ghost.style.opacity = "0.5";
      ghost.style.pointerEvents = "none";
      ghost.style.position = "absolute";
      ghost.style.zIndex = "999";
      ghost.style.left = `${barLeft0}px`;
      ghost.style.top = `${barRect.top - zoneRect.top}px`;
      ghost.style.width = `${barWidth0}px`;
      ghost.style.height = `${barRect.height}px`;
      barZone.appendChild(ghost);

      // capture
      const id = e.pointerId; pointerId = id; try { barZone.setPointerCapture(id); } catch {}

      document.body.style.userSelect = "none";
      document.body.style.cursor = "grabbing";

      barZone.addEventListener("pointermove", onPointerMove, { passive: false });
      barZone.addEventListener("pointerup", onPointerUp, { passive: false });
      barZone.addEventListener("pointercancel", onCancel, { passive: false });
      barZone.addEventListener("lostpointercapture", onCancel, { passive: false });

      window.addEventListener("blur", onCancel, { passive: true });
      window.addEventListener("mouseup", onCancel, { passive: true });
      window.addEventListener("pointerup", onCancel, { passive: true });
      document.addEventListener("visibilitychange", onVisibility, { passive: true });
      window.addEventListener("contextmenu", onContextMenu, { passive: false });
    };

    (target as any).draggable = false;
    target.addEventListener("dragstart", (e) => e.preventDefault());
    target.addEventListener("pointerdown", onPointerDown, { passive: false });
  };

  return { setupHorizontalDrag };
}