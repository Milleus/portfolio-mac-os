import { TypedUseSelectorHook, useSelector } from "react-redux";

import type { RootState } from "../reducers/store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
