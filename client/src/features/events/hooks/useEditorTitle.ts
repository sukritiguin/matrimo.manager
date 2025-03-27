import { useCallback, useEffect, useRef, useState } from "react";
import { useEditTemplate } from "../hooks/useEditTemplate";
import { renameEditor } from "@/services/editor.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RenameEditorSchema } from "@/schemas/editor.schema";

export const useEditorTitle = () => {
  const { title, editorId } = useEditTemplate();
  const inputRef = useRef<HTMLInputElement>(null);

  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleEditTitle = () => {
    setIsEditing(true);
    setText(title || "Untitled");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["events", "editor", "rename"],
    mutationFn: (values: { editorId: string; data: RenameEditorSchema }) =>
      renameEditor(values.editorId, values.data),
    onSuccess: () => {
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ["events", "edit"] });
    },
  });

  const handleSaveTitle = useCallback(() => {
    if (!text || text === title || !editorId) {
      setIsEditing(false);
      setText("");
      return;
    }

    mutate({ editorId, data: { title: text } });
  }, [mutate, editorId, title, text]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        handleSaveTitle();
      }
    };

    const keyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsEditing(false);
        setText("");
      }
      if (e.key === "Enter") {
        handleSaveTitle();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", keyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", keyDown);
    };
  }, [handleSaveTitle]);

  return { isEditing, isPending, handleEditTitle, handleTitleChange, text, inputRef };
};
