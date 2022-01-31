import { FC, MouseEvent } from "react";

import {
  ApplicationKeys,
  openApplication,
  updateActiveTitle,
  updateZStack,
} from "reducers/applicationSlice";
import { dockItems } from "./config";
import { useAppDispatch, useAppSelector } from "hooks";
import Button, { ButtonAppearance } from "base-components/Button";
import ImageWithFallback from "base-components/ImageWithFallback";
import Link from "base-components/Link";
import Tooltip from "base-components/Tooltip";

export const DOCK_HEIGHT_REM = 3.5;

const Dock: FC<Record<string, never>> = () => {
  const applicationState = useAppSelector((state) => state.application);
  const dispatch = useAppDispatch();

  const handleItemClick = (event: MouseEvent<HTMLButtonElement>) => {
    const appKey = event.currentTarget.getAttribute("data-id");

    if (appKey) {
      const newKey = appKey as ApplicationKeys;

      dispatch(updateActiveTitle(newKey));
      dispatch(updateZStack(newKey));
      dispatch(openApplication(newKey));
    }
  };

  return (
    <ul
      className="absolute z-50 bottom-1.5 left-1/2 -translate-x-1/2 flex items-center justify-center bg-gray-50/30 backdrop-blur-lg rounded-2xl p-1 dark:bg-gray-900/30"
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
                    className="flex items-center"
                    dataId={item.appKey}
                    onClick={handleItemClick}
                  >
                    <ImageWithFallback
                      src={item.imgSrc}
                      fallbackSrc={item.fallbackImgSrc}
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
                  <ImageWithFallback
                    src={item.imgSrc}
                    fallbackSrc={item.fallbackImgSrc}
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
