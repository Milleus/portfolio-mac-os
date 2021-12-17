import { FC, MouseEventHandler, ReactNode } from "react";
import classNames from "classnames";

export enum ButtonAppearance {
  MENU_ITEM = "menuItem",
}

export type ButtonProps = {
  id: string;
  appearance: ButtonAppearance;
  isActive: boolean;
  children: ReactNode;
  onClick?: MouseEventHandler;
};

const Button: FC<ButtonProps> = ({
  id,
  appearance,
  isActive,
  children,
  onClick,
}) => {
  const buttonClasses = classNames({
    "flex items-center rounded px-2 text-white text-sm cursor-default":
      ButtonAppearance.MENU_ITEM,
    "active:bg-white/30": ButtonAppearance.MENU_ITEM && onClick,
    "bg-white/30": ButtonAppearance.MENU_ITEM && isActive,
  });

  return (
    <button id={id} className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
