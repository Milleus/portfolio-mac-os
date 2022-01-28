import {
  Children,
  cloneElement,
  FC,
  isValidElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { Rnd, RndResizeCallback, RndDragCallback } from "react-rnd";
import classNames from "classnames";

import { ApplicationKeys, updateApplication } from "reducers/applicationSlice";
import { convertRemToPixels } from "utilities";
import { DOCK_HEIGHT_REM } from "components/Dock";
import { MENU_BAR_HEIGHT_REM } from "components/MenuBar";
import { useAppDispatch, useAppSelector, useWindowSize } from "hooks";

type PositionSize = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const dragHandleClass = "drag-handle";

export type WindowProps = {
  appKey: ApplicationKeys;
  children: ReactNode;
  defaultWidth?: number;
  defaultHeight?: number;
  minWidth?: number;
  minHeight?: number;
  onWidthChange?: (width: number) => void;
};

const Window: FC<WindowProps> = ({
  appKey,
  children,
  defaultWidth,
  defaultHeight,
  minWidth,
  minHeight,
  onWidthChange,
}) => {
  const applicationState = useAppSelector((state) => state.application);
  const dispatch = useAppDispatch();
  const { winWidth, winHeight } = useWindowSize();
  const initWidth = Math.min(winWidth, defaultWidth ? defaultWidth : 640);
  const initHeight = Math.min(winHeight, defaultHeight ? defaultHeight : 400);
  const menuBarHeightPx = convertRemToPixels(MENU_BAR_HEIGHT_REM);
  const dockHeightPx = convertRemToPixels(DOCK_HEIGHT_REM);
  const isMaximized = applicationState[appKey].windowStatus === "maximized";

  const [positionSize, setPositionSize] = useState<PositionSize>({
    width: initWidth,
    height: initHeight,
    x: Math.random() * (winWidth - initWidth) + winWidth, // plus winWidth because of window boundary
    y:
      Math.random() * (winHeight - initHeight - menuBarHeightPx - dockHeightPx),
  });

  useEffect(() => {
    setPositionSize({
      ...positionSize,
      width: Math.min(winWidth, positionSize.width),
      height: Math.min(winWidth, positionSize.height),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winWidth, winHeight]);

  useEffect(() => {
    if (onWidthChange) {
      const newWidth = isMaximized ? winWidth : positionSize.width;

      onWidthChange(newWidth);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMaximized]);

  const handleDragStop: RndDragCallback = (_e, d) => {
    setPositionSize({ ...positionSize, x: d.x, y: d.y });
  };

  const handleResize: RndResizeCallback = (
    _e,
    _direction,
    ref,
    _delta,
    _position
  ) => {
    onWidthChange && onWidthChange(ref.offsetWidth);
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
    dispatch(
      updateApplication({ appKey, status: { windowStatus: "maximized" } })
    );
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
        x: isMaximized ? winWidth : Math.max(0, positionSize.x), // winWidth because of window boundary
        y: isMaximized ? -menuBarHeightPx : Math.max(0, positionSize.y), // -heightMenuBarPx because of window boundary
      }}
      minWidth={minWidth ? minWidth : 320}
      minHeight={minHeight ? minHeight : 200}
      className={classNames(windowClasses)}
      dragHandleClassName={dragHandleClass}
      disableDragging={isMaximized}
      enableResizing={!isMaximized}
      onDragStop={handleDragStop}
      onResize={handleResize}
      onResizeStop={handleResizeStop}
    >
      {Children.map(children, (child) => {
        if (!isValidElement(child) || typeof child.type !== "function") {
          return child;
        }

        const childProps = {
          dragHandleClass,
          onBarDoubleClick: handleBarDoubleClick,
        };

        return cloneElement(child, childProps);
      })}
    </Rnd>
  );
};

export default Window;
