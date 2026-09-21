"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import ImageReveal from "@/components/motion/ImageReveal";
import type { GalleryPhoto } from "@/lib/projects";

/**
 * Project photo set (design system §5). The first photo is the cover, shown
 * large in the "mounted print" frame; any further photos sit in a grid below.
 * Clicking any photo opens a fullscreen lightbox that steps through the whole
 * set — arrows, swipe, ← → keys, Esc. Only the active lightbox image is in the
 * DOM, so the rest never download until asked for.
 */
export default function ProjectGallery({
  photos,
  projectName,
}: {
  photos: GalleryPhoto[];
  projectName: string;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const cover = photos[0];
  const rest = photos.slice(1);
  const count = photos.length;

  const show = useCallback((i: number) => setOpen(i), []);
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setOpen((i) => (i === null ? i : (i + dir + count) % count)),
    [count]
  );

  // Keyboard control + scroll lock while the lightbox is open.
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, step]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) > 48) step(delta < 0 ? 1 : -1);
  };

  const active = open === null ? null : photos[open];

  return (
    <>
      {/* Cover — framed like a mounted print, opens the lightbox at photo 1 */}
      <ImageReveal parallax className="rounded-card">
        <button
          type="button"
          onClick={() => show(0)}
          aria-label={`View ${projectName} photos full screen`}
          className="group block w-full cursor-zoom-in"
        >
          <Image
            src={cover.url}
            alt={cover.alt}
            width={1800}
            height={1350}
            sizes="(max-width: 1023px) 100vw, 66vw"
            priority
            className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
        </button>
      </ImageReveal>

      {/* Further photos of the same site */}
      {rest.length > 0 && (
        <Reveal
          stagger={0.08}
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {rest.map((photo, i) => (
            <figure key={photo.url}>
              <button
                type="button"
                onClick={() => show(i + 1)}
                aria-label={`View photo ${i + 2} of ${count} full screen`}
                className="group block w-full cursor-zoom-in overflow-hidden rounded-card"
              >
                <Image
                  src={photo.url}
                  alt={photo.alt}
                  width={1200}
                  height={900}
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </button>
              {photo.caption && (
                <figcaption className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-text-muted">
                  {photo.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </Reveal>
      )}

      {/* Fullscreen lightbox */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${projectName} — photo ${(open ?? 0) + 1} of ${count}`}
          className="fixed inset-0 z-[100] flex flex-col bg-charcoal/97"
          onClick={close}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Top bar — counter + close */}
          <div className="flex items-center justify-between px-6 py-5 md:px-10">
            <p className="font-mono text-label font-medium uppercase text-stone-muted">
              {String((open ?? 0) + 1).padStart(2, "0")} /{" "}
              {String(count).padStart(2, "0")}
            </p>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="flex size-11 items-center justify-center rounded-full border border-bone/40 text-2xl leading-none text-bone transition-colors hover:border-ember hover:text-ember"
            >
              ×
            </button>
          </div>

          {/* Stage — stop propagation so clicks on the image don't close */}
          <div
            className="flex flex-1 items-center justify-center px-4 pb-4 md:px-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex max-h-full max-w-6xl flex-col items-center">
              {/* key forces a fresh element per step so nothing stale lingers */}
              <Image
                key={active.url}
                src={active.url}
                alt={active.alt}
                width={1800}
                height={1350}
                sizes="90vw"
                className="max-h-[78vh] w-auto rounded-card object-contain"
              />
              {active.caption && (
                <p className="mt-4 text-center font-mono text-[0.7rem] uppercase tracking-[0.1em] text-stone-muted">
                  {active.caption}
                </p>
              )}
            </div>
          </div>

          {/* Prev / next */}
          {count > 1 && (
            <div
              className="flex items-center justify-center gap-4 pb-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous photo"
                className="flex size-12 items-center justify-center rounded-full border border-bone/40 text-bone transition-colors hover:border-ember hover:text-ember"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next photo"
                className="flex size-12 items-center justify-center rounded-full border border-bone/40 text-bone transition-colors hover:border-ember hover:text-ember"
              >
                →
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
