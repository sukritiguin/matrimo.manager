import React from "react";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../ui/tooltip";

interface ToolTipProps {
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  showDelay?: number;
  text: string;
}

export const ToolTip: React.FC<ToolTipProps> = ({
  children,
  position = "top",
  showDelay,
  text,
}) => {
  return (
    <TooltipProvider delayDuration={showDelay}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={position}>{text}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
