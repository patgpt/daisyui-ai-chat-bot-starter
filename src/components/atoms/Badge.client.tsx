"use client";

/**
 * Badge component for labels, notifications, and status indicators
 * Provides various styles, colors, and sizes for different use cases
 */

import { cn } from "@/styles/cn";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentPropsWithoutRef, ReactNode } from "react";

const badgeVariants = cva("badge", {
  variants: {
    variant: {
      solid: "",
      outline: "badge-outline",
      ghost: "badge-ghost",
      soft: "badge-soft",
      dash: "badge-dash",
    },
    badgeColor: {
      neutral: "badge-neutral",
      primary: "badge-primary",
      secondary: "badge-secondary",
      accent: "badge-accent",
      info: "badge-info",
      success: "badge-success",
      warning: "badge-warning",
      error: "badge-error",
    },
    size: {
      xs: "badge-xs",
      sm: "badge-sm",
      md: "badge-md",
      lg: "badge-lg",
      xl: "badge-xl",
    },
  },
  defaultVariants: {
    variant: "solid",
    size: "md",
  },
});

export interface BadgeProps
  extends ComponentPropsWithoutRef<"span">,
    VariantProps<typeof badgeVariants> {
  /**
   * Content to display in the badge
   */
  children: ReactNode;
  /**
   * Whether the badge should be positioned absolutely (for overlays)
   */
  positioned?: boolean;
  /**
   * Position when used as an overlay (requires positioned=true)
   */
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}

/**
 * Badge component for labels, counts, and status indicators
 *
 * @example
 * ```tsx
 * // Basic badge
 * <Badge>New</Badge>
 *
 * // Colored badge
 * <Badge badgeColor="success">Active</Badge>
 *
 * // Notification count
 * <div className="relative">
 *   <Button>Messages</Button>
 *   <Badge badgeColor="error" positioned position="top-right">3</Badge>
 * </div>
 *
 * // Different sizes and styles
 * <Badge variant="outline" size="lg" badgeColor="primary">
 *   Premium
 * </Badge>
 * ```
 */
export function Badge({
  children,
  variant,
  badgeColor,
  size,
  positioned = false,
  position = "top-right",
  className,
  ...props
}: BadgeProps) {
  const positionClasses = {
    "top-right": "absolute -top-2 -right-2",
    "top-left": "absolute -top-2 -left-2",
    "bottom-right": "absolute -bottom-2 -right-2",
    "bottom-left": "absolute -bottom-2 -left-2",
  };

  return (
    <span
      className={cn(
        badgeVariants({ variant, badgeColor, size }),
        positioned && positionClasses[position],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

/**
 * NotificationBadge - Specialized badge for notification counts
 * Automatically handles empty state and large numbers
 */
export interface NotificationBadgeProps
  extends Omit<BadgeProps, "children" | "positioned"> {
  /**
   * Number to display (0 will hide the badge)
   */
  count: number;
  /**
   * Maximum number to display before showing "99+"
   */
  max?: number;
  /**
   * Position of the badge
   */
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  /**
   * Whether to show badge even when count is 0
   */
  showZero?: boolean;
}

export function NotificationBadge({
  count,
  max = 99,
  position = "top-right",
  showZero = false,
  variant = "solid",
  badgeColor = "error",
  size = "sm",
  className,
  ...props
}: NotificationBadgeProps) {
  // Don't render if count is 0 and showZero is false
  if (count === 0 && !showZero) {
    return null;
  }

  const displayCount = count > max ? `${max}+` : count.toString();

  return (
    <Badge
      variant={variant}
      badgeColor={badgeColor}
      size={size}
      positioned={true}
      position={position}
      className={cn("font-bold", className)}
      {...props}
    >
      {displayCount}
    </Badge>
  );
}

/**
 * StatusBadge - Badge for showing status or state information
 * Includes predefined status types with appropriate colors
 */
export interface StatusBadgeProps
  extends Omit<BadgeProps, "badgeColor" | "children"> {
  /**
   * Status type with predefined styling
   */
  status:
    | "active"
    | "inactive"
    | "pending"
    | "approved"
    | "rejected"
    | "draft"
    | "published";
  /**
   * Whether to show a status dot indicator
   */
  showDot?: boolean;
  /**
   * Custom text to display (defaults to status label)
   */
  children?: ReactNode;
}

export function StatusBadge({
  status,
  showDot = false,
  variant = "soft",
  size = "sm",
  className,
  children,
  ...props
}: StatusBadgeProps) {
  const statusConfig = {
    active: { color: "success" as const, label: "Active" },
    inactive: { color: "neutral" as const, label: "Inactive" },
    pending: { color: "warning" as const, label: "Pending" },
    approved: { color: "success" as const, label: "Approved" },
    rejected: { color: "error" as const, label: "Rejected" },
    draft: { color: "neutral" as const, label: "Draft" },
    published: { color: "primary" as const, label: "Published" },
  };

  const config = statusConfig[status];
  const displayText = children || config.label;

  return (
    <Badge
      variant={variant}
      badgeColor={config.color}
      size={size}
      className={cn("flex items-center gap-1", className)}
      {...props}
    >
      {showDot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            config.color === "success" && "bg-success",
            config.color === "error" && "bg-error",
            config.color === "warning" && "bg-warning",
            config.color === "primary" && "bg-primary",
            config.color === "neutral" && "bg-neutral",
          )}
        />
      )}
      {displayText}
    </Badge>
  );
}

/**
 * CategoryBadge - Badge for categorization and tagging
 * Optimized for content categories, tags, etc.
 */
export interface CategoryBadgeProps extends BadgeProps {
  /**
   * Whether the badge is removable (shows X button)
   */
  removable?: boolean;
  /**
   * Callback when remove button is clicked
   */
  onRemove?: () => void;
  /**
   * Icon to show before the text
   */
  icon?: ReactNode;
}

export function CategoryBadge({
  children,
  removable = false,
  onRemove,
  icon,
  variant = "outline",
  badgeColor = "neutral",
  size = "sm",
  className,
  ...props
}: CategoryBadgeProps) {
  return (
    <Badge
      variant={variant}
      badgeColor={badgeColor}
      size={size}
      className={cn("flex items-center gap-1", className)}
      {...props}
    >
      {icon && <span className="text-current">{icon}</span>}
      <span>{children}</span>
      {removable && onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="hover:text-error ml-1 text-current transition-colors"
          aria-label={`Remove ${children} category`}
        >
          <svg
            className="h-3 w-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </Badge>
  );
}

/**
 * CountBadge - Simple badge for displaying counts and numbers
 * Useful for showing quantities, scores, etc.
 */
export interface CountBadgeProps extends Omit<BadgeProps, "children"> {
  /**
   * Count to display
   */
  count: number;
  /**
   * Label to show before the count
   */
  label?: string;
  /**
   * Suffix to show after the count
   */
  suffix?: string;
}

export function CountBadge({
  count,
  label,
  suffix,
  variant = "ghost",
  badgeColor = "neutral",
  size = "sm",
  className,
  ...props
}: CountBadgeProps) {
  return (
    <Badge
      variant={variant}
      badgeColor={badgeColor}
      size={size}
      className={cn("font-mono", className)}
      {...props}
    >
      {label && <span className="mr-1">{label}</span>}
      {count}
      {suffix && <span className="ml-1">{suffix}</span>}
    </Badge>
  );
}
