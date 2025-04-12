import { z } from "zod";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { createReactContext } from "@/lib/createReactContext";

import { useForm } from "react-hook-form";
import { CANVAS_PRESETS } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { sleep } from "@/lib/utils";

const Categories = [
  "Wedding",
  "Birthday",
  "Anniversary",
  "Rice Ceremony",
  "Other",
] as const;

const categorySchema = z
  .object({
    type: z.enum(Categories),
    other: z.string().optional(),
  })
  .refine((data) => (data.type === "Other" ? !!data.other : true), {
    message: "Other is required",
    path: ["other"],
  });

const createEventSchema = z.object({
  dimension: z.enum(
    CANVAS_PRESETS.map((preset) => preset.id) as [string, ...string[]]
  ),
  title: z.string({ message: "Title is required" }).default("Untitled Event"),
  description: z.string({ message: "Description is required" }),
  tags: z.array(z.string().min(3, "Tag must be at least 3 characters long")),
  category: categorySchema,
});

export const LibraryProvider = createReactContext(() => {
  const navigate = useNavigate();
  const [openNewEventModal, setOpenNewEventModal] = useState(false);

  const handleCreateNewEvent = () => {
    navigate({
      to: ".",
      search: {
        new: true,
      },
    });

    setOpenNewEventModal(true);
  };

  const createNewEventForm = useForm<z.infer<typeof createEventSchema>>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      dimension: CANVAS_PRESETS[0].id,
      title: "Untitled Event",
      description: "",
      tags: [],
      category: {
        type: "Wedding",
        other: "",
      },
    },
  });

  const { mutate: onSubmitNewEvent, isPending: isCreatingNewEvent } =
    useMutation({
      mutationKey: ["events", "create"],
      mutationFn: async (data: z.infer<typeof createEventSchema>) =>
        sleep(5000).then(() => data),

      onSuccess: () => {},
      onSettled: () => {
        createNewEventForm.reset();
        navigate({ to: "." });
        setOpenNewEventModal(false);
      },
    });

  useEffect(() => {
    if (!openNewEventModal) {
      navigate({ to: "." });
    }
  }, [openNewEventModal, navigate]);

  return {
    createNewEventForm,
    onSubmitNewEvent,
    handleCreateNewEvent,
    openNewEventModal,
    setOpenNewEventModal,
    Categories,
    isCreatingNewEvent,
  };
});

export const useLibraryProvider = LibraryProvider.use;
