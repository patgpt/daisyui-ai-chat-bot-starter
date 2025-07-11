import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  FiCopy,
  FiDownload,
  FiEdit3,
  FiRefreshCw,
  FiSettings,
  FiShare2,
  FiThumbsDown,
  FiThumbsUp,
  FiTrash2,
} from "react-icons/fi";
import { IconButton } from "./IconButton.client";

const meta: Meta<typeof IconButton> = {
  title: "Atoms/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "IconButton component for icon-only actions like copy, retry, settings, and other action buttons throughout the chat interface.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "primary",
        "secondary",
        "accent",
        "ghost",
        "outline",
        "success",
        "warning",
        "error",
      ],
      description: "Visual style variant",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Size of the button",
    },
    loading: {
      control: "boolean",
      description: "Loading state",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: FiCopy,
    "aria-label": "Copy message",
    tooltip: "Copy to clipboard",
  },
};

export const Primary: Story = {
  args: {
    icon: FiSettings,
    "aria-label": "Open settings",
    tooltip: "Settings",
    variant: "primary",
  },
};

export const Ghost: Story = {
  args: {
    icon: FiRefreshCw,
    "aria-label": "Retry message",
    tooltip: "Retry generating response",
    variant: "ghost",
  },
};

export const Loading: Story = {
  args: {
    icon: FiRefreshCw,
    "aria-label": "Retrying message",
    tooltip: "Generating response...",
    loading: true,
    variant: "outline",
  },
};

export const Disabled: Story = {
  args: {
    icon: FiDownload,
    "aria-label": "Download disabled",
    tooltip: "Download not available",
    disabled: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconButton icon={FiCopy} aria-label="Extra small" size="xs" />
      <IconButton icon={FiCopy} aria-label="Small" size="sm" />
      <IconButton icon={FiCopy} aria-label="Medium" size="md" />
      <IconButton icon={FiCopy} aria-label="Large" size="lg" />
      <IconButton icon={FiCopy} aria-label="Extra large" size="xl" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <IconButton icon={FiCopy} aria-label="Default" variant="default" />
      <IconButton icon={FiSettings} aria-label="Primary" variant="primary" />
      <IconButton icon={FiEdit3} aria-label="Secondary" variant="secondary" />
      <IconButton icon={FiShare2} aria-label="Accent" variant="accent" />
      <IconButton icon={FiRefreshCw} aria-label="Ghost" variant="ghost" />
      <IconButton icon={FiDownload} aria-label="Outline" variant="outline" />
      <IconButton icon={FiThumbsUp} aria-label="Success" variant="success" />
      <IconButton icon={FiEdit3} aria-label="Warning" variant="warning" />
      <IconButton icon={FiTrash2} aria-label="Error" variant="error" />
    </div>
  ),
};

export const ChatActions: Story = {
  render: () => (
    <div className="bg-base-100 flex items-center gap-2 rounded-lg p-4">
      <IconButton
        icon={FiCopy}
        aria-label="Copy message"
        tooltip="Copy to clipboard"
        variant="ghost"
        size="sm"
      />
      <IconButton
        icon={FiRefreshCw}
        aria-label="Retry message"
        tooltip="Retry generating response"
        variant="ghost"
        size="sm"
      />
      <IconButton
        icon={FiThumbsUp}
        aria-label="Like message"
        tooltip="Good response"
        variant="ghost"
        size="sm"
      />
      <IconButton
        icon={FiThumbsDown}
        aria-label="Dislike message"
        tooltip="Poor response"
        variant="ghost"
        size="sm"
      />
      <IconButton
        icon={FiShare2}
        aria-label="Share message"
        tooltip="Share this conversation"
        variant="ghost"
        size="sm"
      />
    </div>
  ),
};

export const WithoutIcon: Story = {
  args: {
    "aria-label": "Custom button",
    tooltip: "Custom content",
    children: "→",
    variant: "primary",
  },
};
