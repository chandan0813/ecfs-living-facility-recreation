import { useCallback, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { showreel, type Clip } from "./videos";

/** Full-screen player for the showreel, with previous/next and keyboard support. */
export function useVideoLightbox(list: Clip[] = showreel) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  // The player's <video> only exists while open, so nothing downloads or plays in the background.
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback((at = 0) => {
    setIndex(at);
    setIsOpen(true);
    dialog.current?.showModal();
  }, []);
  const step = (by: number) => setIndex((i) => (i + by + list.length) % list.length);
  const clip = list[index] ?? list[0]!;
  const element = (
    <dialog
      ref={dialog}
      aria-label="ECFS teams at work"
      className="m-auto w-[min(94vw,64rem)] overflow-visible bg-transparent p-0 text-on-ink backdrop:bg-ink/85 backdrop:backdrop-blur-sm open:animate-in open:fade-in open:zoom-in-95"
      onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
      onClose={() => setIsOpen(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      }}
    >
      <div className="mb-3 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-[.08em] text-accent-on-ink uppercase">
            {clip.label} · {index + 1} / {list.length}
          </p>
          <h2 className="text-xl font-extrabold md:text-2xl">{clip.title}</h2>
        </div>
        <button
          type="button"
          aria-label="Close video"
          className="grid size-11 shrink-0 place-items-center rounded-full bg-on-ink/15 transition-colors hover:bg-on-ink hover:text-ink"
          onClick={() => dialog.current?.close()}
        >
          <X size={20} aria-hidden="true" />
        </button>
      </div>
      <div className="relative aspect-video overflow-hidden rounded-3xl bg-black shadow-lift">
        {isOpen && (
          <video
            key={clip.src}
            src={clip.src}
            controls
            autoPlay
            muted
            loop
            playsInline
            className="size-full"
          />
        )}
      </div>
      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="max-w-xl text-sm text-on-ink/75">{clip.text}</p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            aria-label="Previous video"
            className="grid size-11 place-items-center rounded-full bg-on-ink/15 transition-colors hover:bg-on-ink hover:text-ink"
            onClick={() => step(-1)}
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next video"
            className="grid size-11 place-items-center rounded-full bg-on-ink/15 transition-colors hover:bg-on-ink hover:text-ink"
            onClick={() => step(1)}
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </dialog>
  );
  return { open, element };
}
