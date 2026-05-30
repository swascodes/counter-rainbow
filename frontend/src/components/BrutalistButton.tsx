"use client";

import React from "react";

interface BrutalistButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "white";
  fullWidth?: boolean;
}

export function BrutalistButton({
  children,
  className = "",
  variant = "primary",
  fullWidth = false,
  ...props
}: BrutalistButtonProps) {
  const baseClasses =
    "px-6 py-3 font-bold text-lg uppercase tracking-wider brutal-border brutal-shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed";
  
  const widthClasses = fullWidth ? "w-full" : "w-auto";
  
  const variantClasses = {
    primary: "bg-[var(--color-brutal-primary)] text-black",
    secondary: "bg-[var(--color-brutal-secondary)] text-black",
    accent: "bg-[var(--color-brutal-accent)] text-black",
    white: "bg-[var(--color-brutal-white)] text-black",
  };

  return (
    <button
      className={`${baseClasses} ${widthClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
