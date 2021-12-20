import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "reducers/store";

export type SystemState = {
  isWifiOn: boolean;
  isBluetoothOn: boolean;
  isAirDropOn: boolean;
  isDarkModeOn: boolean;
  isFullScreen: boolean;
  brightnessLevel: number;
  volumeLevel: number;
};

const initialState: SystemState = {
  isWifiOn: true,
  isBluetoothOn: true,
  isAirDropOn: true,
  isDarkModeOn: false,
  isFullScreen: false,
  brightnessLevel: 100,
  volumeLevel: 100,
};

export const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    updateSystem: (state, action: PayloadAction<Partial<SystemState>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateSystem } = systemSlice.actions;

export const selectSystem = (state: RootState) => {
  return state.system;
};

export default systemSlice.reducer;
