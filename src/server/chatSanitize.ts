import type { PortfolioAssistantMessage } from "./chatTypes.js";

export const PORTFOLIO_CHAT_DEFAULT_MODEL = "gpt-4.1-mini";
const MAX_MESSAGES = 14;
const MAX_MESSAGE_CHARS = 900;

export function sanitizePortfolioAssistantMessages(value: unknown): PortfolioAssistantMessage[] {
  if (!Array.isArray(value)) return [];

  const sliced = value.slice(-MAX_MESSAGES);
  const cleaned: PortfolioAssistantMessage[] = [];

  for (const item of sliced) {
    if (!item || typeof item !== "object") continue;
    const role = (item as { role?: unknown }).role;
    const content = (item as { content?: unknown }).content;
    if (role !== "user" && role !== "assistant") continue;
    if (typeof content !== "string") continue;
    const trimmed = content.trim();
    if (!trimmed) continue;
    cleaned.push({ role, content: trimmed.slice(0, MAX_MESSAGE_CHARS) });
  }

  return cleaned;
}
