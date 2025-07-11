"use client";

/**
 * MessageList component for displaying chat messages with virtualization
 * Built with React Aria Components, styled with DaisyUI, and animated with Motion
 */

import { cn } from "@/styles/cn";
import { cva, VariantProps } from "class-variance-authority";
import * as motion from "motion/react-client";
import { ComponentPropsWithoutRef, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import {
  ListBox,
  ListBoxItem,
  Virtualizer,
  ListLayout,
} from "react-aria-components";
import { HiArrowDown, HiArrowUp } from "react-icons/hi2";
import { Spinner, Text as CustomText } from "../atoms";
import { MessageGroup } from "../molecules/MessageBubble.client";

// Motion components
const MotionDiv = motion.create("div");
const MotionButton = motion.create("button");

const messageListVariants = cva(
  "flex flex-col h-full bg-base-100 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "border border-base-300 rounded-lg",
        compact: "border-none rounded-none",
        floating: "border border-base-300 rounded-xl shadow-lg",
        bordered: "border-2 border-primary rounded-lg",
      },
      size: {
        sm: "max-h-64",
        md: "max-h-96", 
        lg: "max-h-[32rem]",
        xl: "max-h-[40rem]",
        full: "h-full",
      },
      spacing: {
        tight: "p-2 gap-1",
        normal: "p-4 gap-3",
        loose: "p-6 gap-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "lg",
      spacing: "normal",
    },
  },
);

interface Message {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
    type: "user" | "ai" | "system";
  };
  timestamp: Date;
  status?: "sending" | "sent" | "error";
  metadata?: {
    model?: string;
    tokens?: number;
    responseTime?: number;
  };
  isGenerating?: boolean;
  hasError?: boolean;
  actions?: ReactNode;
}

interface MessageGroup {
  id: string;
  sender: Message["sender"];
  messages: Message[];
  timestamp?: Date;
}

interface MessageListProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children">,
    VariantProps<typeof messageListVariants> {
  /** Array of messages to display */
  messages?: Message[];
  /** Array of grouped messages */
  groups?: MessageGroup[];
  /** Whether to show loading state */
  loading?: boolean;
  /** Loading message text */
  loadingText?: string;
  /** Whether to show empty state */
  showEmptyState?: boolean;
  /** Empty state content */
  emptyStateContent?: ReactNode;
  /** Whether to auto-scroll to bottom on new messages */
  autoScroll?: boolean;
  /** Whether to show scroll to bottom button */
  showScrollButton?: boolean;
  /** Whether to show scroll to top button */
  showScrollToTop?: boolean;
  /** Whether to enable virtualization for large lists */
  enableVirtualization?: boolean;
  /** Estimated item height for virtualization */
  estimatedItemHeight?: number;
  /** Maximum number of messages to display */
  maxMessages?: number;
  /** Whether to group consecutive messages from same sender */
  groupConsecutiveMessages?: boolean;
  /** Time threshold for grouping messages (in minutes) */
  groupTimeThreshold?: number;
  /** Called when a message is selected */
  onMessageSelect?: (message: Message) => void;
  /** Called when scrolled to top (for loading more messages) */
  onScrollToTop?: () => void;
  /** Called when scrolled to bottom */
  onScrollToBottom?: () => void;
  /** Whether messages are being loaded */
  isLoadingMore?: boolean;
  /** Custom message renderer */
  renderMessage?: (message: Message, index: number) => ReactNode;
  /** Custom empty state renderer */
  renderEmptyState?: () => ReactNode;
}

