import { motion, useReducedMotion } from "motion/react";

import { reviews, reviewsSection } from "../../content/reviews";
import { sectionIds } from "../../content/site";
import { getSectionMotionProps } from "../../lib/motion";
import { Container } from "../layout/Container";
import { Card } from "../ui/Card";

export function Reviews() {
  const shouldReduceMotion = useReducedMotion();
  const motionProps = getSectionMotionProps(shouldReduceMotion);

  return (
    <motion.section
      id={sectionIds.reviews}
      className="scroll-mt-24 border-t border-zinc-200/60 py-20 dark:border-white/10"
      {...motionProps}
    >
      <Container>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            {reviewsSection.heading}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            {reviewsSection.description}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <Card key={review.id} className="flex h-full flex-col">
              <div className="space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-200">
                {(Array.isArray(review.quote) ? review.quote : [review.quote]).map(
                  (paragraph, index) => (
                    <p key={index}>“{paragraph}”</p>
                  ),
                )}
              </div>
              <div className="mt-6">
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  {review.name}
                </p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  {review.title} · {review.company}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </motion.section>
  );
}
