import { BsFillLockFill } from "react-icons/bs";
import { FC } from "react";
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
    <div className="absolute top-6 right-0 w-72 bg-neutral-300 p-1 mt-px rounded shadow">
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
  );
};

export default MenuWifi;
