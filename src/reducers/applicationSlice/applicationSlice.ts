import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "reducers/store";

export enum ApplicationKeys {
  FACETIME = "facetime",
  ITERM = "iterm",
  LAUNCHPAD = "launchpad",
  NOTES = "notes",
  SAFARI = "safari",
  SIRI = "siri",
  VSCODE = "vscode",
}

type ApplicationStatus = {
  isOpen: boolean;
  windowStatus: "maximized" | "minimized" | "normal";
};

type Applications = {
  [key in ApplicationKeys]: ApplicationStatus;
};

type ApplicationState = Applications & {
  zStack: Array<ApplicationKeys>;
};

export const initialState: ApplicationState = {
  zStack: [],
  [ApplicationKeys.FACETIME]: {
    isOpen: false,
    windowStatus: "normal",
  },
  [ApplicationKeys.ITERM]: {
    isOpen: false,
    windowStatus: "normal",
  },
  [ApplicationKeys.LAUNCHPAD]: {
    isOpen: false,
    windowStatus: "normal",
  },
  [ApplicationKeys.NOTES]: {
    isOpen: true,
    windowStatus: "normal",
  },
  [ApplicationKeys.SAFARI]: {
    isOpen: false,
    windowStatus: "normal",
  },
  [ApplicationKeys.SIRI]: {
    isOpen: false,
    windowStatus: "normal",
  },
  [ApplicationKeys.VSCODE]: {
    isOpen: false,
    windowStatus: "normal",
  },
};

export const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    updateZStack: (state, action: PayloadAction<ApplicationKeys>) => {
      const appKey = action.payload;
      const newZStack = state.zStack.filter((el) => el !== appKey);

      newZStack.push(appKey);

      return {
        ...state,
        zStack: newZStack,
      };
    },
    updateApplication: (
      state,
      action: PayloadAction<Partial<ApplicationState>>
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateZStack, updateApplication } = applicationSlice.actions;

export const selectApplication = (state: RootState) => {
  return state.application;
};

export default applicationSlice.reducer;
