import { CSSProperties, FC, useMemo } from "react";
import { IoShieldHalfOutline } from "react-icons/io5";
import classNames from "classnames";

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
import LinkTelegram from "./images/link-telegram.png";
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
    label: "Telegram",
    imgSrc: LinkTelegram,
    link: "https://t.me/milleus",
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
    label: "Notpron by David Münnich",
    imgSrc: LinkNotpron,
    link: "http://notpron.org/notpron/",
  },
];

export type AppSafariContentProps = {
  isWifiOn: boolean;
  isStartPage: boolean;
  prevSearchValue: string;
  width: number;
  style: CSSProperties;
};

const AppSafariContent: FC<AppSafariContentProps> = ({
  isWifiOn,
  isStartPage,
  prevSearchValue,
  width,
  style,
}) => {
  const randomTrackers = useMemo(() => Math.floor(Math.random() * 99) + 1, []);

  const renderStartPage = () => {
    const sectionClasses = {
      "grid gap-x-4": true,
      "grid-cols-[repeat(6,_minmax(0,_4rem))]": width <= 814,
      "grid-cols-[repeat(9,_minmax(0,_4rem))]": width > 814 && width <= 1330,
      "grid-cols-[repeat(12,_minmax(0,_4rem))]": width > 1330,
    };

    return (
      <div
        className="w-full bg-neutral-200/90 backdrop-blur-lg overflow-y-auto dark:bg-neutral-800/90"
        style={style}
      >
        <div className="w-full h-max flex flex-col justify-center items-center text-neutral-700 px-3 mx-auto my-16 dark:text-neutral-100">
          <div className={classNames(sectionClasses)}>
            <p className="col-span-full text-xl font-extrabold tracking-wide mb-3.5">
              Favourites
            </p>
            {favouriteItems.map((item, index) => {
              return (
                <Link
                  key={`favourites-${index}`}
                  href={item.link}
                  className="mb-1.5"
                >
                  <img
                    src={item.imgSrc}
                    alt={`${item.label} link`}
                    className="w-16 h-16 rounded-lg shadow-md"
                  />
                  <p className="w-16 h-8 text-xs text-center break-words line-clamp-2 mt-1.5">
                    {item.label}
                  </p>
                </Link>
              );
            })}

            <p className="col-span-full text-xl font-extrabold tracking-wide mb-3.5">
              Frequently Visited
            </p>
            {frequentlyVisitedItems.map((item, index) => {
              return (
                <Link
                  key={`frequently-visited-${index}`}
                  href={item.link}
                  className="mb-1.5"
                >
                  <img
                    src={item.imgSrc}
                    alt={`${item.label} link`}
                    className="w-16 h-16 rounded-lg shadow-md"
                  />
                  <p className="w-16 h-8 text-xs text-center break-words line-clamp-2 mt-1.5">
                    {item.label}
                  </p>
                </Link>
              );
            })}

            <p className="col-span-full text-xl font-extrabold tracking-wide mt-8 mb-3.5">
              Privacy Report
            </p>
            <div className="col-span-full flex items-center bg-neutral-100 rounded-lg shadow-md p-5 dark:bg-neutral-600">
              <div className="w-7 h-7">
                <IoShieldHalfOutline className="w-7 h-7 text-neutral-500 dark:text-neutral-300" />
              </div>
              <p className="text-lg ml-3">{randomTrackers}</p>
              <p className="text-xs tracking-wide ml-5">
                In the last seven days, Safari has prevented {randomTrackers}{" "}
                trackers from profiling you and hidden your IP address from
                known trackers.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSearchPage = () => {
    return (
      <iframe
        className="w-full h-full bg-white"
        style={style}
        title="Safari Browser"
        frameBorder="0"
        src={`https://www.bing.com/search?q=${prevSearchValue}`}
      />
    );
  };

  const renderOfflinePage = () => {
    return (
      <div
        className="w-full flex flex-col justify-center items-center bg-neutral-100"
        style={style}
      >
        <div className="w-1/2 text-center">
          <p className="text-[1.75rem] text-neutral-500 leading-tight font-bold mb-3">
            You Are Not Connected to the Internet
          </p>
          <p className="text-[0.8rem] text-neutral-500 tracking-wide mb-3">
            This page can't be displayed because your computer is currently
            offline.
          </p>
        </div>
      </div>
    );
  };

  return isWifiOn
    ? isStartPage
      ? renderStartPage()
      : renderSearchPage()
    : renderOfflinePage();
};

export default AppSafariContent;
