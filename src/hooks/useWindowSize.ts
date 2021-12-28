import { useEffect, useState } from "react";

type WindowSize = {
  winWidth: number;
  winHeight: number;
};

export const useWindowSize = () => {
  const [state, setState] = useState<WindowSize>({
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
