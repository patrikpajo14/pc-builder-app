import React from "react";
import Link from "next/link";

type IconButtonProps =
  | {
      variant: "link";
      href: string;
      children: React.ReactNode;
      className?: string;
    }
  | {
      variant?: "button";
      onClick?: React.MouseEventHandler<HTMLButtonElement>;
      children: React.ReactNode;
      className?: string;
    };

const IconButton: React.FC<IconButtonProps> = (props) => {
  const { children, className } = props;

  if (props.variant === "link") {
    return (
      <Link href={props.href} className={`iconButton ${className || ""}`}>
        {children}
      </Link>
    );
  } else {
    return (
      <button
        onClick={props.onClick}
        className={`iconButton ${className || ""}`}
      >
        {children}
      </button>
    );
  }
};

export default IconButton;
