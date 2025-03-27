import { useAppSelector } from "@/lib/utils";

export const useEditorCanvasState = () => {
  return useAppSelector((state) => state.canvas);
};
