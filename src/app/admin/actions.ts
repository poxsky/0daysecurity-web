"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { quoteRequests } from "@/db/schema";
import {
  clearLoginFailures,
  endAdminSession,
  getClientKey,
  isAdminConfigured,
  isLoginRateLimited,
  passwordMatches,
  recordLoginFailure,
  requireAdmin,
  startAdminSession,
} from "@/lib/admin-auth";
import { isLeadStatus } from "@/lib/lead-status";

export type LoginState = { error: string };

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function loginAction(_previous: LoginState, formData: FormData): Promise<LoginState> {
  if (!isAdminConfigured()) {
    return { error: "Admin access isn’t set up yet. Add ADMIN_PASSWORD to your environment." };
  }
  const client = await getClientKey();
  if (isLoginRateLimited(client)) {
    return { error: "Too many attempts. Please wait 15 minutes before trying again." };
  }
  const password = formData.get("password");
  if (typeof password !== "string" || password.length > 256 || !passwordMatches(password)) {
    recordLoginFailure(client);
    await new Promise((resolve) => setTimeout(resolve, 350));
    return { error: "That password isn’t correct." };
  }
  clearLoginFailures(client);
  await startAdminSession();
  redirect("/admin");
}

export async function logoutAction() {
  await endAdminSession();
  redirect("/admin/login");
}

function leadIdFrom(formData: FormData) {
  const id = formData.get("id");
  return typeof id === "string" && UUID_PATTERN.test(id) ? id : null;
}

export async function updateLeadStatus(formData: FormData) {
  await requireAdmin();
  const id = leadIdFrom(formData);
  const status = formData.get("status");
  if (!id || typeof status !== "string" || !isLeadStatus(status)) return;
  await db.update(quoteRequests).set({ status, updatedAt: new Date() }).where(eq(quoteRequests.id, id));
  revalidatePath("/admin");
}

export async function updateLeadNotes(formData: FormData) {
  await requireAdmin();
  const id = leadIdFrom(formData);
  const notes = formData.get("notes");
  if (!id || typeof notes !== "string") return;
  const cleaned = notes.trim().slice(0, 2000);
  await db
    .update(quoteRequests)
    .set({ notes: cleaned || null, updatedAt: new Date() })
    .where(eq(quoteRequests.id, id));
  revalidatePath("/admin");
}

export async function deleteLead(formData: FormData) {
  await requireAdmin();
  const id = leadIdFrom(formData);
  if (!id) return;
  await db.delete(quoteRequests).where(eq(quoteRequests.id, id));
  revalidatePath("/admin");
}
