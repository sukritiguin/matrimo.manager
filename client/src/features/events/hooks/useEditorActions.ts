import { EditorCanvasActions } from "../contexts/EditorCanvasActions";

export const useEditorActions = () => {
  return EditorCanvasActions.use();
};
