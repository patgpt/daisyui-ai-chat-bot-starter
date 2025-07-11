import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MessageBubble, MessageGroup } from "./MessageBubble.client";

const meta: Meta<typeof MessageBubble> = {
  title: "Molecules/MessageBubble",
  component: MessageBubble,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "MessageBubble component for displaying chat messages with support for user/AI messages, markdown rendering, actions, and timestamps.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    content: {
      control: "text",
      description: "Message content (supports markdown)",
    },
    sender: {
      control: "object",
      description: "Sender information",
    },
    timestamp: {
      control: "text",
      description: "Message timestamp",
    },
    isGenerating: {
      control: "boolean",
      description: "Whether the message is currently being generated",
    },
    hasError: {
      control: "boolean",
      description: "Whether the message has an error",
    },
    showAvatar: {
      control: "boolean",
      description: "Whether to show avatar",
    },
    showTimestamp: {
      control: "boolean",
      description: "Whether to show timestamp",
    },
    balloonVariant: {
      control: "select",
      options: ["default", "outline", "flat"],
      description: "Message balloon style variant",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
      description: "Maximum width of the message",
    },
    spacing: {
      control: "select",
      options: ["tight", "normal", "loose"],
      description: "Spacing around the message",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AIMessage: Story = {
  args: {
    content:
      "Hello! I&apos;m Claude, an AI assistant. How can I help you today?",
    sender: {
      id: "claude",
      name: "Claude",
      type: "ai",
      avatar: "/rick.png",
    },
    timestamp: new Date(),
    metadata: {
      model: "Claude-3",
      tokens: 28,
      responseTime: 250,
    },
  },
  render: (args) => (
    <div className="bg-base-100 w-full max-w-2xl rounded-lg p-4">
      <MessageBubble {...args} />
    </div>
  ),
};

export const UserMessage: Story = {
  args: {
    content: "Can you help me understand React hooks?",
    sender: {
      id: "user123",
      name: "John Doe",
      type: "user",
      avatar: "/rick.png",
    },
    timestamp: new Date(),
  },
  render: (args) => (
    <div className="bg-base-100 w-full max-w-2xl rounded-lg p-4">
      <MessageBubble {...args} />
    </div>
  ),
};

export const SystemMessage: Story = {
  args: {
    content: "Conversation started. You&apos;re now chatting with Claude.",
    sender: {
      id: "system",
      name: "System",
      type: "system",
    },
    timestamp: new Date(),
  },
  render: (args) => (
    <div className="bg-base-100 w-full max-w-2xl rounded-lg p-4">
      <MessageBubble {...args} />
    </div>
  ),
};

export const WithMarkdown: Story = {
  args: {
    content: `Here&apos;s a code example:

\`\`\`typescript
const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  
  return { count, increment, decrement };
};
\`\`\`

This is a **custom hook** that manages counter state.`,
    sender: {
      id: "claude",
      name: "Claude",
      type: "ai",
      avatar: "/rick.png",
    },
    timestamp: new Date(),
    metadata: {
      model: "Claude-3",
      tokens: 120,
    },
  },
  render: (args) => (
    <div className="bg-base-100 w-full max-w-2xl rounded-lg p-4">
      <MessageBubble {...args} />
    </div>
  ),
};

export const GeneratingMessage: Story = {
  args: {
    content: "Let me think about that...",
    sender: {
      id: "claude",
      name: "Claude",
      type: "ai",
      avatar: "/rick.png",
    },
    timestamp: new Date(),
    isGenerating: true,
  },
  render: (args) => (
    <div className="bg-base-100 w-full max-w-2xl rounded-lg p-4">
      <MessageBubble {...args} />
    </div>
  ),
};

export const ErrorMessage: Story = {
  args: {
    content: "I apologize, but I encountered an error processing your request.",
    sender: {
      id: "claude",
      name: "Claude",
      type: "ai",
      avatar: "/rick.png",
    },
    timestamp: new Date(),
    hasError: true,
  },
  render: (args) => (
    <div className="bg-base-100 w-full max-w-2xl rounded-lg p-4">
      <MessageBubble {...args} />
    </div>
  ),
};

export const WithActions: Story = {
  args: {
    content: "This message has interactive actions. Hover to see them!",
    sender: {
      id: "claude",
      name: "Claude",
      type: "ai",
      avatar: "/rick.png",
    },
    timestamp: new Date(),
    onAction: (action: string, messageId?: string) => {
      alert(`Action: ${action}, Message ID: ${messageId}`);
    },
  },
  render: (args) => (
    <div className="bg-base-100 w-full max-w-2xl rounded-lg p-4">
      <MessageBubble {...args} />
    </div>
  ),
};

export const BalloonVariants: Story = {
  render: () => (
    <div className="bg-base-100 w-full max-w-2xl space-y-4 rounded-lg p-4">
      <MessageBubble
        content="Default balloon style"
        sender={{
          id: "ai",
          name: "AI",
          type: "ai",
          avatar: "/rick.png",
        }}
        balloonVariant="default"
      />

      <MessageBubble
        content="Outline balloon style"
        sender={{
          id: "ai",
          name: "AI",
          type: "ai",
          avatar: "/rick.png",
        }}
        balloonVariant="outline"
      />

      <MessageBubble
        content="Flat balloon style"
        sender={{
          id: "ai",
          name: "AI",
          type: "ai",
          avatar: "/rick.png",
        }}
        balloonVariant="flat"
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="bg-base-100 w-full space-y-4 rounded-lg p-4">
      <MessageBubble
        content="Small message container"
        sender={{
          id: "ai",
          name: "AI",
          type: "ai",
          avatar: "/rick.png",
        }}
        size="sm"
      />

      <MessageBubble
        content="Medium message container with some more content to show the width difference"
        sender={{
          id: "ai",
          name: "AI",
          type: "ai",
          avatar: "/rick.png",
        }}
        size="md"
      />

      <MessageBubble
        content="Large message container with even more content to demonstrate how the maximum width affects the layout and text wrapping behavior"
        sender={{
          id: "ai",
          name: "AI",
          type: "ai",
          avatar: "/rick.png",
        }}
        size="lg"
      />
    </div>
  ),
};

export const ConversationFlow: Story = {
  render: () => (
    <div className="bg-base-100 w-full max-w-2xl space-y-4 rounded-lg p-4">
      <MessageBubble
        content="Hi! Can you help me learn React?"
        sender={{
          id: "user123",
          name: "John",
          type: "user",
          avatar: "/rick.png",
        }}
        timestamp="2:30 PM"
      />

      <MessageBubble
        content="Of course! I'd be happy to help you learn React. What specific aspect would you like to start with?"
        sender={{
          id: "claude",
          name: "Claude",
          type: "ai",
          avatar: "/rick.png",
        }}
        timestamp="2:30 PM"
        metadata={{
          model: "Claude-3",
          tokens: 32,
        }}
      />

      <MessageBubble
        content="I'm confused about useEffect"
        sender={{
          id: "user123",
          name: "John",
          type: "user",
          avatar: "/rick.png",
        }}
        timestamp="2:31 PM"
      />

      <MessageBubble
        content="useEffect is a React Hook that lets you perform side effects in functional components..."
        sender={{
          id: "claude",
          name: "Claude",
          type: "ai",
          avatar: "/rick.png",
        }}
        timestamp="2:31 PM"
        isGenerating={true}
      />
    </div>
  ),
};

export const MessageGroupComponent: Story = {
  render: () => (
    <div className="bg-base-100 w-full max-w-2xl space-y-6 rounded-lg p-4">
      <MessageGroup
        sender={{
          id: "claude",
          name: "Claude",
          type: "ai",
          avatar: "/rick.png",
        }}
        messages={[
          {
            id: "1",
            content: "Let me break this down into multiple parts.",
            timestamp: "2:30 PM",
          },
          {
            id: "2",
            content: "First, let&apos;s talk about React components.",
            timestamp: "2:30 PM",
          },
          {
            id: "3",
            content: "Then we&apos;ll cover hooks and state management.",
            timestamp: "2:30 PM",
          },
        ]}
        compactMode={true}
      />

      <MessageBubble
        content="That makes sense, thank you!"
        sender={{
          id: "user123",
          name: "John",
          type: "user",
          avatar: "/rick.png",
        }}
        timestamp="2:32 PM"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "MessageGroup component for grouping multiple messages from the same sender to reduce visual noise.",
      },
    },
  },
};

