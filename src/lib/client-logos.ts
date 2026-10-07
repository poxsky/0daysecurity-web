import { existsSync } from "node:fs";
import path from "node:path";
import { clients, type ClientWithLogo } from "@/lib/clients";

const LOGO_EXTENSIONS = ["svg", "png", "webp"];

/**
 * Pairs each client with its logo file in /public/clients, if one exists.
 * Server-only: runs when the homepage is built.
 */
export function getClientsWithLogos(): ClientWithLogo[] {
  const directory = path.join(process.cwd(), "public", "clients");
  return clients.map((client) => {
    const extension = LOGO_EXTENSIONS.find((ext) => existsSync(path.join(directory, `${client.slug}.${ext}`)));
    return { ...client, logo: extension ? `/clients/${client.slug}.${extension}` : null };
  });
}
