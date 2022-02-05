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
import ImageWithFallback from "base-components/ImageWithFallback";
import MenuBar from "components/MenuBar";
import WallpaperMontereyDarkJpeg from "./images/wallpaper-monterey-dark.jpeg";
import WallpaperMontereyDarkWebp from "./images/wallpaper-monterey-dark.webp";
import WallpaperMontereyLightJpeg from "./images/wallpaper-monterey-light.jpeg";
import WallpaperMontereyLightWebp from "./images/wallpaper-monterey-light.webp";
import WindowDragBoundary from "components/WindowDragBoundary";

const Desktop: FC<Record<string, never>> = () => {
  const {
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

  const wallpaperSrc = isDarkModeOn
    ? {
        webp: WallpaperMontereyDarkWebp,
        jpeg: WallpaperMontereyDarkJpeg,
      }
    : {
        webp: WallpaperMontereyLightWebp,
        jpeg: WallpaperMontereyLightJpeg,
      };

  return (
    <div
      className="w-full h-full overflow-hidden"
      style={{ filter: `brightness(${brightnessLevel})` }}
    >
      <ImageWithFallback
        src={wallpaperSrc.webp}
        fallbackSrc={wallpaperSrc.jpeg}
        alt="wallpaper"
        className="fixed w-full h-full object-cover"
      />

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
