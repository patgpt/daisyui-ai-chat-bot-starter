import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { Navbar } from "./Navbar.client";

const meta = {
  title: "Organisms/Navbar",
  component: Navbar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A responsive navigation bar organism built with DaisyUI and motion animations. Features mobile drawer, brand logo, and navigation links.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    brand: {
      control: "text",
      description: "Brand name or logo text",
    },
    brandHref: {
      control: "text",
      description: "Brand link destination",
    },
    onMenuToggle: {
      action: "menu-toggled",
      description: "Mobile menu toggle handler",
    },
  },
  args: {
    onMenuToggle: action("menu-toggled"),
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    brand: "AI Chat Starter",
    brandHref: "/",
  },
};

// Different brand name
export const DifferentBrand: Story = {
  args: {
    brand: "Your App Name",
    brandHref: "/",
  },
};

// Long brand name
export const LongBrandName: Story = {
  args: {
    brand: "Very Long Application Name",
    brandHref: "/",
  },
};

// With emoji in brand
export const BrandWithEmoji: Story = {
  args: {
    brand: "🚀 Space App",
    brandHref: "/",
  },
};

// Corporate style
export const Corporate: Story = {
  args: {
    brand: "Acme Corporation",
    brandHref: "https://acmecorp.com",
  },
};

// Personal portfolio style
export const PersonalPortfolio: Story = {
  args: {
    brand: "John Smith",
    brandHref: "/portfolio",
  },
};

// Mobile view simulation
export const MobileView: Story = {
  args: {
    brand: "AI Chat Starter",
    brandHref: "/",
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile",
    },
    docs: {
      description: {
        story:
          "Navbar component displayed on mobile viewport. The hamburger menu should be visible.",
      },
    },
  },
};

// Tablet view simulation
export const TabletView: Story = {
  args: {
    brand: "AI Chat Starter",
    brandHref: "/",
  },
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
    docs: {
      description: {
        story: "Navbar component displayed on tablet viewport.",
      },
    },
  },
};

// Desktop view simulation
export const DesktopView: Story = {
  args: {
    brand: "AI Chat Starter",
    brandHref: "/",
  },
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
    docs: {
      description: {
        story:
          "Navbar component displayed on desktop viewport with full navigation links.",
      },
    },
  },
};

// In page layout example
export const InPageLayout: Story = {
  render: () => (
    <div className="min-h-screen">
      <Navbar brand="AI Chat Starter" brandHref="/" />
      <div className="bg-base-200 flex h-96 items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">Welcome to Your App</h1>
          <p className="text-lg">This is your main content area</p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: "Navbar component used in a typical page layout at the top.",
      },
    },
  },
};

// With different themes
export const DarkTheme: Story = {
  args: {
    brand: "AI Chat Starter",
    brandHref: "/",
  },
  parameters: {
    backgrounds: {
      default: "dark",
    },
    docs: {
      description: {
        story: "Navbar component with dark theme background.",
      },
    },
  },
};

// Interactive example
export const Interactive: Story = {
  args: {
    brand: "Interactive Demo",
    brandHref: "/",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive navbar with motion animations. Try hovering over the brand and clicking the mobile menu button.",
      },
    },
  },
};

// All viewport sizes showcase
export const AllViewports: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-2 text-lg font-semibold">Desktop View</h3>
        <div className="border-base-300 overflow-hidden rounded-lg border">
          <Navbar brand="Desktop Navbar" brandHref="/" />
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-lg font-semibold">Mobile View</h3>
        <div className="border-base-300 max-w-sm overflow-hidden rounded-lg border">
          <Navbar brand="Mobile Navbar" brandHref="/" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "Navbar component displayed at different viewport sizes.",
      },
    },
  },
};

// Animation showcase
export const AnimationShowcase: Story = {
  args: {
    brand: "✨ Animated Navbar",
    brandHref: "/",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Navbar with motion animations. The component uses staggered animations for navigation links and smooth transitions.",
      },
    },
  },
};
