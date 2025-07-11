import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { Input } from "./Input.client";

const meta = {
  title: "Atoms/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible input component built with DaisyUI and CVA variants. Supports various input types, states, and motion animations.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "bordered",
        "ghost",
        "primary",
        "secondary",
        "accent",
        "info",
        "success",
        "warning",
        "error",
      ],
      description: "Input variant style",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
      description: "Input size",
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url", "search"],
      description: "Input type",
    },
    disabled: {
      control: "boolean",
      description: "Disable the input",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    value: {
      control: "text",
      description: "Input value",
    },
    onChange: {
      action: "changed",
      description: "Change handler",
    },
    onFocus: {
      action: "focused",
      description: "Focus handler",
    },
    onBlur: {
      action: "blurred",
      description: "Blur handler",
    },
  },
  args: {
    onChange: action("input-changed"),
    onFocus: action("input-focused"),
    onBlur: action("input-blurred"),
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

// Variants
export const Bordered: Story = {
  args: {
    variant: "bordered",
    placeholder: "Bordered input",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    placeholder: "Ghost input",
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
    placeholder: "Primary input",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    placeholder: "Secondary input",
  },
};

export const Accent: Story = {
  args: {
    variant: "accent",
    placeholder: "Accent input",
  },
};

// Sizes
export const ExtraSmall: Story = {
  args: {
    size: "xs",
    placeholder: "Extra small input",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    placeholder: "Small input",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    placeholder: "Medium input",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    placeholder: "Large input",
  },
};

// States
export const WithValue: Story = {
  args: {
    value: "This input has a value",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled input",
  },
};

// Semantic variants
export const Success: Story = {
  args: {
    variant: "success",
    placeholder: "Success state",
    value: "Valid input",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    placeholder: "Warning state",
    value: "Warning input",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    placeholder: "Error state",
    value: "Invalid input",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    placeholder: "Info state",
    value: "Info input",
  },
};

// Input types
export const Email: Story = {
  args: {
    type: "email",
    placeholder: "Enter your email",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter your password",
  },
};

export const Number: Story = {
  args: {
    type: "number",
    placeholder: "Enter a number",
  },
};

export const Search: Story = {
  args: {
    type: "search",
    placeholder: "Search...",
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <Input variant="bordered" placeholder="Bordered" />
      <Input variant="ghost" placeholder="Ghost" />
      <Input variant="primary" placeholder="Primary" />
      <Input variant="secondary" placeholder="Secondary" />
      <Input variant="accent" placeholder="Accent" />
      <Input variant="info" placeholder="Info" />
      <Input variant="success" placeholder="Success" />
      <Input variant="warning" placeholder="Warning" />
      <Input variant="error" placeholder="Error" />
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "All available input variants displayed together.",
      },
    },
  },
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <Input size="xs" placeholder="Extra Small" />
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "All available input sizes displayed together.",
      },
    },
  },
};

// Form example
export const FormExample: Story = {
  render: () => (
    <form className="flex w-80 flex-col gap-4">
      <div>
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <Input placeholder="Enter your name" />
      </div>
      <div>
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <Input type="email" placeholder="Enter your email" />
      </div>
      <div>
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <Input type="password" placeholder="Enter your password" />
      </div>
    </form>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "Example of inputs used in a form with labels.",
      },
    },
  },
};
