import { ChangeEventHandler, FC, ReactNode, useEffect, useRef } from "react";

export type InputRangeProps = {
  value: number;
  min: number;
  max: number;
  step?: number;
  icon?: ReactNode;
  onChange: ChangeEventHandler;
};

const InputRange: FC<InputRangeProps> = ({
  value,
  min,
  max,
  step,
  icon,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      const ratio = (value - min) / (max - min);

      inputRef.current.style.setProperty("--ratio", ratio.toString());
    }
  }, [value, min, max]);

  return (
    <div className="relative flex">
      {icon && (
        <div className="absolute w-5 h-5 border border-transparent box-content flex justify-center items-center text-gray-400 dark:text-gray-500">
          {icon}
        </div>
      )}
      <input
        ref={inputRef}
        type="range"
        className="input-range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
      />
    </div>
  );
};

export default InputRange;
