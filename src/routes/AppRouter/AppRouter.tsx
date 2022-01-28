import { FC } from "react";

import { Page } from "reducers/systemSlice";
import { updateSystem } from "reducers";
import { useAppDispatch, useAppSelector, useInterval } from "hooks";
import Boot from "pages/Boot";
import Desktop from "pages/Desktop";
import Login from "pages/Login";

const AppRouter: FC<Record<string, never>> = () => {
  const { activePage } = useAppSelector((state) => state.system);
  const dispatch = useAppDispatch();

  useInterval(() => {
    dispatch(updateSystem({ date: new Date().toISOString() }));
  }, 60 * 1000);

  switch (activePage) {
    case Page.LOGIN:
      return <Login />;

    case Page.DESKTOP:
      return <Desktop />;

    case Page.BOOT_SLEEP:
    case Page.BOOT_RESTART:
    case Page.BOOT_SHUT_DOWN:
      return <Boot />;
  }
};

export default AppRouter;
