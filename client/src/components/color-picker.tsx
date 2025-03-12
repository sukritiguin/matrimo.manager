import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import React from "react";
import { HexColorPicker } from "react-colorful";

export const ColorPicker: React.FC<{
  defaultColor?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  color: string;
  setColor: (color: string) => void;
  className?: string;
  title?: string;
}> = ({
  defaultColor,
  isOpen,
  setIsOpen,
  color,
  setColor,
  title,
  className,
}) => {
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild className="">
        <div className={cn(className)}>
          {title && <span className="mr-2">{title}</span>}
          <button
            style={{ background: color }}
            className="size-8 rounded-full ring"
          ></button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-60 px-4">
        <HexColorPicker
          defaultValue={defaultColor || color}
          color={color}
          onChange={setColor}
        />
        <Input
          className="mt-2"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </PopoverContent>
    </Popover>
  );
};
