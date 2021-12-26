import { FC, useEffect } from "react";

import {
  audioPlaylist,
  incrementAudioPlaylistIndex,
  updateSystem,
} from "reducers/systemSlice";
import { useAppDispatch, useAppSelector } from "hooks";
import { useAudio } from "hooks/useAudio";
import Dock from "components/Dock";
import MenuBar from "components/MenuBar";
import WallpaperMonterey from "./images/wallpaper-monterey.jpeg";

const Desktop: FC<Record<string, never>> = () => {
  const { brightnessLevel, volumeLevel, isAudioPlaying, audioPlaylistIndex } =
    useAppSelector((state) => state.system);
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
        backgroundImage: `url(${WallpaperMonterey})`,
        filter: `brightness(${brightnessLevel})`,
      }}
    >
      <MenuBar />

      <Dock />
    </div>
  );
};

export default Desktop;
