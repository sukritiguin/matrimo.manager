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
import { useEditObject } from "../hooks/useEditObject";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

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

const ElementBorder = ({
  borderColor,
  editableObject,
  updateObjectProperty,
}: {
  borderColor: any;
  editableObject: any;
  updateObjectProperty: any;
}) => {
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
                onClick={() => {
                  setBorderStyle(variant.name);
                  updateObjectProperty("stroke", borderColor);
                  if (variant.name === "Dashed") {
                    updateObjectProperty("strokeDashArray", [10, 5]); // Dashed pattern (10px dash, 5px gap)
                  } else if (variant.name === "Dotted") {
                    updateObjectProperty("strokeDashArray", [2, 5]); // Dotted pattern (2px dash, 5px gap)
                  } else if (variant.name === "None") {
                    updateObjectProperty("stroke", null);
                    updateObjectProperty("strokeWidth", 0);
                  } else {
                    updateObjectProperty("strokeDashArray", null); // Remove dash effect for Solid/None
                  }
                }}
              >
                {React.createElement(variant.Icon)}
              </Button>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <Label className="text-sm">Border width</Label>
          <Slider
            min={1}
            max={10}
            step={1}
            defaultValue={[0]}
            onValueChange={(value) => {
              console.log("value", value);
              setBorderWidth(value[0]);
              updateObjectProperty("strokeWidth", value[0]);
            }}
          />
        </div>
        <ColorPicker {...borderColor} />
      </PopoverContent>
    </Popover>
  );
};

export const ToolbarPopover = ({
  editableObject,
  textColor,
  backgroundColor,
  borderColor,
  deleteObject,
  updateObjectProperty,
}: ReturnType<typeof useEditObject>) => {
  if (!editableObject) return null;

  console.log(editableObject.fontfamily);
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {/* Font Family Selector */}
      {/* ELEMENT BORDER */}
      <ToolTip text="Border" className="flex items-center">
        <ElementBorder
          borderColor={borderColor}
          editableObject={editableObject}
          updateObjectProperty={updateObjectProperty}
        />
      </ToolTip>
      <Separator orientation="vertical" />
      <Separator orientation="vertical" />

      {editableObject.type === "textbox" && (
        <ToolTip text="Font Family" className="flex items-center">
          <Select
            value={editableObject.fontfamily}
            onValueChange={(value) => updateObjectProperty("fontFamily", value)}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent className="z-[110]">
              <SelectItem value="Helvetica">Helvetica</SelectItem>
              <SelectItem value="Arial">Arial</SelectItem>
              <SelectItem value="Times New Roman">Times New Roman</SelectItem>
              <SelectItem value="Courier New">Courier New</SelectItem>
              <SelectItem value="Verdana">Verdana</SelectItem>
              <SelectItem value="Georgia">Georgia</SelectItem>
            </SelectContent>
          </Select>
        </ToolTip>
      )}
      {/* Bold Button */}
      {editableObject.type === "textbox" && (
        <ToolTip text="Bold" className="flex items-center">
          <Button
            onClick={() => {
              if (editableObject && editableObject instanceof fabric.Textbox) {
                updateObjectProperty(
                  "fontWeight",
                  editableObject.fontWeight === "bold" ? "normal" : "bold"
                );
              }
            }}
            size="icon"
            variant={editableObject.fontWeight === "bold" ? "active" : "outline"}
          >
            B
          </Button>
        </ToolTip>
      )}
      {editableObject.type === "textbox" && (
        <ToolTip text="Italic" className="flex items-center">
          <Button
            onClick={() => {
              if (editableObject instanceof fabric.Textbox) {
                updateObjectProperty(
                  "fontStyle",
                  editableObject.fontStyle === "italic" ? "normal" : "italic"
                );
              }
            }}
            size="icon"
            variant={editableObject.fontStyle === "italic" ? "active" : "outline"}
          >
            I
          </Button>
        </ToolTip>
      )}
      {/* Underline Button */}
      {editableObject.type === "textbox" && (
        <ToolTip text="Underline" className="flex items-center">
          <Button
            onClick={() => {
              if (editableObject && editableObject instanceof fabric.Textbox) {
                updateObjectProperty("underline", !editableObject.underline);
              }
            }}
            size="icon"
            variant={editableObject.underline === true ? "active" : "outline"}
          >
            <u>U</u>
          </Button>
        </ToolTip>
      )}

      {editableObject.type === "textbox" && (
        <ToolTip text="Font Size" className="flex items-center">
          <Input
            type="number"
            value={editableObject.fontSize} // Default value is 16 if fontSize is undefined
            onChange={(e) => {
              console.log(e.target.valueAsNumber);
              updateObjectProperty("fontSize", e.target.value);
            }}
            className="w-20"
            min="10"
            max="100"
          />
        </ToolTip>
      )}

      {editableObject.type === "textbox" && (
        <div className="flex border border-gray-400 rounded overflow-hidden">
          <ToolTip text="Align Left" className="flex items-center">
            <button
              // onClick={() => updateObject({ textAlign: "left" })}
              className={`px-3 py-1 border-r border-gray-400 ${editableObject?.textAlign === "left" ? "bg-gray-300 font-bold" : "bg-white hover:bg-gray-200"}`}
              onClick={() => updateObjectProperty("textAlign", "left")}
            >
              <FaAlignLeft size={16} />
            </button>
          </ToolTip>
          <ToolTip text="Align Center" className="flex items-center">
            <button
              //   onClick={() => updateObject({ textAlign: "center" })}
              className={`px-3 py-1 border-r border-gray-400 ${editableObject?.textAlign === "center" ? "bg-gray-300 font-bold" : "bg-white hover:bg-gray-200"}`}
              onClick={() => updateObjectProperty("textAlign", "center")}
            >
              <FaAlignCenter size={16} />
            </button>
          </ToolTip>
          <ToolTip text="Align Right" className="flex items-center">
            <button
              //   onClick={() => updateObject({ textAlign: "right" })}
              className={`px-3 py-1 ${editableObject?.textAlign === "right" ? "bg-gray-300 font-bold" : "bg-white hover:bg-gray-200"}`}
              onClick={() => updateObjectProperty("textAlign", "right")}
            >
              <FaAlignRight size={16} />
            </button>
          </ToolTip>
        </div>
      )}
      {/* Text Color */}
      <ToolTip text="Font Color" className="bg-gray-200 p-1 rounded-full">
        <ColorPicker {...textColor} />
      </ToolTip>
      {/* Background Color */}
      {editableObject.type === "textbox" && (
        <ToolTip text="Background Color" className="bg-gray-200 p-1 rounded-full">
          <ColorPicker {...backgroundColor} />
        </ToolTip>
      )}

      <ToolTip text="Delete" className="flex items-center">
        <button onClick={deleteObject}>
          <Trash2 className="size-6 text-destructive" />
        </button>
      </ToolTip>
    </div>
  );
};
