import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.js";
import * as TasksController from "../controllers/tasks.controller.js";

const router = Router({ mergeParams: true });

router.get("/:id/tasks", authMiddleware, TasksController.list);
router.post("/:id/tasks", authMiddleware, TasksController.create);
router.patch("/:projectId/tasks/:taskId", authMiddleware, TasksController.update);
router.post("/:id/tasks/reorder", authMiddleware, TasksController.reorder);

export default router;
