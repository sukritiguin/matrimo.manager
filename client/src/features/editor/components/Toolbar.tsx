import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useEditObject } from "../hooks/useEditObject";
import { ToolbarPopover } from "./ToolbarPopover";
import { useCanvasStore } from "../stores/useCanvasStore";

export const Toolbar = () => {
  const { canvas, initCanvas } = useCanvasStore();
  const {
    textColor,
    backgroundColor,
    borderColor,
    selectedObjects,
    editableObject,
    updateObjectProperty,
    deleteObject,
  } = useEditObject();

  const updateObject = (newProps: Record<string, any>) => {
    if (!canvas || !editableObject) return;

    console.log("New Props while editing: ", newProps);

    // Update the object with the new properties
    Object.keys(newProps).forEach((key) => {
      updateObjectProperty(key, newProps[key]);
    });
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
              backgroundColor={backgroundColor} // Updated to use backgroundColor
              textColor={textColor} // Updated to use textColor
              borderColor={borderColor} // Border color for objects
              updateObject={updateObject} // Unified object update function
              deleteObject={deleteObject} // Delete selected objects from canvas
              canvas={canvas} // Pass canvas here
              editableObject={editableObject} // Pass editableObject here
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
