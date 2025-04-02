import { useEditTemplate } from "../hooks/useEditTemplate";
import { SidebarProvider } from "@/components/ui/sidebar";
import { EditorSidebar } from "./EditorSideBar";
import { EditorHeader } from "./EditorCanvasHeader";
import { EditorToolbar } from "./EditorToolbar";
import { EditorToolbarHeader } from "./EditorToolbarHeader";
import { EditorCanvas } from "./EditorCanvas";

export const EditTemplate: React.FC = () => {
  const { editorId, error, isPending } = useEditTemplate();

  if (!editorId || isPending) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div>
        <p>Somthing went wrong </p>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <EditorSidebar />
      <div className="flex flex-col w-full flex-1 overflow-hidden">
        <div className="top-0 z-50 flex flex-col w-full">
          <EditorHeader />
          <EditorToolbarHeader />
        </div>
        <main className="flex-1 w-full flex flex-col overflow-auto">
          <EditorToolbar />
          <EditorCanvas />
        </main>
      </div>
    </SidebarProvider>
  );
};
