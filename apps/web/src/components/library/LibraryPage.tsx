import { Button } from "../ui/button";
import { NewEventSettingsModal } from "./CreateNewEvent";
import { useLibraryProvider } from "./LibraryProvider";

export const LibraryPage = () => {
  const { handleCreateNewEvent, openNewEventModal, setOpenNewEventModal } =
    useLibraryProvider();

  return (
    <section className="flex w-full justify-between items-center py-6">
      <h1 className="text-xl font-semibold">My Library</h1>
      <Button variant="focus" onClick={handleCreateNewEvent}>Create new event</Button>
      <NewEventSettingsModal
        open={openNewEventModal}
        onOpenChange={setOpenNewEventModal}
      />
    </section>
  );
};
