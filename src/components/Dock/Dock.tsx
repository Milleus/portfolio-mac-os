import { FC, MouseEventHandler } from "react";

import { updateApplication } from "reducers/applicationSlice";
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

type DockItem = {
  label: string;
  imgSrc: string;
  isActive?: boolean;
  onClick?: MouseEventHandler;
  link?: string;
};

const Dock: FC<Record<string, never>> = () => {
  const {
    isLaunchpadOpen,
    isNotesOpen,
    isVSCodeOpen,
    isITermOpen,
    isSafariOpen,
    isFaceTimeOpen,
  } = useAppSelector((state) => state.application);
  const dispatch = useAppDispatch();

  const handleLaunchpadClick = () => {
    dispatch(updateApplication({ isLaunchpadOpen: true }));
  };

  const handleNotesClick = () => {
    dispatch(updateApplication({ isNotesOpen: true }));
  };

  const handleAppVSCodeClick = () => {
    dispatch(updateApplication({ isVSCodeOpen: true }));
  };

  const handleITermClick = () => {
    dispatch(updateApplication({ isITermOpen: true }));
  };

  const handleSafariClick = () => {
    dispatch(updateApplication({ isSafariOpen: true }));
  };

  const handleFaceTimeClick = () => {
    dispatch(updateApplication({ isFaceTimeOpen: true }));
  };

  const dockItems: Array<DockItem> = [
    {
      label: "Launchpad",
      imgSrc: AppLaunchpad,
      isActive: isLaunchpadOpen,
      onClick: handleLaunchpadClick,
    },
    {
      label: "Notes",
      imgSrc: AppNotes,
      isActive: isNotesOpen,
      onClick: handleNotesClick,
    },
    {
      label: "Visual Studio Code",
      imgSrc: AppVSCode,
      isActive: isVSCodeOpen,
      onClick: handleAppVSCodeClick,
    },
    {
      label: "ITerm",
      imgSrc: AppITerm,
      isActive: isITermOpen,
      onClick: handleITermClick,
    },
    {
      label: "Safari",
      imgSrc: AppSafari,
      isActive: isSafariOpen,
      onClick: handleSafariClick,
    },
    {
      label: "FaceTime",
      imgSrc: AppFaceTime,
      isActive: isFaceTimeOpen,
      onClick: handleFaceTimeClick,
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

  return (
    <div className="absolute bottom-1.5 left-0 right-0 flex justify-center">
      <ul className="flex items-center justify-center bg-white/40 rounded-2xl p-1">
        {dockItems.map((item, index) => {
          return (
            <li key={`dock-${index}`} className="relative">
              {item.link ? (
                <a href={item.link} target="_blank" rel="noreferrer">
                  <img
                    src={item.imgSrc}
                    alt={`${item.label} app`}
                    className="w-12 h-12"
                  />
                </a>
              ) : (
                <>
                  <Button
                    appearance={ButtonAppearance.TRANSPARENT}
                    isActive={false}
                    onClick={item.onClick}
                  >
                    <img
                      src={item.imgSrc}
                      alt={`${item.label} app`}
                      className="w-12 h-12"
                    />
                  </Button>
                  {item.isActive && (
                    <div className="absolute bottom-0 left-0 right-0 w-1 h-1 rounded-full bg-black mx-auto -mb-0.5"></div>
                  )}
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Dock;
