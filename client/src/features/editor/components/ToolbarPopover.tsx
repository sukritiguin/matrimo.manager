import { ColorPicker } from "@/components/color-picker";
import { ToolTip } from "@/components/common/tooltip";
import * as fabric from "fabric";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  RxBorderDashed,
  RxBorderDotted,
  RxBorderSolid,
  RxBorderWidth,
  RxValueNone,
} from "react-icons/rx";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useColorPicker } from "@/hooks/useColorPicker";
import { Separator } from "@radix-ui/react-separator";
import { Trash2 } from "lucide-react";
import { FaAlignCenter, FaAlignLeft, FaAlignRight } from "react-icons/fa";

const BorderVariants = [
  {
    name: "None",
    Icon: RxValueNone,
  },
  {
    name: "Solid",
    Icon: RxBorderSolid,
  },
  {
    name: "Dashed",
    Icon: RxBorderDashed,
  },
  {
    name: "Dotted",
    Icon: RxBorderDotted,
  },
] as const;

const ElementBorder: React.FC<{
  borderColor: ReturnType<typeof useColorPicker>;
}> = ({ borderColor }) => {
  const [borderWidth, setBorderWidth] = useState(0);
  const [borderStyle, setBorderStyle] = useState<(typeof BorderVariants)[number]["name"]>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="outline">
          <RxBorderWidth />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto px-2 py-2 mt-2 space-y-4">
        <div className="space-y-3">
          <Label className="text-sm">Border style</Label>
          <div className="flex gap-2">
            {BorderVariants.map((variant) => (
              <Button
                size="icon"
                variant={borderStyle && variant.name === borderStyle ? "active" : "outline"}
                onClick={() => setBorderStyle(variant.name)}
              >
                {React.createElement(variant.Icon)}
              </Button>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <Label className="text-sm">Border width</Label>
          <Slider />
        </div>
        <ColorPicker {...borderColor} />
      </PopoverContent>
    </Popover>
  );
};

export const ToolbarPopover = ({
  editableObject,
  canvas,
  textColor,
  backgroundColor,
  borderColor,
  deleteObject,
  updateObject,
}: {
  editableObject: any;
  canvas: any;
  textColor: any;
  backgroundColor: any;
  borderColor: any;
  deleteObject: any;
  updateObject: (newProps: Record<string, any>) => void;
}) => {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {/* Font Family Selector */}
      <ToolTip text="Background" className="flex items-center">
        <ColorPicker
          {...backgroundColor}
          label="Background"
          className="border border-muted bg-muted rounded-md p-1"
        />
      </ToolTip>

      {/* ELEMENT BORDER */}
      <ToolTip text="Border" className="flex items-center">
        <ElementBorder borderColor={borderColor} />
      </ToolTip>
      <Separator orientation="vertical" />

      <Separator orientation="vertical" />
      <ToolTip text="Delete" className="flex items-center">
        <button onClick={deleteObject}>
          <Trash2 className="size-6 text-destructive" />
        </button>
      </ToolTip>

      <ToolTip text="Font Family" className="flex items-center">
        <select
          value={editableObject.fontFamily} // Bind the selected value to the editableObject's fontFamily
          onChange={(e) => {
            const newFontFamily = e.target.value;
            console.log("Selected font family:", newFontFamily);

            // Update the fontFamily of the editableObject (Fabric.js Textbox)
            editableObject.set("fontFamily", newFontFamily);

            // Re-render the canvas to apply the changes
            canvas?.renderAll();
          }}
          className="border p-1 rounded"
        >
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          <option value="Verdana">Verdana</option>
        </select>
      </ToolTip>

      {/* Bold Button */}
      <button
        onClick={() => {
          if (editableObject && editableObject instanceof fabric.Textbox) {
            const newFontWeight = editableObject.fontWeight === "bold" ? "normal" : "bold";
            editableObject.set("fontWeight", newFontWeight); // Update Fabric.js object
            canvas?.renderAll(); // Render changes in Fabric.js

            // Force React state update to reflect the change
            // setEditableObject(
            //   new fabric.Textbox(editableObject.text, {
            //     ...editableObject,
            //   })
            // );
          }
        }}
        className={`p-1 rounded ${editableObject?.fontWeight === "bold" ? "bg-gray-300 font-bold" : ""}`}
      >
        B
      </button>

      {/* Italic Button */}
      <button
        onClick={() => {
          if (editableObject && editableObject instanceof fabric.Textbox) {
            const newFontStyle = editableObject.fontStyle === "italic" ? "normal" : "italic";
            editableObject.set("fontStyle", newFontStyle); // Update fontStyle property
            canvas?.renderAll(); // Render changes in Fabric.js

            // Force React state update to reflect the change
            // setEditableObject(
            //   new fabric.Textbox(editableObject.text, {
            //     ...editableObject,
            //   })
            // );
          }
        }}
        className={`p-1 rounded ${editableObject?.fontStyle === "italic" ? "bg-gray-300" : ""}`}
      >
        <i>I</i>
      </button>

      {/* Underline Button */}
      <button
        onClick={() => {
          if (editableObject && editableObject instanceof fabric.Textbox) {
            const newUnderline = !editableObject.underline;
            editableObject.set("underline", newUnderline); // Update underline property
            canvas?.renderAll(); // Render changes in Fabric.js

            // Force React state update to reflect the change
            // setEditableObject(
            //   new fabric.Textbox(editableObject.text, {
            //     ...editableObject,
            //   })
            // );
          }
        }}
        className={`p-1 rounded ${editableObject?.underline ? "bg-gray-300" : ""}`}
      >
        <u>U</u>
      </button>

      {/* Font Size */}
      <input
        type="number"
        value={editableObject.fontSize || 16} // Default value is 16 if fontSize is undefined
        onChange={(e) => {
          const newFontSize = parseInt(e.target.value, 10);

          // Update only if the value is a valid number and within the range
          if (!isNaN(newFontSize) && newFontSize >= 10 && newFontSize <= 100) {
            // Update font size directly in fabric Textbox object
            editableObject.set("fontSize", newFontSize);

            // Trigger continuous re-render of the canvas
            canvas?.renderAll();
          }
        }}
        className="border p-1 w-16 rounded"
        min="10"
        max="100"
      />

      {/* Text Alignment */}
      <div className="flex border border-gray-400 rounded overflow-hidden">
        <button
          onClick={() => updateObject({ textAlign: "left" })}
          className={`px-3 py-1 border-r border-gray-400 ${editableObject?.textAlign === "left" ? "bg-gray-300 font-bold" : "bg-white hover:bg-gray-200"}`}
        >
          <FaAlignLeft size={16} />
        </button>
        <button
          onClick={() => updateObject({ textAlign: "center" })}
          className={`px-3 py-1 border-r border-gray-400 ${editableObject?.textAlign === "center" ? "bg-gray-300 font-bold" : "bg-white hover:bg-gray-200"}`}
        >
          <FaAlignCenter size={16} />
        </button>
        <button
          onClick={() => updateObject({ textAlign: "right" })}
          className={`px-3 py-1 ${editableObject?.textAlign === "right" ? "bg-gray-300 font-bold" : "bg-white hover:bg-gray-200"}`}
        >
          <FaAlignRight size={16} />
        </button>
      </div>

      {/* Text Color */}
      <ToolTip text="Text Color">
        <ColorPicker {...textColor} />
      </ToolTip>

      {/* Background Color */}
      <ToolTip text="Background Color">
        <ColorPicker {...backgroundColor} />
      </ToolTip>
    </div>
  );
};
