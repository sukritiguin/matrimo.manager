import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";
import { TOrientation } from "../types";
import { Orientation } from "../constants";

interface OrientationControlsProps {
  orientation: TOrientation;
  onSetOrientation: (orientation: TOrientation) => void;
}

export const OrientationControls: React.FC<OrientationControlsProps> = ({
  orientation,
  onSetOrientation,
}) => {
  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="element-type">Orientation</Label>
      <Select
        defaultValue={Orientation[0]}
        onValueChange={(val) => onSetOrientation(val as TOrientation)}
        value={orientation}
      >
        <SelectTrigger id="element-type">
          <SelectValue placeholder="select orientation" />
        </SelectTrigger>
        <SelectContent>
          {Orientation.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
