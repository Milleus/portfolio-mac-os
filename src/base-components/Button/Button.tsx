import { FC, MouseEvent, MouseEventHandler, ReactNode } from "react";
import classNames from "classnames";

export enum ButtonAppearance {
  DEFAULT,
  MENU,
  MENU_ITEM,
  TOGGLE,
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
    case ButtonAppearance.DEFAULT:
      buttonClasses = {
        "flex justify-center items-center": true,
      };
      break;

    case ButtonAppearance.MENU:
      buttonClasses = {
        "flex items-center rounded px-1.5 text-sm cursor-default": true,
        "active:bg-gray-900/10 dark:active:bg-gray-50/10": onClick,
        "bg-gray-900/10 dark:bg-gray-50/10": isActive,
      };
      break;

    case ButtonAppearance.MENU_ITEM:
      buttonClasses = {
        "flex w-full rounded px-2.5 py-1.5 text-xs leading-none tracking-wide hover:bg-blue-500 hover:text-gray-50":
          true,
      };
      break;

    case ButtonAppearance.TOGGLE:
      buttonClasses = {
        "p-1 rounded-full": true,
        "bg-blue-500 text-gray-50": isActive,
        "bg-gray-300 text-gray-900 dark:bg-gray-600 dark:text-gray-50":
          !isActive,
      };
      break;

    case ButtonAppearance.TRANSPARENT:
      buttonClasses = {
        "h-full flex justify-center items-center p-1.5": true,
        "text-neutral-500 hover:bg-gray-900/10 hover:rounded": isActive,
        "text-neutral-400": !isActive,
      };
      break;
  }

  const stopPropagation = (event: MouseEvent<HTMLButtonElement>) => {
    // prevents drag / double click
    event.stopPropagation();
  };

  return (
    <button
      className={classNames(buttonClasses, className)}
      aria-label={ariaLabel}
      data-id={dataId}
      onMouseDown={stopPropagation}
      onDoubleClick={stopPropagation}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
