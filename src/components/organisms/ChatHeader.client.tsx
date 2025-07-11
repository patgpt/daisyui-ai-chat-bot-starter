"use client";

import { useState, useCallback } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "motion/react";
import {
  FiMessageSquare,
  FiSettings,
  FiDownload,
  FiTrash2,
  FiMoreVertical,
  FiWifi,
  FiWifiOff,
  FiCpu,
  FiUser,
  FiChevronDown,
} from "react-icons/fi";

import { cn } from "../../styles/cn";
import { Avatar, IconButton, Badge, StatusDot, Divider } from "../atoms";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

// Motion components
const MotionDiv = motion.create("div");
const MotionHeader = motion.create("header");

/**
 * Chat Header Variants using CVA
 */
const chatHeaderVariants = cva(
  [
    // Base styles
    "flex items-center justify-between w-full",
    "transition-all duration-200 ease-in-out",
    "border-b border-base-300",
  ],
  {
    variants: {
      variant: {
        default: "bg-base-100 shadow-sm",
        floating: "bg-base-100/80 backdrop-blur-lg shadow-lg rounded-lg mx-4 mt-4 border",
        minimal: "bg-transparent border-b-0",
        gradient: "bg-gradient-to-r from-primary/10 to-secondary/10",
      },
      size: {
        sm: "h-12 px-4",
        md: "h-16 px-6", 
        lg: "h-20 px-8",
        xl: "h-24 px-10",
      },
      sticky: {
        true: "sticky top-0 z-40",
        false: "relative",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      sticky: true,
    },
  }
);

/**
 * Status indicator for connection state
 */
export interface ConnectionStatus {
  isConnected: boolean;
  lastSeen?: Date;
  responseTime?: number;
}

/**
 * Model information for the AI assistant
 */
export interface ModelInfo {
  id: string;
  name: string;
  provider: string;
  version?: string;
  maxTokens?: number;
  temperature?: number;
  capabilities?: string[];
}

/**
 * Chat session metadata
 */
export interface ChatSession {
  id: string;
  title: string;
  messageCount: number;
  createdAt: Date;
  lastActivity: Date;
  tokensUsed?: number;
  model?: ModelInfo;
}

/**
 * Props for the ChatHeader component
 */
export interface ChatHeaderProps
  extends Omit<ComponentPropsWithoutRef<"header">, "title">,
    VariantProps<typeof chatHeaderVariants> {
  /** Title of the chat or conversation */
  title?: string;
  /** Subtitle or description */
  subtitle?: string;
  /** Current model information */
  model?: ModelInfo;
  /** Connection status */
  connectionStatus?: ConnectionStatus;
  /** Current chat session data */
  session?: ChatSession;
  /** Show model selector dropdown */
  showModelSelector?: boolean;
  /** Show connection status */
  showConnectionStatus?: boolean;
  /** Show session info */
  showSessionInfo?: boolean;
  /** Show export button */
  showExportButton?: boolean;
  /** Show clear chat button */
  showClearButton?: boolean;
  /** Show settings button */
  showSettingsButton?: boolean;
  /** Custom actions to render */
  customActions?: ReactNode;
  /** Callback when model is changed */
  onModelChange?: (model: ModelInfo) => void;
  /** Callback when export is clicked */
  onExport?: () => void;
  /** Callback when clear chat is clicked */
  onClear?: () => void;
  /** Callback when settings is clicked */
  onSettings?: () => void;
  /** Loading state */
  loading?: boolean;
  /** Show typing indicator */
  showTypingIndicator?: boolean;
}

/**
 * Model selector dropdown component
 */
interface ModelSelectorProps {
  currentModel?: ModelInfo;
  models?: ModelInfo[];
  onModelChange?: (model: ModelInfo) => void;
  loading?: boolean;
}

const ModelSelector = ({ 
  currentModel, 
  models = [], 
  onModelChange,
  loading 
}: ModelSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModelSelect = useCallback((model: ModelInfo) => {
    onModelChange?.(model);
    setIsOpen(false);
  }, [onModelChange]);

  if (!currentModel) return null;

  return (
    <div className="dropdown dropdown-end">
      <button
        tabIndex={0}
        className="btn btn-ghost btn-sm flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
        disabled={loading}
      >
        <FiCpu className="w-4 h-4" />
        <span className="hidden sm:inline">{currentModel.name}</span>
        <FiChevronDown className="w-3 h-3" />
      </button>
      
      {isOpen && (
        <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-64 border border-base-300">
          {models.map((model) => (
            <li key={model.id}>
              <button
                className={cn(
                  "flex flex-col items-start p-3",
                  model.id === currentModel.id && "active"
                )}
                onClick={() => handleModelSelect(model)}
              >
                <div className="flex items-center gap-2 w-full">
                  <FiCpu className="w-4 h-4" />
                  <span className="font-medium">{model.name}</span>
                  {model.id === currentModel.id && (
                    <Badge variant="soft" color="primary" size="xs">Current</Badge>
                  )}
                </div>
                <div className="text-xs text-base-content/60 mt-1">
                  {model.provider} • {model.version}
                </div>
                {model.capabilities && (
                  <div className="flex gap-1 mt-1">
                    {model.capabilities.slice(0, 2).map((cap) => (
                      <Badge key={cap} variant="outline" size="xs">
                        {cap}
                      </Badge>
                    ))}
                  </div>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

/**
 * Connection status indicator component
 */
interface ConnectionIndicatorProps {
  status: ConnectionStatus;
  showDetails?: boolean;
}

const ConnectionIndicator = ({ status, showDetails = true }: ConnectionIndicatorProps) => {
  const getStatusColor = () => {
    if (!status.isConnected) return "error";
    if (status.responseTime && status.responseTime > 2000) return "warning";
    return "success";
  };

  const getStatusText = () => {
    if (!status.isConnected) return "Disconnected";
    if (status.responseTime && status.responseTime > 2000) return "Slow connection";
    return "Connected";
  };

  return (
    <div className="flex items-center gap-2">
      {status.isConnected ? (
        <FiWifi className="w-4 h-4 text-success" />
      ) : (
        <FiWifiOff className="w-4 h-4 text-error" />
      )}
      <StatusDot 
        variant="indicator" 
        color={getStatusColor()} 
        pulse={status.isConnected}
      />
      {showDetails && (
        <span className="text-xs text-base-content/60 hidden sm:inline">
          {getStatusText()}
          {status.responseTime && status.isConnected && (
            <span className="ml-1">({status.responseTime}ms)</span>
          )}
        </span>
      )}
    </div>
  );
};

/**
 * Session info display component
 */
interface SessionInfoProps {
  session: ChatSession;
  compact?: boolean;
}

const SessionInfo = ({ session, compact = false }: SessionInfoProps) => {
  if (compact) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <FiMessageSquare className="w-4 h-4" />
        <span className="text-base-content/60">{session.messageCount}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <FiMessageSquare className="w-4 h-4" />
        <span className="text-sm font-medium">{session.title}</span>
      </div>
      <div className="flex items-center gap-4 text-xs text-base-content/60">
        <span>{session.messageCount} messages</span>
        {session.tokensUsed && (
          <span>{session.tokensUsed.toLocaleString()} tokens</span>
        )}
        <span>Last: {session.lastActivity.toLocaleTimeString()}</span>
      </div>
    </div>
  );
};

/**
 * ChatHeader component - Top navigation and controls for chat interface
 */
export function ChatHeader({
  title = "AI Assistant",
  subtitle,
  model,
  connectionStatus,
  session,
  showModelSelector = true,
  showConnectionStatus = true,
  showSessionInfo = true,
  showExportButton = true,
  showClearButton = true,
  showSettingsButton = true,
  customActions,
  onModelChange,
  onExport,
  onClear,
  onSettings,
  loading = false,
  showTypingIndicator = false,
  variant,
  size,
  sticky,
  className,
  ...props
}: ChatHeaderProps) {
  const [showMoreActions, setShowMoreActions] = useState(false);

  // Sample models for demo - in real app this would come from props
  const availableModels: ModelInfo[] = [
    {
      id: "gpt-4",
      name: "GPT-4",
      provider: "OpenAI",
      version: "1.0",
      maxTokens: 8192,
      capabilities: ["reasoning", "code", "analysis"],
    },
    {
      id: "gpt-3.5-turbo",
      name: "GPT-3.5 Turbo",
      provider: "OpenAI", 
      version: "1.0",
      maxTokens: 4096,
      capabilities: ["chat", "fast"],
    },
    {
      id: "claude-3",
      name: "Claude 3",
      provider: "Anthropic",
      version: "3.0",
      maxTokens: 100000,
      capabilities: ["reasoning", "safety", "long-context"],
    },
  ];

  return (
    <MotionHeader
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(chatHeaderVariants({ variant, size, sticky }), className)}
      {...props}
    >
      {/* Left section - Title and info */}
      <div className="flex items-center gap-4 min-w-0 flex-1">
        {/* Bot Avatar */}
        <Avatar
          src="/rick.png"
          alt="AI Assistant"
          size="md"
          variant="circular"
          className="shrink-0"
        />

        {/* Title and Status */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold text-base-content truncate">
              {title}
            </h1>
            {showTypingIndicator && (
              <MotionDiv
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-1"
              >
                <StatusDot variant="indicator" color="primary" pulse />
                <span className="text-xs text-primary">Typing...</span>
              </MotionDiv>
            )}
          </div>
          
          {subtitle && (
            <p className="text-sm text-base-content/60 truncate">{subtitle}</p>
          )}

          {/* Connection and Session Info */}
          <div className="flex items-center gap-4 mt-1">
            {showConnectionStatus && connectionStatus && (
              <ConnectionIndicator status={connectionStatus} showDetails={false} />
            )}
            
            {showSessionInfo && session && (
              <SessionInfo session={session} compact />
            )}
          </div>
        </div>
      </div>

      {/* Center section - Model selector */}
      {showModelSelector && model && (
        <div className="hidden lg:flex items-center">
          <ModelSelector
            currentModel={model}
            models={availableModels}
            onModelChange={onModelChange}
            loading={loading}
          />
        </div>
      )}

      {/* Right section - Actions */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Connection status (detailed) */}
        {showConnectionStatus && connectionStatus && (
          <div className="hidden xl:block">
            <ConnectionIndicator status={connectionStatus} showDetails />
          </div>
        )}

        {/* Primary actions */}
        <div className="flex items-center gap-1">
          {showExportButton && (
            <IconButton
              variant="ghost"
              size="sm"
              icon={FiDownload}
              onClick={onExport}
              disabled={loading}
              aria-label="Export chat"
              className="hidden sm:flex"
            />
          )}

          {showClearButton && (
            <IconButton
              variant="ghost"
              size="sm"
              icon={FiTrash2}
              onClick={onClear}
              disabled={loading}
              aria-label="Clear chat"
              className="hidden sm:flex"
            />
          )}

          {showSettingsButton && (
            <IconButton
              variant="ghost"
              size="sm"
              icon={FiSettings}
              onClick={onSettings}
              disabled={loading}
              aria-label="Settings"
            />
          )}

          {/* Custom actions */}
          {customActions}

          {/* More actions dropdown for mobile */}
          <div className="dropdown dropdown-end sm:hidden">
            <IconButton
              variant="ghost"
              size="sm"
              icon={FiMoreVertical}
              onClick={() => setShowMoreActions(!showMoreActions)}
              aria-label="More actions"
            />
            
            {showMoreActions && (
              <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-48 border border-base-300">
                {showModelSelector && (
                  <li>
                    <button className="flex items-center gap-2">
                      <FiCpu className="w-4 h-4" />
                      Model: {model?.name}
                    </button>
                  </li>
                )}
                {showExportButton && (
                  <li>
                    <button 
                      className="flex items-center gap-2"
                      onClick={onExport}
                    >
                      <FiDownload className="w-4 h-4" />
                      Export Chat
                    </button>
                  </li>
                )}
                {showClearButton && (
                  <li>
                    <button 
                      className="flex items-center gap-2 text-error"
                      onClick={onClear}
                    >
                      <FiTrash2 className="w-4 h-4" />
                      Clear Chat
                    </button>
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </MotionHeader>
  );
}

/**
 * Simple ChatHeader variant for minimal layouts
 */
export function SimpleChatHeader({
  title = "Chat",
  onSettings,
  className,
  ...props
}: Pick<ChatHeaderProps, "title" | "onSettings" | "className"> & ComponentPropsWithoutRef<"header">) {
  return (
    <ChatHeader
      title={title}
      variant="minimal"
      size="sm"
      showModelSelector={false}
      showConnectionStatus={false}
      showSessionInfo={false}
      showExportButton={false}
      showClearButton={false}
      onSettings={onSettings}
      className={className}
      {...props}
    />
  );
}

/**
 * Mobile-optimized ChatHeader variant
 */
export function MobileChatHeader({
  title = "AI Chat",
  model,
  connectionStatus,
  onSettings,
  className,
  ...props
}: Pick<ChatHeaderProps, "title" | "model" | "connectionStatus" | "onSettings" | "className"> & ComponentPropsWithoutRef<"header">) {
  return (
    <ChatHeader
      title={title}
      model={model}
      connectionStatus={connectionStatus}
      variant="default"
      size="sm"
      showModelSelector={false}
      showSessionInfo={false}
      showExportButton={false}
      showClearButton={false}
      onSettings={onSettings}
      className={className}
      {...props}
    />
  );
}

// Export types
export type { ModelInfo, ConnectionStatus, ChatSession };
