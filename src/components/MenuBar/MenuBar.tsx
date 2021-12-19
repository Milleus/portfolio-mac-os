import { BsApple, BsBatteryFull } from "react-icons/bs";
import { FC, MouseEvent, useEffect, useRef, useState } from "react";
import { MdSearch } from "react-icons/md";
import format from "date-fns/format";

import { MenuItemId, updateSystem } from "reducers/systemSlice";
import { useAppDispatch, useAppSelector, useDetectClickOutside } from "hooks";
import Button, { ButtonAppearance } from "base-components/Button";
import MenuWifi from "components/MenuWifi";
import MenuControlCenter from "components/MenuControlCenter";

const MenuBar: FC<Record<string, never>> = () => {
  const { activeMenuItemId } = useAppSelector((state) => state.system);
  const dispatch = useAppDispatch();

  const [date, setDate] = useState<Date>(new Date());
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

  const handleButtonClick = (event: MouseEvent) => {
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
          onClick={handleButtonClick}
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
          onClick={handleButtonClick}
        >
          <span className="text-xs mr-1">100%</span>
          <BsBatteryFull size={22} className="drop-shadow mr-1" />
        </Button>

        <MenuWifi ref={menuWifiRef} onButtonClick={handleButtonClick} />

        <Button
          dataId={MenuItemId.SPOTLIGHT}
          appearance={ButtonAppearance.MENU_ITEM}
          isActive={false}
          onClick={handleButtonClick}
        >
          <MdSearch size={18} className="drop-shadow" />
        </Button>

        <MenuControlCenter
          ref={menuControlCenterRef}
          onButtonClick={handleButtonClick}
        />

        <Button
          dataId={MenuItemId.NOTIFICATION_CENTER}
          appearance={ButtonAppearance.MENU_ITEM}
          isActive={false}
        >
          <span>{format(date, "eee d MMM h:mm aa")}</span>
        </Button>
      </div>
    </div>
  );
};

export default MenuBar;
