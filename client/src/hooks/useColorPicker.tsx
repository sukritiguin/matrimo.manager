import { useState } from "react";

export const useColorPicker = (initialColor: string) => {
  const [color, setColor] = useState(initialColor);
  const [isOpen, setIsOpen] = useState(false);

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
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
