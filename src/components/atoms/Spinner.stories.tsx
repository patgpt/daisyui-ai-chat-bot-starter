import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LoadingMessage, Spinner, TypingIndicator } from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "Atoms/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Spinner component for loading animations, typing indicators, and other loading states throughout the chat interface.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["spinner", "dots", "ring", "ball", "bars", "infinity"],
      description: "Animation style",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Size of the spinner",
    },
    color: {
      control: "select",
      options: [
        "default",
        "primary",
        "secondary",
        "accent",
        "neutral",
        "info",
        "success",
        "warning",
        "error",
      ],
      description: "Color theme",
    },
    label: {
      control: "text",
      description: "Optional text label",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithLabel: Story = {
  args: {
    label: "Loading...",
    variant: "spinner",
    size: "md",
  },
};

export const Primary: Story = {
  args: {
    variant: "ring",
    color: "primary",
    size: "lg",
  },
};

export const Dots: Story = {
  args: {
    variant: "dots",
    color: "accent",
    size: "md",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-3 items-center gap-6">
      <div className="text-center">
        <Spinner variant="spinner" size="lg" />
        <p className="mt-2 text-xs">Spinner</p>
      </div>
      <div className="text-center">
        <Spinner variant="dots" size="lg" />
        <p className="mt-2 text-xs">Dots</p>
      </div>
      <div className="text-center">
        <Spinner variant="ring" size="lg" />
        <p className="mt-2 text-xs">Ring</p>
      </div>
      <div className="text-center">
        <Spinner variant="ball" size="lg" />
        <p className="mt-2 text-xs">Ball</p>
      </div>
      <div className="text-center">
        <Spinner variant="bars" size="lg" />
        <p className="mt-2 text-xs">Bars</p>
      </div>
      <div className="text-center">
        <Spinner variant="infinity" size="lg" />
        <p className="mt-2 text-xs">Infinity</p>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="text-center">
        <Spinner variant="spinner" size="xs" />
        <p className="mt-2 text-xs">XS</p>
      </div>
      <div className="text-center">
        <Spinner variant="spinner" size="sm" />
        <p className="mt-2 text-xs">SM</p>
      </div>
      <div className="text-center">
        <Spinner variant="spinner" size="md" />
        <p className="mt-2 text-xs">MD</p>
      </div>
      <div className="text-center">
        <Spinner variant="spinner" size="lg" />
        <p className="mt-2 text-xs">LG</p>
      </div>
      <div className="text-center">
        <Spinner variant="spinner" size="xl" />
        <p className="mt-2 text-xs">XL</p>
      </div>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <Spinner variant="ring" color="primary" />
      <Spinner variant="ring" color="secondary" />
      <Spinner variant="ring" color="accent" />
      <Spinner variant="ring" color="info" />
      <Spinner variant="ring" color="success" />
      <Spinner variant="ring" color="warning" />
      <Spinner variant="ring" color="error" />
      <Spinner variant="ring" color="neutral" />
      <Spinner variant="ring" color="default" />
    </div>
  ),
};

// TypingIndicator Stories
export const TypingIndicatorDefault: Story = {
  render: () => <TypingIndicator />,
  parameters: {
    docs: {
      description: {
        story: "Default typing indicator for AI responses.",
      },
    },
  },
};

export const TypingIndicatorCustom: Story = {
  render: () => <TypingIndicator userName="Claude" size="md" color="primary" />,
  parameters: {
    docs: {
      description: {
        story: "Typing indicator with custom user name and styling.",
      },
    },
  },
};

// LoadingMessage Stories
export const LoadingMessageDefault: Story = {
  render: () => (
    <LoadingMessage message="Analyzing your request and generating a thoughtful response..." />
  ),
  parameters: {
    docs: {
      description: {
        story: "Loading message for longer operations.",
      },
    },
  },
};

export const LoadingMessageCustom: Story = {
  render: () => (
    <LoadingMessage
      message="Processing image..."
      variant="bars"
      color="accent"
      size="lg"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Loading message with custom styling.",
      },
    },
  },
};

// Chat Interface Examples
export const ChatExamples: Story = {
  render: () => (
    <div className="bg-base-200 max-w-md space-y-6 rounded-lg p-4">
      <div className="bg-base-100 rounded-lg p-3">
        <TypingIndicator userName="AI Assistant" />
      </div>

      <div className="bg-base-100 rounded-lg p-3">
        <div className="flex items-center gap-2">
          <Spinner variant="dots" size="xs" color="primary" />
          <span className="text-sm">Thinking...</span>
        </div>
      </div>

      <div className="bg-base-100 rounded-lg p-3">
        <LoadingMessage
          message="Generating code example..."
          variant="ring"
          size="sm"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Examples of how spinners would appear in a chat interface.",
      },
    },
  },
};
