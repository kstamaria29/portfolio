import { motion, useReducedMotion } from "motion/react";

import { testimonials, testimonialsSection } from "../../content/testimonials";
import { sectionIds } from "../../content/site";
import { getSectionMotionProps } from "../../lib/motion";
import { Container } from "../layout/Container";
import { Card } from "../ui/Card";

export function Testimonials() {
  const shouldReduceMotion = useReducedMotion();
  const motionProps = getSectionMotionProps(shouldReduceMotion);

  return (
    <motion.section
      id={sectionIds.testimonials}
      className="scroll-mt-24 border-t border-zinc-200/60 py-20 dark:border-white/10 3xl:py-24"
      {...motionProps}
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center 3xl:max-w-4xl">
          <h2 className="text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 3xl:text-6xl">
            {testimonialsSection.heading}
          </h2>
          <div className="mx-auto mt-6 h-px w-44 bg-zinc-200/70 dark:bg-white/10 3xl:w-56" />
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 3xl:max-w-3xl 3xl:text-base">
            {testimonialsSection.description}
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 3xl:mt-16 3xl:gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="flex h-full flex-col">
              <div className="space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-200 3xl:text-base">
                {(Array.isArray(testimonial.quote)
                  ? testimonial.quote
                  : [testimonial.quote]
                ).map((paragraph, index) => (
                  <p key={index}>
                    {"\u201c"}
                    {paragraph}
                    {"\u201d"}
                  </p>
                ))}
              </div>
              <div className="mt-6">
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 3xl:text-base">
                  {testimonial.name}
                </p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 3xl:text-sm">
                  {testimonial.title} {"\u00b7"} {testimonial.company}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </motion.section>
  );
}
