import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { colorPresets } from "@/editor/constants";
import React from "react";

export const ColorPalette: React.FC<{
  label?: string;
  color?: string;
  onChange: (color: string) => void;
  isDisabled?: boolean;
}> = ({ label = "Color Palette", color, onChange, isDisabled = false }) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Label>{label}</Label>
        <div className="w-6 h-6 rounded-full border shadow-sm" style={{ backgroundColor: color }} />
      </div>
      <div className="grid grid-cols-5 gap-2">
        {colorPresets.map((clr) => (
          <div key={clr}>
            <button
              className={`w-10 h-10 rounded-full border transition-transform
                    hover:scale-110 ${clr === color ? "ring-1 ring-offset-2 ring-primary" : ""}
                    `}
              onClick={() => onChange(clr)}
              style={{ backgroundColor: clr }}
            />
          </div>
        ))}
      </div>
      <div className="flex mt-5 space-x-2">
        <div className="relative">
          <Input
            type="color"
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className={"w-12 h-10 p-1 cursor-pointer"}
            disabled={isDisabled}
          />
        </div>
        <Input
          type="text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className={"flex-1"}
          disabled={isDisabled}
        />
      </div>
    </div>
  );
};
