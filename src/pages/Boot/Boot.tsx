import { BsApple } from "react-icons/bs";
import { FC, useState } from "react";

import { Page, updateSystem } from "reducers/systemSlice";
import { resetApplicationState } from "reducers/applicationSlice";
import { useAppDispatch, useAppSelector, useInterval } from "hooks";

enum BootStatus {
  NOT_BOOTED,
  BOOTING,
  BOOTED,
}

const Boot: FC<Record<string, never>> = () => {
  const { activePage } = useAppSelector((state) => state.system);
  const dispatch = useAppDispatch();
  const [bootStatus, setBootStatus] = useState<BootStatus>(
    activePage === Page.BOOT_RESTART
      ? BootStatus.BOOTING
      : BootStatus.NOT_BOOTED
  );
  const [bootProgress, setBootProgress] = useState<number>(0);

  const handlePageLoad = () => {
    setTimeout(() => {
      dispatch(updateSystem({ isFirstLogIn: true, activePage: Page.LOGIN }));
      dispatch(resetApplicationState());
    }, 1000);
  };

  const handleClick = () => {
    bootStatus === BootStatus.NOT_BOOTED && setBootStatus(BootStatus.BOOTING);
  };

  useInterval(
    () => {
      if (bootProgress >= 100) {
        setBootStatus(BootStatus.BOOTED);
        handlePageLoad();
      } else {
        setBootProgress(bootProgress + 1);
      }
    },
    bootStatus === BootStatus.BOOTING ? 40 : null
  );

  return (
    <div
      className="w-full h-full flex flex-col justify-center items-center bg-black text-white"
      onClick={handleClick}
    >
      <BsApple className="w-24 h-24 mb-20" />
      {bootStatus === BootStatus.NOT_BOOTED ? (
        <span className="h-1.5 cursor-pointer">Click to boot up</span>
      ) : (
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
    </div>
  );
};

export default Boot;
