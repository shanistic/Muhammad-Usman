import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "success";
}

export default function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        variant === "default" && "bg-secondary text-dark-medium",
        variant === "accent" && "bg-accent/10 text-accent",
        variant === "success" && "bg-success/10 text-success",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
