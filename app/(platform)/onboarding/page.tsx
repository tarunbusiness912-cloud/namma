
import { Suspense } from "react";
import { connection } from "next/server";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import VerificationForm from "@/components/auth/VerificationForm";

export const metadata = {
  title: "Community Verification | Nammavaru",
  description: "Complete your Nammavaru community verification.",
};

type VerificationStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "more_information_required";

type VerificationValues = {
  district: string;
  hometown: string;
  karnataka_connection: string;
  kannada_response: string;
  introduction: string;
};

const statusMessages: Record<
  VerificationStatus,
  {
    title: string;
    description: string;
    icon: string;
  }
> = {
  pending: {
    title: "Application Under Review",
    description:
      "Your community verification application has been submitted successfully. Our team will review your details and update your application status.",
    icon: "⏳",
  },
  approved: {
    title: "Welcome to Nammavaru!",
    description:
      "Your community verification has been approved. You can now continue to the Nammavaru platform.",
    icon: "✓",
  },
  rejected: {
    title: "Application Not Approved",
    description:
      "Your application was not approved. Please contact the Nammavaru team if you need clarification.",
    icon: "!",
  },
  more_information_required: {
    title: "Additional Information Required",
    description:
      "Our verification team needs some additional information. Review the feedback below and update your application.",
    icon: "✎",
  },
};

async function OnboardingContent() {
  await connection();

  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  const { data: application, error: applicationError } = await supabase
    .from("community_verifications")
    .select(
      "id, status, district, hometown, karnataka_connection, kannada_response, introduction, admin_note, created_at"
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (applicationError) {
    console.error(
      "Unable to load community verification:",
      applicationError.message
    );

    return (
      <main className="onboarding-page">
        <section className="onboarding-card">
          <div className="onboarding-status-icon">!</div>
          <h1>Unable to load your application</h1>
          <p>
            Something went wrong while loading your verification details.
            Please refresh the page or try again later.
          </p>
        </section>
      </main>
    );
  }

  if (!application) {
    return (
      <main className="onboarding-page">
        <VerificationForm />
      </main>
    );
  }

  const status = application.status as VerificationStatus;

  const initialValues: VerificationValues = {
    district: application.district ?? "",
    hometown: application.hometown ?? "",
    karnataka_connection: application.karnataka_connection ?? "",
    kannada_response: application.kannada_response ?? "",
    introduction: application.introduction ?? "",
  };

  if (status === "more_information_required") {
    return (
      <main className="onboarding-page">
        <VerificationForm
          initialValues={initialValues}
          adminNote={application.admin_note ?? ""}
          isResubmission
        />
      </main>
    );
  }

  const message = statusMessages[status];

  if (!message) {
    return (
      <main className="onboarding-page">
        <section className="onboarding-card">
          <div className="onboarding-status-icon">!</div>
          <h1>Application status unavailable</h1>
          <p>
            We could not identify your application status. Please contact
            the Nammavaru team.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="onboarding-page">
      <section className="onboarding-card">
        <div className="onboarding-status-icon">{message.icon}</div>

        <p className="onboarding-eyebrow">
          NAMMAVARU COMMUNITY VERIFICATION
        </p>

        <h1>{message.title}</h1>

        <p>{message.description}</p>

        <div className="onboarding-application-details">
          <div>
            <span>Application status</span>
            <strong>{status.replaceAll("_", " ").toUpperCase()}</strong>
          </div>

          <div>
            <span>District</span>
            <strong>{application.district || "Not provided"}</strong>
          </div>

          <div>
            <span>Hometown</span>
            <strong>{application.hometown || "Not provided"}</strong>
          </div>
        </div>

        {status === "approved" && (
          <a href="/" className="onboarding-primary-button">
            Continue to Nammavaru
          </a>
        )}

        {status === "rejected" && (
          <p className="onboarding-help-text">
            If you believe this decision was made in error, contact the
            Nammavaru team for assistance.
          </p>
        )}

        {status === "pending" && (
          <p className="onboarding-help-text">
            You can check this page again later for an updated status.
          </p>
        )}
      </section>
    </main>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={
        <main className="onboarding-page">
          <section className="onboarding-card">
            <p>Loading your community application...</p>
          </section>
        </main>
      }
    >
      <OnboardingContent />
    </Suspense>
  );
}
