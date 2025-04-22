import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import upload from "config/multer.config.js";
import { uploadController } from "controllers/uploads.controllers.js";

const router: Router = Router();

router.use(authenticate);


router.get("/", uploadController.getUploads);
router.get("/:id", uploadController.getUpload);
router.post("/", upload.single("file"), uploadController.createUpload);
router.delete("/:id", uploadController.deleteUpload);

export default router;