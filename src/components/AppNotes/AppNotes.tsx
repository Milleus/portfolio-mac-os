import { FC } from "react";
import {
  IoCreateOutline,
  IoFolderOutline,
  IoGridOutline,
  IoImagesOutline,
  IoListOutline,
  IoLockClosed,
  IoLockClosedOutline,
  IoShareOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { IoIosLink } from "react-icons/io";
import { RiUserAddLine } from "react-icons/ri";
import { MdChecklist, MdOutlineTableRows, MdSearch } from "react-icons/md";

import { ApplicationKeys } from "reducers/applicationSlice";
import Window from "components/Window";
import WindowBar from "components/WindowBar";
import WindowControls from "components/WindowControls";
import Button, { ButtonAppearance } from "base-components/Button";
import { BsChevronDown } from "react-icons/bs";

const AppNotes: FC<Record<string, never>> = () => {
  return (
    <Window
      appKey={ApplicationKeys.NOTES}
      defaultWidth={1024}
      defaultHeight={576}
      minWidth={651}
      minHeight={226}
    >
      <WindowBar className="h-[3.25rem] flex">
        <div className="flex basis-[12.25rem] shrink-0 bg-gray-300 py-3 px-2">
          <WindowControls appKey={ApplicationKeys.NOTES} />
        </div>

        <div className="flex grow bg-white text-neutral-500 group">
          <div className="flex justify-between basis-0 grow-[34] bg-white border border-transparent border-r-neutral-200 py-3 px-2 transition-colors duration-500 group-hover:bg-gray-50 group-hover:border-b-neutral-200">
            <div className="flex rounded ml-1.5 hover:bg-gray-900/10">
              <Button appearance={ButtonAppearance.WINDOW_BAR} isActive={true}>
                <IoListOutline className="w-5 h-5" />
              </Button>
              <Button appearance={ButtonAppearance.WINDOW_BAR}>
                <IoGridOutline className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
            <Button
              appearance={ButtonAppearance.WINDOW_BAR}
              isEnabled={true}
              className="ml-1.5"
            >
              <IoTrashOutline className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex justify-between basis-0 grow-[66] bg-white border border-transparent py-3 px-2 transition-colors duration-500 group-hover:bg-gray-50 group-hover:border-b-neutral-200">
            <Button
              appearance={ButtonAppearance.WINDOW_BAR}
              isEnabled={true}
              className="ml-1.5"
            >
              <IoCreateOutline className="w-5 h-5" />
            </Button>
            <div className="flex">
              <Button
                appearance={ButtonAppearance.WINDOW_BAR}
                isEnabled={true}
                className="ml-1.5 text-lg font-light"
              >
                Aa
              </Button>
              <Button
                appearance={ButtonAppearance.WINDOW_BAR}
                isEnabled={true}
                className="ml-1.5"
              >
                <MdChecklist className="w-6 h-6" />
              </Button>
              <Button
                appearance={ButtonAppearance.WINDOW_BAR}
                isEnabled={true}
                className="ml-1.5"
              >
                <MdOutlineTableRows className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex">
              <Button
                appearance={ButtonAppearance.WINDOW_BAR}
                isEnabled={true}
                className="ml-1.5"
              >
                <IoIosLink className="w-5 h-5" />
              </Button>
              <Button
                appearance={ButtonAppearance.WINDOW_BAR}
                isEnabled={true}
                className="px-2.5 ml-1.5"
              >
                <IoImagesOutline className="w-5 h-5" />
                <BsChevronDown className="w-2 h-2 stroke-2 ml-2" />
              </Button>
              <Button
                appearance={ButtonAppearance.WINDOW_BAR}
                isEnabled={true}
                className="px-2.5 ml-1.5"
              >
                <IoLockClosedOutline className="w-4 h-4" />
                <BsChevronDown className="w-2 h-2 stroke-2 ml-2" />
              </Button>
              <Button
                appearance={ButtonAppearance.WINDOW_BAR}
                isEnabled={true}
                className="ml-1.5"
              >
                <RiUserAddLine className="w-4.5 h-4.5" />
              </Button>
              <Button
                appearance={ButtonAppearance.WINDOW_BAR}
                isEnabled={true}
                className="ml-1.5"
              >
                <IoShareOutline className="w-5 h-5" />
              </Button>
              <Button
                appearance={ButtonAppearance.WINDOW_BAR}
                isEnabled={true}
                className="ml-1.5"
              >
                <MdSearch className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </WindowBar>

      <div
        className="w-full flex"
        style={{ height: "calc(100% - 3.25rem" }} // offset height of window bar
      >
        <div className="basis-[12.25rem] shrink-0 bg-gray-300 py-1 px-2">
          <p className="w-full flex px-1.5 text-xs text-gray-600">iCloud</p>
          <div className="w-full flex items-center rounded py-1.5 px-2 bg-gray-900/10">
            <IoFolderOutline className="w-4 h-4" />
            <span className="text-xs tracking-wide ml-1.5">All iCloud</span>
            <span className="text-xs tracking-wide ml-auto">21</span>
          </div>
          <div className="w-full flex items-center rounded py-1.5 px-2">
            <IoFolderOutline className="w-4 h-4" />
            <span className="text-xs tracking-wide ml-1.5">Profile</span>
            <span className="text-xs tracking-wide ml-auto">2</span>
          </div>
          <div className="w-full flex items-center rounded py-1.5 px-2">
            <IoFolderOutline className="w-4 h-4" />
            <span className="text-xs tracking-wide ml-1.5">Projects</span>
            <span className="text-xs tracking-wide ml-auto">1</span>
          </div>
        </div>

        <div className="flex basis-0 grow-[34] bg-white border-r border-neutral-200 py-2.5 px-2">
          <div className="w-full h-max flex bg-neutral-300 rounded py-2.5 px-2 ml-1">
            <div className="w-3">
              <IoLockClosed className="w-3 h-3" />
            </div>
            <div className="w-full ml-1">
              <p className="text-sm font-semibold leading-none">Hello World!</p>
              <p className="text-xs leading-relaxed">
                8:06 PM
                <span className="ml-2.5">No additional text</span>
              </p>
              <div className="flex items-center">
                <IoFolderOutline className="w-3.5 h-3.5 ml-0.5" />
                <span className="text-xs leading-none ml-1">Notes</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex basis-0 grow-[66] bg-white py-3 px-2">
          Hello World!
        </div>
      </div>
    </Window>
  );
};

export default AppNotes;
