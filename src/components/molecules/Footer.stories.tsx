import type { Meta, StoryObj } from "@storybook/nextjs";
import { Footer } from "./Footer.client";

const meta = {
  title: "Molecules/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A footer molecule component built with DaisyUI styling. Displays copyright information with customizable author details.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    copyright: {
      control: "text",
      description: "Copyright text",
    },
    author: {
      control: "text",
      description: "Author name",
    },
    authorLink: {
      control: "text",
      description: "Author link URL",
    },
    year: {
      control: "number",
      description: "Copyright year",
    },
    country: {
      control: "text",
      description: "Country/location",
    },
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    copyright: "Created with ❤️ by",
    author: "AGIManifesto",
    authorLink: "https://github.com/patgpt",
    year: 2025,
    country: "🇨🇦",
  },
};

// Minimal footer
export const Minimal: Story = {
  args: {
    copyright: "©",
    author: "Your Company",
    year: 2025,
  },
};

// With different author
export const DifferentAuthor: Story = {
  args: {
    copyright: "Built by",
    author: "Jane Developer",
    authorLink: "https://janedeveloper.com",
    year: 2025,
    country: "🇺🇸",
  },
};

// Corporate style
export const Corporate: Story = {
  args: {
    copyright: "© Copyright",
    author: "Acme Corporation",
    authorLink: "https://acmecorp.com",
    year: 2025,
    country: "USA",
  },
};

// Personal portfolio style
export const PersonalPortfolio: Story = {
  args: {
    copyright: "Designed & Built by",
    author: "John Smith",
    authorLink: "https://johnsmith.dev",
    year: 2025,
    country: "🌍",
  },
};

// Without author link
export const WithoutAuthorLink: Story = {
  args: {
    copyright: "Created by",
    author: "Anonymous Developer",
    year: 2025,
    country: "🌐",
  },
};

// Different years
export const DifferentYear: Story = {
  args: {
    copyright: "Created with ❤️ by",
    author: "AGIManifesto",
    authorLink: "https://github.com/patgpt",
    year: 2024,
    country: "🇨🇦",
  },
};

// Long author name
export const LongAuthorName: Story = {
  args: {
    copyright: "Created with ❤️ by",
    author: "Very Long Company Name Inc.",
    authorLink: "https://verylongcompanyname.com",
    year: 2025,
    country: "🇬🇧",
  },
};

// Different countries
export const DifferentCountries: Story = {
  render: () => (
    <div className="space-y-4">
      <Footer
        copyright="Created with ❤️ by"
        author="Developer"
        authorLink="#"
        year={2025}
        country="🇺🇸"
      />
      <Footer
        copyright="Created with ❤️ by"
        author="Developer"
        authorLink="#"
        year={2025}
        country="🇬🇧"
      />
      <Footer
        copyright="Created with ❤️ by"
        author="Developer"
        authorLink="#"
        year={2025}
        country="🇫🇷"
      />
      <Footer
        copyright="Created with ❤️ by"
        author="Developer"
        authorLink="#"
        year={2025}
        country="🇩🇪"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Footer components with different country flags.",
      },
    },
  },
};

// Page layout example
export const InPageLayout: Story = {
  render: () => (
    <div className="flex min-h-screen flex-col">
      <div className="bg-base-200 flex flex-1 items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">Your Amazing App</h1>
          <p className="text-lg">This is where your main content goes</p>
        </div>
      </div>
      <Footer
        copyright="Created with ❤️ by"
        author="AGIManifesto"
        authorLink="https://github.com/patgpt"
        year={2025}
        country="🇨🇦"
      />
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: "Footer component used in a typical page layout at the bottom.",
      },
    },
  },
};
