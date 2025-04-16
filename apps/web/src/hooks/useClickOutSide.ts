import { useEffect, useRef } from "react";

export const useClickOutside = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("pointerdown", handleClick);
    return () => {
      document.removeEventListener("pointerdown", handleClick);
    };
  }, [callback]);

  return ref;
};
