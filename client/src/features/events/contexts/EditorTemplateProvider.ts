import { createReactContext } from "@/lib/createReactContext";
import { useGetParams } from "@/hooks/useGetParams";
import { getEditorById } from "@/services/editor.services";
import { useQuery } from "@tanstack/react-query";

export const EditorTemplateProvider = createReactContext(() => {
  const { editorId } = useGetParams(["editorId"]);

  const { data, error, isPending } = useQuery({
    queryKey: ["events", "edit"],
    queryFn: () => getEditorById(editorId!),
    enabled: !!editorId,
  });

  return {
    error,
    editorId,
    isPending,
    canvasData: data?.editor.data,
    ...data?.editor,
  };
});
