import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

import { projects, projectsSection, type ProjectCategory } from "../../content/projects";
import { sectionIds } from "../../content/site";
import { cn } from "../../lib/cn";
import { getHoverTapMotion, getSectionMotionProps } from "../../lib/motion";
import { Container } from "../layout/Container";
import { Badge } from "../ui/Badge";
import { ImageLightbox } from "../ui/ImageLightbox";
import { Modal } from "../ui/Modal";

export function Projects() {
  const shouldReduceMotion = useReducedMotion();
  const sectionMotionProps = getSectionMotionProps(shouldReduceMotion);
  const hoverTap = getHoverTapMotion(shouldReduceMotion);

  const categories = projectsSection.categories;
  const defaultCategory: ProjectCategory =
    categories.find((c) => c.id === "production")?.id ?? categories[0].id;

  const [activeCategory, setActiveCategory] = useState<ProjectCategory>(defaultCategory);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const galleryStripRef = useRef<HTMLDivElement | null>(null);
  const [galleryOverflowing, setGalleryOverflowing] = useState(false);
  const [galleryCanScrollLeft, setGalleryCanScrollLeft] = useState(false);
  const [galleryCanScrollRight, setGalleryCanScrollRight] = useState(false);

  useEffect(() => {
    setActiveProjectId(null);
    triggerRef.current = null;
    setLightboxOpen(false);
  }, [activeCategory]);

  const activeProject = useMemo(
    () => projects.find((p) => p.id === activeProjectId) ?? null,
    [activeProjectId],
  );

  useEffect(() => {
    if (!activeProject) setLightboxOpen(false);
  }, [activeProject]);

  useEffect(() => {
    const el = galleryStripRef.current;
    if (!el) return;

    const update = () => {
      const isOverflowing = el.scrollWidth > el.clientWidth + 2;
      setGalleryOverflowing(isOverflowing);
      setGalleryCanScrollLeft(el.scrollLeft > 0);
      setGalleryCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [activeProjectId, lightboxOpen]);

  function scrollGalleryStrip(direction: "prev" | "next") {
    const el = galleryStripRef.current;
    if (!el) return;
    const delta = Math.max(180, Math.floor(el.clientWidth * 0.8));
    const left = direction === "prev" ? -delta : delta;
    el.scrollBy({ left, behavior: shouldReduceMotion ? "auto" : "smooth" });
  }

  const visibleProjects = useMemo(
    () => projects.filter((p) => p.category === activeCategory),
    [activeCategory],
  );

  return (
    <motion.section
      id={sectionIds.projects}
      className="scroll-mt-24 border-t border-zinc-200/60 py-20 dark:border-white/10"
      {...sectionMotionProps}
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            {projectsSection.heading}
          </h2>
          <div className="mx-auto mt-6 h-px w-44 bg-zinc-200/70 dark:bg-white/10" />
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            {projectsSection.description}
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <div
            role="tablist"
            aria-label="Project categories"
            className={cn(
              "inline-flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-zinc-200/70 bg-white p-2 shadow-sm",
              "dark:border-white/10 dark:bg-white/5",
            )}
            onKeyDown={(e) => {
              if (
                e.key !== "ArrowLeft" &&
                e.key !== "ArrowRight" &&
                e.key !== "Home" &&
                e.key !== "End"
              )
                return;

              e.preventDefault();
              const currentIndex = categories.findIndex((c) => c.id === activeCategory);
              if (currentIndex === -1) return;

              const lastIndex = categories.length - 1;
              const nextIndex =
                e.key === "Home"
                  ? 0
                  : e.key === "End"
                    ? lastIndex
                    : e.key === "ArrowRight"
                      ? (currentIndex + 1) % categories.length
                      : (currentIndex - 1 + categories.length) % categories.length;

              const nextCategory = categories[nextIndex];
              setActiveCategory(nextCategory.id);
              tabRefs.current[nextIndex]?.focus();
            }}
          >
            {categories.map((category, index) => {
              const selected = category.id === activeCategory;
              const count = projects.filter((p) => p.category === category.id).length;

              return (
                <button
                  key={category.id}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`projects-tab-${category.id}`}
                  aria-controls={`projects-panel-${category.id}`}
                  aria-selected={selected}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-colors",
                    selected
                      ? "bg-emerald-500 text-zinc-950 dark:bg-emerald-400"
                      : "text-zinc-700 hover:bg-zinc-100/70 dark:text-zinc-200 dark:hover:bg-white/10",
                  )}
                >
                  <span>{category.label}</span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs tabular-nums",
                      selected
                        ? "bg-zinc-950/10 text-zinc-950 dark:bg-zinc-950/15"
                        : "bg-zinc-200/70 text-zinc-700 dark:bg-white/10 dark:text-zinc-200",
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          role="tabpanel"
          id={`projects-panel-${activeCategory}`}
          aria-labelledby={`projects-tab-${activeCategory}`}
          className="mt-12"
        >
          {visibleProjects.length === 0 ? (
            <p className="text-center text-sm text-zinc-600 dark:text-zinc-300">
              No projects in this category yet.
            </p>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProjects.map((project) => (
              <motion.button
                key={project.id}
                type="button"
                className={cn(
                  "group rounded-2xl border border-zinc-200/70 bg-white p-6 text-left shadow-sm",
                  "hover:border-zinc-200 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20",
                )}
                onClick={(e) => {
                  triggerRef.current = e.currentTarget;
                  setActiveProjectId(project.id);
                }}
                {...hoverTap}
              >
                {project.images[0] ? (
                  <div className="-mx-6 -mt-6 mb-5 overflow-hidden rounded-t-2xl bg-zinc-50 dark:bg-white/5">
                    <img
                      src={project.images[0].src}
                      alt={project.images[0].alt}
                      className="aspect-video w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div
                      className="h-px bg-zinc-200/70 dark:bg-white/10"
                      aria-hidden="true"
                    />
                  </div>
                ) : null}
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                    {project.title}
                  </h3>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    {project.date ?? ""}
                  </span>
                </div>
                <p className="mt-3 sm:h-33 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {project.shortDescription}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.techStack.slice(0, 6).map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
                <div className="mt-5 text-sm font-semibold text-emerald-700 group-hover:underline dark:text-emerald-300">
                  View details
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </Container>

      <Modal
        open={!!activeProject}
        title={activeProject?.title ?? "Project"}
        onClose={() => {
          setLightboxOpen(false);
          setActiveProjectId(null);
          triggerRef.current?.focus();
        }}
      >
        {activeProject ? (
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                Overview
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                {activeProject.fullDescription}
              </p>
            </div>

            {activeProject.images.length > 0 ? (
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  Gallery
                </h3>
                <div className="relative mt-3">
                  {galleryOverflowing ? (
                    <button
                      type="button"
                      onClick={() => scrollGalleryStrip("prev")}
                      disabled={!galleryCanScrollLeft}
                      className={cn(
                        "absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-xl p-2",
                        "bg-white/70 text-zinc-900 shadow-sm backdrop-blur",
                        "disabled:opacity-40 dark:bg-zinc-950/60 dark:text-zinc-50",
                      )}
                      aria-label="Scroll thumbnails left"
                    >
                      <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </button>
                  ) : null}

                  <div
                    ref={galleryStripRef}
                    className={cn(
                      "no-scrollbar overflow-x-auto pb-1",
                      galleryOverflowing ? "px-10" : "",
                    )}
                  >
                    <div
                      className={cn(
                        "flex min-w-max items-center gap-2",
                        galleryOverflowing ? "justify-start" : "justify-center",
                      )}
                    >
                      {activeProject.images.map((img, i) => (
                        <button
                          key={img.src}
                          type="button"
                          onClick={() => {
                            setLightboxIndex(i);
                            setLightboxOpen(true);
                          }}
                          className={cn(
                            "overflow-hidden rounded-lg border border-zinc-200/70 bg-zinc-50",
                            "hover:border-zinc-200 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20",
                          )}
                          aria-label={`Open image ${i + 1} of ${activeProject.images.length}`}
                        >
                          <img
                            src={img.src}
                            alt={img.alt}
                            className="h-16 w-24 object-cover"
                            loading="lazy"
                            decoding="async"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {galleryOverflowing ? (
                    <button
                      type="button"
                      onClick={() => scrollGalleryStrip("next")}
                      disabled={!galleryCanScrollRight}
                      className={cn(
                        "absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-xl p-2",
                        "bg-white/70 text-zinc-900 shadow-sm backdrop-blur",
                        "disabled:opacity-40 dark:bg-zinc-950/60 dark:text-zinc-50",
                      )}
                      aria-label="Scroll thumbnails right"
                    >
                      <ChevronRight className="h-5 w-5" aria-hidden="true" />
                    </button>
                  ) : null}
                </div>
              </div>
            ) : null}

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  Tech stack
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {activeProject.techStack.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  Links
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {activeProject.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-xl border border-zinc-200/70 bg-white px-3 py-2 text-sm font-semibold text-zinc-800 no-underline",
                        "hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10",
                      )}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    >
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {activeProject.highlights?.length ? (
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  Highlights
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                  {activeProject.highlights.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        ) : null}
      </Modal>

      <ImageLightbox
        open={lightboxOpen}
        title={activeProject?.title}
        images={activeProject?.images ?? []}
        index={lightboxIndex}
        onIndexChange={setLightboxIndex}
        onClose={() => setLightboxOpen(false)}
      />
    </motion.section>
  );
}
