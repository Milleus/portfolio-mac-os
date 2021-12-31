import { FC, ReactNode, useState } from "react";
import classNames from "classnames";

export type TooltipProps = {
  children: ReactNode;
  content: ReactNode;
};

const Tooltip: FC<TooltipProps> = ({ children, content }) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsActive(true);
  };

  const handleMouseLeave = () => {
    setIsActive(false);
  };

  const tooltipContentClasses = {
    "absolute z-40 bg-gray-200 rounded shadow-md whitespace-nowrap text-sm leading-none px-3 py-1.5":
      true,
    "before:absolute before:w-0 before:h-0 before:border-solid before:border-transparent before:border-8":
      true,
    "-top-12 left-1/2 -translate-x-1/2 before:top-full before:left-1/2 before:-translate-x-1/2 before:border-t-gray-200":
      true,
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {isActive && (
        <div className={classNames(tooltipContentClasses)}>{content}</div>
      )}
    </div>
  );
};

export default Tooltip;
