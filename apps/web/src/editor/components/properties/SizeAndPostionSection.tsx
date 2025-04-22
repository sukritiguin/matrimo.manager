import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, MoveDown, MoveUp, Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useObjectProperties } from "@/editor/store/usePropertiesStore";

export const SizeAndPositionSection = () => {
  const { selectedObject, updateObjectProperty } = useObjectProperties();

  if (!selectedObject) return null;

  return (
    <React.Fragment>
      <HeightWidthProperties width={selectedObject?.width} height={selectedObject?.height} />
      <TopLeftProperties top={selectedObject?.top} left={selectedObject?.left} />
      <Separator className="my-2" />

      <OpacityProperties opacity={selectedObject?.opacity} onChange={updateObjectProperty} />
      <RotationProperties rotation={selectedObject?.angle} onChange={updateObjectProperty} />

      {/* Flip */}
      <FlipProperties
        flipX={selectedObject?.flipX}
        flipY={selectedObject?.flipY}
        onChange={updateObjectProperty}
      />

      {/* Layer Position */}
      <LayerPositionProperties />
      <Separator className="my-2" />

      <DuplicateAndDeleteProperties />
    </React.Fragment>
  );
};
const HeightWidthProperties = ({ width, height }: { width: number; height: number }) => (
  <div className="grid grid-cols-2 gap-3">
    <div className="space-y-1">
      <Label>Width</Label>
      <Input type="number" value={width.toFixed(2)} readOnly />
    </div>
    <div className="space-y-1">
      <Label>height</Label>
      <Input type="number" value={height.toFixed(2)} readOnly />
    </div>
  </div>
);

const TopLeftProperties = ({ top, left }: { top: number; left: number }) => (
  <div className="grid grid-cols-2 gap-3">
    <div className="space-y-1">
      <Label>Top</Label>
      <Input type="number" value={top.toFixed(2)} readOnly />
    </div>
    <div className="space-y-1">
      <Label>Left</Label>
      <Input type="number" value={left.toFixed(2)} readOnly />
    </div>
  </div>
);

const OpacityProperties = ({
  opacity,
  onChange,
}: {
  opacity: number;
  onChange: (key: string, value: number) => void;
}) => (
  <div className="space-y-1">
    <Label htmlFor="opacity">Opacity</Label>
    <Slider
      value={[opacity * 100]}
      min={0}
      max={100}
      onValueChange={(value) => onChange("opacity", value[0] / 100)}
      className="my-3"
    />
  </div>
);

const RotationProperties = ({
  rotation,
  onChange,
}: {
  rotation: number;
  onChange: (key: string, value: number) => void;
}) => (
  <div className="space-y-1">
    <Label htmlFor="rotation">Rotation</Label>
    <Slider
      value={[rotation]}
      min={0}
      max={360}
      onValueChange={(value) => onChange("angle", value[0])}
      className="my-3"
    />
  </div>
);

const FlipProperties = ({
  flipX,
  flipY,
  onChange,
}: {
  flipX: boolean;
  flipY: boolean;
  onChange: (key: string, value: boolean) => void;
}) => (
  <div className="space-y-1">
    <Label>Flip</Label>
    <div className="flex gap-2 py-1">
      <Button variant="outline" onClick={() => onChange("flipX", !flipX)}>
        Flip X
      </Button>
      <Button variant="outline" onClick={() => onChange("flipY", !flipY)}>
        Flip Y
      </Button>
    </div>
  </div>
);

const LayerPositionProperties = () => {
  const { moveLayer } = useObjectProperties();

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Layer Position</h3>
      <div className="grid grid-cols-2 gap-2">
        <Button onClick={moveLayer.bringToFront} variant="outline">
          <MoveUp className="h-4 w-4" />
          <span>Bring to front</span>
        </Button>
        <Button onClick={moveLayer.sendToBack} variant="outline">
          <MoveDown className="h-4 w-4" />
          <span>Send to back</span>
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button onClick={moveLayer.bringForward} variant="outline">
          <MoveUp className="h-4 w-4" />
          <span>Bring forward</span>
        </Button>
        <Button onClick={moveLayer.sendBackward} variant="outline">
          <MoveDown className="h-4 w-4" />
          <span>Send backward</span>
        </Button>
      </div>
    </div>
  );
};

const DuplicateAndDeleteProperties = () => {
  const { onCopyObject, onDeleteObject } = useObjectProperties();

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Duplicate and Delete</h3>
      <div className="grid grid-cols-2 gap-2">
        <Button onClick={onCopyObject}>
          <Copy className="h-4 w-4" />
          <span>Duplicate</span>
        </Button>
        <Button onClick={onDeleteObject} variant={"destructive"}>
          <Trash className="h-4 w-4" />
          <span>Delete</span>
        </Button>
      </div>
    </div>
  );
};
