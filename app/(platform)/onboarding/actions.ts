
"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type VerificationState = {
  error: string;
  success: string;
};

const initialState: VerificationState = {
  error: "",
  success: "",
};

const allowedDistricts = [
  "Bagalkote",
  "Ballari",
  "Belagavi",
  "Bengaluru Rural",
  "Bengaluru Urban",
  "Bidar",
  "Chamarajanagar",
  "Chikkaballapur",
  "Chikkamagaluru",
  "Chitradurga",
  "Dakshina Kannada",
  "Davanagere",
  "Dharwad",
  "Gadag",
  "Hassan",
  "Haveri",
  "Kalaburagi",
  "Kodagu",
  "Kolar",
  "Koppal",
  "Mandya",
  "Mysuru",
  "Raichur",
  "Ramanagara",
  "Shivamogga",
  "Tumakuru",
  "Udupi",
  "Uttara Kannada",
  "Vijayanagara",
  "Vijayapura",
  "Yadgir",
];

function readField(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function databaseError(
  title: string,
  error: {
    message: string;
    code?: string;
    details?: string;
    hint?: string;
  }
): VerificationState {
  console.error(`NAMMAVARU: ${title}`, {
    message: error.message,
    code: error.code,
    details: error.details,
    hint: error.hint,
  });

  if (process.env.NODE_ENV === "development") {
    return {
      error: `${title}: ${error.message}${
        error.code ? ` (Code: ${error.code})` : ""
      }`,
      success: "",
    };
  }

  return {
    error: "We couldn't process your application. Please try again.",
    success: "",
  };
}

export async function submitVerification(
  _previousState: VerificationState,
  formData: FormData
): Promise<VerificationState> {
  const district = readField(formData, "district");
  const hometown = readField(formData, "hometown");
  const karnatakaConnection = readField(
    formData,
    "karnataka_connection"
  );
  const kannadaResponse = readField(
    formData,
    "kannada_response"
  );
  const introduction = readField(formData, "introduction");

  if (!allowedDistricts.includes(district)) {
    return {
      ...initialState,
      error: "Please select a valid Karnataka district.",
    };
  }

  if (hometown.length < 2 || hometown.length > 100) {
    return {
      ...initialState,
      error: "Hometown must contain 2–100 characters.",
    };
  }

  if (
    karnatakaConnection.length < 20 ||
    karnatakaConnection.length > 1000
  ) {
    return {
      ...initialState,
      error: "Karnataka connection must contain 20–1000 characters.",
    };
  }

  if (kannadaResponse.length < 2 || kannadaResponse.length > 200) {
    return {
      ...initialState,
      error: "Please enter your Kannada assessment answer.",
    };
  }

  if (introduction.length < 20 || introduction.length > 1000) {
    return {
      ...initialState,
      error: "Introduction must contain 20–1000 characters.",
    };
  }

  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      return databaseError("Authentication error", authError);
    }

    if (!user) {
      return {
        ...initialState,
        error: "Your session has expired. Please sign in again.",
      };
    }

    const {
      data: existing,
      error: lookupError,
    } = await supabase
      .from("community_verifications")
      .select("id, status")
      .eq("user_id", user.id)
      .maybeSingle();

    if (lookupError) {
      return databaseError(
        "Application lookup failed",
        lookupError
      );
    }

    const applicationData = {
      district,
      hometown,
      karnataka_connection: karnatakaConnection,
      kannada_response: kannadaResponse,
      introduction,
    };

    if (existing) {
      if (existing.status !== "more_information_required") {
        return {
          ...initialState,
          error:
            existing.status === "pending"
              ? "Your application is already awaiting review."
              : `Your application currently has the status: ${existing.status.replaceAll(
                  "_",
                  " "
                )}. Please contact the community team if you need assistance.`,
        };
      }

      const { data: updated, error: updateError } = await supabase
        .from("community_verifications")
        .update({
          ...applicationData,
          status: "pending",
          admin_note: null,
          reviewed_at: null,
        })
        .eq("id", existing.id)
        .eq("user_id", user.id)
        .eq("status", "more_information_required")
        .select("id")
        .maybeSingle();

      if (updateError) {
        return databaseError(
          "Application resubmission failed",
          updateError
        );
      }

      if (!updated) {
        return {
          ...initialState,
          error:
            "Your application could not be updated. Please refresh the page and try again.",
        };
      }

      console.log(
        "NAMMAVARU: Verification application resubmitted",
        user.id
      );

      revalidatePath("/onboarding");
      revalidatePath("/admin");

      return {
        error: "",
        success:
          "Your updated application has been resubmitted successfully. Our community team will review it.",
      };
    }

    const { error: insertError } = await supabase
      .from("community_verifications")
      .insert({
        user_id: user.id,
        ...applicationData,
        status: "pending",
      });

    if (insertError) {
      return databaseError(
        "Application submission failed",
        insertError
      );
    }

    console.log(
      "NAMMAVARU: Verification application submitted",
      user.id
    );

    revalidatePath("/onboarding");
    revalidatePath("/admin");

    return {
      error: "",
      success:
        "Your application has been submitted successfully. Our community team will review it.",
    };
  } catch (error) {
    console.error(
      "NAMMAVARU: Unexpected submission error",
      error
    );

    return {
      ...initialState,
      error:
        process.env.NODE_ENV === "development" &&
        error instanceof Error
          ? `Unexpected error: ${error.message}`
          : "Something went wrong. Please try again later.",
    };
  }
}
