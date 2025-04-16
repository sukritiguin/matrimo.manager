import api from "./api";
import { TApiResponse, TEvent } from "@/types";
import { CreateEventSchema } from "@/schemas/events.schema";

const getAllEvents = (): Promise<
  TApiResponse<{
    events: TEvent[];
    pagination: {
      eventsCount: number;
      limit: number;
      page: number;
      pagesCount: number;
    };
  }>
> => {
  return api.get("/events");
};

const getEventById = (
  id: string
): Promise<
  TApiResponse<{
    event: TEvent;
  }>
> => {
  return api.get(`/events/${id}`);
};

const createNewEvent = (
  data: CreateEventSchema
): Promise<
  TApiResponse<{
    event: TEvent;
  }>
> => {
  return api.post("/events", data);
};

const updateEvent = (
  id: string,
  data: Partial<CreateEventSchema>
): Promise<
  TApiResponse<{
    event: TEvent;
  }>
> => {
  return api.patch(`/events/${id}`, data);
};

const deleteEvent = (id: string) => {
  return api.delete(`/events/${id}`);
};

export { getAllEvents, getEventById, createNewEvent, updateEvent, deleteEvent };
