import { BsChevronDown } from "react-icons/bs";
import { FC } from "react";
import {
  IoCreateOutline,
  IoGridOutline,
  IoImagesOutline,
  IoListOutline,
  IoLockClosedOutline,
  IoShareOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { IoIosLink } from "react-icons/io";
import { MdChecklist, MdOutlineTableRows, MdSearch } from "react-icons/md";
import { RiUserAddLine } from "react-icons/ri";

import { ApplicationKeys } from "reducers/applicationSlice";
import AppNotesContent from "components/AppNotesContent";
import Button, { ButtonAppearance } from "base-components/Button";
import Window from "components/Window";
import WindowBar from "components/WindowBar";
import WindowControls from "components/WindowControls";

const AppNotes: FC<Record<string, never>> = () => {
  return (
    <Window
      appKey={ApplicationKeys.NOTES}
      defaultWidth={1024}
      defaultHeight={576}
      minWidth={651}
      minHeight={226}
    >
      <WindowBar className="h-[3.25rem] flex bg-white dark:bg-black">
        <div className="w-[12.25rem] flex shrink-0 bg-gray-300 border-r border-neutral-200 py-3 px-2 dark:bg-zinc-800 dark:border-black">
          <WindowControls appKey={ApplicationKeys.NOTES} />
        </div>

        <div className="w-full flex bg-white border-b border-b-transparent text-neutral-500 hover:transition hover:duration-500 hover:border-b-neutral-200 hover:bg-gray-50 dark:bg-stone-800 dark:hover:border-b-black dark:hover:bg-neutral-800">
          <div className="w-1/4 flex justify-between border-r border-r-neutral-200 py-3 px-2 dark:border-r-black">
            <div className="flex rounded ml-1.5 hover:bg-gray-900/10 dark:hover:bg-gray-50/10">
              <Button
                appearance={ButtonAppearance.WINDOW_BAR_TOGGLE}
                isToggled={true}
              >
                <IoListOutline className="w-5 h-5" />
              </Button>
              <Button appearance={ButtonAppearance.WINDOW_BAR_TOGGLE}>
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

          <div className="w-3/4 flex justify-between py-3 px-2">
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

      <AppNotesContent
        style={{ height: "calc(100% - 3.25rem)" }} // offset height of window bar
      />
    </Window>
  );
};

export default AppNotes;
