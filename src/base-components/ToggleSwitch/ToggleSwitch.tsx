import { ChangeEventHandler, FC } from "react";
import classNames from "classnames";

export type ToggleSwitchProps = {
  isChecked: boolean;
  onChange: ChangeEventHandler;
};

const ToggleSwitch: FC<ToggleSwitchProps> = ({ isChecked, onChange }) => {
  const sliderClasses = {
    "absolute w-full h-full box-content rounded-full shadow-inner transition-colors duration-100 cursor-pointer":
      true,
    "before:absolute before:bg-gray-50 before:w-5 before:h-5 before:rounded-full before:transition-transform before:duration-100":
      true,
    "bg-gray-300 border-gray-300 dark:bg-gray-600 dark:border-gray-600":
      !isChecked,
    "bg-blue-500 border-blue-500 before:translate-x-5": isChecked,
  };

  return (
    <label className="relative inline-block w-10 h-5">
      <input
        type="checkbox"
        className="opacity-0 w-0 h-0"
        checked={isChecked}
        onChange={onChange}
      />
      <span className={classNames(sliderClasses)}></span>
    </label>
  );
};

export default ToggleSwitch;
