import { FC } from "react";

import {
  audioPlaylist,
  incrementAudioPlaylistIndex,
} from "reducers/systemSlice";
import { useAppDispatch, useAppSelector } from "hooks";
import { useAudio } from "hooks/useAudio";
import MenuBar from "components/MenuBar";
import WallpaperMonterey from "./images/wallpaper-monterey.jpeg";

const Desktop: FC<Record<string, never>> = () => {
  const { volumeLevel, isAudioPlaying, audioPlaylistIndex } = useAppSelector(
    (state) => state.system
  );
  const dispatch = useAppDispatch();

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
      style={{ backgroundImage: `url(${WallpaperMonterey})` }}
    >
      <MenuBar />
    </div>
  );
};

export default Desktop;
