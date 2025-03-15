import React from "react";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { cn } from "@/lib/utils";

interface ToolTipProps {
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  showDelay?: number;
  text: string;
  className?: string;
}

export const ToolTip: React.FC<ToolTipProps> = ({
  children,
  position = "top",
  showDelay,
  text,
  className,
}) => {
  return (
    <TooltipProvider delayDuration={showDelay}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn("inline-block", className)}>{children}</div>
        </TooltipTrigger>
        <TooltipContent side={position}>{text}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
