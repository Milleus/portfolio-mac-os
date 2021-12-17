import { FC, useState } from "react";

import Desktop from "../../pages/Desktop";
import Login from "../../pages/Login";

const AppRouter: FC<Record<string, never>> = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLoginClick = () => {
    setIsLoggedIn(true);
  };

  switch (isLoggedIn) {
    case true:
      return <Desktop />;
    case false:
    default:
      return <Login onLoginClick={handleLoginClick} />;
  }
};

export default AppRouter;
