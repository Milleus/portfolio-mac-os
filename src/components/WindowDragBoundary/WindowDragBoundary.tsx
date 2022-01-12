import { FC, MouseEvent, ReactNode } from "react";

import { MENU_BAR_HEIGHT_REM } from "components/MenuBar";
import { updateActiveTitle } from "reducers/applicationSlice";
import { useAppDispatch } from "hooks";

export type WindowDragBoundaryProps = {
  children: ReactNode;
};

const WindowDragBoundary: FC<WindowDragBoundaryProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const dragBoundaryClass = "drag-boundary";

  const handleBoundaryClick = (event: MouseEvent<HTMLDivElement>) => {
    const element = event.target as HTMLDivElement;

    if (element.classList.contains(dragBoundaryClass)) {
      dispatch(updateActiveTitle(null));
    }
  };

  return (
    <div
      /**
       * increase boundary area to prevent collision when dragging.
       *  _____ _____ _____
       * |_____|__X__|_____|
       * |_____|_____|_____|
       */
      className={`absolute -left-full w-[300%] h-[200%] ${dragBoundaryClass}`}
      style={{ marginTop: `${MENU_BAR_HEIGHT_REM}rem` }}
      onClick={handleBoundaryClick}
    >
      {children}
    </div>
  );
};

export default WindowDragBoundary;
