import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { Button } from "./Button.client";

const meta = {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile button component built with DaisyUI and CVA variants. Supports motion animations and accessibility features.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "accent",
        "ghost",
        "link",
        "neutral",
        "info",
        "success",
        "warning",
        "error",
      ],
      description: "Button variant style",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
      description: "Button size",
    },
    disabled: {
      control: "boolean",
      description: "Disable the button",
    },
    loading: {
      control: "boolean",
      description: "Show loading state",
    },
    wide: {
      control: "boolean",
      description: "Make button full width",
    },
    onClick: {
      action: "clicked",
      description: "Click handler",
    },
  },
  args: {
    onClick: action("button-clicked"),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: "Button",
  },
};

// Variants
export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};

export const Accent: Story = {
  args: {
    variant: "accent",
    children: "Accent Button",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost Button",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    children: "Link Button",
  },
};

// Sizes
export const ExtraSmall: Story = {
  args: {
    size: "xs",
    children: "Extra Small",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: "Small",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    children: "Medium",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "Large",
  },
};

// States
export const Loading: Story = {
  args: {
    loading: true,
    children: "Loading...",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled",
  },
};

export const Wide: Story = {
  args: {
    wide: true,
    children: "Wide Button",
  },
  parameters: {
    layout: "padded",
  },
};

// Semantic variants
export const Success: Story = {
  args: {
    variant: "success",
    children: "Success",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Warning",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    children: "Error",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    children: "Info",
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="accent">Accent</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="neutral">Neutral</Button>
      <Button variant="info">Info</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="error">Error</Button>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "All available button variants displayed together.",
      },
    },
  },
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "All available button sizes displayed together.",
      },
    },
  },
};

// Interactive example with motion
export const WithMotion: Story = {
  args: {
    variant: "primary",
    children: "Hover me!",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Button with motion animations on hover and tap. The component uses motion.create() for smooth animations.",
      },
    },
  },
};
