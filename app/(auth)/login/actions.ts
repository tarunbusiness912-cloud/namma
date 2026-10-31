
"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type LoginState = {
  error: string;
};

export async function loginUser(
  _previousState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Enter your email and password." };
  }

  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        error:
          error.message === "Email not confirmed"
            ? "Please verify your email before signing in."
            : "Invalid email or password. Please try again.",
      };
    }
  } catch {
    return {
      error: "Something went wrong. Please try again.",
    };
  }

  redirect("/onboarding");
}
