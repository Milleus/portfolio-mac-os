import { ApplicationKeys } from "reducers/applicationSlice";
import AppFaceTimePng from "./images/app-facetime.png";
import AppFaceTimeWebp from "./images/app-facetime.webp";
import AppGitHubPng from "./images/app-github.png";
import AppGitHubWebp from "./images/app-github.webp";
import AppITermPng from "./images/app-iterm.png";
import AppITermWebp from "./images/app-iterm.webp";
import AppMailPng from "./images/app-mail.png";
import AppMailWebp from "./images/app-mail.webp";
import AppNotesPng from "./images/app-notes.png";
import AppNotesWebp from "./images/app-notes.webp";
import AppSafariPng from "./images/app-safari.png";
import AppSafariWebp from "./images/app-safari.webp";
import AppSiriPng from "./images/app-siri.png";
import AppSiriWebp from "./images/app-siri.webp";
import AppVSCodePng from "./images/app-vscode.png";
import AppVSCodeWebp from "./images/app-vscode.webp";

type DockItem = {
  label: string;
  imgSrc: string;
  fallbackImgSrc: string;
  appKey?: ApplicationKeys;
  link?: string;
};

export const dockItems: Array<DockItem> = [
  {
    label: "Notes",
    imgSrc: AppNotesWebp,
    fallbackImgSrc: AppNotesPng,
    appKey: ApplicationKeys.NOTES,
  },
  {
    label: "Visual Studio Code",
    imgSrc: AppVSCodeWebp,
    fallbackImgSrc: AppVSCodePng,
    appKey: ApplicationKeys.VSCODE,
  },
  {
    label: "iTerm",
    imgSrc: AppITermWebp,
    fallbackImgSrc: AppITermPng,
    appKey: ApplicationKeys.ITERM,
  },
  {
    label: "Safari",
    imgSrc: AppSafariWebp,
    fallbackImgSrc: AppSafariPng,
    appKey: ApplicationKeys.SAFARI,
  },
  {
    label: "FaceTime",
    imgSrc: AppFaceTimeWebp,
    fallbackImgSrc: AppFaceTimePng,
    appKey: ApplicationKeys.FACETIME,
  },
  {
    label: "Siri",
    imgSrc: AppSiriWebp,
    fallbackImgSrc: AppSiriPng,
    appKey: ApplicationKeys.SIRI,
  },
  {
    label: "Mail",
    imgSrc: AppMailWebp,
    fallbackImgSrc: AppMailPng,
    link: "mailto:quahdave@gmail.com",
  },
  {
    label: "GitHub",
    imgSrc: AppGitHubWebp,
    fallbackImgSrc: AppGitHubPng,
    link: "https://github.com/Milleus/portfolio-mac-os",
  },
];
