import { render, screen } from "@testing-library/react";

import Link, { LinkProps } from ".";

const setup = (overrideProps?: Partial<LinkProps>) => {
  render(<Link {...overrideProps}>link text</Link>);
};

describe("Link", () => {
  it("should display link", () => {
    const mockProps = { href: "https://www.google.com" };

    setup(mockProps);

    expect(screen.getByText("link text")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", mockProps.href);
    expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("link")).toHaveAttribute(
      "rel",
      "noopener noreferrer"
    );
  });
});
