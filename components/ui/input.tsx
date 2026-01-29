import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export default function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full px-4 py-2 bg-black/50 border border-gray-600 text-white placeholder-gray-400 focus:border-white outline-none rounded",
        className
      )}
      {...props}
    />
  );
}
