import LinkBundlephobiaPng from "./images/link-bundlephobia.png";
import LinkBundlephobiaWebp from "./images/link-bundlephobia.webp";
import LinkCanIUsePng from "./images/link-can-i-use.png";
import LinkCanIUseWebp from "./images/link-can-i-use.webp";
import LinkCodePenPng from "./images/link-codepen.png";
import LinkCodePenWebp from "./images/link-codepen.webp";
import LinkCSSTricksPng from "./images/link-css-tricks.png";
import LinkCSSTricksWebp from "./images/link-css-tricks.webp";
import LinkDeveloperRoadmapsPng from "./images/link-developer-roadmaps.png";
import LinkDeveloperRoadmapsWebp from "./images/link-developer-roadmaps.webp";
import LinkGitHubPng from "./images/link-github.png";
import LinkGitHubWebp from "./images/link-github.webp";
import LinkGmailPng from "./images/link-gmail.png";
import LinkGmailWebp from "./images/link-gmail.webp";
import LinkJSPaintPng from "./images/link-js-paint.png";
import LinkJSPaintWebp from "./images/link-js-paint.webp";
import LinkLinkedInPng from "./images/link-linkedin.png";
import LinkLinkedInWebp from "./images/link-linkedin.webp";
import LinkMDNWebDocsPng from "./images/link-mdn-web-docs.png";
import LinkMDNWebDocsWebp from "./images/link-mdn-web-docs.webp";
import LinkNotpronPng from "./images/link-notpron.png";
import LinkNotpronWebp from "./images/link-notpron.webp";
import LinkProjectFuguPng from "./images/link-project-fugu.png";
import LinkProjectFuguWebp from "./images/link-project-fugu.webp";
import LinkRedditPng from "./images/link-reddit.png";
import LinkRedditWebp from "./images/link-reddit.webp";
import LinkTailwindCSSPng from "./images/link-tailwind-css.png";
import LinkTailwindCSSWebp from "./images/link-tailwind-css.webp";
import LinkTelegramPng from "./images/link-telegram.png";
import LinkTelegramWebp from "./images/link-telegram.webp";
import LinkTwitchPng from "./images/link-twitch.png";
import LinkTwitchWebp from "./images/link-twitch.webp";
import LinkTwitterPng from "./images/link-twitter.png";
import LinkTwitterWebp from "./images/link-twitter.webp";
import LinkYouTubePng from "./images/link-youtube.png";
import LinkYouTubeWebp from "./images/link-youtube.webp";

type LinkItem = {
  label: string;
  imgSrc: string;
  fallbackImgSrc: string;
  link: string;
};

export const favouriteItems: Array<LinkItem> = [
  {
    label: "CodePen",
    imgSrc: LinkCodePenWebp,
    fallbackImgSrc: LinkCodePenPng,
    link: "https://codepen.io/Milleus",
  },
  {
    label: "GitHub",
    imgSrc: LinkGitHubWebp,
    fallbackImgSrc: LinkGitHubPng,
    link: "https://github.com/Milleus",
  },
  {
    label: "LinkedIn",
    imgSrc: LinkLinkedInWebp,
    fallbackImgSrc: LinkLinkedInPng,
    link: "https://www.linkedin.com/in/milleus/",
  },
  {
    label: "Twitter",
    imgSrc: LinkTwitterWebp,
    fallbackImgSrc: LinkTwitterPng,
    link: "https://twitter.com/milleus",
  },
  {
    label: "Telegram",
    imgSrc: LinkTelegramWebp,
    fallbackImgSrc: LinkTelegramPng,
    link: "https://t.me/milleus",
  },
  {
    label: "Gmail",
    imgSrc: LinkGmailWebp,
    fallbackImgSrc: LinkGmailPng,
    link: "mailto:quahdave@gmail.com",
  },
];

export const frequentlyVisitedItems: Array<LinkItem> = [
  {
    label: "Twitch",
    imgSrc: LinkTwitchWebp,
    fallbackImgSrc: LinkTwitchPng,
    link: "https://www.twitch.tv/",
  },
  {
    label: "Reddit",
    imgSrc: LinkRedditWebp,
    fallbackImgSrc: LinkRedditPng,
    link: "https://www.reddit.com/",
  },
  {
    label: "Gmail",
    imgSrc: LinkGmailWebp,
    fallbackImgSrc: LinkGmailPng,
    link: "https://www.google.com/gmail/",
  },
  {
    label: "YouTube",
    imgSrc: LinkYouTubeWebp,
    fallbackImgSrc: LinkYouTubePng,
    link: "https://www.youtube.com",
  },
  {
    label: "GitHub",
    imgSrc: LinkGitHubWebp,
    fallbackImgSrc: LinkGitHubPng,
    link: "https://github.com/",
  },
  {
    label: "CSS-Tricks",
    imgSrc: LinkCSSTricksWebp,
    fallbackImgSrc: LinkCSSTricksPng,
    link: "https://css-tricks.com",
  },
  {
    label: "Tailwind CSS",
    imgSrc: LinkTailwindCSSWebp,
    fallbackImgSrc: LinkTailwindCSSPng,
    link: "https://tailwindcss.com",
  },
  {
    label: "CodePen",
    imgSrc: LinkCodePenWebp,
    fallbackImgSrc: LinkCodePenPng,
    link: "https://codepen.io/",
  },
  {
    label: "Can I use",
    imgSrc: LinkCanIUseWebp,
    fallbackImgSrc: LinkCanIUsePng,
    link: "https://caniuse.com",
  },
  {
    label: "MDN Web Docs",
    imgSrc: LinkMDNWebDocsWebp,
    fallbackImgSrc: LinkMDNWebDocsPng,
    link: "https://developer.mozilla.org/",
  },
  {
    label: "Fugu API Tracker",
    imgSrc: LinkProjectFuguWebp,
    fallbackImgSrc: LinkProjectFuguPng,
    link: "https://fugu-tracker.web.app",
  },
  {
    label: "JSPaint",
    imgSrc: LinkJSPaintWebp,
    fallbackImgSrc: LinkJSPaintPng,
    link: "https://jspaint.app",
  },
  {
    label: "Bundlephobia",
    imgSrc: LinkBundlephobiaWebp,
    fallbackImgSrc: LinkBundlephobiaPng,
    link: "https://bundlephobia.com/",
  },
  {
    label: "Developer Roadmaps",
    imgSrc: LinkDeveloperRoadmapsWebp,
    fallbackImgSrc: LinkDeveloperRoadmapsPng,
    link: "https://roadmap.sh",
  },
  {
    label: "Notpron by David Münnich",
    imgSrc: LinkNotpronWebp,
    fallbackImgSrc: LinkNotpronPng,
    link: "http://notpron.org/notpron/",
  },
];
