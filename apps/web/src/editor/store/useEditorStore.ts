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
  exportCanvas: {
    asImage: () => void;
    asSvg: () => void;
    asPdf: () => void;
  };
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

  exportCanvas: {
    asImage: () => {
      const { canvas } = get();
      if (!canvas) return;
      const dataUrl = canvas.toDataURL({
        format: "png",
        multiplier: 2,
      });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "canvas.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      canvas.discardActiveObject();
    },
    asSvg: () => {
      const { canvas } = get();
      if (!canvas) return;
      const svgData = canvas.toSVG();
      const blob = new Blob([svgData], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "canvas.svg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },
    asPdf: () => {
      const { canvas } = get();
      if (!canvas) return;
      const pdfData = canvas.toDataURL({
        format: "png",
        multiplier: 2,
      });
      const blob = new Blob([pdfData], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "canvas.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },
  },

  reset: () => set(initialState),
}));
