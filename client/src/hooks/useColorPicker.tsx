import { DEFAULT_BACKGROUND_COLOR } from "@/features/editor/constants";
import { useState } from "react";

export const useColorPicker = (
  initialColor: string = DEFAULT_BACKGROUND_COLOR,
  onChange?: (currentColor: string) => void
) => {
  const [color, setColor] = useState(initialColor);
  const [isOpen, setIsOpen] = useState(false);

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    if (onChange) {
      onChange(newColor);
    }
  };

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return {
    color,
    setColor: handleColorChange,
    isOpen,
    toggleOpen,
    setIsOpen,
  };
};
