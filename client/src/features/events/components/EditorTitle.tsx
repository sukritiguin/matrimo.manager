import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit3, Loader2 } from "lucide-react";
import { useEditorTitle } from "../hooks/useEditorTitle";
import { useEditTemplate } from "../hooks/useEditTemplate";

export const EditorTitle = () => {
  const { title } = useEditTemplate();
  const { isEditing, isPending, inputRef, text, handleEditTitle, handleTitleChange } =
    useEditorTitle();

  if (isEditing) {
    return (
      <div className="relative inline-flex items-center">
        <Input ref={inputRef} type="text" value={text} onChange={handleTitleChange} />
        {isPending && <Loader2 className="size-5 text-green-500 absolute right-2 animate-spin" />}
      </div>
    );
  }

  return (
    <div className="inline-flex gap-2 items-center justify-center">
      <span className="font-semibold">{title || "Untitled"}</span>
      <Button variant="ghost" size="icon" onClick={handleEditTitle}>
        <Edit3 className="size-4" />
      </Button>
    </div>
  );
};
