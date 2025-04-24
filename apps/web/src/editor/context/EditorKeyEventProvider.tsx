import { createReactContext } from "@/lib/createReactContext";
import { useCallback, useEffect, useState } from "react";
import { useCanvasHistoryStore } from "../store/useCanvasHistory";
import { usePropertiesPanelStore } from "../store/usePropertiesStore";
import { useEditorStore } from "../store/useEditorStore";
import { ActiveSelection } from "fabric";
import { useCanvasUpdate } from "../hooks/useCanvasUpdate";
import { useEditorData } from "../hooks/useEditorData";

const ZOOM_FACTOR = 10;

export const EditorKeyEvent = createReactContext(() => {
  const [copyObject, setCopyObject] = useState<any>(null);
  const { canvas } = useEditorStore.getState();
  const { data } = useEditorData();

  const { saveCanvas } = useCanvasUpdate(data.canvas.id);

  const onSave = useCallback(() => {
    if (canvas) {
      const data = canvas.toJSON();
      saveCanvas(data);
    }
  }, [canvas, saveCanvas]);

  const onCopyObject = useCallback(async () => {
    if (canvas) {
      const selectedObject = canvas.getActiveObject();
      if (selectedObject) {
        const clonedObject = await selectedObject.clone();
        setCopyObject(clonedObject);
      }
    }
  }, [canvas]);

  const onPasteObject = useCallback(async () => {
    if (canvas && copyObject) {
      const clonedObject = await copyObject.clone();
      canvas.add(clonedObject);
      clonedObject.set({ top: clonedObject.top + 20, left: clonedObject.left + 20 });
      canvas.setActiveObject(clonedObject);
      clonedObject.setCoords();
      canvas.renderAll();
    }
  }, [canvas, copyObject]);

  const onCutObject = useCallback(async () => {
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        const clonedObject = await activeObject.clone();
        setCopyObject(clonedObject);
        canvas.remove(activeObject);
        canvas.renderAll();
      }
    }
  }, [canvas]);

  const onDeleteObject = useCallback(() => {
    if (canvas) {
      const activeObjects = canvas.getActiveObjects();
      if (activeObjects) {
        activeObjects.forEach((object) => {
          canvas.remove(object);
        });
        canvas.discardActiveObject();
        canvas.renderAll();
      }
    }
  }, [canvas]);

  const onEscape = useCallback(() => {
    const { reset } = usePropertiesPanelStore.getState();
    reset();
  }, []);

  const onSelectAll = useCallback(() => {
    if (canvas) {
      // if already selected, unselect all
      if (canvas.getActiveObjects() instanceof ActiveSelection) {
        canvas.discardActiveObject();
        canvas.renderAll();
      }
      // if not selected, select all
      else {
        const objects = canvas.getObjects();
        const selection = new ActiveSelection(objects, { canvas });
        canvas.setActiveObject(selection);
        canvas.renderAll();
      }
    }
  }, [canvas]);

  const onUndo = useCallback(() => {
    const { undo } = useCanvasHistoryStore.getState();
    undo();
  }, []);

  const onRedo = useCallback(() => {
    const { redo } = useCanvasHistoryStore.getState();
    redo();
  }, []);

  const onArrowKey = useCallback(
    (e: KeyboardEvent) => {
      if (canvas) {
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
          const step = 5; // Adjust the step size as needed
          switch (e.key) {
            case "ArrowUp":
              activeObject.top -= step;
              break;
            case "ArrowDown":
              activeObject.top += step;
              break;
            case "ArrowLeft":
              activeObject.left -= step;
              break;
            case "ArrowRight":
              activeObject.left += step;
              break;
            default:
              return; // Exit if no arrow key is pressed
          }
          activeObject.setCoords();
          canvas.renderAll();
        }
      }
    },
    [canvas]
  );

  const onEnter = useCallback(() => {
    const { setShowPropertiesPanel } = useEditorStore.getState();
    setShowPropertiesPanel(true);
  }, []);

  const onZoomIn = useCallback(() => {
    if (canvas) {
      const currentZoom = useEditorStore.getState().zoom;
      useEditorStore.getState().setZoom(currentZoom + ZOOM_FACTOR);
    }
  }, [canvas]);

  const onZoomOut = useCallback(() => {
    if (canvas) {
      const currentZoom = useEditorStore.getState().zoom;
      useEditorStore.getState().setZoom(currentZoom - ZOOM_FACTOR);
    }
  }, [canvas]);

  const onZoomReset = useCallback(() => {
    if (canvas) {
      useEditorStore.getState().setZoom(100);
    }
  }, [canvas]);

  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
        e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "s":
            onSave();
            break;
          case "z":
            onUndo();
            break;
          case "y":
            onRedo();
            break;
          case "c":
            onCopyObject();
            break;
          case "v":
            onPasteObject();
            break;
          case "x":
            onCutObject();
            break;
          case "a":
          case "A":
            onSelectAll();
            break;
          case "+":
          case "=":
            onZoomIn();
            break;
          case "-":
          case "_":
            onZoomOut();
            break;
          case "0":
            onZoomReset();
            break;

          default:
            break;
        }
      }

      switch (e.key) {
        case "Escape":
          onEscape();
          break;
        case "Delete":
          onDeleteObject();
          break;
        case "Enter":
          onEnter();
          break;
        default:
          break;
      }

      onArrowKey(e);
    };

    window.addEventListener("keydown", keydownHandler);
    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [
    onCopyObject,
    onPasteObject,
    onDeleteObject,
    onEscape,
    onArrowKey,
    onEnter,
    onZoomIn,
    onZoomOut,
    onZoomReset,
    onSelectAll,
    onCutObject,
    onSave,
    onUndo,
    onRedo,
  ]);

  return {
    setCopyObject,
    onCopyObject,
    onPasteObject,
    onDeleteObject,
    onEscape,
    onSelectAll,
    onArrowKey,
    onEnter,
    onZoomIn,
    onZoomOut,
    onZoomReset,
    onCutObject,
    onSave,
    onUndo,
    onRedo,
  };
});

export const EditorKeyEventProvider = EditorKeyEvent.Provider;
