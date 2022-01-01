import { FC, MouseEventHandler, ReactNode } from "react";

export type WindowBarProps = {
  children: ReactNode;
  className?: string;
  dragHandleClass?: string;
  onBarDoubleClick?: MouseEventHandler;
};

const WindowBar: FC<WindowBarProps> = ({
  children,
  className,
  dragHandleClass,
  onBarDoubleClick,
}) => {
  return (
    <div
      className={`${dragHandleClass} ${className}`}
      onDoubleClick={onBarDoubleClick}
    >
      {children}
    </div>
  );
};

export default WindowBar;
