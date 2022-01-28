import { FC, MouseEvent } from "react";

import { ApplicationKeys, updateApplication } from "reducers/applicationSlice";
import { useAppDispatch, useAppSelector } from "hooks";
import AppFaceTime from "./images/app-facetime.png";
import AppGitHub from "./images/app-github.png";
import AppITerm from "./images/app-iterm.png";
import AppLaunchpad from "./images/app-launchpad.png";
import AppMail from "./images/app-mail.png";
import AppNotes from "./images/app-notes.png";
import AppSafari from "./images/app-safari.png";
import AppSiri from "./images/app-siri.png";
import AppVSCode from "./images/app-vscode.png";
import Button, { ButtonAppearance } from "base-components/Button";
import Link from "base-components/Link";
import Tooltip from "base-components/Tooltip";

export const DOCK_HEIGHT_REM = 3.5;

type DockItem = {
  label: string;
  imgSrc: string;
  appKey?: ApplicationKeys;
  link?: string;
};

const dockItems: Array<DockItem> = [
  {
    label: "Launchpad",
    imgSrc: AppLaunchpad,
    appKey: ApplicationKeys.LAUNCHPAD,
  },
  {
    label: "Notes",
    imgSrc: AppNotes,
    appKey: ApplicationKeys.NOTES,
  },
  {
    label: "Visual Studio Code",
    imgSrc: AppVSCode,
    appKey: ApplicationKeys.VSCODE,
  },
  {
    label: "ITerm",
    imgSrc: AppITerm,
    appKey: ApplicationKeys.ITERM,
  },
  {
    label: "Safari",
    imgSrc: AppSafari,
    appKey: ApplicationKeys.SAFARI,
  },
  {
    label: "FaceTime",
    imgSrc: AppFaceTime,
    appKey: ApplicationKeys.FACETIME,
  },
  {
    label: "Siri",
    imgSrc: AppSiri,
    appKey: ApplicationKeys.FACETIME,
  },
  {
    label: "Mail",
    imgSrc: AppMail,
    link: "mailto:quahdave@gmail.com",
  },
  {
    label: "GitHub",
    imgSrc: AppGitHub,
    link: "https://github.com/Milleus/portfolio-mac-os",
  },
];

const Dock: FC<Record<string, never>> = () => {
  const applicationState = useAppSelector((state) => state.application);
  const dispatch = useAppDispatch();

  const handleItemClick = (event: MouseEvent<HTMLButtonElement>) => {
    const appKey = event.currentTarget.getAttribute("data-id");

    appKey &&
      dispatch(
        updateApplication({
          appKey: appKey as ApplicationKeys,
          status: { isOpen: true, windowStatus: "normal" },
        })
      );
  };

  return (
    <ul
      className="absolute z-40 bottom-1.5 left-1/2 -translate-x-1/2 flex items-center justify-center bg-gray-50/30 backdrop-blur-lg rounded-2xl p-1 dark:bg-gray-900/30"
      style={{ height: `${DOCK_HEIGHT_REM}rem` }}
    >
      {dockItems.map((item, index) => {
        return (
          <li key={`dock-${index}`} className="relative">
            <Tooltip content={item.label}>
              {item.appKey ? (
                <>
                  <Button
                    appearance={ButtonAppearance.DEFAULT}
                    dataId={item.appKey}
                    onClick={handleItemClick}
                  >
                    <img
                      src={item.imgSrc}
                      alt={`${item.label} app`}
                      className="w-12 h-12"
                    />
                  </Button>
                  {applicationState[item.appKey].isOpen && (
                    <div className="absolute bottom-0 left-0 right-0 w-1 h-1 rounded-full bg-gray-900/70 mx-auto -mb-0.5 dark:bg-gray-50/70"></div>
                  )}
                </>
              ) : (
                <Link href={item.link}>
                  <img
                    src={item.imgSrc}
                    alt={`${item.label} app`}
                    className="w-12 h-12"
                  />
                </Link>
              )}
            </Tooltip>
          </li>
        );
      })}
    </ul>
  );
};

export default Dock;
