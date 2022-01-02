import { FC } from "react";

import Link from "base-components/Link";
import LinkBundlephobia from "./images/link-bundlephobia.png";
import LinkCanIUse from "./images/link-can-i-use.png";
import LinkCodePen from "./images/link-codepen.png";
import LinkCSSTricks from "./images/link-css-tricks.png";
import LinkDeveloperRoadmaps from "./images/link-developer-roadmaps.png";
import LinkGitHub from "./images/link-github.png";
import LinkGmail from "./images/link-gmail.png";
import LinkJSPaint from "./images/link-js-paint.png";
import LinkLinkedIn from "./images/link-linkedin.png";
import LinkMDNWebDocs from "./images/link-mdn-web-docs.png";
import LinkNotpron from "./images/link-notpron.png";
import LinkProjectFugu from "./images/link-project-fugu.png";
import LinkReddit from "./images/link-reddit.png";
import LinkTailwindCSS from "./images/link-tailwind-css.png";
import LinkTwitch from "./images/link-twitch.png";
import LinkTwitter from "./images/link-twitter.png";
import LinkYouTube from "./images/link-youtube.png";

type LinkItem = {
  label: string;
  imgSrc: string;
  link: string;
};

const favouriteItems: Array<LinkItem> = [
  {
    label: "CodePen",
    imgSrc: LinkCodePen,
    link: "https://codepen.io/Milleus",
  },
  {
    label: "GitHub",
    imgSrc: LinkGitHub,
    link: "https://github.com/Milleus",
  },
  {
    label: "LinkedIn",
    imgSrc: LinkLinkedIn,
    link: "https://www.linkedin.com/in/milleus/",
  },
  {
    label: "Twitter",
    imgSrc: LinkTwitter,
    link: "https://twitter.com/milleus",
  },
  {
    label: "Gmail",
    imgSrc: LinkGmail,
    link: "mailto:quahdave@gmail.com",
  },
];

const frequentlyVisitedItems: Array<LinkItem> = [
  {
    label: "Twitch",
    imgSrc: LinkTwitch,
    link: "https://www.twitch.tv/",
  },
  {
    label: "Reddit",
    imgSrc: LinkReddit,
    link: "https://www.reddit.com/",
  },
  {
    label: "Gmail",
    imgSrc: LinkGmail,
    link: "https://www.google.com/gmail/",
  },
  {
    label: "YouTube",
    imgSrc: LinkYouTube,
    link: "https://www.youtube.com",
  },
  {
    label: "GitHub",
    imgSrc: LinkGitHub,
    link: "https://github.com/",
  },
  {
    label: "CSS-Tricks",
    imgSrc: LinkCSSTricks,
    link: "https://css-tricks.com",
  },
  {
    label: "Tailwind CSS",
    imgSrc: LinkTailwindCSS,
    link: "https://tailwindcss.com",
  },
  {
    label: "CodePen",
    imgSrc: LinkCodePen,
    link: "https://codepen.io/",
  },
  {
    label: "Can I use",
    imgSrc: LinkCanIUse,
    link: "https://caniuse.com",
  },
  {
    label: "MDN Web Docs",
    imgSrc: LinkMDNWebDocs,
    link: "https://developer.mozilla.org/",
  },
  {
    label: "Fugu API Tracker",
    imgSrc: LinkProjectFugu,
    link: "https://fugu-tracker.web.app",
  },
  {
    label: "JSPaint",
    imgSrc: LinkJSPaint,
    link: "https://jspaint.app",
  },
  {
    label: "Bundlephobia",
    imgSrc: LinkBundlephobia,
    link: "https://bundlephobia.com/",
  },
  {
    label: "Developer Roadmaps",
    imgSrc: LinkDeveloperRoadmaps,
    link: "https://roadmap.sh",
  },
  {
    label: "Notpron by David Munnich",
    imgSrc: LinkNotpron,
    link: "http://notpron.org/notpron/",
  },
];

export type AppSafariStartProps = {
  sectionClassName: string;
};

const AppSafariStart: FC<AppSafariStartProps> = ({ sectionClassName }) => {
  return (
    <div className="w-max h-full py-36 px-3 mx-auto">
      <p className="text-xl font-extrabold tracking-wide mb-3.5">Favourites</p>
      <div className={sectionClassName}>
        {favouriteItems.map((item, index) => {
          return (
            <Link key={`favourites-${index}`} href={item.link}>
              <img
                src={item.imgSrc}
                alt={`${item.label} link`}
                className="w-16 h-16 rounded-lg shadow-md"
              />
              <p className="w-16 h-8 text-xs text-center break-words line-clamp-2 my-1.5">
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>

      <p className="text-xl font-extrabold tracking-wide mb-3.5">
        Frequently Visited
      </p>
      <div className={sectionClassName}>
        {frequentlyVisitedItems.map((item, index) => {
          return (
            <Link key={`frequently-visited-${index}`} href={item.link}>
              <img
                src={item.imgSrc}
                alt={`${item.label} link`}
                className="w-16 h-16 rounded-lg shadow-md"
              />
              <p className="w-16 h-8 text-xs text-center break-words line-clamp-2 my-1.5">
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AppSafariStart;
