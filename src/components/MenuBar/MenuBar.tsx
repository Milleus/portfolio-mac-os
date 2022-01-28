import { BsApple, BsBatteryFull, BsToggles } from "react-icons/bs";
import { FC, MouseEvent, useEffect, useRef, useState } from "react";
import { MdSearch, MdWifi, MdWifiOff } from "react-icons/md";
import format from "date-fns/format";

import { useAppSelector, useOutsideClick } from "hooks";
import Button, { ButtonAppearance } from "base-components/Button";
import MenuApple from "components/MenuApple";
import MenuControlCenter from "components/MenuControlCenter";
import MenuWifi from "components/MenuWifi";

enum MenuId {
  NONE = "none",
  APPLE = "apple",
  FINDER = "finder",
  BATTERY = "battery",
  WIFI = "wifi",
  SPOTLIGHT = "spotlight",
  CONTROL_CENTER = "control-center",
  NOTIFICATION_CENTER = "notification-center",
}

const MenuBar: FC<Record<string, never>> = () => {
  const { isWifiOn } = useAppSelector((state) => state.system);
  const [activeMenuId, setActiveMenuId] = useState<string>(MenuId.NONE);
  const [date, setDate] = useState<Date>(new Date());
  const menuAppleRef = useRef<HTMLDivElement>(null);
  const menuWifiRef = useRef<HTMLDivElement>(null);
  const menuControlCenterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 60 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleMenuItemClick = (event: MouseEvent) => {
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
  }

  useOutsideClick(handleOutsideClick, ref);

  return (
    <div className="w-full h-6 fixed top-0 flex justify-between items-stretch bg-black/10 backdrop-blur px-1.5">
      <div className="flex">
        <div className="flex relative" ref={menuAppleRef}>
          <Button
            dataId={MenuId.APPLE}
            appearance={ButtonAppearance.MENU}
            isActive={false}
            onClick={handleMenuItemClick}
          >
            <BsApple size={16} className="drop-shadow mx-1" />
          </Button>
          {activeMenuId === MenuId.APPLE && <MenuApple />}
        </div>

        <Button
          dataId={MenuId.FINDER}
          appearance={ButtonAppearance.MENU}
          isActive={false}
        >
          <span className="font-bold drop-shadow">Finder</span>
        </Button>
      </div>

      <div className="flex">
        <Button
          dataId={MenuId.BATTERY}
          appearance={ButtonAppearance.MENU}
          isActive={false}
          onClick={handleMenuItemClick}
        >
          <span className="text-xs mr-1">100%</span>
          <BsBatteryFull size={24} className="drop-shadow mr-1" />
        </Button>

        <div className="flex relative" ref={menuWifiRef}>
          <Button
            dataId={MenuId.WIFI}
            appearance={ButtonAppearance.MENU}
            isActive={activeMenuId === MenuId.WIFI}
            onClick={handleMenuItemClick}
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
          dataId={MenuId.SPOTLIGHT}
          appearance={ButtonAppearance.MENU}
          isActive={false}
          onClick={handleMenuItemClick}
        >
          <MdSearch size={18} className="drop-shadow" />
        </Button>

        <div className="flex" ref={menuControlCenterRef}>
          <Button
            dataId={MenuId.CONTROL_CENTER}
            appearance={ButtonAppearance.MENU}
            isActive={activeMenuId === MenuId.CONTROL_CENTER}
            onClick={handleMenuItemClick}
          >
            <BsToggles size={15} className="drop-shadow" />
          </Button>
          {activeMenuId === MenuId.CONTROL_CENTER && <MenuControlCenter />}
        </div>

        <Button
          dataId={MenuId.NOTIFICATION_CENTER}
          appearance={ButtonAppearance.MENU}
          isActive={false}
        >
          <span className="mx-1">
            {format(new Date(date), "eee d MMM h:mm aa")}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default MenuBar;
