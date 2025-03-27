import { EditorCanvasProvider } from "../contexts/EditorCanvasProvider";

export const useEditorCanvas = () => {
  return EditorCanvasProvider.use();
};
