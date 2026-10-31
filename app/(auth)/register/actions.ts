
"use server";

import { createClient } from "@/lib/supabase/server";

export type RegisterState = {
  error: string;
  success: string;
};

const allowedRoles = [
  "student",
  "fresher",
  "professional",
  "employer",
] as const;

export async function registerUser(
  _previousState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const fullName = String(formData.get("full_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const role = String(formData.get("role") ?? "");

  if (fullName.length < 2 || fullName.length > 100) {
    return { error: "Enter a name between 2 and 100 characters.", success: "" };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Enter a valid email address.", success: "" };
  }

  if (password.length < 8 || password.length > 72) {
    return { error: "Password must contain 8–72 characters.", success: "" };
  }

  if (!allowedRoles.includes(role as (typeof allowedRoles)[number])) {
    return { error: "Select a valid account type.", success: "" };
  }

  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role,
        },
      },
    });

    if (error) {
      return { error: error.message, success: "" };
    }

    return {
      error: "",
      success:
        "Your account request was received. Check your email for a verification link before signing in.",
    };
  } catch {
    return {
      error: "Something went wrong. Please try again.",
      success: "",
    };
  }
}
