import { FC, MouseEventHandler, RefObject } from "react";
import { MdWifi } from "react-icons/md";
import { BsToggles } from "react-icons/bs";

import { useAppDispatch, useAppSelector } from "hooks";
import Button, { ButtonAppearance } from "base-components/Button";
import { MenuItemId } from "reducers/systemSlice";

export type MenuControlCenterProps = {
  ref: RefObject<HTMLDivElement>;
  onButtonClick: MouseEventHandler;
};

const MenuControlCenter: FC<MenuControlCenterProps> = ({
  ref,
  onButtonClick,
}) => {
  const { activeMenuItemId, isWifiOn } = useAppSelector(
    (state) => state.system
  );
  const dispatch = useAppDispatch();

  return (
    <div className="flex" ref={ref}>
      <Button
        id={MenuItemId.CONTROL_CENTER}
        appearance={ButtonAppearance.MENU_ITEM}
        isActive={activeMenuItemId === MenuItemId.CONTROL_CENTER}
        onClick={onButtonClick}
      >
        <BsToggles size={15} className="drop-shadow" />
      </Button>

      {activeMenuItemId === MenuItemId.CONTROL_CENTER && (
        <div className="absolute top-6 right-0 w-72 bg-neutral-300/50 backdrop-shadow-3xl p-2 m-1 rounded-lg shadow text-gray-900">
          <div className="grid grid-cols-4 grid-rows-5 gap-2">
            <div className="bg-neutral-300 rounded-lg shadow col-span-2 row-span-2">
              wifi bluetooth airdrop
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
