import { Router } from "express";
import * as usersCtrl from "../controllers/users.controllers.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router: Router = Router();

router.get("/me", authenticate, usersCtrl.getMe);

export default router;
