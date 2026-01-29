import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "px-6 py-2 rounded font-semibold transition-colors flex items-center gap-2",
        variant === "primary"
          ? "bg-red-600 hover:bg-red-700 text-white"
          : "bg-gray-500/70 hover:bg-gray-500/90 text-white",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
