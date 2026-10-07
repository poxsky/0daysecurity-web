"use client";

import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { leadStatuses } from "@/lib/lead-status";

type FormAction = (formData: FormData) => Promise<void>;

export function SubmitButton({
  children,
  pendingLabel,
  tone = "default",
}: {
  children: ReactNode;
  pendingLabel: string;
  tone?: "default" | "danger";
}) {
  const { pending } = useFormStatus();
  const toneClass =
    tone === "danger"
      ? "border-rose-300/30 text-rose-200 hover:border-rose-300/70 hover:bg-rose-300/10"
      : "border-white/15 text-zinc-200 hover:border-brand hover:text-white";
  return (
    <button
      type="submit"
      disabled={pending}
      className={`border px-3.5 py-2 font-mono text-xs transition disabled:cursor-wait disabled:opacity-60 ${toneClass}`}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}

function SavingHint() {
  const { pending } = useFormStatus();
  return (
    <span aria-live="polite" className="font-mono text-[11px] text-zinc-500">
      {pending ? "Saving…" : ""}
    </span>
  );
}

export function StatusSelect({ id, status, action }: { id: string; status: string; action: FormAction }) {
  return (
    <form action={action} className="flex items-center gap-2">
      <input type="hidden" name="id" value={id} />
      <label htmlFor={`status-${id}`} className="sr-only">
        Lead status
      </label>
      <select
        key={status}
        id={`status-${id}`}
        name="status"
        defaultValue={status}
        onChange={(event) => event.currentTarget.form?.requestSubmit()}
        className="border border-white/15 bg-black px-3 py-2 font-mono text-xs text-white outline-none transition hover:border-white/30 focus:border-brand"
      >
        {leadStatuses.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <SavingHint />
    </form>
  );
}

export function DeleteLeadForm({ id, name, action }: { id: string; name: string; action: FormAction }) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!window.confirm(`Delete the quote request from ${name}? This can’t be undone.`)) event.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <SubmitButton pendingLabel="Deleting…" tone="danger">
        Delete
      </SubmitButton>
    </form>
  );
}
