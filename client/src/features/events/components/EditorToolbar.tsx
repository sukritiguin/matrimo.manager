import { AnimatePresence } from "framer-motion";
import * as motion from "framer-motion/client";
import { useEditorOject } from "../hooks/useEditorOjbect";
import { ToolTip } from "@/components/common/tooltip";
import { createElement, Fragment, useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  RxBorderDashed,
  RxBorderDotted,
  RxBorderSolid,
  RxBorderWidth,
  RxValueNone,
} from "react-icons/rx";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ColorPicker } from "@/components/color-picker";
import { useColorPicker } from "@/hooks/useColorPicker";
import { FabricText, Object } from "fabric";
import { AlignCenter, AlignLeft, AlignRight, Bold, Italic, Trash2, Underline } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const EditorToolbar = () => {
  const { editableObject, updateObjectProperty, backgroundColor, deleteObject } = useEditorOject();
  const [position, setPosition] = useState({ x: 400, y: 150 });

  const handleDrag = (event: any, info: any) => {
    setPosition({ x: event.pageX - 100, y: event.pageY - 100 });
  };

  useEffect(() => {
    return () => {
      setPosition({ x: 400, y: 200 });
    };
  }, []);

  if (!editableObject) return null;

  return (
    <AnimatePresence>
      {editableObject && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          drag
          dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
          onDrag={handleDrag}
          style={{
            position: "absolute",
            left: position.x,
            top: position.y,
            backgroundColor: "white",
            padding: "8px 20px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 100,
          }}
        >
          <div className="flex space-x-3 items-center justify-center">
            <div className="flex flex-wrap gap-2 items-center">
              {/* Background Color */}
              <ToolTip text="Border" className="flex items-center">
                <ElementBorder
                  object={editableObject}
                  updateObjectProperty={updateObjectProperty}
                />
              </ToolTip>

              {/* TextBox */}
              {editableObject.type === "textbox" && (
                <TextboxTools
                  object={editableObject as FabricText}
                  updateProperty={updateObjectProperty}
                />
              )}

              {editableObject.type != "textbox" && (
                <ToolTip text="Background Color" className="bg-gray-200 p-1 rounded-full">
                  <ColorPicker {...backgroundColor} />
                </ToolTip>
              )}

              <ToolTip text="Delete" className="flex items-center">
                <Button onClick={deleteObject} size="icon" variant="outline">
                  <Trash2 className="size-4" />
                </Button>
              </ToolTip>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ============================ Textbox Tools ============================
const TextboxTools: React.FC<{
  object: FabricText;
  updateProperty: (property: keyof FabricText, value: any) => void;
}> = ({ object, updateProperty }) => {
  const textColor = useColorPicker(object.fill as string, (color) => {
    updateProperty("fill", color);
  });
  const backgroundColor = useColorPicker(object.backgroundColor as string, (color) => {
    updateProperty("backgroundColor", color);
  });

  const handleToggleFontStyle = (values: string[]) => {
    updateProperty("fontWeight", values.includes("bold") ? "bold" : "normal");
    updateProperty("fontStyle", values.includes("italic") ? "italic" : "normal");
    updateProperty("underline", values.includes("underline"));
  };

  useEffect(() => {
    console.log(object.fill);
    if (object.fill) textColor.setColor(object.fill as string);
    if (object.backgroundColor) backgroundColor.setColor(object.backgroundColor as string);
  }, [object.fill, object.backgroundColor]);

  return (
    <Fragment>
      {/* Background */}
      <ToolTip text="Background Color">
        <div className="flex p-1 rounded-md bg-muted border">
          <ColorPicker {...backgroundColor} />
        </div>
      </ToolTip>

      {/* Text Color */}
      <ToolTip text="Font Color">
        <ColorPicker {...textColor}>
          <Button
            size="icon"
            variant="outline"
            style={{
              color: textColor.color,
              fontSize: "1.25rem",
              fontWeight: "bold",
            }}
          >
            A
          </Button>
        </ColorPicker>
      </ToolTip>

      {/* Font Family */}
      <ToolTip text="Font Family" className="flex items-center">
        <Select
          value={object.fontFamily}
          onValueChange={(value) => updateProperty("fontFamily", value)}
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

      {/* Font size */}
      <ToolTip text="Font Size" className="flex items-center">
        <Input
          type="number"
          value={object.fontSize}
          onChange={(e) => updateProperty("fontSize", e.target.value)}
          className="w-20"
          min="10"
          max="100"
        />
      </ToolTip>

      {/* Text Style */}
      <ToggleGroup
        type="multiple"
        onValueChange={handleToggleFontStyle}
        defaultValue={[
          object.fontWeight === "bold" ? "bold" : "",
          object.fontStyle === "italic" ? "italic" : "",
          object.underline === true ? "underline" : "",
        ]}
        variant="outline"
      >
        <ToggleGroupItem value="bold">
          <Bold className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic">
          <Italic className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline">
          <Underline className="size-4" />
        </ToggleGroupItem>
      </ToggleGroup>

      {/* Align */}
      <ToolTip text="Text Alignment" className="flex items-center">
        <ToggleGroup
          type="single"
          value={object.textAlign}
          onValueChange={(value) => value && updateProperty("textAlign", value)}
          variant="outline"
        >
          <ToggleGroupItem value="left">
            <AlignLeft className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="center">
            <AlignCenter className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="right">
            <AlignRight className="size-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </ToolTip>
    </Fragment>
  );
};

// ============================ Element Border ============================
const ElementBorder = ({
  //   borderColor,
  object,
  updateObjectProperty,
}: {
  object: Object;
  updateObjectProperty: (property: keyof Object, value: any) => void;
}) => {
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

  const borderColor = useColorPicker((object.stroke as string) || "#fff", (color) => {
    updateObjectProperty("stroke", color);
  });

  const [borderWidth, setBorderWidth] = useState(object.strokeWidth);
  const [borderStyle, setBorderStyle] = useState<string>(
    object.strokeDashArray
      ? object.strokeDashArray[0] === 10
        ? "Dashed"
        : "Dotted"
      : object.strokeWidth === 0
        ? "None"
        : "Solid"
  );

  const handleBorderStyleChange = (style: string) => {
    setBorderStyle(style);

    if (style === "Dashed") {
      updateObjectProperty("strokeDashArray", [10, 5]);
    } else if (style === "Dotted") {
      updateObjectProperty("strokeDashArray", [2, 5]); // Dotted
    } else if (style === "None") {
      updateObjectProperty("stroke", null);
      updateObjectProperty("strokeWidth", 0);
      updateObjectProperty("strokeDashArray", null);
    } else {
      updateObjectProperty("strokeDashArray", null); // Solid
      updateObjectProperty("strokeWidth", borderWidth);
    }
  };

  const handleSlider = (value: number[]) => {
    const size = value[0];
    setBorderWidth(size);
    updateObjectProperty("strokeWidth", size);
  };

  useEffect(() => {
    if (object.stroke !== null) {
      borderColor.setColor(object.stroke as string);
    }
  }, [object.stroke]);

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
                key={variant.name}
                size="icon"
                variant={borderStyle && variant.name === borderStyle ? "active" : "outline"}
                onClick={() => handleBorderStyleChange(variant.name)}
              >
                {createElement(variant.Icon)}
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
            value={[borderWidth]}
            onValueChange={handleSlider}
          />
        </div>
        <ColorPicker {...borderColor} />
      </PopoverContent>
    </Popover>
  );
};
