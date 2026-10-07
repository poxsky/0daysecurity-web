import type { ReactNode, SVGProps } from "react";

// Original line icons drawn for this project (48×48 grid, 1.5px stroke).
const cloud = "M15 37h20a8 8 0 0 0 1-15.9A11 11 0 0 0 15.3 19A9 9 0 0 0 15 37z";
const shield = "M24 5 39 10.5V22c0 9.5-6.2 17-15 21-8.8-4-15-11.5-15-21V10.5z";

const icons = {
  network: (
    <>
      <rect x="7" y="6" width="34" height="12" rx="2" />
      <rect x="7" y="22" width="34" height="12" rx="2" />
      <circle cx="13" cy="12" r="1.25" />
      <circle cx="13" cy="28" r="1.25" />
      <path d="M19 12h16M19 28h16M24 34v8M10 42h28" />
    </>
  ),
  browser: (
    <>
      <rect x="5" y="8" width="38" height="32" rx="2.5" />
      <path d="M5 16h38M11 23h26M11 29h18M11 35h11" />
      <circle cx="10" cy="12" r="1" />
      <circle cx="14" cy="12" r="1" />
      <circle cx="18" cy="12" r="1" />
    </>
  ),
  apiHub: (
    <>
      <rect x="18" y="18" width="12" height="12" rx="2" />
      <path d="M24 18V8.5M24 30v9.5M18 24H8.5M30 24h9.5" />
      <circle cx="24" cy="6" r="2.5" />
      <circle cx="24" cy="42" r="2.5" />
      <circle cx="6" cy="24" r="2.5" />
      <circle cx="42" cy="24" r="2.5" />
    </>
  ),
  mobile: (
    <>
      <rect x="13" y="4" width="22" height="40" rx="3.5" />
      <path d="M21 8.5h6M22 39.5h4" />
      <path d="M24 16.5 31 19.3v4.4c0 4.2-2.9 7.3-7 8.8-4.1-1.5-7-4.6-7-8.8v-4.4z" />
    </>
  ),
  wifi: (
    <>
      <path d="M6 19a26 26 0 0 1 36 0M11.5 25a18 18 0 0 1 25 0M17 31a10 10 0 0 1 14 0" />
      <circle cx="24" cy="37" r="2" />
    </>
  ),
  radar: (
    <>
      <circle cx="24" cy="24" r="18" />
      <circle cx="24" cy="24" r="10" />
      <path d="M24 24 36.7 11.3" />
      <circle cx="24" cy="24" r="1.5" />
      <circle cx="15" cy="32" r="1.75" />
    </>
  ),
  crosshair: (
    <>
      <circle cx="24" cy="24" r="15" />
      <circle cx="24" cy="24" r="5" />
      <path d="M24 4v10M24 34v10M4 24h10M34 24h10" />
    </>
  ),
  blueprint: (
    <>
      <rect x="18" y="6" width="12" height="9" rx="1" />
      <rect x="5" y="33" width="12" height="9" rx="1" />
      <rect x="31" y="33" width="12" height="9" rx="1" />
      <path d="M24 15v9M11 33v-9h26v9" />
    </>
  ),
  bugSearch: (
    <>
      <circle cx="21" cy="21" r="15" />
      <path d="m32 32 10 10" />
      <rect x="17" y="15" width="8" height="12" rx="4" />
      <path d="M21 19v8M17 20h-3M25 20h3M17 24.5h-3M25 24.5h3M19 15l-1.5-2.5M23 15l1.5-2.5" />
    </>
  ),
  shieldCheck: (
    <>
      <path d={shield} />
      <path d="m17 24 5 5 9.5-10" />
    </>
  ),
  code: <path d="m16 14-9 10 9 10M32 14l9 10-9 10M27.5 10l-7 28" />,
  lightbulb: (
    <>
      <path d="M18 34v-3.5C14.2 28.3 11.5 24.1 11.5 19.5a12.5 12.5 0 0 1 25 0c0 4.6-2.7 8.8-6.5 11V34z" />
      <path d="M19 38.5h10M21 42.5h6M21 22l3 3 3-3M24 25v5.5" />
    </>
  ),
  cloudLock: (
    <>
      <path d={cloud} />
      <rect x="19.5" y="26" width="9" height="7" rx="1" />
      <path d="M21.5 26v-2.5a2.5 2.5 0 0 1 5 0V26" />
    </>
  ),
  award: (
    <>
      <circle cx="24" cy="18" r="12" />
      <circle cx="24" cy="18" r="6" />
      <path d="M16.5 27.4 13 42l11-5 11 5-3.5-14.6" />
    </>
  ),
  clipboardCheck: (
    <>
      <path d="M17 8h-5a2 2 0 0 0-2 2v32a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-5" />
      <rect x="17" y="4" width="14" height="7" rx="1.5" />
      <path d="m17 27 5 5 9-10" />
    </>
  ),
  privacy: (
    <>
      <path d={shield} />
      <circle cx="24" cy="19" r="4.5" />
      <path d="M16.5 32c1.3-3.9 4.2-6.3 7.5-6.3s6.2 2.4 7.5 6.3" />
    </>
  ),
  bank: (
    <>
      <path d="M6 16 24 6l18 10z" />
      <path d="M10 21v13M19 21v13M29 21v13M38 21v13M6 38.5h36M4 43h40" />
    </>
  ),
  gauge: (
    <>
      <path d="M7 34a17 17 0 0 1 34 0" />
      <path d="M24 34 31.8 26.2M9.3 25.5l2.6 1.5M38.7 25.5 36.1 27M24 17v3M14 40h20" />
      <circle cx="24" cy="34" r="2" />
    </>
  ),
  link: (
    <>
      <path d="m19 29 10-10" />
      <path d="M22.5 14.5 27 10a7.07 7.07 0 0 1 10 10l-4.5 4.5" />
      <path d="M25.5 33.5 21 38a7.07 7.07 0 0 1-10-10l4.5-4.5" />
    </>
  ),
  document: (
    <>
      <path d="M28 5H12a2 2 0 0 0-2 2v34a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V15z" />
      <path d="M28 5v10h10M16 23h16M16 29h16M16 35h10" />
    </>
  ),
  cycleCheck: (
    <>
      <path d="M8 24a16 16 0 0 1 28.5-10M40 24a16 16 0 0 1-28.5 10" />
      <path d="M36.5 7v7h-7M11.5 41v-7h7" />
      <path d="m18 24.5 4 4 8-8.5" />
    </>
  ),
  users: (
    <>
      <circle cx="18" cy="17" r="6" />
      <path d="M6 39c0-7 5.4-12 12-12s12 5 12 12" />
      <circle cx="33" cy="19" r="5" />
      <path d="M33 28c5.5 0 9.5 4.5 9.5 10" />
    </>
  ),
  mailHook: (
    <>
      <rect x="4" y="17" width="25" height="19" rx="2" />
      <path d="m4.8 18.6 11.7 8.9 11.7-8.9" />
      <path d="M41 6v21a4.5 4.5 0 0 1-9 0v-3.5" />
      <path d="m32 23.5 3 3" />
    </>
  ),
  presentation: (
    <>
      <path d="M5 8h38M8 8v22h32V8M24 30v5M18 42l6-7 6 7" />
      <path d="m14 23 6-6 5 4 8-8" />
    </>
  ),
  route: (
    <>
      <circle cx="10" cy="38" r="3" />
      <path d="M13 38h15a6 6 0 0 0 0-12h-8a6 6 0 0 1 0-12h14" />
      <path d="M34 14V4l8 3.5-8 3.5" />
    </>
  ),
  chartUp: (
    <>
      <path d="M5 42h38" />
      <rect x="8" y="33" width="6" height="9" />
      <rect x="17" y="28" width="6" height="14" />
      <rect x="26" y="23" width="6" height="19" />
      <rect x="35" y="17" width="6" height="25" />
      <path d="M8 24 17 17l7 4L38 8M31.5 8H38v6.5" />
    </>
  ),
  briefcase: (
    <>
      <rect x="5" y="14" width="38" height="27" rx="3" />
      <path d="M17 14v-3a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3M5 25h15M28 25h15" />
      <rect x="20" y="22" width="8" height="6" rx="1" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof icons;

type IconProps = SVGProps<SVGSVGElement> & { name: IconName };

export function Icon({ name, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {icons[name]}
    </svg>
  );
}

export function MouseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <rect x="6.5" y="3" width="11" height="18" rx="5.5" />
      <path d="M12 7v3" />
    </svg>
  );
}
