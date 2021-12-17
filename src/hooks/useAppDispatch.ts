import { useDispatch } from "react-redux";

import type { AppDispatch } from "../reducers/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
