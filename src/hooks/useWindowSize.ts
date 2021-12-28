import { useEffect, useState } from "react";

type WindowSizeState = {
  winWidth: number;
  winHeight: number;
};

export const useWindowSize = () => {
  const [state, setState] = useState<WindowSizeState>({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });

  useEffect(() => {
    const handler = () => {
      setState({
        winWidth: window.innerWidth,
        winHeight: window.innerHeight,
      });
    };

    window.addEventListener("resize", handler);

    return () => {
      window.removeEventListener("resize", handler);
    };
  });

  return state;
};
