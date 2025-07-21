import "@testing-library/jest-dom";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
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

// Mock convex/react
mock.module("convex/react", () => ({
  useConvexAuth: () => ({ isAuthenticated: false }),
  useQuery: () => null,
}));

describe.skip("AuthForm", () => {
  beforeEach(() => {
    mockSignIn.mockClear();
    mockPush.mockClear();
  });

  afterEach(() => {
    cleanup();
    document.body.innerHTML = "";
  });

  test("renders sign in form by default", async () => {
    render(<AuthForm />);

    // Wait for the dialog content to be rendered in the portal
    await waitFor(() => {
      expect(screen.getByText("Welcome Back")).toBeInTheDocument();
    });

    expect(
      screen.getByText("Sign in to continue your personal development")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument();
  });

  test("switches to sign up mode when clicking toggle", async () => {
    const user = userEvent.setup({ skipHover: true });
    render(<AuthForm />);

    // Wait for the dialog content to be rendered
    await waitFor(() => {
      expect(screen.getByText("Welcome Back")).toBeInTheDocument();
    });

    const signUpButton = screen.getByRole("button", {
      name: "Don't have an account? Sign up",
    });
    await user.click(signUpButton);

    await waitFor(() => {
      expect(screen.getByText("Create Account")).toBeInTheDocument();
    });

    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Create Account" })
    ).toBeInTheDocument();
  });

  test("switches to forgot password mode", async () => {
    const user = userEvent.setup({ skipHover: true });
    render(<AuthForm />);

    // Wait for the dialog content to be rendered
    await waitFor(() => {
      expect(screen.getByText("Welcome Back")).toBeInTheDocument();
    });

    const forgotPasswordButton = screen.getByRole("button", {
      name: "Forgot your password?",
    });
    await user.click(forgotPasswordButton);

    await waitFor(() => {
      expect(screen.getByText("Reset Password")).toBeInTheDocument();
    });

    expect(
      screen.getByText("Enter your email to reset your password")
    ).toBeInTheDocument();
    expect(screen.queryByLabelText("Password")).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Send Reset Link" })
    ).toBeInTheDocument();
  });

  test("navigates back from forgot password to sign in", async () => {
    const user = userEvent.setup({ skipHover: true });
    render(<AuthForm />);

    // Wait for the dialog content to be rendered
    await waitFor(() => {
      expect(screen.getByText("Welcome Back")).toBeInTheDocument();
    });

    // Go to forgot password
    const forgotPasswordButton = screen.getByRole("button", {
      name: "Forgot your password?",
    });
    await user.click(forgotPasswordButton);

    await waitFor(() => {
      expect(screen.getByText("Reset Password")).toBeInTheDocument();
    });

    // Go back to sign in
    const backButton = screen.getByRole("button", {
      name: "Back to sign in",
    });
    await user.click(backButton);

    await waitFor(() => {
      expect(screen.getByText("Welcome Back")).toBeInTheDocument();
    });
  });
});
