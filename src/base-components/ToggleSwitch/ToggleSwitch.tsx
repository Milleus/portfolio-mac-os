import classNames from "classnames";
import { ChangeEventHandler, FC } from "react";

export type ToggleSwitchProps = {
  isChecked: boolean;
  onChange: ChangeEventHandler;
};

const ToggleSwitch: FC<ToggleSwitchProps> = ({ isChecked, onChange }) => {
  const sliderClassNames = classNames(
    "absolute w-full h-full box-content border rounded-full transition-colors duration-100",
    "before:absolute before:bg-white before:w-5 before:h-5 before:rounded-full before:transition-transform before:duration-100",
    {
      "bg-neutral-400 border-neutral-400": !isChecked,
      "bg-blue-500 border-blue-500 before:translate-x-5": isChecked,
    }
  );

  return (
    <label className="relative inline-block w-10 h-5">
      <input
        type="checkbox"
        className="opacity-0 w-0 h-0"
        checked={isChecked}
        onChange={onChange}
      />
      <span className={sliderClassNames}></span>
    </label>
  );
};

export default ToggleSwitch;
