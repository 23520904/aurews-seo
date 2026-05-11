import React from "react";

interface RibbonProps {
  children: React.ReactNode;
  className?: string;
}

export const Ribbon = ({ children, className = "" }: RibbonProps) => {
  return (
    <div className={`wired-ribbon ${className}`}>
      {children}
    </div>
  );
};
