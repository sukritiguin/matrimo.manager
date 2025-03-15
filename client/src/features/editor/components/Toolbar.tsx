import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useEditObject } from "../hooks/useEditObject";
import { ToolbarPopover } from "./ToolbarPopover";
import React from "react";

export const Toolbar: React.FC<ReturnType<typeof useEditObject>> = ({ ...props }) => {
  return (
    <AnimatePresence>
      {props.editableObject && (
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
            <ToolbarPopover {...props} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
