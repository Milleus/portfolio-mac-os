import { FC, MouseEventHandler, ReactNode } from "react";
import classNames from "classnames";

export enum ButtonAppearance {
  MENU_ITEM,
  ICON,
}

export type ButtonProps = {
  dataId: string;
  appearance: ButtonAppearance;
  isActive: boolean;
  children: ReactNode;
  onClick?: MouseEventHandler;
};

const Button: FC<ButtonProps> = ({
  dataId,
  appearance,
  isActive,
  children,
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
        "box-content p-1 rounded-full": true,
        "bg-blue-500 text-white": isActive,
        "bg-neutral-400 text-gray-900": !isActive,
      });
      break;
  }

  return (
    <button data-id={dataId} className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
