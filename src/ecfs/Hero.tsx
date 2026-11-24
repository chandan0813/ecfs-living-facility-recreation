import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  Component,
  Fragment,
  type ReactNode,
} from "react";
import { delay } from "./motion";
import { SmartVideo } from "./Media";
import { useVideoLightbox } from "./useVideoLightbox";
import { clips } from "./videos";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Box, Crosshair, Play } from "lucide-react";
import { company, trust } from "./content";
import { ServiceNodes } from "./scene/ServiceNodes";
import { photos } from "./imagery";
import { homeHeading } from "./seo";

const FacilityScene = lazy(() => import("./scene/FacilityScene"));
class SceneBoundary extends Component<
  { children: ReactNode; fallback: () => void },
  { failed: boolean }
> {
  override state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  override componentDidCatch() {
    this.props.fallback();
  }
  override render() {
    return this.state.failed ? null : this.props.children;
  }
}
function FacilityStage() {
  const element = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<{ reduced: boolean; high: boolean } | null>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const [active, setActive] = useState<number | null>(null);
  const onReady = useCallback(() => setReady(true), []);
  const onUnavailable = useCallback(() => {
    setReady(false);
    setMode(null);
  }, []);
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const configure = () => {
      const probe = document.createElement("canvas");
      const context = probe.getContext("webgl2");
      if (!context) {
        onUnavailable();
        return;
      }
      const renderer = context.getExtension("WEBGL_debug_renderer_info");
      const gpu = renderer ? String(context.getParameter(renderer.UNMASKED_RENDERER_WEBGL)) : "";
      const high =
        window.innerWidth >= 1000 &&
        navigator.hardwareConcurrency >= 8 &&
        !/swiftshader|llvmpipe|software/i.test(gpu);
      context.getExtension("WEBGL_lose_context")?.loseContext();
      setMode({ high, reduced: reduced.matches });
    };
    const timer = window.setTimeout(configure, 1100);
    const target = element.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry?.isIntersecting ?? false;
        setVisible(inView);
      },
      { rootMargin: "80px" },
    );
    if (target) observer.observe(target);
    reduced.addEventListener("change", configure);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
      reduced.removeEventListener("change", configure);
    };
  }, [onUnavailable]);
  return (
    <div
      ref={element}
      className="facility-stage relative isolate w-full"
      data-scene-ready={ready ? "true" : undefined}
    >
      <img
        src={photos.facility.url}
        alt={photos.facility.alt}
        width={1200}
        height={900}
        loading="lazy"
        className="facility-poster absolute inset-0 h-full w-full object-contain transition-opacity duration-500"
      />
      {mode && (
        <div className="facility-canvas absolute inset-0" aria-hidden="true">
          <SceneBoundary fallback={onUnavailable}>
            <Suspense
              fallback={
                <div className="absolute bottom-8 right-6 text-xs text-deep-aqua">
                  Loading 3D view…
                </div>
              }
            >
              <FacilityScene
                {...mode}
                active={active}
                visible={visible}
                onReady={onReady}
                onUnavailable={onUnavailable}
              />
            </Suspense>
          </SceneBoundary>
        </div>
      )}
      <ServiceNodes onActive={setActive} />
      <span className="absolute top-2 right-2 flex items-center gap-2 font-display text-[.65rem] font-bold uppercase text-deep-aqua md:top-6 md:right-5">
        <Crosshair size={13} /> Campus model / 01
      </span>
      <div className="absolute bottom-1 right-2 hidden items-center gap-2 font-display text-[.65rem] font-bold uppercase text-deep-aqua md:right-5 md:flex">
        <i className="size-1.5 rounded-full bg-aqua" />
        {ready ? "Live model" : "Facility model"}
      </div>
    </div>
  );
}
export function Hero() {
  const video = useVideoLightbox();
  return (
    <div className="px-2 pt-2 sm:px-3 sm:pt-3">
      <section
        id="top"
        className="photo-hero relative isolate mx-auto flex max-w-[110rem] flex-col justify-end overflow-hidden rounded-[1.75rem] bg-ink text-on-ink sm:rounded-[2.25rem]"
      >
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <img
            src={photos.atrium.url}
            alt={photos.atrium.alt}
            width={1673}
            height={940}
            fetchPriority="high"
            data-parallax="0.12"
            className="hero-media size-full object-cover"
          />
          <SmartVideo
            src={clips.ambient.src}
            parallax="0.12"
            className="hero-media absolute inset-0 size-full object-cover"
          />
        </div>
        <div
          aria-hidden="true"
          className="drift pointer-events-none absolute -top-32 -right-24 -z-10 size-[28rem] rounded-full bg-aqua-hot/25 blur-3xl"
        />
        <div className="site-wrap pt-24 pb-6 md:pt-32 md:pb-10">
          <p
            className="hero-in glass mb-6 inline-flex items-center gap-2 rounded-full py-1.5 pr-4 pl-1.5 text-xs font-semibold sm:text-sm"
            style={delay(80)}
          >
            <span className="rounded-full bg-aqua px-2.5 py-0.5 text-[.7rem] font-bold text-on-ink">
              Since {company.since}
            </span>
            Facility services · {company.coverage.label}
          </p>
          <h1 className="hero-title max-w-[15ch] text-balance">
            {homeHeading.split(" ").map((word, i) => (
              <Fragment key={`${word}-${i}`}>
                {i > 0 && " "}
                <span className="hero-word">
                  <span style={delay(220 + i * 95)}>{word}</span>
                </span>
              </Fragment>
            ))}
          </h1>
          <p
            className="hero-in mt-5 max-w-[34rem] text-base leading-relaxed text-on-ink/85 sm:text-lg"
            style={delay(700)}
          >
            Housekeeping, technical maintenance and trained manpower across{" "}
            {company.coverage.country}, delivered by verified teams under one accountable contract.
            Based in Ahmedabad.
          </p>
          <div className="hero-in mt-8 flex flex-wrap items-center gap-3" style={delay(850)}>
            <Link to="/contact" className="btn-pill btn-light">
              Get a free site assessment <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <button
              type="button"
              className="btn-pill btn-ghost-light"
              onClick={() => video.open(0)}
            >
              <Play size={15} className="fill-current" aria-hidden="true" /> Watch our work
            </button>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-2 sm:gap-3 md:mt-14 lg:grid-cols-5">
            {trust.map(({ icon: Icon, top, low }, i) => (
              <li
                key={top}
                style={delay(1000 + i * 90)}
                className={`hero-in glass flex items-center gap-3 rounded-2xl p-3 transition-colors hover:bg-on-ink/20 sm:p-4 ${i === trust.length - 1 ? "col-span-2 lg:col-span-1" : ""}`}
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-on-ink/15">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <strong className="block font-display text-sm font-bold sm:text-[.95rem]">
                    {top}
                  </strong>
                  <span className="text-xs text-on-ink/70">{low}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      {video.element}
    </div>
  );
}

export function FacilityExperience() {
  const [open, setOpen] = useState(false);
  return (
    <section id="facility-model" className="py-6 md:py-10">
      <div className="site-wrap">
        <div className="glow-backdrop flex flex-wrap items-center justify-between gap-5 rounded-[1.75rem] border p-6 md:p-8">
          <div className="flex items-center gap-4">
            <span className="icon-chip size-14 rounded-2xl">
              <Box size={26} aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-xl font-extrabold md:text-2xl">The ECFS facility model</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Explore how our services map onto a real campus, in interactive 3D.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="btn-pill btn-outline"
            aria-expanded={open}
            aria-controls="facility-model-view"
            onClick={() => setOpen(!open)}
          >
            {open ? "Close 3D model" : "Explore in 3D"}
            <ArrowUpRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div id="facility-model-view" hidden={!open}>
        {open && (
          <div className="site-wrap pt-4">
            <FacilityStage />
            <Link
              className="link-grow mt-4 inline-flex items-center gap-2 text-sm font-bold text-deep-aqua"
              to="/services"
            >
              Browse facility services <ArrowUpRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
