import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, beforeEach, afterEach, mock } from "bun:test";
import { AuthForm } from "../AuthForm";

// Mock Next.js router
const mockPush = mock(() => {});
mock.module("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

// Mock Convex auth
const mockSignIn = mock(() => Promise.resolve());
mock.module("@convex-dev/auth/react", () => ({
  useAuthActions: () => ({ signIn: mockSignIn }),
}));

describe("AuthForm", () => {
  beforeEach(() => {
    mockSignIn.mockClear();
    mockPush.mockClear();
  });

  afterEach(() => {
    cleanup();
    document.body.innerHTML = "";
  });

  test("renders sign in form by default", () => {
    render(<AuthForm />);

    expect(screen.getByText("LOGIN.exe")).toBeInTheDocument();
    expect(
      screen.getByText("// Welcome to the Minerva Network")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("> EMAIL_ADDR:")).toBeInTheDocument();
    expect(screen.getByLabelText("> PASSWD:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "[LOGIN]" })).toBeInTheDocument();
  });

  test("switches to sign up mode when clicking toggle", async () => {
    const user = userEvent.setup();
    render(<AuthForm />);

    const signUpButton = screen.getByRole("button", {
      name: "// NEW_USER? → [REGISTER]",
    });
    await user.click(signUpButton);

    expect(screen.getByText("CREATE_USER.exe")).toBeInTheDocument();
    expect(screen.getByLabelText("> USER_NAME:")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "[CREATE_USER]" })
    ).toBeInTheDocument();
  });

  test("switches to forgot password mode", async () => {
    const user = userEvent.setup();
    render(<AuthForm />);

    const forgotPasswordButton = screen.getByRole("button", {
      name: "> passwd_reset.exe",
    });
    await user.click(forgotPasswordButton);

    expect(screen.getByText("RESET_PASSWORD.exe")).toBeInTheDocument();
    expect(
      screen.getByText("// Enter credentials to reset access")
    ).toBeInTheDocument();
    expect(screen.queryByLabelText("> PASSWD:")).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "[SEND_RESET]" })
    ).toBeInTheDocument();
  });

  test("navigates back from forgot password to sign in", async () => {
    const user = userEvent.setup();
    render(<AuthForm />);

    // Go to forgot password
    const forgotPasswordButton = screen.getByRole("button", {
      name: "> passwd_reset.exe",
    });
    await user.click(forgotPasswordButton);
    expect(screen.getByText("RESET_PASSWORD.exe")).toBeInTheDocument();

    // Go back to sign in
    const backButton = screen.getByRole("button", {
      name: "< return_to_login.exe",
    });
    await user.click(backButton);
    expect(screen.getByText("LOGIN.exe")).toBeInTheDocument();
  });
});
