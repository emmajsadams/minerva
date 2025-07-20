import React from "react";

// Lain-inspired geometric delete icon - angular X with circuit traces
export const DeleteIcon = ({ className }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Background circuit traces */}
    <path
      d="M2 2L6 6M10 6L14 2M2 14L6 10M10 10L14 14"
      stroke="currentColor"
      strokeWidth="0.5"
      opacity="0.3"
    />
    {/* Main X shape */}
    <path
      d="M3 3L13 13M13 3L3 13"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
    />
    {/* Corner accents */}
    <rect x="2" y="2" width="1" height="1" fill="currentColor" opacity="0.6" />
    <rect x="13" y="2" width="1" height="1" fill="currentColor" opacity="0.6" />
    <rect x="2" y="13" width="1" height="1" fill="currentColor" opacity="0.6" />
    <rect
      x="13"
      y="13"
      width="1"
      height="1"
      fill="currentColor"
      opacity="0.6"
    />
  </svg>
);

// Confirmation icon - geometric warning/confirm symbol
export const ConfirmIcon = ({ className }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Background pulse lines */}
    <path
      d="M1 8L4 8M6 8L10 8M12 8L15 8"
      stroke="currentColor"
      strokeWidth="0.5"
      opacity="0.4"
    />
    <path
      d="M8 1L8 4M8 6L8 10M8 12L8 15"
      stroke="currentColor"
      strokeWidth="0.5"
      opacity="0.4"
    />
    {/* Main warning triangle */}
    <path
      d="M8 2L14 13L2 13L8 2Z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="miter"
      fill="none"
    />
    {/* Warning symbol inside */}
    <path
      d="M8 6L8 9M8 11L8 11.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
    />
    {/* Corner pixels for emphasis */}
    <rect x="7" y="1" width="1" height="1" fill="currentColor" opacity="0.8" />
    <rect x="1" y="13" width="1" height="1" fill="currentColor" opacity="0.8" />
    <rect
      x="14"
      y="13"
      width="1"
      height="1"
      fill="currentColor"
      opacity="0.8"
    />
  </svg>
);

// Lain-inspired geometric edit icon - angular pencil with data streams
export const EditIcon = ({ className }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Background data streams */}
    <path
      d="M1 15L4 12M1 13L3 11M1 11L2 10"
      stroke="currentColor"
      strokeWidth="0.5"
      opacity="0.3"
    />
    {/* Main pencil shape - angular/geometric */}
    <path
      d="M11 2L14 5L6 13L2 14L3 10L11 2Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="miter"
      fill="none"
    />
    {/* Pencil tip accent */}
    <path d="M11 2L14 5L13 6L10 3L11 2Z" fill="currentColor" opacity="0.4" />
    {/* Corner pixels */}
    <rect x="13" y="1" width="1" height="1" fill="currentColor" opacity="0.8" />
    <rect x="15" y="3" width="1" height="1" fill="currentColor" opacity="0.8" />
    <rect x="1" y="15" width="1" height="1" fill="currentColor" opacity="0.8" />
  </svg>
);

// Icon button component matching the Lain aesthetic
export const IconButton = ({
  children,
  onClick,
  variant = "default",
  className = "",
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "destructive";
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const baseClasses =
    "inline-flex items-center justify-center w-8 h-8 transition-all duration-300 font-mono text-sm border backdrop-blur-sm hover:shadow-lg focus:outline-none";

  const variantClasses = {
    default:
      "border-primary/40 text-accent hover:border-accent/60 hover:shadow-accent/30 hover:glow-blue",
    destructive:
      "border-destructive/40 text-destructive hover:border-destructive/60 hover:shadow-destructive/30 hover:glow-red",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
