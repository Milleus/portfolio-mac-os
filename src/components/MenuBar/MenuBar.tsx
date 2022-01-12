import { BsApple, BsToggles } from "react-icons/bs";
import { FC, MouseEvent, useRef, useState } from "react";
import { MdSearch, MdWifi, MdWifiOff } from "react-icons/md";
import format from "date-fns/format";

import { useAppSelector, useOutsideClick } from "hooks";
import BatteryIcon from "components/BatteryIcon";
import Button, { ButtonAppearance } from "base-components/Button";
import MenuApple from "components/MenuApple";
import MenuControlCenter from "components/MenuControlCenter";
import MenuWifi from "components/MenuWifi";

export const MENU_BAR_HEIGHT_REM = 1.5;

enum MenuId {
  NONE = "none",
  APPLE = "apple",
  WIFI = "wifi",
  SPOTLIGHT = "spotlight",
  CONTROL_CENTER = "control-center",
}

const MenuBar: FC<Record<string, never>> = () => {
  const { date, isWifiOn } = useAppSelector((state) => state.system);
  const { activeTitle } = useAppSelector((state) => state.application);
  const [activeMenuId, setActiveMenuId] = useState<string>(MenuId.NONE);
  const menuAppleRef = useRef<HTMLDivElement>(null);
  const menuWifiRef = useRef<HTMLDivElement>(null);
  const menuControlCenterRef = useRef<HTMLDivElement>(null);

  const handleItemClick = (event: MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.getAttribute("data-id");
    const newId = id === activeMenuId ? MenuId.NONE : id;

    newId && setActiveMenuId(newId);
  };

  let ref;

  switch (activeMenuId) {
    case MenuId.APPLE:
      ref = menuAppleRef;
      break;

    case MenuId.WIFI:
      ref = menuWifiRef;
      break;

    case MenuId.CONTROL_CENTER:
      ref = menuControlCenterRef;
      break;

    default:
      ref = null;
  }

  useOutsideClick(ref, () => setActiveMenuId(MenuId.NONE));

  return (
    <div
      className="absolute z-50 top-0 w-full flex justify-between items-stretch bg-purple-200/90 px-1.5 dark:bg-purple-800/90"
      style={{ height: `${MENU_BAR_HEIGHT_REM}rem` }}
    >
      <div className="flex">
        <div className="flex relative" ref={menuAppleRef}>
          <Button
            ariaLabel="apple menu"
            appearance={ButtonAppearance.MENU_BAR}
            isToggled={activeMenuId === MenuId.APPLE}
            dataId={MenuId.APPLE}
            onClick={handleItemClick}
          >
            <BsApple className="w-4 h-4 mx-1" />
          </Button>
          {activeMenuId === MenuId.APPLE && <MenuApple />}
        </div>

        <Button appearance={ButtonAppearance.MENU_BAR}>
          <span className="font-bold mx-1">{activeTitle}</span>
        </Button>
      </div>

      <div className="flex">
        <Button appearance={ButtonAppearance.MENU_BAR}>
          <BatteryIcon isValueVisible={true} />
        </Button>

        <div className="flex relative" ref={menuWifiRef}>
          <Button
            ariaLabel="wifi menu"
            appearance={ButtonAppearance.MENU_BAR}
            isToggled={activeMenuId === MenuId.WIFI}
            dataId={MenuId.WIFI}
            onClick={handleItemClick}
          >
            {isWifiOn ? (
              <MdWifi className="w-4.5 h-4.5" />
            ) : (
              <MdWifiOff className="w-4.5 h-4.5" />
            )}
          </Button>
          {activeMenuId === MenuId.WIFI && <MenuWifi />}
        </div>

        <Button
          ariaLabel="spotlight"
          appearance={ButtonAppearance.MENU_BAR}
          isToggled={false}
          dataId={MenuId.SPOTLIGHT}
          onClick={handleItemClick}
        >
          <MdSearch className="w-4.5 h-4.5 mx-1" />
        </Button>

        <div className="flex" ref={menuControlCenterRef}>
          <Button
            ariaLabel="control center menu"
            appearance={ButtonAppearance.MENU_BAR}
            isToggled={activeMenuId === MenuId.CONTROL_CENTER}
            dataId={MenuId.CONTROL_CENTER}
            onClick={handleItemClick}
          >
            <BsToggles className="w-3.5 h-3.5" />
          </Button>
          {activeMenuId === MenuId.CONTROL_CENTER && <MenuControlCenter />}
        </div>

        <Button appearance={ButtonAppearance.MENU_BAR}>
          <span className="mx-1">{format(new Date(date), "eee d MMM")}</span>
          <span className="min-w-0 w-16 mr-1">
            {format(new Date(date), "h:mm aa")}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default MenuBar;
