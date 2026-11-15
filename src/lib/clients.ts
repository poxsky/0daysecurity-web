export type Client = {
  name: string;
  slug: string;
  originalColors?: boolean;
};

export type ClientWithLogo = Client & { logo: string | null };

export const clientsCopy = {
  label: "Hall of Fame Recognitions & Responsible Disclosures",
};

export const clients: Client[] = [
  { name: "YesWeHack", slug: "yeswehack" },
  { name: "Webflow", slug: "webflow" },
  { name: "Coopérative U", slug: "cooperative-u" },
  { name: "Kaia Web", slug: "kaia" },
  { name: "Superposition Finance", slug: "superposition" },
  { name: "U2Staking", slug: "u2staking" },
  { name: "Eros Group", slug: "eros-group" },
  { name: "Serviz4u", slug: "serviz4u" },
];
