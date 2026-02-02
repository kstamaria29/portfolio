import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Download, Linkedin, Mail, Send } from "lucide-react";

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

  const endpoint = contact.formspree.formId
    ? `https://formspree.io/f/${contact.formspree.formId}`
    : null;

  const iconByKey = {
    mail: Mail,
    linkedin: Linkedin,
    download: Download,
  } as const;

  return (
    <motion.section
      id={sectionIds.contact}
      className="scroll-mt-24 border-t border-zinc-200/60 py-20 dark:border-white/10"
      {...motionProps}
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            {contact.heading}
          </h2>
          <div className="mx-auto mt-6 h-px w-44 bg-zinc-200/70 dark:bg-white/10" />
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            {contact.description}
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div
            className={cn(
              "rounded-3xl border border-zinc-200/70 bg-white p-7 shadow-sm",
              "dark:border-white/10 dark:bg-white/5",
            )}
          >
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              {contact.infoCard.heading}
            </h3>

            <div className="mt-8 space-y-6">
              {contact.infoCard.items.map((item) => {
                const Icon = iconByKey[item.icon];
                const external = item.href.startsWith("http");
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    className={cn(
                      "group flex items-start gap-4 rounded-2xl p-3 -m-3",
                      "hover:bg-zinc-100/70 dark:hover:bg-white/5",
                    )}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    download={item.icon === "download" ? true : undefined}
                  >
                    <div
                      className={cn(
                        "mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
                        "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
                      )}
                      aria-hidden="true"
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.label}</p>
                      <p className="mt-0.5 truncate text-sm font-semibold text-zinc-900 group-hover:underline dark:text-zinc-50">
                        {item.value}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="mt-8 h-px bg-zinc-200/60 dark:bg-white/10" />

            <div className="mt-8">
              <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {contact.status.heading}
              </h4>
              <div className="mt-4 flex items-start gap-3">
                <span
                  className={cn(
                    "mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full",
                    contact.status.available ? "bg-emerald-500" : "bg-zinc-400",
                  )}
                  aria-hidden="true"
                />
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {contact.status.message}
                </p>
              </div>
            </div>
          </div>

          <div
            className={cn(
              "rounded-3xl border border-zinc-200/70 bg-white p-7 shadow-sm",
              "dark:border-white/10 dark:bg-white/5",
            )}
          >
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              {contact.formCard.heading}
            </h3>

            {endpoint ? (
              <form
                className="mt-8"
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
                <div className="grid gap-5">
                  <label className="sr-only" htmlFor="contact-name">
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    required
                    className={cn(
                      "h-12 rounded-xl border border-zinc-200/70 bg-white px-4 text-sm text-zinc-900 shadow-sm",
                      "placeholder:text-sky-700/60 dark:border-white/10 dark:bg-zinc-950/40 dark:text-zinc-50 dark:placeholder:text-sky-300/50",
                      "focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-0 dark:focus-visible:ring-emerald-300",
                    )}
                    placeholder="Your Name"
                    autoComplete="name"
                  />

                  <label className="sr-only" htmlFor="contact-email">
                    Your email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    className={cn(
                      "h-12 rounded-xl border border-zinc-200/70 bg-white px-4 text-sm text-zinc-900 shadow-sm",
                      "placeholder:text-sky-700/60 dark:border-white/10 dark:bg-zinc-950/40 dark:text-zinc-50 dark:placeholder:text-sky-300/50",
                      "focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-0 dark:focus-visible:ring-emerald-300",
                    )}
                    placeholder="Your Email"
                    autoComplete="email"
                  />

                  <label className="sr-only" htmlFor="contact-subject">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    className={cn(
                      "h-12 rounded-xl border border-zinc-200/70 bg-white px-4 text-sm text-zinc-900 shadow-sm",
                      "placeholder:text-sky-700/60 dark:border-white/10 dark:bg-zinc-950/40 dark:text-zinc-50 dark:placeholder:text-sky-300/50",
                      "focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-0 dark:focus-visible:ring-emerald-300",
                    )}
                    placeholder="Subject"
                    autoComplete="off"
                  />

                  <label className="sr-only" htmlFor="contact-message">
                    Your message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={6}
                    className={cn(
                      "resize-none rounded-xl border border-zinc-200/70 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm",
                      "placeholder:text-sky-700/60 dark:border-white/10 dark:bg-zinc-950/40 dark:text-zinc-50 dark:placeholder:text-sky-300/50",
                      "focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-0 dark:focus-visible:ring-emerald-300",
                    )}
                    placeholder="Your Message"
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={status === "submitting"}
                    className="mt-1 h-12 w-full justify-center"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    {status === "submitting" ? "Sending..." : contact.formCard.buttonLabel}
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
              </form>
            ) : (
              <div className="mt-8 space-y-4">
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  Add your Formspree form ID in{" "}
                  <code className="font-mono">src/content/contact.ts</code> to enable the
                  form. For now, send an email instead.
                </p>
                <Button href={`mailto:${contact.email}`} variant="primary" className="h-12 w-full justify-center">
                  <Mail className="h-4 w-4" aria-hidden="true" />
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
