import { BsApple, BsBatteryFull, BsToggles } from "react-icons/bs";
import { FC, MouseEvent, useEffect, useRef } from "react";
import { MdSearch, MdWifi, MdWifiOff } from "react-icons/md";
import format from "date-fns/format";

import { MenuItemId, updateSystem } from "reducers/systemSlice";
import { useAppDispatch, useAppSelector, useDetectClickOutside } from "hooks";
import Button, { ButtonAppearance } from "base-components/Button";
import MenuControlCenter from "components/MenuControlCenter";
import MenuWifi from "components/MenuWifi";

const MenuBar: FC<Record<string, never>> = () => {
  const { activeMenuItemId, isWifiOn, date } = useAppSelector(
    (state) => state.system
  );
  const dispatch = useAppDispatch();
  const menuWifiRef = useRef<HTMLDivElement>(null);
  const menuControlCenterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(updateSystem({ date: new Date().toISOString() }));
    }, 60 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch]);

  const handleMenuItemClick = (event: MouseEvent) => {
    const id = event.currentTarget.getAttribute("data-id");
    const newId =
      id === activeMenuItemId ? MenuItemId.NONE : (id as MenuItemId);

    dispatch(updateSystem({ activeMenuItemId: newId }));
  };

  const handleClickOutside = () => {
    dispatch(updateSystem({ activeMenuItemId: MenuItemId.NONE }));
  };

  let ref;

  switch (activeMenuItemId) {
    case MenuItemId.WIFI:
      ref = menuWifiRef;
      break;
    case MenuItemId.CONTROL_CENTER:
      ref = menuControlCenterRef;
      break;
  }

  useDetectClickOutside(handleClickOutside, ref);

  return (
    <div className="w-full h-6 fixed top-0 flex justify-between items-stretch bg-black/10 backdrop-blur px-2.5">
      <div className="flex">
        <Button
          dataId={MenuItemId.APPLE}
          appearance={ButtonAppearance.MENU_ITEM}
          isActive={false}
          onClick={handleMenuItemClick}
        >
          <BsApple size={16} className="drop-shadow" />
        </Button>

        <Button
          dataId={MenuItemId.FINDER}
          appearance={ButtonAppearance.MENU_ITEM}
          isActive={false}
        >
          <span className="font-bold drop-shadow px-1">Finder</span>
        </Button>
      </div>

      <div className="flex">
        <Button
          dataId={MenuItemId.BATTERY}
          appearance={ButtonAppearance.MENU_ITEM}
          isActive={false}
          onClick={handleMenuItemClick}
        >
          <span className="text-xs mr-1">100%</span>
          <BsBatteryFull size={22} className="drop-shadow mr-1" />
        </Button>

        <div className="flex relative" ref={menuWifiRef}>
          <Button
            dataId={MenuItemId.WIFI}
            appearance={ButtonAppearance.MENU_ITEM}
            isActive={activeMenuItemId === MenuItemId.WIFI}
            onClick={handleMenuItemClick}
          >
            {isWifiOn ? (
              <MdWifi size={18} className="drop-shadow" />
            ) : (
              <MdWifiOff size={18} className="drop-shadow" />
            )}
          </Button>
          {activeMenuItemId === MenuItemId.WIFI && <MenuWifi />}
        </div>

        <Button
          dataId={MenuItemId.SPOTLIGHT}
          appearance={ButtonAppearance.MENU_ITEM}
          isActive={false}
          onClick={handleMenuItemClick}
        >
          <MdSearch size={18} className="drop-shadow" />
        </Button>

        <div className="flex" ref={menuControlCenterRef}>
          <Button
            dataId={MenuItemId.CONTROL_CENTER}
            appearance={ButtonAppearance.MENU_ITEM}
            isActive={activeMenuItemId === MenuItemId.CONTROL_CENTER}
            onClick={handleMenuItemClick}
          >
            <BsToggles size={15} className="drop-shadow" />
          </Button>

          {activeMenuItemId === MenuItemId.CONTROL_CENTER && (
            <MenuControlCenter />
          )}
        </div>

        <Button
          dataId={MenuItemId.NOTIFICATION_CENTER}
          appearance={ButtonAppearance.MENU_ITEM}
          isActive={false}
        >
          <span>{format(new Date(date), "eee d MMM h:mm aa")}</span>
        </Button>
      </div>
    </div>
  );
};

export default MenuBar;
