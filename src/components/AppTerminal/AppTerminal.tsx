import { FC } from "react";

import { ApplicationKeys } from "reducers/applicationSlice";
import Window from "components/Window";
import { useAppSelector } from "hooks";
import classNames from "classnames";
import WindowControls from "components/WindowControls";
import WindowBar from "components/WindowBar";

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
      <WindowBar className={classNames(windowBarClasses)}>
        <WindowControls appKey={ApplicationKeys.ITERM} />
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
