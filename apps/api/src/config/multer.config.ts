import { ApiError } from "@matrimo/lib";
import multer from "multer";

const storage = multer.memoryStorage();

const limits = {
  fileSize: 10 * 1024 * 1024, 
};

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(null, false);
  }
  cb(null, true);
};

const upload = multer({ storage, limits, fileFilter });

export default upload;
