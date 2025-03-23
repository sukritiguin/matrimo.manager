import { FastifyInstance } from "fastify";
import * as editorService from "./editor.services";

export const editorRoutes = (route: FastifyInstance) => {
  route.addHook("preHandler", route.authenticate);

  route.get("/", editorService.getEditorsOfUser);
  route.post("/", editorService.createEmptyEditor);
  route.get("/:editorId", editorService.getEditorById);
  route.patch("/:editorId", editorService.updateEditor);
  route.delete("/:editorId", editorService.deleteEditor);

  route.get("/:editorId/rename", editorService.renameEditor);
  route.get("/:editorId/download", editorService.downloadEditor);
  route.get("/:editorId/share", editorService.shareEditor);

  route.get("/archives", editorService.getAllArchives);
  route.get("/archives/:editorId", editorService.getArchiveByEditorId);
  route.post("/archives/:editorId", editorService.toggleArchive);
  route.delete("/archives/:editorId", editorService.deleteArchive);

  route.post("/uploads", editorService.uploadFile);
  route.get("/uploads", editorService.getUploadsByUser);
  route.get("/uploads/:uploadId", editorService.getUploadFileById);
  route.delete("/uploads/:uploadId", editorService.deleteUploadFile);
  route.post("/uploads/:uploadId/download", editorService.downloadUploadFile);
};
