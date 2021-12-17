import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "reducers/store";

export enum MenuItemId {
  NONE = "none",
  APPLE = "apple",
  FINDER = "finder",
  BATTERY = "battery",
  WIFI = "wifi",
  SPOTLIGHT = "spotlight",
  CONTROL_CENTER = "controlCenter",
  NOTIFICATION_CENTER = "notificationCenter",
}

interface SystemState {
  activeMenuItemId: MenuItemId;
  isWifiOn: boolean;
  isBluetoothOn: boolean;
  isAirDropOn: boolean;
  brightnessLevel: number;
  volumeLevel: number;
}

const initialState: SystemState = {
  activeMenuItemId: MenuItemId.NONE,
  isWifiOn: true,
  isBluetoothOn: true,
  isAirDropOn: true,
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

// Other code such as selectors can use the imported `RootState` type
export const selectSystem = (state: RootState) => {
  return state.system;
};

export default systemSlice.reducer;
