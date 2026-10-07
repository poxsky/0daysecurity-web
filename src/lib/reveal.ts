import type { CSSProperties } from "react";

/** Inline style that staggers a scroll-reveal animation, for example revealDelay(120). */
export function revealDelay(ms: number) {
  return { "--reveal-delay": `${ms}ms` } as CSSProperties;
}
