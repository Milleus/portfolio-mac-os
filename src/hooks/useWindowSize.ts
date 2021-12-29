import { useEffect, useState } from "react";

type UseWindowSizeState = {
  winWidth: number;
  winHeight: number;
};

export const useWindowSize = (): UseWindowSizeState => {
  const [state, setState] = useState<UseWindowSizeState>({
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
