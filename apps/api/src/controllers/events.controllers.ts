import { Request, Response } from "express";
import { ApiError, apiHandler, ApiResponse, zodValidation } from "@matrimo/lib";
import { client, EventType } from "@matrimo/db";
import { logger } from "utils/logger.js";
import { createEventSchema, eventParamsSchema } from "@matrimo/schemas";
import { createCanvas } from "data/canvas.data.js";
import { getEventById } from "data/event.data.js";
import { paginationSchema } from "validations/pagination.schema.js";
import { Options } from "../utils/options.js";

const getEvents = apiHandler(async (req: Request, res: Response) => {
  try {
    const paginationData = zodValidation(paginationSchema, req.query);

    if (!req.currentUser) throw new ApiError(401, "Unauthorized user");

    const eventsCount = await client.event.count({
      where: {
        AND: [
          {
            ownerId: req.currentUser?.id,
          },
          {
            isArchive: false,
            revokedAt: undefined,
          },
        ],
      },
    });

    const pagesCount = Math.ceil(eventsCount / paginationData.limit);

    const events = await client.event.findMany({
      where: {
        AND: [
          {
            ownerId: req.currentUser?.id,
          },
          {
            isArchive: false,
            revokedAt: undefined,
          },
        ],
      },
      skip: (paginationData.page - 1) * paginationData.limit,
      take: paginationData.limit,
      orderBy: {
        createdAt: paginationData.order,
      },
      ...Options.eventOptions,
    });

    return res.status(200).json(
      new ApiResponse(true, "Ok", {
        events,
        pagination: {
          page: paginationData.page,
          limit: paginationData.limit,
          pagesCount,
          eventsCount,
        },
      })
    );
  } catch (error) {
    logger.error("Error getting events:", error);
    throw new ApiError(500, "Internal server error");
  }
});

const createEvent = apiHandler(async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const data = zodValidation(createEventSchema, req.body);
    if (!req.currentUser) throw new ApiError(401, "Unauthorized user");

    let category = await client.eventCategory.findFirst({
      where: {
        eventType: data.category.type as EventType,
      },
    });
    if (!category) {
      category = await client.eventCategory.create({
        data: {
          name: data.category.type,
          eventType: data.category.type as EventType,
        },
      });
    }

    let canvas = null;
    if (data.canvas) {
      canvas = await createCanvas(req.currentUser?.id!)(data.canvas);
    }

    const event = await client.event.create({
      data: {
        title: data.title,
        description: data.description,
        tags: data.tags,
        ownerId: req.currentUser?.id!,
        categoryId: category.id,
        canvasId: canvas?.id,
      },
      ...Options.eventOptions,
    });

    return res
      .status(201)
      .json(new ApiResponse(true, "Event created", { event }));
  } catch (error) {
    logger.error("Error creating event:", error);
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, "Internal server error");
  }
});

const getEvent = apiHandler(async (req: Request, res: Response) => {
  try {
    const { eventId } = zodValidation(eventParamsSchema, req.params);
    const event = await getEventById(req.currentUser?.id!)(eventId);

    if (!event) {
      throw new ApiError(404, "Event not found");
    }

    if (event.owner.id !== req.currentUser?.id) {
      throw new ApiError(401, "Unauthorized user");
    }

    return res.status(200).json(new ApiResponse(true, "Ok", { event }));
  } catch (error) {
    logger.error("Error getting event:", error);
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, "Internal server error");
  }
});

const updateEventById = apiHandler(async (req: Request, res: Response) => {
  try {
    const { eventId } = zodValidation(eventParamsSchema, req.params);
    const data = zodValidation(createEventSchema, req.body);

    const event = await client.event.findUnique({
      where: {
        id: eventId,
      },
    });

    if (!event) {
      throw new ApiError(404, "Event not found");
    }

    if (event.ownerId !== req.currentUser?.id) {
      throw new ApiError(401, "Unauthorized user");
    }

    let eventType = data.category.type as EventType;

    const category = await client.eventCategory.upsert({
      where: {
        eventType,
      },
      create: {
        name: data.category.type,
        eventType,
      },
      update: {
        name: data.category.type,
        eventType,
      },
    });

    const updatedEvent = await client.event.update({
      where: {
        id: eventId,
      },
      data: {
        title: data.title,
        description: data.description,
        tags: data.tags,
        categoryId: category.id,
      },
    });

    if (data.canvas) {
      await client.canvas.update({
        where: {
          id: updatedEvent.canvasId!,
        },
        data: {
          ...data.canvas,
          title: data.canvas.title ?? "Untitled",
          data: data.canvas.canvasData ?? JSON.stringify(null),
        },
      });
    }

    return res.status(200).json(new ApiResponse(true, "Event updated"));
  } catch (error) {
    logger.error("Error updating event:", error);
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, "Internal server error");
  }
});

