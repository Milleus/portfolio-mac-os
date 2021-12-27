import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "reducers/store";

export type ApplicationState = {
  isLaunchpadOpen: boolean;
  isNotesOpen: boolean;
  isVSCodeOpen: boolean;
  isITermOpen: boolean;
  isSafariOpen: boolean;
  isFaceTimeOpen: boolean;
};

export const initialState: ApplicationState = {
  isLaunchpadOpen: false,
  isNotesOpen: true,
  isVSCodeOpen: false,
  isITermOpen: false,
  isSafariOpen: false,
  isFaceTimeOpen: false,
};

export const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
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

export const { updateApplication } = applicationSlice.actions;

export const selectApplication = (state: RootState) => {
  return state.application;
};

export default applicationSlice.reducer;
