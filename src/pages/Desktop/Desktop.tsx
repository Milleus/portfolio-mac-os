import { FC, useEffect } from "react";

import {
  audioPlaylist,
  incrementAudioPlaylistIndex,
  updateSystem,
} from "reducers/systemSlice";
import { useAppDispatch, useAppSelector } from "hooks";
import { useAudio } from "hooks/useAudio";
import AppFaceTime from "components/AppFaceTime";
import AppNotes from "components/AppNotes";
import AppSafari from "components/AppSafari";
import AppVSCode from "components/AppVSCode";
import Dock from "components/Dock";
import MenuBar from "components/MenuBar";
import WallpaperMontereyDarkJpeg from "./images/wallpaper-monterey-dark.jpeg";
import WallpaperMontereyDarkWebp from "./images/wallpaper-monterey-dark.webp";
import WallpaperMontereyLightJpeg from "./images/wallpaper-monterey-light.jpeg";
import WallpaperMontereyLightWebp from "./images/wallpaper-monterey-light.webp";
import WindowDragBoundary from "components/WindowDragBoundary";

const Desktop: FC<Record<string, never>> = () => {
  const {
    isWebpSupported,
    isDarkModeOn,
    brightnessLevel,
    volumeLevel,
    isAudioPlaying,
    audioPlaylistIndex,
  } = useAppSelector((state) => state.system);
  const { facetime, notes, safari, vscode } = useAppSelector(
    (state) => state.application
  );
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

  let wallpaperSrc = isDarkModeOn
    ? WallpaperMontereyDarkWebp
    : WallpaperMontereyLightWebp;

  if (!isWebpSupported) {
    wallpaperSrc = isDarkModeOn
      ? WallpaperMontereyDarkJpeg
      : WallpaperMontereyLightJpeg;
  }

  return (
    <div
      className="w-full h-full overflow-hidden bg-center bg-cover"
      style={{
        backgroundImage: `url(${wallpaperSrc})`,
        filter: `brightness(${brightnessLevel})`,
      }}
    >
      <MenuBar />

      <WindowDragBoundary>
        {facetime.isOpen && <AppFaceTime />}
        {notes.isOpen && <AppNotes />}
        {safari.isOpen && <AppSafari />}
        {vscode.isOpen && <AppVSCode />}
      </WindowDragBoundary>

      <Dock />
    </div>
  );
};

export default Desktop;
