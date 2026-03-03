import { motion, useReducedMotion } from "motion/react";

import { timeline, timelineSection } from "../../content/timeline";
import { sectionIds } from "../../content/site";
import { cn } from "../../lib/cn";
import { getSectionMotionProps } from "../../lib/motion";
import { Container } from "../layout/Container";
import { Card } from "../ui/Card";

export function Timeline() {
  const shouldReduceMotion = useReducedMotion();
  const sectionMotionProps = getSectionMotionProps(shouldReduceMotion);
  const reduce = Boolean(shouldReduceMotion);

  return (
    <motion.section
      id={sectionIds.timeline}
      className="scroll-mt-24 border-t border-zinc-200/60 py-20 dark:border-white/10 3xl:py-24"
      {...sectionMotionProps}
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center 3xl:max-w-4xl">
          <h2 className="text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 3xl:text-6xl">
            {timelineSection.heading}
          </h2>
          <div className="mx-auto mt-6 h-px w-44 bg-zinc-200/70 dark:bg-white/10 3xl:w-56" />
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 3xl:max-w-3xl 3xl:text-base">
            {timelineSection.description}
          </p>
        </div>

        <div className="relative mt-12 3xl:mt-16">
          <div
            className={cn(
              "pointer-events-none absolute inset-y-0 left-4 w-px bg-zinc-200/70",
              "dark:bg-white/10 md:left-1/2 md:-translate-x-1/2",
            )}
            aria-hidden="true"
          />

          <ol className="space-y-10 3xl:space-y-12">
            {timeline.map((item, index) => {
              const side = index % 2 === 0 ? "right" : "left";
              const isLeft = side === "left";
              const xFrom = reduce ? 0 : isLeft ? -28 : 28;

              return (
                <li
                  key={item.id}
                  className="relative md:grid md:grid-cols-2 md:items-start md:gap-12 3xl:gap-20"
                >
                  <span
                    className={cn(
                      "absolute left-4 top-8 h-3 w-3 -translate-x-1/2 rounded-full bg-emerald-400",
                      "shadow-[0_0_0_6px_rgba(16,185,129,0.14)]",
                      "dark:shadow-[0_0_0_6px_rgba(52,211,153,0.14)] md:left-1/2",
                    )}
                    aria-hidden="true"
                  />

                  <motion.div
                    initial={{ opacity: 0, x: xFrom }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: reduce ? 0.2 : 0.65, ease: "easeOut" }}
                    className={cn(
                      "ml-10",
                      "md:ml-0",
                      isLeft
                        ? "md:col-start-1 md:justify-self-end md:pr-12 3xl:pr-20"
                        : "md:col-start-2 md:pl-12 3xl:pl-20",
                    )}
                  >
                    <Card className="md:max-w-xl 3xl:max-w-2xl">
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 3xl:text-xl">
                          {item.title}
                        </h3>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 3xl:text-sm">
                          {item.caption}
                        </p>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-200 3xl:text-base">
                        {item.description}
                      </p>
                    </Card>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </motion.section>
  );
}
