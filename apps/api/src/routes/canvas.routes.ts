import { Router } from "express";
import { CanvasController } from "../controllers/canvas.controllers.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router: Router = Router();

router.use(authenticate);

router.get("/:id", CanvasController.get);
router.post("/:id", CanvasController.create);
router.patch("/:id", CanvasController.update);
router.patch("/:id/data", CanvasController.canvasDataUpdate);

export default router;