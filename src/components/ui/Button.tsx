import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "inverted";
  children: React.ReactNode;
}

export const Button = ({ variant = "primary", children, className = "", ...props }: ButtonProps) => {
  const variantClass = variant === "inverted" ? "inverted" : "";
  
  return (
    <button 
      className={`wired-button ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
