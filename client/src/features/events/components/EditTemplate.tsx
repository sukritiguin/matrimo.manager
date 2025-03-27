import { useEditTemplate } from "../hooks/useEditTemplate";
import { SidebarProvider } from "@/components/ui/sidebar";
import { EditorSidebar } from "./EditorSideBar";
import { EditorHeader } from "./EditorCanvasHeader";
import { EditorToolbar } from "./EditorToolbar";
import { EditorToolbarHeader } from "./EditorToolbarHeader";
import { EditorCanvas } from "./EditorCanvas";

export const EditTemplate: React.FC = () => {
  const { editorId } = useEditTemplate();

  if (!editorId) {
    return <p>Loading...</p>;
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
