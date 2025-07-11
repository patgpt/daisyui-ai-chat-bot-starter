import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Avatar } from "./Avatar.client";

const meta: Meta<typeof Avatar> = {
  title: "Atoms/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Avatar component for displaying user or bot profile images with support for sizes, status indicators, and fallback initials.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Size of the avatar",
    },
    status: {
      control: "select",
      options: ["online", "offline", "none"],
      description: "Status indicator",
    },
    src: {
      control: "text",
      description: "Image source URL",
    },
    name: {
      control: "text",
      description: "Name for fallback initials",
    },
    alt: {
      control: "text",
      description: "Alt text for accessibility",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "John Doe",
    size: "md",
    status: "none",
  },
};

export const WithImage: Story = {
  args: {
    src: "https://picsum.photos/100/100?random=1",
    alt: "User avatar",
    name: "Jane Smith",
    size: "md",
    status: "online",
  },
};

export const OnlineStatus: Story = {
  args: {
    name: "Alice Johnson",
    size: "lg",
    status: "online",
  },
};

export const OfflineStatus: Story = {
  args: {
    name: "Bob Wilson",
    size: "lg",
    status: "offline",
  },
};

export const BotAvatar: Story = {
  args: {
    name: "AI Assistant",
    size: "md",
    userId: "bot",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar name="XS" size="xs" />
      <Avatar name="SM" size="sm" />
      <Avatar name="MD" size="md" />
      <Avatar name="LG" size="lg" />
      <Avatar name="XL" size="xl" />
    </div>
  ),
};

export const StatusIndicators: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="text-center">
        <Avatar name="Online" size="lg" status="online" />
        <p className="mt-2 text-sm">Online</p>
      </div>
      <div className="text-center">
        <Avatar name="Offline" size="lg" status="offline" />
        <p className="mt-2 text-sm">Offline</p>
      </div>
      <div className="text-center">
        <Avatar name="None" size="lg" status="none" />
        <p className="mt-2 text-sm">No Status</p>
      </div>
    </div>
  ),
};

export const FallbackInitials: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar name="John Doe" size="md" />
      <Avatar name="Jane Smith" size="md" />
      <Avatar name="AI Assistant" size="md" />
      <Avatar name="Single" size="md" />
      <Avatar name="Multiple Word Name" size="md" />
    </div>
  ),
};

export const ImageError: Story = {
  args: {
    src: "https://invalid-url.jpg",
    name: "Fallback User",
    alt: "User with broken image",
    size: "lg",
  },
};
