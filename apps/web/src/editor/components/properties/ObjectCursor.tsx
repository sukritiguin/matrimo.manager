import { useObjectProperties } from "@/editor/store/usePropertiesStore";
import { AnimatePresence } from "motion/react";

export const ObjectCursor = () => {
  const { isSelectedObjectMoving, selectedObject } = useObjectProperties();

  if (!selectedObject) return null;

  const bounds = selectedObject.getBoundingRect();
  const { left, top } = bounds;

  return (
    <AnimatePresence>
      {isSelectedObjectMoving && selectedObject && (
        <div
          style={{
            position: "absolute",
            left,
            top: top - 10,
            pointerEvents: "none",
            zIndex: 100,
          }}
        >
          <span className="inline-flex text-[0.7rem] bg-accent text-accent-foreground px-2 py-1 rounded">
            <span>X: {left.toFixed(0)}</span>
            <span>,</span>
            <span className="ml-1">Y: {top.toFixed(0)}</span>
          </span>
        </div>
      )}
    </AnimatePresence>
  );
};
