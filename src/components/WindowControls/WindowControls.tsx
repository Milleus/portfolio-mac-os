import { BsX } from "react-icons/bs";
import { CgArrowsExpandLeft, CgMathMinus } from "react-icons/cg";
import { FC } from "react";

import { ApplicationKeys, updateApplication } from "reducers/applicationSlice";
import { useAppDispatch, useAppSelector } from "hooks";
import Button, { ButtonAppearance } from "base-components/Button";

export type WindowControlsProps = {
  appKey: ApplicationKeys;
};

const WindowControls: FC<WindowControlsProps> = ({ appKey }) => {
  const applicationState = useAppSelector((state) => state.application);
  const dispatch = useAppDispatch();

  const handleCloseClick = () => {
    dispatch(
      updateApplication({ [appKey]: { isOpen: false, windowStatus: "normal" } })
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

    dispatch(updateApplication({ [appKey]: { isOpen: true, windowStatus } }));
  };

  return (
    <div className="flex items-center ml-3 space-x-2 group">
      <Button
        appearance={ButtonAppearance.DEFAULT}
        className="w-3 h-3 rounded-full bg-red-500"
        onClick={handleCloseClick}
      >
        <BsX className="w-3 h-3 invisible text-gray-900 group-hover:visible" />
      </Button>

      <Button
        appearance={ButtonAppearance.DEFAULT}
        className="w-3 h-3 rounded-full bg-amber-500"
        onClick={handleMinimizeClick}
      >
        <CgMathMinus className="w-3 h-3 invisible text-gray-900 group-hover:visible" />
      </Button>

      <Button
        appearance={ButtonAppearance.DEFAULT}
        className="w-3 h-3 rounded-full bg-green-500"
        onClick={handleMaximizeClick}
      >
        <CgArrowsExpandLeft className="w-3 h-3 invisible text-gray-900 group-hover:visible p-0.5" />
      </Button>
    </div>
  );
};

export default WindowControls;
