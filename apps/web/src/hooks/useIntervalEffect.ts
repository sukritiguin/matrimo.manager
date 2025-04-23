import { useEffect, useRef } from "react";

export const useIntervalEffect = (
  callback: () => void,
  delay: number,
  deps: React.DependencyList = []
) => {
  const savedCallback = useRef(callback);

  // Update callback ref
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay == null || delay < 0) return;

    const tick = () => savedCallback.current();
    const id = setInterval(tick, delay);

    return () => clearInterval(id);
  }, [delay, ...deps]); // ✅ delay included in deps
};
