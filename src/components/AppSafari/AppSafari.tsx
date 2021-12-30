import {
  BsChevronDown,
  BsChevronLeft,
  BsChevronRight,
  BsLayoutSidebar,
} from "react-icons/bs";
import { FC } from "react";
import {
  IoAddOutline,
  IoGridOutline,
  IoShareOutline,
  IoShieldHalfOutline,
} from "react-icons/io5";

import { ApplicationKeys } from "reducers/applicationSlice";
import Button, { ButtonAppearance } from "base-components/Button";
import Window from "components/Window";
import WindowBar from "components/WindowBar";

const AppSafari: FC<Record<string, never>> = () => {
  return (
    <Window
      appKey={ApplicationKeys.SAFARI}
      defaultWidth={1024}
      defaultHeight={768}
      minWidth={651}
      minHeight={226}
    >
      <WindowBar
        appKey={ApplicationKeys.NOTES}
        className="h-14 flex items-stretch bg-gray-100 text-center border-b border-gray-300 py-3 pl-2 pr-3"
      >
        <Button
          appearance={ButtonAppearance.TRANSPARENT}
          isActive={true}
          className="ml-5"
        >
          <BsLayoutSidebar className="w-5 h-4.5" />
        </Button>
        <div className="w-px h-5 bg-gray-200 my-auto"></div>
        <Button appearance={ButtonAppearance.TRANSPARENT} isActive={true}>
          <BsChevronDown className="w-2 h-2 stroke-2" />
        </Button>
        <Button
          appearance={ButtonAppearance.TRANSPARENT}
          isActive={false}
          className="ml-2"
        >
          <BsChevronLeft className="w-4 h-4 stroke-1" />
        </Button>
        <Button
          appearance={ButtonAppearance.TRANSPARENT}
          isActive={false}
          className="ml-2"
        >
          <BsChevronRight className="w-4 h-4 stroke-1" />
        </Button>

        <div className="flex justify-end items-center grow-[0.5] ml-5">
          <Button appearance={ButtonAppearance.TRANSPARENT} isActive={false}>
            <IoShieldHalfOutline className="w-4.5 h-4.5" />
          </Button>
        </div>
        <div className="flex items-center min-w-[15.5rem] grow-[1.35] ml-2">
          <input
            type="text"
            className="w-full h-full rounded-lg border border-gray-300 bg-red-500"
          />
        </div>

        <div className="flex justify-end items-center grow mx-3">
          <div className="flex items-center space-x-1.5">
            <Button appearance={ButtonAppearance.TRANSPARENT} isActive={false}>
              <IoShareOutline className="w-5 h-5" />
            </Button>
            <Button appearance={ButtonAppearance.TRANSPARENT} isActive={true}>
              <IoAddOutline className="w-5 h-5" />
            </Button>
            <Button appearance={ButtonAppearance.TRANSPARENT} isActive={true}>
              <IoGridOutline className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </WindowBar>

      <div className="w-full h-full bg-gray-200"></div>
    </Window>
  );
};

export default AppSafari;
