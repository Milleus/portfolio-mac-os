import { BsBrightnessAltHigh } from "react-icons/bs";
import { ChangeEvent, FC } from "react";
import {
  IoSunny,
  IoVolumeHigh,
  IoVolumeLow,
  IoVolumeMedium,
  IoVolumeMute,
} from "react-icons/io5";
import {
  MdBluetooth,
  MdBluetoothDisabled,
  MdDarkMode,
  MdFullscreen,
  MdFullscreenExit,
  MdWifi,
  MdWifiTethering,
} from "react-icons/md";

import { toggleFullScreen } from "utilities";
import { updateSystem } from "reducers/systemSlice";
import { useAppDispatch, useAppSelector } from "hooks";
import Button, { ButtonAppearance } from "base-components/Button";
import InputRange from "base-components/InputRange";

const MenuControlCenter: FC<Record<string, never>> = () => {
  const {
    isWifiOn,
    isBluetoothOn,
    isAirDropOn,
    isDarkModeOn,
    isFullScreen,
    brightnessLevel,
    volumeLevel,
  } = useAppSelector((state) => state.system);
  const dispatch = useAppDispatch();

  const handleWifiClick = () => {
    dispatch(updateSystem({ isWifiOn: !isWifiOn }));
  };

  const handleBluetoothClick = () => {
    dispatch(updateSystem({ isBluetoothOn: !isBluetoothOn }));
  };

  const handleAirDropClick = () => {
    dispatch(updateSystem({ isAirDropOn: !isAirDropOn }));
  };

  const handleDarkModeClick = () => {
    dispatch(updateSystem({ isDarkModeOn: !isDarkModeOn }));
  };

  const handleFullScreenClick = () => {
    // Note: full screen triggered by keypress is not the same as browser full screen API.
    // therefore there is no reason to update state through other means, e.g. on mount, event listeners, etc.
    dispatch(updateSystem({ isFullScreen: !isFullScreen }));
    toggleFullScreen();
  };

  const handleBrightnessChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    dispatch(updateSystem({ brightnessLevel: Number(value) }));
  };

  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    dispatch(updateSystem({ volumeLevel: Number(value) }));
  };

  const renderVolumeIcon = () => {
    if (volumeLevel === 0) return <IoVolumeMute size={12} />;
    if (volumeLevel < 33) return <IoVolumeLow size={12} />;
    if (volumeLevel < 66) return <IoVolumeMedium size={12} />;
    return <IoVolumeHigh size={12} />;
  };

  return (
    <div
      className="absolute top-6 right-0 w-72 bg-gray-200/50 backdrop-blur p-2.5 m-1 rounded-2xl shadow-lg"
      style={{ width: "19rem" }}
    >
      <div className="grid grid-cols-4 grid-rows-5 gap-2.5">
        <div className="flex flex-col justify-around bg-gray-200/80 rounded-xl shadow-lg col-span-2 row-span-2 p-3">
          <div className="flex items-center">
            <Button
              appearance={ButtonAppearance.ICON}
              isActive={isWifiOn}
              onClick={handleWifiClick}
            >
              <MdWifi size={18} />
            </Button>
            <div className="ml-2">
              <p className="text-xs font-semibold">Wi-Fi</p>
              <p className="text-xxs text-neutral-600">
                {isWifiOn ? "Home" : "Not connected"}
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <Button
              appearance={ButtonAppearance.ICON}
              isActive={isBluetoothOn}
              onClick={handleBluetoothClick}
            >
              {isBluetoothOn ? (
                <MdBluetooth size={18} />
              ) : (
                <MdBluetoothDisabled size={18} />
              )}
            </Button>
            <div className="ml-2">
              <p className="text-xs font-semibold">Bluetooth</p>
              <p className="text-xxs text-neutral-600">
                {isBluetoothOn ? "On" : "Off"}
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <Button
              appearance={ButtonAppearance.ICON}
              isActive={isBluetoothOn && isAirDropOn}
              onClick={handleAirDropClick}
            >
              <MdWifiTethering size={18} />
            </Button>
            <div className="ml-2">
              <p className="text-xs font-semibold">AirDrop</p>
              <p className="text-xxs text-neutral-600">
                {isBluetoothOn && isAirDropOn ? "Contacts Only" : "Off"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center bg-gray-200/80 rounded-xl shadow-lg col-span-2 p-3">
          <div className="flex items-center">
            <Button
              appearance={ButtonAppearance.ICON}
              isActive={isDarkModeOn}
              onClick={handleDarkModeClick}
            >
              <MdDarkMode size={18} />
            </Button>
            <div className="ml-2">
              <p className="text-xs font-semibold">Dark Mode</p>
              <p className="text-xxs text-neutral-600">
                {isDarkModeOn ? "On" : "Off"}
              </p>
            </div>
          </div>
        </div>

        <button className="flex flex-col justify-center items-center bg-gray-200/80 rounded-xl shadow-lg py-2 cursor-default">
          <BsBrightnessAltHigh size={24} />
          <p className="text-xxs">Keyboard Brightness</p>
        </button>

        <button
          className="flex flex-col justify-center items-center bg-gray-200/80 rounded-xl shadow-lg py-2 cursor-default"
          onClick={handleFullScreenClick}
        >
          {isFullScreen ? (
            <>
              <MdFullscreenExit size={24} />
              <p className="text-xxs">Exit Full Screen</p>
            </>
          ) : (
            <>
              <MdFullscreen size={24} />
              <p className="text-xxs">Enter Fullscreen</p>
            </>
          )}
        </button>

        <div className="flex flex-col bg-gray-200/80 rounded-xl shadow-lg col-span-full px-3 py-1.5">
          <p className="text-xs font-semibold mb-1.5">Display</p>
          <InputRange
            value={brightnessLevel}
            min={0}
            max={100}
            icon={<IoSunny size={12} />}
            onChange={handleBrightnessChange}
          />
        </div>

        <div className="flex flex-col bg-gray-200/80 rounded-xl shadow-lg col-span-full px-3 py-1.5">
          <p className="text-xs font-semibold mb-1.5">Sound</p>
          <InputRange
            value={volumeLevel}
            min={0}
            max={100}
            icon={renderVolumeIcon()}
            onChange={handleVolumeChange}
          />
        </div>

        <div className="flex flex-col bg-gray-200/80 rounded-xl shadow-lg col-span-full px-3 py-1.5">
          <p className="text-xs font-semibold mb-1.5">Music</p>
        </div>
      </div>
    </div>
  );
};

export default MenuControlCenter;
