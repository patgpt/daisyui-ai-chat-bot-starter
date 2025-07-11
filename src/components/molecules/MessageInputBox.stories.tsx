import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { HiMicrophone, HiStar } from "react-icons/hi2";
import { MessageInputBox, MessageInput } from "./MessageInputBox.client";

const meta: Meta<typeof MessageInputBox> = {
  title: "Molecules/MessageInputBox",
  component: MessageInputBox,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "MessageInputBox is a comprehensive chat input interface with auto-expanding textarea, file attachments, and keyboard shortcuts. Features drag-and-drop file support, character counting, and customizable toolbar.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "focused", "disabled", "error"],
      description: "Visual variant of the input box",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the input box",
    },
    value: {
      control: "text",
      description: "Current input value",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the textarea",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
    sending: {
      control: "boolean",
      description: "Whether a message is being sent",
    },
    maxLength: {
      control: "number",
      description: "Maximum character count",
    },
    showCharCount: {
      control: "boolean",
      description: "Show character counter",
    },
    enableAttachments: {
      control: "boolean",
      description: "Enable file attachments",
    },
    errorMessage: {
      control: "text",
      description: "Error message to display",
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-2xl mx-auto p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MessageInputBox>;

// Interactive wrapper for controlled input
function InteractiveWrapper(args: Parameters<typeof MessageInputBox>[0]) {
  const [value, setValue] = useState(args.value || "");
  
  return (
    <MessageInputBox
      {...args}
      value={value}
      onChange={setValue}
      onSubmit={(message, attachments) => {
        console.log("Submitted:", { message, attachments });
        setValue(""); // Clear after submit
      }}
      onFileAttach={(files) => {
        console.log("Files attached:", files);
      }}
    />
  );
}

export const Default: Story = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    placeholder: "Type your message...",
  },
};

export const WithCharacterCount: Story = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    placeholder: "Type your message...",
    maxLength: 280,
    showCharCount: true,
    value: "This is a sample message to show character counting.",
  },
};

export const WithAttachments: Story = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    placeholder: "Type your message...",
    enableAttachments: true,
    value: "I've attached some files for you to review.",
  },
};

export const Disabled: Story = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    placeholder: "Input is disabled...",
    disabled: true,
    value: "This input is disabled",
  },
};

export const Sending: Story = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    placeholder: "Sending message...",
    sending: true,
    value: "This message is being sent...",
  },
};

export const WithError: Story = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    placeholder: "Type your message...",
    variant: "error",
    errorMessage: "Message failed to send. Please try again.",
    value: "This message has an error",
  },
};

export const LongMessage: Story = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    placeholder: "Type a long message...",
    value: `This is a very long message that demonstrates the auto-expanding textarea functionality. The textarea should grow in height as you type more content, up to the maximum height limit.

You can continue typing multiple lines and paragraphs, and the textarea will automatically adjust its height to accommodate the content.

This makes it easy to compose longer messages without having to scroll within a small input field.`,
  },
};

export const SmallSize: Story = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    placeholder: "Small input...",
    size: "sm",
    value: "Small sized input",
  },
};

export const LargeSize: Story = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    placeholder: "Large input...",
    size: "lg",
    value: "Large sized input",
  },
};

export const WithToolbarContent: Story = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    placeholder: "Type your message...",
    toolbarContent: (
      <div className="flex gap-1">
        <button 
          className="btn btn-ghost btn-xs"
          onClick={() => console.log("Voice input clicked")}
          aria-label="Voice input"
        >
          <HiMicrophone className="h-3 w-3" />
        </button>
        <button 
          className="btn btn-ghost btn-xs"
          onClick={() => console.log("Quick action clicked")}
          aria-label="Quick action"
        >
          <HiStar className="h-3 w-3" />
        </button>
      </div>
    ),
  },
};

export const MessageInputVariant: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    
    return (
      <MessageInput
        {...args}
        value={value}
        onChange={setValue}
        onSubmit={(message) => {
          console.log("Submitted:", message);
          setValue("");
        }}
        quickActions={[
          {
            label: "Voice input",
            action: () => console.log("Voice input clicked"),
            icon: <HiMicrophone className="h-3 w-3" />,
          },
          {
            label: "Quick action",
            action: () => console.log("Quick action clicked"),
            icon: <HiStar className="h-3 w-3" />,
          },
        ]}
      />
    );
  },
  args: {
    placeholder: "Type your message with quick actions...",
  },
};

export const Focused: Story = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    placeholder: "This input appears focused...",
    variant: "focused",
    value: "Focused input state",
  },
};

export const NoAttachments: Story = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    placeholder: "Type your message...",
    enableAttachments: false,
    value: "This input doesn't support file attachments",
  },
};

export const MaxLengthReached: Story = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    placeholder: "Type your message...",
    maxLength: 50,
    showCharCount: true,
    value: "This message is exactly fifty characters long!",
  },
};

export const AllFeatures: Story = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    placeholder: "Full-featured input with all options...",
    maxLength: 500,
    showCharCount: true,
    enableAttachments: true,
    size: "md",
    toolbarContent: (
      <div className="flex gap-1">
        <button className="btn btn-ghost btn-xs" aria-label="Voice input">
          <HiMicrophone className="h-3 w-3" />
        </button>
      </div>
    ),
  },
};

// Demonstration of file attachment behavior
export const FileAttachmentDemo: Story = {
  render: () => {
    const [value, setValue] = useState("Check out these files I'm attaching!");
    
    return (
      <div className="space-y-4">
        <MessageInputBox
          value={value}
          onChange={setValue}
          onSubmit={(message, attachments) => {
            console.log("Submitted:", { message, attachments });
          }}
          placeholder="This demo shows file attachments..."
        />
        <div className="text-sm text-base-content/60">
          <p>Try uploading files or drag and drop them onto the input area.</p>
          <p>Supported formats: Images, PDFs, Documents</p>
        </div>
      </div>
    );
  },
};
