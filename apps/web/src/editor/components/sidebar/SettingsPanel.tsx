import { useEditorStore } from "@/editor/store/useEditorStore";
import { ColorPalette } from "../common/ColorPalette";
import { PanelWrapper } from "./PanelWrapper";
import { useState } from "react";

const SettingsPanel = () => {
  const { canvas } = useEditorStore();
  const [backgroundColor, setBackgroundColor] = useState(canvas?.backgroundColor.toString());
  if (!canvas) return null;

  const handleBackgroundColorChange = (color: string) => {
    canvas.set("backgroundColor", color);
    setBackgroundColor(color);
    canvas.renderAll();
  };

  return (
    <PanelWrapper className="w-full flex flex-col gap-2">
      <ColorPalette
        label="Background Color"
        color={backgroundColor}
        onChange={handleBackgroundColorChange}
      />
    </PanelWrapper>
  );
};

export default SettingsPanel;
