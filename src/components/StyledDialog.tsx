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
        className="p-0 bg-transparent border-0 shadow-none soul-dive mx-8 [&>*]:shadow-none [&>*]:border-0"
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
          className="absolute transform -rotate-[4deg] translate-x-6 translate-y-4 -z-10"
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
              d="M 20 0 Q 50 -3 80 0 Q 100 0 100 20 Q 103 50 100 80 Q 100 100 80 100 Q 50 103 20 100 Q 0 100 0 80 Q -3 50 0 20 Q 0 0 20 0 Z"
              fill="#1E90FF"
              opacity="0.85"
            />
          </svg>
        </div>

        {/* Large Angled Triangular Accent Element - Overflowing Top Left */}
        {showTriangle && (
          <div className="absolute -top-[60px] -left-[80px] z-20">
            <svg
              width="200"
              height="100"
              viewBox="0 0 200 100"
              className="overflow-visible"
            >
              <path
                d="M 0 0 L 140 0 L 20 60 Z"
                fill="rgba(0, 102, 204, 0.85)"
                className="drop-shadow-lg"
                transform="rotate(190 100 50)"
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
              d="M 20 0 Q 50 -3 80 0 Q 100 0 100 20 Q 103 50 100 80 Q 100 100 80 100 Q 50 103 20 100 Q 0 100 0 80 Q -3 50 0 20 Q 0 0 20 0 Z"
              fill="hsl(var(--card) / 0.85)"
            />
          </svg>

          {/* Main Dialog Content */}
          <div className="relative z-10 p-8" style={{ padding: "4rem" }}>
            <DialogHeader className="mb-6">
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
