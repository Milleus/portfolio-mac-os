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
  const [width, setWidth] = useState<number>(SAFARI_DEFAULT_WIDTH_PX);
  const [isStartPage, setIsStartPage] = useState<boolean>(true);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [prevSearchValue, setPrevSearchValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

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

  const inputWrapperClasses = {
    "w-full h-full flex justify-center rounded-lg border border-gray-300 ml-2 focus-within:outline focus-within:outline-[3px] focus-within:outline-blue-400":
      true,
    "bg-gray-200": isStartPage && isWifiOn,
    "bg-gray-50": !isStartPage || !isWifiOn,
  };

  const inputClasses = {
    "h-full min-w-[12rem] bg-transparent rounded-lg text-neutral-500 text-xs leading-none tracking-wide pr-2 outline-none":
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
      <WindowBar className="h-[3.25rem] flex items-stretch bg-gray-50 border-b border-gray-300 py-3 pl-2 pr-3">
        <div className="h-full flex justify-between basis-0 grow-[29]">
          <div className="flex">
            <WindowControls appKey={ApplicationKeys.SAFARI} />
            <Button
              appearance={ButtonAppearance.WINDOW_BAR}
              isEnabled={true}
              className="ml-5"
            >
              <BsLayoutSidebar className="w-5 h-4.5" />
            </Button>
            <div className="w-px h-5 bg-gray-200 my-auto"></div>
            <Button appearance={ButtonAppearance.WINDOW_BAR} isEnabled={true}>
              <BsChevronDown className="w-2 h-2 stroke-2" />
            </Button>
            <Button
              appearance={ButtonAppearance.WINDOW_BAR}
              isEnabled={!isStartPage}
              className="ml-2"
              onClick={handleBrowserBack}
            >
              <BsChevronLeft className="w-4 h-4 stroke-1" />
            </Button>
            <Button
              appearance={ButtonAppearance.WINDOW_BAR}
              isEnabled={isStartPage && prevSearchValue.length > 0}
              className="ml-2"
              onClick={handleBrowserForward}
            >
              <BsChevronRight className="w-4 h-4 stroke-1" />
            </Button>
          </div>
          <Button appearance={ButtonAppearance.WINDOW_BAR} className="ml-5">
            <IoShieldHalfOutline className="w-4.5 h-4.5" />
          </Button>
        </div>

        <div className="h-full flex basis-0 grow-[42]">
          <label className={classNames(inputWrapperClasses)}>
            <div className="w-5 h-full flex items-center ml-2">
              <MdSearch className="w-4 h-4 text-neutral-500" />
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
          <Button appearance={ButtonAppearance.WINDOW_BAR} className="ml-3">
            <IoShareOutline className="w-5 h-5" />
          </Button>
          <Button
            appearance={ButtonAppearance.WINDOW_BAR}
            isEnabled={true}
            className="ml-1.5"
          >
            <IoAddOutline className="w-5 h-5 ml" />
          </Button>
          <Button
            appearance={ButtonAppearance.WINDOW_BAR}
            isEnabled={true}
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
