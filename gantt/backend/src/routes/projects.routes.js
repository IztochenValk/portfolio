import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.js";
import * as ProjectsController from "../controllers/projects.controller.js";

const router = Router();

router.get("/", authMiddleware, ProjectsController.list);
router.get("/:id", authMiddleware, ProjectsController.getOne);
router.post("/", authMiddleware, ProjectsController.create);
router.patch("/:id", authMiddleware, ProjectsController.update);
router.delete("/:id", authMiddleware, ProjectsController.remove);

export default router;
