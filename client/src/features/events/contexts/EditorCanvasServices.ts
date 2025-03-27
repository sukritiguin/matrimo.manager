import { createReactContext } from "@/lib/createReactContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEditorCanvas } from "../hooks/useEditorCanvas";
import { saveEditor, updateEditor } from "@/services/editor.services";
import { useEditTemplate } from "../hooks/useEditTemplate";
import { useEffect } from "react";
import { useEditorActions } from "../hooks/useEditorActions";
import { DEFAULT_ZOOM_LABEL } from "../constants";

export const EditorCanvasServices = createReactContext(() => {
  const queryClient = useQueryClient();
  const { canvas } = useEditorCanvas();
  const { handleZoom } = useEditorActions();
  const { editorId, title } = useEditTemplate();

  const { mutate } = useMutation({
    mutationKey: ["events", "update"],
    mutationFn: () => updateEditor(editorId!, { data: canvas?.toJSON() }),
    onSuccess: () => {
      console.log("Canvas data saved successfully");
      queryClient.invalidateQueries({ queryKey: ["events", "edit"] });
    },
  });

  const handleSave = () => {
    if (!canvas || !editorId) {
      return;
    }
    handleZoom(DEFAULT_ZOOM_LABEL);

    const canvasImage = dataURItoBlob(canvas.toDataURL());

    const formData = new FormData();
    formData.append("image", canvasImage, title ?? "Untitled");
    formData.append("data", canvas.toJSON());

    saveEditor(editorId, formData);
  };

  useEffect(() => {
    const savedInterval = setInterval(() => {
      if (canvas && editorId) {
        mutate();
      }
    }, 30 * 1000);

    return () => clearInterval(savedInterval);
  }, [canvas, editorId, mutate]);

  return { handleSave };
});

function dataURItoBlob(dataURI: string) {
  const byteString = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}
