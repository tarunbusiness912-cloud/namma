
import { Suspense } from "react";
import { connection } from "next/server";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import AdminDashboard, {
  type AdminApplication,
} from "./AdminDashboard";

export const metadata = {
  title: "Admin Dashboard | Nammavaru",
};

async function AdminContent() {
  await connection();

  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  if (user.app_metadata?.role !== "admin") {
    redirect("/onboarding");
  }

  const {
    data: verifications,
    error: verificationError,
  } = await supabase
    .from("community_verifications")
    .select(
      "id, user_id, district, hometown, karnataka_connection, kannada_response, introduction, status, admin_note, reviewed_at, created_at"
    )
    .order("created_at", { ascending: false });

  if (verificationError) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Admin Dashboard</h1>
        <p>
          Unable to load applications. Please check your
          database permissions and try again.
        </p>
      </main>
    );
  }

  const userIds = [
    ...new Set((verifications ?? []).map((item) => item.user_id)),
  ];

  let profiles: {
    id: string;
    full_name: string;
    email: string;
    role: string;
    location: string | null;
  }[] = [];

  if (userIds.length > 0) {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, email, role, location")
      .in("id", userIds);

    if (error) {
      return (
        <main style={{ padding: 40 }}>
          <h1>Admin Dashboard</h1>
          <p>
            Applications were found, but applicant profiles
            could not be loaded. Check the admin SELECT policy
            on the profiles table.
          </p>
        </main>
      );
    }

    profiles = data ?? [];
  }

  const profileMap = new Map(
    profiles.map((profile) => [profile.id, profile])
  );

  const applications: AdminApplication[] = (
    verifications ?? []
  ).map((item) => {
    const profile = profileMap.get(item.user_id);

    return {
      id: item.id,
      user_id: item.user_id,
      district: item.district,
      hometown: item.hometown,
      karnataka_connection: item.karnataka_connection ?? "",
      kannada_response: item.kannada_response ?? "",
      introduction: item.introduction,
      status: item.status,
      admin_note: item.admin_note ?? "",
      reviewed_at: item.reviewed_at,
      created_at: item.created_at,
      applicant_name: profile?.full_name ?? "Unknown applicant",
      applicant_email: profile?.email ?? "Email unavailable",
      applicant_role: profile?.role ?? "Unknown",
      applicant_location: profile?.location ?? "",
    };
  });

  return (
    <AdminDashboard
      applications={applications}
      adminEmail={user.email ?? ""}
    />
  );
}

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <main style={{ padding: 40 }}>
          <h1>Admin Dashboard</h1>
          <p>Loading admin applications...</p>
        </main>
      }
    >
      <AdminContent />
    </Suspense>
  );
}
