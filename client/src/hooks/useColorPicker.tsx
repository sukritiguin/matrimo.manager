import { useState } from "react";

export const useColorPicker = (
  initialColor: string,
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
