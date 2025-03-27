import { cn } from "@/lib/utils";
import { useEditorActions } from "../hooks/useEditorActions";
import { useEditorCanvas } from "../hooks/useEditorCanvas";
import { useInsertObject } from "../hooks/useInsertObject";

export const EditorCanvas = () => {
  const { showGrid } = useEditorActions();
  const { handleDrop } = useInsertObject();
  const { canvasContainerRef, canvasRef } = useEditorCanvas();

  return (
    <div className="flex flex-1 w-full justify-center items-center h-full overflow-scroll bg-muted relative">
      <div
        onDrop={handleDrop}
        ref={canvasContainerRef}
        className={cn(
          "w-full border shadow-xl overflow-hidden relative",
          showGrid &&
            "bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:48px_48px]"
        )}
      >
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};
