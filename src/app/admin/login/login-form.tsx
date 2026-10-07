"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "../actions";

const initialState: LoginState = { error: "" };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="mt-7">
      <label htmlFor="admin-password" className="block font-mono text-xs text-zinc-300">
        Password
      </label>
      <input
        id="admin-password"
        name="password"
        type="password"
        required
        autoFocus
        autoComplete="current-password"
        maxLength={256}
        aria-invalid={state.error ? true : undefined}
        aria-describedby={state.error ? "login-error" : undefined}
        className="mt-2 block w-full border border-white/15 bg-black px-4 py-3 text-base text-white outline-none transition focus:border-brand focus:ring-1 focus:ring-brand"
      />
      {state.error && (
        <p id="login-error" role="alert" className="mt-3 border-l-2 border-rose-300 pl-3 text-sm leading-6 text-rose-200">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="mt-6 flex w-full items-center justify-between bg-[#9f24c1] px-5 py-3 font-mono text-sm text-white transition hover:bg-[#b934de] disabled:cursor-wait disabled:opacity-70"
      >
        {pending ? "Signing in…" : "Sign in"}
        <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
