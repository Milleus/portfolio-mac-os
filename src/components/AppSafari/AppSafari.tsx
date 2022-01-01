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
import Button, { ButtonAppearance } from "base-components/Button";
import Window from "components/Window";
import WindowBar from "components/WindowBar";
import WindowControls from "components/WindowControls";

const AppSafari: FC<Record<string, never>> = () => {
  const [value, setValue] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const placeholderClasses = {
    "absolute h-full text-neutral-400 text-center pointer-events-none": true,
    "transition-all w-full": !isFocused && value.length === 0,
    "transition-none w-0": isFocused || value.length > 0,
  };

  return (
    <Window
      appKey={ApplicationKeys.SAFARI}
      defaultWidth={1024}
      defaultHeight={576}
      minWidth={651}
      minHeight={226}
    >
      <WindowBar className="h-14 flex items-stretch bg-gray-100 border-b border-gray-300 py-3 pl-2 pr-3">
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
          <div className="relative flex min-w-[15.5rem] w-full ml-2">
            <input
              ref={inputRef}
              type="text"
              className="w-full h-full rounded-lg bg-gray-200 text-neutral-500 text-xs leading-none tracking-wide pl-6"
              value={value}
              autoFocus={true}
              autoComplete="off"
              aria-label="address bar"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onMouseDown={handleInputMouseDown}
              onChange={handleInputChange}
              onKeyPress={handleInputKeyPress}
            />
            <div className={classNames(placeholderClasses)}>
              <div className="h-full inline-flex items-center">
                {value.length > 0 ? (
                  <BsGlobe2 className="inline w-3 h-3 text-neutral-500 ml-2 mr-0.5" />
                ) : (
                  <MdSearch className="inline w-4 h-4 text-neutral-500 ml-2 mr-0.5" />
                )}
                {value.length === 0 && (
                  <p className="text-xs leading-none tracking-wide whitespace-nowrap">
                    Search or enter website name
                  </p>
                )}
              </div>
            </div>
          </div>
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
        {isSearched ? <div>favourites</div> : <div>cannot reach</div>}
      </div>
    </Window>
  );
};

export default AppSafari;
