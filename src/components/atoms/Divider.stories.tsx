import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  ChatDivider,
  ContentSeparator,
  Divider,
  SectionDivider,
} from "./Divider";

const meta: Meta<typeof Divider> = {
  title: "Atoms/Divider",
  component: Divider,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Divider component for visual content separation with horizontal and vertical orientations, optional text content, and theme color support.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "Optional text content to display in the divider",
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Orientation of the divider",
    },
    dividerColor: {
      control: "select",
      options: [
        "neutral",
        "primary",
        "secondary",
        "accent",
        "success",
        "warning",
        "info",
        "error",
      ],
      description: "Color theme for the divider",
    },
    placement: {
      control: "select",
      options: ["start", "center", "end"],
      description: "Text placement within the divider",
    },
    spacing: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl"],
      description: "Vertical spacing around the divider",
    },
    "aria-label": {
      control: "text",
      description: "Accessibility label for screen readers",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <div className="w-96">
      <p>Content above the divider</p>
      <Divider {...args} />
      <p>Content below the divider</p>
    </div>
  ),
};

export const WithText: Story = {
  args: {
    children: "OR",
  },
  render: (args) => (
    <div className="w-96">
      <p>Sign in with email</p>
      <Divider {...args} />
      <p>Sign in with social media</p>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      <div>
        <p>Default divider</p>
        <Divider />
        <p>Content after</p>
      </div>

      <div>
        <p>Primary divider</p>
        <Divider dividerColor="primary">Primary</Divider>
        <p>Content after</p>
      </div>

      <div>
        <p>Accent divider</p>
        <Divider dividerColor="accent">Accent</Divider>
        <p>Content after</p>
      </div>

      <div>
        <p>Success divider</p>
        <Divider dividerColor="success">Success</Divider>
        <p>Content after</p>
      </div>

      <div>
        <p>Warning divider</p>
        <Divider dividerColor="warning">Warning</Divider>
        <p>Content after</p>
      </div>
    </div>
  ),
};

export const TextPlacement: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <div>
        <p>Start placement</p>
        <Divider placement="start">Start Text</Divider>
        <p>Content after</p>
      </div>

      <div>
        <p>Center placement</p>
        <Divider placement="center">Center Text</Divider>
        <p>Content after</p>
      </div>

      <div>
        <p>End placement</p>
        <Divider placement="end">End Text</Divider>
        <p>Content after</p>
      </div>
    </div>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div className="bg-base-200 w-96 rounded p-4">
      <p>No spacing</p>
      <Divider spacing="none">None</Divider>
      <p>Small spacing</p>
      <Divider spacing="sm">Small</Divider>
      <p>Medium spacing (default)</p>
      <Divider spacing="md">Medium</Divider>
      <p>Large spacing</p>
      <Divider spacing="lg">Large</Divider>
      <p>Extra large spacing</p>
      <Divider spacing="xl">XL</Divider>
      <p>Content after</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-32 items-center gap-4">
      <div className="bg-base-200 flex h-full flex-1 items-center justify-center rounded">
        <span>Left Content</span>
      </div>
      <Divider orientation="vertical" />
      <div className="bg-base-200 flex h-full flex-1 items-center justify-center rounded">
        <span>Right Content</span>
      </div>
    </div>
  ),
};

export const VerticalWithText: Story = {
  render: () => (
    <div className="flex h-40 items-center gap-4">
      <div className="bg-base-200 flex h-full flex-1 items-center justify-center rounded">
        <span>Navigation</span>
      </div>
      <Divider orientation="vertical" dividerColor="primary">
        OR
      </Divider>
      <div className="bg-base-200 flex h-full flex-1 items-center justify-center rounded">
        <span>Main Content</span>
      </div>
    </div>
  ),
};

export const SectionDividerComponent: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-6">
      <div>
        <p>Regular section content here...</p>
        <SectionDivider title="User Settings" />
        <p>Settings content would go here...</p>
      </div>

      <div>
        <p>More content...</p>
        <SectionDivider title="Account Information" major={true} />
        <p>Account details would go here...</p>
      </div>

      <div>
        <p>Additional content...</p>
        <SectionDivider title="Privacy Options" />
        <p>Privacy settings would go here...</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "SectionDivider is specialized for organizing content into clear sections with titles.",
      },
    },
  },
};

export const ContentSeparatorComponent: Story = {
  render: () => (
    <div className="w-96 space-y-2">
      <div className="bg-base-200 rounded p-4">
        <h3 className="font-semibold">First Item</h3>
        <p>Some content here...</p>
      </div>

      <ContentSeparator />

      <div className="bg-base-200 rounded p-4">
        <h3 className="font-semibold">Second Item</h3>
        <p>More content here...</p>
      </div>

      <ContentSeparator />

      <div className="bg-base-200 rounded p-4">
        <h3 className="font-semibold">Third Item</h3>
        <p>Final content here...</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "ContentSeparator provides subtle separation between content blocks.",
      },
    },
  },
};

export const ChatDividerComponent: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      <div className="bg-base-200 rounded p-3">
        <p>Yesterday&apos;s conversation...</p>
      </div>

      <ChatDivider timestamp="Today" newDay={true} />

      <div className="bg-primary/10 rounded p-3">
        <p>Good morning! How are you?</p>
      </div>

      <ChatDivider timestamp="2 hours ago" />

      <div className="bg-base-200 rounded p-3">
        <p>I&apos;m doing well, thanks for asking!</p>
      </div>

      <ChatDivider timestamp="Just now" />

      <div className="bg-primary/10 rounded p-3">
        <p>That&apos;s great to hear!</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "ChatDivider is specialized for separating chat messages with timestamps.",
      },
    },
  },
};

export const AccessibilityExample: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      <p>Content with custom accessibility labels</p>

      <Divider aria-label="End of introduction section">
        Introduction Complete
      </Divider>

      <p>Main content section</p>

      <ContentSeparator aria-label="Separator between main content and sidebar" />

      <p>Additional content</p>

      <SectionDivider
        title="Footer Information"
        aria-label="Start of footer section with contact information"
      />

      <p>Footer content here</p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Examples showing proper accessibility attributes for screen readers.",
      },
    },
  },
};

export const ResponsiveLayout: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <div className="grid h-64 grid-cols-1 gap-4 md:grid-cols-3">
        <div className="bg-base-200 rounded p-4">
          <h3 className="mb-2 font-semibold">Column 1</h3>
          <p>Content for first column</p>
        </div>

        <div className="block md:hidden">
          <Divider>Mobile Separator</Divider>
        </div>

        <div className="hidden md:flex md:items-center">
          <Divider orientation="vertical" />
        </div>

        <div className="bg-base-200 rounded p-4">
          <h3 className="mb-2 font-semibold">Column 2</h3>
          <p>Content for second column</p>
        </div>

        <div className="block md:hidden">
          <Divider>Mobile Separator</Divider>
        </div>

        <div className="hidden md:flex md:items-center">
          <Divider orientation="vertical" />
        </div>

        <div className="bg-base-200 rounded p-4">
          <h3 className="mb-2 font-semibold">Column 3</h3>
          <p>Content for third column</p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Responsive layout example showing horizontal dividers on mobile and vertical on desktop.",
      },
    },
  },
};