export function MessageList({
  messages = [],
  groups = [],
  loading = false,
  loadingText = "Loading messages...",
  showEmptyState = true,
  emptyStateContent,
  autoScroll = true,
  showScrollButton = true,
  showScrollToTop = false,
  enableVirtualization = true,
  estimatedItemHeight = 80,
  maxMessages,
  groupConsecutiveMessages = true,
  groupTimeThreshold = 5,
  onMessageSelect,
  onScrollToTop,
  onScrollToBottom,
  isLoadingMore = false,
  renderEmptyState,
  variant,
  size,
  spacing,
  className,
  ...props
}: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [isAtTop, setIsAtTop] = useState(false);
  const [showScrollToBottomButton, setShowScrollToBottomButton] = useState(false);

  // Process messages - handle grouping and limits
  const processedData = useCallback(() => {
    let allMessages = messages;

    // If using groups, flatten them
    if (groups.length > 0) {
      allMessages = groups.flatMap(group => group.messages);
    }

    // Apply message limit
    if (maxMessages && allMessages.length > maxMessages) {
      allMessages = allMessages.slice(-maxMessages);
    }

    // Group consecutive messages if enabled
    if (groupConsecutiveMessages && !groups.length) {
      const grouped: MessageGroup[] = [];
      let currentGroup: MessageGroup | null = null;        allMessages.forEach((message, index) => {
          const shouldGroup = currentGroup && 
            currentGroup.messages[currentGroup.messages.length - 1].sender.id === message.sender.id &&
            message.timestamp.getTime() - currentGroup.messages[currentGroup.messages.length - 1].timestamp.getTime() < (groupTimeThreshold * 60 * 1000);

          if (shouldGroup) {
            currentGroup!.messages.push(message);
          } else {
            currentGroup = {
              id: `group-${index}`,
              sender: message.sender,
              messages: [message],
              timestamp: message.timestamp,
            };
            grouped.push(currentGroup);
          }
        });

      return grouped;
    }

    // Return ungrouped messages as individual groups
    return allMessages.map((message, index) => ({
      id: `single-${index}`,
      sender: message.sender,
      messages: [message],
      timestamp: message.timestamp,
    }));
  }, [messages, groups, maxMessages, groupConsecutiveMessages, groupTimeThreshold]);

  const messageGroups = processedData();

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (autoScroll && isAtBottom && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messageGroups, autoScroll, isAtBottom]);

  // Handle scroll events
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const { scrollTop, scrollHeight, clientHeight } = target;
    
    const atBottom = scrollHeight - scrollTop - clientHeight < 10;
    const atTop = scrollTop < 10;
    
    setIsAtBottom(atBottom);
    setIsAtTop(atTop);
    setShowScrollToBottomButton(!atBottom && showScrollButton);

    if (atBottom) {
      onScrollToBottom?.();
    }
    
    if (atTop && !isLoadingMore) {
      onScrollToTop?.();
    }
  }, [onScrollToTop, onScrollToBottom, isLoadingMore, showScrollButton]);

  // Scroll to bottom
  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, []);

  // Scroll to top
  const scrollToTopFn = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }, []);

  // Default empty state renderer
  const defaultEmptyState = useCallback(() => {
    if (renderEmptyState) {
      return renderEmptyState();
    }

    return (
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center h-full text-center p-8"
      >
        <CustomText variant="h4" className="mb-2 text-base-content/70">
          No messages yet
        </CustomText>
        <CustomText variant="body" className="text-base-content/50">
          {emptyStateContent || "Start a conversation to see messages here"}
        </CustomText>
      </MotionDiv>
    );
  }, [renderEmptyState, emptyStateContent]);

  // Loading state
  if (loading) {
    return (
      <div className={cn(messageListVariants({ variant, size, spacing }), className)} {...props}>
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center h-full"
        >
          <Spinner size="lg" className="mb-4" />
          <CustomText variant="body" className="text-base-content/70">
            {loadingText}
          </CustomText>
        </MotionDiv>
      </div>
    );
  }

  // Empty state
  if (messageGroups.length === 0 && showEmptyState) {
    return (
      <div className={cn(messageListVariants({ variant, size, spacing }), className)} {...props}>
        {defaultEmptyState()}
      </div>
    );
  }

  // Main content with virtualization or standard scrolling
  const MessageListContent = () => {
    if (enableVirtualization && messageGroups.length > 20) {
      return (
        <Virtualizer 
          layout={ListLayout}
          layoutOptions={{
            estimatedRowHeight: estimatedItemHeight,
            padding: 8,
            gap: 12
          }}
        >
          <ListBox
            aria-label="Chat messages"
            items={messageGroups}
            className="h-full w-full outline-none"
            onSelectionChange={(keys: "all" | Set<React.Key>) => {
              const selectedKey = Array.from(keys)[0];
              if (selectedKey && onMessageSelect) {
                const group = messageGroups.find(g => g.id === selectedKey);
                if (group?.messages[0]) {
                  onMessageSelect(group.messages[0]);
                }
              }
            }}
          >
            {(group: MessageGroup) => (
              <ListBoxItem
                key={group.id}
                id={group.id}
                textValue={group.messages.map((m: Message) => m.content).join(" ")}
                className="outline-none focus:outline-none"
              >
                <MotionDiv
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  layout
                  className="w-full"
                >
                  <MessageGroup
                    messages={group.messages}
                    sender={group.sender}
                  />
                </MotionDiv>
              </ListBoxItem>
            )}
          </ListBox>
        </Virtualizer>
      );
    }

    // Standard scrolling for smaller lists
    return (
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto scroll-smooth"
        onScroll={handleScroll}
      >
        {/* Loading more indicator */}
        {isLoadingMore && (
          <MotionDiv
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center justify-center py-4"
          >
            <Spinner size="sm" className="mr-2" />
            <CustomText variant="caption" className="text-base-content/60">
              Loading more messages...
            </CustomText>
          </MotionDiv>
        )}

        <div className="space-y-3 p-2">
          {messageGroups.map((group, groupIndex) => (
            <MotionDiv
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIndex * 0.05 }}
              layout
            >
              <MessageGroup
                messages={group.messages}
                sender={group.sender}
              />
            </MotionDiv>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={cn(messageListVariants({ variant, size, spacing }), className)} {...props}>
      <MessageListContent />

      {/* Scroll to bottom button */}
      {showScrollToBottomButton && (
        <MotionButton
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToBottom}
          className="absolute bottom-4 right-4 btn btn-circle btn-primary shadow-lg"
          aria-label="Scroll to bottom"
        >
          <HiArrowDown className="h-5 w-5" />
        </MotionButton>
      )}

      {/* Scroll to top button */}
      {showScrollToTop && !isAtTop && (
        <MotionButton
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTopFn}
          className="absolute top-4 right-4 btn btn-circle btn-secondary shadow-lg"
          aria-label="Scroll to top"
        >
          <HiArrowUp className="h-5 w-5" />
        </MotionButton>
      )}
    </div>
  );
}

