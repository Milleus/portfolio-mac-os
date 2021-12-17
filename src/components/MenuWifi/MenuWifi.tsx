import { BsFillLockFill } from "react-icons/bs";
import { FC, useState } from "react";
import { MdWifi } from "react-icons/md";
import classNames from "classnames";

const MenuWifi: FC<Record<string, never>> = () => {
  const [isWifiOn, setIsWifiOn] = useState<boolean>(true);

  const handleChange = () => {
    setIsWifiOn(!isWifiOn);
  };

  const sliderClassNames = classNames(
    "absolute w-full h-full box-content border rounded-full transition-colors duration-300",
    "before:absolute before:bg-white before:w-5 before:h-5 before:rounded-full before:transition-transform before:duration-300",
    {
      "bg-neutral-400 border-neutral-400": !isWifiOn,
      "bg-blue-500 border-blue-500 before:translate-x-5": isWifiOn,
    }
  );

  return (
    <div className="absolute top-6 right-0 w-72 bg-neutral-300 p-1 mt-px rounded shadow text-gray-900">
      <div className="flex justify-between items-center p-1.5 text-sm">
        <span className="font-bold">Wi-Fi</span>
        <label className="relative inline-block w-10 h-5">
          <input
            type="checkbox"
            className="opacity-0 w-0 h-0"
            checked={isWifiOn}
            onChange={handleChange}
          />
          <span className={sliderClassNames}></span>
        </label>
      </div>

      <hr className="border-neutral-400 m-1.5" />

      <p className="font-bold px-1.5 text-xs text-neutral-600">
        Preferred Network
      </p>

      <div className="flex justify-between items-center p-1.5 text-sm hover:bg-neutral-300 hover:rounded">
        <div className="flex items-center space-x-2.5">
          <MdWifi
            size={18}
            className="box-content bg-blue-500 p-1 rounded-full text-white"
          />
          <span className="text-sm">Home</span>
        </div>
        <BsFillLockFill size={18} className="text-neutral-600" />
      </div>
    </div>
  );
};

export default MenuWifi;
