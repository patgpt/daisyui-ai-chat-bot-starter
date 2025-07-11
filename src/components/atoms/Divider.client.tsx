/**
 * Divider component for visual separators
 * Provides horizontal and vertical dividers with optional text content
 */

import { cn } from "@/styles/cn";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentPropsWithoutRef, ReactNode } from "react";

const dividerVariants = cva("divider", {
  variants: {
    orientation: {
      horizontal: "divider-horizontal",
      vertical: "divider-vertical",
    },
    dividerColor: {
      neutral: "divider-neutral",
      primary: "divider-primary",
      secondary: "divider-secondary",
      accent: "divider-accent",
      success: "divider-success",
      warning: "divider-warning",
      info: "divider-info",
      error: "divider-error",
    },
    placement: {
      start: "divider-start",
      center: "",
      end: "divider-end",
    },
    spacing: {
      none: "my-0",
      sm: "my-2",
      md: "my-4",
      lg: "my-6",
      xl: "my-8",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    placement: "center",
    spacing: "md",
  },
});

export interface DividerProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children">,
    VariantProps<typeof dividerVariants> {
  /**
   * Optional text content to display in the divider
   */
  children?: ReactNode;
  /**
   * Accessible label for screen readers when no children provided
   */
  "aria-label"?: string;
}

/**
 * Divider component for visual content separation
 *
 * @example
 * ```tsx
 * // Basic horizontal divider
 * <Divider />
 *
 * // Divider with text
 * <Divider>OR</Divider>
 *
 * // Vertical divider
 * <div className="flex items-center h-20">
 *   <span>Left content</span>
 *   <Divider orientation="vertical" />
 *   <span>Right content</span>
 * </div>
 *
 * // Colored divider with custom placement
 * <Divider color="primary" placement="start">
 *   Section Title
 * </Divider>
 * ```
 */
export function Divider({
  children,
  orientation,
  dividerColor,
  placement,
  spacing,
  className,
  "aria-label": ariaLabel,
  ...props
}: DividerProps) {
  // For accessibility, provide default label if no children
  const accessibleLabel =
    ariaLabel || (children ? undefined : "Section divider");

  return (
    <div
      className={cn(
        dividerVariants({ orientation, dividerColor, placement, spacing }),
        className,
      )}
      role="separator"
      aria-label={accessibleLabel}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * SectionDivider - Specialized divider for content sections
 * Includes proper semantic markup and spacing for section breaks
 */
export interface SectionDividerProps extends Omit<DividerProps, "orientation"> {
  /**
   * Section title to display in the divider
   */
  title?: string;
  /**
   * Whether this divider marks the start of a major section
   */
  major?: boolean;
}

export function SectionDivider({
  title,
  major = false,
  spacing = major ? "xl" : "lg",
  dividerColor = major ? "primary" : undefined,
  placement = "start",
  className,
  ...props
}: SectionDividerProps) {
  return (
    <Divider
      orientation="horizontal"
      dividerColor={dividerColor}
      placement={placement}
      spacing={spacing}
      className={cn(major && "font-semibold", className)}
      {...props}
    >
      {title}
    </Divider>
  );
}

/**
 * ContentSeparator - Simple divider without text for content separation
 * Optimized for use between content blocks, messages, etc.
 */
export type ContentSeparatorProps = Omit<DividerProps, "children">;

export function ContentSeparator({
  orientation = "horizontal",
  spacing = "sm",
  dividerColor,
  className,
  ...props
}: ContentSeparatorProps) {
  return (
    <Divider
      orientation={orientation}
      spacing={spacing}
      dividerColor={dividerColor}
      className={cn("opacity-50", className)}
      aria-label="Content separator"
      {...props}
    />
  );
}

/**
 * ChatDivider - Specialized divider for chat interfaces
 * Used to separate conversation sections, dates, etc.
 */
export interface ChatDividerProps extends Omit<DividerProps, "orientation"> {
  /**
   * Timestamp or date to display
   */
  timestamp?: string;
  /**
   * Whether this represents a new day/date break
   */
  newDay?: boolean;
}

export function ChatDivider({
  timestamp,
  newDay = false,
  spacing = "md",
  dividerColor = newDay ? "accent" : "neutral",
  placement = "center",
  className,
  ...props
}: ChatDividerProps) {
  return (
    <Divider
      orientation="horizontal"
      dividerColor={dividerColor}
      placement={placement}
      spacing={spacing}
      className={cn(
        "text-xs font-medium",
        newDay ? "text-accent-content" : "text-neutral-content",
        className,
      )}
      {...props}
    >
      {timestamp}
    </Divider>
  );
}
