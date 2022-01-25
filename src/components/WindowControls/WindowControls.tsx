import { BsX } from "react-icons/bs";
import { CgArrowsExpandLeft, CgMathMinus } from "react-icons/cg";
import { FC } from "react";
import classNames from "classnames";

import {
  ApplicationKeys,
  closeApplication,
  minMaxApplication,
} from "reducers/applicationSlice";
import { useAppDispatch } from "hooks";
import Button, { ButtonAppearance } from "base-components/Button";

export type WindowControlsProps = {
  appKey: ApplicationKeys;
  isActive: boolean;
  inactiveColor?: string;
};

const WindowControls: FC<WindowControlsProps> = ({
  appKey,
  isActive,
  inactiveColor = "bg-neutral-500",
}) => {
  const dispatch = useAppDispatch();

  const handleCloseClick = () => {
    dispatch(closeApplication(appKey));
  };

  const handleMinimizeClick = () => {
    // do nothing for now
  };

  const handleMaximizeClick = () => {
    dispatch(minMaxApplication(appKey));
  };

  const redButtonClasses = {
    "w-3 h-3 rounded-full text-gray-900 group-hover:bg-red-500": true,
    "bg-red-500": isActive,
    [inactiveColor]: !isActive,
  };

  const amberButtonClasses = {
    "w-3 h-3 rounded-full text-gray-900 ml-2 group-hover:bg-amber-500": true,
    "bg-amber-500": isActive,
    [inactiveColor]: !isActive,
  };

  const greenButtonClasses = {
    "w-3 h-3 rounded-full text-gray-900 ml-2 group-hover:bg-green-500": true,
    "bg-green-500": isActive,
    [inactiveColor]: !isActive,
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
