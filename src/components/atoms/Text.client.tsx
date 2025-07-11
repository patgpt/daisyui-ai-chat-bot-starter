/**
 * Text component for typography with Tailwind Typography support
 * Provides semantic heading levels, body text variants, and responsive sizing
 */

import { cn } from "@/styles/cn";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentPropsWithoutRef, createElement } from "react";

const textVariants = cva("text-base-content", {
  variants: {
    variant: {
      // Headings
      h1: "text-4xl font-bold tracking-tight lg:text-5xl",
      h2: "text-3xl font-bold tracking-tight lg:text-4xl",
      h3: "text-2xl font-bold tracking-tight lg:text-3xl",
      h4: "text-xl font-bold tracking-tight lg:text-2xl",
      h5: "text-lg font-bold tracking-tight lg:text-xl",
      h6: "text-base font-bold tracking-tight lg:text-lg",

      // Body text
      body: "text-base leading-relaxed",
      "body-sm": "text-sm leading-relaxed",
      "body-lg": "text-lg leading-relaxed",

      // Special text types
      caption: "text-xs text-base-content/70 leading-normal",
      label: "text-sm font-medium leading-normal",
      code: "text-sm font-mono bg-base-200 px-1.5 py-0.5 rounded border",

      // Chat-specific
      "message-content":
        "text-base leading-relaxed prose prose-sm max-w-none prose-headings:text-base-content prose-p:text-base-content prose-strong:text-base-content prose-code:text-primary prose-code:bg-base-200 prose-pre:bg-base-200 prose-blockquote:border-primary prose-blockquote:text-base-content/80",
      "message-meta": "text-xs text-base-content/60 leading-normal",
      "chat-title": "text-lg font-semibold text-base-content",
      "system-message": "text-sm text-info font-medium",
    },
    weight: {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    textColor: {
      default: "text-base-content",
      muted: "text-base-content/70",
      subtle: "text-base-content/60",
      primary: "text-primary",
      secondary: "text-secondary",
      accent: "text-accent",
      success: "text-success",
      warning: "text-warning",
      error: "text-error",
      info: "text-info",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
  },
  defaultVariants: {
    variant: "body",
    weight: "normal",
    textColor: "default",
    align: "left",
  },
});

// Map variants to semantic HTML elements
const variantToElement = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  body: "p",
  "body-sm": "p",
  "body-lg": "p",
  caption: "span",
  label: "label",
  code: "code",
  "message-content": "div",
  "message-meta": "span",
  "chat-title": "h2",
  "system-message": "p",
} as const;

interface TextProps
  extends Omit<ComponentPropsWithoutRef<"p">, "color">,
    VariantProps<typeof textVariants> {
  /** Override the default HTML element */
  as?: string;
  /** Enable Tailwind Typography prose styles */
  prose?: boolean;
}

/**
 * Text component for consistent typography throughout the application
 *
 * @example
 * ```tsx
 * // Headings
 * <Text variant="h1">Main Title</Text>
 * <Text variant="h2">Section Title</Text>
 *
 * // Body text
 * <Text variant="body">Regular paragraph text</Text>
 * <Text variant="body-sm" color="muted">Small text</Text>
 *
 * // Chat-specific
 * <Text variant="message-content" prose>
 *   Markdown content with **bold** and `code`
 * </Text>
 *
 * // Custom element
 * <Text as="span" variant="label" color="primary">
 *   Status Label
 * </Text>
 *
 * // With custom styling
 * <Text
 *   variant="body"
 *   weight="semibold"
 *   color="accent"
 *   align="center"
 * >
 *   Centered accent text
 * </Text>
 * ```
 */
export function Text({
  variant = "body",
  weight,
  textColor,
  align,
  as,
  prose = false,
  className,
  children,
  ...props
}: TextProps) {
  // Determine the HTML element to use
  const element =
    as ||
    (variant && variantToElement[variant as keyof typeof variantToElement]) ||
    "p";

  // Build the className
  const textClasses = cn(
    textVariants({ variant, weight, textColor, align }),
    prose && "prose prose-sm max-w-none",
    className,
  );

  return createElement(
    element,
    {
      className: textClasses,
      ...props,
    },
    children,
  );
}

/**
 * Specialized component for message content with prose styling
 */
interface MessageTextProps extends Omit<TextProps, "variant" | "prose"> {
  /** Message content (can include markdown) */
  content: string;
}

export function MessageText({
  content,
  className,
  ...props
}: MessageTextProps) {
  return (
    <Text
      variant="message-content"
      prose
      className={cn("break-words", className)}
      dangerouslySetInnerHTML={{ __html: content }}
      {...props}
    />
  );
}

/**
 * Specialized component for timestamps and metadata
 */
interface MetaTextProps extends Omit<TextProps, "variant" | "textColor"> {
  /** Timestamp or metadata text */
  children: React.ReactNode;
}

export function MetaText({ children, className, ...props }: MetaTextProps) {
  return (
    <Text
      variant="message-meta"
      textColor="subtle"
      className={cn("select-none", className)}
      {...props}
    >
      {children}
    </Text>
  );
}

/**
 * Specialized heading component for chat interface
 */
interface ChatHeadingProps extends Omit<TextProps, "variant"> {
  /** Heading level */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function ChatHeading({
  level = 2,
  children,
  ...props
}: ChatHeadingProps) {
  const variant = `h${level}` as const;

  return (
    <Text variant={variant} {...props}>
      {children}
    </Text>
  );
}

export type { ChatHeadingProps, MessageTextProps, MetaTextProps, TextProps };
