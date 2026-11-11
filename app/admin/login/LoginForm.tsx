"use client";

import { useActionState } from "react";
import { loginAction } from "../actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, undefined);
  return (
    <form action={action} className="admin-form">
      <label>
        Password
        <input type="password" name="password" required autoFocus autoComplete="current-password" />
      </label>
      {state?.error && (
        <p className="admin-error" role="alert">
          {state.error}
        </p>
      )}
      <button className="admin-btn admin-btn-primary" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
