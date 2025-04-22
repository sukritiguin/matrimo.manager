import { Control, controlsUtils } from "fabric";

export const DISABLED_CONTROLS = ["mb", "ml", "mr"];

const ACTIVE_CONTROLS_POSITION = {
  tl: { x: -0.5, y: -0.5, cursor: "nwse-resize" },
  tr: { x: 0.5, y: -0.5, cursor: "nesw-resize" },
  bl: { x: -0.5, y: 0.5, cursor: "nesw-resize" },
  br: { x: 0.5, y: 0.5, cursor: "nwse-resize" },
  mt: { x: 0, y: -0.5, cursor: "ns-resize" },
} as const;

type ControlKey = keyof typeof ACTIVE_CONTROLS_POSITION;

export const renderCircleControl = (
  ctx: CanvasRenderingContext2D,
  left: number,
  top: number,
  styleOverride: any,
  fabricObject: any
) => {
  const radius = 5;
  ctx.beginPath();
  ctx.arc(left, top, radius, 0, Math.PI * 2, false);
  ctx.fillStyle = "#8309d6";
  ctx.strokeStyle = "#8309d6";
  ctx.lineWidth = 1;
  ctx.fill();
  ctx.stroke();
};

export const applyCustomResizeControls = (fabricObject: any) => {
  // Apply custom resize controls
  (Object.keys(ACTIVE_CONTROLS_POSITION) as ControlKey[]).forEach((key) => {
    const { x, y, cursor } = ACTIVE_CONTROLS_POSITION[key];

    fabricObject.controls[key] = new Control({
      x,
      y,
      cursorStyle: cursor,
      actionName: "resize",
      actionHandler: (eventData, transform, pointerX, pointerY) => {
        const target = transform.target;
        const { left, top, width, height, scaleX, scaleY } = target;

        let newLeft = left;
        let newTop = top;
        let newWidth = width * scaleX;
        let newHeight = height * scaleY;

        switch (key) {
          case "tl":
            newWidth = left + newWidth - pointerX;
            newHeight = top + newHeight - pointerY;
            newLeft = pointerX;
            newTop = pointerY;
            break;
          case "tr":
            newWidth = pointerX - left;
            newHeight = top + newHeight - pointerY;
            newTop = pointerY;
            break;
          case "bl":
            newWidth = left + newWidth - pointerX;
            newHeight = pointerY - top;
            newLeft = pointerX;
            break;
          case "br":
            newWidth = pointerX - left;
            newHeight = pointerY - top;
            break;
          case "mt":
            newHeight = top + newHeight - pointerY;
            newTop = pointerY;
            break;
        }

        // target.set({
        //   left: newLeft,
        //   top: newTop,
        //   width: newWidth / scaleX,
        //   height: newHeight / scaleY,
        // });

        // target.setCoords();
        return true;
      },
      render: controlsUtils.renderCircleControl,
    });
  });

  DISABLED_CONTROLS.forEach((key) => delete fabricObject.controls[key]);
};
