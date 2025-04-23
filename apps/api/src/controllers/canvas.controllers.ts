import { Request, Response } from "express";
import { logger } from "../utils/logger.js";
import { ApiError, apiHandler, ApiResponse, zodValidation } from "@matrimo/lib";
import { createCanvasSchema, canvasParamsSchema, canvasDataSchema } from "@matrimo/schemas";

import { createCanvas, findCanvasById, updateCanvas } from "../data/canvas.data.js";
import { client } from "@matrimo/db";

const get = apiHandler(async (req: Request, res: Response) => {
  try {
    const { id } = zodValidation(canvasParamsSchema, req.params);

    const canvas = await findCanvasById(id);

    if (!canvas) {
      throw new ApiError(404, "Canvas not found");
    }

    return res.status(200).json(new ApiResponse(true, "Canvas found", { canvas }));
  } catch (error) {
    logger.error("Error getting canvas:", error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, "Internal server error");
  }
});

const create = apiHandler(async (req: Request, res: Response) => {
  try {
    const data = zodValidation(createCanvasSchema, req.body);

    const canvas = await createCanvas(req.currentUser?.id!)(data);

    return res.status(200).json(ApiResponse.success("Canvas created", canvas));
  } catch (error) {
    logger.error("Error creating canvas:", error);
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, "Internal server error");
  }
});

const update = apiHandler(async (req: Request, res: Response) => {
  try {
    const { id } = zodValidation(canvasParamsSchema, req.params);
    const data = zodValidation(createCanvasSchema, req.body);

    const canvas = await updateCanvas(req.currentUser?.id!)(id)(data);

    return res.status(200).json(ApiResponse.success("Canvas updated", { canvas }));
  } catch (error) {
    logger.error("Error updating canvas:", error);
    throw new ApiError(500, "Internal server error");
  }
});

const canvasDataUpdate = apiHandler(async (req: Request, res: Response) => {
  try {
    const data = zodValidation(canvasDataSchema, req.body);
    const { id } = zodValidation(canvasParamsSchema, req.params);

    const canvas = await client.canvas.update({
      where: { id },
      data: {
        data: data,
      },
    });

    return res.status(200).json(ApiResponse.success("Canvas updated", { canvas }));
  } catch (error) {
    logger.error("Error updating canvas:", error);
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, "Internal server error");
  }
});

export const CanvasController = {
  get,
  create,
  update,
  canvasDataUpdate,
};
