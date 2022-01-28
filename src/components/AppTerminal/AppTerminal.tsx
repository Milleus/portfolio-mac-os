import { FC } from "react";
import classNames from "classnames";

import { ApplicationKeys } from "reducers/applicationSlice";
import { useAppSelector } from "hooks";
import Window from "components/Window";
import WindowBar from "components/WindowBar";
import WindowControls from "components/WindowControls";

const AppTerminal: FC<Record<string, never>> = () => {
  const { activeTitle, iterm } = useAppSelector((state) => state.application);
  const isAppActive = activeTitle === iterm.shortLabel;

  const windowBarClasses = {
    "relative h-6 flex items-stretch": true,
    "bg-neutral-700 text-gray-300": isAppActive,
    "bg-neutral-800 text-gray-400": !isAppActive,
  };

  return (
    <Window appKey={ApplicationKeys.ITERM}>
      <WindowBar
        appKey={ApplicationKeys.ITERM}
        className={classNames(windowBarClasses)}
      >
        <WindowControls appKey={ApplicationKeys.ITERM} isActive={true} />
        <p>milleus &mdash; -zsh</p>
      </WindowBar>

      <div
        className="w-full h-full bg-neutral-800"
        style={{ height: "calc(100% - 1.5rem)" }} // offset height of window bar
      >
        content
      </div>
    </Window>
  );
};

export default AppTerminal;
