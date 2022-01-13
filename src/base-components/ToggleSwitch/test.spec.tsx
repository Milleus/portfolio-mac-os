import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ToggleSwitch, { ToggleSwitchProps } from ".";

const setup = (overrideProps?: Partial<ToggleSwitchProps>) => {
  render(
    <ToggleSwitch isChecked={false} onChange={jest.fn()} {...overrideProps} />
  );
};

describe("ToggleSwitch", () => {
  it("should display toggle switch", () => {
    setup();

    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  describe("when toggle switch is clicked", () => {
    it("should call on change handler", () => {
      const mockProps = { onChange: jest.fn() };

      setup(mockProps);

      userEvent.click(screen.getByRole("checkbox"));

      expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    });
  });
});
