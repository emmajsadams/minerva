import React from "react";

// Persona 3 Reload-inspired aquatic delete icon - dissolving water drop with flowing currents
export const DeleteIcon = ({ className }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Underwater current flows */}
    <path
      d="M2 4C4 2 6 4 8 2C10 4 12 2 14 4"
      stroke="currentColor"
      strokeWidth="0.5"
      opacity="0.2"
      fill="none"
    />
    <path
      d="M2 12C4 10 6 12 8 10C10 12 12 10 14 12"
      stroke="currentColor"
      strokeWidth="0.5"
      opacity="0.2"
      fill="none"
    />
    {/* Main water drop dissolving shape */}
    <path
      d="M8 2C6 4 4 6 4 9C4 11.8 5.8 14 8 14C10.2 14 12 11.8 12 9C12 6 10 4 8 2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Dissolving X pattern inside - flowing like water */}
    <path
      d="M6.5 7.5C7 8 7.5 8.5 8 9C8.5 8.5 9 8 9.5 7.5M9.5 10.5C9 10 8.5 9.5 8 9C7.5 9.5 7 10 6.5 10.5"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    {/* Shimmer highlights like underwater light */}
    <circle cx="7" cy="6" r="0.5" fill="currentColor" opacity="0.4" />
    <circle cx="9.5" cy="8" r="0.3" fill="currentColor" opacity="0.6" />
  </svg>
);

// Persona 3 Reload-inspired aquatic confirmation icon - crystalline warning with ripple effect
export const ConfirmIcon = ({ className }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Ripple waves emanating from center */}
    <circle
      cx="8"
      cy="8"
      r="6"
      stroke="currentColor"
      strokeWidth="0.5"
      opacity="0.2"
      fill="none"
    />
    <circle
      cx="8"
      cy="8"
      r="4"
      stroke="currentColor"
      strokeWidth="0.5"
      opacity="0.3"
      fill="none"
    />
    {/* Crystalline warning shape - organic triangle */}
    <path
      d="M8 3C8.5 3 9 3.3 9.2 3.8L13 11.2C13.3 11.8 12.9 12.5 12.2 12.5H3.8C3.1 12.5 2.7 11.8 3 11.2L6.8 3.8C7 3.3 7.5 3 8 3Z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Flowing warning symbol inside */}
    <path
      d="M8 6.5C8 6.5 8 8 8 8.5M8 10C8 10.3 8 10.3 8 10.3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Bubble highlights for underwater effect */}
    <circle cx="6.5" cy="5" r="0.3" fill="currentColor" opacity="0.5" />
    <circle cx="9.5" cy="6" r="0.2" fill="currentColor" opacity="0.6" />
    <circle cx="5" cy="10" r="0.2" fill="currentColor" opacity="0.4" />
  </svg>
);

// Persona 3 Reload-inspired aquatic edit icon - flowing quill with water currents
export const EditIcon = ({ className }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Flowing water currents around the quill */}
    <path
      d="M2 13C3 12 4 13 5 12C6 13 7 12 8 13"
      stroke="currentColor"
      strokeWidth="0.5"
      opacity="0.2"
      fill="none"
    />
    <path
      d="M1 11C2.5 10.5 4 11.5 5.5 11C7 11.5 8.5 10.5 10 11"
      stroke="currentColor"
      strokeWidth="0.5"
      opacity="0.25"
      fill="none"
    />
    {/* Main flowing quill shape - organic curves */}
    <path
      d="M11.5 2.5C12.2 2.2 13 2.8 13.2 3.5C13.5 4.2 13 4.8 12.5 5L6 11.5C5.7 11.8 5.2 11.9 4.8 11.7L3.3 11C3 10.8 2.9 10.4 3.1 10.1L3.8 9.2C3.9 9 4.1 8.9 4.3 9L5.5 9.5L11.5 2.5Z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Ink flow from quill tip */}
    <path
      d="M6 11.5C5.5 12 4.8 12.3 4 12.5C3.5 12.6 3 12.8 2.5 13.2"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.6"
    />
    {/* Shimmer highlights */}
    <circle cx="10" cy="4" r="0.4" fill="currentColor" opacity="0.5" />
    <circle cx="8" cy="7" r="0.3" fill="currentColor" opacity="0.6" />
    <circle cx="5" cy="10" r="0.2" fill="currentColor" opacity="0.4" />
  </svg>
);

// Persona 3 Reload-inspired aquatic plus icon - crystalline formation with flowing energy
export const PlusIcon = ({ className }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Energy ripples emanating outward */}
    <circle
      cx="8"
      cy="8"
      r="6"
      stroke="currentColor"
      strokeWidth="0.4"
      opacity="0.15"
      fill="none"
    />
    <circle
      cx="8"
      cy="8"
      r="4.5"
      stroke="currentColor"
      strokeWidth="0.4"
      opacity="0.2"
      fill="none"
    />
    {/* Main plus shape with flowing organic curves */}
    <path
      d="M8 4C8.5 4 9 4.4 9 5V7H11C11.6 7 12 7.4 12 8C12 8.6 11.6 9 11 9H9V11C9 11.6 8.6 12 8 12C7.4 12 7 11.6 7 11V9H5C4.4 9 4 8.6 4 8C4 7.4 4.4 7 5 7H7V5C7 4.4 7.4 4 8 4Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Crystalline accents at intersection */}
    <circle cx="8" cy="8" r="1" fill="currentColor" opacity="0.3" />
    {/* Shimmer points */}
    <circle cx="6" cy="6" r="0.3" fill="currentColor" opacity="0.4" />
    <circle cx="10" cy="6" r="0.2" fill="currentColor" opacity="0.5" />
    <circle cx="6" cy="10" r="0.2" fill="currentColor" opacity="0.5" />
    <circle cx="10" cy="10" r="0.3" fill="currentColor" opacity="0.4" />
  </svg>
);

// Icon button component matching the Persona 3 Reload aquatic aesthetic
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
    "inline-flex items-center justify-center w-8 h-8 transition-all duration-300 text-sm backdrop-blur-sm hover:shadow-lg focus:outline-none rounded-full relative overflow-hidden group";

  const variantClasses = {
    default:
      "text-primary hover:text-primary/90 hover:shadow-primary/30 hover:scale-105 bg-primary/10 hover:bg-primary/20",
    destructive:
      "text-destructive hover:text-destructive/90 hover:shadow-destructive/30 hover:scale-105 bg-destructive/10 hover:bg-destructive/20",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {/* Underwater shimmer effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-full group-hover:translate-x-full transform" />
      {children}
    </button>
  );
};
