import { MouseEventHandler, ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler;
}

export function Button({
  children,
  className = "",
  onClick = () => {},
}: ButtonProps) {
  return (
    <>
      <button
        className={`bg-primary-500 rounded-md px-3 py-2 text-sm ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
}
