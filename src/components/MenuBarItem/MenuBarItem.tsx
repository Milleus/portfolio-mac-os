import { FC, MouseEventHandler, ReactNode } from "react";
import classNames from "classnames";

export type MenuBarItemProps = {
  id: string;
  isActive: boolean;
  children: ReactNode;
  onClick?: MouseEventHandler;
};

const MenuBarItem: FC<MenuBarItemProps> = ({
  id,
  isActive,
  children,
  onClick,
}) => {
  const buttonClasses = classNames(
    "flex items-center rounded px-2 text-white text-sm cursor-default",
    {
      "active:bg-white/30": onClick,
      "bg-white/30": isActive,
    }
  );

  return (
    <button id={id} className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
};

export default MenuBarItem;
