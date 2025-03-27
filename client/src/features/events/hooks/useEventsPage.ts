import { Canvas } from "fabric";
import { TTemplate } from "@/types/template";
import { createNewEditor, getEditors } from "@/services/editor.services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useEventsPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: createNewEdtiorbatch } = useMutation({
    mutationKey: ["events", "create"],
    mutationFn: createNewEditor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events", "own"] });
    },
  });

  const onCreateNewEvent = () => {
    const canvas = new Canvas();
    createNewEdtiorbatch({
      title: "Untitled event",
      data: canvas.toJSON(),
    });
  };

  const { data, error, isPending } = useQuery({
    queryKey: ["events", "own"],
    queryFn: getEditors,
  });

  const handleClickTemplate = (tempate: TTemplate) => {
    navigate(`/editor/${tempate.id}`);
  };

  return {
    templates: data?.editors,
    error,
    isPending,
    onCreateNewEvent,
    handleClickTemplate,
  };
};
