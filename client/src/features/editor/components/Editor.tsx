import { SidebarProvider } from "@/components/ui/sidebar";
import { Canvas, CanvasToolbar, EditorHeader, LeftSidebar } from "../components";

export function Editor() {
  return (
    <SidebarProvider>
      <LeftSidebar />
      <div className="flex flex-col w-full flex-1 overflow-hidden">
        <EditorHeader />
        <CanvasToolbar />
        <div className="flex-1 w-full flex flex-col justify-between overflow-hidden">
          <Canvas />
        </div>
      </div>
    </SidebarProvider>
  );
}
