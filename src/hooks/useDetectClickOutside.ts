import { RefObject, useEffect } from "react";

export const useDetectClickOutside = (
  dropdownRef: RefObject<HTMLElement>,
  action: () => void
) => {
  useEffect(() => {
    const handleMouseDown = (event: Event) => {
      if (
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
