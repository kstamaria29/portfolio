import { useEffect, useId, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { cn } from "../../lib/cn";

const FOCUSABLE_SELECTOR =
  'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])';

type LightboxImage = {
  src: string;
  alt: string;
};

type ImageLightboxProps = {
  open: boolean;
  title?: string;
  images: LightboxImage[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
};

export function ImageLightbox({
  open,
  title,
  images,
  index,
  onIndexChange,
  onClose,
}: ImageLightboxProps) {
  const shouldReduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const titleId = useId();

  const portalTarget = useMemo(() => {
    if (typeof document === "undefined") return null;
    return document.body;
  }, []);

  const safeIndex =
    images.length === 0 ? 0 : ((index % images.length) + images.length) % images.length;
  const active = images[safeIndex];

  useEffect(() => {
    if (!open) return;

    previousActiveElementRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const raf = window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      window.cancelAnimationFrame(raf);
      document.body.style.overflow = previousOverflow;
      previousActiveElementRef.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function setPrev() {
      if (images.length === 0) return;
      onIndexChange((safeIndex - 1 + images.length) % images.length);
    }

    function setNext() {
      if (images.length === 0) return;
      onIndexChange((safeIndex + 1) % images.length);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopImmediatePropagation();
        onClose();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        event.stopImmediatePropagation();
        setPrev();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        event.stopImmediatePropagation();
        setNext();
        return;
      }

      if (event.key !== "Tab") return;
      event.stopImmediatePropagation();
      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusables = Array.from(
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);

      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const focused = document.activeElement as HTMLElement | null;

      if (event.shiftKey) {
        if (!focused || focused === first) {
          event.preventDefault();
          last.focus();
        }
      } else {
        if (focused === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [images.length, onClose, onIndexChange, open, safeIndex]);

  if (!open || !portalTarget || images.length === 0) return null;

  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.18 },
      };

  return createPortal(
    <motion.div
      className="fixed inset-0 z-70 cursor-pointer bg-zinc-950/80 p-4 backdrop-blur-sm"
      onMouseDown={onClose}
      aria-hidden={false}
      {...motionProps}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        className="relative mx-auto flex h-[calc(100vh-2rem)] max-w-6xl cursor-default flex-col"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {title ? (
          <h2 id={titleId} className="sr-only">
            {title}
          </h2>
        ) : null}

        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-zinc-200 tabular-nums">
            {safeIndex + 1}/{images.length}
          </p>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-xl text-zinc-200",
              "hover:bg-white/10",
            )}
            aria-label="Close image viewer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="relative mt-3 flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-2xl bg-black/20">
          <button
            type="button"
            onClick={() => onIndexChange((safeIndex - 1 + images.length) % images.length)}
            className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2 rounded-xl p-3 text-zinc-100",
              "bg-black/30 hover:bg-black/40 focus-visible:ring-2 focus-visible:ring-emerald-300",
            )}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          <img
            src={active.src}
            alt={active.alt}
            className="max-h-[70vh] w-auto max-w-full object-contain"
            loading="eager"
            decoding="async"
          />

          <button
            type="button"
            onClick={() => onIndexChange((safeIndex + 1) % images.length)}
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2 rounded-xl p-3 text-zinc-100",
              "bg-black/30 hover:bg-black/40 focus-visible:ring-2 focus-visible:ring-emerald-300",
            )}
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-4 overflow-x-auto pb-1">
          <div className="mx-auto flex w-max items-center gap-2">
            {images.map((img, i) => {
              const selected = i === safeIndex;
              return (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => onIndexChange(i)}
                  className={cn(
                    "overflow-hidden rounded-lg border bg-white/5",
                    selected
                      ? "border-emerald-300"
                      : "border-white/10 hover:border-white/20",
                  )}
                  aria-label={`Open image ${i + 1} of ${images.length}`}
                  aria-current={selected ? "true" : undefined}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="h-14 w-20 object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>,
    portalTarget,
  );
}
