import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { Link } from "./Link.client";

const meta = {
  title: "Atoms/Link",
  component: Link,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile link component built with DaisyUI and CVA variants. Supports Next.js Link functionality with motion animations.",
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
        "neutral",
        "hover",
        "success",
        "warning",
        "error",
        "info",
      ],
      description: "Link variant style",
    },
    href: {
      control: "text",
      description: "Link destination",
    },
    external: {
      control: "boolean",
      description: "Open link in new tab",
    },
    disabled: {
      control: "boolean",
      description: "Disable the link",
    },
    onClick: {
      action: "clicked",
      description: "Click handler",
    },
  },
  args: {
    onClick: action("link-clicked"),
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    href: "#",
    children: "Default Link",
  },
};

// Variants
export const Primary: Story = {
  args: {
    variant: "primary",
    href: "#",
    children: "Primary Link",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    href: "#",
    children: "Secondary Link",
  },
};

export const Accent: Story = {
  args: {
    variant: "accent",
    href: "#",
    children: "Accent Link",
  },
};

export const Neutral: Story = {
  args: {
    variant: "neutral",
    href: "#",
    children: "Neutral Link",
  },
};

export const Hover: Story = {
  args: {
    variant: "hover",
    href: "#",
    children: "Hover Link",
  },
};

// Semantic variants
export const Success: Story = {
  args: {
    variant: "success",
    href: "#",
    children: "Success Link",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    href: "#",
    children: "Warning Link",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    href: "#",
    children: "Error Link",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    href: "#",
    children: "Info Link",
  },
};

// States
export const ExternalLink: Story = {
  args: {
    href: "https://example.com",
    external: true,
    children: "External Link (opens in new tab)",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    href: "#",
    children: "Disabled Link",
  },
};

// Navigation examples
export const InternalNavigation: Story = {
  args: {
    href: "/about",
    children: "Go to About Page",
  },
  parameters: {
    docs: {
      description: {
        story: "Internal navigation using Next.js Link component.",
      },
    },
  },
};

export const ExternalNavigation: Story = {
  args: {
    href: "https://github.com",
    external: true,
    children: "Visit GitHub",
  },
  parameters: {
    docs: {
      description: {
        story: "External navigation that opens in a new tab.",
      },
    },
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Link href="#" variant="default">
        Default Link
      </Link>
      <Link href="#" variant="primary">
        Primary Link
      </Link>
      <Link href="#" variant="secondary">
        Secondary Link
      </Link>
      <Link href="#" variant="accent">
        Accent Link
      </Link>
      <Link href="#" variant="neutral">
        Neutral Link
      </Link>
      <Link href="#" variant="hover">
        Hover Link
      </Link>
      <Link href="#" variant="success">
        Success Link
      </Link>
      <Link href="#" variant="warning">
        Warning Link
      </Link>
      <Link href="#" variant="error">
        Error Link
      </Link>
      <Link href="#" variant="info">
        Info Link
      </Link>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "All available link variants displayed together.",
      },
    },
  },
};

// Navigation menu example
export const NavigationMenu: Story = {
  render: () => (
    <nav className="flex flex-col gap-2">
      <Link href="/" variant="primary">
        Home
      </Link>
      <Link href="/about" variant="default">
        About
      </Link>
      <Link href="/services" variant="default">
        Services
      </Link>
      <Link href="/contact" variant="accent">
        Contact
      </Link>
      <Link href="https://github.com" external variant="neutral">
        GitHub
      </Link>
    </nav>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "Example of links used in a navigation menu.",
      },
    },
  },
};

// Breadcrumb example
export const Breadcrumb: Story = {
  render: () => (
    <div className="breadcrumbs text-sm">
      <ul>
        <li>
          <Link href="/" variant="neutral">
            Home
          </Link>
        </li>
        <li>
          <Link href="/products" variant="neutral">
            Products
          </Link>
        </li>
        <li>
          <Link href="/products/shoes" variant="neutral">
            Shoes
          </Link>
        </li>
        <li>
          <span>Running Shoes</span>
        </li>
      </ul>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "Example of links used in a breadcrumb navigation.",
      },
    },
  },
};

// Interactive example with motion
export const WithMotion: Story = {
  args: {
    variant: "primary",
    href: "#",
    children: "Hover me for animation!",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Link with motion animations on hover. The component uses motion.create() for smooth animations.",
      },
    },
  },
};
