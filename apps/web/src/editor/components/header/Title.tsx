import { useEditorData } from "@/editor/hooks/useEditorData";
import { Edit3, Loader2, Save } from "lucide-react";
import * as m from "motion/react-m";
import { useClickOutside } from "@/hooks/useClickOutSide";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEvent } from "@/services/events.services";
import React from "react";

export const EditorTitle: React.FC = () => {
  const {
    data: { title, id },
  } = useEditorData();
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = React.useState(false);
  const [inputText, setInputText] = React.useState(title);

  const ref = useClickOutside(() => setIsEditing(false));

  const { mutate: updateEventTitle, isPending } = useMutation({
    mutationKey: ["events", "editor", "rename"],
    mutationFn: () => updateEvent(id, { title: inputText }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["event"] });
    },
    onSettled: () => {
      setTimeout(() => {
        setInputText(title);
        setIsEditing(false);
      }, 300);
    },
  });

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputText(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inputText === title) {
      setIsEditing(false);
      return;
    }

    updateEventTitle();
  }

  function onClickEdit() {
    setIsEditing(true);
    setInputText(title);
  }

  return (
    <div className="flex justify-center items-center">
      {!isEditing ? (
        <m.div
          layoutId="editor-title"
          className="flex w-60 justify-between items-center px-4 py-1 rounded-md border border-purple-400"
        >
          <m.h1 layoutId="editor-title-text" className="font-bold tracking-tighter text-purple-500">
            {title}
          </m.h1>
          <m.button
            layoutId="editor-title-button"
            className="ml-2 p-1 text-purple-500 hover:text-purple-600 active:text-purple-700 hover:cursor-pointer"
            onClick={onClickEdit}
          >
            <Edit3 className="size-4" />
          </m.button>
        </m.div>
      ) : (
        <m.div layoutId="editor-title" className="flex justify-center items-center ">
          <div
            ref={ref}
            className="flex justify-center items-center w-60 rounded-md border border-purple-400"
          >
            <form onSubmit={handleSubmit} className="flex justify-center items-center w-full">
              <m.div layoutId="editor-title-text">
                <input
                  type="text"
                  autoFocus
                  className="font-bold tracking-tighter text-purple-500 bg-transparent focus:outline-none w-full px-4 py-1"
                  value={inputText}
                  onChange={handleTitleChange}
                />
              </m.div>
              <m.button
                layoutId="editor-title-button"
                className="mx-2 p-1 text-purple-500 hover:text-purple-600 active:text-purple-700 hover:cursor-pointer"
                type="submit"
              >
                {isPending ? (
                  <Loader2 className="size-5 text-green-500 animate-spin" />
                ) : (
                  <Save className="size-4" />
                )}
              </m.button>
            </form>
          </div>
        </m.div>
      )}
    </div>
  );
};
