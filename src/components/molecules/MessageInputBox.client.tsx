"use client";

/**
 * MessageInputBox component for chat input interface
 * Features auto-expanding textarea, send button, file attachments, and keyboard shortcuts
 */

import { cn } from "@/styles/cn";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentPropsWithoutRef, KeyboardEvent, ReactNode, useRef, useState } from "react";
import { HiPaperAirplane, HiPaperClip, HiXMark } from "react-icons/hi2";
import { Badge, IconButton, Text } from "../atoms";

const messageInputBoxVariants = cva(
  "flex flex-col bg-base-100 border border-base-300 rounded-lg transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border-base-300 focus-within:border-primary",
        focused: "border-primary shadow-lg",
        disabled: "border-base-200 bg-base-50 opacity-60",
        error: "border-error focus-within:border-error",
      },
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

const textareaVariants = cva(
  "w-full bg-transparent border-none outline-none resize-none placeholder:text-base-content/60 transition-all duration-200",
  {
    variants: {
      size: {
        sm: "text-sm p-3 min-h-[2.5rem] max-h-32",
        md: "text-base p-4 min-h-[3rem] max-h-40",
        lg: "text-lg p-5 min-h-[3.5rem] max-h-48",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const toolbarVariants = cva(
  "flex items-center justify-between border-t border-base-200 bg-base-50/50",
  {
    variants: {
      size: {
        sm: "px-3 py-2 gap-2",
        md: "px-4 py-3 gap-3",
        lg: "px-5 py-4 gap-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

interface MessageInputBoxProps
  extends Omit<ComponentPropsWithoutRef<"div">, "onChange" | "onSubmit">,
    VariantProps<typeof messageInputBoxVariants> {
  /** Current value of the input */
  value?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Called when input value changes */
  onChange?: (value: string) => void;
  /** Called when message should be sent */
  onSubmit?: (message: string, attachments?: File[]) => void;
  /** Called when files are attached */
  onFileAttach?: (files: File[]) => void;
  /** Whether input is disabled */
  disabled?: boolean;
  /** Whether sending is in progress */
  sending?: boolean;
  /** Maximum character count */
  maxLength?: number;
  /** Character counter display */
  showCharCount?: boolean;
  /** Enable file attachments */
  enableAttachments?: boolean;
  /** Accept file types for attachments */
  acceptFileTypes?: string;
  /** Maximum file size in bytes */
  maxFileSize?: number;
  /** Error message to display */
  errorMessage?: string;
  /** Additional toolbar content */
  toolbarContent?: ReactNode;
}

export function MessageInputBox({
  value = "",
  placeholder = "Type your message...",
  onChange,
  onSubmit,
  onFileAttach,
  disabled = false,
  sending = false,
  maxLength,
  showCharCount = false,
  enableAttachments = true,
  acceptFileTypes = ".jpg,.jpeg,.png,.gif,.pdf,.txt,.doc,.docx",
  maxFileSize = 10 * 1024 * 1024, // 10MB
  errorMessage,
  toolbarContent,
  variant,
  size,
  className,
  ...props
}: MessageInputBoxProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  // Auto-resize textarea
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (maxLength && newValue.length > maxLength) return;
    
    onChange?.(newValue);
    adjustTextareaHeight();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (!value.trim() || disabled || sending) return;
    onSubmit?.(value.trim(), attachments.length > 0 ? attachments : undefined);
    setAttachments([]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFileAttachment(files);
  };

  const handleFileAttachment = (files: File[]) => {
    const validFiles = files.filter(file => {
      if (maxFileSize && file.size > maxFileSize) {
        console.warn(`File ${file.name} exceeds maximum size of ${maxFileSize} bytes`);
        return false;
      }
      return true;
    });

    const newAttachments = [...attachments, ...validFiles];
    setAttachments(newAttachments);
    onFileAttach?.(newAttachments);
  };

  const removeAttachment = (index: number) => {
    const newAttachments = attachments.filter((_, i) => i !== index);
    setAttachments(newAttachments);
    onFileAttach?.(newAttachments);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (!enableAttachments || disabled) return;
    
    const files = Array.from(e.dataTransfer.files);
    handleFileAttachment(files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (enableAttachments && !disabled) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const isSubmitDisabled = !value.trim() || disabled || sending;
  const effectiveVariant = errorMessage ? "error" : isDragOver ? "focused" : variant;

  return (
    <div className="relative">
      <div
        className={cn(messageInputBoxVariants({ variant: effectiveVariant, size }), className)}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        {...props}
      >
        {/* Attachments Preview */}
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 p-3 border-b border-base-200">
            {attachments.map((file, index) => (
              <div key={`${file.name}-${index}`} className="flex items-center gap-2">
                <Badge variant="outline" className="pr-1">
                  <span className="text-xs">{file.name}</span>
                  <IconButton
                    variant="ghost"
                    size="xs"
                    aria-label={`Remove ${file.name}`}
                    onClick={() => removeAttachment(index)}
                    className="ml-1 h-4 w-4"
                  >
                    <HiXMark className="h-3 w-3" />
                  </IconButton>
                </Badge>
              </div>
            ))}
          </div>
        )}

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          className={cn(textareaVariants({ size }))}
          rows={1}
          aria-label="Message input"
          aria-describedby={errorMessage ? "input-error" : undefined}
        />

        {/* Toolbar */}
        <div className={cn(toolbarVariants({ size }))}>
          <div className="flex items-center gap-2">
            {/* File Attachment Button */}
            {enableAttachments && (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept={acceptFileTypes}
                  onChange={handleFileSelect}
                  className="hidden"
                  aria-label="Attach files"
                />
                <IconButton
                  variant="ghost"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={disabled}
                  aria-label="Attach files"
                >
                  <HiPaperClip className="h-4 w-4" />
                </IconButton>
              </>
            )}

            {/* Additional Toolbar Content */}
            {toolbarContent}
          </div>

          <div className="flex items-center gap-3">
            {/* Character Counter */}
            {showCharCount && maxLength && (
              <Text variant="message-meta" className="text-xs">
                {value.length}/{maxLength}
              </Text>
            )}

            {/* Send Button */}
            <IconButton
              variant="primary"
              size="sm"
              onClick={handleSubmit}
              disabled={isSubmitDisabled}
              aria-label={sending ? "Sending message..." : "Send message"}
              className="shrink-0"
            >
              <HiPaperAirplane className="h-4 w-4" />
            </IconButton>
          </div>
        </div>

        {/* Drag Overlay */}
        {isDragOver && enableAttachments && (
          <div className="absolute inset-0 bg-primary/10 border-2 border-dashed border-primary rounded-lg flex items-center justify-center z-10">
            <div className="text-center">
              <HiPaperClip className="h-8 w-8 text-primary mx-auto mb-2" />
              <Text variant="body" className="text-primary font-medium">
                Drop files to attach
              </Text>
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {errorMessage && (
        <Text
          id="input-error"
          variant="message-meta"
          className="text-error mt-2 text-sm"
          role="alert"
        >
          {errorMessage}
        </Text>
      )}

      {/* Keyboard Shortcut Hint */}
      <Text variant="message-meta" className="text-xs text-base-content/60 mt-1">
        Press Ctrl+Enter to send
      </Text>
    </div>
  );
}

// Specialized variants for different use cases
export interface MessageInputProps extends MessageInputBoxProps {
  /** Quick action for common inputs */
  quickActions?: Array<{
    label: string;
    action: () => void;
    icon?: ReactNode;
  }>;
}

export function MessageInput({ quickActions, toolbarContent, ...props }: MessageInputProps) {
  const extendedToolbarContent = (
    <>
      {quickActions && quickActions.length > 0 && (
        <div className="flex gap-1">
          {quickActions.map((action, index) => (
            <IconButton
              key={index}
              variant="ghost"
              size="xs"
              onClick={action.action}
              aria-label={action.label}
              title={action.label}
            >
              {action.icon}
            </IconButton>
          ))}
        </div>
      )}
      {toolbarContent}
    </>
  );

  return <MessageInputBox {...props} toolbarContent={extendedToolbarContent} />;
}

export type { MessageInputBoxProps };
