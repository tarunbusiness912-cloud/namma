
"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginUser, type LoginState } from "./actions";

const initialState: LoginState = {
  error: "",
};

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(
    loginUser,
    initialState
  );

  return (
    <main className="auth-page">
      <div className="auth-card">
        <Link href="/" className="auth-brand">
          <span className="auth-brand-mark">ನ</span>
          <span>Nammavaru</span>
        </Link>

        <div className="auth-heading">
          <p className="auth-eyebrow">ಮತ್ತೆ ಸ್ವಾಗತ · WELCOME BACK</p>
          <h1>Sign in to your account.</h1>
          <p>
            Continue connecting with your Kannada community
            and discovering new opportunities.
          </p>
        </div>

        <form action={formAction} className="auth-form">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            required
          />

          {state.error && (
            <p className="auth-error" role="alert">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            className="auth-submit"
            disabled={pending}
          >
            {pending ? "Signing in..." : "Sign in"}
            {!pending && <span>→</span>}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{" "}
          <Link href="/register">Create account</Link>
        </p>

        <p className="auth-terms">
          ನಮ್ಮವರು · Our People. Our Opportunities.
        </p>
      </div>
    </main>
  );
}
