import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Login, { LoginProps } from ".";

const setup = (overrideProps?: Partial<LoginProps>) => {
  render(<Login onLoginClick={jest.fn} {...overrideProps} />);
};

describe("Login", () => {
  it("should render login", () => {
    setup();

    expect(screen.getByText("Log in")).toBeInTheDocument();
  });

  describe("when user clicks log in button", () => {
    it("should call click handler", () => {
      const mockProps = { onLoginClick: jest.fn() };

      setup(mockProps);

      userEvent.click(screen.getByRole("button"));

      expect(mockProps.onLoginClick).toHaveBeenCalledTimes(1);
    });
  });
});
