import { useState } from "react";

export function useStreamingAI(endpoint: string) {
  const [output, setOutput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async (body: object) => {
    setOutput("");
    setError(null);
    setIsStreaming(true);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Request failed");

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const events = buffer.split("\n\n");

        buffer = events.pop() ?? "";
        for (const ev of events) {
          if (!ev.startsWith("data: ")) continue;
          const data = JSON.parse(ev.slice(6));
          if (data.type === "token") setOutput((p) => p + data.text);
        }
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsStreaming(false);
    }
  };

  return { run, output, isStreaming, error };
}
