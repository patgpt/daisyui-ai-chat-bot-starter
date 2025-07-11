"use client";

/**
 * MessageBubble component for displaying chat messages
 * Supports user and AI messages with markdown rendering, actions, and timestamps
 */

import { cn } from "@/styles/cn";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import { HiArrowPath, HiClipboard } from "react-icons/hi2";
import {
  Avatar,
  Badge,
  IconButton,
  MessageText,
  MetaText,
  StatusDot,
  Text,
} from "../atoms";

const messageBubbleVariants = cva(
  "flex gap-3 group hover:bg-base-100/50 transition-colors duration-200 rounded-lg p-3",
  {
    variants: {
      senderType: {
        user: "flex-row-reverse",
        ai: "flex-row",
        system: "justify-center",
      },
      size: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        full: "max-w-full",
      },
      spacing: {
        tight: "gap-2 p-2",
        normal: "gap-3 p-3",
        loose: "gap-4 p-4",
      },
    },
    defaultVariants: {
      senderType: "ai",
      size: "lg",
      spacing: "normal",
    },
  },
);

const messageContentVariants = cva("flex-1 min-w-0", {
  variants: {
    senderType: {
      user: "text-right",
      ai: "text-left",
      system: "text-center",
    },
  },
  defaultVariants: {
    senderType: "ai",
  },
});

const messageBalloonVariants = cva(
  "inline-block px-4 py-2 rounded-lg break-words",
  {
    variants: {
      senderType: {
        user: "bg-primary text-primary-content ml-auto",
        ai: "bg-base-200 text-base-content",
        system: "bg-info/20 text-info-content border border-info/30",
      },
      variant: {
        default: "",
        outline: "border-2",
        flat: "bg-transparent",
      },
    },
    defaultVariants: {
      senderType: "ai",
      variant: "default",
    },
  },
);

export interface MessageBubbleProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children">,
    VariantProps<typeof messageBubbleVariants> {
  /**
   * Message content (supports markdown)
   */
  content: string;
  /**
   * Sender information
   */
  sender: {
    id: string;
    name: string;
    avatar?: string;
    type: "user" | "ai" | "system";
  };
  /**
   * Message timestamp
   */
  timestamp?: string | Date;
  /**
   * Whether the message is currently being generated
   */
  isGenerating?: boolean;
  /**
   * Whether the message has an error
   */
  hasError?: boolean;
  /**
   * Message actions (copy, retry, feedback, etc.)
   */
  actions?: ReactNode;
  /**
   * Message metadata (model name, tokens, etc.)
   */
  metadata?: {
    model?: string;
    tokens?: number;
    responseTime?: number;
  };
  /**
   * Whether to show avatar
   */
  showAvatar?: boolean;
  /**
   * Whether to show timestamp
   */
  showTimestamp?: boolean;
  /**
   * Custom balloon variant
   */
  balloonVariant?: "default" | "outline" | "flat";
  /**
   * Callback when action buttons are clicked
   */
  onAction?: (action: string, messageId?: string) => void;
}

/**
 * MessageBubble component for chat messages
 *
 * @example
 * ```tsx
 * // AI message
 * <MessageBubble
 *   content="Hello! How can I help you today?"
 *   sender={{
 *     id: "ai",
 *     name: "Claude",
 *     type: "ai",
 *     avatar: "/ai-avatar.png"
 *   }}
 *   timestamp={new Date()}
 *   metadata={{ model: "Claude-3", tokens: 25 }}
 * />
 *
 * // User message
 * <MessageBubble
 *   sender="user"
 *   content="Can you help me with React?"
 *   sender={{
 *     id: "user123",
 *     name: "John Doe",
 *     type: "user",
 *     avatar: "/user-avatar.jpg"
 *   }}
 *   timestamp={new Date()}
 * />
 * ```
 */
