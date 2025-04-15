import { Router } from "express";
import healthCheckRoutes from "./healthCheck.routes.js";
import authRoutes from "./auth.routes.js";
import usersRoutes from "./users.routes.js";
import eventsRoutes from "./events.routes.js";
import canvasRoutes from "./canvas.routes.js";

const router: Router = Router();

router.use("/healthy", healthCheckRoutes);
router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/events", eventsRoutes);
router.use("/canvases", canvasRoutes);

export default router;
