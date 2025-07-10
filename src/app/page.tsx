"use client";

import { useChat } from "@ai-sdk/react";
import { Button, Input } from "@/components";

export default function Page() {
  const { messages, input, setInput, append } = useChat();

  return (
    <div className="bg-base-200 flex h-full flex-col">
      {/* Chat messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((message, index) => {
          const isUser = message.role === "user";
          return (
            <div
              key={index}
              className={`chat ${isUser ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={
                      isUser
                        ? "https://api.dicebear.com/7.x/personas/svg?seed=User"
                        : "/window.svg"
                    }
                    alt={isUser ? "User avatar" : "AI avatar"}
                  />
                </div>
              </div>
              <div className="chat-header">{isUser ? "You" : "AI"}</div>
              <div
                className={`chat-bubble ${isUser ? "chat-bubble-primary" : "chat-bubble-secondary"}`}
              >
                {message.content}
              </div>
            </div>
          );
        })}
      </div>
      {/* Input bar */}
      <form
        className="bg-base-100 sticky bottom-0 flex gap-2 p-4"
        onSubmit={async (e) => {
          e.preventDefault();
          if (input.trim()) {
            append({ content: input, role: "user" });
          }
        }}
      >
        <Input
          className="w-full"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Type your message..."
          variant="bordered"
        />
        <Button type="submit" variant="primary">
          Send
        </Button>
      </form>
    </div>
  );
}
