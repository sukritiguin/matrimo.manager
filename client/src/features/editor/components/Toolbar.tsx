import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useEditObject } from "../hooks/useEditObject";

import * as fabric from "fabric";
import { ToolbarPopover } from "./ToolbarPopover";
import { useCanvasStore } from "../stores/useCanvasStore";

export const Toolbar = () => {
  const { canvas, initCanvas } = useCanvasStore();
  const { textColor, backgroundColor, borderColor, editableObject, deleteObject } = useEditObject();

  const updateTextbox = (newProps: Partial<fabric.Textbox>) => {
    if (!canvas || !editableObject) return;

    console.log(newProps);
    editableObject.set(newProps);
    canvas.renderAll();
  };

  return (
    <AnimatePresence>
      {editableObject && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "8px 20px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 100,
          }}
        >
          <div className="flex space-x-3 items-center justify-center">
            <ToolbarPopover
              backgroundColor={backgroundColor}
              canvas={canvas}
              editableObject={editableObject}
              textColor={textColor}
              updateTextbox={updateTextbox}
              borderColor={borderColor}
              deleteObject={deleteObject}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
