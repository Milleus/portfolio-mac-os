import {
  BsChevronDown,
  BsChevronLeft,
  BsChevronRight,
  BsGlobe2,
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
import AppSafariStart from "components/AppSafariStart";
import Button, { ButtonAppearance } from "base-components/Button";
import Window from "components/Window";
import WindowBar from "components/WindowBar";
import WindowControls from "components/WindowControls";

const SAFARI_DEFAULT_WIDTH_PX = 1024;

const AppSafari: FC<Record<string, never>> = () => {
  const [value, setValue] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [width, setWidth] = useState<number>(SAFARI_DEFAULT_WIDTH_PX);

  const handleWidthChange = (width: number) => {
    setWidth(width);
  };

  const handleBrowserBack = () => {
    setValue("");
    setIsSearched(false);
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
    setValue(event.target.value);
  };

  const handleInputKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setIsSearched(true);
      inputRef.current && inputRef.current.blur();
    }
  };

  const inputClasses = {
    "h-full min-w-[12rem] bg-transparent rounded-lg text-neutral-500 text-xs leading-none tracking-wide pr-2 outline-none":
      true,
    "transition-all w-full": isFocused || value.length > 0,
    "transition-none w-0": !isFocused && value.length === 0,
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
        <div className="h-full flex justify-between basis-0 grow-[0.29]">
          <div className="flex">
            <WindowControls appKey={ApplicationKeys.SAFARI} />

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
              isActive={isSearched}
              className="ml-2"
              onClick={handleBrowserBack}
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
          </div>

          <Button
            appearance={ButtonAppearance.TRANSPARENT}
            isActive={false}
            className="ml-5"
          >
            <IoShieldHalfOutline className="w-4.5 h-4.5" />
          </Button>
        </div>

        <div className="h-full flex basis-0 grow-[0.42]">
          <label className="w-full h-full flex justify-center bg-gray-200 rounded-lg ml-2 focus-within:outline focus-within:outline-[3px] focus-within:outline-blue-400">
            <div className="w-5 h-full flex items-center ml-2">
              {value.length > 0 ? (
                <BsGlobe2 className="w-3 h-3 text-neutral-500" />
              ) : (
                <MdSearch className="w-4 h-4 text-neutral-500" />
              )}
            </div>
            <input
              ref={inputRef}
              type="text"
              className={classNames(inputClasses)}
              value={value}
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

        <div className="h-full flex justify-end basis-0 grow-[0.29] space-x-1.5">
          <Button
            appearance={ButtonAppearance.TRANSPARENT}
            isActive={false}
            className="ml-3"
          >
            <IoShareOutline className="w-5 h-5" />
          </Button>
          <Button appearance={ButtonAppearance.TRANSPARENT} isActive={true}>
            <IoAddOutline className="w-5 h-5" />
          </Button>
          <Button appearance={ButtonAppearance.TRANSPARENT} isActive={true}>
            <IoGridOutline className="w-4 h-4" />
          </Button>
        </div>
      </WindowBar>

      <div className="w-full h-full bg-gray-200">
        {isSearched ? (
          <div>search results</div>
        ) : (
          <AppSafariStart width={width} />
        )}
      </div>
    </Window>
  );
};

export default AppSafari;