// Specialized variant for chat history
interface ChatHistoryProps extends Omit<MessageListProps, "messages"> {
  /** Chat history data */
  history: Array<{
    sessionId: string;
    title: string;
    messages: Message[];
    lastActivity: Date;
  }>;
  /** Called when a chat session is selected */
  onSessionSelect?: (sessionId: string) => void;
}

export function ChatHistory({ 
  history, 
  onSessionSelect, 
  ...props 
}: ChatHistoryProps) {
  const processedGroups: MessageGroup[] = history.map(session => ({
    id: session.sessionId,
    sender: {
      id: 'system',
      name: session.title,
      type: 'system' as const,
    },
    messages: session.messages,
    timestamp: session.lastActivity,
  }));

  return (
    <MessageList
      {...props}
      groups={processedGroups}
      groupConsecutiveMessages={false}
      onMessageSelect={(message) => {
        const session = history.find(s => s.messages.some(m => m.id === message.id));
        if (session) {
          onSessionSelect?.(session.sessionId);
        }
      }}
    />
  );
}

// Specialized variant for real-time chat
interface RealTimeChatProps extends MessageListProps {
  /** Whether typing indicator should be shown */
  showTypingIndicator?: boolean;
  /** User currently typing */
  typingUser?: string;
}

export function RealTimeChat({ 
  showTypingIndicator = false, 
  typingUser,
  ...props 
}: RealTimeChatProps) {
  return (
    <div className="relative">
      <MessageList
        {...props}
        autoScroll={true}
        showScrollButton={true}
        enableVirtualization={false} // Disable for real-time for better UX
      />
      
      {/* Typing indicator at the bottom */}
      {showTypingIndicator && typingUser && (
        <MotionDiv
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute bottom-2 left-2 flex items-center space-x-2 p-3 text-base-content/60 bg-base-100 rounded-lg shadow-sm"
        >
          <Spinner size="xs" />
          <CustomText variant="caption">
            {typingUser} is typing...
          </CustomText>
        </MotionDiv>
      )}
    </div>
  );
}

export type { MessageListProps, Message, MessageGroup, ChatHistoryProps, RealTimeChatProps };
