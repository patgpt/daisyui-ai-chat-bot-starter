"use client";

import { cva, type VariantProps } from "@/utils/cva";
import { motion } from "motion/react";
import React from "react";

/**
 * Input variants using CVA for better type safety and maintainability.
 */
const inputVariants = cva(
  "input", // base classes
  {
    variants: {
      variant: {
        bordered: "input-bordered",
        ghost: "input-ghost",
        primary: "input-primary",
        secondary: "input-secondary",
        accent: "input-accent",
        info: "input-info",
        success: "input-success",
        warning: "input-warning",
        error: "input-error",
      },
      size: {
        xs: "input-xs",
        sm: "input-sm",
        md: "input-md",
        lg: "input-lg",
        xl: "input-xl",
      },
    },
    defaultVariants: {
      variant: "bordered",
      size: "md",
    },
  },
);

/**
 * Props for the Input component using CVA variants.
 */
export interface InputProps extends VariantProps<typeof inputVariants> {
  /**
   * The input value.
   */
  value?: string;
  /**
   * The input placeholder text.
   */
  placeholder?: string;
  /**
   * Whether the input is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * The input type.
   * @default "text"
   */
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
  /**
   * Change handler.
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Key down handler.
   */
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  /**
   * Focus handler.
   */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * Blur handler.
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * Additional CSS classes.
   */
  className?: string;
  /**
   * ARIA label for accessibility.
   */
  "aria-label"?: string;
  /**
   * Whether the input is required.
   * @default false
   */
  required?: boolean;
  /**
   * Auto-complete attribute.
   */
  autoComplete?: string;
}

/**
 * A reusable Input atom component with DaisyUI styling, CVA variants, and motion support.
 * @remarks
 * - Uses CVA for type-safe variant management.
 * - Uses DaisyUI `input` classes for consistent styling.
 * - Supports motion animations via motion.input.
 * - Fully accessible and keyboard navigable.
 * - Follows atomic design principles.
 */
export const Input: React.FC<InputProps> = ({
  value,
  placeholder,
  variant,
  size,
  disabled = false,
  type = "text",
  onChange,
  onKeyDown,
  onFocus,
  onBlur,
  className,
  "aria-label": ariaLabel,
  required = false,
  autoComplete,
}) => {
  return (
    <motion.input
      className={inputVariants({
        variant,
        size,
        className,
      })}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      type={type}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      aria-label={ariaLabel}
      required={required}
      autoComplete={autoComplete}
      whileFocus={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    />
  );
};

// Export the variant types for external use
export type InputVariantProps = VariantProps<typeof inputVariants>;
