import { FC, MouseEventHandler, ReactNode } from "react";
import classNames from "classnames";

export enum ButtonAppearance {
  MENU,
  MENU_ITEM,
  ICON,
  TRANSPARENT,
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
    case ButtonAppearance.MENU:
      buttonClasses = classNames({
        "flex items-center rounded px-1.5 text-white text-sm cursor-default":
          true,
        "active:bg-white/30": onClick,
        "bg-white/30": isActive,
      });
      break;

    case ButtonAppearance.MENU_ITEM:
      buttonClasses = classNames({
        "flex w-full rounded px-2.5 py-1.5 text-xs leading-none tracking-wide hover:bg-blue-500 hover:text-white":
          true,
      });
      break;

    case ButtonAppearance.ICON:
      buttonClasses = classNames({
        "p-1 rounded-full": true,
        "bg-blue-500 text-white": isActive,
        "bg-gray-300 text-gray-900": !isActive,
      });
      break;

    case ButtonAppearance.TRANSPARENT:
      buttonClasses = classNames({
        "flex flex-col justify-center items-center": true,
      });
      break;
  }

  return (
    <button
      className={buttonClasses}
      data-id={dataId}
      onClick={onClick}
      disabled={!onClick}
    >
      {children}
    </button>
  );
};

export default Button;
