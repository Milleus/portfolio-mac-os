import { BsX } from "react-icons/bs";
import { CgArrowsExpandLeft, CgMathMinus } from "react-icons/cg";
import { FC, ReactNode, useEffect, useState } from "react";
import { Rnd, RndResizeCallback, RndDragCallback } from "react-rnd";

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

const dragHandleClass = "drag-handle";

export type WindowProps = {
  children: ReactNode;
  title?: string;
  width?: number;
  height?: number;
  onCloseClick: () => void;
  onMinimizeClick: () => void;
  onMaximizeClick: () => void;
};

const Window: FC<WindowProps> = ({
  children,
  title,
  width,
  height,
  onCloseClick,
  onMinimizeClick,
  onMaximizeClick,
}) => {
  const { winWidth, winHeight } = useWindowSize();
  const initWidth = Math.min(winWidth, width ? width : 640);
  const initHeight = Math.min(winHeight, height ? height : 400);

  const [positionSize, setPositionSize] = useState<PositionSize>({
    width: initWidth,
    height: initHeight,
    // plus winWidth because of window boundary
    x: Math.random() * (winWidth - initWidth) + winWidth,
    y:
      Math.random() *
      (winHeight -
        initHeight -
        convertRemToPixels(HEIGHT_MENU_BAR_REM) -
        convertRemToPixels(HEIGHT_DOCK_REM)),
  });

  // adjust size when browser is resized
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

  return (
    <Rnd
      bounds="parent"
      size={{
        width: positionSize.width,
        height: positionSize.height,
      }}
      position={{
        x: positionSize.x,
        y: positionSize.y,
      }}
      className="absolute w-full h-full rounded overflow-hidden shadow-md"
      dragHandleClassName={dragHandleClass}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
    >
      <div
        className={`${dragHandleClass} relative h-6 bg-neutral-700 text-center`}
      >
        <div className="absolute h-6 flex items-center mx-2 space-x-2 group">
          <button
            className="w-3 h-3 flex justify-center items-center rounded-full bg-red-500"
            onClick={onCloseClick}
          >
            <BsX className="invisible group-hover:visible" />
          </button>

          <button
            className="w-3 h-3 flex justify-center items-center rounded-full bg-amber-500"
            onClick={onMinimizeClick}
          >
            <CgMathMinus className="invisible group-hover:visible" />
          </button>

          <button
            className="w-3 h-3 flex justify-center items-center rounded-full bg-green-500"
            onClick={onMaximizeClick}
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
