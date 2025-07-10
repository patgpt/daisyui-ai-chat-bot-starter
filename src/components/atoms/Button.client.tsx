"use client";

import { cva, type VariantProps } from "@/utils/cva";
import { motion } from "motion/react";
import React from "react";

/**
 * Button variants using CVA for better type safety and maintainability.
 */
const buttonVariants = cva(
  "btn", // base classes
  {
    variants: {
      variant: {
        primary: "btn-primary",
        secondary: "btn-secondary",
        accent: "btn-accent",
        neutral: "btn-neutral",
        ghost: "btn-ghost",
        link: "btn-link",
      },
      size: {
        xs: "btn-xs",
        sm: "btn-sm",
        md: "btn-md",
        lg: "btn-lg",
        xl: "btn-xl",
      },
      outline: {
        true: "btn-outline",
      },
      wide: {
        true: "btn-wide",
      },
      loading: {
        true: "loading",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

/**
 * Props for the Button component using CVA variants.
 */
export interface ButtonProps
  extends Omit<
    VariantProps<typeof buttonVariants>,
    "outline" | "wide" | "loading"
  > {
  /**
   * Whether the button is outlined.
   */
  outline?: boolean;
  /**
   * Whether the button is wide (full width).
   */
  wide?: boolean;
  /**
   * Whether the button is loading.
   */
  loading?: boolean;
  /**
   * The button content.
   */
  children: React.ReactNode;
  /**
   * Whether the button is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Click handler.
   */
  onClick?: () => void;
  /**
   * Button type.
   * @default "button"
   */
  type?: "button" | "submit" | "reset";
  /**
   * Additional CSS classes.
   */
  className?: string;
  /**
   * ARIA label for accessibility.
   */
  "aria-label"?: string;
}

/**
 * A reusable Button atom component with DaisyUI styling, CVA variants, and motion support.
 * @remarks
 * - Uses CVA for type-safe variant management.
 * - Uses DaisyUI `btn` classes for consistent styling.
 * - Supports motion animations via motion.button.
 * - Fully accessible and keyboard navigable.
 * - Follows atomic design principles.
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  size,
  outline,
  wide,
  loading,
  disabled = false,
  onClick,
  type = "button",
  className,
  "aria-label": ariaLabel,
}) => {
  return (
    <motion.button
      className={buttonVariants({
        variant,
        size,
        outline: outline ? true : undefined,
        wide: wide ? true : undefined,
        loading: loading ? true : undefined,
        className,
      })}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      aria-label={ariaLabel}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.button>
  );
};

// Export the variant types for external use
export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
