import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useEditorStore } from "../store/useEditorStore";
import { updateCanvasData } from "@/services/canvas.services";
import { useIntervalEffect } from "@/hooks/useIntervalEffect";

export const useCanvasUpdate = (canvasId: string) => {
  const [lastSavedData, setLastSavedData] = useState<string | null>(null);

  const { canvas } = useEditorStore();

  const { mutate: saveCanvas } = useMutation({
    mutationKey: ["canvas", "save"],
    mutationFn: (data: any) => updateCanvasData(canvasId, data),
    onSuccess: (data) => {
      const savedData = JSON.stringify(data.data.canvas.data);
      setLastSavedData(savedData);
    },
  });

  useIntervalEffect(() => {
    async function save() {
      if (canvas) {
        const data = canvas.toJSON();
        if (lastSavedData !== JSON.stringify(data)) {
          saveCanvas(data);
        }
      }
    }

    save();
  }, 30_000);

  return { saveCanvas };
};
