import { FC, MouseEvent, MouseEventHandler, ReactNode } from "react";
import classNames from "classnames";

export enum ButtonAppearance {
  APP_MENU,
  TOGGLE,
  MENU,
  MENU_ITEM,
  TRANSPARENT,
}

export type ButtonProps = {
  appearance: ButtonAppearance;
  children: ReactNode;
  isActive?: boolean;
  ariaLabel?: string;
  className?: string;
  dataId?: string;
  onClick?: MouseEventHandler;
};

const Button: FC<ButtonProps> = ({
  appearance,
  children,
  isActive,
  ariaLabel,
  className,
  dataId,
  onClick,
}) => {
  let buttonClasses;

  switch (appearance) {
    case ButtonAppearance.MENU:
      buttonClasses = {
        "flex items-center rounded px-1.5 text-sm cursor-default": true,
        "active:bg-black/10": onClick,
        "bg-black/10": isActive,
      };
      break;

    case ButtonAppearance.MENU_ITEM:
      buttonClasses = {
        "flex w-full rounded px-2.5 py-1.5 text-xs leading-none tracking-wide hover:bg-blue-500 hover:text-white":
          true,
      };
      break;

    case ButtonAppearance.TOGGLE:
      buttonClasses = {
        "p-1 rounded-full": true,
        "bg-blue-500 text-white": isActive,
        "bg-gray-300 text-gray-900": !isActive,
      };
      break;

    case ButtonAppearance.TRANSPARENT:
      buttonClasses = {
        "flex justify-center items-center": true,
      };
      break;

    case ButtonAppearance.APP_MENU:
      buttonClasses = {
        "h-full flex justify-center items-center p-1.5": true,
        "text-neutral-500 hover:bg-black/10 hover:rounded": isActive,
        "text-neutral-400": !isActive,
      };
      break;
  }

  const handleMouseDown = (event: MouseEvent) => {
    // prevents drag for app menu buttons
    event.stopPropagation();
  };

  return (
    <button
      className={classNames(buttonClasses, className)}
      aria-label={ariaLabel}
      data-id={dataId}
      onMouseDown={handleMouseDown}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
