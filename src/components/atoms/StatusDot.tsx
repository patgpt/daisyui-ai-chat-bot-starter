/**
 * StatusDot component for online/offline indicators
 * Used to show user presence, connection status, and other state indicators
 */

import { cn } from "@/styles/cn";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentPropsWithoutRef } from "react";

const statusDotVariants = cva("rounded-full border-2 border-base-100", {
  variants: {
    status: {
      online: "bg-success animate-pulse",
      offline: "bg-base-300",
      away: "bg-warning",
      busy: "bg-error",
      idle: "bg-info animate-pulse",
    },
    size: {
      xs: "w-2 h-2",
      sm: "w-3 h-3",
      md: "w-4 h-4",
      lg: "w-5 h-5",
      xl: "w-6 h-6",
    },
    pulse: {
      true: "animate-pulse",
      false: "",
    },
    position: {
      "top-right": "absolute -top-0.5 -right-0.5",
      "top-left": "absolute -top-0.5 -left-0.5",
      "bottom-right": "absolute -bottom-0.5 -right-0.5",
      "bottom-left": "absolute -bottom-0.5 -left-0.5",
      standalone: "relative",
    },
  },
  defaultVariants: {
    status: "offline",
    size: "md",
    pulse: false,
    position: "standalone",
  },
});

export interface StatusDotProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children">,
    VariantProps<typeof statusDotVariants> {
  /**
   * Screen reader label for the status
   */
  "aria-label"?: string;
  /**
   * Whether to show a tooltip on hover
   */
  tooltip?: string;
}

/**
 * StatusDot component for showing user presence and connection status
 *
 * @example
 * ```tsx
 * // Basic status dot
 * <StatusDot status="online" />
 *
 * // Positioned on avatar
 * <div className="relative">
 *   <Avatar src="/user.jpg" />
 *   <StatusDot status="online" position="bottom-right" />
 * </div>
 *
 * // With custom size and pulse
 * <StatusDot
 *   status="busy"
 *   size="lg"
 *   pulse={true}
 *   aria-label="User is busy"
 * />
 * ```
 */
export function StatusDot({
  status,
  size,
  pulse,
  position,
  className,
  tooltip,
  "aria-label": ariaLabel,
  ...props
}: StatusDotProps) {
  const statusLabels = {
    online: "Online",
    offline: "Offline",
    away: "Away",
    busy: "Busy",
    idle: "Idle",
  };

  const defaultLabel = status ? statusLabels[status] : "Status unknown";
  const label = ariaLabel || defaultLabel;

  const dotElement = (
    <div
      className={cn(
        statusDotVariants({ status, size, pulse, position }),
        className,
      )}
      role="img"
      aria-label={label}
      {...props}
    />
  );

  // If tooltip is provided, wrap in a tooltip container
  if (tooltip) {
    return (
      <div className="tooltip" data-tip={tooltip}>
        {dotElement}
      </div>
    );
  }

  return dotElement;
}

/**
 * StatusIndicator - A combination of StatusDot with text label
 * Useful for status displays in user lists or profiles
 */
export interface StatusIndicatorProps extends StatusDotProps {
  /**
   * Text label to display next to the status dot
   */
  label?: string;
  /**
   * Whether to show the label
   */
  showLabel?: boolean;
}

export function StatusIndicator({
  label,
  showLabel = true,
  status,
  size = "sm",
  className,
  ...props
}: StatusIndicatorProps) {
  const statusLabels = {
    online: "Online",
    offline: "Offline",
    away: "Away",
    busy: "Busy",
    idle: "Idle",
  };

  const displayLabel = label || (status ? statusLabels[status] : "Unknown");

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <StatusDot status={status} size={size} position="standalone" {...props} />
      {showLabel && (
        <span className="text-base-content/70 text-sm">{displayLabel}</span>
      )}
    </div>
  );
}

/**
 * ConnectionStatus - Specialized status dot for connection states
 * Used for showing network, API, or service connection status
 */
export interface ConnectionStatusProps extends Omit<StatusDotProps, "status"> {
  /**
   * Connection state
   */
  connected: boolean;
  /**
   * Whether the connection is currently attempting to connect
   */
  connecting?: boolean;
  /**
   * Custom labels for different states
   */
  labels?: {
    connected: string;
    disconnected: string;
    connecting: string;
  };
}

export function ConnectionStatus({
  connected,
  connecting = false,
  labels = {
    connected: "Connected",
    disconnected: "Disconnected",
    connecting: "Connecting",
  },
  ...props
}: ConnectionStatusProps) {
  const getStatus = () => {
    if (connecting) return "idle";
    return connected ? "online" : "offline";
  };

  const getLabel = () => {
    if (connecting) return labels.connecting;
    return connected ? labels.connected : labels.disconnected;
  };

  return (
    <StatusDot
      status={getStatus()}
      pulse={connecting}
      aria-label={getLabel()}
      tooltip={getLabel()}
      {...props}
    />
  );
}
