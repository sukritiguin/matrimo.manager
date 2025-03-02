import { useParams } from "react-router-dom";
import { Events } from "../data";
import { slugify } from "@/lib/slugify";

export const useGetEventParam = () => {
  const { event: eventName } = useParams();

  if (!eventName) {
    return null;
  }

  const event = Object.values(Events).find(
    (event) => slugify(event.name) === eventName
  );

  return event?.name || null;
};
