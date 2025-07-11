/**
 * Spinner component for loading animations
 * Used for typing indicators, message loading, and other loading states
 */

import { cn } from "@/styles/cn";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentPropsWithoutRef } from "react";

const spinnerVariants = cva("loading", {
  variants: {
    variant: {
      spinner: "loading-spinner",
      dots: "loading-dots",
      ring: "loading-ring",
      ball: "loading-ball",
      bars: "loading-bars",
      infinity: "loading-infinity",
    },
    size: {
      xs: "loading-xs",
      sm: "loading-sm",
      md: "loading-md",
      lg: "loading-lg",
      xl: "loading-xl",
    },
    color: {
      default: "",
      primary: "text-primary",
      secondary: "text-secondary",
      accent: "text-accent",
      neutral: "text-neutral",
      info: "text-info",
      success: "text-success",
      warning: "text-warning",
      error: "text-error",
    },
  },
  defaultVariants: {
    variant: "spinner",
    size: "md",
    color: "default",
  },
});

interface SpinnerProps
  extends Omit<ComponentPropsWithoutRef<"span">, "color">,
    VariantProps<typeof spinnerVariants> {
  /** Optional label for accessibility */
  label?: string;
  /** ARIA label for screen readers */
  "aria-label"?: string;
}

/**
 * Spinner component for various loading states
 *
 * @example
 * ```tsx
 * // Basic spinner
 * <Spinner />
 *
 * // Typing indicator
 * <Spinner
 *   variant="dots"
 *   size="sm"
 *   color="primary"
 *   aria-label="AI is typing"
 * />
 *
 * // Message loading
 * <Spinner
 *   variant="ring"
 *   size="lg"
 *   label="Generating response..."
 * />
 *
 * // Custom styling
 * <Spinner
 *   variant="infinity"
 *   color="accent"
 *   className="my-4"
 * />
 * ```
 */
export function Spinner({
  variant,
  size,
  color,
  label,
  className,
  "aria-label": ariaLabel,
  ...props
}: SpinnerProps) {
  const accessibilityProps = {
    role: "status",
    "aria-label": ariaLabel || label || "Loading",
  };

  return (
    <div className="inline-flex items-center gap-2">
      <span
        className={cn(spinnerVariants({ variant, size, color }), className)}
        {...accessibilityProps}
        {...props}
      />
      {label && (
        <span className="text-base-content/70 sr-only text-sm sm:not-sr-only">
          {label}
        </span>
      )}
    </div>
  );
}

/**
 * TypingIndicator component - specialized spinner for chat typing
 *
 * @example
 * ```tsx
 * <TypingIndicator
 *   userName="AI Assistant"
 *   size="sm"
 * />
 * ```
 */
interface TypingIndicatorProps
  extends Omit<SpinnerProps, "variant" | "label" | "aria-label"> {
  /** Name of the user/bot who is typing */
  userName?: string;
}

export function TypingIndicator({
  userName = "AI",
  size = "sm",
  color = "primary",
  className,
  ...props
}: TypingIndicatorProps) {
  return (
    <div
      className={cn("text-base-content/70 flex items-center gap-2", className)}
    >
      <Spinner
        variant="dots"
        size={size}
        color={color}
        aria-label={`${userName} is typing`}
        {...props}
      />
      <span className="text-sm font-medium">{userName} is typing...</span>
    </div>
  );
}

/**
 * LoadingMessage component - spinner with message for longer operations
 *
 * @example
 * ```tsx
 * <LoadingMessage
 *   message="Analyzing your request..."
 *   variant="ring"
 * />
 * ```
 */
interface LoadingMessageProps extends SpinnerProps {
  /** Loading message to display */
  message: string;
}

export function LoadingMessage({
  message,
  variant = "ring",
  size = "md",
  color = "primary",
  className,
  ...props
}: LoadingMessageProps) {
  return (
    <div className={cn("flex flex-col items-center gap-3 p-6", className)}>
      <Spinner
        variant={variant}
        size={size}
        color={color}
        aria-label={message}
        {...props}
      />
      <p className="text-base-content/70 max-w-xs text-center text-sm">
        {message}
      </p>
    </div>
  );
}

export type { LoadingMessageProps, SpinnerProps, TypingIndicatorProps };
