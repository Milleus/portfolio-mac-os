import { FC } from "react";

import { Page, updateSystem } from "reducers/systemSlice";
import { useAppDispatch } from "hooks";
import Button, { ButtonAppearance } from "base-components/Button";

const MenuApple: FC<Record<string, never>> = () => {
  const dispatch = useAppDispatch();

  const handleSleepClick = () => {
    dispatch(updateSystem({ activePage: Page.BOOT_SLEEP }));
  };

  const handleRestartClick = () => {
    dispatch(updateSystem({ activePage: Page.BOOT_RESTART }));
  };

  const handleShutDownClick = () => {
    dispatch(updateSystem({ activePage: Page.BOOT_SHUT_DOWN }));
  };

  const handleLockScreenClick = () => {
    dispatch(updateSystem({ activePage: Page.LOGIN }));
  };

  const listItems = [
    { label: "About This Mac" },
    { label: undefined },
    { label: "System Preferences..." },
    { label: "App Store..." },
    { label: undefined },
    { label: "Recent Items" },
    { label: undefined },
    { label: "Force Quit..." },
    { label: undefined },
    { label: "Sleep", onClick: handleSleepClick },
    { label: "Restart...", onClick: handleRestartClick },
    { label: "Shut Down...", onClick: handleShutDownClick },
    { label: undefined },
    { label: "Lock Screen", onClick: handleLockScreenClick },
    { label: "Log Out Milleus...", onClick: handleLockScreenClick },
  ];

  return (
    <div className="absolute top-6 left-0 w-60 bg-gray-200/80 p-1 mt-px rounded shadow">
      {listItems.map((item, index) => {
        if (item.label) {
          return (
            <Button
              key={`item-${index}`}
              appearance={ButtonAppearance.MENU_ITEM}
              isActive={false}
              onClick={item.onClick}
            >
              {item.label}
            </Button>
          );
        }

        return (
          <hr key={`hr-${index}`} className="border-gray-400 mx-2.5 my-1" />
        );
      })}
    </div>
  );
};

export default MenuApple;
