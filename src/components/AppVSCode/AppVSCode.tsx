import { FC } from "react";

import Window from "components/Window";

const AppVSCode: FC<Record<string, never>> = () => {
  const handleCloseClick = () => {
    // do nothing for now
  };

  const handleMinimizeClick = () => {
    // do nothing for now
  };

  const handleMaximizeClick = () => {
    // do nothing for now
  };

  return (
    <Window
      title="Visual Studio Code"
      onCloseClick={handleCloseClick}
      onMinimizeClick={handleMinimizeClick}
      onMaximizeClick={handleMaximizeClick}
    >
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
