import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  text?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, className, text, ...props }) => {
  return (
    <button
      className={cn(
        "text-black p-2 bg-white border rounded-md border-muted/50 hover:bg-muted/10 hover:border-muted/80 hover:cursor-pointer",
        className
      )}
      {...props}
    >
      {text || children}
    </button>
  );
};
