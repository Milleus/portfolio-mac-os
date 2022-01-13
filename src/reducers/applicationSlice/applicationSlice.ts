import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "reducers/store";

export enum ApplicationKeys {
  FACETIME = "facetime",
  ITERM = "iterm",
  NOTES = "notes",
  SAFARI = "safari",
  SIRI = "siri",
  VSCODE = "vscode",
}

type ApplicationStatus = {
  shortLabel: string;
  isOpen: boolean;
  windowStatus: "maximized" | "minimized" | "normal";
};

type Applications = {
  [key in ApplicationKeys]: ApplicationStatus;
};

type ApplicationState = Applications & {
  activeTitle: string;
  zStack: Array<ApplicationKeys>;
};

export const initialState: ApplicationState = {
  activeTitle: "Notes",
  zStack: [ApplicationKeys.NOTES],
  [ApplicationKeys.FACETIME]: {
    shortLabel: "FaceTime",
    isOpen: false,
    windowStatus: "normal",
  },
  [ApplicationKeys.ITERM]: {
    shortLabel: "iTerm2",
    isOpen: false,
    windowStatus: "normal",
  },
  [ApplicationKeys.NOTES]: {
    shortLabel: "Notes",
    isOpen: true,
    windowStatus: "normal",
  },
  [ApplicationKeys.SAFARI]: {
    shortLabel: "Safari",
    isOpen: false,
    windowStatus: "normal",
  },
  [ApplicationKeys.SIRI]: {
    shortLabel: "Finder",
    isOpen: false,
    windowStatus: "normal",
  },
  [ApplicationKeys.VSCODE]: {
    shortLabel: "Code",
    isOpen: false,
    windowStatus: "normal",
  },
};

export const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    updateActiveTitle: (
      state,
      action: PayloadAction<ApplicationKeys | null>
    ) => {
      const appKey = action.payload;
      const activeTitle = appKey ? state[appKey].shortLabel : "Finder";

      return {
        ...state,
        activeTitle,
      };
    },
    updateZStack: (state, action: PayloadAction<ApplicationKeys>) => {
      const appKey = action.payload;
      const newZStack = state.zStack.filter((el) => el !== appKey);

      newZStack.push(appKey);

      return {
        ...state,
        zStack: newZStack,
      };
    },
    updateApplicationStatus: (
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
    resetApplicationState: () => {
      return {
        ...initialState,
      };
    },
  },
});

export const {
  updateActiveTitle,
  updateZStack,
  updateApplicationStatus,
  resetApplicationState,
} = applicationSlice.actions;

export const selectApplication = (state: RootState) => {
  return state.application;
};

export default applicationSlice.reducer;
