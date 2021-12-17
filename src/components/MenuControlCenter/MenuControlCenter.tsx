import { BsFillLockFill } from "react-icons/bs";
import { FC, useRef } from "react";
import { MdWifi } from "react-icons/md";
import classNames from "classnames";

import { useAppDispatch, useAppSelector, useDetectClickOutside } from "hooks";

const MenuControlCenter: FC<Record<string, never>> = () => {
  const { isWifiOn } = useAppSelector((state) => state.system);
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="absolute top-6 right-0 w-72 bg-neutral-300 p-1 mt-px rounded shadow text-gray-900"
      ref={ref}
    >
      aa
    </div>
  );
};

export default MenuControlCenter;
