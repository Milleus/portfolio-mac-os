import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "reducers/store";

type AudioTrack = {
  title: string;
  artist: string;
  audioSrc: string;
  coverSrc: string;
};

export const audioPlaylist: Array<AudioTrack> = [
  {
    title: "Sea Shanty 2",
    artist: "OSRSBeatz",
    audioSrc: "music/audio-sea-shanty-2.mp3",
    coverSrc: "music/cover-sea-shanty-2.jpeg",
  },
  {
    title: "Wii Shop Channel Trap",
    artist: "OSRSBeatz",
    audioSrc: "music/audio-wii-shop-channel-trap.mp3",
    coverSrc: "music/cover-wii-shop-channel-trap.jpeg",
  },
];

export type SystemState = {
  isWifiOn: boolean;
  isBluetoothOn: boolean;
  isAirDropOn: boolean;
  isDarkModeOn: boolean;
  isFullScreen: boolean;
  brightnessLevel: number;
  volumeLevel: number;
  isAudioPlaying: boolean;
  audioPlaylistIndex: number;
};

const initialState: SystemState = {
  isWifiOn: true,
  isBluetoothOn: true,
  isAirDropOn: true,
  isDarkModeOn: false,
  isFullScreen: false,
  brightnessLevel: 1,
  volumeLevel: 1,
  isAudioPlaying: false,
  audioPlaylistIndex: 0,
};

export const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    incrementAudioPlaylistIndex: (state) => {
      const nextIndex =
        state.audioPlaylistIndex < audioPlaylist.length - 1
          ? state.audioPlaylistIndex + 1
          : 0;

      return {
        ...state,
        audioPlaylistIndex: nextIndex,
      };
    },
    updateSystem: (state, action: PayloadAction<Partial<SystemState>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { incrementAudioPlaylistIndex, updateSystem } =
  systemSlice.actions;

export const selectSystem = (state: RootState) => {
  return state.system;
};

export default systemSlice.reducer;
