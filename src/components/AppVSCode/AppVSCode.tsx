import { FC } from "react";

import Window from "components/Window";
import { ApplicationKeys } from "reducers/applicationSlice";

const AppVSCode: FC<Record<string, never>> = () => {
  return (
    <Window appKey={ApplicationKeys.VSCODE} title="Visual Studio Code">
      <iframe
        className="w-full h-full bg-neutral-800"
        title="Visual Studio Code"
        frameBorder={0}
        src="https://github1s.com/Milleus/portfolio-mac-os/blob/main/README.md"
      />
    </Window>
  );
};

export default AppVSCode;
