"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function AuthForm() {
  const { signIn } = useAuthActions();
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

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

      // Redirect to tasks page after successful authentication
      router.push("/tasks");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-8 relative">
      {/* Terminal header effect */}
      <div className="absolute top-4 left-4 text-primary text-sm font-mono">
        <span className="terminal-text">&gt; minerva_auth.exe</span>
      </div>

      <Card
        className="w-full border border-primary/30 shadow-lg shadow-primary/20 bg-card/90 backdrop-blur-sm"
        style={{ maxWidth: "384px" }}
      >
        <CardHeader className="space-y-6 px-8 pt-8">
          <CardTitle className="text-2xl text-center text-purple-300 font-mono tracking-wider">
            {isForgotPassword
              ? "RESET_PASSWORD.exe"
              : isSignUp
                ? "CREATE_USER.exe"
                : "LOGIN.exe"}
          </CardTitle>
          <CardDescription className="text-center text-blue-300 font-mono text-sm tracking-wide">
            {isForgotPassword
              ? "// Enter credentials to reset access"
              : "// Welcome to the Minerva Network"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-10 px-8 pb-10">
          <form onSubmit={handleSubmit} className="space-y-10">
            {isSignUp && !isForgotPassword && (
              <div className="space-y-4">
                <Label
                  htmlFor="name"
                  className="text-blue-300 font-mono text-sm tracking-wider"
                >
                  &gt; USER_NAME:
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required={isSignUp}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="user.name"
                  className="lain-input cyber-border"
                />
              </div>
            )}

            <div className="space-y-4">
              <Label
                htmlFor="email"
                className="text-blue-300 font-mono text-sm tracking-wider"
              >
                &gt; EMAIL_ADDR:
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@domain.net"
                className="lain-input cyber-border"
              />
            </div>

            {!isForgotPassword && (
              <div className="space-y-4">
                <Label
                  htmlFor="password"
                  className="text-blue-300 font-mono text-sm tracking-wider"
                >
                  &gt; PASSWD:
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="lain-input cyber-border"
                />
              </div>
            )}

            {error && (
              <div className="text-destructive text-sm text-center font-mono shadow-lg shadow-destructive/20 bg-destructive/10 p-2 rounded border border-destructive/20">
                ERROR: {error}
              </div>
            )}

            {message && (
              <div className="text-primary text-sm text-center font-mono shadow-lg shadow-primary/20 bg-primary/10 p-2 rounded border border-primary/20">
                INFO: {message}
              </div>
            )}

            <Button
              type="submit"
              className="w-full shadow-lg shadow-primary/30 hover:shadow-primary/50 font-mono tracking-wider bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
              disabled={loading}
            >
              {loading
                ? "[PROCESSING...]"
                : isForgotPassword
                  ? "[SEND_RESET]"
                  : isSignUp
                    ? "[CREATE_USER]"
                    : "[LOGIN]"}
            </Button>

            <div className="text-center space-y-3 pt-4 border-t border-border/20">
              {!isForgotPassword && (
                <>
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="w-full text-accent hover:text-primary font-mono text-sm tracking-wide"
                  >
                    {isSignUp
                      ? "// EXISTING_USER? → [LOGIN]"
                      : "// NEW_USER? → [REGISTER]"}
                  </Button>
                  {!isSignUp && (
                    <Button
                      type="button"
                      variant="link"
                      onClick={() => setIsForgotPassword(true)}
                      className="text-muted-foreground hover:text-accent font-mono text-xs"
                    >
                      &gt; passwd_reset.exe
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
                  className="text-accent hover:text-primary font-mono text-sm"
                >
                  &lt; return_to_login.exe
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
