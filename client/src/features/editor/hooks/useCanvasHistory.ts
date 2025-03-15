import { useEffect, useState } from "react";
import { useCanvasStore } from "../stores/useCanvasStore";

const MAX_SIZE: number = 32;

export const useCanvasHistory = () => {
  const { canvas } = useCanvasStore();
  const [historyStack, setHistoryStack] = useState<Array<object>>([]); // Undo stack
  const [redoStack, setRedoStack] = useState<Array<object>>([]); // Redo stack

  // Add a new state to the history stack
  const addHistory = (newState: object) => {
    setHistoryStack((prevHistory) => {
      const newHistory = [...prevHistory, newState];

      // Limit the history stack size to MAX_SIZE
      if (newHistory.length > MAX_SIZE) {
        newHistory.shift(); // Remove the oldest state
      }

      return newHistory;
    });

    // Clear the redo stack when a new state is added
    setRedoStack([]);
  };

  // Undo: Restore the previous state
  const undo = () => {
    if (historyStack.length > 1) {
      const previousState = historyStack[historyStack.length - 2]; // Get the previous state
      const currentState = historyStack[historyStack.length - 1]; // Get the current state

      // Move the current state to the redo stack
      setRedoStack((prevRedo) => [...prevRedo, currentState]);

      // Remove the current state from the history stack
      setHistoryStack((prevHistory) => prevHistory.slice(0, -1));

      // Apply the previous state to the canvas
      if (canvas) {
        canvas.clear();
        canvas.loadFromJSON(previousState, () => {
          canvas.renderAll();
        });
      }
    }
  };

  // Redo: Restore the next state
  const redo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[redoStack.length - 1]; // Get the next state

      // Move the next state back to the history stack
      setHistoryStack((prevHistory) => [...prevHistory, nextState]);

      // Remove the next state from the redo stack
      setRedoStack((prevRedo) => prevRedo.slice(0, -1));

      // Apply the next state to the canvas
      if (canvas) {
        canvas.clear();
        canvas.loadFromJSON(nextState, () => {
          canvas.renderAll();
        });
      }
    }
  };

  // Listen for canvas changes and update the history
  useEffect(() => {
    if (!canvas) return;

    const updateHistory = () => {
      const currentState = canvas.toJSON(); // Serialize the current canvas state
      addHistory(currentState); // Add the state to the history stack
    };

    // Listen for canvas changes
    // canvas.on("object:added", updateHistory);
    canvas.on("object:removed", updateHistory);

    // Cleanup event listeners
    return () => {
      //   canvas.off("object:added", updateHistory);
      canvas.off("object:removed", updateHistory);
    };
  }, [canvas]);

  return {
    addHistory,
    undo,
    redo,
    canUndo: historyStack.length > 1, // Check if undo is possible
    canRedo: redoStack.length > 0, // Check if redo is possible
  };
};
