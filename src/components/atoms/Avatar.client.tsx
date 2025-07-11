"use client";

/**
 * Avatar component for displaying user or bot profile images
 * Supports different sizes, online/offline status, and fallback initials
 */

import { cn } from "@/styles/cn";
import { cva, VariantProps } from "class-variance-authority";
import Image from "next/image";
import { ComponentPropsWithoutRef, useState } from "react";

const avatarVariants = cva("avatar placeholder", {
  variants: {
    size: {
      xs: "w-6 h-6",
      sm: "w-8 h-8",
      md: "w-12 h-12",
      lg: "w-16 h-16",
      xl: "w-24 h-24",
    },
    status: {
      online: "avatar-online",
      offline: "avatar-offline",
      none: "",
    },
  },
  defaultVariants: {
    size: "md",
    status: "none",
  },
});

const avatarImageVariants = cva("rounded-full", {
  variants: {
    size: {
      xs: "w-6 h-6",
      sm: "w-8 h-8",
      md: "w-12 h-12",
      lg: "w-16 h-16",
      xl: "w-24 h-24",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const avatarPlaceholderVariants = cva(
  "bg-neutral text-neutral-content rounded-full flex items-center justify-center",
  {
    variants: {
      size: {
        xs: "w-6 h-6 text-xs",
        sm: "w-8 h-8 text-xs",
        md: "w-12 h-12 text-sm",
        lg: "w-16 h-16 text-base",
        xl: "w-24 h-24 text-xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

interface AvatarProps
  extends ComponentPropsWithoutRef<"div">,
    VariantProps<typeof avatarVariants> {
  /** Source URL for the avatar image */
  src?: string;
  /** Alt text for the avatar image */
  alt?: string;
  /** Name used to generate fallback initials */
  name?: string;
  /** User ID for consistent fallback colors */
  userId?: string;
  /** ARIA label for accessibility */
  "aria-label"?: string;
}

/**
 * Avatar component for user and bot profile images
 *
 * @example
 * ```tsx
 * // With image
 * <Avatar src="/user.jpg" alt="John Doe" size="lg" status="online" />
 *
 * // With fallback initials
 * <Avatar name="John Doe" size="md" status="offline" />
 *
 * // Bot avatar
 * <Avatar name="AI Assistant" size="sm" />
 * ```
 */
export function Avatar({
  src,
  alt,
  name,
  userId,
  size,
  status,
  className,
  "aria-label": ariaLabel,
  ...props
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  // Generate initials from name
  const initials = name
    ? name
        .split(" ")
        .map((part) => part.charAt(0))
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  // Generate consistent background color based on userId or name
  const getBackgroundColor = () => {
    const seed = userId || name || "";
    const colors = [
      "bg-primary",
      "bg-secondary",
      "bg-accent",
      "bg-info",
      "bg-success",
      "bg-warning",
    ];
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const backgroundColorClass = getBackgroundColor();

  const accessibilityProps = {
    "aria-label": ariaLabel || alt || `Avatar for ${name || "user"}`,
    role: "img",
  };

  const sizeMap = {
    xs: 24,
    sm: 32,
    md: 48,
    lg: 64,
    xl: 96,
  };

  const imageSizePx = sizeMap[size || "md"];

  return (
    <div
      className={cn(avatarVariants({ size, status }), className)}
      {...accessibilityProps}
      {...props}
    >
      <div className="indicator">
        {src && !imageError ? (
          <Image
            src={src}
            alt={alt || `Avatar for ${name || "user"}`}
            width={imageSizePx}
            height={imageSizePx}
            className={cn(avatarImageVariants({ size }))}
            onError={() => setImageError(true)}
          />
        ) : (
          <div
            className={cn(
              avatarPlaceholderVariants({ size }),
              backgroundColorClass,
              "text-base-100",
            )}
          >
            <span className="font-medium">{initials}</span>
          </div>
        )}

        {/* Status indicator */}
        {status === "online" && (
          <span
            className="indicator-item badge badge-success badge-xs"
            aria-label="Online"
          />
        )}
        {status === "offline" && (
          <span
            className="indicator-item badge badge-error badge-xs"
            aria-label="Offline"
          />
        )}
      </div>
    </div>
  );
}

export type { AvatarProps };
