import { Bot, Send, ShieldCheck, Sparkles, Trash2 } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";

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
    inputRef.current?.focus();
  }

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -inset-8 -z-10 rounded-[2.75rem] blur-3xl",
          "bg-linear-to-br from-emerald-400/25 via-sky-400/15 to-fuchsia-400/10",
          "dark:from-emerald-300/15 dark:via-sky-300/10 dark:to-fuchsia-300/10",
        )}
      />

      <div className="rounded-3xl bg-linear-to-br from-emerald-400/30 via-sky-400/20 to-fuchsia-400/30 p-px">
        <div
          className={cn(
            "rounded-3xl border border-zinc-200/70 bg-white/80 p-6 shadow-sm backdrop-blur",
            "dark:border-white/10 dark:bg-zinc-950/35",
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "inline-flex h-9 w-9 items-center justify-center rounded-2xl",
                    "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-300",
                  )}
                  aria-hidden="true"
                >
                  <Bot className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <h3 className="truncate text-base font-semibold text-zinc-900 dark:text-zinc-50">
                    {portfolioAssistant.heading}
                  </h3>
                  <p className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-300">
                    {portfolioAssistant.description}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2.5 py-1",
                    "border border-zinc-200/70 bg-white text-zinc-700",
                    "dark:border-white/10 dark:bg-white/5 dark:text-zinc-200",
                  )}
                >
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  Portfolio-only
                </span>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2.5 py-1",
                    "border border-zinc-200/70 bg-white text-zinc-700",
                    "dark:border-white/10 dark:bg-white/5 dark:text-zinc-200",
                  )}
                >
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  Powered by OpenAI
                </span>
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

          <div className="mt-5 flex flex-wrap gap-2">
            {portfolioAssistant.suggestedQuestions.map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => void sendMessage(question)}
                disabled={isSending}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                  "border border-zinc-200/70 bg-white text-zinc-700 hover:bg-zinc-50",
                  "disabled:opacity-60",
                  "dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 dark:hover:bg-white/10",
                )}
              >
                {question}
              </button>
            ))}
          </div>

          <div
            className={cn(
              "mt-5 flex h-[22rem] flex-col overflow-hidden rounded-2xl",
              "border border-zinc-200/70 bg-white/70",
              "dark:border-white/10 dark:bg-black/10",
            )}
          >
            <div
              id={listId}
              role="log"
              aria-label="Chat messages"
              aria-live="polite"
              className="no-scrollbar flex-1 overflow-y-auto p-4"
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
                      {message.content}
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
                  rows={2}
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
                    "min-h-[44px] w-full resize-none rounded-2xl px-3 py-2 text-sm leading-relaxed",
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

              <div className="mt-2 flex items-center justify-between gap-3">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Press Enter to send, Shift+Enter for a new line.
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Prefer email?{" "}
                  <a className="font-semibold underline" href={`mailto:${contact.email}`}>
                    {contact.email}
                  </a>
                </p>
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
