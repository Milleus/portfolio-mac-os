import { BsX } from "react-icons/bs";
import { CgArrowsExpandLeft, CgMathMinus } from "react-icons/cg";
import { FC, ReactNode, useEffect, useState } from "react";
import { Rnd, RndResizeCallback, RndDragCallback } from "react-rnd";

import { convertRemToPixels } from "utilities";
import { HEIGHT_DOCK_REM } from "components/Dock";
import { HEIGHT_MENU_BAR_REM } from "components/MenuBar";
import { useAppDispatch, useAppSelector, useWindowSize } from "hooks";
import {
  ApplicationKeys,
  closeApplication,
  maximizeApplication,
  normalizeApplication,
} from "reducers/applicationSlice";
import classNames from "classnames";

type PositionSize = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const dragHandleClass = "drag-handle";

export type WindowProps = {
  appKey: ApplicationKeys;
  children: ReactNode;
  title?: string;
  defaultWidth?: number;
  defaultHeight?: number;
};

const Window: FC<WindowProps> = ({
  appKey,
  children,
  title,
  defaultWidth,
  defaultHeight,
}) => {
  const applicationState = useAppSelector((state) => state.application);
  const dispatch = useAppDispatch();
  const { winWidth, winHeight } = useWindowSize();
  const initWidth = Math.min(winWidth, defaultWidth ? defaultWidth : 640);
  const initHeight = Math.min(winHeight, defaultHeight ? defaultHeight : 400);
  const heightMenuBarPx = convertRemToPixels(HEIGHT_MENU_BAR_REM);
  const heightDockPx = convertRemToPixels(HEIGHT_DOCK_REM);
  const isMaximized = applicationState[appKey].windowStatus === "maximized";

  const [positionSize, setPositionSize] = useState<PositionSize>({
    width: initWidth,
    height: initHeight,
    x: Math.random() * (winWidth - initWidth) + winWidth, // plus winWidth because of window boundary
    y:
      Math.random() * (winHeight - initHeight - heightMenuBarPx - heightDockPx),
  });

  useEffect(() => {
    setPositionSize({
      ...positionSize,
      width: Math.min(winWidth, positionSize.width),
      height: Math.min(winWidth, positionSize.height),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winWidth, winHeight]);

  const handleDragStop: RndDragCallback = (_e, d) => {
    setPositionSize({ ...positionSize, x: d.x, y: d.y });
  };

  const handleResizeStop: RndResizeCallback = (
    _e,
    _direction,
    ref,
    _delta,
    position
  ) => {
    setPositionSize({
      ...position,
      width: ref.offsetWidth,
      height: ref.offsetHeight,
    });
  };

  const handleBarDoubleClick = () => {
    dispatch(maximizeApplication(appKey));
  };

  const handleCloseClick = () => {
    dispatch(closeApplication(appKey));
  };

  const handleMinimizeClick = () => {
    // do nothing for now
  };

  const handleMaximizeClick = () => {
    isMaximized
      ? dispatch(normalizeApplication(appKey))
      : dispatch(maximizeApplication(appKey));
  };

  const width = isMaximized ? winWidth : positionSize.width;
  const height = isMaximized ? winHeight : positionSize.height;
  const x = isMaximized ? winWidth : Math.max(0, positionSize.x); // winWidth because of window boundary
  const y = isMaximized ? -heightMenuBarPx : Math.max(0, positionSize.y); // -heightMenuBarPx because of window boundary

  const windowClassNames = classNames({
    "absolute w-full h-full rounded overflow-hidden shadow-md": true,
    "z-30": !isMaximized,
    "z-50": isMaximized,
  });

  return (
    <Rnd
      bounds="parent"
      size={{ width, height }}
      position={{ x, y }}
      className={windowClassNames}
      dragHandleClassName={dragHandleClass}
      disableDragging={isMaximized}
      enableResizing={!isMaximized}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
    >
      <div
        className={`${dragHandleClass} relative h-6 bg-neutral-700 text-center`}
        onDoubleClick={handleBarDoubleClick}
      >
        <div className="absolute h-6 flex items-center mx-2 space-x-2 group">
          <button
            className="w-3 h-3 flex justify-center items-center rounded-full bg-red-500"
            onClick={handleCloseClick}
          >
            <BsX className="invisible group-hover:visible" />
          </button>

          <button
            className="w-3 h-3 flex justify-center items-center rounded-full bg-amber-500"
            onClick={handleMinimizeClick}
          >
            <CgMathMinus className="invisible group-hover:visible" />
          </button>

          <button
            className="w-3 h-3 flex justify-center items-center rounded-full bg-green-500"
            onClick={handleMaximizeClick}
          >
            <CgArrowsExpandLeft className="invisible group-hover:visible p-0.5" />
          </button>
        </div>
        {title && (
          <span className="font-semibold text-white text-sm">{title}</span>
        )}
      </div>

      <div className="window-inner">{children}</div>
    </Rnd>
  );
};

export default Window;
