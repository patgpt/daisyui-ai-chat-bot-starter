import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ChatHeading, MessageText, MetaText, Text } from "./Text";

const meta: Meta<typeof Text> = {
  title: "Atoms/Text",
  component: Text,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Text component for consistent typography throughout the application with Tailwind Typography support for chat messages and content.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "body",
        "body-sm",
        "body-lg",
        "caption",
        "label",
        "code",
        "message-content",
        "message-meta",
        "chat-title",
        "system-message",
      ],
      description: "Text variant style",
    },
    weight: {
      control: "select",
      options: ["light", "normal", "medium", "semibold", "bold"],
      description: "Font weight",
    },
    textColor: {
      control: "select",
      options: [
        "default",
        "muted",
        "subtle",
        "primary",
        "secondary",
        "accent",
        "success",
        "warning",
        "error",
        "info",
      ],
      description: "Text color theme",
    },
    align: {
      control: "select",
      options: ["left", "center", "right", "justify"],
      description: "Text alignment",
    },
    prose: {
      control: "boolean",
      description: "Enable Tailwind Typography prose styles",
    },
    as: {
      control: "text",
      description: "Override HTML element",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children:
      "This is the default body text with comfortable line spacing and readable typography.",
  },
};

export const Headings: Story = {
  render: () => (
    <div className="max-w-2xl space-y-4">
      <Text variant="h1">Heading 1 - Main Title</Text>
      <Text variant="h2">Heading 2 - Section Title</Text>
      <Text variant="h3">Heading 3 - Subsection</Text>
      <Text variant="h4">Heading 4 - Component Title</Text>
      <Text variant="h5">Heading 5 - Small Header</Text>
      <Text variant="h6">Heading 6 - Smallest Header</Text>
    </div>
  ),
};

export const BodyText: Story = {
  render: () => (
    <div className="max-w-2xl space-y-4">
      <Text variant="body-lg">
        Large body text for emphasis or introductory paragraphs with excellent
        readability.
      </Text>
      <Text variant="body">
        Regular body text that provides the main content with comfortable line
        spacing and optimal reading experience.
      </Text>
      <Text variant="body-sm">
        Small body text for secondary content, captions, or supplementary
        information that doesn&apos;t overwhelm.
      </Text>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="max-w-md space-y-2">
      <Text textColor="default">Default text color</Text>
      <Text textColor="muted">Muted text color (70% opacity)</Text>
      <Text textColor="subtle">Subtle text color (60% opacity)</Text>
      <Text textColor="primary">Primary theme color</Text>
      <Text textColor="secondary">Secondary theme color</Text>
      <Text textColor="accent">Accent theme color</Text>
      <Text textColor="success">Success state color</Text>
      <Text textColor="warning">Warning state color</Text>
      <Text textColor="error">Error state color</Text>
      <Text textColor="info">Info state color</Text>
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div className="max-w-md space-y-2">
      <Text weight="light">Light weight text</Text>
      <Text weight="normal">Normal weight text</Text>
      <Text weight="medium">Medium weight text</Text>
      <Text weight="semibold">Semibold weight text</Text>
      <Text weight="bold">Bold weight text</Text>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div className="border-base-300 w-full max-w-md space-y-4 rounded border p-4">
      <Text align="left">Left aligned text content</Text>
      <Text align="center">Center aligned text content</Text>
      <Text align="right">Right aligned text content</Text>
      <Text align="justify">
        Justified text content that spreads across the full width of the
        container with even spacing between words.
      </Text>
    </div>
  ),
};

export const SpecialText: Story = {
  render: () => (
    <div className="max-w-2xl space-y-4">
      <Text variant="caption">
        Caption text for image descriptions or footnotes
      </Text>
      <Text variant="label">Label text for form fields and UI elements</Text>
      <Text variant="code">inline code text</Text>
      <Text variant="system-message">System message for notifications</Text>
    </div>
  ),
};

export const ChatSpecific: Story = {
  render: () => (
    <div className="max-w-2xl space-y-6">
      <div className="border-base-300 rounded-lg border p-4">
        <ChatHeading level={2}>Chat Conversation</ChatHeading>
        <div className="mt-4 space-y-3">
          <div className="bg-base-100 rounded p-3">
            <Text variant="message-content">
              This is a **chat message** with some `inline code` and normal text
              formatting.
            </Text>
            <MetaText>2 minutes ago</MetaText>
          </div>
          <div className="bg-primary/10 rounded p-3">
            <Text variant="message-content">
              AI response with **emphasis** and a code block would appear here.
            </Text>
            <MetaText>Just now</MetaText>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const WithProse: Story = {
  args: {
    prose: true,
    children:
      "This text has **Tailwind Typography** applied with proper prose styling for markdown content.",
  },
};

export const MessageContent: Story = {
  render: () => (
    <div className="max-w-2xl space-y-4">
      <MessageText content="This is a **message** with `code` and normal text." />
      <MessageText content="Another message with different formatting and **bold text**." />
    </div>
  ),
};

export const CustomElement: Story = {
  render: () => (
    <div className="space-y-2">
      <Text as="span" variant="label" textColor="primary">
        Span element with label styling
      </Text>
      <br />
      <Text as="div" variant="body" weight="semibold">
        Div element with body styling
      </Text>
    </div>
  ),
};

export const ResponsiveText: Story = {
  render: () => (
    <div className="max-w-4xl space-y-4">
      <Text variant="h1">
        Responsive heading that scales from 4xl to 5xl on larger screens
      </Text>
      <Text variant="body">
        Body text maintains consistent readability across all screen sizes with
        optimized line spacing.
      </Text>
    </div>
  ),
};
