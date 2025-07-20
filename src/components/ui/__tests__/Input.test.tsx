import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, mock } from "bun:test";
import { Input } from "../input";

describe("Input", () => {
  test("renders input field", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  test("handles text input", async () => {
    const user = userEvent.setup();
    render(<Input />);

    const input = screen.getByRole("textbox");
    await user.type(input, "Hello world");

    expect(input).toHaveValue("Hello world");
  });

  test("handles onChange events", async () => {
    const user = userEvent.setup();
    const handleChange = mock(() => {});

    render(<Input onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    await user.type(input, "a");

    expect(handleChange).toHaveBeenCalled();
  });

  test("applies default classes", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass(
      "flex",
      "h-10",
      "w-full",
      "rounded-md",
      "border",
      "border-input",
      "bg-background",
      "px-3",
      "py-2"
    );
  });

  test("is disabled when disabled prop is true", () => {
    render(<Input disabled />);
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
    expect(input).toHaveClass(
      "disabled:cursor-not-allowed",
      "disabled:opacity-50"
    );
  });

  test("applies custom className", () => {
    render(<Input className="custom-input" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("custom-input");
  });

  test("forwards additional props", () => {
    render(<Input data-testid="custom-input" type="email" required />);
    const input = screen.getByTestId("custom-input");
    expect(input).toHaveAttribute("type", "email");
    expect(input).toBeRequired();
  });

  test("handles different input types", () => {
    render(<Input type="password" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "password");
  });

  test("supports value and defaultValue props", () => {
    const { rerender } = render(<Input defaultValue="default" />);
    expect(screen.getByRole("textbox")).toHaveValue("default");

    rerender(<Input value="controlled" readOnly />);
    expect(screen.getByRole("textbox")).toHaveValue("controlled");
  });
});
