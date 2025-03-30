import { FastifyReply, FastifyRequest } from "fastify";
import { apiHandler } from "../../../libs/api-handler";
import fastify from "../../../server";
import {
  deleteFileFromS3,
  downloadFileFromS3,
  uploadFileInS3,
} from "../../../config/aws.config";
import {
  ApiError,
  ApiResponse,
  ApiResponseMessage,
} from "../../../libs/response";
import {
  createEditorSchema,
  editorIdParamsSchema,
  renameEditorSchema,
  toggleArchiveSchema,
  updateEditorSchema,
  uploadIdParamsSchema,
} from "./editor.schemas";
import { zodValidation } from "../../../libs/zodVaildtion";

export const createEmptyEditor = apiHandler(
  async (req: FastifyRequest, reply: FastifyReply) => {
    const body = zodValidation(createEditorSchema, req.body);
    await fastify.prisma.editor.create({
      data: {
        title: body?.title || "Untitled",
        data: body.data,
        authorId: req.user?.id!,
      },
    });

    return reply
      .status(200)
      .send(new ApiResponseMessage(201, "New editor created successfully"));
  }
);

export const getEditorsOfUser = apiHandler(
  async (req: FastifyRequest, reply: FastifyReply) => {
    const editors = await fastify.prisma.editor.findMany({
      where: {
        authorId: req.user?.id!,
        isArchive: false,
      },
      include: {
        image: {
          select: {
            url: true,
          },
        },
      },
    });

    const sanitizeData = editors.map((editor) => {
      return {
        ...editor,
        image: editor.image?.url,
      };
    });

    return reply
      .status(200)
      .send(
        new ApiResponse(
          200,
          { editors: sanitizeData },
          "Editors fetched successfully"
        )
      );
  }
);

export const getEditorById = apiHandler(
  async (req: FastifyRequest, reply: FastifyReply) => {
    const { editorId } = zodValidation(editorIdParamsSchema, req.params);
    const editor = await fastify.prisma.editor.findUnique({
      where: { id: editorId },
    });
    if (!editor) {
      throw new ApiError(404, "Editor not found");
    }

    if (editor.authorId !== req.user?.id) {
      throw new ApiError(
        403,
        "Unauthorized: You are not the author of this editor"
      );
    }

    return reply.status(200).send(new ApiResponse(200, { editor }, "OK"));
  }
);

export const updateEditor = apiHandler(
  async (req: FastifyRequest, reply: FastifyReply) => {
    const { editorId } = zodValidation(editorIdParamsSchema, req.params);
    const body = zodValidation(updateEditorSchema, req.body);
    const editor = await fastify.prisma.editor.findUnique({
      where: { id: editorId },
    });

    if (!editor) {
      throw new ApiError(404, "Editor not found");
    }

    if (editor.authorId !== req.user?.id) {
      throw new ApiError(
        403,
        "Unauthorized: You are not the author of this editor"
      );
    }

    await fastify.prisma.editor.update({
      where: { id: editorId },
      data: {
        title: body?.title || editor.title,
        content: body?.content || editor.content,
        tags: body?.tags || editor.tags,
        data: body?.data || editor.data,
      },
    });

    return reply
      .status(200)
      .send(new ApiResponseMessage(200, "Editor updated successfully"));
  }
);

export const deleteEditor = apiHandler(
  async (req: FastifyRequest, reply: FastifyReply) => {
    const { editorId } = zodValidation(editorIdParamsSchema, req.params);
    const editor = await fastify.prisma.editor.findUnique({
      where: { id: editorId },
      include: {
        image: true,
      },
    });
    if (!editor) {
      throw new ApiError(404, "Editor not found");
    }
    if (editor.authorId !== req.user?.id) {
      throw new ApiError(
        403,
        "Unauthorized: You are not the author of this editor"
      );
    }
    if (editor.image) {
      await deleteFileFromS3(editor.image?.fileKey);
    }
    await fastify.prisma.editor.delete({ where: { id: editorId } });
    return reply
      .status(200)
      .send(new ApiResponseMessage(200, "Editor deleted successfully"));
  }
);

