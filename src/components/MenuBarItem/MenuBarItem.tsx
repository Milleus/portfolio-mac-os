import { FC, MouseEventHandler, ReactNode } from "react";
import classnames from "classnames";

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
  const buttonClasses = classnames({
    "flex items-center rounded px-2 cursor-default": true,
    "active:bg-white/30": onClick,
    "bg-white/30": isActive,
  });

  return (
    <button id={id} className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
};

export default MenuBarItem;
