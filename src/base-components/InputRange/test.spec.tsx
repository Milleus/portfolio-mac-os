import { fireEvent, render, screen } from "@testing-library/react";

import InputRange, { InputRangeProps } from ".";

const setup = (overrideProps?: Partial<InputRangeProps>) => {
  render(
    <InputRange
      value={0.5}
      min={0}
      max={1}
      onChange={jest.fn()}
      {...overrideProps}
    />
  );
};

describe("InputRange", () => {
  it("should display input range slider", () => {
    const mockProps = { icon: <div>icon</div> };

    setup(mockProps);

    expect(screen.getByTestId("input-range")).toBeInTheDocument();
    expect(screen.getByText("icon")).toBeInTheDocument();
  });

  describe("when value changes", () => {
    it("should call on change handler", () => {
      const mockProps = { onChange: jest.fn() };

      setup(mockProps);

      fireEvent.change(screen.getByTestId("input-range"), {
        target: { value: 0.6 },
      });

      expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    });
  });
});
