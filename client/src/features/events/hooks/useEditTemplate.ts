import { EditorTemplateProvider } from "../contexts/EditorTemplateProvider";

export const useEditTemplate = () => {
  return EditorTemplateProvider.use();
};
