"use client";

import * as React from "react";
import { ToolTip } from "@/components/common/tooltip";
import { Button } from "@/components/ui/button";
import { Redo2, Undo2 } from "lucide-react";
import { CirCulerStack } from "../utils/stack";
import * as fabric from "fabric";
import { useCanvasHistory } from "../hooks/useCanvasHistory";

export const UndoRedo: React.FC<{
  history: CirCulerStack<fabric.Object[]>;
  undo: () => void;
  redo: () => void;
}> = () => {
  const { undo, redo, canRedo, canUndo } = useCanvasHistory();
  return (
    <div>
      <ToolTip text="Undo">
        <Button
          variant="ghost"
          size="icon"
          onClick={undo}
          // disabled={history.isEmpty}
          disabled={canUndo}
        >
          <Undo2 className="h-4 w-4" />
        </Button>
      </ToolTip>

      <ToolTip text="Redo">
        <Button
          variant="ghost"
          size="icon"
          onClick={redo}
          //   disabled={history.isFull || history.isEmpty}
          disabled={canRedo}
        >
          <Redo2 className="h-4 w-4" />
        </Button>
      </ToolTip>
    </div>
  );
};
