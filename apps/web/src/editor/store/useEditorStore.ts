import { centerCanvas } from "@/editor/fabric/fabric-utils";
import { Canvas } from "fabric";
import { create } from "zustand";

interface IEditorState {
  canvas: Canvas | null;
  zoom: number;
  showPropertiesPanel: boolean;
}
interface IEditorStore extends IEditorState {
  setCanvas: (canvas: Canvas | null) => void;
  setZoom: (zoom: number) => void;
  setShowPropertiesPanel: (flag: boolean) => void;
  markAsModified: () => void;
  reset: () => void;
}

const initialState: IEditorState = {
  canvas: null,
  zoom: 100,
  showPropertiesPanel: false,
};

export const useEditorStore = create<IEditorStore>((set, get) => ({
  ...initialState,

  setCanvas: (canvas) => {
    set({ canvas });
    if (canvas) {
      centerCanvas(canvas);
    }
  },

  setZoom: (zoom) => {
    const newZoom = Math.min(300, Math.max(50, zoom));
    set({ zoom: newZoom });
  },

  setShowPropertiesPanel: (flag) => set({ showPropertiesPanel: flag }),

  markAsModified: () => {
    console.log("mark as modified");
  },

  reset: () => set(initialState),
}));
