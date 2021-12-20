import { FC, MouseEventHandler, ReactNode } from "react";
import classNames from "classnames";

export enum ButtonAppearance {
  MENU_ITEM,
  ICON,
}

export type ButtonProps = {
  appearance: ButtonAppearance;
  isActive: boolean;
  children: ReactNode;
  dataId?: string;
  onClick?: MouseEventHandler;
};

const Button: FC<ButtonProps> = ({
  appearance,
  isActive,
  children,
  dataId,
  onClick,
}) => {
  let buttonClasses;

  switch (appearance) {
    case ButtonAppearance.MENU_ITEM:
      buttonClasses = classNames({
        "flex items-center rounded px-2 text-white text-sm cursor-default":
          true,
        "active:bg-white/30": onClick,
        "bg-white/30": isActive,
      });
      break;

    case ButtonAppearance.ICON:
      buttonClasses = classNames({
        "p-1 rounded-full cursor-default": true,
        "bg-blue-500 text-white": isActive,
        "bg-gray-300 text-gray-900": !isActive,
      });
      break;
  }

  return (
    <button className={buttonClasses} data-id={dataId} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
