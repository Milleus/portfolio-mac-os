import { BsApple, BsBatteryFull, BsToggles } from "react-icons/bs";
import { MdSearch, MdWifi } from "react-icons/md";
import { FC, MouseEvent, useEffect, useState } from "react";
import format from "date-fns/format";

import MenuBarItem from "components/MenuBarItem";
import MenuWifi from "components/MenuWifi";

export enum MenuBarItemId {
  NONE = "none",
  APPLE = "apple",
  FINDER = "finder",
  BATTERY = "battery",
  WIFI = "wifi",
  SPOTLIGHT = "spotlight",
  CONTROL_CENTER = "controlCenter",
  DATE_TIME = "dateTime",
}

const MenuBar: FC<Record<string, never>> = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [menuOpenId, setMenuOpenId] = useState<string>(MenuBarItemId.NONE);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 60 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleMenuBarItemClick = (event: MouseEvent) => {
    const { id } = event.currentTarget;
    const newId = id === menuOpenId ? MenuBarItemId.NONE : id;

    setMenuOpenId(newId);
  };

  return (
    <div className="w-full h-6 fixed top-0 flex justify-between items-stretch bg-black/10 backdrop-blur px-2.5">
      <div className="flex">
        <MenuBarItem
          id={MenuBarItemId.APPLE}
          isActive={false}
          onClick={handleMenuBarItemClick}
        >
          <BsApple size={16} className="drop-shadow" />
        </MenuBarItem>

        <MenuBarItem id={MenuBarItemId.FINDER} isActive={false}>
          <span className="font-bold drop-shadow px-1">Finder</span>
        </MenuBarItem>
      </div>

      <div className="flex">
        <MenuBarItem
          id={MenuBarItemId.BATTERY}
          isActive={false}
          onClick={handleMenuBarItemClick}
        >
          <span className="text-xs mr-1">100%</span>
          <BsBatteryFull size={22} className="drop-shadow mr-1" />
        </MenuBarItem>

        <div className="flex relative">
          <MenuBarItem
            id={MenuBarItemId.WIFI}
            isActive={menuOpenId === MenuBarItemId.WIFI}
            onClick={handleMenuBarItemClick}
          >
            <MdWifi size={18} className="drop-shadow" />
          </MenuBarItem>
          {menuOpenId === MenuBarItemId.WIFI && <MenuWifi />}
        </div>

        <MenuBarItem
          id={MenuBarItemId.SPOTLIGHT}
          isActive={false}
          onClick={handleMenuBarItemClick}
        >
          <MdSearch size={18} className="drop-shadow" />
        </MenuBarItem>

        <div className="flex">
          <MenuBarItem
            id={MenuBarItemId.CONTROL_CENTER}
            isActive={false}
            onClick={handleMenuBarItemClick}
          >
            <BsToggles size={15} className="drop-shadow" />
          </MenuBarItem>
        </div>

        <MenuBarItem id={MenuBarItemId.DATE_TIME} isActive={false}>
          <span>{format(date, "eee d MMM h:mm aa")}</span>
        </MenuBarItem>
      </div>
    </div>
  );
};

export default MenuBar;
