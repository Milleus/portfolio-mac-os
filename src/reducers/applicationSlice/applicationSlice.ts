import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    openApplication: (state, action: PayloadAction<ApplicationKeys>) => {
      const appKey = action.payload;

      return {
        ...state,
        [appKey]: {
          ...state[appKey],
          isOpen: true,
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
    minMaxApplication: (state, action: PayloadAction<ApplicationKeys>) => {
      const appKey = action.payload;
      const windowStatus =
        state[appKey].windowStatus === "maximized" ? "normal" : "maximized";

      return {
        ...state,
        [appKey]: {
          ...state[appKey],
          windowStatus,
        },
      };
    },
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
      const zStack = state.zStack.filter((el) => el !== appKey);

      zStack.push(appKey);

      return {
        ...state,
        zStack,
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
  openApplication,
  closeApplication,
  maximizeApplication,
  minMaxApplication,
  updateActiveTitle,
  updateZStack,
  resetApplicationState,
} = applicationSlice.actions;

export default applicationSlice.reducer;
