import { FC } from "react";

import { ApplicationKeys } from "reducers/applicationSlice";
import Window from "components/Window";
import WindowBar from "components/WindowBar";
import WindowControls from "components/WindowControls";
import { useAppSelector } from "hooks";
import classNames from "classnames";

const AppVSCode: FC<Record<string, never>> = () => {
  const { activeTitle, vscode } = useAppSelector((state) => state.application);
  const isAppActive = activeTitle === vscode.shortLabel;

  const windowBarClasses = {
    "relative h-6 flex items-stretch": true,
    "bg-neutral-700 text-gray-300": isAppActive,
    "bg-neutral-800 text-gray-400": !isAppActive,
  };

  return (
    <Window appKey={ApplicationKeys.VSCODE}>
      <WindowBar className={classNames(windowBarClasses)}>
        <WindowControls
          appKey={ApplicationKeys.VSCODE}
          inactiveColor="bg-neutral-500"
        />
        <p className="absolute w-full h-full flex justify-center items-center text-xs pointer-events-none">
          Visual Studio Code
        </p>
      </WindowBar>

      <iframe
        className="w-full h-full bg-neutral-800"
        style={{ height: "calc(100% - 1.5rem)" }} // offset height of window bar
        title="Visual Studio Code"
        frameBorder="0"
        src="https://github1s.com/Milleus/portfolio-mac-os/blob/main/README.md"
      />
    </Window>
  );
};

export default AppVSCode;