export const NoAvatar: Story = {
  args: {
    content: "This message doesn&apos;t show an avatar",
    sender: {
      id: "ai",
      name: "AI Assistant",
      type: "ai",
    },
    showAvatar: false,
    timestamp: new Date(),
  },
  render: (args) => (
    <div className="bg-base-100 w-full max-w-2xl rounded-lg p-4">
      <MessageBubble {...args} />
    </div>
  ),
};

export const AccessibilityExample: Story = {
  render: () => (
    <div className="bg-base-100 w-full max-w-2xl space-y-4 rounded-lg p-4">
      <MessageBubble
        content="This message has proper accessibility attributes"
        sender={{
          id: "ai",
          name: "Claude AI Assistant",
          type: "ai",
          avatar: "/rick.png",
        }}
        timestamp="2:30 PM"
        onAction={(action, messageId) => {
          // Actions are properly labeled for screen readers
          console.log(`Accessible action: ${action} on message ${messageId}`);
        }}
        aria-label="AI message with copy and retry actions"
      />

      <MessageBubble
        content="User messages are properly identified"
        sender={{
          id: "user123",
          name: "John Doe",
          type: "user",
          avatar: "/rick.png",
        }}
        timestamp="2:31 PM"
        aria-label="User message from John Doe"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Examples showing proper accessibility attributes and ARIA labels for screen readers.",
      },
    },
  },
};