export const renameEditor = apiHandler(
  async (req: FastifyRequest, reply: FastifyReply) => {
    const { editorId } = zodValidation(editorIdParamsSchema, req.params);
    const body = zodValidation(renameEditorSchema, req.body);
    await fastify.prisma.editor.update({
      where: { id: editorId },
      data: { title: body.title },
    });
    return reply
      .status(200)
      .send(new ApiResponseMessage(200, "Editor renamed successfully"));
  }
);

// TODO: Download editor by id
export const downloadEditor = apiHandler(
  async (req: FastifyRequest, reply: FastifyReply) => {
    return reply.status(200).send({ message: "Download editor by id" });
  }
);

// TODO: Share editor by id
export const shareEditor = apiHandler(
  async (req: FastifyRequest, reply: FastifyReply) => {
    const { editorId } = zodValidation(editorIdParamsSchema, req.params);

    //  create a shallow copy of the editor
    return reply;
  }
);

export const saveEditor = apiHandler(
  async (req: FastifyRequest, reply: FastifyReply) => {
    const { editorId } = zodValidation(editorIdParamsSchema, req.params);
    // const body = zodValidation(updateEditorSchema, req.body);
    const editor = await fastify.prisma.editor.findUnique({
      where: { id: editorId },
    });

    if (!editor) {
      throw new ApiError(404, "Editor not found");
    }

    if (editor.authorId !== req.user?.id) {
      throw new ApiError(
        403,
        "Unauthorized: You are not the author of this editor"
      );
    }
    const fileData = await req.file();
    if (!fileData) {
      return reply.status(400).send({ message: "No file uploaded" });
    }

    const uploadedResult = await uploadFileInS3(fileData);
    const image = await fastify.prisma.image.create({
      data: {
        ...uploadedResult,
      },
    });

    const updatedEditor = await fastify.prisma.editor.update({
      where: { id: editorId },
      data: {
        imageId: image?.id,
      },
    });

    return reply
      .status(200)
      .send(
        new ApiResponse(
          200,
          { editor: updatedEditor },
          "Editor saved successfully"
        )
      );
  }
);

// ================== Archive ==================

// TODO: Toggle archive
export const toggleArchive = apiHandler(
  async (req: FastifyRequest, reply: FastifyReply) => {
    const { editorId } = zodValidation(editorIdParamsSchema, req.params);
    const { isArchive } = zodValidation(toggleArchiveSchema, req.query);
    await fastify.prisma.editor.update({
      where: {
        id: editorId,
        authorId: req.user?.id,
      },
      data: { isArchive },
    });

    return reply
      .status(200)
      .send(
        new ApiResponseMessage(
          200,
          "Editor archive status updated successfully"
        )
      );
  }
);

// FIXME: Add Query
export const getAllArchives = apiHandler(
  async (req: FastifyRequest, reply: FastifyReply) => {
    const archives = await fastify.prisma.editor.findMany({
      where: {
        authorId: req.user?.id,
        isArchive: true,
      },
    });
    return reply
      .status(200)
      .send(
        new ApiResponse(200, { archives }, "Archives fetched successfully")
      );
  }
);

export const getArchiveByEditorId = apiHandler(
  async (
    req: FastifyRequest<{ Params: { editorId: string } }>,
    reply: FastifyReply
  ) => {
    const { editorId } = zodValidation(editorIdParamsSchema, req.params);
    const editor = await fastify.prisma.editor.findUnique({
      where: { id: editorId },
      include: {
        image: true,
      },
    });

    if (!editor) {
      throw new ApiError(404, "Editor not found");
    }
    if (editor.authorId !== req.user?.id) {
      throw new ApiError(
        403,
        "Unauthorized: You are not the author of this editor"
      );
    }
    return reply
      .status(200)
      .send(new ApiResponse(200, { editor }, "Editor fetched successfully"));
  }
);

