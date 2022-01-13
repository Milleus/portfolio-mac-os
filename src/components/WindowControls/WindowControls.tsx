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
  buttonClassName?: string;
};

const WindowControls: FC<WindowControlsProps> = ({
  appKey,
  buttonClassName,
}) => {
  const applicationState = useAppSelector((state) => state.application);
  const dispatch = useAppDispatch();

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
    "w-3 h-3 rounded-full text-gray-900 bg-red-500 group-hover:bg-red-500":
      true,
  };

  const amberButtonClasses = {
    "w-3 h-3 rounded-full text-gray-900 bg-amber-500 ml-2 group-hover:bg-amber-500":
      true,
  };

  const greenButtonClasses = {
    "w-3 h-3 rounded-full text-gray-900 bg-green-500 ml-2 group-hover:bg-green-500":
      true,
  };

  return (
    <div className="flex items-center ml-3 group">
      <Button
        appearance={ButtonAppearance.DEFAULT}
        className={classNames(redButtonClasses, buttonClassName)}
        onClick={handleCloseClick}
      >
        <BsX className="w-full h-full invisible group-hover:visible" />
      </Button>

      <Button
        appearance={ButtonAppearance.DEFAULT}
        className={classNames(amberButtonClasses, buttonClassName)}
        onClick={handleMinimizeClick}
      >
        <CgMathMinus className="w-full h-full invisible group-hover:visible" />
      </Button>

      <Button
        appearance={ButtonAppearance.DEFAULT}
        className={classNames(greenButtonClasses, buttonClassName)}
        onClick={handleMaximizeClick}
      >
        <CgArrowsExpandLeft className="w-full h-full invisible p-0.5 group-hover:visible" />
      </Button>
    </div>
  );
};

export default WindowControls;
