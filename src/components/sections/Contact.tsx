import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { contact } from "../../content/contact";
import { sectionIds } from "../../content/site";
import { cn } from "../../lib/cn";
import { getSectionMotionProps } from "../../lib/motion";
import { Container } from "../layout/Container";
import { Button } from "../ui/Button";

type Status = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const shouldReduceMotion = useReducedMotion();
  const motionProps = getSectionMotionProps(shouldReduceMotion);

  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const endpoint = useMemo(() => {
    if (!contact.formspree.formId) return null;
    return `https://formspree.io/f/${contact.formspree.formId}`;
  }, []);

  return (
    <motion.section
      id={sectionIds.contact}
      className="scroll-mt-24 border-t border-zinc-200/60 py-20 dark:border-white/10"
      {...motionProps}
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              {contact.heading}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              {contact.description}
            </p>

            <div className="mt-6 space-y-2 text-sm">
              <p className="text-zinc-700 dark:text-zinc-200">
                Email:{" "}
                <a href={`mailto:${contact.email}`} className="font-semibold">
                  {contact.email}
                </a>
              </p>
              <div className="flex flex-wrap items-center gap-3">
                {contact.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm font-medium text-zinc-700 no-underline hover:text-zinc-900 hover:underline dark:text-zinc-300 dark:hover:text-zinc-50"
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div
            className={cn(
              "rounded-2xl border border-zinc-200/70 bg-white p-6 shadow-sm",
              "dark:border-white/10 dark:bg-white/5",
            )}
          >
            {endpoint ? (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setStatus("submitting");
                  setErrorMessage(null);

                  try {
                    const form = e.currentTarget;
                    const formData = new FormData(form);
                    const response = await fetch(endpoint, {
                      method: "POST",
                      body: formData,
                      headers: { Accept: "application/json" },
                    });

                    if (!response.ok) {
                      setStatus("error");
                      setErrorMessage("Something went wrong. Please try again.");
                      return;
                    }

                    form.reset();
                    setStatus("success");
                  } catch {
                    setStatus("error");
                    setErrorMessage("Unable to send right now. Please try again.");
                  }
                }}
              >
                <div className="grid gap-4">
                  <label className="grid gap-1 text-sm">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                      Name
                    </span>
                    <input
                      name="name"
                      required
                      className={cn(
                        "h-11 rounded-xl border border-zinc-200/70 bg-white px-3 text-zinc-900",
                        "placeholder:text-zinc-400 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500",
                      )}
                      placeholder="Your name"
                      autoComplete="name"
                    />
                  </label>
                  <label className="grid gap-1 text-sm">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                      Email
                    </span>
                    <input
                      name="email"
                      type="email"
                      required
                      className={cn(
                        "h-11 rounded-xl border border-zinc-200/70 bg-white px-3 text-zinc-900",
                        "placeholder:text-zinc-400 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500",
                      )}
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                  </label>
                  <label className="grid gap-1 text-sm">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                      Message
                    </span>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      className={cn(
                        "resize-none rounded-xl border border-zinc-200/70 bg-white px-3 py-2 text-zinc-900",
                        "placeholder:text-zinc-400 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500",
                      )}
                      placeholder="Tell me about your project..."
                    />
                  </label>

                  <div className="flex flex-wrap items-center gap-3">
                    <Button type="submit" variant="primary" disabled={status === "submitting"}>
                      {status === "submitting" ? "Sending..." : "Send message"}
                    </Button>
                    {status === "success" ? (
                      <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                        Message sent. Thanks!
                      </p>
                    ) : null}
                    {status === "error" ? (
                      <p className="text-sm font-medium text-rose-700 dark:text-rose-300">
                        {errorMessage ?? "Something went wrong."}
                      </p>
                    ) : null}
                  </div>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  Add your Formspree form ID in{" "}
                  <code className="font-mono">src/content/contact.ts</code> to enable the
                  contact form. For now, use email:
                </p>
                <Button href={`mailto:${contact.email}`} variant="primary">
                  Email me
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </motion.section>
  );
}

