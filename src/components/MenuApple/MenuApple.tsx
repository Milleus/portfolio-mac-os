import { FC, MouseEventHandler } from "react";

import { Page, updateSystem } from "reducers/systemSlice";
import { useAppDispatch } from "hooks";
import Button, { ButtonAppearance } from "base-components/Button";

type MenuAppleItem = {
  label: string | null;
  onClick?: MouseEventHandler;
};

const MenuApple: FC<Record<string, never>> = () => {
  const dispatch = useAppDispatch();

  const handleSleepClick = () => {
    dispatch(updateSystem({ activePage: Page.SLEEP, isAudioPlaying: false }));
  };

  const handleRestartClick = () => {
    dispatch(
      updateSystem({ activePage: Page.BOOT_RESTART, isAudioPlaying: false })
    );
  };

  const handleShutDownClick = () => {
    dispatch(
      updateSystem({ activePage: Page.BOOT_SHUT_DOWN, isAudioPlaying: false })
    );
  };

  const handleLockScreenClick = () => {
    dispatch(updateSystem({ activePage: Page.LOGIN, isAudioPlaying: false }));
  };

  const menuAppleItems: Array<MenuAppleItem> = [
    { label: "About This Mac" },
    { label: null },
    { label: "System Preferences..." },
    { label: "App Store..." },
    { label: null },
    { label: "Recent Items" },
    { label: null },
    { label: "Force Quit..." },
    { label: null },
    { label: "Sleep", onClick: handleSleepClick },
    { label: "Restart...", onClick: handleRestartClick },
    { label: "Shut Down...", onClick: handleShutDownClick },
    { label: null },
    { label: "Lock Screen", onClick: handleLockScreenClick },
    { label: "Log Out Milleus...", onClick: handleLockScreenClick },
  ];

  return (
    <ul className="absolute top-6 left-0 w-60 bg-gray-200/90 backdrop-blur-lg p-1 mt-px rounded shadow-md dark:bg-gray-700/90">
      {menuAppleItems.map((item, index) => {
        return (
          <li key={`menu-apple-${index}`}>
            {item.label ? (
              <Button
                appearance={ButtonAppearance.MENU_ITEM}
                onClick={item.onClick}
              >
                {item.label}
              </Button>
            ) : (
              <hr className="border-gray-400 mx-2.5 my-1 dark:border-gray-500" />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default MenuApple;
