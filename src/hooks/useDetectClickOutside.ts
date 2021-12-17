import { RefObject, useEffect } from "react";

export const useDetectClickOutside = (
  action: () => void,
  dropdownRef?: RefObject<HTMLElement>
) => {
  useEffect(() => {
    const handleMouseDown = (event: Event) => {
      if (
        dropdownRef &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        action();
      }
    };

    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [dropdownRef, action]);
};
