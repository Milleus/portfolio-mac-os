import { FC, MouseEvent, MouseEventHandler, ReactNode } from "react";
import classNames, { Mapping } from "classnames";

export enum ButtonAppearance {
  DEFAULT,
  MENU_BAR,
  MENU_ITEM,
  TOGGLE,
  WINDOW_BAR,
  WINDOW_BAR_TOGGLE,
}

export type ButtonProps = {
  appearance: ButtonAppearance;
  children: ReactNode;
  isToggled?: boolean;
  isEnabled?: boolean;
  isActive?: boolean;
  ariaLabel?: string;
  className?: string;
  dataId?: string;
  onClick?: MouseEventHandler;
};

const Button: FC<ButtonProps> = ({
  appearance,
  children,
  isToggled,
  isEnabled,
  isActive,
  ariaLabel,
  className,
  dataId,
  onClick,
}) => {
  let buttonClasses: Mapping = {};
  let handleClick: MouseEventHandler | undefined = onClick;
  let disabled: boolean | undefined = !onClick;

  switch (appearance) {
    case ButtonAppearance.MENU_BAR:
      buttonClasses = {
        "flex items-center rounded px-1.5 text-sm cursor-default": true,
        "active:bg-gray-900/10 dark:active:bg-gray-50/10": onClick,
        "bg-gray-900/10 dark:bg-gray-50/10": isToggled,
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
        "bg-blue-500 text-gray-50": isToggled,
        "bg-gray-300 text-gray-900 dark:bg-gray-600 dark:text-gray-50":
          !isToggled,
      };
      break;

    case ButtonAppearance.WINDOW_BAR:
      buttonClasses = {
        "h-full flex justify-center items-center rounded p-1.5": true,
        "text-neutral-500 hover:bg-gray-900/10 dark:text-neutral-400 dark:hover:bg-gray-50/10":
          isActive && isEnabled,
        "text-neutral-400 hover:bg-gray-900/10 dark:text-neutral-500 dark:hover:bg-gray-50/10":
          !isActive && isEnabled,
        "text-neutral-400 cursor-default dark:text-neutral-500":
          isActive && !isEnabled,
        "text-neutral-300 cursor-default dark:text-neutral-600":
          !isActive && !isEnabled,
      };
      // prevent drag and double click on window bar
      disabled = undefined;
      handleClick = isEnabled ? onClick : undefined;
      break;

    case ButtonAppearance.WINDOW_BAR_TOGGLE:
      buttonClasses = {
        "h-full flex justify-center items-center rounded p-1.5": true,
        "text-neutral-500 dark:text-neutral-400": isActive,
        "text-neutral-400 dark:text-neutral-500": !isActive,
        "bg-gray-900/10 dark:bg-gray-50/10": isToggled,
      };
      // prevent drag and double click on window bar
      disabled = undefined;
      handleClick = isEnabled ? onClick : undefined;
      break;

    case ButtonAppearance.DEFAULT:
      break;
  }

  const stopPropagation = (event: MouseEvent<HTMLButtonElement>) => {
    // prevent drag and double click on window bar
    event.stopPropagation();
  };

  return (
    <button
      className={classNames(buttonClasses, className)}
      aria-label={ariaLabel}
      data-id={dataId}
      onMouseDown={stopPropagation}
      onDoubleClick={stopPropagation}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
