"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StyledDialog } from "@/components/StyledDialog";

export function AuthForm() {
  const { signIn } = useAuthActions();
  const { isAuthenticated } = useConvexAuth();
  const currentUser = useQuery(api.users.getCurrentUser);
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [justLoggedIn, setJustLoggedIn] = useState(false);

  // Handle login notification when user becomes authenticated
  useEffect(() => {
    if (isAuthenticated && currentUser && justLoggedIn && !isSignUp) {
      const sendLoginNotification = async () => {
        try {
          await fetch("/api/auth/login-notification", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: currentUser._id,
              userEmail: currentUser.email || email,
              userName: currentUser.name || name || "Unknown User",
            }),
          });
        } catch (notificationError) {
          console.error(
            "Failed to send login notification:",
            notificationError
          );
        }
        setJustLoggedIn(false);
      };

      sendLoginNotification();
      router.push("/tasks");
    } else if (isAuthenticated && !justLoggedIn) {
      // User was already authenticated, just redirect
      router.push("/tasks");
    }
  }, [
    isAuthenticated,
    currentUser,
    justLoggedIn,
    isSignUp,
    email,
    name,
    router,
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isForgotPassword) {
        // For now, just show a message since password reset would need email configuration
        setMessage(
          "Password reset functionality will be implemented once email is configured."
        );
        return;
      }

      const authParams: {
        email: string;
        password: string;
        flow: "signUp" | "signIn";
        name?: string;
      } = {
        email,
        password,
        flow: isSignUp ? "signUp" : "signIn",
      };

      if (isSignUp && name) {
        authParams.name = name;
      }

      await signIn("password", authParams);

      // Set flag to trigger login notification in useEffect
      if (!isSignUp) {
        setJustLoggedIn(true);
      } else {
        // For signups, just redirect
        router.push("/tasks");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-8 relative">
      {/* Floating header */}
      <div className="absolute top-8 left-8 text-primary text-xl">
        <span className="text-shimmer font-medium">Minerva</span>
      </div>

      <StyledDialog
        isOpen={true}
        onClose={() => {}} // No close action for auth form
        title={
          isForgotPassword
            ? "Reset Password"
            : isSignUp
              ? "Join Minerva"
              : "Welcome Back"
        }
        description={
          isForgotPassword
            ? "Enter your email to reset your password"
            : isSignUp
              ? "Create your account to begin your journey"
              : "Sign in to continue your personal development"
        }
        maxWidth="440px"
        showTriangle={true}
        footer={
          <div className="w-full space-y-4">
            <Button
              type="submit"
              form="auth-form"
              className="w-full glass-panel hover:glow-aqua py-4 bg-primary/10 border border-primary/50 text-primary font-medium rounded-lg transition-all duration-300"
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : isForgotPassword
                  ? "Send Reset Link"
                  : isSignUp
                    ? "Create Account"
                    : "Sign In"}
            </Button>

            <div className="text-center space-y-3 pt-6 border-t border-primary/20">
              {!isForgotPassword && (
                <>
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="w-full text-secondary hover:text-primary font-medium text-sm"
                  >
                    {isSignUp
                      ? "Already have an account? Sign in"
                      : "Don't have an account? Sign up"}
                  </Button>
                  {!isSignUp && (
                    <Button
                      type="button"
                      variant="link"
                      onClick={() => setIsForgotPassword(true)}
                      className="text-muted-foreground hover:text-secondary font-medium text-sm"
                    >
                      Forgot your password?
                    </Button>
                  )}
                </>
              )}
              {isForgotPassword && (
                <Button
                  type="button"
                  variant="link"
                  onClick={() => {
                    setIsForgotPassword(false);
                    setError(null);
                    setMessage(null);
                  }}
                  className="text-secondary hover:text-primary font-medium text-sm"
                >
                  Back to sign in
                </Button>
              )}
            </div>
          </div>
        }
      >
        <form id="auth-form" onSubmit={handleSubmit} className="space-y-6">
          {isSignUp && !isForgotPassword && (
            <div className="space-y-3">
              <Label
                htmlFor="name"
                className="text-secondary font-medium text-sm"
              >
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                required={isSignUp}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="bg-input border border-transparent text-foreground px-4 py-3 font-medium rounded-lg hover:border-primary/30 focus:border-primary focus:shadow-lg focus:shadow-primary/20 transition-all duration-300"
              />
            </div>
          )}

          <div className="space-y-3">
            <Label
              htmlFor="email"
              className="text-secondary font-medium text-sm"
            >
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="bg-input border border-transparent text-foreground px-4 py-3 font-medium rounded-lg hover:border-primary/30 focus:border-primary focus:shadow-lg focus:shadow-primary/20 transition-all duration-300"
            />
          </div>

          {!isForgotPassword && (
            <div className="space-y-3">
              <Label
                htmlFor="password"
                className="text-secondary font-medium text-sm"
              >
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="bg-input border border-transparent text-foreground px-4 py-3 font-medium rounded-lg hover:border-primary/30 focus:border-primary focus:shadow-lg focus:shadow-primary/20 transition-all duration-300"
              />
            </div>
          )}

          {error && (
            <div className="text-destructive text-sm text-center glass-panel p-4 rounded-lg border border-destructive/30 bg-destructive/10">
              {error}
            </div>
          )}

          {message && (
            <div className="text-primary text-sm text-center glass-panel p-4 rounded-lg border border-primary/30 bg-primary/10">
              {message}
            </div>
          )}
        </form>
      </StyledDialog>
    </div>
  );
}
