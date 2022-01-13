import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Tooltip, { TooltipProps } from ".";

const setup = (overrideProps?: Partial<TooltipProps>) => {
  render(
    <Tooltip content="" {...overrideProps}>
      <div>hover target</div>
    </Tooltip>
  );
};

describe("Tooltip", () => {
  it("should display hover target", () => {
    setup();

    expect(screen.getByText("hover target")).toBeInTheDocument();
  });

  describe("when it is not hovered", () => {
    it("should not display tooltip content", () => {
      const mockProps = { content: "tooltip content" };

      setup(mockProps);

      expect(screen.queryByText(mockProps.content)).not.toBeInTheDocument();

      userEvent.hover(screen.getByText("hover target"));
      userEvent.unhover(screen.getByText("hover target"));

      expect(screen.queryByText(mockProps.content)).not.toBeInTheDocument();
    });
  });

  describe("when it is hovered", () => {
    it("should display tooltip content", () => {
      const mockProps = { content: "tooltip content" };

      setup(mockProps);

      userEvent.hover(screen.getByText("hover target"));

      expect(screen.getByText(mockProps.content)).toBeInTheDocument();
    });
  });
});
