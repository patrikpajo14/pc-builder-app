"use client";

import React from "react";
import clsx from "clsx";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  secondary?: boolean;
  disabled?: boolean;
  sx?: string;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  fullWidth,
  children,
  onClick,
  secondary,
  disabled,
  sx,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        sx,
        disabled && "opacity-50 cursor-default",
        fullWidth && "w-full",
        secondary ? "outline_btn" : "primary_btn",
        !secondary && "primary_btn",
      )}
    >
      {children}
    </button>
  );
};

export default Button;
