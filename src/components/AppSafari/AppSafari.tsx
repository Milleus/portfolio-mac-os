import {
  BsChevronDown,
  BsChevronLeft,
  BsChevronRight,
  BsLayoutSidebar,
} from "react-icons/bs";
import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  MouseEvent,
  useRef,
  useState,
} from "react";
import {
  IoAddOutline,
  IoGridOutline,
  IoShareOutline,
  IoShieldHalfOutline,
} from "react-icons/io5";
import { MdSearch } from "react-icons/md";
import classNames from "classnames";

import { ApplicationKeys } from "reducers/applicationSlice";
import { useAppSelector } from "hooks";
import AppSafariContent from "components/AppSafariContent";
import Button, { ButtonAppearance } from "base-components/Button";
import Window from "components/Window";
import WindowBar from "components/WindowBar";
import WindowControls from "components/WindowControls";

const SAFARI_DEFAULT_WIDTH_PX = 1024;

const AppSafari: FC<Record<string, never>> = () => {
  const { isWifiOn } = useAppSelector((state) => state.system);
  const { activeTitle, safari } = useAppSelector((state) => state.application);
  const [width, setWidth] = useState<number>(SAFARI_DEFAULT_WIDTH_PX);
  const [isStartPage, setIsStartPage] = useState<boolean>(true);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [prevSearchValue, setPrevSearchValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const isAppActive = activeTitle === safari.shortLabel;

  const handleWidthChange = (width: number) => {
    setWidth(width);
  };

  const handleBrowserBack = () => {
    setInputValue("");
    setIsStartPage(true);
  };

  const handleBrowserForward = () => {
    setInputValue(prevSearchValue);
    setIsStartPage(false);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const handleInputMouseDown = (event: MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (inputValue.length > 0 && event.key === "Enter") {
      setPrevSearchValue(inputValue);
      setIsStartPage(false);
      inputRef.current && inputRef.current.blur();
    }
  };

  const windowBarClasses = {
    "h-[3.25rem] flex items-stretch border-b border-neutral-300 py-3 pl-2 pr-3 dark:border-neutral-900":
      true,
    "bg-neutral-50 dark:bg-neutral-700": isAppActive,
    "bg-neutral-100 dark:bg-neutral-800": !isAppActive,
  };

  const inputWrapperClasses = {
    "w-full h-full flex justify-center rounded-lg border ml-2 focus-within:outline focus-within:outline-[3px] focus-within:outline-blue-400":
      true,
    "bg-neutral-200 border-neutral-200 dark:bg-neutral-800 dark:border-neutral-800":
      isStartPage && isWifiOn && isAppActive,
    "bg-neutral-300 border-neutral-300 dark:bg-neutral-900 dark:border-neutral-900":
      isStartPage && isWifiOn && !isAppActive,
    "bg-neutral-50 border-neutral-300 dark:bg-neutral-700 dark:border-neutral-600":
      (!isStartPage || !isWifiOn) && isAppActive,
    "bg-neutral-100 border-neutral-300 dark:bg-neutral-800 dark:border-neutral-600":
      (!isStartPage || !isWifiOn) && !isAppActive,
  };

  const inputClasses = {
    "h-full min-w-[12rem] bg-transparent rounded-lg text-xs leading-none tracking-wide pr-2 outline-none":
      true,
    "text-neutral-500 placeholder-neutral-400 dark:text-neutral-50 dark:placeholder-neutral-500":
      true,
    "transition-none w-full": isFocused || inputValue.length > 0,
    "transition-all w-0": !isFocused && inputValue.length === 0,
  };

  return (
    <Window
      appKey={ApplicationKeys.SAFARI}
      defaultWidth={SAFARI_DEFAULT_WIDTH_PX}
      defaultHeight={576}
      minWidth={651}
      minHeight={226}
      onWidthChange={handleWidthChange}
    >
      <WindowBar className={classNames(windowBarClasses)}>
        <div className="h-full flex justify-between basis-0 grow-[29]">
          <div className="flex">
            <WindowControls
              appKey={ApplicationKeys.SAFARI}
              inactiveColor="bg-neutral-200 dark:bg-neutral-600"
            />
            <Button
              appearance={ButtonAppearance.WINDOW_BAR}
              isEnabled={true}
              isActive={isAppActive}
              className="ml-5"
            >
              <BsLayoutSidebar className="w-5 h-4.5" />
            </Button>
            <div className="w-px h-5 bg-neutral-200 my-auto dark:bg-neutral-600"></div>
            <Button
              appearance={ButtonAppearance.WINDOW_BAR}
              isEnabled={true}
              isActive={isAppActive}
            >
              <BsChevronDown className="w-2 h-2 stroke-2" />
            </Button>
            <Button
              appearance={ButtonAppearance.WINDOW_BAR}
              isEnabled={!isStartPage}
              isActive={isAppActive}
              className="ml-2"
              onClick={handleBrowserBack}
            >
              <BsChevronLeft className="w-4 h-4 stroke-1" />
            </Button>
            <Button
              appearance={ButtonAppearance.WINDOW_BAR}
              isEnabled={isStartPage && prevSearchValue.length > 0}
              isActive={isAppActive}
              className="ml-2"
              onClick={handleBrowserForward}
            >
              <BsChevronRight className="w-4 h-4 stroke-1" />
            </Button>
          </div>
          <Button
            appearance={ButtonAppearance.WINDOW_BAR}
            isActive={isAppActive}
            className="ml-5"
          >
            <IoShieldHalfOutline className="w-4.5 h-4.5" />
          </Button>
        </div>

        <div className="h-full flex basis-0 grow-[42]">
          <label className={classNames(inputWrapperClasses)}>
            <div className="w-5 h-full flex items-center ml-2">
              <MdSearch className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
            </div>
            <input
              ref={inputRef}
              type="text"
              className={classNames(inputClasses)}
              value={inputValue}
              placeholder="Search or enter website name"
              autoFocus={true}
              autoComplete="off"
              aria-label="address bar"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onMouseDown={handleInputMouseDown}
              onChange={handleInputChange}
              onKeyPress={handleInputKeyPress}
            />
          </label>
        </div>

        <div className="h-full flex justify-end basis-0 grow-[29]">
          <Button
            appearance={ButtonAppearance.WINDOW_BAR}
            isActive={isAppActive}
            className="ml-3"
          >
            <IoShareOutline className="w-5 h-5" />
          </Button>
          <Button
            appearance={ButtonAppearance.WINDOW_BAR}
            isEnabled={true}
            isActive={isAppActive}
            className="ml-1.5"
          >
            <IoAddOutline className="w-5 h-5 ml" />
          </Button>
          <Button
            appearance={ButtonAppearance.WINDOW_BAR}
            isEnabled={true}
            isActive={isAppActive}
            className="ml-1.5"
          >
            <IoGridOutline className="w-4 h-4" />
          </Button>
        </div>
      </WindowBar>

      <AppSafariContent
        isWifiOn={isWifiOn}
        isStartPage={isStartPage}
        prevSearchValue={prevSearchValue}
        width={width}
        style={{ height: "calc(100% - 3.25rem)" }} // offset height of window bar
      />
    </Window>
  );
};

export default AppSafari;
