import { BsBrightnessAltHigh } from "react-icons/bs";
import { ChangeEvent, FC } from "react";
import {
  IoPause,
  IoPlay,
  IoPlayForward,
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

import {
  audioPlaylist,
  incrementAudioPlaylistIndex,
  updateSystem,
} from "reducers/systemSlice";
import { toggleFullScreen } from "utilities";
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
    isAudioPlaying,
    audioPlaylistIndex,
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
    // therefore there is no need to update state through other means (e.g. on mount, event listeners, etc.) since this is the only way the state will change.
    dispatch(updateSystem({ isFullScreen: !isFullScreen }));
    toggleFullScreen();
  };

  const handleBrightnessChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSystem({ brightnessLevel: Number(event.target.value) }));
  };

  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSystem({ volumeLevel: Number(event.target.value) }));
  };

  const handleAudioPlayPauseClick = () => {
    dispatch(updateSystem({ isAudioPlaying: !isAudioPlaying }));
  };

  const handlAudioSkipForwardClick = () => {
    dispatch(incrementAudioPlaylistIndex());
  };

  const renderVolumeIcon = () => {
    switch (true) {
      case volumeLevel === 0:
        return <IoVolumeMute className="w-3 h-3" />;
      case volumeLevel < 0.33:
        return <IoVolumeLow className="w-3 h-3" />;
      case volumeLevel < 0.66:
        return <IoVolumeMedium className="w-3 h-3" />;
      default:
        return <IoVolumeHigh className="w-3 h-3" />;
    }
  };

  return (
    <div className="absolute top-6 right-0 w-[19rem] bg-gray-200/50 backdrop-blur-lg p-2.5 m-1 rounded-2xl shadow-md">
      <div className="grid grid-cols-4 grid-rows-5 gap-2.5">
        <div className="flex flex-col justify-around bg-gray-200/80 rounded-xl shadow-md col-span-2 row-span-2 p-3">
          <div className="flex items-center space-x-2">
            <Button
              appearance={ButtonAppearance.TOGGLE}
              isActive={isWifiOn}
              onClick={handleWifiClick}
            >
              <MdWifi className="w-4.5 h-4.5" />
            </Button>
            <div>
              <p className="text-xs font-semibold">Wi-Fi</p>
              <p className="text-[0.65rem] leading-[1.1] text-gray-600">
                {isWifiOn ? "Home" : "Not connected"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              appearance={ButtonAppearance.TOGGLE}
              isActive={isBluetoothOn}
              onClick={handleBluetoothClick}
            >
              {isBluetoothOn ? (
                <MdBluetooth className="w-4.5 h-4.5" />
              ) : (
                <MdBluetoothDisabled className="w-4.5 h-4.5" />
              )}
            </Button>
            <div>
              <p className="text-xs font-semibold">Bluetooth</p>
              <p className="text-[0.65rem] leading-[1.1] text-gray-600">
                {isBluetoothOn ? "On" : "Off"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              appearance={ButtonAppearance.TOGGLE}
              isActive={isBluetoothOn && isAirDropOn}
              onClick={handleAirDropClick}
            >
              <MdWifiTethering className="w-4.5 h-4.5" />
            </Button>
            <div>
              <p className="text-xs font-semibold">AirDrop</p>
              <p className="text-[0.65rem] leading-[1.1] text-gray-600">
                {isBluetoothOn && isAirDropOn ? "Contacts Only" : "Off"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center bg-gray-200/80 rounded-xl shadow-md col-span-2 p-3">
          <div className="flex items-center">
            <Button
              appearance={ButtonAppearance.TOGGLE}
              isActive={isDarkModeOn}
              onClick={handleDarkModeClick}
            >
              <MdDarkMode className="w-4.5 h-4.5" />
            </Button>
            <div className="ml-2">
              <p className="text-xs font-semibold">Dark Mode</p>
              <p className="text-[0.65rem] leading-[1.1] text-gray-600">
                {isDarkModeOn ? "On" : "Off"}
              </p>
            </div>
          </div>
        </div>

        <Button
          appearance={ButtonAppearance.DEFAULT}
          className="flex-col bg-gray-200/80 rounded-xl shadow-md py-2"
        >
          <BsBrightnessAltHigh className="w-6 h-6" />
          <p className="text-[0.65rem] leading-[1.1]">Keyboard Brightness</p>
        </Button>

        <Button
          appearance={ButtonAppearance.DEFAULT}
          className="flex-col bg-gray-200/80 rounded-xl shadow-md py-2"
          onClick={handleFullScreenClick}
        >
          {isFullScreen ? (
            <>
              <MdFullscreenExit className="w-6 h-6" />
              <p className="text-[0.65rem] leading-[1.1]">Exit Full Screen</p>
            </>
          ) : (
            <>
              <MdFullscreen className="w-6 h-6" />
              <p className="text-[0.65rem] leading-[1.1]">Enter Fullscreen</p>
            </>
          )}
        </Button>

        <div className="flex flex-col bg-gray-200/80 rounded-xl shadow-md col-span-full px-3 py-1.5">
          <p className="text-xs font-semibold mb-1.5">Display</p>
          <InputRange
            value={brightnessLevel}
            min={0.2}
            max={1}
            step={0.01}
            icon={<IoSunny className="w-3 h-3" />}
            onChange={handleBrightnessChange}
          />
        </div>

        <div className="flex flex-col bg-gray-200/80 rounded-xl shadow-md col-span-full px-3 py-1.5">
          <p className="text-xs font-semibold mb-1.5">Sound</p>
          <InputRange
            value={volumeLevel}
            min={0}
            max={1}
            step={0.01}
            icon={renderVolumeIcon()}
            onChange={handleVolumeChange}
          />
        </div>

        <div className="flex flex-row justify-between bg-gray-200/80 rounded-xl shadow-md col-span-full px-3 py-1.5 space-x-4">
          <div className="flex items-center min-w-0 space-x-2">
            <img
              className="w-10 h-10 rounded"
              src={audioPlaylist[audioPlaylistIndex].coverSrc}
              alt="cover art"
            />
            <div className="overflow-hidden">
              <p className="truncate text-xs font-semibold">
                {audioPlaylist[audioPlaylistIndex].title}
              </p>
              <p className="truncate text-[0.65rem] leading-[1.1] text-gray-600">
                {audioPlaylist[audioPlaylistIndex].artist}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              appearance={ButtonAppearance.DEFAULT}
              onClick={handleAudioPlayPauseClick}
            >
              {isAudioPlaying ? (
                <IoPause className="w-4.5 h-4.5" />
              ) : (
                <IoPlay className="w-4.5 h-4.5" />
              )}
            </Button>
            <Button
              appearance={ButtonAppearance.DEFAULT}
              onClick={handlAudioSkipForwardClick}
            >
              <IoPlayForward className="w-4.5 h-4.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuControlCenter;
