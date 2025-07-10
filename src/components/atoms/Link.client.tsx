"use client";

import { cva, type VariantProps } from "@/utils/cva";
import { motion } from "motion/react";
import NextLink from "next/link";
import React from "react";

/**
 * Motion-enabled Link component for animations throughout the site.
 */
const MotionLink = motion.create(NextLink);

/**
 * Link variants using CVA for better type safety and maintainability.
 */
const linkVariants = cva(
  "link", // base classes
  {
    variants: {
      variant: {
        primary: "link-primary",
        secondary: "link-secondary",
        accent: "link-accent",
        neutral: "link-neutral",
        info: "link-info",
        success: "link-success",
        warning: "link-warning",
        error: "link-error",
        hover: "link-hover",
      },
      size: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
        xl: "text-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

/**
 * Props for the Link component using CVA variants.
 */
export interface LinkProps extends VariantProps<typeof linkVariants> {
  /**
   * The link content.
   */
  children: React.ReactNode;
  /**
   * The href destination.
   */
  href: string;
  /**
   * Whether to open in new tab.
   * @default false
   */
  external?: boolean;
  /**
   * Additional CSS classes.
   */
  className?: string;
  /**
   * ARIA label for accessibility.
   */
  "aria-label"?: string;
  /**
   * Click handler.
   */
  onClick?: () => void;
}

/**
 * A reusable Link atom component with DaisyUI styling, CVA variants, and motion support.
 * @remarks
 * - Uses CVA for type-safe variant management.
 * - Uses DaisyUI `link` classes for consistent styling.
 * - Supports motion animations via motion.create(Link).
 * - Fully accessible and keyboard navigable.
 * - Follows atomic design principles.
 * - Automatically handles external links with proper security attributes.
 */
export const Link: React.FC<LinkProps> = ({
  children,
  href,
  variant,
  size,
  external = false,
  className,
  "aria-label": ariaLabel,
  onClick,
}) => {
  const isExternal = external || href.startsWith("http");

  return (
    <MotionLink
      href={href}
      className={linkVariants({
        variant,
        size,
        className,
      })}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      aria-label={ariaLabel}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </MotionLink>
  );
};

// Export the variant types for external use
export type LinkVariantProps = VariantProps<typeof linkVariants>;
