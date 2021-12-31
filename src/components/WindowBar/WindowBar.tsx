import { BsX } from "react-icons/bs";
import { CgArrowsExpandLeft, CgMathMinus } from "react-icons/cg";
import { FC, ReactNode } from "react";

import { ApplicationKeys, updateApplication } from "reducers/applicationSlice";
import { dragHandleClass } from "components/Window";
import { useAppDispatch } from "hooks";
import Button, { ButtonAppearance } from "base-components/Button";

export type WindowBarProps = {
  children: ReactNode;
  className?: string;
  appKey?: ApplicationKeys; // if child of Window, this will be from Window
  isMaximized?: boolean; // if child of Window, this will be from Window
};

const WindowBar: FC<WindowBarProps> = ({
  children,
  className,
  appKey,
  isMaximized,
}) => {
  const dispatch = useAppDispatch();

  const handleBarDoubleClick = () => {
    appKey &&
      dispatch(
        updateApplication({
          appKey,
          status: { windowStatus: "maximized" },
        })
      );
  };

  const handleCloseClick = () => {
    appKey &&
      dispatch(
        updateApplication({
          appKey,
          status: { isOpen: false, windowStatus: "normal" },
        })
      );
  };

  const handleMinimizeClick = () => {
    // do nothing for now
  };

  const handleMaximizeClick = () => {
    console.log({ appKey, isMaximized });
    const windowStatus = isMaximized ? "normal" : "maximized";

    appKey &&
      dispatch(
        updateApplication({
          appKey,
          status: { windowStatus },
        })
      );
  };

  return (
    <div
      className={`${dragHandleClass} ${className}`}
      onDoubleClick={handleBarDoubleClick}
    >
      <div className="flex items-center ml-3 space-x-2 group">
        <Button
          appearance={ButtonAppearance.DEFAULT}
          className="w-3 h-3 rounded-full bg-red-500"
          onClick={handleCloseClick}
        >
          <BsX className="w-3 h-3 invisible group-hover:visible" />
        </Button>

        <Button
          appearance={ButtonAppearance.DEFAULT}
          className="w-3 h-3 rounded-full bg-amber-500"
          onClick={handleMinimizeClick}
        >
          <CgMathMinus className="w-3 h-3 invisible group-hover:visible" />
        </Button>

        <Button
          appearance={ButtonAppearance.DEFAULT}
          className="w-3 h-3 rounded-full bg-green-500"
          onClick={handleMaximizeClick}
        >
          <CgArrowsExpandLeft className="w-3 h-3 invisible group-hover:visible p-0.5" />
        </Button>
      </div>

      {children}
    </div>
  );
};

export default WindowBar;
