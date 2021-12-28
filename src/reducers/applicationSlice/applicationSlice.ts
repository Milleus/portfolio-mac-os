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
    openApplication: (state, action: PayloadAction<ApplicationKeys>) => {
      const appKey = action.payload;

      return {
        ...state,
        [appKey]: {
          ...state[appKey],
          isOpen: true,
          windowStatus: "normal",
        },
      };
    },
    closeApplication: (state, action: PayloadAction<ApplicationKeys>) => {
      const appKey = action.payload;

      return {
        ...state,
        [appKey]: {
          ...state[appKey],
          isOpen: false,
          windowStatus: "normal",
        },
      };
    },
    maximizeApplication: (state, action: PayloadAction<ApplicationKeys>) => {
      const appKey = action.payload;

      return {
        ...state,
        [appKey]: {
          ...state[appKey],
          windowStatus: "maximized",
        },
      };
    },
    minimizeApplication: (state, action: PayloadAction<ApplicationKeys>) => {
      const appKey = action.payload;

      return {
        ...state,
        [appKey]: {
          ...state[appKey],
          windowStatus: "minimized",
        },
      };
    },
    normalizeApplication: (state, action: PayloadAction<ApplicationKeys>) => {
      const appKey = action.payload;

      return {
        ...state,
        [appKey]: {
          ...state[appKey],
          windowStatus: "normal",
        },
      };
    },
  },
});

export const {
  openApplication,
  closeApplication,
  maximizeApplication,
  minimizeApplication,
  normalizeApplication,
} = applicationSlice.actions;

export const selectApplication = (state: RootState) => {
  return state.application;
};

export default applicationSlice.reducer;
