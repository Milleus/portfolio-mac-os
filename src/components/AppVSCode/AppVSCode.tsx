import { FC } from "react";

import { ApplicationKeys } from "reducers/applicationSlice";
import Window from "components/Window";
import WindowBar from "components/WindowBar";

const AppVSCode: FC<Record<string, never>> = () => {
  return (
    <Window appKey={ApplicationKeys.VSCODE}>
      <WindowBar className="relative h-6 flex items-stretch bg-neutral-700">
        <p className="absolute pointer-events-none w-full h-full flex justify-center items-center text-gray-300 text-xs">
          Visual Studio Code
        </p>
      </WindowBar>

      <div
        className="w-full overflow-y-hidden"
        style={{ height: "calc(100% - 1.5rem)" }} // offset h-6, height of window bar
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
