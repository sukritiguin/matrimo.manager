import { useCanvas } from "../hooks/useCanvas";
import { useEditObject } from "../hooks/useEditObject";
import { useInsertObject } from "../hooks/useInsertObject";
import { Toolbar } from "./Toolbar";

export const Canvas: React.FC = () => {
  const { canvasContainerRef, canvasRef } = useCanvas();
  const editObject = useEditObject();
  const { handleDrop } = useInsertObject();

  return (
    <div className="flex flex-col w-full h-full">
      <Toolbar {...editObject} />
      <div className="flex flex-1 w-full justify-center items-center h-full overflow-auto bg-muted">
        <div
          ref={canvasContainerRef}
          className="w-full border border-muted shadow-xl overflow-hidden"
          onDrop={handleDrop}
        >
          <canvas ref={canvasRef} />
        </div>
      </div>
    </div>
  );
};
