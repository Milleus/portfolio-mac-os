import { BsX } from "react-icons/bs";
import { CgArrowsExpandLeft, CgMathMinus } from "react-icons/cg";
import { FC } from "react";
import classNames from "classnames";

import {
  ApplicationKeys,
  updateApplicationStatus,
} from "reducers/applicationSlice";
import { useAppDispatch, useAppSelector } from "hooks";
import Button, { ButtonAppearance } from "base-components/Button";

export type WindowControlsProps = {
  appKey: ApplicationKeys;
  inactiveColor?: string;
};

const WindowControls: FC<WindowControlsProps> = ({
  appKey,
  inactiveColor = "bg-neutral-500",
}) => {
  const applicationState = useAppSelector((state) => state.application);
  const dispatch = useAppDispatch();
  const isAppActive =
    applicationState.activeTitle === applicationState[appKey].shortLabel;

  const handleCloseClick = () => {
    dispatch(
      updateApplicationStatus({
        appKey,
        status: { isOpen: false, windowStatus: "normal" },
      })
    );
  };

  const handleMinimizeClick = () => {
    // do nothing for now
  };

  const handleMaximizeClick = () => {
    const windowStatus =
      applicationState[appKey].windowStatus === "maximized"
        ? "normal"
        : "maximized";

    dispatch(updateApplicationStatus({ appKey, status: { windowStatus } }));
  };

  const redButtonClasses = {
    "w-3 h-3 rounded-full text-gray-900 group-hover:bg-red-500": true,
    "bg-red-500": isAppActive,
    [inactiveColor]: !isAppActive,
  };

  const amberButtonClasses = {
    "w-3 h-3 rounded-full text-gray-900 ml-2 group-hover:bg-amber-500": true,
    "bg-amber-500": isAppActive,
    [inactiveColor]: !isAppActive,
  };

  const greenButtonClasses = {
    "w-3 h-3 rounded-full text-gray-900 ml-2 group-hover:bg-green-500": true,
    "bg-green-500": isAppActive,
    [inactiveColor]: !isAppActive,
  };

  return (
    <div className="flex items-center ml-3 group">
      <Button
        appearance={ButtonAppearance.DEFAULT}
        className={classNames(redButtonClasses)}
        onClick={handleCloseClick}
      >
        <BsX className="w-full h-full invisible group-hover:visible" />
      </Button>

      <Button
        appearance={ButtonAppearance.DEFAULT}
        className={classNames(amberButtonClasses)}
        onClick={handleMinimizeClick}
      >
        <CgMathMinus className="w-full h-full invisible group-hover:visible" />
      </Button>

      <Button
        appearance={ButtonAppearance.DEFAULT}
        className={classNames(greenButtonClasses)}
        onClick={handleMaximizeClick}
      >
        <CgArrowsExpandLeft className="w-full h-full invisible p-0.5 group-hover:visible" />
      </Button>
    </div>
  );
};

export default WindowControls;
