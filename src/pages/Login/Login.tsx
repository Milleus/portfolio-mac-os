import { BsArrowRightCircle, BsXCircle, BsPower } from "react-icons/bs";
import { CgSleep } from "react-icons/cg";
import { ChangeEvent, FC, KeyboardEvent, MouseEvent, useState } from "react";
import { format } from "date-fns";
import { MdWifi, MdWifiOff } from "react-icons/md";
import { VscPlayCircle } from "react-icons/vsc";

import { Page, updateSystem } from "reducers/systemSlice";
import { useAppDispatch, useAppSelector } from "hooks";
import BatteryIcon from "components/BatteryIcon";
import Button, { ButtonAppearance } from "base-components/Button";
import PhotoProfile from "./images/photo-profile.jpeg";
import WallpaperMontereyDark from "../Desktop/images/wallpaper-monterey-dark.jpeg";
import WallpaperMontereyLight from "../Desktop/images/wallpaper-monterey-light.jpeg";

const Login: FC<Record<string, never>> = () => {
  const { isFirstLogIn, date, isWifiOn, isDarkModeOn } = useAppSelector(
    (state) => state.system
  );
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string>("");

  const handleLoginClick = () => {
    dispatch(updateSystem({ activePage: Page.DESKTOP }));
  };

  const handleInputClick = (event: MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleInputKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    event.key === "Enter" && handleLoginClick();
  };

  const handleShutDownClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(updateSystem({ activePage: Page.BOOT_SHUT_DOWN }));
  };

  const handleRestartClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(updateSystem({ activePage: Page.BOOT_RESTART }));
  };

  const handleSleepClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(updateSystem({ activePage: Page.SLEEP }));
  };

  return (
    <div
      className="w-full h-full overflow-hidden bg-center bg-cover flex flex-col justify-center items-center text-white"
      onClick={handleLoginClick}
      style={{
        backgroundImage: `url(${
          isDarkModeOn ? WallpaperMontereyDark : WallpaperMontereyLight
        })`,
      }}
    >
      <div className="w-full flex justify-end mt-px mr-3">
        <Button appearance={ButtonAppearance.MENU_BAR}>
          <BatteryIcon isValueVisible={false} isForcedDarkMode={true} />
        </Button>
        {!isFirstLogIn && (
          <Button appearance={ButtonAppearance.MENU_BAR}>
            {isWifiOn ? (
              <MdWifi className="w-4.5 h-4.5" />
            ) : (
              <MdWifiOff className="w-4.5 h-4.5" />
            )}
          </Button>
        )}
        <Button appearance={ButtonAppearance.MENU_BAR}>
          <span className="mx-1">{format(new Date(date), "eee d MMM")}</span>
          <span className="min-w-0 w-16">
            {format(new Date(date), "h:mm aa")}
          </span>
        </Button>
      </div>

      <div className="flex flex-col justify-center items-center grow mt-12">
        <img
          className="w-36 h-36 rounded-full"
          src={PhotoProfile}
          alt="profile"
        />
        <p className="text-2xl mt-7">Milleus</p>
        <div className="relative mt-3">
          <input
            type="password"
            className="w-40 h-7 bg-white/30 backdrop-blur-lg rounded-full px-3.5 pl-3 pr-8 text-sm outline-none placeholder:text-white/80 placeholder:text-xs placeholder:font-semibold"
            placeholder="Enter Password"
            value={value}
            autoFocus={true}
            autoComplete="off"
            aria-label="password"
            onClick={handleInputClick}
            onChange={handleInputChange}
            onKeyPress={handleInputKeyPress}
          />
          {value.length > 0 && (
            <BsArrowRightCircle className="absolute top-0 right-0 w-7 h-7 p-0.5 text-white/80 cursor-pointer" />
          )}
        </div>
        <span className="mt-8 cursor-pointer">
          Click or press Enter to log in
        </span>
      </div>

      <div className="grid grid-flow-col auto-cols-fr gap-10 mb-12">
        {isFirstLogIn && (
          <>
            <div className="flex flex-col items-center">
              <Button
                appearance={ButtonAppearance.DEFAULT}
                ariaLabel="shut down"
                className="w-8 h-8 bg-white/30 backdrop-blur-lg rounded-full"
                onClick={handleShutDownClick}
              >
                <BsPower className="w-6 h-6" />
              </Button>
              <p className="text-sm mt-2">Shut Down</p>
            </div>
            <div className="flex flex-col items-center">
              <Button
                appearance={ButtonAppearance.DEFAULT}
                ariaLabel="restart"
                className="w-8 h-8 bg-white/30 backdrop-blur-lg rounded-full"
                onClick={handleRestartClick}
              >
                <VscPlayCircle className="w-6 h-6 -scale-x-100" />
              </Button>
              <p className="text-sm mt-2">Restart</p>
            </div>
          </>
        )}
        <div className="flex flex-col items-center">
          <Button
            appearance={ButtonAppearance.DEFAULT}
            ariaLabel="sleep"
            className="w-8 h-8 bg-white/30 backdrop-blur-lg rounded-full"
            onClick={handleSleepClick}
          >
            {isFirstLogIn ? (
              <CgSleep className="w-6 h-6" />
            ) : (
              <BsXCircle className="w-5 h-5" />
            )}
          </Button>
          <p className="text-sm mt-2">{isFirstLogIn ? "Sleep" : "Cancel"}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
