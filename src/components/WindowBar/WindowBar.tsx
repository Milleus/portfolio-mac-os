import { FC, ReactNode } from "react";

import {
  ApplicationKeys,
  maximizeApplication,
} from "reducers/applicationSlice";
import { DRAG_HANDLE_CLASS } from "components/Window";
import { useAppDispatch } from "hooks";

export type WindowBarProps = {
  appKey: ApplicationKeys;
  children: ReactNode;
  className?: string;
};

const WindowBar: FC<WindowBarProps> = ({ appKey, children, className }) => {
  const dispatch = useAppDispatch();

  const handleBarDoubleClick = () => {
    dispatch(maximizeApplication(appKey));
  };

  return (
    <div
      className={`${DRAG_HANDLE_CLASS} ${className}`}
      onDoubleClick={handleBarDoubleClick}
    >
      {children}
    </div>
  );
};

export default WindowBar;
