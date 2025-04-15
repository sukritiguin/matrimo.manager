import api from "./api";

const getAllEvents = () => {
  return api.get("/events");
};

const getEventById = (id: string) => {
  return api.get(`/events/${id}`);
};

const createEvent = (data: any) => {
  return api.post("/events", data);
};

export { getAllEvents };