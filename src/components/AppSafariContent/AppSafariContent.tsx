import { CSSProperties, FC, useMemo } from "react";
import { IoShieldHalfOutline } from "react-icons/io5";
import classNames from "classnames";

import { favouriteItems, frequentlyVisitedItems } from "./config";
import Link from "base-components/Link";
import ImageWithFallback from "base-components/ImageWithFallback";

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
                  <ImageWithFallback
                    src={item.imgSrc}
                    fallbackSrc={item.fallbackImgSrc}
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
                  <ImageWithFallback
                    src={item.imgSrc}
                    fallbackSrc={item.fallbackImgSrc}
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
