import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum Page {
  BOOT_RESTART = "boot-restart",
  BOOT_SHUT_DOWN = "boot-shut-down",
  DESKTOP = "desktop",
  LOGIN = "login",
  SLEEP = "sleep",
}

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

type SystemState = {
  activePage: Page;
  date: string;
  isFirstLogIn: boolean;
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

export const initialState: SystemState = {
  activePage: Page.LOGIN,
  date: new Date().toISOString(),
  isFirstLogIn: true,
  isWifiOn: true,
  isBluetoothOn: true,
  isAirDropOn: true,
  isDarkModeOn: false,
  isFullScreen: false,
  brightnessLevel: 1,
  volumeLevel: 0.8,
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

export default systemSlice.reducer;
