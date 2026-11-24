import { useEffect } from "react";

/**
 * Client-only motion layer. Server-rendered content is fully visible without it:
 * hiding only happens after `motion-ready` is set on <html>, and never when the
 * visitor prefers reduced motion.
 *
 * - `.reveal` (optionally `data-reveal="left|right|zoom"`): animates in when scrolled into view;
 *   siblings are staggered automatically.
 * - `.reveal-watch`: gets `is-visible` without being hidden (for drawing lines etc.).
 * - `[data-parallax="0.1"]`: drifts with scroll, relative to its parent.
 * - `[data-tilt]`: subtle 3D tilt and spotlight that follow a fine pointer.
 * - Sets `--scroll-progress` and `data-scrolled` on <html> for the progress bar and header.
 *
 * Render it inside each page (the Footer does this) rather than at the root: page content
 * hydrates after the root, and touching its DOM earlier causes hydration mismatches.
 */
export function ScrollEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];

    // Scroll progress, header state and parallax share one rAF-throttled handler.
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const max = root.scrollHeight - window.innerHeight;
      root.style.setProperty("--scroll-progress", String(max > 0 ? Math.min(1, y / max) : 0));
      root.toggleAttribute("data-scrolled", y > 24);
      if (reduce) return;
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const box = (el.parentElement ?? el).getBoundingClientRect();
        if (box.bottom < 0 || box.top > window.innerHeight) return;
        const speed = Number(el.dataset["parallax"]) || 0.1;
        const limit = box.height * 0.09;
        const shift = Math.max(-limit, Math.min(limit, -box.top * speed));
        el.style.setProperty("--parallax-y", `${shift.toFixed(1)}px`);
      });
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    cleanups.push(() => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    });
    update();

    if (reduce) return () => cleanups.forEach((fn) => fn());

    // Reveal on scroll.
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      },
      // Threshold 0: fire as soon as any part shows. A ratio threshold can never be met by
      // elements taller than the viewport (short windows, landscape phones), leaving them hidden.
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );
    // Tracked per effect run (not on the DOM) so a re-run after cleanup re-binds everything.
    const bound = new WeakSet<Element>();
    const bind = (instant: boolean) => {
      document
        .querySelectorAll<HTMLElement>(".reveal:not(.is-visible), .reveal-watch:not(.is-visible)")
        .forEach((el) => {
          if (bound.has(el)) return;
          bound.add(el);
          const peers = el.parentElement
            ? Array.from(el.parentElement.children).filter((c) => c.classList.contains("reveal"))
            : [];
          const index = peers.indexOf(el);
          if (index > 0) el.style.setProperty("--reveal-delay", `${Math.min(index, 7) * 85}ms`);
          const box = el.getBoundingClientRect();
          const inView = box.top < window.innerHeight * 0.92 && box.bottom > 0;
          // Already scrolled past (e.g. restored scroll position): show without animating.
          if (box.bottom <= 0) el.classList.add("is-visible");
          else if (inView && instant) el.classList.add("is-visible");
          else if (inView) requestAnimationFrame(() => el.classList.add("is-visible"));
          else io.observe(el);
        });
    };
    // Content already on screen at hydration stays put (no flash); the rest animates in.
    bind(true);
    // Off-screen items switch to their hidden state instantly (no fade-out), then animate normally.
    root.classList.add("motion-init", "motion-ready");
    void root.offsetHeight;
    const initTimer = window.setTimeout(() => root.classList.remove("motion-init"), 60);
    cleanups.push(() => window.clearTimeout(initTimer));
    let pending = false;
    const mo = new MutationObserver(() => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => {
        pending = false;
        bind(false);
        update();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });
    cleanups.push(() => {
      io.disconnect();
      mo.disconnect();
      root.classList.remove("motion-ready");
    });

    // Pointer tilt + spotlight for fine pointers only.
    if (matchMedia("(pointer: fine)").matches) {
      let current: HTMLElement | null = null;
      const reset = (el: HTMLElement | null) => {
        el?.style.removeProperty("--rx");
        el?.style.removeProperty("--ry");
      };
      const onMove = (event: PointerEvent) => {
        const el = (event.target as Element | null)?.closest<HTMLElement>("[data-tilt]") ?? null;
        if (el !== current) {
          reset(current);
          current = el;
        }
        if (!el) return;
        const box = el.getBoundingClientRect();
        const px = (event.clientX - box.left) / box.width;
        const py = (event.clientY - box.top) / box.height;
        el.style.setProperty("--rx", `${((0.5 - py) * 5).toFixed(2)}deg`);
        el.style.setProperty("--ry", `${((px - 0.5) * 7).toFixed(2)}deg`);
        el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
        el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
      };
      const onLeave = () => {
        reset(current);
        current = null;
      };
      document.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
      cleanups.push(() => {
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerleave", onLeave);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}

/** Static bar; its width comes from `--scroll-progress`, set by ScrollEffects. */
export function ScrollProgress() {
  return <div className="scroll-progress" aria-hidden="true" />;
}
