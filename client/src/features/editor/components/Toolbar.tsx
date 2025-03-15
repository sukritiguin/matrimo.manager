import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { ColorPicker } from "@/components/color-picker";
import { ToolTip } from "@/components/common/tooltip";
import { useEditObject } from "../hooks/useEditObject";
import { Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const Toolbar = () => {
  const { backgroundColor, borderColor, editableObject, deleteObject } = useEditObject();

  return (
    <AnimatePresence>
      {editableObject && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "8px 20px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="flex space-x-3 items-center justify-center">
            <ToolTip text="Background" className="flex items-center">
              <ColorPicker
                {...backgroundColor}
                label="Background"
                className="border border-muted bg-muted rounded-md p-1"
              />
            </ToolTip>

            {/* ELEMENT BORDER */}
            <ToolTip text="Border" className="flex items-center">
              {/* <ColorPicker
                {...borderColor}
                className="border border-muted bg-muted rounded-md p-1"
              /> */}
              <ElementBorder borderColor={borderColor} />
            </ToolTip>
            <Separator orientation="vertical" />

            <Separator orientation="vertical" />
            <ToolTip text="Delete" className="flex items-center">
              <button onClick={deleteObject}>
                <Trash2 className="size-6 text-destructive" />
              </button>
            </ToolTip>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

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
