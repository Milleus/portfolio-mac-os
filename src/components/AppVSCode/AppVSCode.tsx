import { BsX } from "react-icons/bs";
import { CgArrowsExpandLeft, CgMathMinus } from "react-icons/cg";
import { FC } from "react";

import Window, { dragHandleClass } from "components/Window";
import { ApplicationKeys, updateApplication } from "reducers/applicationSlice";
import { useAppDispatch, useAppSelector } from "hooks";

const AppVSCode: FC<Record<string, never>> = () => {
  const { vscode } = useAppSelector((state) => state.application);
  const dispatch = useAppDispatch();
  const isMaximized = vscode.windowStatus === "maximized";

  const handleBarDoubleClick = () => {
    dispatch(
      updateApplication({
        appKey: ApplicationKeys.VSCODE,
        status: { windowStatus: "maximized" },
      })
    );
  };

  const handleCloseClick = () => {
    dispatch(
      updateApplication({
        appKey: ApplicationKeys.VSCODE,
        status: { isOpen: false, windowStatus: "normal" },
      })
    );
  };

  const handleMinimizeClick = () => {
    // do nothing for now
  };

  const handleMaximizeClick = () => {
    const windowStatus = isMaximized ? "normal" : "maximized";

    dispatch(
      updateApplication({
        appKey: ApplicationKeys.VSCODE,
        status: { windowStatus },
      })
    );
  };

  return (
    <Window isMaximized={isMaximized}>
      <div
        className={`${dragHandleClass} relative h-6 bg-neutral-700 text-center`}
        onDoubleClick={handleBarDoubleClick}
      >
        <div className="absolute h-6 flex items-center mx-2 space-x-2 group">
          <button
            className="w-3 h-3 flex justify-center items-center rounded-full bg-red-500"
            onClick={handleCloseClick}
          >
            <BsX className="invisible group-hover:visible" />
          </button>

          <button
            className="w-3 h-3 flex justify-center items-center rounded-full bg-amber-500"
            onClick={handleMinimizeClick}
          >
            <CgMathMinus className="invisible group-hover:visible" />
          </button>

          <button
            className="w-3 h-3 flex justify-center items-center rounded-full bg-green-500"
            onClick={handleMaximizeClick}
          >
            <CgArrowsExpandLeft className="invisible group-hover:visible p-0.5" />
          </button>
        </div>
        <span className="font-semibold text-white text-sm">
          Visual Studio Code
        </span>
      </div>

      <div
        className="w-full overflow-y-hidden"
        style={{ height: "calc(100% - 1.5rem)" }} // offset h-6, height of drag handle
      >
        <iframe
          className="w-full h-full bg-neutral-800"
          title="Visual Studio Code"
          frameBorder={0}
          src="https://github1s.com/Milleus/portfolio-mac-os/blob/main/README.md"
        />
      </div>
    </Window>
  );
};

export default AppVSCode;
