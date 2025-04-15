import { client } from "@matrimo/db";
import { CreateCanvasSchema } from "@matrimo/schemas";

const createCanvas = (userId: number) => async (data: CreateCanvasSchema) => {
  try {
    const canvas = await client.canvas.create({
      data: {
        width: data.width,
        height: data.height,
        data: data.canvasData ?? JSON.stringify(null),
        userId,
      },
      omit: {
        revokedAt: true,
      },
    });

    return canvas;
  } catch (error) {
    throw error;
  }
};

const findCanvasById = async (canvasId: string) => {
  try {
    const canvas = await client.canvas.findUnique({
      where: {
        id: canvasId,
      },
      omit: {
        revokedAt: true,
      },
    });

    return canvas;
  } catch {
    return null;
  }
};

const updateCanvas =
  (userId: number) =>
  (canvasId: string) =>
  async (data: CreateCanvasSchema) => {
    try {
      const canvas = await client.canvas.update({
        where: {
          id: canvasId,
          userId,
        },
        data: {
          title: data.title ?? "Untitled",
          width: data.width,
          height: data.height,
          data: data.canvasData ?? JSON.stringify(null),
        },
        omit: {
          revokedAt: true,
        },
      });

      return canvas;
    } catch {
      return null;
    }
  };

export { createCanvas, findCanvasById, updateCanvas };
