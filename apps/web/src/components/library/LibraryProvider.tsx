import { z } from "zod";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { createReactContext } from "@/lib/createReactContext";

import { useForm } from "react-hook-form";
import { CANVAS_PRESETS } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createEventSchema, EVENT_CATEGORIES } from "@/schemas/events.schema";
import { createNewEvent } from "@/services/events.services";

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
      mutationFn: createNewEvent,
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
    Categories: EVENT_CATEGORIES,
    isCreatingNewEvent,
  };
});

export const useLibraryProvider = LibraryProvider.use;
