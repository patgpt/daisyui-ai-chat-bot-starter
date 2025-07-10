/**
 * Common CVA utility for creating component variants.
 * Re-export cva for consistency across the project.
 */
export { cva, type VariantProps } from "class-variance-authority";

/**
 * Helper function to merge CVA variants with additional classes.
 * This is useful when you need to combine variant classes with custom classes.
 */
export const cn = (
  ...classes: (string | undefined | null | false)[]
): string => {
  return classes.filter(Boolean).join(" ");
};

/**
 * Common DaisyUI color variants that can be reused across components.
 */
export const daisyUIColors = {
  primary: "primary",
  secondary: "secondary",
  accent: "accent",
  neutral: "neutral",
  info: "info",
  success: "success",
  warning: "warning",
  error: "error",
} as const;

/**
 * Common DaisyUI sizes that can be reused across components.
 */
export const daisyUISizes = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
} as const;

/**
 * Type helper for DaisyUI color variants.
 */
export type DaisyUIColor = keyof typeof daisyUIColors;

/**
 * Type helper for DaisyUI size variants.
 */
export type DaisyUISize = keyof typeof daisyUISizes;