const deleteEventById = apiHandler(async (req: Request, res: Response) => {
  try {
    const { eventId } = zodValidation(eventParamsSchema, req.params);

    const theEvent = await client.event.update({
      where: {
        id: eventId,
      },
      data: {
        revokedAt: new Date(Date.now()),
      },
    });

    return res
      .status(200)
      .json(ApiResponse.success("Event delete successfully"));
  } catch (error) {
    logger.error("Error deleteing event:", error);
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, "Internal server error");
  }
});

const copyEvent = apiHandler(async (req: Request, res: Response) => {
  try {
    const { eventId } = zodValidation(eventParamsSchema, req.params);

    const event = await client.event.findUnique({
      where: {
        id: eventId,
      },
    });

    if (!event) {
      throw new ApiError(404, "Event not found");
    }

    if (event.ownerId !== req.currentUser?.id) {
      throw new ApiError(401, "Unauthorized user");
    }

    const newEvent = await client.event.create({
      data: {
        title: event.title,
        description: event.description,
        tags: event.tags,
        categoryId: event.categoryId,
        ownerId: req.currentUser?.id,
        canvasId: event.canvasId,
        isArchive: false,
      },
    });

    return res
      .status(200)
      .json(ApiResponse.success("Event copied successfully", { newEvent }));
  } catch (error) {
    logger.error("Error copying event:", error);
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, "Internal server error");
  }
});

const getArchivedEvents = apiHandler(async (req: Request, res: Response) => {
  try {
    const archivedEvents = await client.event.findMany({
      where: {
        ownerId: req.currentUser?.id,
        isArchive: true,
      },
    });
    return res
      .status(200)
      .json(ApiResponse.success("Archived events", { archivedEvents }));
  } catch (error) {
    logger.error("Error getting archived events:", error);
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, "Internal server error");
  }
});

const getArchivedEvent = apiHandler(async (req: Request, res: Response) => {
  try {
    const { eventId } = zodValidation(eventParamsSchema, req.params);
    const archivedEvent = await client.event.findUnique({
      where: {
        id: eventId,
      },
    });
    return res
      .status(200)
      .json(ApiResponse.success("Archived event", { archivedEvent }));
  } catch (error) {
    logger.error("Error getting archived event:", error);
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, "Internal server error");
  }
});

const toggleArchive = apiHandler(async (req: Request, res: Response) => {
  try {
    const { eventId } = zodValidation(eventParamsSchema, req.params);
    const archivedEvent = await client.event.update({
      where: {
        id: eventId,
      },
      data: {
        isArchive: !req.body.isArchive,
      },
    });
    return res
      .status(200)
      .json(ApiResponse.success("Archived event", { archivedEvent }));
  } catch (error) {
    logger.error("Error getting archived event:", error);
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, "Internal server error");
  }
});

const deleteArchivedEvent = apiHandler(async (req: Request, res: Response) => {
  try {
    const { eventId } = zodValidation(eventParamsSchema, req.params);
    const archivedEvent = await client.event.delete({
      where: {
        id: eventId,
      },
    });
    return res
      .status(200)
      .json(ApiResponse.success("Archived event", { archivedEvent }));
  } catch (error) {
    logger.error("Error getting archived event:", error);
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, "Internal server error");
  }
});

export {
  getEvent,
  getEvents,
  createEvent,
  updateEventById,
  deleteEventById,
  copyEvent,
  getArchivedEvents,
  getArchivedEvent,
  toggleArchive,
  deleteArchivedEvent,
};
