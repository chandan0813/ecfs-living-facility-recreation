/**
 * Site footage. Files live in /public/videos (see its README).
 * PLACEHOLDERS: the current files are watermarked stock previews; replace each with a
 * licensed or ECFS-owned clip under the same file name before publishing.
 */
export type Clip = { src: string; title: string; label: string; text: string };
export const clips = {
  ambient: {
    src: "/videos/facility-ambient.mp4",
    title: "Mechanized floor care",
    label: "Housekeeping",
    text: "Scrubber-driers keep large lobbies and atriums spotless without disrupting the day.",
  },
  floor: {
    src: "/videos/floor-care.mp4",
    title: "Stone floor polishing",
    label: "Deep cleaning",
    text: "Marble and granite restored with the right pads, chemicals and technique.",
  },
  team: {
    src: "/videos/team-at-work.mp4",
    title: "Daily housekeeping teams",
    label: "Commercial",
    text: "Trained, uniformed crews with safety signage and supervised checklists.",
  },
  office: {
    src: "/videos/office-cleaning.mp4",
    title: "Office & pantry care",
    label: "Workplaces",
    text: "Hygienic pantries, breakout areas and workstations, every shift.",
  },
} satisfies Record<string, Clip>;
export const showreel: Clip[] = [clips.ambient, clips.floor, clips.team, clips.office];
