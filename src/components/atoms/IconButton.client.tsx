"use client";

/**
 * IconButton component for icon-only actions
 * Used for copy, retry, settings, and other action buttons throughout the chat interface
 */

import { cn } from "@/styles/cn";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentPropsWithoutRef, forwardRef } from "react";

const iconButtonVariants = cva(
  "btn btn-square relative inline-flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "btn-neutral hover:btn-neutral-focus",
        primary: "btn-primary hover:btn-primary-focus",
        secondary: "btn-secondary hover:btn-secondary-focus",
        accent: "btn-accent hover:btn-accent-focus",
        ghost: "btn-ghost hover:btn-ghost-focus",
        outline: "btn-outline hover:btn-outline-focus",
        success: "btn-success hover:btn-success-focus",
        warning: "btn-warning hover:btn-warning-focus",
        error: "btn-error hover:btn-error-focus",
      },
      size: {
        xs: "btn-xs h-6 w-6 min-h-6",
        sm: "btn-sm h-8 w-8 min-h-8",
        md: "btn-md h-10 w-10 min-h-10",
        lg: "btn-lg h-12 w-12 min-h-12",
        xl: "btn-xl h-16 w-16 min-h-16",
      },
      loading: {
        true: "loading",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      loading: false,
    },
  },
);

const iconSizeMap = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-8 w-8",
} as const;

interface IconButtonProps
  extends ComponentPropsWithoutRef<"button">,
    VariantProps<typeof iconButtonVariants> {
  /** Icon component to render */
  icon?: React.ComponentType<{ className?: string }>;
  /** Loading state */
  loading?: boolean;
  /** Tooltip text for accessibility */
  tooltip?: string;
  /** ARIA label for screen readers */
  "aria-label": string;
}

/**
 * IconButton component for icon-only action buttons
 *
 * @example
 * ```tsx
 * import { FiCopy, FiRefreshCw, FiSettings } from 'react-icons/fi';
 *
 * // Copy button
 * <IconButton
 *   icon={FiCopy}
 *   aria-label="Copy message"
 *   tooltip="Copy to clipboard"
 *   size="sm"
 *   variant="ghost"
 *   onClick={handleCopy}
 * />
 *
 * // Retry button with loading state
 * <IconButton
 *   icon={FiRefreshCw}
 *   aria-label="Retry message"
 *   tooltip="Retry generating response"
 *   loading={isRetrying}
 *   variant="outline"
 *   onClick={handleRetry}
 * />
 *
 * // Settings button
 * <IconButton
 *   icon={FiSettings}
 *   aria-label="Open settings"
 *   size="lg"
 *   variant="primary"
 *   onClick={handleSettings}
 * />
 * ```
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon: Icon,
      loading,
      tooltip,
      variant,
      size,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const iconSize = iconSizeMap[size || "md"];

    return (
      <div className="relative inline-block">
        <button
          ref={ref}
          className={cn(
            iconButtonVariants({ variant, size, loading }),
            className,
          )}
          title={tooltip}
          {...props}
        >
          {loading ? (
            <span className="loading loading-spinner" />
          ) : Icon ? (
            <Icon className={cn(iconSize, "shrink-0")} />
          ) : (
            children
          )}
        </button>

        {/* Tooltip using DaisyUI tooltip class */}
        {tooltip && (
          <div className="tooltip" data-tip={tooltip}>
            <span className="sr-only">{tooltip}</span>
          </div>
        )}
      </div>
    );
  },
);

IconButton.displayName = "IconButton";

export type { IconButtonProps };
