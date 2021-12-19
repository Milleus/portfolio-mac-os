import { BsFillLockFill } from "react-icons/bs";
import { FC, MouseEventHandler, RefObject } from "react";
import { MdWifi, MdWifiOff } from "react-icons/md";

import { MenuItemId, updateSystem } from "reducers/systemSlice";
import { useAppDispatch, useAppSelector } from "hooks";
import Button, { ButtonAppearance } from "base-components/Button";
import ToggleSwitch from "base-components/ToggleSwitch";

export type MenuWifiProps = {
  ref: RefObject<HTMLDivElement>;
  onButtonClick: MouseEventHandler;
};

const MenuWifi: FC<MenuWifiProps> = ({ ref, onButtonClick }) => {
  const { activeMenuItemId, isWifiOn } = useAppSelector(
    (state) => state.system
  );
  const dispatch = useAppDispatch();

  const handleWifiChange = () => {
    dispatch(updateSystem({ isWifiOn: !isWifiOn }));
  };

  return (
    <div className="flex relative" ref={ref}>
      <Button
        dataId={MenuItemId.WIFI}
        appearance={ButtonAppearance.MENU_ITEM}
        isActive={activeMenuItemId === MenuItemId.WIFI}
        onClick={onButtonClick}
      >
        {isWifiOn ? (
          <MdWifi size={18} className="drop-shadow" />
        ) : (
          <MdWifiOff size={18} className="drop-shadow" />
        )}
      </Button>

      {activeMenuItemId === MenuItemId.WIFI && (
        <div className="absolute top-6 right-0 w-72 bg-neutral-300 p-1 mt-px rounded shadow text-gray-900">
          <div className="flex justify-between items-center p-1.5">
            <span className="text-sm font-bold">Wi-Fi</span>
            <ToggleSwitch isChecked={isWifiOn} onChange={handleWifiChange} />
          </div>

          <hr className="border-neutral-400 m-1.5" />

          <p className="font-bold px-1.5 text-xs text-neutral-600">
            Preferred Network
          </p>

          <div className="flex justify-between items-center p-1.5 text-sm hover:bg-black/10 hover:rounded">
            <div className="flex items-center">
              <MdWifi
                size={18}
                className="box-content bg-blue-500 p-1 rounded-full text-white"
              />
              <span className="text-sm ml-2.5">Home</span>
            </div>
            <BsFillLockFill size={18} className="text-neutral-600" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuWifi;
