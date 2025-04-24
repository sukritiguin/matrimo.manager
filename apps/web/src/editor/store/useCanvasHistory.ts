import { Canvas } from "fabric";
import { create } from "zustand";
import { useEditorStore } from "./useEditorStore";

const MAX_HISTORY_LENGTH = 24;

interface HistoryStore {
  undoStack: string[];
  redoStack: string[];
  historyPaused: boolean;

  saveState: (canvas: Canvas) => void;
  undo: () => void;
  redo: () => void;

  pause: () => void;
  resume: () => void;
  reset: () => void;
}

export const useCanvasHistoryStore = create<HistoryStore>((set, get) => ({
  undoStack: [],
  redoStack: [],
  historyPaused: false,

  pause: () => set({ historyPaused: true }),
  resume: () => set({ historyPaused: false }),

  saveState: (canvas) => {
    if (!canvas) return;

    const json = JSON.stringify(canvas.toDatalessJSON());
    const { undoStack, historyPaused } = get();

    if (undoStack.length > MAX_HISTORY_LENGTH) {
      set((state) => ({
        undoStack: state.undoStack.slice(1),
      }));
    }
    const last = undoStack[undoStack.length - 1];

    if (historyPaused || last === json) return;

    set({
      undoStack: [...undoStack, json],
      redoStack: [],
    });

    console.log("✅ State saved");
  },

  undo: () => {
    const canvas = useEditorStore.getState().canvas;
    const { undoStack, redoStack, pause, resume } = get();
    if (undoStack.length <= 1 || !canvas) return;

    const current = undoStack.pop();
    const prev = undoStack[undoStack.length - 1];

    pause();

    canvas.loadFromJSON(prev, () => {
      canvas.renderAll();
      canvas.requestRenderAll();
      resume();
    });

    set({
      undoStack: [...undoStack],
      redoStack: [current!, ...redoStack],
    });

    console.log("↩️ Undo");
  },

  redo: () => {
    const canvas = useEditorStore.getState().canvas;

    const { undoStack, redoStack, pause, resume } = get();
    if (!canvas || redoStack.length === 0) return;

    const next = redoStack[0];
    const updatedRedo = redoStack.slice(1);

    pause();

    canvas.loadFromJSON(next, () => {
      canvas.renderAll();
      canvas.requestRenderAll();
      resume();
    });

    set({
      undoStack: [...undoStack, next],
      redoStack: updatedRedo,
    });

    console.log("↪️ Redo");
  },

  reset: () => set({ undoStack: [], redoStack: [] }),
}));
