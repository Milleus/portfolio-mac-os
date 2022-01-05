import { RefObject, useEffect } from "react";

export const useOutsideClick = (
  ref: RefObject<HTMLElement> | null,
  callback: () => void
): void => {
  useEffect(() => {
    const handler = (event: Event) => {
      if (ref && ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [ref, callback]);
};
