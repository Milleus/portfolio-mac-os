import { FC, MouseEvent } from "react";

import { Page, updateSystem } from "reducers/systemSlice";
import { useAppDispatch } from "hooks";
import Button, { ButtonAppearance } from "base-components/Button";

type MenuAppleItem = {
  label: string | null;
  page?: Page;
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
  { label: "Sleep", page: Page.SLEEP },
  { label: "Restart...", page: Page.BOOT_RESTART },
  { label: "Shut Down...", page: Page.BOOT_SHUT_DOWN },
  { label: null },
  { label: "Lock Screen", page: Page.LOGIN },
  { label: "Log Out Milleus...", page: Page.LOGIN },
];

const MenuApple: FC<Record<string, never>> = () => {
  const dispatch = useAppDispatch();

  const handleItemClick = (event: MouseEvent<HTMLButtonElement>) => {
    const page = event.currentTarget.getAttribute("data-id");

    page &&
      dispatch(
        updateSystem({ activePage: page as Page, isAudioPlaying: false })
      );
  };

  return (
    <ul className="absolute top-6 left-0 w-60 bg-gray-200/90 backdrop-blur-lg p-1 mt-px rounded shadow-md dark:bg-gray-700/90">
      {menuAppleItems.map((item, index) => {
        return (
          <li key={`menu-apple-${index}`}>
            {item.label ? (
              <Button
                appearance={ButtonAppearance.MENU_ITEM}
                dataId={item.page}
                onClick={handleItemClick}
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
