import { BsLightningChargeFill } from "react-icons/bs";
import { FC } from "react";

import { useBattery } from "hooks";

export type BatteryIconProps = {
  isValueVisible: boolean;
};

const BatteryIcon: FC<BatteryIconProps> = ({ isValueVisible }) => {
  const batteryState = useBattery();
  const maxHorizontal = 10;
  const maxBatteryLevel = 1;

  let batteryLevel = maxBatteryLevel;
  let horizontal = maxHorizontal;
  let isCharging = false;

  if (batteryState.isSupported && batteryState.fetched) {
    batteryLevel = batteryState.level;
    horizontal = (maxHorizontal / maxBatteryLevel) * batteryState.level;
    isCharging = batteryState.charging;
  }

  return (
    <>
      {isValueVisible && (
        <span className="text-xs mr-1">
          {`${(batteryLevel * 100).toFixed()}%`}
        </span>
      )}
      <div className="relative">
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 16 16"
          className="w-6 h-6 mr-1"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={`M2 6h${horizontal}v4H2V6z`}></path>
          <path d="M2 4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H2zm10 1a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h10zm4 3a1.5 1.5 0 0 1-1.5 1.5v-3A1.5 1.5 0 0 1 16 8z"></path>
        </svg>
        {isCharging && (
          <BsLightningChargeFill className="absolute top-1/2 left-1 -translate-y-1/2 w-3.5 h-3.5 stroke-1 stroke-purple-200 fill-gray-900 dark:stroke-purple-500 dark:fill-white" />
        )}
      </div>
    </>
  );
};

export default BatteryIcon;