export function MessageBubble({
  content,
  sender: senderProp,
  timestamp,
  isGenerating = false,
  hasError = false,
  actions,
  metadata,
  showAvatar = true,
  showTimestamp = true,
  balloonVariant = "default",
  onAction,
  size,
  spacing,
  className,
  ...props
}: MessageBubbleProps) {
  const senderType = senderProp.type;

  const formatTimestamp = (ts: string | Date | undefined) => {
    if (!ts) return "";
    const date = ts instanceof Date ? ts : new Date(ts);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const renderActions = () => {
    if (!actions && !onAction) return null;

    return (
      <div className="mt-2 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        {actions}
        {onAction && (
          <>
            <IconButton
              icon={HiClipboard}
              size="xs"
              variant="ghost"
              onClick={() => onAction("copy", senderProp.id)}
              aria-label="Copy message"
            />
            {senderType === "ai" && (
              <IconButton
                icon={HiArrowPath}
                size="xs"
                variant="ghost"
                onClick={() => onAction("retry", senderProp.id)}
                aria-label="Retry message"
              />
            )}
          </>
        )}
      </div>
    );
  };

  const renderMetadata = () => {
    if (!metadata || senderType !== "ai") return null;

    return (
      <div className="text-base-content/60 mt-1 flex items-center gap-2 text-xs">
        {metadata.model && (
          <Badge size="xs" variant="ghost">
            {metadata.model}
          </Badge>
        )}
        {metadata.tokens && <span>{metadata.tokens} tokens</span>}
        {metadata.responseTime && <span>{metadata.responseTime}ms</span>}
      </div>
    );
  };

  if (senderType === "system") {
    return (
      <div
        className={cn(
          messageBubbleVariants({ senderType: "system", size, spacing }),
          className,
        )}
        {...props}
      >
        <div
          className={messageBalloonVariants({
            senderType: "system",
            variant: balloonVariant,
          })}
        >
          <MessageText content={content} />
          {showTimestamp && timestamp && (
            <MetaText className="mt-1 block">
              {formatTimestamp(timestamp)}
            </MetaText>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        messageBubbleVariants({ senderType, size, spacing }),
        className,
      )}
      {...props}
    >
      {/* Avatar */}
      {showAvatar && (
        <div className="flex-shrink-0">
          <Avatar
            src={senderProp.avatar}
            name={senderProp.name}
            size="md"
            alt={`${senderProp.name} avatar`}
          />
          {senderType === "user" && (
            <StatusDot status="online" position="bottom-right" size="sm" />
          )}
        </div>
      )}

      {/* Message Content */}
      <div className={messageContentVariants({ senderType })}>
        {/* Sender Name */}
        <div className="mb-1 flex items-center gap-2">
          <Text variant="label" weight="medium">
            {senderProp.name}
          </Text>
          {showTimestamp && timestamp && (
            <MetaText>{formatTimestamp(timestamp)}</MetaText>
          )}
          {hasError && (
            <Badge badgeColor="error" size="xs">
              Error
            </Badge>
          )}
        </div>

        {/* Message Balloon */}
        <div
          className={messageBalloonVariants({
            senderType,
            variant: balloonVariant,
          })}
        >
          <MessageText content={content} />

          {/* Generating indicator */}
          {isGenerating && (
            <div className="mt-2 flex items-center gap-2 text-sm opacity-70">
              <div className="flex gap-1">
                <div className="h-1 w-1 animate-bounce rounded-full bg-current [animation-delay:-0.3s]"></div>
                <div className="h-1 w-1 animate-bounce rounded-full bg-current [animation-delay:-0.15s]"></div>
                <div className="h-1 w-1 animate-bounce rounded-full bg-current"></div>
              </div>
              <span>Generating...</span>
            </div>
          )}
        </div>

        {/* Metadata */}
        {renderMetadata()}

        {/* Actions */}
        {renderActions()}
      </div>
    </div>
  );
}

/**
 * MessageGroup - Groups multiple messages from the same sender
 * Useful for conversation threads and reducing visual noise
 */
export interface MessageGroupProps {
  /**
   * Array of messages from the same sender
   */
  messages: Array<{
    id: string;
    content: string;
    timestamp?: string | Date;
    isGenerating?: boolean;
    hasError?: boolean;
    metadata?: MessageBubbleProps["metadata"];
  }>;
  /**
   * Sender information (shared across all messages)
   */
  sender: MessageBubbleProps["sender"];
  /**
   * Message bubble props to apply to all messages
   */
  bubbleProps?: Partial<MessageBubbleProps>;
  /**
   * Whether to show avatar only on first message
   */
  compactMode?: boolean;
}

export function MessageGroup({
  messages,
  sender,
  bubbleProps = {},
  compactMode = true,
}: MessageGroupProps) {
  return (
    <div className="space-y-1">
      {messages.map((message, index) => (
        <MessageBubble
          key={message.id}
          content={message.content}
          sender={sender}
          timestamp={message.timestamp}
          isGenerating={message.isGenerating}
          hasError={message.hasError}
          metadata={message.metadata}
          showAvatar={compactMode ? index === 0 : true}
          showTimestamp={compactMode ? index === 0 : true}
          {...bubbleProps}
        />
      ))}
    </div>
  );
}
