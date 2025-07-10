import { createGroq } from "@ai-sdk/groq";

import { streamText, UIMessage } from "ai";

const groq = createGroq();

const model = groq("llama-3.3-70b-versatile", {
  // options
});

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model,
    system: "You are a helpful assistant.",
    messages,
  });

  return result.toDataStreamResponse();
}
