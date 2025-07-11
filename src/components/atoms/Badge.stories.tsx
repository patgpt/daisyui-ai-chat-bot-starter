import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Badge,
  CategoryBadge,
  CountBadge,
  NotificationBadge,
  StatusBadge,
} from "./Badge.client";
import { Button } from "./Button.client";

const meta: Meta<typeof Badge> = {
  title: "Atoms/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Badge component for labels, notifications, and status indicators with various styles, colors, and sizes for different use cases.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "Content to display in the badge",
    },
    variant: {
      control: "select",
      options: ["solid", "outline", "ghost", "soft", "dash"],
      description: "Visual style variant",
    },
    badgeColor: {
      control: "select",
      options: [
        "neutral",
        "primary",
        "secondary",
        "accent",
        "info",
        "success",
        "warning",
        "error",
      ],
      description: "Color theme for the badge",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Size of the badge",
    },
    positioned: {
      control: "boolean",
      description: "Whether the badge should be positioned absolutely",
    },
    position: {
      control: "select",
      options: ["top-right", "top-left", "bottom-right", "bottom-left"],
      description: "Position when used as an overlay",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Badge",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="solid">Solid</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="soft">Soft</Badge>
      <Badge variant="dash">Dash</Badge>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge badgeColor="neutral">Neutral</Badge>
      <Badge badgeColor="primary">Primary</Badge>
      <Badge badgeColor="secondary">Secondary</Badge>
      <Badge badgeColor="accent">Accent</Badge>
      <Badge badgeColor="info">Info</Badge>
      <Badge badgeColor="success">Success</Badge>
      <Badge badgeColor="warning">Warning</Badge>
      <Badge badgeColor="error">Error</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Badge size="xs">XS</Badge>
      <Badge size="sm">SM</Badge>
      <Badge size="md">MD</Badge>
      <Badge size="lg">LG</Badge>
      <Badge size="xl">XL</Badge>
    </div>
  ),
};

export const OutlineVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="outline" badgeColor="primary">
        Primary
      </Badge>
      <Badge variant="outline" badgeColor="secondary">
        Secondary
      </Badge>
      <Badge variant="outline" badgeColor="accent">
        Accent
      </Badge>
      <Badge variant="outline" badgeColor="success">
        Success
      </Badge>
      <Badge variant="outline" badgeColor="warning">
        Warning
      </Badge>
      <Badge variant="outline" badgeColor="error">
        Error
      </Badge>
    </div>
  ),
};

export const PositionedBadges: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="relative">
        <Button>Messages</Button>
        <Badge badgeColor="error" positioned position="top-right" size="sm">
          3
        </Badge>
      </div>

      <div className="relative">
        <Button>Notifications</Button>
        <Badge badgeColor="warning" positioned position="top-left" size="sm">
          12
        </Badge>
      </div>

      <div className="relative">
        <Button>Profile</Button>
        <Badge
          badgeColor="success"
          positioned
          position="bottom-right"
          size="xs"
        >
          •
        </Badge>
      </div>

      <div className="relative">
        <Button>Settings</Button>
        <Badge badgeColor="info" positioned position="bottom-left" size="sm">
          !
        </Badge>
      </div>
    </div>
  ),
};

export const NotificationBadgeComponent: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="relative">
        <Button>No notifications</Button>
        <NotificationBadge count={0} />
      </div>

      <div className="relative">
        <Button>Messages</Button>
        <NotificationBadge count={3} />
      </div>

      <div className="relative">
        <Button>Alerts</Button>
        <NotificationBadge count={25} />
      </div>

      <div className="relative">
        <Button>High count</Button>
        <NotificationBadge count={150} max={99} />
      </div>

      <div className="relative">
        <Button>Show zero</Button>
        <NotificationBadge count={0} showZero={true} />
      </div>

      <div className="relative">
        <Button>Custom color</Button>
        <NotificationBadge
          count={5}
          badgeColor="success"
          position="bottom-right"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "NotificationBadge automatically handles counts, overflow, and visibility.",
      },
    },
  },
};

