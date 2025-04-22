import { Label } from "@/components/ui/label";
import { ColorPicker } from "../common/ColorPicker";
import { Slider } from "@/components/ui/slider";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useObjectProperties } from "@/editor/store/usePropertiesStore";

export const StyleSection = () => {
  const { selectedObject: object, updateObjectProperty: onChangeProperty } = useObjectProperties();
  return (
    <div className="space-y-4 relative">
      {/* Background */}
      <BackgroundColorPicker
        backgroundColor={object?.fill as any}
        onChangeProperty={onChangeProperty}
      />

      <BorderColorPicker color={object?.stroke as any} onChangeProperty={onChangeProperty} />

      <BorderWidthPicker width={object?.strokeWidth} onChangeProperty={onChangeProperty} />
    </div>
  );
};

const BackgroundColorPicker = ({
  backgroundColor,
  onChangeProperty,
}: {
  backgroundColor: string;
  onChangeProperty: (key: string, value: any) => void;
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-1 rounded-md">
      <div className="relative">
        <div className="inline-flex w-full items-center justify-between">
          <Label htmlFor="background">Background</Label>
          <button
            type="button"
            className="flex size-8 rounded-md border cursor-pointer"
            style={{ backgroundColor }}
            onClick={() => setShow((prev) => !prev)}
          />
        </div>

        <AnimatePresence>
          {show && (
            <motion.div
              key="color-picker"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-2 -z-50"
            >
              <ColorPicker
                key="background"
                value={backgroundColor}
                onChange={(color) => onChangeProperty("fill", color)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
const BorderColorPicker = ({
  color,
  onChangeProperty,
}: {
  color: string;
  onChangeProperty: (key: string, value: any) => void;
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-1 rounded-md">
      <div className="relative">
        <div className="inline-flex w-full items-center justify-between">
          <Label htmlFor="border-color">Border</Label>
          <button
            type="button"
            className="flex size-8 rounded-md border cursor-pointer"
            style={{ backgroundColor: color }}
            onClick={() => setShow((prev) => !prev)}
          />
        </div>

        <AnimatePresence>
          {show && (
            <motion.div
              key="color-picker"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-2 -z-50"
            >
              <ColorPicker
                key="border-color"
                value={color}
                onChange={(color) => onChangeProperty("stroke", color)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const BorderWidthPicker = ({
  width,
  onChangeProperty,
}: {
  width?: number;
  onChangeProperty: (key: string, value: any) => void;
}) => {
  return (
    <div className="space-y-1 rounded-md">
      <div className="inline-flex w-full items-center justify-between">
        <Label htmlFor="border-width">Border Width</Label>
        <Slider
          id="border-width"
          className="w-1/2"
          min={0}
          max={20}
          value={[width || 0]}
          onValueChange={(e) => onChangeProperty("strokeWidth", e[0])}
        />
      </div>
    </div>
  );
};
