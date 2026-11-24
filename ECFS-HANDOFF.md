# ECFS · The Living Facility

## Run and adapt

This implementation runs on Lovable’s TanStack Start / React 19 stack, not Next.js. Use `bun install` and `bun run dev`; `bun run test` runs the tests. The 3D dependency install is `bun add three @react-three/fiber@^9 @react-three/drei@^10 @react-three/postprocessing@^3 && bun add -d @types/three`. The project’s package.json lists all pinned dependencies.

## Implementation tree

```text
public/
  ecfs-mark.svg
  images/README.md
  videos/README.md
src/
  assets/ecfs-facility.webp.asset.json
  assets/ecfs-facility-share.webp.asset.json
  assets/ecfs-lobby.webp.asset.json
  ecfs/
    Chrome.tsx                     Header, Footer, Brand
    Contact.tsx                    callback and office details
    Hero.tsx                       semantic hero and scene loading
    Media.tsx                      visibility-aware video and lightbox
    Sections.tsx                   services, sectors, process, proof, FAQs
    content.ts                     supplied service and company facts
    enquiry.ts                     WhatsApp message preparation
    pages.ts                       searchable page catalogue
    seo.ts                         per-page metadata and JSON-LD
    theme.ts                       WebGL materials and node positions
    scene/
      BuildingComplex.tsx          procedural instanced architecture
      Effects.tsx                  ShineSweep, MEPConduits, CleanAirParticles
      FacilityScene.tsx            lighting, camera, capability-gated effects
      ServiceNodes.tsx             accessible overlay controls
  routes/__root.tsx
  routes/index.tsx
  routes/$page.tsx
  routes/sitemap[.]xml.ts
  styles.css                       semantic UI tokens
  test/ecfs.test.ts
```

## Image and video manifest

| Slot                   | Path or pointer                                  | Alternative text / poster                                                                           |
| ---------------------- | ------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| Hero illustration      | `src/assets/ecfs-facility.webp.asset.json`       | Architectural model of the office, industrial and healthcare facilities served by ECFS in Ahmedabad |
| Hero share rendition   | `src/assets/ecfs-facility-share.webp.asset.json` | Same facility visual, cropped to 1200 × 630                                                         |
| Services illustration  | `src/assets/ecfs-lobby.webp.asset.json`          | Illustration of a clean commercial office lobby for facility management in Ahmedabad                |
| Brand mark             | `/ecfs-mark.svg`                                 | ECFS                                                                                                |
| Optional hero loop     | `/videos/facility-ambient.mp4`                   | Existing hero illustration, or `/images/facility-ambient-poster.webp`                               |
| Optional services loop | `/videos/services-loop.mp4`                      | Existing lobby illustration, or `/images/services-reel-poster.webp`                                 |
| Optional full showreel | `/videos/services-showreel.mp4`                  | Existing lobby illustration, or `/images/services-reel-poster.webp`                                 |
| Optional testimonial   | `/videos/client-testimonial.mp4`                 | `/images/client-testimonial-poster.webp` once approved                                              |

Generated illustrations are conceptual, not photos of actual ECFS premises or staff. Place approved footage in the slots above and set the corresponding `clips` URLs in `Media.tsx`. Add captions to published interview footage. Verified company social URLs, exact office coordinates, client testimonials and media were not supplied; no claims, links or ratings were invented. Review draft legal copy and verify all public contact and compliance information before publication. The form prepares a WhatsApp message; it does not silently send, store, or email an enquiry.

## Performance

The page’s HTML and compressed poster load before the deferred scene. Repeated facade panes, planters and solid shapes are instanced; 2,048 air and sparkle particles share one draw call. Mobile and lower-tier devices use 1× pixel ratio and omit bloom; eligible desktops cap rendering at 1.75×. The canvas stops drawing offscreen. No WebGL retains the poster and all content. Reduced motion freezes the camera and particles and does not autoplay video. The 60 FPS target requires testing on a real mid-range laptop; software-rendered preview timings are not a GPU benchmark.