export const deleteArchive = apiHandler(
  async (req: FastifyRequest, reply: FastifyReply) => {
    const { editorId } = zodValidation(editorIdParamsSchema, req.params);
    const editor = await fastify.prisma.editor.findUnique({
      where: { id: editorId, authorId: req.user?.id, isArchive: true },
      include: {
        image: true,
      },
    });

    if (!editor) {
      throw new ApiError(404, "Editor not found");
    }
    if (editor.image) {
      await deleteFileFromS3(editor.image?.fileKey);
    }
    await fastify.prisma.editor.delete({ where: { id: editorId } });
    return reply
      .status(200)
      .send(new ApiResponseMessage(200, "Archive deleted successfully"));
  }
);

// TODO: ================== Upload ==================

export const uploadFile = apiHandler(
  async (req: FastifyRequest, reply: FastifyReply) => {
    const fileData = await req.file();
    if (!fileData) {
      return reply.status(400).send({ message: "No file uploaded" });
    }

    const uploadedResult = await uploadFileInS3(fileData);
    const upload = await fastify.prisma.uploadImage.create({
      data: {
        ...uploadedResult,
        userId: req.user?.id!,
      },
    });

    return reply
      .status(201)
      .send(new ApiResponse(201, { upload }, "File uploaded successfully"));
  }
);

export const getUploadsByUser = apiHandler(
  async (req: FastifyRequest, reply: FastifyReply) => {
    const {
      limit = 10,
      sortBy = "createdAt",
      order = "desc",
      filter,
    } = req.query as any;

    if (!req.user) {
      throw new ApiError(401, "User not found");
    }

    const query: any = {
      where: {
        userId: req.user.id,
      },
      take: parseInt(limit),
      orderBy: {
        [sortBy]: order,
      },
    };

    if (filter) {
      query.where.OR = [
        { filename: { contains: filter, mode: "insensitive" } },
      ];
    }

    const uploads = (await fastify.prisma.uploadImage.findMany(query)) || [];

    return reply
      .status(200)
      .send(new ApiResponse(200, { uploads }, "Uploads fetched successfully"));
  }
);

export const getUploadFileById = apiHandler(
  async (req: FastifyRequest, reply: FastifyReply) => {
    const { uploadId } = zodValidation(uploadIdParamsSchema, req.params);

    const upload = await fastify.prisma.uploadImage.findFirst({
      where: {
        id: uploadId,
        userId: req.user?.id!,
      },
    });
    if (!upload) {
      throw new ApiError(404, "Upload not found");
    }

    return reply
      .status(200)
      .send(new ApiResponse(200, { upload }, "File fetched successfully"));
  }
);

export const deleteUploadFile = apiHandler(
  async (req: FastifyRequest, reply: FastifyReply) => {
    const { uploadId } = zodValidation(uploadIdParamsSchema, req.params);
    const upload = await fastify.prisma.uploadImage.findFirst({
      where: {
        id: uploadId,
        userId: req.user?.id!,
      },
    });
    if (!upload) {
      throw new ApiError(404, "Upload not found");
    }

    await deleteFileFromS3(upload.fileKey);
    await fastify.prisma.uploadImage.delete({
      where: { id: upload.id },
    });

    return reply
      .status(200)
      .send(new ApiResponse(200, { message: "Upload deleted successfully" }));
  }
);

export const downloadUploadFile = apiHandler(
  async (req: FastifyRequest, reply: FastifyReply) => {
    const { uploadId } = zodValidation(uploadIdParamsSchema, req.params);

    const upload = await fastify.prisma.uploadImage.findFirst({
      where: {
        id: uploadId,
        userId: req.user?.id!,
      },
    });
    if (!upload) {
      throw new ApiError(404, "Upload not found");
    }

    const downloadFile = await downloadFileFromS3(upload.fileKey);
    if (downloadFile.Body) {
      throw new ApiError(500, "Error downloading file from S3");
    }

    return reply
      .status(200)
      .header("Content-Disposition", `attachment; filename=${upload.filename}`)
      .type(upload.mimetype || "application/octet-stream")
      .send(downloadFile.Body);
  }
);
