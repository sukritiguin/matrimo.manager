import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import React from "react";
import { HexColorPicker } from "react-colorful";
import { Label } from "./ui/label";

export const ColorPicker: React.FC<{
  defaultColor?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  color: string;
  setColor: (color: string) => void;
  className?: string;
  title?: string;
  label?: string;
  child?: React.ReactNode;
  asChild?: boolean;
}> = ({
  defaultColor,
  isOpen,
  setIsOpen,
  color,
  setColor,
  title,
  label,
  className,
  child,
  asChild,
}) => {
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild className="">
        {asChild ? (
          <React.Fragment>{child}</React.Fragment>
        ) : (
          <div className={cn(className, "flex items-center")}>
            {title && <span className="mr-2">{title}</span>}
            <button
              style={{ background: color }}
              className="size-6 rounded-full border-muted"
            ></button>
          </div>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-60 px-4 space-y-3">
        <Label className="text-sm">{label}</Label>
        <HexColorPicker defaultValue={defaultColor || color} color={color} onChange={setColor} />
        <Input className="mt-2" value={color} onChange={(e) => setColor(e.target.value)} />
      </PopoverContent>
    </Popover>
  );
};
