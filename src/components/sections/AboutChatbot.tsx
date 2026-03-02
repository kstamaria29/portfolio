import { Bot, Send, Sparkles, Trash2 } from "lucide-react";
import { type ReactNode, useEffect, useId, useMemo, useRef, useState } from "react";

import { portfolioAssistant } from "../../content/ai";
import { contact } from "../../content/contact";
import { cn } from "../../lib/cn";
import { Button } from "../ui/Button";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

function createMessageId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return "Something went wrong.";
}

function renderInlineMarkdown(text: string, keyPrefix: string) {
  const nodes: ReactNode[] = [];
  const inlinePattern =
    /(`[^`]+`)|(\[[^\]]+\]\((?:https?:\/\/[^\s)]+|mailto:[^)]+)\))|(\*\*[^*]+\*\*)|(\*[^*]+\*)/g;

  let lastIndex = 0;
  let tokenIndex = 0;
  let match: RegExpExecArray | null = inlinePattern.exec(text);

  while (match) {
    const token = match[0];

    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (token.startsWith("`") && token.endsWith("`")) {
      nodes.push(
        <code
          key={`${keyPrefix}-code-${tokenIndex}`}
          className="rounded bg-black/10 px-1 py-0.5 text-[0.9em] dark:bg-white/10"
        >
          {token.slice(1, -1)}
        </code>,
      );
    } else if (token.startsWith("[") && token.includes("](")) {
      const linkParts = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkParts) {
        const [, label, href] = linkParts;
        nodes.push(
          <a
            key={`${keyPrefix}-link-${tokenIndex}`}
            href={href}
            className="font-semibold underline"
            target="_blank"
            rel="noreferrer"
          >
            {label}
          </a>,
        );
      } else {
        nodes.push(token);
      }
    } else if (token.startsWith("**") && token.endsWith("**")) {
      nodes.push(
        <strong key={`${keyPrefix}-strong-${tokenIndex}`}>{token.slice(2, -2)}</strong>,
      );
    } else if (token.startsWith("*") && token.endsWith("*")) {
      nodes.push(<em key={`${keyPrefix}-em-${tokenIndex}`}>{token.slice(1, -1)}</em>);
    } else {
      nodes.push(token);
    }

    tokenIndex += 1;
    lastIndex = match.index + token.length;
    match = inlinePattern.exec(text);
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function renderMarkdownMessage(markdown: string) {
  const nodes: ReactNode[] = [];
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");

  let blockIndex = 0;
  let paragraphLines: string[] = [];
  let quoteLines: string[] = [];
  let listKind: "unordered" | "ordered" | null = null;
  let listItems: string[] = [];
  let inCodeBlock = false;
  let codeLines: string[] = [];

  const nextKey = (prefix: string) => {
    blockIndex += 1;
    return `${prefix}-${blockIndex}`;
  };

  const flushParagraph = () => {
    if (!paragraphLines.length) return;
    const text = paragraphLines.join(" ").trim();
    paragraphLines = [];
    if (!text) return;
    const key = nextKey("p");
    nodes.push(
      <p key={key} className="leading-relaxed">
        {renderInlineMarkdown(text, key)}
      </p>,
    );
  };

  const flushQuote = () => {
    if (!quoteLines.length) return;
    const text = quoteLines.join(" ").trim();
    quoteLines = [];
    if (!text) return;
    const key = nextKey("quote");
    nodes.push(
      <blockquote
        key={key}
        className="border-l-2 border-zinc-300/80 pl-3 text-zinc-700 dark:border-white/20 dark:text-zinc-200"
      >
        {renderInlineMarkdown(text, key)}
      </blockquote>,
    );
  };

  const flushList = () => {
    if (!listKind || !listItems.length) return;
    const key = nextKey("list");
    const items = listItems.map((item, itemIndex) => (
      <li key={`${key}-item-${itemIndex}`}>{renderInlineMarkdown(item, `${key}-item-${itemIndex}`)}</li>
    ));

    if (listKind === "ordered") {
      nodes.push(
        <ol key={key} className="list-decimal space-y-1 pl-5 leading-relaxed">
          {items}
        </ol>,
      );
    } else {
      nodes.push(
        <ul key={key} className="list-disc space-y-1 pl-5 leading-relaxed">
          {items}
        </ul>,
      );
    }

    listItems = [];
    listKind = null;
  };

  const flushCodeBlock = () => {
    if (!codeLines.length) return;
    const key = nextKey("code");
    nodes.push(
      <pre
        key={key}
        className="no-scrollbar overflow-x-auto rounded-xl border border-zinc-200/70 bg-black/80 p-3 text-xs text-zinc-100 dark:border-white/10"
      >
        <code>{codeLines.join("\n")}</code>
      </pre>,
    );
    codeLines = [];
  };

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      flushParagraph();
      flushQuote();
      flushList();
      if (inCodeBlock) {
        flushCodeBlock();
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      flushParagraph();
      flushQuote();
      flushList();

      const level = Math.min(headingMatch[1].length, 4);
      const content = headingMatch[2].trim();
      const key = nextKey("heading");

      if (level === 1) {
        nodes.push(
          <h3 key={key} className="text-base font-semibold">
            {renderInlineMarkdown(content, key)}
          </h3>,
        );
      } else if (level === 2) {
        nodes.push(
          <h4 key={key} className="text-sm font-semibold">
            {renderInlineMarkdown(content, key)}
          </h4>,
        );
      } else {
        nodes.push(
          <h5 key={key} className="text-sm font-semibold">
            {renderInlineMarkdown(content, key)}
          </h5>,
        );
      }
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      flushQuote();
      flushList();
      continue;
    }

    const quoteMatch = line.match(/^>\s?(.*)$/);
    if (quoteMatch) {
      flushParagraph();
      flushList();
      quoteLines.push(quoteMatch[1]);
      continue;
    }

    const unorderedListMatch = line.match(/^[-*+]\s+(.+)$/);
    if (unorderedListMatch) {
      flushParagraph();
      flushQuote();
      if (listKind && listKind !== "unordered") flushList();
      listKind = "unordered";
      listItems.push(unorderedListMatch[1].trim());
      continue;
    }

    const orderedListMatch = line.match(/^\d+\.\s+(.+)$/);
    if (orderedListMatch) {
      flushParagraph();
      flushQuote();
      if (listKind && listKind !== "ordered") flushList();
      listKind = "ordered";
      listItems.push(orderedListMatch[1].trim());
      continue;
    }

    flushQuote();
    flushList();
    paragraphLines.push(line.trim());
  }

  flushParagraph();
  flushQuote();
  flushList();
  if (inCodeBlock) {
    flushCodeBlock();
  }

  if (!nodes.length) return <p className="leading-relaxed">{markdown}</p>;
  return <div className="space-y-2">{nodes}</div>;
}

export function AboutChatbot() {
  const inputId = useId();
  const listId = useId();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const initialMessages = useMemo<ChatMessage[]>(
    () => [
      {
        id: createMessageId(),
        role: "assistant",
        content: portfolioAssistant.greeting,
      },
    ],
    [],
  );

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [value, setValue] = useState("");
  const [selectedSuggestion, setSelectedSuggestion] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<null | { kind: "error"; message: string }>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [messages.length, isSending]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    setStatus(null);
    setIsSending(true);

    const nextMessages: ChatMessage[] = [
      ...messages,
      { id: createMessageId(), role: "user", content: trimmed },
    ];
    setMessages(nextMessages);
    setValue("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      const data = (await response.json().catch(() => null)) as
        | { reply?: unknown; error?: unknown }
        | null;

      if (!response.ok) {
        throw new Error(
          typeof data?.error === "string" && data.error.trim()
            ? data.error
            : "Chatbot request failed.",
        );
      }

      const reply = typeof data?.reply === "string" ? data.reply.trim() : "";
      if (!reply) throw new Error("Chatbot returned an empty response.");

      setMessages((prev) => [...prev, { id: createMessageId(), role: "assistant", content: reply }]);
      inputRef.current?.focus();
    } catch (error) {
      const message = getErrorMessage(error);
      setStatus({ kind: "error", message });
      setMessages((prev) => [
        ...prev,
        {
          id: createMessageId(),
          role: "assistant",
          content: `I can't answer right now (the chatbot is offline). You can email Kenneth at ${contact.email}.`,
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  function handleClear() {
    setStatus(null);
    setMessages(initialMessages);
    setValue("");
    setSelectedSuggestion("");
    inputRef.current?.focus();
  }

  return (
    <div className="relative min-h-0 h-[var(--about-profile-card-height)]">
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -inset-8 -z-10 rounded-[2.75rem] blur-3xl",
          "bg-linear-to-br from-emerald-400/25 via-sky-400/15 to-fuchsia-400/10",
          "dark:from-emerald-300/15 dark:via-sky-300/10 dark:to-fuchsia-300/10",
        )}
      />

      <div className="h-full min-h-0 rounded-3xl bg-linear-to-br from-emerald-400/30 via-sky-400/20 to-fuchsia-400/30 p-px">
        <div
          className={cn(
            "flex h-full min-h-0 flex-col rounded-3xl border border-zinc-200/70 bg-white/80 p-6 shadow-sm backdrop-blur",
            "dark:border-white/10 dark:bg-zinc-950/35",
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "inline-flex h-9 shrink-0 items-center justify-center rounded-2xl px-2",
                    "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-300",
                  )}
                  aria-hidden="true"
                >
                  <Bot className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="truncate text-base font-semibold text-zinc-900 dark:text-zinc-50">
                      {portfolioAssistant.heading}
                    </h3>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs",
                        "border border-zinc-200/70 bg-white text-zinc-700",
                        "dark:border-white/10 dark:bg-white/5 dark:text-zinc-200",
                      )}
                    >
                      <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                      Powered by OpenAI
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-300">
                    {portfolioAssistant.description}
                  </p>
                </div>
              </div>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="shrink-0"
              aria-label="Clear chat"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>

          <div className="mt-5 flex items-center gap-2">
            <label htmlFor={`${inputId}-suggestions`} className="sr-only">
              Suggested questions
            </label>
            <select
              id={`${inputId}-suggestions`}
              value={selectedSuggestion}
              onChange={(event) => setSelectedSuggestion(event.target.value)}
              disabled={isSending}
              className={cn(
                "h-10 w-full rounded-xl px-3 text-sm",
                "border border-zinc-200/70 bg-white text-zinc-800",
                "focus:ring-2 focus:ring-emerald-400/50",
                "dark:border-white/10 dark:bg-zinc-950/40 dark:text-zinc-100",
              )}
            >
              <option value="">Pick a suggested question...</option>
              {portfolioAssistant.suggestedQuestions.map((question) => (
                <option key={question} value={question}>
                  {question}
                </option>
              ))}
            </select>
            <Button
              type="button"
              size="sm"
              onClick={() => {
                if (!selectedSuggestion) return;
                void sendMessage(selectedSuggestion);
                setSelectedSuggestion("");
              }}
              disabled={isSending || !selectedSuggestion}
              className="h-10 px-4"
            >
              Ask
            </Button>
          </div>

          <div
            className={cn(
              "mt-5 flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl",
              "border border-zinc-200/70 bg-white/70",
              "dark:border-white/10 dark:bg-black/10",
            )}
          >
            <div
              id={listId}
              role="log"
              aria-label="Chat messages"
              aria-live="polite"
              className="no-scrollbar min-h-0 flex-1 overflow-y-auto p-4"
            >
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      message.role === "user" ? "justify-end" : "justify-start",
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[90%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                        message.role === "user"
                          ? cn(
                              "bg-emerald-500 text-zinc-950",
                              "dark:bg-emerald-400 dark:text-zinc-950",
                            )
                          : cn(
                              "border border-zinc-200/70 bg-white text-zinc-800",
                              "dark:border-white/10 dark:bg-white/5 dark:text-zinc-100",
                            ),
                      )}
                    >
                      {message.role === "assistant"
                        ? renderMarkdownMessage(message.content)
                        : message.content}
                    </div>
                  </div>
                ))}

                {isSending ? (
                  <div className="flex justify-start">
                    <div
                      className={cn(
                        "inline-flex items-center gap-2 rounded-2xl px-3.5 py-2.5 text-sm",
                        "border border-zinc-200/70 bg-white text-zinc-700",
                        "dark:border-white/10 dark:bg-white/5 dark:text-zinc-200",
                      )}
                    >
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full bg-emerald-500",
                          "dark:bg-emerald-300",
                        )}
                        aria-hidden="true"
                      />
                      Thinking...
                    </div>
                  </div>
                ) : null}

                <div ref={bottomRef} />
              </div>
            </div>

            <form
              className={cn(
                "border-t border-zinc-200/70 bg-white/60 p-3",
                "dark:border-white/10 dark:bg-black/10",
              )}
              onSubmit={(event) => {
                event.preventDefault();
                void sendMessage(value);
              }}
            >
              <label htmlFor={inputId} className="sr-only">
                Message
              </label>

              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  id={inputId}
                  rows={1}
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      void sendMessage(value);
                    }
                  }}
                  aria-describedby={status ? `${inputId}-status` : undefined}
                  placeholder="Ask about projects, skills, background..."
                  className={cn(
                    "h-11 w-full resize-none rounded-2xl px-3 py-2 text-sm leading-relaxed",
                    "border border-zinc-200/70 bg-white text-zinc-900 placeholder:text-zinc-500",
                    "focus:ring-2 focus:ring-emerald-400/50",
                    "dark:border-white/10 dark:bg-zinc-950/40 dark:text-zinc-50 dark:placeholder:text-zinc-400",
                  )}
                  disabled={isSending}
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="h-11 w-11 rounded-2xl px-0"
                  disabled={isSending || !value.trim()}
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>

              {status ? (
                <p
                  id={`${inputId}-status`}
                  className="mt-2 text-xs font-semibold text-rose-600 dark:text-rose-300"
                >
                  {status.message}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
