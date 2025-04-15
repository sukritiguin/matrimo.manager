import { Router } from "express";
import { CanvasController } from "../controllers/canvas.controllers.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router: Router = Router();

router.use(authenticate);

router.get("/:canvasId", CanvasController.get);
router.post("/:canvasId", CanvasController.create);
router.patch("/:canvasId", CanvasController.update);

export default router;