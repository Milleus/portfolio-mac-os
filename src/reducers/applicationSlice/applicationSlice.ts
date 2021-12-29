import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "reducers/store";

export enum ApplicationKeys {
  LAUNCHPAD = "launchpad",
  NOTES = "notes",
  VSCODE = "vscode",
  ITERM = "iterm",
  SAFARI = "safari",
  FACETIME = "facetime",
}

type ApplicationStatus = {
  isOpen: boolean;
  windowStatus: "maximized" | "minimized" | "normal";
};

export type ApplicationState = { [key in ApplicationKeys]: ApplicationStatus };

export const initialState: ApplicationState = {
  [ApplicationKeys.LAUNCHPAD]: {
    isOpen: false,
    windowStatus: "normal",
  },
  [ApplicationKeys.NOTES]: {
    isOpen: true,
    windowStatus: "normal",
  },
  [ApplicationKeys.VSCODE]: {
    isOpen: false,
    windowStatus: "normal",
  },
  [ApplicationKeys.ITERM]: {
    isOpen: false,
    windowStatus: "normal",
  },
  [ApplicationKeys.SAFARI]: {
    isOpen: false,
    windowStatus: "normal",
  },
  [ApplicationKeys.FACETIME]: {
    isOpen: false,
    windowStatus: "normal",
  },
};

export const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    updateApplication: (
      state,
      action: PayloadAction<{
        appKey: ApplicationKeys;
        status: Partial<ApplicationStatus>;
      }>
    ) => {
      const { appKey, status } = action.payload;

      return {
        ...state,
        [appKey]: {
          ...state[appKey],
          ...status,
        },
      };
    },
  },
});

export const { updateApplication } = applicationSlice.actions;

export const selectApplication = (state: RootState) => {
  return state.application;
};

export default applicationSlice.reducer;
