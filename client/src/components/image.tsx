import { Maximize, Maximize2, RectangleEllipsis } from "lucide-react";
import React from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
  src?: string;
  fallback?: string;
}

export const Image: React.FC<ImageProps> = ({ src, alt, className, fallback, ...rest }) => {
  if (src) {
    return <img className={`object-cover ${className}`} src={src} alt={alt} {...rest} />;
  }

  if (fallback) {
    return <img className={`object-cover ${className}`} src={fallback} alt={alt} {...rest} />;
  }

  return (
    <div className={`bg-muted ${className} flex items-center justify-center`}>
      <Maximize className="size-10 text-muted-foreground/50" />
    </div>
  );
};
