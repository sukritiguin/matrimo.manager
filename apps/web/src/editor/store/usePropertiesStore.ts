import { create } from "zustand";
import { useEditorStore } from "./useEditorStore";
import { IFabricObject } from "../types";

export type PropertiesStore = {
  selectedObject: IFabricObject | null;
  isSelectedObjectMoving: boolean;
  cursorPosition: [number, number] | null;
  copyObject: IFabricObject | null;

  setIsSelectedObjectMoving: (value: boolean) => void;
  setCursorPosition: (value: [number, number] | null) => void;
  setSelectedObject: (object: IFabricObject | null) => void;

  updateObjectProperty: (key: string, value: any) => void;

  moveLayer: {
    bringForward: () => void;
    sendBackward: () => void;
    bringToFront: () => void;
    sendToBack: () => void;
  };

  onKeyDown: (e: KeyboardEvent) => void;

  onDeleteObject: () => void;
  onCopyObject: () => void;

  reset: () => void;
};

export const usePropertiesPanelStore = create<PropertiesStore>((set, get) => ({
  selectedObject: null,
  isSelectedObjectMoving: false,
  cursorPosition: null,
  copyObject: null,

  setSelectedObject: (object) => set({ selectedObject: object }),

  setIsSelectedObjectMoving: (value) => set({ isSelectedObjectMoving: value }),

  setCursorPosition: (value) => set({ cursorPosition: value }),

  updateObjectProperty: (key, value) => {
    try {
      const { selectedObject } = get();
      const canvas = useEditorStore.getState().canvas;

      if (!selectedObject || !canvas) {
        throw new Error("No object selected");
      }

      selectedObject.set(key, value);
      selectedObject.setCoords();
      canvas.renderAll();

      set({ selectedObject: selectedObject });
    } catch (error) {
      console.error("Failed to update object", error);
    }
  },

  moveLayer: {
    bringForward: () => {
      const canvas = useEditorStore.getState().canvas;
      const selectedObject = usePropertiesPanelStore.getState().selectedObject;
      if (canvas && selectedObject) {
        canvas.bringObjectForward(selectedObject);
        canvas.renderAll();
      }
    },

    sendBackward: () => {
      const canvas = useEditorStore.getState().canvas;
      const selectedObject = usePropertiesPanelStore.getState().selectedObject;
      if (canvas && selectedObject) {
        canvas.sendObjectBackwards(selectedObject);
        canvas.renderAll();
      }
    },

    bringToFront: () => {
      const canvas = useEditorStore.getState().canvas;
      const selectedObject = usePropertiesPanelStore.getState().selectedObject;
      if (canvas && selectedObject) {
        canvas.bringObjectToFront(selectedObject);
        canvas.renderAll();
      }
    },

    sendToBack: () => {
      const canvas = useEditorStore.getState().canvas;
      const selectedObject = usePropertiesPanelStore.getState().selectedObject;
      if (canvas && selectedObject) {
        canvas.sendObjectToBack(selectedObject);
        canvas.renderAll();
      }
    },
  },

  onKeyDown: async (e: KeyboardEvent) => {
    try {
      const canvas = useEditorStore.getState().canvas;
      const selectedObject = usePropertiesPanelStore.getState().selectedObject;

      if (!canvas) throw new Error("Canvas not found");
      if (!selectedObject) throw new Error("No object selected");

      switch (e.key) {
        case "ArrowLeft":
          selectedObject.set({ left: selectedObject.left - 10 });
          selectedObject.setCoords();
          canvas.renderAll();
          break;
        case "ArrowRight":
          selectedObject.set({ left: selectedObject.left + 10 });
          selectedObject.setCoords();
          canvas.renderAll();
          break;
        case "ArrowDown":
          selectedObject.set({ top: selectedObject.top + 10 });
          selectedObject.setCoords();
          canvas.renderAll();
          break;
        case "ArrowUp":
          selectedObject.set({ top: selectedObject.top - 10 });
          selectedObject.setCoords();
          canvas.renderAll();
          break;
        case "Escape":
          canvas.discardActiveObject();
          get().reset();
          useEditorStore.setState({ showPropertiesPanel: false });
          canvas.renderAll();
          break;
        case "Enter":
          useEditorStore.setState({ showPropertiesPanel: true });
          break;
        case "Delete":
          canvas.getActiveObjects().forEach((obj) => canvas.remove(obj));
          canvas.discardActiveObject();
          get().reset();
          break;
        case "c":
        case "C":
          if (e.ctrlKey) {
            const clonedObject = await selectedObject.clone();
            set({ copyObject: clonedObject as any });
          }
          break;
        case "v":
        case "V":
          if (e.ctrlKey) {
            const obj = get().copyObject;
            if (obj) {
              const copyObject = await obj.clone();
              canvas.add(copyObject);
              copyObject.set({ top: selectedObject.top + 20, left: selectedObject.left + 20 });
              canvas.setActiveObject(copyObject);
              copyObject.setCoords();
              canvas.renderAll();
            }
          }
          break;
        case "x":
        case "X":
          if (e.ctrlKey) {
            const clonedObject = await selectedObject.clone();
            set({ copyObject: clonedObject as any });
            canvas.getActiveObjects().forEach((obj) => canvas.remove(obj));
            canvas.discardActiveObject();
            set({ selectedObject: null});
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(`Failed to handle keydown: ${e.key}`, error);
    }
  },

  onCopyObject: async () => {
    try {
      const { selectedObject } = get();
      const { canvas } = useEditorStore.getState();
      if (!selectedObject || !canvas) {
        throw new Error("No object selected");
      }

      const clonedObject = await selectedObject.clone();
      canvas.add(clonedObject);
      clonedObject.set({ top: selectedObject.top + 20, left: selectedObject.left + 20 });

      get().reset();
      canvas.setActiveObject(clonedObject);
      clonedObject.setCoords();
      canvas.renderAll();

      set({ selectedObject: clonedObject });
    } catch (error) {
      console.error("Failed to copy object", error);
    }
  },

  onDeleteObject: () => {
    try {
      const { selectedObject } = get();
      const { canvas } = useEditorStore.getState();
      if (!selectedObject || !canvas) {
        throw new Error("No object selected");
      }

      canvas.remove(selectedObject);
      canvas.renderAll();

      get().reset();
      set({ selectedObject: null });
    } catch (error) {
      console.error("Failed to delete object", error);
    }
  },

  reset: () =>
    set({
      selectedObject: null,
      cursorPosition: null,
      isSelectedObjectMoving: false,
    }),
}));

export const useObjectProperties = () => usePropertiesPanelStore((state) => state);
