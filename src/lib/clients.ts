/**
 * "Trusted by" logo strip shown below the hero.
 *
 * Logos: save each file in /public/clients as <slug>.svg, <slug>.png or <slug>.webp
 * (for example public/clients/eros-group.svg). Files are detected automatically when the site is built.
 * Until a logo is added, the client's name is shown as a clean text wordmark.
 * Only show logos you have permission to use.
 */
export type Client = {
  name: string;
  /** Logo file name in /public/clients, without the extension. */
  slug: string;
  /** Logos are shown in white to match the dark design. Set to true to keep the original colours. */
  originalColors?: boolean;
};

export type ClientWithLogo = Client & { logo: string | null };

export const clientsCopy = {
  label: "Trusted by",
};

export const clients: Client[] = [
  { name: "Eros Group", slug: "eros-group" },
  { name: "Serviz4u", slug: "serviz4u" },
  { name: "ACME", slug: "acme" },
  { name: "Swartzchild Home", slug: "swartzchild-home" },
];
