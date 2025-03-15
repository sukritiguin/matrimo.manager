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
      {editableObject.type === "textbox" && (
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
      )}
      {/* Bold Button */}
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
      {/* Underline Button */}
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

      <div className="flex border border-gray-400 rounded overflow-hidden">
        <button
          //   onClick={() => updateObject({ textAlign: "left" })}
          className={`px-3 py-1 border-r border-gray-400 ${editableObject?.textAlign === "left" ? "bg-gray-300 font-bold" : "bg-white hover:bg-gray-200"}`}
        >
          <FaAlignLeft size={16} />
        </button>
        <button
          //   onClick={() => updateObject({ textAlign: "center" })}
          className={`px-3 py-1 border-r border-gray-400 ${editableObject?.textAlign === "center" ? "bg-gray-300 font-bold" : "bg-white hover:bg-gray-200"}`}
        >
          <FaAlignCenter size={16} />
        </button>
        <button
          //   onClick={() => updateObject({ textAlign: "right" })}
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
