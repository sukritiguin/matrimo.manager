import { EditorCanvasServices } from "../contexts/EditorCanvasServices";

export const useEditorServices = () => {
  return EditorCanvasServices.use();
};
