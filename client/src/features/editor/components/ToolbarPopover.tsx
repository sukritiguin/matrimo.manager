import { ColorPicker } from "@/components/color-picker";
import { ToolTip } from "@/components/common/tooltip";
import * as fabric from "fabric";
import { FaAlignCenter, FaAlignLeft, FaAlignRight } from "react-icons/fa";

export const ToolbarPopover = ({
  editableObject,
  updateTextbox,
  canvas,
  textColor,
  backgroundColor,
}: {
  editableObject: any;
  updateTextbox: any;
  canvas: any;
  textColor: any;
  backgroundColor: any;
}) => {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {/* Font Family Selector */}
      <select
        value={editableObject.fontFamily || "Arial"}
        onChange={(e) => updateTextbox({ fontFamily: e.target.value })}
        className="border p-1 rounded"
      >
        <option value="Arial">Arial</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Courier New">Courier New</option>
        <option value="Verdana">Verdana</option>
      </select>

      {/* Bold Button */}
      <button
        onClick={() => {
          if (editableObject && editableObject instanceof fabric.Textbox) {
            const newFontWeight =
              editableObject.fontWeight === "bold" ? "normal" : "bold";
            editableObject.set("fontWeight", newFontWeight); // Update Fabric.js object
            canvas?.renderAll(); // Render changes in Fabric.js

            // Force React state update to reflect the change
            // setEditableObject(
            //   new fabric.Textbox(editableObject.text, {
            //     ...editableObject,
            //   })
            // );
          }
        }}
        className={`p-1 rounded ${editableObject?.fontWeight === "bold" ? "bg-gray-300 font-bold" : ""}`}
      >
        B
      </button>

      {/* Italic Button */}
      <button
        onClick={() => {
          if (editableObject && editableObject instanceof fabric.Textbox) {
            const newFontStyle =
              editableObject.fontStyle === "italic" ? "normal" : "italic";
            editableObject.set("fontStyle", newFontStyle); // Update fontStyle property
            canvas?.renderAll(); // Render changes in Fabric.js

            // Force React state update to reflect the change
            // setEditableObject(
            //   new fabric.Textbox(editableObject.text, {
            //     ...editableObject,
            //   })
            // );
          }
        }}
        className={`p-1 rounded ${editableObject?.fontStyle === "italic" ? "bg-gray-300" : ""}`}
      >
        <i>I</i>
      </button>

      {/* Underline Button */}
      <button
        onClick={() => {
          if (editableObject && editableObject instanceof fabric.Textbox) {
            const newUnderline = !editableObject.underline;
            editableObject.set("underline", newUnderline); // Update underline property
            canvas?.renderAll(); // Render changes in Fabric.js

            // Force React state update to reflect the change
            // setEditableObject(
            //   new fabric.Textbox(editableObject.text, {
            //     ...editableObject,
            //   })
            // );
          }
        }}
        className={`p-1 rounded ${editableObject?.underline ? "bg-gray-300" : ""}`}
      >
        <u>U</u>
      </button>

      {/* Font Size */}
      <input
        type="number"
        value={editableObject.fontSize || 16} // Default value is 16 if fontSize is undefined
        onChange={(e) => {
          const newFontSize = parseInt(e.target.value, 10);

          // Update only if the value is a valid number and within the range
          if (!isNaN(newFontSize) && newFontSize >= 10 && newFontSize <= 100) {
            // Update font size directly in fabric Textbox object
            editableObject.set("fontSize", newFontSize);

            // Trigger continuous re-render of the canvas
            canvas?.renderAll();
          }
        }}
        className="border p-1 w-16 rounded"
        min="10"
        max="100"
      />

      {/* Text Alignment */}
      <div className="flex border border-gray-400 rounded overflow-hidden">
        <button
          onClick={() => updateTextbox({ textAlign: "left" })}
          className={`px-3 py-1 border-r border-gray-400 ${editableObject?.textAlign === "left" ? "bg-gray-300 font-bold" : "bg-white hover:bg-gray-200"}`}
        >
          <FaAlignLeft size={16} />
        </button>
        <button
          onClick={() => updateTextbox({ textAlign: "center" })}
          className={`px-3 py-1 border-r border-gray-400 ${editableObject?.textAlign === "center" ? "bg-gray-300 font-bold" : "bg-white hover:bg-gray-200"}`}
        >
          <FaAlignCenter size={16} />
        </button>
        <button
          onClick={() => updateTextbox({ textAlign: "right" })}
          className={`px-3 py-1 ${editableObject?.textAlign === "right" ? "bg-gray-300 font-bold" : "bg-white hover:bg-gray-200"}`}
        >
          <FaAlignRight size={16} />
        </button>
      </div>

      {/* Text Color */}
      <ToolTip text="Text Color">
        <ColorPicker {...textColor} />
      </ToolTip>

      {/* Background Color */}
      <ToolTip text="Background Color">
        <ColorPicker {...backgroundColor} />
      </ToolTip>
    </div>
  );
};
