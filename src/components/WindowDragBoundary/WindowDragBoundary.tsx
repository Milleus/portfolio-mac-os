import { FC, ReactNode } from "react";

import { MENU_BAR_HEIGHT_REM } from "components/MenuBar";

export type WindowDragBoundaryProps = {
  children: ReactNode;
};

const WindowDragBoundary: FC<WindowDragBoundaryProps> = ({ children }) => {
  return (
    <div
      /**
       * increase boundary area to prevent collision when dragging.
       *  _____ _____ _____
       * |_____|__X__|_____|
       * |_____|_____|_____|
       */
      className="absolute -left-full w-[300%] h-[200%]"
      style={{ marginTop: `${MENU_BAR_HEIGHT_REM}rem` }}
    >
      {children};
    </div>
  );
};

export default WindowDragBoundary;
