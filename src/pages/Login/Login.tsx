import { FC } from "react";

import { Page, updateSystem } from "reducers/systemSlice";
import { useAppDispatch } from "hooks";

const Login: FC<Record<string, never>> = () => {
  const dispatch = useAppDispatch();

  const handleLoginClick = () => {
    dispatch(updateSystem({ activePage: Page.DESKTOP }));
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <img
          className="rounded-full"
          src="https://via.placeholder.com/200"
          alt="placeholder"
        />
        <button
          className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
          onClick={handleLoginClick}
        >
          Log in
        </button>
      </div>
    </div>
  );
};

export default Login;
