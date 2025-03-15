import { useCanvas } from "../hooks/useCanvas";
import { Toolbar } from "./Toolbar";

export const Canvas: React.FC = () => {
  const { canvasContainerRef, canvasRef } = useCanvas();

  return (
    <div className="flex flex-col w-full h-full">
      <Toolbar />
      <div className="flex flex-1 w-full justify-center items-center h-full overflow-auto bg-muted">
        <div
          ref={canvasContainerRef}
          className="w-full border border-muted shadow-xl overflow-hidden"
        >
          <canvas ref={canvasRef} />
        </div>
      </div>
    </div>
  );
};
