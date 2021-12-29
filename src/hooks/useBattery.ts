import { useEffect, useState } from "react";

type BatteryState = {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
};

type BatteryManager = Readonly<BatteryState> &
  EventTarget & {
    onchargingchange: () => void;
    onchargingtimechange: () => void;
    ondischargingtimechange: () => void;
    onlevelchange: () => void;
  };

type NavigatorWithPossibleBattery = Navigator & {
  getBattery?: () => Promise<BatteryManager>;
};

type UseBatteryState =
  | { isSupported: false } // Battery API is not supported
  | { isSupported: true; fetched: false } // battery API supported but not fetched yet
  | (BatteryState & { isSupported: true; fetched: true }); // battery API supported and fetched

const nav: NavigatorWithPossibleBattery | undefined =
  typeof navigator !== "undefined" ? navigator : undefined;
const isBatteryApiSupported = !!nav && typeof nav.getBattery === "function";

const useBatteryMock = (): UseBatteryState => {
  return { isSupported: false };
};

const useBatteryReal = (): UseBatteryState => {
  const [state, setState] = useState<UseBatteryState>({
    isSupported: true,
    fetched: false,
  });

  useEffect(() => {
    let isMounted = true;
    let battery: BatteryManager | null = null;

    const handleChange = () => {
      if (!isMounted || !battery) {
        return;
      }

      setState({
        isSupported: true,
        fetched: true,
        level: battery.level,
        charging: battery.charging,
        dischargingTime: battery.dischargingTime,
        chargingTime: battery.chargingTime,
      });
    };

    nav!.getBattery!().then((bat: BatteryManager) => {
      if (!isMounted) {
        return;
      }

      battery = bat;
      battery.addEventListener("chargingchange", handleChange);
      battery.addEventListener("chargingtimechange", handleChange);
      battery.addEventListener("dischargingtimechange", handleChange);
      battery.addEventListener("levelchange", handleChange);
      handleChange();
    });

    return () => {
      isMounted = false;

      if (battery) {
        battery.removeEventListener("chargingchange", handleChange);
        battery.removeEventListener("chargingtimechange", handleChange);
        battery.removeEventListener("dischargingtimechange", handleChange);
        battery.removeEventListener("levelchange", handleChange);
      }
    };
  }, []);

  return state;
};

export const useBattery = isBatteryApiSupported
  ? useBatteryReal
  : useBatteryMock;
