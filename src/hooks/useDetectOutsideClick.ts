import { RefObject, useEffect } from "react";

export const useDetectOutsideClick = (
  onOutsideClick: () => void,
  ref?: RefObject<HTMLElement>
) => {
  useEffect(() => {
    const handleMouseDown = (event: Event) => {
      if (ref && ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    };

    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [onOutsideClick, ref]);
};
