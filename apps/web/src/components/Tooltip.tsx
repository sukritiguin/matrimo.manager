import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface TooltipProps extends React.ComponentProps<typeof TooltipContent> {
  children: React.ReactNode;
  text: string;
  delay?: number;
}

const CustomTooltip = ({ children, text, delay = 700, ...props }: TooltipProps) => {
  return (
    <TooltipProvider delayDuration={delay}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent {...props}>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export { CustomTooltip as Tooltip };