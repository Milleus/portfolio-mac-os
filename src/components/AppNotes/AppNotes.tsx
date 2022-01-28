import { BsChevronDown } from "react-icons/bs";
import { FC, useState } from "react";
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
import classNames from "classnames";

import { ApplicationKeys } from "reducers/applicationSlice";
import { convertRemToPixels } from "utilities";
import AppNotesContent from "components/AppNotesContent";
import Button, { ButtonAppearance } from "base-components/Button";
import Window from "components/Window";
import WindowBar from "components/WindowBar";
import WindowControls from "components/WindowControls";

const NOTES_DEFAULT_WIDTH_PX = 1024;
const NOTES_BREAKPOINT_XS_REM = 46.875;
const NOTES_BREAKPOINT_SM_REM = 49.6875;
const NOTES_BREAKPOINT_MD_REM = 53.9375;

const AppNotes: FC<Record<string, never>> = () => {
  const [width, setWidth] = useState<number>(NOTES_DEFAULT_WIDTH_PX);
  const notesBreakpointXsPx = convertRemToPixels(NOTES_BREAKPOINT_XS_REM);
  const notesBreakpointSmPx = convertRemToPixels(NOTES_BREAKPOINT_SM_REM);
  const notesBreakpointMdPx = convertRemToPixels(NOTES_BREAKPOINT_MD_REM);

  const handleWidthChange = (width: number) => {
    setWidth(width);
  };

  const leftBarClasses = {
    "flex px-2 py-3": true,
    "w-[12.25rem] shrink-0 bg-gray-300 border-r border-neutral-200 dark:bg-zinc-800 dark:border-black":
      width >= notesBreakpointSmPx,
    "w-full max-w-[12.25rem] bg-gray-300 border-r border-neutral-200 dark:bg-zinc-800 dark:border-black":
      width < notesBreakpointSmPx && width >= notesBreakpointXsPx,
    "border-b border-b-neutral-200 bg-gray-50 dark:bg-stone-800 dark:border-b-black dark:bg-neutral-800":
      width < notesBreakpointXsPx,
  };

  const midAndRightBarClasses = {
    "w-full flex border-b border-b-transparent text-neutral-500": true,
    "bg-white hover:transition hover:duration-500 hover:border-b-neutral-200 hover:bg-gray-50 dark:bg-stone-800 dark:hover:border-b-black dark:hover:bg-neutral-800":
      width >= notesBreakpointMdPx,
    "border-b-neutral-200 bg-gray-50 dark:bg-stone-800 dark:border-b-black dark:bg-neutral-800":
      width < notesBreakpointMdPx,
  };

  return (
    <Window
      appKey={ApplicationKeys.NOTES}
      defaultWidth={NOTES_DEFAULT_WIDTH_PX}
      defaultHeight={576}
      minWidth={678}
      minHeight={226}
      onWidthChange={handleWidthChange}
    >
      <WindowBar
        appKey={ApplicationKeys.NOTES}
        className="h-[3.25rem] flex bg-white dark:bg-black"
      >
        <div className={classNames(leftBarClasses)}>
          <WindowControls appKey={ApplicationKeys.NOTES} isActive={true} />
        </div>

        <div className={classNames(midAndRightBarClasses)}>
          <div className="w-full max-w-[12.25rem] flex justify-between border-r border-r-neutral-200 py-3 px-2 dark:border-r-black">
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

          <div className="flex justify-between grow py-3 px-2">
            <Button
              appearance={ButtonAppearance.WINDOW_BAR}
              isEnabled={true}
              className="ml-1.5"
            >
              <IoCreateOutline className="w-5 h-5" />
            </Button>
            <div className="flex mx-3">
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
        notesBreakpointXsPx={notesBreakpointXsPx}
        notesBreakpointSmPx={notesBreakpointSmPx}
        width={width}
        style={{ height: "calc(100% - 3.25rem)" }} // offset height of window bar
      />
    </Window>
  );
};

export default AppNotes;
