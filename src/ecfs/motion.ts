import type { CSSProperties } from "react";

/** Entrance delay for `.hero-in` / `.hero-word` elements (sets the `--d` custom property). */
export const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
