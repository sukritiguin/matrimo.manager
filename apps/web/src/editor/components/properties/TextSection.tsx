import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { fontFamilies } from "@/editor/fabric/config";
import { useObjectProperties } from "@/editor/store/usePropertiesStore";
import { IText } from "fabric";
import { Bold, Italic, Underline } from "lucide-react";

export const TextSection = () => {
  const { selectedObject, updateObjectProperty } = useObjectProperties();
  if (!selectedObject) return null;

  const {
    text,
    fontSize,
    fontFamily,
    fontWeight,
    fontStyle,
    underline,
    charSpacing,
    fill,
    textBackgroundColor,
  } = selectedObject as IText;

  return (
    <div>
      <div className="space-y-2">
        <Label className={"text-xs"} htmlFor="text-content">
          Text Content
        </Label>
        <Textarea
          id="text-content"
          value={text}
          onChange={(e) => updateObjectProperty("text", e.target.value)}
          className={"h-20 resize-none"}
        />
      </div>
      <div className="space-y-2">
        <Label className={"text-xs"} htmlFor="font-size">
          Font Size
        </Label>
        <Input
          id="font-size"
          value={fontSize}
          onChange={(e) => updateObjectProperty("fontSize", e.target.value)}
          className={"w-16 h-7 text-xs"}
          type={"number"}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="font-family" className="text-sm">
          Font family
        </Label>
        <Select
          value={fontFamily}
          onValueChange={(value) => updateObjectProperty("fontFamily", value)}
        >
          <SelectTrigger id="font-family" className="w-full">
            <SelectValue placeholder="Select Font" />
          </SelectTrigger>
          <SelectContent>
            {fontFamilies.map((fontItem) => (
              <SelectItem key={fontItem} value={fontItem} style={{ fontFamily: fontItem }}>
                {fontItem}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label className="text-sm">Style</Label>
        <div className="flex gap-2">
          <Button
            variant={fontWeight === "bold" ? "default" : "outline"}
            size="icon"
            onClick={() =>
              updateObjectProperty("fontWeight", fontWeight === "bold" ? "normal" : "bold")
            }
            className={"w-8 h-8"}
          >
            <Bold className="w-4 h-4" />
          </Button>
          <Button
            variant={fontStyle === "italic" ? "default" : "outline"}
            size="icon"
            onClick={() =>
              updateObjectProperty("fontStyle", fontStyle === "italic" ? "normal" : "italic")
            }
            className={"w-8 h-8"}
          >
            <Italic className="w-4 h-4" />
          </Button>
          <Button
            variant={underline ? "default" : "outline"}
            size="icon"
            onClick={() => updateObjectProperty("underline", !underline)}
            className={"w-8 h-8"}
          >
            <Underline className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="space-y-2">
          <Label htmlFor="text-color" className="text-sm">
            Text Color
          </Label>
          <div className="relative w-8 h-8 overflow-hidden rounded-md border">
            <div className="absolute inset-0" style={{ backgroundColor: fill?.toString() }} />
            <Input
              id="text-color"
              type="color"
              value={fill?.toString()}
              onChange={(e) => updateObjectProperty("fill", e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="text-bg-color" className="text-sm">
            Text BG Color
          </Label>
          <div className="relative w-8 h-8 overflow-hidden rounded-md border">
            <div className="absolute inset-0" style={{ backgroundColor: textBackgroundColor }} />
            <Input
              id="text-bg-color"
              type="color"
              value={textBackgroundColor}
              onChange={(e) => updateObjectProperty("textBackgroundColor", e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label className={"text-xs"} htmlFor="letter-spacing">
            Letter Spacing
          </Label>
          <span className="text-xs">{charSpacing}</span>
        </div>
        <Slider
          id="letter-spacing"
          min={-200}
          max={800}
          step={10}
          value={[charSpacing]}
          onValueChange={(value) => updateObjectProperty("charSpacing", value[0])}
        />
      </div>
    </div>
  );
};
