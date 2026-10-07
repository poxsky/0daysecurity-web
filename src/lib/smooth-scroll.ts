"use client";

import { useEffect } from "react";
import type Lenis from "lenis";

let activeLenis: Lenis | null = null;

/**
 * Glides to an element (or the top of the page) with Lenis.
 * stop() + start() re-sync Lenis with the real scroll position in case the page has just been moved
 * natively, and the target is measured from the live layout, so it always lands in the right place.
 */
function glideTo(lenis: Lenis, target: HTMLElement | 0) {
  lenis.stop();
  lenis.start();
  if (target === 0) {
    lenis.scrollTo(0);
    return;
  }
  const padding = Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  lenis.scrollTo(target.getBoundingClientRect().top + window.scrollY - padding);
}

/** Smoothly scrolls to an element: Lenis on desktop, native smooth scrolling everywhere else. */
export function scrollToElement(element: HTMLElement) {
  if (activeLenis) glideTo(activeLenis, element);
  else element.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Smooth, eased wheel scrolling on desktop (mouse and trackpad) using Lenis.
 * Phones and tablets keep their native scrolling, which is already smooth and saves battery,
 * and the effect is skipped entirely for visitors who prefer reduced motion.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    let lenis: Lenis | null = null;
    let cancelled = false;

    // In-page links glide with the same easing. Keyboard users also get focus moved to the target.
    const onClick = (event: MouseEvent) => {
      if (!lenis || event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
      if (!anchor) return;
      const hash = anchor.getAttribute("href") ?? "#";
      if (hash === "#" || hash === "#top") {
        event.preventDefault();
        glideTo(lenis, 0);
        return;
      }
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) return;
      event.preventDefault();
      glideTo(lenis, target);
      if (event.detail === 0) {
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    };

    import("lenis").then(({ default: LenisScroll }) => {
      if (cancelled) return;
      lenis = new LenisScroll({ autoRaf: true, lerp: 0.1, prevent: (node) => node.nodeName === "DIALOG" });
      activeLenis = lenis;
      document.addEventListener("click", onClick);
    });

    return () => {
      cancelled = true;
      document.removeEventListener("click", onClick);
      if (activeLenis === lenis) activeLenis = null;
      lenis?.destroy();
    };
  }, []);
}
