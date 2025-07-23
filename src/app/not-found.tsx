"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.push("/tasks");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const handleReturnToTasks = () => {
    router.push("/tasks");
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Glass panel container with Sea of Souls theme */}
      <div className="glass-panel max-w-2xl mx-auto p-8 rounded-lg relative z-10">
        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: "hsl(var(--primary) / 0.3)" }}
          ></div>
          <div
            className="absolute top-3/4 right-1/4 w-1 h-1 rounded-full animate-pulse"
            style={{
              backgroundColor: "hsl(var(--soul-glow) / 0.4)",
              animationDelay: "1000ms",
            }}
          ></div>
          <div
            className="absolute top-1/2 right-1/3 w-1.5 h-1.5 rounded-full animate-pulse"
            style={{
              backgroundColor: "hsl(var(--glass-shimmer) / 0.3)",
              animationDelay: "500ms",
            }}
          ></div>
        </div>

        <div className="text-center space-y-8">
          {/* 404 Title with Soul Glow effect */}
          <div className="space-y-4">
            <h1 className="text-8xl font-bold text-shimmer glow-soul">404</h1>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          </div>

          {/* Main message */}
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-primary">
              Lost in the Sea of Souls
            </h2>
            <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
              The page you&apos;re looking for has drifted into the depths of the
              digital ocean. Let me guide you back to familiar waters.
            </p>
          </div>

          {/* Countdown and redirect info */}
          <div className="space-y-6">
            <div className="glass-panel p-4 rounded-lg border border-border/30">
              <p className="text-secondary font-medium">
                Automatically returning to tasks in{" "}
                <span className="text-primary font-bold text-xl glow-aqua">
                  {countdown}
                </span>{" "}
                seconds
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleReturnToTasks}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 glow-aqua transition-all duration-300 hover:scale-105"
              >
                Return to Tasks
              </Button>
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="border-border/50 hover:border-primary/50 px-8 py-3 transition-all duration-300 hover:scale-105 soul-border"
              >
                Go Back
              </Button>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="pt-8 border-t border-border/30">
            <p className="text-sm text-muted-foreground">
              &ldquo;In the depths of uncertainty, we find our way back to purpose.&rdquo;
            </p>
          </div>
        </div>

        {/* Animated soul energy accent */}
        <div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full animate-pulse"
          style={{
            backgroundColor: "hsl(var(--soul-glow) / 0.1)",
            filter: "blur(48px)",
          }}
        ></div>
        <div
          className="absolute -bottom-20 -left-20 w-32 h-32 rounded-full animate-pulse"
          style={{
            backgroundColor: "hsl(var(--primary) / 0.1)",
            filter: "blur(32px)",
            animationDelay: "1000ms",
          }}
        ></div>
      </div>

      {/* Background underwater effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full animate-pulse"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--glass-shimmer) / 0.05) 0%, transparent 70%)",
            animationDelay: "300ms",
          }}
        ></div>
        <div
          className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full animate-pulse"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--soul-glow) / 0.05) 0%, transparent 70%)",
            animationDelay: "700ms",
          }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full animate-pulse"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--primary) / 0.03) 0%, transparent 70%)",
            animationDelay: "1500ms",
          }}
        ></div>
      </div>
    </div>
  );
}