export const StatusBadgeComponent: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <StatusBadge status="active" />
      <StatusBadge status="inactive" />
      <StatusBadge status="pending" />
      <StatusBadge status="approved" />
      <StatusBadge status="rejected" />
      <StatusBadge status="draft" />
      <StatusBadge status="published" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "StatusBadge provides predefined status types with appropriate colors.",
      },
    },
  },
};

export const StatusBadgeWithDots: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <StatusBadge status="active" showDot />
      <StatusBadge status="pending" showDot />
      <StatusBadge status="approved" showDot />
      <StatusBadge status="rejected" showDot />
      <StatusBadge status="published" showDot />
    </div>
  ),
};

export const CategoryBadgeComponent: Story = {
  render: () => {
    const handleRemove = (category: string) => {
      alert(`Removing category: ${category}`);
    };

    return (
      <div className="flex flex-wrap items-center gap-3">
        <CategoryBadge>React</CategoryBadge>
        <CategoryBadge badgeColor="primary">TypeScript</CategoryBadge>
        <CategoryBadge badgeColor="secondary">Next.js</CategoryBadge>

        <CategoryBadge
          removable
          onRemove={() => handleRemove("JavaScript")}
          badgeColor="accent"
        >
          JavaScript
        </CategoryBadge>

        <CategoryBadge
          removable
          onRemove={() => handleRemove("CSS")}
          badgeColor="info"
        >
          CSS
        </CategoryBadge>

        <CategoryBadge icon={<span>🎨</span>} badgeColor="warning">
          Design
        </CategoryBadge>

        <CategoryBadge
          icon={<span>⚡</span>}
          removable
          onRemove={() => handleRemove("Performance")}
          badgeColor="success"
        >
          Performance
        </CategoryBadge>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "CategoryBadge supports icons and removable functionality for tagging systems.",
      },
    },
  },
};

export const CountBadgeComponent: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <CountBadge count={42} />
      <CountBadge count={1337} label="Score:" />
      <CountBadge count={95} suffix="%" />
      <CountBadge count={2024} label="Year" badgeColor="primary" />
      <CountBadge count={3} label="Items" suffix="left" badgeColor="warning" />
      <CountBadge count={100} suffix="KB" variant="outline" badgeColor="info" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "CountBadge is specialized for displaying numbers with optional labels and suffixes.",
      },
    },
  },
};

export const InContent: Story = {
  render: () => (
    <div className="max-w-md space-y-4">
      <p>
        This is a paragraph with an inline{" "}
        <Badge size="xs" badgeColor="primary">
          badge
        </Badge>{" "}
        that flows naturally with the text content.
      </p>

      <div className="flex items-center gap-2">
        <span>User Status:</span>
        <StatusBadge status="active" showDot />
      </div>

      <div className="flex flex-wrap gap-2">
        <span>Tags:</span>
        <CategoryBadge size="xs">Frontend</CategoryBadge>
        <CategoryBadge size="xs" badgeColor="secondary">
          React
        </CategoryBadge>
        <CategoryBadge size="xs" badgeColor="accent">
          TypeScript
        </CategoryBadge>
      </div>

      <div className="bg-base-200 flex items-center justify-between rounded p-3">
        <span>Total Messages</span>
        <CountBadge count={42} badgeColor="primary" />
      </div>
    </div>
  ),
};

export const EmptyStates: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="relative">
        <Button>Clean inbox</Button>
        <NotificationBadge count={0} />
      </div>

      <div className="relative">
        <Button>Force show zero</Button>
        <NotificationBadge count={0} showZero />
      </div>

      <Badge>Empty</Badge>
      <Badge badgeColor="neutral"> </Badge>
      <Badge size="xs">•</Badge>
    </div>
  ),
};

export const AccessibilityExample: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="relative">
        <Button aria-describedby="message-count">Messages</Button>
        <Badge
          id="message-count"
          badgeColor="error"
          positioned
          position="top-right"
          aria-label="3 unread messages"
        >
          3
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        <span>Account Status:</span>
        <StatusBadge
          status="active"
          showDot
          aria-label="Account is currently active"
        />
      </div>

      <CategoryBadge
        removable
        onRemove={() => {}}
        aria-label="JavaScript programming language tag, removable"
      >
        JavaScript
      </CategoryBadge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Examples showing proper accessibility attributes and ARIA labels.",
      },
    },
  },
};
