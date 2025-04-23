import { Request, Response } from "express";

import { ApiError, apiHandler, ApiResponse, zodValidation } from "@matrimo/lib";
import { logger } from "../utils/logger.js";

import { client } from "@matrimo/db";
import { paginationSchema } from "validations/pagination.schema.js";
import { deleteFileFromS3, uploadMulterFileToS3 } from "@matrimo/lib/aws";

const getUploads = apiHandler(async (req: Request, res: Response) => {
  try {
    const userId = req.currentUser?.id;
    if (!userId) {
      throw new ApiError(401, "Unauthorized");
    }

    const { limit, page, order } = zodValidation(paginationSchema, req.query);
    const uploads = await client.upload.findMany({
      where: {
        userId,
      },
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        createdAt: order,
      },
      include: {
        image: true,
      },
    });

    const total = await client.upload.count({
      where: {
        userId,
      },
    });
    const totalPages = Math.ceil(total / (Number(limit) || 10));
    const response = new ApiResponse(true, "Uploads fetched successfully", {
      uploads,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    });

    return res.status(200).json(response);
  } catch (error) {
    logger.error(error);
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error);
    }
    throw new ApiError(500, "Failed to get uploads");
  }
});

const getUpload = apiHandler(async (req: Request, res: Response) => {
  try {
    const userId = req.currentUser?.id;
    if (!userId) {
      throw new ApiError(401, "Unauthorized");
    }

    const { id } = req.params;
    if (!id) {
      throw new ApiError(400, "Upload id is required");
    }

    const upload = await client.upload.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        image: true,
      },
    });

    if (!upload) {
      throw new ApiError(404, "Upload not found");
    }

    const response = new ApiResponse(true, "Upload fetched successfully", {
      upload,
    });

    return res.status(200).json(response);
  } catch (error) {
    logger.error(error);
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error);
    }
    throw new ApiError(500, "Failed to get upload");
  }
});

const createUpload = apiHandler(async (req: Request, res: Response) => {
  try {
    const userId = req.currentUser?.id;
    if (!userId) {
      throw new ApiError(401, "Unauthorized");
    }
    const file = req.file;
    if (!file) {
      throw new ApiError(400, "File is required");
    }

    const data = await uploadMulterFileToS3(file);
    if (!data) {
      throw new ApiError(500, "Failed to upload file to S3");
    }

    const image = await client.image.create({
      data: {
        ...data,
        filename: file.originalname,
      },
    });

    const upload = await client.upload.create({
      data: {
        userId,
        imageId: image.id,
      },
      include: {
        image: true,
      },
    });

    const response = new ApiResponse(true, "Upload created successfully", {
      upload,
    });

    return res.status(201).json(response);
  } catch (error) {
    logger.error(error);
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error);
    }
    throw new ApiError(500, "Failed to create upload");
  }
});

const deleteUpload = apiHandler(async (req: Request, res: Response) => {
  try {
    const userId = req.currentUser?.id;
    if (!userId) throw new ApiError(401, "Unauthorized");

    const { id } = req.params;
    if (!id) throw new ApiError(400, "Upload id is required");

    const upload = await client.upload.findFirst({
      where: { id, userId },
    });
    if (!upload) throw new ApiError(404, "Upload not found");

    const image = await client.image.findFirst({
      where: { id: upload.imageId },
    });
    if (!image) throw new ApiError(404, "Image not found");

    const deleteResponse = await deleteFileFromS3(image.fileKey);
    if (!deleteResponse) throw new ApiError(500, "Failed to delete file from S3");

    await client.upload.delete({ where: { id } });
    await client.image.delete({ where: { id: image.id } });

    const response = new ApiResponse(true, "Upload deleted successfully", {
      upload,
    });

    return res.status(200).json(response);
  } catch (error) {
    logger.error(error);
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error);
    }
    throw new ApiError(500, "Failed to delete upload");
  }
});

export const uploadController = {
  getUploads,
  getUpload,
  createUpload,
  deleteUpload,
};
