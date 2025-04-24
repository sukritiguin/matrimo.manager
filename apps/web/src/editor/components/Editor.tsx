import * as React from "react";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import MainCanvas from "./MainCanvas";
import { PropertiesPanel } from "./properties";
import { UploadPreview } from "./sidebar/UploadPreview";
import { useCanvasUpdate } from "../hooks/useCanvasUpdate";
import { useEditorData } from "../hooks/useEditorData";
import { useCanvasHistoryStore } from "../store/useCanvasHistory";
import { useEditorStore } from "../store/useEditorStore";
import { throttle } from "lodash";
import { EditorKeyEventProvider } from "../context/EditorKeyEventProvider";

export const Editor: React.FC = () => {
  const { data } = useEditorData();
  const { canvas } = useEditorStore();

  const { saveState } = useCanvasHistoryStore.getState();
  React.useEffect(() => {
    if (!canvas) return;

    const addHistoryState = throttle(() => {
      if (!useCanvasHistoryStore.getState().historyPaused && canvas) {
        saveState(canvas);
      }
    }, 1000);

    canvas.on("object:added", addHistoryState);
    canvas.on("object:removed", addHistoryState);
    canvas.on("object:modified", addHistoryState);

    // Save initial state
    addHistoryState();

    return () => {
      canvas.off("object:added", addHistoryState);
      canvas.off("object:removed", addHistoryState);
      canvas.off("object:modified", addHistoryState);
    };
  }, [canvas, saveState]);

  useCanvasUpdate(data.canvas.id);

  return (
    <EditorKeyEventProvider>
      <main className="w-full h-[calc(100svh-3rem)]">
        {/* Header */}
        <Header />
        <div className="flex flex-1 w-full h-full pt-12">
          <UploadPreview />
          <Sidebar />
          <div className="flex flex-1 items-center justify-center">
            <MainCanvas />
          </div>
          <PropertiesPanel />
        </div>
      </main>
    </EditorKeyEventProvider>
  );
};
