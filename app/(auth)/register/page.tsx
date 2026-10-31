
"use client";

import { useActionState } from "react";
import Link from "next/link";
import { registerUser, type RegisterState } from "./actions";

const initialState: RegisterState = {
  error: "",
  success: "",
};

const roles = [
  { value: "student", label: "Student", description: "Currently studying" },
  { value: "fresher", label: "Fresher", description: "Looking for my first job" },
  { value: "professional", label: "Professional", description: "Growing my career" },
  { value: "employer", label: "Employer", description: "Hiring talented people" },
];

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(
    registerUser,
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
          <p className="auth-eyebrow">ನಮ್ಮವರ ಜೊತೆ ಸೇರಿ</p>
          <h1>Create your account.</h1>
          <p>
            Join a community connecting Karnataka's talent
            with meaningful opportunities.
          </p>
        </div>

        <form action={formAction} className="auth-form">
          <label htmlFor="full_name">Full name</label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            placeholder="Enter your full name"
            minLength={2}
            maxLength={100}
            autoComplete="name"
            required
          />

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
            placeholder="At least 8 characters"
            minLength={8}
            autoComplete="new-password"
            required
          />

          <label htmlFor="role">I am joining as a</label>
          <select id="role" name="role" defaultValue="student" required>
            {roles.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label} — {role.description}
              </option>
            ))}
          </select>

          {state.error && (
            <p className="auth-error" role="alert">{state.error}</p>
          )}

          {state.success && (
            <p className="auth-success" role="status">{state.success}</p>
          )}

          <button
            type="submit"
            className="auth-submit"
            disabled={pending}
          >
            {pending ? "Creating account..." : "Create account"}
            {!pending && <span>→</span>}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <Link href="/login">Sign in</Link>
        </p>

        <p className="auth-terms">
          By joining, you agree to use Nammavaru responsibly
          and respectfully.
        </p>
      </div>
    </main>
  );
}
