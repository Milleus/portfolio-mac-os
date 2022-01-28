// https://overreacted.io/making-setinterval-declarative-with-react-hooks/

import { useEffect, useRef } from "react";

export const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef<Function>(() => {});

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!delay) return;

    const id = setInterval(() => {
      savedCallback.current();
    }, delay);

    return () => {
      clearInterval(id);
    };
  }, [delay]);
};
