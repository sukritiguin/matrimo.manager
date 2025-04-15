import { client } from "@matrimo/db";
import { Options } from "utils/options.js";

/**
 * Gets an event by id if the user has access to it
 * @param userId The id of the user
 * @param id The id of the event to get
 * @returns The event if the user has access to it, null otherwise
 */
const getEventById = (userId: number) => async (id: string) => {
  try {
    const event = await client.event.findUnique({
      where: {
        id,
        ownerId: userId,
      },
      ...Options.eventOptions,
    });

    return event;
  } catch {
    return null;
  }
};

const getEventsByUserId = async (userId: number) => {
  try {
    const events = await client.event.findMany({
      where: {
        ownerId: userId,
      },
      include: {
        canvas: true,
        category: true,
        images: true,
        owner: true,
      },
    });

    return events;
  } catch {
    return null;
  }
};

export { getEventById, getEventsByUserId };
