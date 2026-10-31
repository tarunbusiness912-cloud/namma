
"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type ReviewState = {
  error: string;
  success: string;
};

const initialState: ReviewState = {
  error: "",
  success: "",
};

const allowedStatuses = [
  "approved",
  "rejected",
  "more_information_required",
] as const;

type ReviewStatus = (typeof allowedStatuses)[number];

export async function reviewVerification(
  _previousState: ReviewState,
  formData: FormData
): Promise<ReviewState> {
  const applicationId = String(
    formData.get("application_id") ?? ""
  ).trim();

  const status = String(
    formData.get("status") ?? ""
  ).trim();

  const adminNote = String(
    formData.get("admin_note") ?? ""
  ).trim();

  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      applicationId
    )
  ) {
    return {
      error: "Invalid application ID.",
      success: "",
    };
  }

  if (
    !allowedStatuses.includes(status as ReviewStatus)
  ) {
    return {
      error: "Invalid review action.",
      success: "",
    };
  }

  if (adminNote.length > 1000) {
    return {
      error: "Admin note must be 1000 characters or fewer.",
      success: "",
    };
  }

  if (
    status === "more_information_required" &&
    adminNote.length < 5
  ) {
    return {
      error: "Please explain what additional information is required.",
      success: "",
    };
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      error: "Your session has expired. Please sign in again.",
      success: "",
    };
  }

  if (user.app_metadata?.role !== "admin") {
    return {
      error: "You are not authorized to review applications.",
      success: "",
    };
  }

  const { data, error } = await supabase
    .from("community_verifications")
    .update({
      status: status as ReviewStatus,
      admin_note: adminNote || null,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", applicationId)
    .select("id")
    .maybeSingle();

  if (error) {
    console.error("Admin verification update failed:", error);

    return {
      error: "Unable to update the application. Please try again.",
      success: "",
    };
  }

  if (!data) {
    return {
      error: "Application not found or update not permitted.",
      success: "",
    };
  }

  revalidatePath("/admin");
  revalidatePath("/onboarding");

  return {
    error: "",
    success: `Application successfully marked as ${status.replaceAll("_", " ")}.`,
  };
}
