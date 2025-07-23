"use client";

import { cn } from "@/lib/utils";

interface SoulBubblesIconProps {
  className?: string;
  size?: number;
}

export function SoulBubblesIcon({
  className,
  size = 24,
}: SoulBubblesIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("soul-bubbles-icon", className)}
    >
      {/* Define gradients for the bubbles */}
      <defs>
        <linearGradient
          id="bubble-gradient-1"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#79D7FD" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#00BBFA" stopOpacity="1" />
        </linearGradient>
        <linearGradient
          id="bubble-gradient-2"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#00BBFA" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#79D7FD" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient
          id="bubble-gradient-3"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#79D7FD" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#00BBFA" stopOpacity="0.9" />
        </linearGradient>

        {/* Glass-like reflection filter */}
        <filter
          id="glass-reflection"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
        >
          <feGaussianBlur in="SourceAlpha" stdDeviation="1" />
          <feOffset dx="0" dy="0.5" result="offset" />
          <feFlood floodColor="#ffffff" floodOpacity="0.3" />
          <feComposite in2="offset" operator="in" />
        </filter>
      </defs>

      {/* Top bubble - slightly smaller, more ethereal */}
      <circle
        cx="12"
        cy="6"
        r="3.2"
        fill="url(#bubble-gradient-1)"
        filter="url(#glass-reflection)"
        className="animate-pulse"
        style={{
          animationDelay: "0s",
          animationDuration: "3s",
        }}
      />

      {/* Middle bubble - largest, primary action indicator */}
      <circle
        cx="12"
        cy="12"
        r="3.8"
        fill="url(#bubble-gradient-2)"
        filter="url(#glass-reflection)"
        className="animate-pulse"
        style={{
          animationDelay: "0.5s",
          animationDuration: "2.5s",
        }}
      />

      {/* Bottom bubble - medium size, completing the trio */}
      <circle
        cx="12"
        cy="18"
        r="3.5"
        fill="url(#bubble-gradient-3)"
        filter="url(#glass-reflection)"
        className="animate-pulse"
        style={{
          animationDelay: "1s",
          animationDuration: "3.5s",
        }}
      />

      {/* Subtle shimmer highlights */}
      <ellipse
        cx="10.5"
        cy="5"
        rx="0.8"
        ry="1.2"
        fill="#ffffff"
        opacity="0.4"
        className="animate-pulse"
        style={{
          animationDelay: "0s",
          animationDuration: "4s",
        }}
      />
      <ellipse
        cx="10.2"
        cy="11"
        rx="1"
        ry="1.5"
        fill="#ffffff"
        opacity="0.3"
        className="animate-pulse"
        style={{
          animationDelay: "0.7s",
          animationDuration: "3s",
        }}
      />
      <ellipse
        cx="10.3"
        cy="17"
        rx="0.9"
        ry="1.3"
        fill="#ffffff"
        opacity="0.35"
        className="animate-pulse"
        style={{
          animationDelay: "1.2s",
          animationDuration: "3.8s",
        }}
      />
    </svg>
  );
}
