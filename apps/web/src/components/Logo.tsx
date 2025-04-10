import * as React from "react";

interface _props extends React.ImgHTMLAttributes<HTMLImageElement> {
  appName?: string;
}

export const Logo: React.FC<_props> = ({
  src = "/logo2.png",
  alt = "",
  appName,
  ...rest
}) => {
  return <img src={src} alt={appName || alt} className="w-16 h-auto bg-blend-screen" {...rest} />;
};
