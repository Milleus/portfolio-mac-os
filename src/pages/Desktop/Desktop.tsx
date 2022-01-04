import { FC, useEffect } from "react";

import {
  audioPlaylist,
  incrementAudioPlaylistIndex,
  updateSystem,
} from "reducers/systemSlice";
import { useAppDispatch, useAppSelector } from "hooks";
import { useAudio } from "hooks/useAudio";
import AppSafari from "components/AppSafari";
import AppVSCode from "components/AppVSCode";
import Dock from "components/Dock";
import MenuBar from "components/MenuBar";
import WallpaperMontereyDark from "./images/wallpaper-monterey-dark.jpeg";
import WallpaperMontereyLight from "./images/wallpaper-monterey-light.jpeg";
import WindowDragBoundary from "components/WindowDragBoundary";

const Desktop: FC<Record<string, never>> = () => {
  const {
    isDarkModeOn,
    brightnessLevel,
    volumeLevel,
    isAudioPlaying,
    audioPlaylistIndex,
  } = useAppSelector((state) => state.system);
  const { safari, vscode } = useAppSelector((state) => state.application);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateSystem({ isFirstLogIn: false }));
  }, [dispatch]);

  const handleTrackEnded = () => {
    dispatch(incrementAudioPlaylistIndex());
  };

  useAudio({
    volumeLevel,
    isPlaying: isAudioPlaying,
    trackSrc: audioPlaylist[audioPlaylistIndex].audioSrc,
    onTrackEnded: handleTrackEnded,
  });

  return (
    <div
      className="w-full h-full overflow-hidden bg-center bg-cover"
      style={{
        backgroundImage: `url(${
          isDarkModeOn ? WallpaperMontereyDark : WallpaperMontereyLight
        })`,
        filter: `brightness(${brightnessLevel})`,
      }}
    >
      <MenuBar />

      <WindowDragBoundary>
        {safari.isOpen && <AppSafari />}
        {vscode.isOpen && <AppVSCode />}
      </WindowDragBoundary>

      <Dock />
    </div>
  );
};

export default Desktop;
