import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Avatar } from "./Avatar.client";
import { ConnectionStatus, StatusDot, StatusIndicator } from "./StatusDot";

const meta: Meta<typeof StatusDot> = {
  title: "Atoms/StatusDot",
  component: StatusDot,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "StatusDot component for showing user presence, connection status, and other state indicators with optional animations and positioning.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: ["online", "offline", "away", "busy", "idle"],
      description: "Status state to display",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Size of the status dot",
    },
    pulse: {
      control: "boolean",
      description: "Whether to animate with pulse effect",
    },
    position: {
      control: "select",
      options: [
        "top-right",
        "top-left",
        "bottom-right",
        "bottom-left",
        "standalone",
      ],
      description: "Position relative to parent element",
    },
    tooltip: {
      control: "text",
      description: "Tooltip text to show on hover",
    },
    "aria-label": {
      control: "text",
      description: "Accessibility label for screen readers",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    status: "online",
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="text-center">
        <StatusDot status="online" size="lg" />
        <p className="mt-2 text-sm">Online</p>
      </div>
      <div className="text-center">
        <StatusDot status="away" size="lg" />
        <p className="mt-2 text-sm">Away</p>
      </div>
      <div className="text-center">
        <StatusDot status="busy" size="lg" />
        <p className="mt-2 text-sm">Busy</p>
      </div>
      <div className="text-center">
        <StatusDot status="idle" size="lg" />
        <p className="mt-2 text-sm">Idle</p>
      </div>
      <div className="text-center">
        <StatusDot status="offline" size="lg" />
        <p className="mt-2 text-sm">Offline</p>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="text-center">
        <StatusDot status="online" size="xs" />
        <p className="mt-2 text-sm">XS</p>
      </div>
      <div className="text-center">
        <StatusDot status="online" size="sm" />
        <p className="mt-2 text-sm">SM</p>
      </div>
      <div className="text-center">
        <StatusDot status="online" size="md" />
        <p className="mt-2 text-sm">MD</p>
      </div>
      <div className="text-center">
        <StatusDot status="online" size="lg" />
        <p className="mt-2 text-sm">LG</p>
      </div>
      <div className="text-center">
        <StatusDot status="online" size="xl" />
        <p className="mt-2 text-sm">XL</p>
      </div>
    </div>
  ),
};

export const WithPulse: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="text-center">
        <StatusDot status="online" size="lg" pulse={false} />
        <p className="mt-2 text-sm">Static</p>
      </div>
      <div className="text-center">
        <StatusDot status="online" size="lg" pulse={true} />
        <p className="mt-2 text-sm">Pulsing</p>
      </div>
      <div className="text-center">
        <StatusDot status="idle" size="lg" />
        <p className="mt-2 text-sm">Auto Pulse (Idle)</p>
      </div>
    </div>
  ),
};

export const WithTooltips: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <StatusDot status="online" size="lg" tooltip="User is currently online" />
      <StatusDot
        status="busy"
        size="lg"
        tooltip="User is busy - do not disturb"
      />
      <StatusDot status="away" size="lg" tooltip="User is away from keyboard" />
    </div>
  ),
};

export const PositionedOnAvatar: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="relative">
        <Avatar src="/rick.png" alt="User Avatar" size="lg" name="John Doe" />
        <StatusDot status="online" position="bottom-right" size="md" />
      </div>

      <div className="relative">
        <Avatar
          src="/rick.png"
          alt="User Avatar"
          size="lg"
          name="Sarah Adams"
        />
        <StatusDot status="away" position="top-right" size="md" />
      </div>

      <div className="relative">
        <Avatar src="/rick.png" alt="User Avatar" size="lg" name="Bob User" />
        <StatusDot status="busy" position="bottom-left" size="md" />
      </div>

      <div className="relative">
        <Avatar
          src="/rick.png"
          alt="User Avatar"
          size="lg"
          name="Offline User"
        />
        <StatusDot status="offline" position="top-left" size="md" />
      </div>
    </div>
  ),
};

export const StatusIndicatorComponent: Story = {
  render: () => (
    <div className="space-y-3">
      <StatusIndicator status="online" label="Alice Johnson" />
      <StatusIndicator status="away" label="Bob Smith" />
      <StatusIndicator status="busy" label="Carol Davis" />
      <StatusIndicator status="idle" label="David Wilson" />
      <StatusIndicator status="offline" label="Emma Brown" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "StatusIndicator combines a status dot with a text label for user lists and profiles.",
      },
    },
  },
};

export const ConnectionStatusComponent: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <ConnectionStatus connected={true} size="md" />
        <span>Connected to server</span>
      </div>

      <div className="flex items-center gap-4">
        <ConnectionStatus connected={false} size="md" />
        <span>Disconnected from server</span>
      </div>

      <div className="flex items-center gap-4">
        <ConnectionStatus connected={false} connecting={true} size="md" />
        <span>Connecting to server...</span>
      </div>

      <div className="flex items-center gap-4">
        <ConnectionStatus
          connected={true}
          size="md"
          labels={{
            connected: "API Online",
            disconnected: "API Offline",
            connecting: "Connecting to API",
          }}
        />
        <span>API connection status</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "ConnectionStatus is specialized for showing connection states with custom labels.",
      },
    },
  },
};

export const AccessibilityExample: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <StatusDot
          status="online"
          aria-label="John is currently online and available"
          size="md"
        />
        <span>John (with detailed aria-label)</span>
      </div>

      <StatusIndicator
        status="busy"
        label="Sarah Johnson"
        aria-label="Sarah Johnson is currently busy"
      />

      <div className="flex items-center gap-4">
        <ConnectionStatus
          connected={true}
          aria-label="Chat server connection is stable and active"
          size="md"
        />
        <span>Chat Server (with descriptive aria-label)</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Examples showing proper accessibility attributes for screen readers.",
      },
    },
  },
};

export const CustomStyling: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <StatusDot
        status="online"
        size="lg"
        className="border-primary border-4 shadow-lg"
      />
      <StatusDot
        status="busy"
        size="lg"
        className="ring-error border-0 ring-2 ring-offset-2"
      />
      <StatusDot
        status="away"
        size="lg"
        className="border-warning border-2 shadow-md"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Examples of custom styling with additional borders, shadows, and rings.",
      },
    },
  },
};
