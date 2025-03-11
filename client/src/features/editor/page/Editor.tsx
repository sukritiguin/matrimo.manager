"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import {
  Canvas,
  CanvasButtonToolbar,
  CanvasToolbar,
  EditorHeader,
  LeftSidebar,
  RightSidebar,
} from "../components";
import { useCanvasStore } from "../stores/useCanvasStore";

export function EditorPage() {
  const { canvas } = useCanvasStore();

  const [showOrientationDialog, setShowOrientationDialog] = useState(false);
  const [autoAdjustElements, setAutoAdjustElements] = useState(true);

  const confirmOrientationChange = () => {
    // const newOrientation =
    //   orientation === "portrait" ? "landscape" : "portrait";
    // // Map current size to equivalent in new orientation
    // let newSize = canvasSize;
    // if (orientation === "portrait") {
    //   // Portrait to landscape
    //   if (canvasSize === "4x6") newSize = "6x4";
    //   else if (canvasSize === "5x7") newSize = "7x5";
    //   else if (canvasSize === "6x8") newSize = "8x6";
    //   else if (canvasSize === "a4") newSize = "a4-landscape";
    //   else if (canvasSize === "a5") newSize = "a5-landscape";
    // } else {
    //   // Landscape to portrait
    //   if (canvasSize === "6x4") newSize = "4x6";
    //   else if (canvasSize === "7x5") newSize = "5x7";
    //   else if (canvasSize === "8x6") newSize = "6x8";
    //   else if (canvasSize === "a4-landscape") newSize = "a4";
    //   else if (canvasSize === "a5-landscape") newSize = "a5";
    // }
    // setOrientation(newOrientation);
    // setCanvasSize(newSize);
    // setShowOrientationDialog(false);
  };

  useEffect(() => {
    return () => {
      if (canvas) {
        canvas.dispose();
      }
    };
  }, [canvas]);

  return (
    <div className="flex flex-col w-full h-screen max-h-screen bg-background">
      <EditorHeader />
      <div className="flex w-full flex-1 overflow-hidden">
        <LeftSidebar />
        <div className="flex-1 w-full flex flex-col justify-between overflow-hidden">
          <CanvasToolbar />
          <div className="relative h-full">
            <Canvas />
          </div>
          {/* TODO: See you later */}
          {/* <CanvasButtonToolbar /> */}
        </div>
        {/* TODO: See you later */}
        {/* <RightSidebar /> */}
      </div>

      {/* Orientation change confirmation dialog */}
      <Dialog
        open={showOrientationDialog}
        onOpenChange={setShowOrientationDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Orientation</DialogTitle>
            <DialogDescription>
              Changing the orientation will adjust the canvas size. How would
              you like to handle existing elements?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center space-x-2 mb-4">
              <Switch
                id="auto-adjust"
                checked={autoAdjustElements}
                onCheckedChange={setAutoAdjustElements}
              />
              <Label htmlFor="auto-adjust">
                Automatically adjust elements to fit new orientation
              </Label>
            </div>
            <p className="text-sm text-muted-foreground">
              {autoAdjustElements
                ? "Elements will be repositioned and resized to maintain their relative positions in the new orientation."
                : "Elements will maintain their absolute positions, which may cause them to appear outside the canvas area."}
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowOrientationDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={confirmOrientationChange}>
              Change Orientation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
