import { RefObject, useEffect } from "react";

export const useOutsideClick = (
  callback: () => void,
  ref?: RefObject<HTMLElement>
) => {
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
  }, [callback, ref]);
};
