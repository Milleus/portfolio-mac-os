import { FC, useEffect } from "react";

import { Page } from "reducers/systemSlice";
import { updateSystem } from "reducers";
import { useAppDispatch, useAppSelector, useInterval } from "hooks";
import Boot from "pages/Boot";
import Desktop from "pages/Desktop";
import Login from "pages/Login";
import Sleep from "pages/Sleep";

const AppRouter: FC<Record<string, never>> = () => {
  const { activePage } = useAppSelector((state) => state.system);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // check and set dark mode based on system preference
    const isSystemDarkMode = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? true
      : false;
    const rootClassList = document.documentElement.classList;

    isSystemDarkMode ? rootClassList.add("dark") : rootClassList.remove("dark");
    dispatch(updateSystem({ isDarkModeOn: isSystemDarkMode }));
  }, [dispatch]);

  useInterval(() => {
    dispatch(updateSystem({ date: new Date().toISOString() }));
  }, 60 * 1000);

  switch (activePage) {
    case Page.LOGIN:
      return <Login />;

    case Page.DESKTOP:
      return <Desktop />;

    case Page.SLEEP:
      return <Sleep />;

    case Page.BOOT_RESTART:
    case Page.BOOT_SHUT_DOWN:
      return <Boot />;
  }
};

export default AppRouter;
