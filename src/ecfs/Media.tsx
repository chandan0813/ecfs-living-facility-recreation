import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { SectionTag } from "./Sections";
import { showreel, type Clip } from "./videos";
import { useVideoLightbox } from "./useVideoLightbox";

function canAutoplay() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return !connection?.saveData;
}

/**
 * Muted, looping background video that only downloads and plays while on screen.
 * Renders nothing visible until it is actually playing, so the poster/photo beneath shows
 * through for reduced-motion users, data savers, or if the file is missing.
 */
export function SmartVideo({
  src,
  className = "",
  parallax,
}: {
  src: string;
  className?: string;
  parallax?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const video = ref.current;
    if (!video || !canAutoplay()) return;
    // React doesn't reliably apply `muted` to hydrated <video> elements, and browsers block
    // unmuted autoplay, so force it before every play attempt.
    video.muted = true;
    video.defaultMuted = true;
    let inView = false;
    const sync = () => {
      if (inView && !document.hidden) {
        if (!video.getAttribute("src")) video.src = src;
        video.muted = true;
        void video.play().catch(() => {});
      } else video.pause();
    };
    // Retry once data is ready (an early play() can be rejected while the source loads).
    video.addEventListener("canplay", sync);
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry?.isIntersecting ?? false;
        sync();
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(video);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      video.removeEventListener("canplay", sync);
      video.pause();
    };
  }, [src]);
  return (
    <video
      ref={ref}
      aria-hidden="true"
      tabIndex={-1}
      muted
      loop
      playsInline
      preload="none"
      data-parallax={parallax}
      onPlaying={() => setPlaying(true)}
      className={`${className} transition-opacity duration-1000 ${playing ? "opacity-100" : "opacity-0"}`}
    />
  );
}

const placeholderNote = import.meta.env.DEV;

function VideoCard({
  clip,
  big = false,
  className = "",
  onOpen,
}: {
  clip: Clip;
  big?: boolean;
  className?: string;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      data-tilt
      onClick={onOpen}
      aria-label={`Play video: ${clip.title}`}
      className={`reveal group relative isolate flex min-h-64 flex-col justify-end overflow-hidden rounded-[1.75rem] bg-ink p-5 text-left text-on-ink shadow-soft transition-shadow hover:shadow-lift md:p-6 ${className}`}
    >
      <div className="brand-panel absolute inset-0 -z-30" />
      <SmartVideo src={clip.src} className="absolute inset-0 -z-20 size-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
      <span
        className={`absolute top-1/2 left-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-on-ink/20 backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:bg-on-ink group-hover:text-ink ${big ? "size-20" : "size-14"}`}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-ping rounded-full bg-on-ink/25 [animation-duration:2.4s]"
        />
        <Play size={big ? 28 : 20} className="relative ml-1 fill-current" aria-hidden="true" />
      </span>
      {placeholderNote && (
        <span className="absolute top-4 right-4 rounded-full bg-amber-400 px-2.5 py-1 text-[.65rem] font-bold text-ink">
          Placeholder clip
        </span>
      )}
      <span className="mb-2 w-fit rounded-full bg-aqua px-3 py-1 text-[.7rem] font-bold">
        {clip.label}
      </span>
      <span
        className={`block font-extrabold leading-tight ${big ? "text-2xl md:text-3xl" : "text-lg"}`}
      >
        {clip.title}
      </span>
      {big && <span className="mt-2 block max-w-md text-sm text-on-ink/80">{clip.text}</span>}
    </button>
  );
}

/** "See our teams at work" gallery of looping clips that open in the full-screen player. */
export function VideoShowcase({
  title = "See our teams at work.",
  lead = "Real routines, real equipment. Tap any clip to watch it full screen.",
}: {
  title?: string;
  lead?: string;
}) {
  const { open, element } = useVideoLightbox();
  return (
    <section id="at-work" className="py-16 md:py-24">
      <div className="site-wrap">
        <div className="reveal mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-12">
          <div className="max-w-2xl">
            <SectionTag>On site</SectionTag>
            <h2 className="section-title">{title}</h2>
            <p className="section-lead mt-4 max-w-xl">{lead}</p>
          </div>
          <button type="button" className="btn-pill btn-primary" onClick={() => open(0)}>
            <Play size={16} className="fill-current" aria-hidden="true" /> Watch the showreel
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 lg:gap-5">
          <VideoCard
            clip={showreel[0]!}
            big
            onOpen={() => open(0)}
            className="md:col-span-2 lg:row-span-2 lg:min-h-[32rem]"
          />
          <VideoCard clip={showreel[1]!} onOpen={() => open(1)} className="lg:col-span-2" />
          <VideoCard clip={showreel[2]!} onOpen={() => open(2)} />
          <VideoCard clip={showreel[3]!} onOpen={() => open(3)} />
        </div>
      </div>
      {element}
    </section>
  );
}
