import { ChangeEventHandler, FC, useEffect, useRef } from "react";

export type InputRangeProps = {
  value: number;
  min: number;
  max: number;
  dataId?: string;
  onChange: ChangeEventHandler;
};

const InputRange: FC<InputRangeProps> = ({
  value,
  min,
  max,
  dataId,
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
    <input
      ref={inputRef}
      type="range"
      className="input-range"
      value={value}
      min={min}
      max={max}
      data-id={dataId}
      onChange={onChange}
    />
  );
};

export default InputRange;
