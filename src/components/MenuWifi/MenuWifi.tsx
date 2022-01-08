import { FC } from "react";
import { IoLockClosed } from "react-icons/io5";
import { MdWifi } from "react-icons/md";

import { updateSystem } from "reducers/systemSlice";
import { useAppDispatch, useAppSelector } from "hooks";
import ToggleSwitch from "base-components/ToggleSwitch";

const MenuWifi: FC<Record<string, never>> = () => {
  const { isWifiOn } = useAppSelector((state) => state.system);
  const dispatch = useAppDispatch();

  const handleWifiChange = () => {
    dispatch(updateSystem({ isWifiOn: !isWifiOn }));
  };

  return (
    <div className="absolute top-6 right-0 w-72 bg-gray-200/90 backdrop-blur-lg rounded shadow-md p-1 mt-px dark:bg-gray-700/90">
      <div className="flex justify-between items-center p-1.5">
        <span className="text-xs leading-none tracking-wide font-bold">
          Wi-Fi
        </span>
        <ToggleSwitch isChecked={isWifiOn} onChange={handleWifiChange} />
      </div>

      <hr className="border-gray-400 m-1.5 dark:border-gray-500" />

      <p className="font-bold text-xs text-gray-600 px-1.5 dark:text-gray-300">
        Preferred Network
      </p>

      <div className="flex justify-between items-center p-1.5 text-sm rounded hover:bg-gray-900/10 dark:hover:bg-gray-50/10">
        <div className="flex items-center">
          <MdWifi className="w-4.5 h-4.5 box-content bg-blue-500 p-1 rounded-full text-gray-50" />
          <span className="text-sm ml-2.5">Home</span>
        </div>
        <IoLockClosed className="w-3 h-3 text-gray-600 dark:text-gray-300" />
      </div>
    </div>
  );
};

export default MenuWifi;
