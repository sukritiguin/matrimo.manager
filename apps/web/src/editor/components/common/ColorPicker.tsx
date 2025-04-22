import { colorPresets } from "@/editor/constants";

export const ColorPicker = ({
  key,
  value,
  onChange,
}: {
  key: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div
      key={key}
      className="flex flex-wrap items-center justify-between gap-2 bg-accent rounded-md p-1 border"
    >
      {colorPresets.map((color) => (
        <button
          key={color}
          className={`size-8 rounded-md border-2 cursor-pointer ${
            color === value ? "border-black" : "border-transparent"
          }`}
          style={{ backgroundColor: color }}
          onClick={() => onChange(color)}
        ></button>
      ))}
    </div>
  );
};
