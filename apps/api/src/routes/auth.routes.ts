import { Router } from "express";
import * as authCtrl from "../controllers/auth.controllers.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router: Router = Router();

router.post("/register", authCtrl.register);
router.post("/login", authCtrl.login);
router.post("/logout", authenticate, authCtrl.logout);
router.post("/refresh", authCtrl.refreshToken);
router.post("/google", authCtrl.googleLogin);
router.post("/google/callback", authCtrl.googleCallback);

export default router;
