import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState, useEffect } from "react";
import { MessageList, ChatHistory, RealTimeChat, type Message } from "./MessageList.client";

const meta: Meta<typeof MessageList> = {
  title: "Organisms/MessageList",
  component: MessageList,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "MessageList is a comprehensive chat message display component built with React Aria Components, styled with DaisyUI, and animated with Motion. Features virtualization, auto-scrolling, message grouping, and real-time updates.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "compact", "floating", "bordered"],
      description: "Visual variant of the message list",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
      description: "Size of the message list container",
    },
    spacing: {
      control: "select",
      options: ["tight", "normal", "loose"],
      description: "Spacing between messages",
    },
    autoScroll: {
      control: "boolean",
      description: "Auto-scroll to bottom on new messages",
    },
    enableVirtualization: {
      control: "boolean",
      description: "Enable virtualization for large lists",
    },
    groupConsecutiveMessages: {
      control: "boolean",
      description: "Group consecutive messages from same sender",
    },
  },
  decorators: [
    (Story) => (
      <div className="h-96 max-w-4xl mx-auto p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MessageList>;

// Sample data
const sampleMessages: Message[] = [
  {
    id: "1",
    content: "Hello! How can I help you today?",
    sender: {
      id: "ai",
      name: "AI Assistant",
      avatar: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop&crop=face",
      type: "ai",
    },
    timestamp: new Date(Date.now() - 300000), // 5 minutes ago
    metadata: {
      model: "GPT-4",
      tokens: 12,
      responseTime: 850,
    },
  },
  {
    id: "2",
    content: "I need help with creating a React component. Can you show me how to build a message list component?",
    sender: {
      id: "user-1",
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      type: "user",
    },
    timestamp: new Date(Date.now() - 240000), // 4 minutes ago
  },
  {
    id: "3",
    content: "Of course! I'd be happy to help you create a message list component. Here's a comprehensive example using React, TypeScript, and modern best practices:\n\n```typescript\nimport { useState, useEffect } from 'react';\n\ninterface Message {\n  id: string;\n  content: string;\n  sender: string;\n  timestamp: Date;\n}\n\nfunction MessageList({ messages }: { messages: Message[] }) {\n  return (\n    <div className=\"message-list\">\n      {messages.map(message => (\n        <div key={message.id} className=\"message\">\n          <strong>{message.sender}:</strong> {message.content}\n        </div>\n      ))}\n    </div>\n  );\n}\n```\n\nThis component includes proper TypeScript typing, efficient rendering with keys, and a clean interface.",
    sender: {
      id: "ai",
      name: "AI Assistant", 
      avatar: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop&crop=face",
      type: "ai",
    },
    timestamp: new Date(Date.now() - 180000), // 3 minutes ago
    metadata: {
      model: "GPT-4",
      tokens: 156,
      responseTime: 2100,
    },
  },
  {
    id: "4",
    content: "That's perfect! Thank you so much. One more question - how would I add real-time messaging capabilities?",
    sender: {
      id: "user-1",
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      type: "user",
    },
    timestamp: new Date(Date.now() - 120000), // 2 minutes ago
  },
  {
    id: "5",
    content: "Great question! For real-time messaging, you can use WebSockets or Server-Sent Events. Here's an example with WebSockets:",
    sender: {
      id: "ai",
      name: "AI Assistant",
      avatar: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop&crop=face", 
      type: "ai",
    },
    timestamp: new Date(Date.now() - 60000), // 1 minute ago
    isGenerating: false,
    metadata: {
      model: "GPT-4",
      tokens: 89,
      responseTime: 1200,
    },
  },
  {
    id: "6",
    content: "System notification: User Jane Smith has joined the conversation.",
    sender: {
      id: "system",
      name: "System",
      type: "system",
    },
    timestamp: new Date(Date.now() - 30000), // 30 seconds ago
  },
];

const longMessageList: Message[] = Array.from({ length: 100 }, (_, i) => ({
  id: `msg-${i}`,
  content: `This is message number ${i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  sender: {
    id: i % 2 === 0 ? "user-1" : "ai",
    name: i % 2 === 0 ? "User" : "AI Assistant",
    avatar: i % 2 === 0 
      ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
      : "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop&crop=face",
    type: i % 2 === 0 ? "user" : "ai" as const,
  },
  timestamp: new Date(Date.now() - (100 - i) * 60000),
  metadata: i % 2 === 1 ? {
    model: "GPT-4",
    tokens: Math.floor(Math.random() * 100) + 20,
    responseTime: Math.floor(Math.random() * 2000) + 500,
  } : undefined,
}));

export const Default: Story = {
  args: {
    messages: sampleMessages,
    showEmptyState: true,
    autoScroll: true,
    showScrollButton: true,
    enableVirtualization: false,
    groupConsecutiveMessages: true,
  },
};

export const EmptyState: Story = {
  args: {
    messages: [],
    showEmptyState: true,
    emptyStateContent: "Start a conversation to see messages here",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    loadingText: "Loading your conversation...",
  },
};

export const CompactVariant: Story = {
  args: {
    messages: sampleMessages,
    variant: "compact",
    spacing: "tight",
    size: "md",
  },
};

export const FloatingVariant: Story = {
  args: {
    messages: sampleMessages,
    variant: "floating",
    spacing: "loose",
    size: "lg",
  },
};

export const BorderedVariant: Story = {
  args: {
    messages: sampleMessages,
    variant: "bordered",
    spacing: "normal",
    size: "xl",
  },
};

export const WithVirtualization: Story = {
  args: {
    messages: longMessageList,
    enableVirtualization: true,
    estimatedItemHeight: 80,
    autoScroll: true,
    showScrollButton: true,
  },
};

export const NoGrouping: Story = {
  args: {
    messages: sampleMessages,
    groupConsecutiveMessages: false,
    showScrollButton: true,
  },
};

export const WithScrollButtons: Story = {
  args: {
    messages: longMessageList.slice(0, 20),
    showScrollButton: true,
    showScrollToTop: true,
    enableVirtualization: false,
  },
};

export const RealTimeChatExample: Story = {
  render: () => {
    const [messages, setMessages] = useState(sampleMessages.slice(0, 3));
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
      const interval = setInterval(() => {
        if (!isTyping) {
          setIsTyping(true);
          setTimeout(() => {
            setMessages(prev => [...prev, {
              id: `real-time-${Date.now()}`,
              content: "This is a new real-time message that just arrived!",
              sender: {
                id: "ai",
                name: "AI Assistant",
                avatar: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop&crop=face",
                type: "ai" as const,
              },
              timestamp: new Date(),
              metadata: {
                model: "GPT-4",
                tokens: 12,
                responseTime: 800,
              },
            }]);
            setIsTyping(false);
          }, 2000);
        }
      }, 8000);

      return () => clearInterval(interval);
    }, [isTyping]);

    return (
      <RealTimeChat
        messages={messages}
        showTypingIndicator={isTyping}
        typingUser="AI Assistant"
        autoScroll={true}
        showScrollButton={true}
      />
    );
  },
};

export const ChatHistoryExample: Story = {
  render: () => {
    const history = [
      {
        sessionId: "session-1",
        title: "React Component Help",
        messages: sampleMessages.slice(0, 3),
        lastActivity: new Date(Date.now() - 86400000), // 1 day ago
      },
      {
        sessionId: "session-2", 
        title: "TypeScript Questions",
        messages: sampleMessages.slice(2, 5),
        lastActivity: new Date(Date.now() - 172800000), // 2 days ago
      },
      {
        sessionId: "session-3",
        title: "API Integration",
        messages: sampleMessages.slice(1, 4),
        lastActivity: new Date(Date.now() - 259200000), // 3 days ago
      },
    ];

    return (
      <ChatHistory
        history={history}
        onSessionSelect={(sessionId) => console.log("Selected session:", sessionId)}
        variant="compact"
        size="lg"
      />
    );
  },
};

export const LoadingMore: Story = {
  args: {
    messages: longMessageList.slice(0, 10),
    isLoadingMore: true,
    enableVirtualization: false,
  },
};

export const WithErrors: Story = {
  args: {
    messages: [
      ...sampleMessages.slice(0, 2),
      {
        id: "error-msg",
        content: "This message failed to send due to a network error.",
        sender: {
          id: "user-1",
          name: "John Doe",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
          type: "user" as const,
        },
        timestamp: new Date(),
        hasError: true,
      },
      ...sampleMessages.slice(2),
    ],
  },
};

export const GeneratingMessage: Story = {
  args: {
    messages: [
      ...sampleMessages.slice(0, 4),
      {
        id: "generating",
        content: "I'm thinking about your question and will provide a comprehensive answer shortly...",
        sender: {
          id: "ai",
          name: "AI Assistant",
          avatar: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop&crop=face",
          type: "ai" as const,
        },
        timestamp: new Date(),
        isGenerating: true,
        metadata: {
          model: "GPT-4",
          tokens: 0,
          responseTime: 0,
        },
      },
    ],
  },
};

export const LargeSizeFullHeight: Story = {
  args: {
    messages: longMessageList.slice(0, 15),
    size: "full",
    variant: "default",
    enableVirtualization: true,
    estimatedItemHeight: 100,
  },
  decorators: [
    (Story) => (
      <div className="h-screen max-w-4xl mx-auto p-4">
        <Story />
      </div>
    ),
  ],
};

export const InteractiveDemo: Story = {
  render: () => {
    const [messages, setMessages] = useState(sampleMessages.slice(0, 2));
    const [loading, setLoading] = useState(false);

    const addMessage = () => {
      setLoading(true);
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: `interactive-${Date.now()}`,
          content: `New message added at ${new Date().toLocaleTimeString()}`,
          sender: {
            id: "user-1",
            name: "Interactive User",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
            type: "user" as const,
          },
          timestamp: new Date(),
        }]);
        setLoading(false);
      }, 1000);
    };

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <button 
            className="btn btn-primary"
            onClick={addMessage}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Message"}
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => setMessages([])}
          >
            Clear All
          </button>
        </div>
        <MessageList
          messages={messages}
          loading={loading}
          showEmptyState={true}
          autoScroll={true}
          onMessageSelect={(message) => console.log("Selected:", message)}
        />
      </div>
    );
  },
};
