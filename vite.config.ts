import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";

import { createPortfolioAssistantReply } from "./src/server/portfolioChat";

type DevRequest = {
  method?: string;
  headers?: Record<string, string | string[] | undefined>;
  on: (event: "data" | "end" | "error", cb: (arg?: unknown) => void) => void;
};

type DevResponse = {
  statusCode: number;
  setHeader: (name: string, value: string) => void;
  end: (body?: string) => void;
};

type DevServerLike = {
  middlewares: {
    use: (path: string, handler: (req: DevRequest, res: DevResponse) => void) => void;
  };
};

type ChatServerEnv = {
  openAiApiKey?: string;
  openAiModel?: string;
};

async function readJsonBody(req: DevRequest) {
  const contentType = String(req.headers?.["content-type"] ?? "");
  if (!contentType.includes("application/json")) return null;

  const raw = await new Promise<string>((resolve, reject) => {
    let data = "";
    req.on("data", (chunk: unknown) => {
      if (typeof chunk === "string") {
        data += chunk;
      } else if (chunk && typeof chunk === "object" && "toString" in chunk) {
        data += String((chunk as { toString: () => string }).toString());
      }
      if (data.length > 200_000) reject(new Error("Payload too large"));
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });

  if (!raw.trim()) return null;
  return JSON.parse(raw) as unknown;
}

function portfolioChatApi(env: ChatServerEnv) {
  return {
    name: "portfolio-chat-api",
    configureServer(rawServer: unknown) {
      const server = rawServer as DevServerLike;
      server.middlewares.use("/api/chat", async (req: DevRequest, res: DevResponse) => {
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.setHeader("Cache-Control", "no-store");

        if (req.method !== "POST") {
          res.statusCode = 405;
          res.setHeader("Allow", "POST");
          res.end(JSON.stringify({ error: "Method not allowed" }));
          return;
        }

        const apiKey = env.openAiApiKey;
        if (!apiKey) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: "Missing OPENAI_API_KEY on server" }));
          return;
        }

        try {
          const body = await readJsonBody(req);
          const maybeMessages =
            body && typeof body === "object" ? (body as { messages?: unknown }).messages : undefined;

          const messages = Array.isArray(maybeMessages)
            ? maybeMessages
                .slice(-14)
                .flatMap((message): { role: "user" | "assistant"; content: string }[] => {
                  if (!message || typeof message !== "object") return [];
                  const role = (message as { role?: unknown }).role;
                  const content = (message as { content?: unknown }).content;
                  if (role !== "user" && role !== "assistant") return [];
                  if (typeof content !== "string") return [];
                  const trimmed = content.trim();
                  if (!trimmed) return [];
                  return [{ role, content: trimmed.slice(0, 900) }];
                })
            : [];

          const model = env.openAiModel ?? "gpt-4.1-mini";
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
      });
    },
  };
}

export default defineConfig(({ command, mode }) => {
  const cwd =
    (globalThis as unknown as { process?: { cwd?: () => string } }).process?.cwd?.() ?? ".";
  const loadedEnv = loadEnv(mode, cwd, "");

  return {
    plugins: [
      react(),
      tailwindcss(),
      ...(command === "serve"
        ? [
            portfolioChatApi({
              openAiApiKey: loadedEnv.OPENAI_API_KEY,
              openAiModel: loadedEnv.OPENAI_MODEL,
            }),
          ]
        : []),
    ],
  };
});
