import { BsApple, BsBatteryFull, BsToggles } from "react-icons/bs";
import { FC, MouseEvent, useRef, useState } from "react";
import { MdSearch, MdWifi, MdWifiOff } from "react-icons/md";
import format from "date-fns/format";

import { useAppSelector, useOutsideClick } from "hooks";
import Button, { ButtonAppearance } from "base-components/Button";
import MenuApple from "components/MenuApple";
import MenuControlCenter from "components/MenuControlCenter";
import MenuWifi from "components/MenuWifi";

export const HEIGHT_MENU_BAR_REM = 1.5;

enum MenuId {
  NONE = "none",
  APPLE = "apple",
  WIFI = "wifi",
  SPOTLIGHT = "spotlight",
  CONTROL_CENTER = "control-center",
}

const MenuBar: FC<Record<string, never>> = () => {
  const { date, isWifiOn } = useAppSelector((state) => state.system);
  const [activeMenuId, setActiveMenuId] = useState<string>(MenuId.NONE);
  const menuAppleRef = useRef<HTMLDivElement>(null);
  const menuWifiRef = useRef<HTMLDivElement>(null);
  const menuControlCenterRef = useRef<HTMLDivElement>(null);

  const handleItemClick = (event: MouseEvent) => {
    const id = event.currentTarget.getAttribute("data-id");
    const newId = id === activeMenuId ? MenuId.NONE : id;

    newId && setActiveMenuId(newId);
  };

  const handleOutsideClick = () => {
    setActiveMenuId(MenuId.NONE);
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

  useOutsideClick(ref, handleOutsideClick);

  return (
    <div
      className="absolute z-40 top-0 w-full flex justify-between items-stretch bg-white/40 backdrop-blur px-1.5"
      style={{ height: `${HEIGHT_MENU_BAR_REM}rem` }}
    >
      <div className="flex">
        <div className="flex relative" ref={menuAppleRef}>
          <Button
            ariaLabel="apple menu toggle"
            appearance={ButtonAppearance.MENU}
            isActive={activeMenuId === MenuId.APPLE}
            dataId={MenuId.APPLE}
            onClick={handleItemClick}
          >
            <BsApple size={16} className="drop-shadow mx-1" />
          </Button>
          {activeMenuId === MenuId.APPLE && <MenuApple />}
        </div>

        <Button appearance={ButtonAppearance.MENU}>
          <span className="font-bold drop-shadow mx-1">Finder</span>
        </Button>
      </div>

      <div className="flex">
        <Button appearance={ButtonAppearance.MENU}>
          <span className="text-xs mr-1">100%</span>
          <BsBatteryFull size={24} className="drop-shadow mr-1" />
        </Button>

        <div className="flex relative" ref={menuWifiRef}>
          <Button
            ariaLabel="wifi menu toggle"
            appearance={ButtonAppearance.MENU}
            isActive={activeMenuId === MenuId.WIFI}
            dataId={MenuId.WIFI}
            onClick={handleItemClick}
          >
            {isWifiOn ? (
              <MdWifi size={18} className="drop-shadow" />
            ) : (
              <MdWifiOff size={18} className="drop-shadow" />
            )}
          </Button>
          {activeMenuId === MenuId.WIFI && <MenuWifi />}
        </div>

        <Button
          ariaLabel="spotlight toggle"
          appearance={ButtonAppearance.MENU}
          isActive={false}
          dataId={MenuId.SPOTLIGHT}
          onClick={handleItemClick}
        >
          <MdSearch size={18} className="drop-shadow mx-1" />
        </Button>

        <div className="flex" ref={menuControlCenterRef}>
          <Button
            ariaLabel="control center menu toggle"
            appearance={ButtonAppearance.MENU}
            isActive={activeMenuId === MenuId.CONTROL_CENTER}
            dataId={MenuId.CONTROL_CENTER}
            onClick={handleItemClick}
          >
            <BsToggles size={14} className="drop-shadow" />
          </Button>
          {activeMenuId === MenuId.CONTROL_CENTER && <MenuControlCenter />}
        </div>

        <Button appearance={ButtonAppearance.MENU}>
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
