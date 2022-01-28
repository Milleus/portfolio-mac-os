import { BsApple } from "react-icons/bs";
import { FC } from "react";

import { Page, updateSystem } from "reducers/systemSlice";
import { useAppDispatch } from "hooks";

const Sleep: FC<Record<string, never>> = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(updateSystem({ activePage: Page.LOGIN }));
  };

  return (
    <div
      className="w-full h-full flex flex-col justify-center items-center bg-black text-white"
      onClick={handleClick}
    >
      <BsApple className="w-24 h-24 mb-20" />
      <span className="h-1.5 cursor-pointer">Click to wake up</span>
    </div>
  );
};

export default Sleep;
