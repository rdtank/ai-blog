import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import { Request, Response, Router } from "express";
import { posts } from "../data/post";
import { rateLimitter } from "../middleware";

const aiRouter = Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Write one SSE event to the response
function sendSSE(res: Response, data: object) {
  res.write(`data: ${JSON.stringify(data)}\n\n`);
}

aiRouter.post(
  "/summarize",
  rateLimitter,
  async (req: Request, res: Response) => {
    const { id } = req.body;
    const post = posts.find((p) => p.id === id);
    if (!post) return res.status(404).json({ error: "Not found" });

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    const modal = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
      systemInstruction: `You summarize blog posts concisely.
    Produce 3 bullet points capturing the key takeaways.
    Each bullet under 20 words. No preamble.`,
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
      generationConfig: {
        maxOutputTokens: 2000,
        temperature: 0.2,
        topP: 0.5,
      },
    });

    const stream = await modal.generateContentStream(
      `Summarize this post:\n\n${post.content}`,
    );

    for await (const chunk of stream.stream) {
      const text = chunk.text();
      if (text) {
        sendSSE(res, { type: "token", text });
      }
    }

    sendSSE(res, { type: "done" });
    res.end();
  },
);

aiRouter.post("/ask", rateLimitter, async (req: Request, res: Response) => {
  const { id, question } = req.body;
  const post = posts.find((p) => p.id === id);
  if (!post) return res.status(404).json({ error: "Not found" });

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.flushHeaders();

  const modal = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview",
    systemInstruction: `Answer questions using ONLY the article provided.
    If the answer is not in the article, say "The article does not cover that."
    Be concise.`,
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ],
    generationConfig: {
      maxOutputTokens: 2000,
      temperature: 0.2,
      topP: 0.5,
    },
  });

  const prompt = `<article>\n${post.content}\n</article>\n\nQuestion: ${question}`;
  const stream = await modal.generateContentStream(prompt);

  for await (const chunk of stream.stream) {
    const text = chunk.text();
    if (text) {
      sendSSE(res, { type: "token", text });
    }
  }

  sendSSE(res, { type: "done" });
  res.end();
});

export { aiRouter };
