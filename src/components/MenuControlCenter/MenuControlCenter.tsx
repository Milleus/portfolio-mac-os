import { FC, MouseEventHandler, RefObject } from "react";
import {
  MdBluetooth,
  MdBluetoothDisabled,
  MdWifi,
  MdWifiTethering,
} from "react-icons/md";
import { BsToggles } from "react-icons/bs";

import { useAppDispatch, useAppSelector } from "hooks";
import Button, { ButtonAppearance } from "base-components/Button";
import { MenuItemId, SystemState, updateSystem } from "reducers/systemSlice";

const identifiers: { [key: string]: keyof SystemState } = {
  wifi: "isWifiOn",
  bluetooth: "isBluetoothOn",
  airdrop: "isAirDropOn",
  brightness: "brightnessLevel",
  volume: "volumeLevel",
};

export type MenuControlCenterProps = {
  ref: RefObject<HTMLDivElement>;
  onButtonClick: MouseEventHandler;
};

const MenuControlCenter: FC<MenuControlCenterProps> = ({
  ref,
  onButtonClick,
}) => {
  const { activeMenuItemId, isWifiOn, isBluetoothOn, isAirDropOn } =
    useAppSelector((state) => state.system);
  const dispatch = useAppDispatch();

  const handleWifiClick = () => {
    dispatch(updateSystem({ isWifiOn: !isWifiOn }));
  };

  const handleBluetoothClick = () => {
    dispatch(updateSystem({ isBluetoothOn: !isBluetoothOn }));
  };

  const handleAirDropClick = () => {
    dispatch(updateSystem({ isAirDropOn: !isAirDropOn }));
  };

  return (
    <div className="flex" ref={ref}>
      <Button
        dataId={MenuItemId.CONTROL_CENTER}
        appearance={ButtonAppearance.MENU_ITEM}
        isActive={activeMenuItemId === MenuItemId.CONTROL_CENTER}
        onClick={onButtonClick}
      >
        <BsToggles size={15} className="drop-shadow" />
      </Button>

      {activeMenuItemId === MenuItemId.CONTROL_CENTER && (
        <div className="absolute top-6 right-0 w-84 bg-neutral-300/50 backdrop-shadow-3xl p-2 m-1 rounded-lg shadow">
          <div className="grid grid-cols-4 grid-rows-5 gap-2">
            <div className="bg-neutral-300 rounded-lg shadow col-span-2 row-span-2 p-2.5 space-y-2.5">
              <div className="flex items-center">
                <Button
                  dataId={identifiers.wifi}
                  appearance={ButtonAppearance.ICON}
                  isActive={isWifiOn}
                  onClick={handleWifiClick}
                >
                  <MdWifi size={18} />
                </Button>
                <div className="ml-2.5">
                  <p className="text-sm leading-none font-semibold">Wi-Fi</p>
                  <p className="text-xs text-neutral-600">
                    {isWifiOn ? "Home" : "Not connected"}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <Button
                  dataId={identifiers.bluetooth}
                  appearance={ButtonAppearance.ICON}
                  isActive={isBluetoothOn}
                  onClick={handleBluetoothClick}
                >
                  {isBluetoothOn ? (
                    <MdBluetooth size={18} />
                  ) : (
                    <MdBluetoothDisabled size={18} />
                  )}
                </Button>
                <div className="ml-2.5">
                  <p className="text-sm leading-none font-semibold">
                    Bluetooth
                  </p>
                  <p className="text-xs text-neutral-600">
                    {isBluetoothOn ? "On" : "Off"}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <Button
                  dataId={identifiers.airdrop}
                  appearance={ButtonAppearance.ICON}
                  isActive={isBluetoothOn && isAirDropOn}
                  onClick={handleAirDropClick}
                >
                  <MdWifiTethering size={18} />
                </Button>
                <div className="ml-2.5">
                  <p className="text-sm leading-none font-semibold">AirDrop</p>
                  <p className="text-xs text-neutral-600">
                    {isBluetoothOn && isAirDropOn ? "Contacts Only" : "Off"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-neutral-300 rounded-lg shadow col-span-2">
              focus
            </div>

            <div className="bg-neutral-300 rounded-lg shadow">key bright</div>

            <div className="bg-neutral-300 rounded-lg shadow">full screen</div>

            <div className="bg-neutral-300 rounded-lg shadow col-span-full">
              display
            </div>

            <div className="bg-neutral-300 rounded-lg shadow col-span-full">
              sound
            </div>

            <div className="bg-neutral-300 rounded-lg shadow col-span-full">
              music
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuControlCenter;
