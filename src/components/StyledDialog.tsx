"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ReactNode } from "react";

interface StyledDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  maxWidth?: string;
  showTriangle?: boolean;
}

export function StyledDialog({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  maxWidth = "56rem",
  showTriangle = true,
}: StyledDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="p-0 bg-transparent border-0 shadow-none soul-dive mx-8 [&>*]:shadow-none [&>*]:border-0 overflow-visible"
        showCloseButton={false}
        style={{
          maxWidth,
          width: "95vw",
          boxShadow: "none",
          border: "none",
          outline: "none",
        }}
      >
        {/* Aquatic-themed Shadow - Large Rotated Dialog Shape */}
        <div
          className="absolute transform -rotate-[3deg] translate-x-2 translate-y-1 -z-10"
          style={{
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M 25 0 Q 50 -2 75 0 Q 100 0 100 25 Q 102 50 100 75 Q 100 100 75 100 Q 50 102 25 100 Q 0 100 0 75 Q -2 50 0 25 Q 0 0 25 0 Z"
              fill="#1E90FF"
              opacity="0.85"
            />
          </svg>
        </div>

        {/* Large Angled Triangular Accent Element - Overflowing Top Left */}
        {showTriangle && (
          <div className="triangle-accent">
            <svg
              width="220"
              height="110"
              viewBox="0 0 220 110"
              className="overflow-visible"
            >
              <path
                d="M 0 30 L 160 0 L 30 80 Z"
                fill="#007FFF"
                className="drop-shadow-lg"
                transform="rotate(185 110 55)"
              />
            </svg>
          </div>
        )}

        {/* Main Dialog Rectangle - SVG Shape */}
        <div className="relative overflow-hidden">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M 25 0 Q 50 -2 75 0 Q 100 0 100 25 Q 102 50 100 75 Q 100 100 75 100 Q 50 102 25 100 Q 0 100 0 75 Q -2 50 0 25 Q 0 0 25 0 Z"
              fill="hsl(var(--card) / 0.85)"
            />
          </svg>

          {/* Main Dialog Content - Generic reusable component */}
          <div
            className="relative z-[15] p-8"
            style={{ padding: "2rem 5rem 2.5rem 5rem" }}
          >
            <DialogHeader className="mb-4">
              <DialogTitle className="text-2xl text-foreground font-medium mb-2">
                {title}
              </DialogTitle>
              {description && (
                <DialogDescription className="text-secondary/80 text-sm">
                  {description}
                </DialogDescription>
              )}
            </DialogHeader>

            {children}

            {footer && (
              <DialogFooter className="pt-6 mt-6">{footer}</DialogFooter>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
