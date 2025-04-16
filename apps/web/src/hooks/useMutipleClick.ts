import { useRef, useCallback } from "react";

export function useMultipleClick<T>(
  onClick: (payload: T) => void,
  onDoubleClick: (payload: T) => void,
  delay = 250
) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handler = useCallback(
    (payload: T) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
        onDoubleClick(payload);
      } else {
        timeoutRef.current = setTimeout(() => {
          onClick(payload);
          timeoutRef.current = null;
        }, delay);
      }
    },
    [onClick, onDoubleClick, delay]
  );

  return handler;
}
