import { BsApple } from "react-icons/bs";
import { FC, useState } from "react";

import { Page, updateSystem } from "reducers/systemSlice";
import { useAppDispatch, useAppSelector, useInterval } from "hooks";

const Boot: FC<Record<string, never>> = () => {
  const { activePage } = useAppSelector((state) => state.system);
  const dispatch = useAppDispatch();
  const [isBooting, setIsBooting] = useState<boolean>(
    activePage === Page.BOOT_RESTART ? true : false
  );
  const [bootProgress, setBootProgress] = useState<number>(0);

  const handlePageLoad = () => {
    setTimeout(() => {
      dispatch(updateSystem({ activePage: Page.LOGIN }));
    }, 1000);
  };

  const handleClick = () => {
    !isBooting && setIsBooting(true);
  };

  useInterval(
    () => {
      bootProgress >= 100
        ? handlePageLoad()
        : setBootProgress(bootProgress + 1);
    },
    isBooting ? 40 : null
  );

  return (
    <button
      className="w-full h-full flex flex-col justify-center items-center bg-black cursor-default"
      onClick={handleClick}
    >
      <BsApple className="w-24 h-24 text-white mb-20" />
      {isBooting && (
        <div
          data-testid="boot-progress-bar"
          className="w-60 h-1.5 bg-white/20 rounded-full overflow-hidden"
          style={{ boxShadow: "inset 0 0 0 1px rgb(255, 255, 255, 0.1)" }}
        >
          <div
            className="h-full bg-gray-200"
            style={{ width: `${bootProgress.toString()}%` }}
          ></div>
        </div>
      )}
      {!isBooting && (
        <span className="h-1.5 text-white">
          Click anywhere to{" "}
          {activePage === Page.BOOT_SLEEP ? "wake up" : "boot up"}
        </span>
      )}
    </button>
  );
};

export default Boot;
