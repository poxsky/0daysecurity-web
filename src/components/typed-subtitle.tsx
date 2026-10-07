"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";

const PHRASES = siteConfig.heroPhrases;

/** Terminal-style kicker above the hero headline that types and deletes each phrase in turn. */
export function TypedSubtitle() {
  const [text, setText] = useState(PHRASES[0]);

  useEffect(() => {
    if (PHRASES.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let phrase = 0;
    let length = PHRASES[0].length;
    let deleting = true;
    let timer = 0;

    const tick = () => {
      const word = PHRASES[phrase];
      if (deleting) {
        length -= 1;
        setText(word.slice(0, length));
        if (length > 0) {
          timer = window.setTimeout(tick, 28);
        } else {
          deleting = false;
          phrase = (phrase + 1) % PHRASES.length;
          timer = window.setTimeout(tick, 380);
        }
      } else {
        length += 1;
        setText(word.slice(0, length));
        if (length < word.length) {
          timer = window.setTimeout(tick, 55 + Math.random() * 55);
        } else {
          deleting = true;
          timer = window.setTimeout(tick, 2300);
        }
      }
    };

    timer = window.setTimeout(tick, 2800);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <p className="hero-kicker">
      <span className="sr-only">{PHRASES.join(", ")}</span>
      <span className="kicker-text" aria-hidden="true">
        <span className="typed-prompt">&gt;</span>
        {text}
        <span className="typed-caret" />
      </span>
    </p>
  );
}
