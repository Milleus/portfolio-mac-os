import { FC, MouseEvent } from "react";

import { ApplicationState, updateApplication } from "reducers/applicationSlice";
import { useAppDispatch, useAppSelector } from "hooks";
import AppFaceTime from "./images/app-facetime.png";
import AppGitHub from "./images/app-github.png";
import AppITerm from "./images/app-iterm.png";
import AppLaunchpad from "./images/app-launchpad.png";
import AppMail from "./images/app-mail.png";
import AppNotes from "./images/app-notes.png";
import AppSafari from "./images/app-safari.png";
import AppVSCode from "./images/app-vscode.png";
import Button, { ButtonAppearance } from "base-components/Button";
import Tooltip from "base-components/Tooltip";

export const HEIGHT_DOCK_REM = 3.5;

type DockItem = {
  label: string;
  imgSrc: string;
  appKey?: keyof ApplicationState;
  link?: string;
};

const dockItems: Array<DockItem> = [
  { label: "Launchpad", imgSrc: AppLaunchpad, appKey: "isLaunchpadOpen" },
  { label: "Notes", imgSrc: AppNotes, appKey: "isNotesOpen" },
  { label: "Visual Studio Code", imgSrc: AppVSCode, appKey: "isVSCodeOpen" },
  { label: "ITerm", imgSrc: AppITerm, appKey: "isITermOpen" },
  { label: "Safari", imgSrc: AppSafari, appKey: "isSafariOpen" },
  { label: "FaceTime", imgSrc: AppFaceTime, appKey: "isFaceTimeOpen" },
  { label: "Mail", imgSrc: AppMail, link: "mailto:quahdave@gmail.com" },
  {
    label: "GitHub",
    imgSrc: AppGitHub,
    link: "https://github.com/Milleus/portfolio-mac-os",
  },
];

const Dock: FC<Record<string, never>> = () => {
  const applicationState = useAppSelector((state) => state.application);
  const dispatch = useAppDispatch();

  const handleItemClick = (event: MouseEvent) => {
    const appKey = event.currentTarget.getAttribute("data-id");

    appKey && dispatch(updateApplication({ [appKey]: true }));
  };

  return (
    <ul
      className="absolute z-50 bottom-1.5 left-1/2 -translate-x-1/2 flex items-center justify-center bg-white/40 backdrop-blur rounded-2xl p-1"
      style={{ height: `${HEIGHT_DOCK_REM}rem` }}
    >
      {dockItems.map((item, index) => {
        return (
          <li key={`dock-${index}`} className="relative">
            <Tooltip content={item.label}>
              {item.appKey ? (
                <>
                  <Button
                    appearance={ButtonAppearance.TRANSPARENT}
                    dataId={item.appKey}
                    onClick={handleItemClick}
                  >
                    <img
                      src={item.imgSrc}
                      alt={`${item.label} app`}
                      className="w-12 h-12"
                    />
                  </Button>
                  {applicationState[item.appKey] && (
                    <div className="absolute bottom-0 left-0 right-0 w-1 h-1 rounded-full bg-black mx-auto -mb-0.5"></div>
                  )}
                </>
              ) : (
                <a href={item.link} target="_blank" rel="noreferrer">
                  <img
                    src={item.imgSrc}
                    alt={`${item.label} app`}
                    className="w-12 h-12"
                  />
                </a>
              )}
            </Tooltip>
          </li>
        );
      })}
    </ul>
  );
};

export default Dock;
