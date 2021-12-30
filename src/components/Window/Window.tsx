import { FC, ReactNode, useEffect, useState } from "react";
import { Rnd, RndResizeCallback, RndDragCallback } from "react-rnd";
import classNames from "classnames";

import { convertRemToPixels } from "utilities";
import { HEIGHT_DOCK_REM } from "components/Dock";
import { HEIGHT_MENU_BAR_REM } from "components/MenuBar";
import { useWindowSize } from "hooks";

type PositionSize = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const dragHandleClass = "drag-handle";

export type WindowProps = {
  isMaximized: boolean;
  children: ReactNode;
  defaultWidth?: number;
  defaultHeight?: number;
  minWidth?: number;
  minHeight?: number;
};

const Window: FC<WindowProps> = ({
  isMaximized,
  children,
  defaultWidth,
  defaultHeight,
  minWidth,
  minHeight,
}) => {
  const { winWidth, winHeight } = useWindowSize();
  const initWidth = Math.min(winWidth, defaultWidth ? defaultWidth : 640);
  const initHeight = Math.min(winHeight, defaultHeight ? defaultHeight : 400);
  const heightMenuBarPx = convertRemToPixels(HEIGHT_MENU_BAR_REM);
  const heightDockPx = convertRemToPixels(HEIGHT_DOCK_REM);

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

  const windowClasses = {
    "absolute w-full h-full rounded-lg overflow-hidden shadow-md": true,
    "z-30": !isMaximized,
    "z-50": isMaximized,
  };

  return (
    <Rnd
      bounds="parent"
      size={{
        width: isMaximized ? winWidth : positionSize.width,
        height: isMaximized ? winHeight : positionSize.height,
      }}
      position={{
        x: isMaximized ? winWidth : Math.max(0, positionSize.x), // winWidth because of window boundary, y }}
        y: isMaximized ? -heightMenuBarPx : Math.max(0, positionSize.y), // -heightMenuBarPx because of window boundary
      }}
      minWidth={minWidth ? minWidth : 320}
      minHeight={minHeight ? minHeight : 200}
      className={classNames(windowClasses)}
      dragHandleClassName={dragHandleClass}
      disableDragging={isMaximized}
      enableResizing={!isMaximized}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
    >
      {children}
    </Rnd>
  );
};

export default Window;
