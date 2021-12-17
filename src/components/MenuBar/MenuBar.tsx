import { BsApple, BsBatteryFull, BsToggles } from "react-icons/bs";
import { FC, MouseEvent, useEffect, useRef, useState } from "react";
import { MdSearch, MdWifi, MdWifiOff } from "react-icons/md";
import format from "date-fns/format";

import { MenuBarItemId, updateSystem } from "reducers/systemSlice";
import { useAppDispatch, useAppSelector, useDetectClickOutside } from "hooks";
import MenuBarItem from "components/MenuBarItem";
import MenuWifi from "components/MenuWifi";

const MenuBar: FC<Record<string, never>> = () => {
  const systemState = useAppSelector((state) => state.system);
  const { activeMenuBarItemId, isWifiOn } = systemState;
  const dispatch = useAppDispatch();
  const [date, setDate] = useState<Date>(new Date());
  const wifiDropdownRef = useRef<HTMLDivElement>(null);

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
    const newId =
      id === activeMenuBarItemId ? MenuBarItemId.NONE : (id as MenuBarItemId);

    dispatch(updateSystem({ activeMenuBarItemId: newId }));
  };

  const handleWifiChange = () => {
    dispatch(updateSystem({ isWifiOn: !isWifiOn }));
  };

  const handleClickOutside = () => {
    dispatch(updateSystem({ activeMenuBarItemId: MenuBarItemId.NONE }));
  };

  useDetectClickOutside(wifiDropdownRef, handleClickOutside);

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

        <div className="flex relative" ref={wifiDropdownRef}>
          <MenuBarItem
            id={MenuBarItemId.WIFI}
            isActive={activeMenuBarItemId === MenuBarItemId.WIFI}
            onClick={handleMenuBarItemClick}
          >
            {isWifiOn ? (
              <MdWifi size={18} className="drop-shadow" />
            ) : (
              <MdWifiOff size={18} className="drop-shadow" />
            )}
          </MenuBarItem>
          {activeMenuBarItemId === MenuBarItemId.WIFI && (
            <MenuWifi isWifiOn={isWifiOn} onChange={handleWifiChange} />
          )}
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

        <MenuBarItem id={MenuBarItemId.NOTIFICATION_CENTER} isActive={false}>
          <span>{format(date, "eee d MMM h:mm aa")}</span>
        </MenuBarItem>
      </div>
    </div>
  );
};

export default MenuBar;
