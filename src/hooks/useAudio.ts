import { useEffect, useMemo, useRef } from "react";

type options = {
  volumeLevel: number;
  isPlaying: boolean;
  trackSrc: string;
  onTrackEnded: () => void;
};

export const useAudio = ({
  volumeLevel,
  isPlaying,
  trackSrc,
  onTrackEnded,
}: options) => {
  const audioElement = useMemo(() => new Audio(), []);
  const audioRef = useRef<HTMLAudioElement>(audioElement);

  // when track changes, update source
  useEffect(() => {
    audioRef.current.src = trackSrc;
  }, [trackSrc]);

  // when track changes or 'play' state changes, play/pause accordingly
  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying, trackSrc]);

  // when volume changes, update volume
  useEffect(() => {
    audioRef.current.volume = volumeLevel;
  }, [volumeLevel]);

  // when track ends, call onTrackEnded
  useEffect(() => {
    audioElement.addEventListener("ended", onTrackEnded);

    return () => {
      audioElement.removeEventListener("ended", onTrackEnded);
    };
  }, [audioElement, onTrackEnded]);
};
