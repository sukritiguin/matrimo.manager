import { getEventById } from "@/services/events.services";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";

export const useEditorData = () => {
  const { editorId } = useParams({ from: "/editor/$editorId" });

  const { data } = useSuspenseQuery({
    queryKey: ["event", editorId],
    queryFn: () => getEventById(editorId),
    refetchOnWindowFocus: false,
    refetchInterval: 15 * 60 * 1000,
  });

  return {
    data: data.data.event,
  };
};
