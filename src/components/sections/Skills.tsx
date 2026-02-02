import { motion, useReducedMotion } from "motion/react";

import { skillsSection } from "../../content/skills";
import { sectionIds } from "../../content/site";
import { cn } from "../../lib/cn";
import { getSectionMotionProps } from "../../lib/motion";
import { Container } from "../layout/Container";

function clampPercent(value: number) {
  if (Number.isNaN(value)) return 0;
  return Math.max(0, Math.min(100, value));
}

function SkillBar({
  label,
  level,
  barColorClassName,
}: {
  label: string;
  level: number;
  barColorClassName: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const percent = clampPercent(level);
  const scaleX = percent / 100;
  const fillClassName = cn(
    "h-full w-full origin-left rounded-full bg-gradient-to-r",
    barColorClassName,
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{label}</p>
        <p className="text-sm font-semibold tabular-nums text-zinc-700 dark:text-zinc-200">
          {percent}%
        </p>
      </div>

      <div
        role="meter"
        aria-label={`${label} proficiency`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        className={cn(
          "h-2 w-full rounded-full bg-zinc-200",
          "dark:bg-white/15",
        )}
      >
        {shouldReduceMotion ? (
          <div className={fillClassName} style={{ transform: `scaleX(${scaleX})` }} />
        ) : (
          <motion.div
            className={fillClassName}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7 }}
          />
        )}
      </div>
    </div>
  );
}

export function Skills() {
  const shouldReduceMotion = useReducedMotion();
  const motionProps = getSectionMotionProps(shouldReduceMotion);

  return (
    <motion.section
      id={sectionIds.skills}
      className="scroll-mt-24 border-t border-zinc-200/60 py-20 dark:border-white/10"
      {...motionProps}
    >
      <Container>
        <div className="flex flex-col gap-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              {skillsSection.heading}
            </h2>
            <div className="mx-auto mt-6 h-px w-44 bg-zinc-200/70 dark:bg-white/10" />
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              {skillsSection.description}
            </p>
          </div>

          <div
            className={cn(
              "mt-6 rounded-3xl border border-zinc-200/70 bg-zinc-50 p-6 shadow-sm",
              "dark:border-white/10 dark:bg-zinc-950/40",
            )}
          >
            <div className="grid gap-10 lg:grid-cols-3">
              {skillsSection.categories.map((category) => (
                <div key={category.id} className="space-y-6">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                      {category.title}
                    </h3>
                    <span
                      className={cn(
                        "h-1.5 w-10 rounded-full bg-gradient-to-r",
                        category.barColorClassName,
                      )}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="space-y-6">
                    {category.skills.map((skill) => (
                      <SkillBar
                        key={skill.id}
                        label={skill.label}
                        level={skill.level}
                        barColorClassName={category.barColorClassName}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </motion.section>
  );
}

