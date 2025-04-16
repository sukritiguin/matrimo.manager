import { Button } from "../ui/button";
import { useSuspenseQuery } from "@tanstack/react-query";
import { NewEventSettingsModal } from "./CreateNewEvent";
import { useLibraryProvider } from "./LibraryProvider";
import { libraryQueryOptions } from "@/routes/_protected/library";
import { useState } from "react";
import { TEvent } from "@/types";
import { AnimatePresence, motion } from "motion/react";
import { useClickOutside } from "@/hooks/useClickOutSide";
import { useMultipleClick } from "@/hooks/useMutipleClick";
import { useNavigate } from "@tanstack/react-router";
import { X } from "lucide-react";

export const LibraryPage = () => {
  const navigate = useNavigate();
  const [showOverlay, setShowOverlay] = useState<TEvent | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<TEvent | null>(null);

  const ref = useClickOutside(() => setSelectedEvent(null));

  const { handleCreateNewEvent, openNewEventModal, setOpenNewEventModal } = useLibraryProvider();
  const {
    data: { data },
  } = useSuspenseQuery(libraryQueryOptions);

  const onClickEvent = (event: TEvent) => {
    setShowOverlay(null);
    setSelectedEvent(event);
    console.log(event);
  };

  const gotoEventEditor = (event: TEvent) => {
    console.log("double click event", event);
    navigate({ to: `/editor/${event.id}` });
  };

  const handleEventClick = useMultipleClick<TEvent>(onClickEvent, gotoEventEditor);

  return (
    <section className="flex flex-col w-full justify-between items-center py-6 relative">
      <NewEventSettingsModal open={openNewEventModal} onOpenChange={setOpenNewEventModal} />
      {selectedEvent && (
        <motion.div className="fixed inset-0 z-50 mt-12 flex items-center justify-center w-full bg-muted/50">
          <motion.div
            layoutId={`event-${selectedEvent.id}`}
            ref={ref}
            className="flex gap-2 border p-4 rounded-md bg-card relative"
            initial={{ zIndex: 0 }}
            animate={{ zIndex: 50 }}
            exit={{ zIndex: 0 }}
          >
            <button
              className="absolute right-2 top-2 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden cursor-pointer"
              onClick={() => setSelectedEvent(null)}
              aria-label="close"
            >
              <X className="text-muted-foreground size-4" />
            </button>
            <motion.img
              layoutId={`image-${selectedEvent.id}`}
              src={"https://fakeimg.pl/400x600?text=matrimo"}
              alt={selectedEvent.title + selectedEvent.id}
              className="flex rounded-md w-60 [aspect-ratio:3/4] object-cover"
              loading="lazy"
            />
            <motion.div
              layoutId={`text-${selectedEvent.id}`}
              className="flex flex-col w-60 h-full gap-2 p-1"
            >
              <h3 className="text-sm text-muted-foreground">
                Created by: {selectedEvent.owner.username ?? "Unknown"}
              </h3>
              {selectedEvent && (
                <div className="flex flex-col gap-2">
                  <p>{selectedEvent.title}</p>
                  <div>
                    <Button variant="focus" onClick={() => gotoEventEditor(selectedEvent)}>
                      Edit
                    </Button>
                  </div>
                  <p>{selectedEvent.description}</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
      <div className="flex items-center justify-between w-full">
        <h1 className="text-xl font-semibold">My Library</h1>
        <Button variant="focus" onClick={handleCreateNewEvent}>
          Create new event
        </Button>
      </div>
      <div className="flex w-full gap-6 mt-8">
        {data.events.map((event, index) => (
          <motion.div
            key={event.id}
            layoutId={`event-${event.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, zIndex: 10 }}
            exit={{ opacity: 0 }}
          >
            <motion.button
              className="relative flex flex-col items-center justify-center hover:cursor-pointer rounded-md"
              onMouseEnter={() => setShowOverlay(event)}
              onMouseLeave={() => setShowOverlay(null)}
              onClick={() => handleEventClick(event)}
            >
              <motion.img
                layoutId={`image-${event.id}`}
                // FIXME: Replace with real image
                src={"https://fakeimg.pl/400x600?text=matrimo"}
                alt={event.title + event.id}
                className="flex rounded-md w-48 [aspect-ratio:3/4] object-cover"
                loading="lazy"
              />
              <motion.div layoutId={`text-${event.id}`} className="flex w-full gap-2 p-1 text-base">
                <h3 className="text-sm text-muted-foreground">
                  Created by: {event.owner.username ?? "Unknown"}
                </h3>
              </motion.div>
              <AnimatePresence>
                {showOverlay === event && (
                  <motion.div className="absolute flex inset-0 rounded-md bg-muted/20 w-full h-full">
                    <div className="p-2 flex flex-col w-full items-center justify-center">
                      <h2 className="font-semibold text-black">{event.title}</h2>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
