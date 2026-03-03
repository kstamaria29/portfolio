import { createPortfolioAssistantReply } from "../src/server/portfolioChat.js";
import {
  PORTFOLIO_CHAT_DEFAULT_MODEL,
  sanitizePortfolioAssistantMessages,
} from "../src/server/chatSanitize.js";

type ApiRequest = {
  method?: string;
  body?: unknown;
};

type ApiResponse = {
  statusCode: number;
  setHeader: (name: string, value: string) => void;
  end: (body?: string) => void;
};

function getEnv(key: string) {
  return (globalThis as unknown as { process?: { env?: Record<string, string | undefined> } })
    .process?.env?.[key];
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Allow", "POST");
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  const apiKey = getEnv("OPENAI_API_KEY");
  if (!apiKey) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: "Missing OPENAI_API_KEY on server" }));
    return;
  }

  const model = getEnv("OPENAI_MODEL") ?? PORTFOLIO_CHAT_DEFAULT_MODEL;

  try {
    const body = typeof req.body === "string" ? (JSON.parse(req.body) as unknown) : req.body;
    const messages = sanitizePortfolioAssistantMessages(
      body && typeof body === "object" ? (body as { messages?: unknown }).messages : undefined,
    );

    const reply = await createPortfolioAssistantReply({ apiKey, model, messages });
    res.statusCode = 200;
    res.end(JSON.stringify({ reply }));
  } catch (error) {
    res.statusCode = 500;
    res.end(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unexpected server error",
      }),
    );
  }
}
