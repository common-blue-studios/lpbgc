import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: "button" | "a"; // Determines whether it's a button or a link
  href?: string; // Only used when `as="a"`
  variant?: "primary" | "secondary" | "outline"; // Button style variants
  size?: "sm" | "md" | "lg"; // Size variations
}

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ as = "button", href, variant = "primary", size = "md", className, children, ...props }, ref) => {
    const baseStyles =
      "rounded-full transition-colors flex items-center justify-center gap-2 text-sm sm:text-base";
    const variants = {
      primary: "bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc]",
      secondary: "hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] border border-black/[.08] dark:border-white/[.145]",
      outline: "border border-solid border-transparent hover:border-black/[.08] dark:hover:border-white/[.145]",
    };
    const sizes = {
      sm: "h-8 px-3",
      md: "h-10 px-4",
      lg: "h-12 px-5",
    };

    const classes = cn(baseStyles, variants[variant], sizes[size], className);

    if (as === "a" && href) {
      return (
        <Link href={href} passHref>
          <a ref={ref as React.Ref<HTMLAnchorElement>} className={classes} {...props}>
            {children}
          </a>
        </Link>
      );
    }

    return (
      <button ref={ref as React.Ref<HTMLButtonElement>} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
