import { FC, MouseEvent, MouseEventHandler, ReactNode } from "react";
import classNames, { Mapping } from "classnames";

export enum ButtonAppearance {
  DEFAULT,
  MENU_BAR,
  MENU_ITEM,
  TOGGLE,
  WINDOW_BAR,
}

export type ButtonProps = {
  appearance: ButtonAppearance;
  children: ReactNode;
  isActive?: boolean;
  isEnabled?: boolean;
  ariaLabel?: string;
  className?: string;
  dataId?: string;
  onClick?: MouseEventHandler;
};

const Button: FC<ButtonProps> = ({
  appearance,
  children,
  isActive,
  isEnabled,
  ariaLabel,
  className,
  dataId,
  onClick,
}) => {
  let buttonClasses: Mapping = {};
  let handleMouseDown: MouseEventHandler | undefined;
  let handleDoubleClick: MouseEventHandler | undefined;
  let handleClick: MouseEventHandler | undefined = onClick;
  let disabled: boolean | undefined = !onClick;

  switch (appearance) {
    case ButtonAppearance.MENU_BAR:
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

    case ButtonAppearance.WINDOW_BAR:
      buttonClasses = {
        "h-full flex justify-center items-center rounded p-1.5": true,
        "text-neutral-500 hover:bg-gray-900/10": isEnabled && !isActive,
        "text-neutral-400 cursor-default": !isEnabled && !isActive,
        "text-neutral-500 bg-gray-900/10": isActive,
      };

      const stopPropagation = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
      };

      // disabled buttons allow parent elements to be clickable.
      // since the parent element is the window bar, it would allow dragging and double click which we want to prevent.
      handleMouseDown = stopPropagation;
      handleDoubleClick = stopPropagation;
      handleClick = isEnabled ? onClick : undefined;
      disabled = undefined;
      break;

    case ButtonAppearance.DEFAULT:
      break;
  }

  return (
    <button
      className={classNames(buttonClasses, className)}
      aria-label={ariaLabel}
      data-id={dataId}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
