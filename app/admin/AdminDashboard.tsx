
"use client";

import { useState } from "react";
import { useActionState } from "react";
import {
  reviewVerification,
  type ReviewState,
} from "./actions";

export type AdminApplication = {
  id: string;
  user_id: string;
  district: string;
  hometown: string;
  karnataka_connection: string;
  kannada_response: string;
  introduction: string;
  status: string;
  admin_note: string;
  reviewed_at: string | null;
  created_at: string;
  applicant_name: string;
  applicant_email: string;
  applicant_role: string;
  applicant_location: string;
};

type Props = {
  applications: AdminApplication[];
  adminEmail: string;
};

const initialState: ReviewState = {
  error: "",
  success: "",
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "#FFF4D6",
    color: "#191010",
    padding: "36px 20px 70px",
  } as const,
  container: {
    maxWidth: 1180,
    margin: "0 auto",
  } as const,
  card: {
    background: "#FFFFFF",
    border: "1px solid #EADFC9",
    borderRadius: 16,
    padding: 22,
  } as const,
  muted: {
    color: "#756B62",
    fontSize: 14,
  } as const,
  button: {
    background: "#8F080D",
    color: "#FFFFFF",
    border: 0,
    borderRadius: 8,
    padding: "11px 16px",
    fontWeight: 600,
    cursor: "pointer",
  } as const,
  input: {
    width: "100%",
    boxSizing: "border-box" as const,
    padding: 12,
    border: "1px solid #EADFC9",
    borderRadius: 8,
    background: "#FFFFFF",
    color: "#191010",
    font: "inherit",
  } as const,
};

function statusColor(status: string) {
  switch (status) {
    case "approved":
      return { background: "#E7F5E9", color: "#176B32" };
    case "rejected":
      return { background: "#FCE8E8", color: "#A31515" };
    case "pending":
      return { background: "#FFF1CC", color: "#865A00" };
    case "more_information_required":
      return { background: "#E9EDFF", color: "#344A9A" };
    default:
      return { background: "#F0ECE7", color: "#62584F" };
  }
}

function formatStatus(status: string) {
  return status.replaceAll("_", " ");
}

function ReviewForm({
  application,
}: {
  application: AdminApplication;
}) {
  const [state, formAction, pending] = useActionState(
    reviewVerification,
    initialState
  );

  return (
    <form
      action={formAction}
      style={{
        marginTop: 20,
        paddingTop: 18,
        borderTop: "1px solid #EADFC9",
        display: "grid",
        gap: 12,
      }}
    >
      <input
        type="hidden"
        name="application_id"
        value={application.id}
      />

      <label style={{ fontWeight: 600 }}>
        Private admin note
      </label>

      <textarea
        name="admin_note"
        maxLength={1000}
        defaultValue={application.admin_note}
        placeholder="Add a review note or explain what information is missing..."
        rows={3}
        style={{
          ...styles.input,
          resize: "vertical",
        }}
      />

      {state.error && (
        <p role="alert" style={{ color: "#A31515", margin: 0 }}>
          {state.error}
        </p>
      )}

      {state.success && (
        <p role="status" style={{ color: "#176B32", margin: 0 }}>
          {state.success}
        </p>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 9,
        }}
      >
        <button
          type="submit"
          name="status"
          value="approved"
          disabled={pending}
          style={{
            ...styles.button,
            background: "#176B32",
          }}
        >
          {pending ? "Saving..." : "Approve"}
        </button>

        <button
          type="submit"
          name="status"
          value="rejected"
          disabled={pending}
          style={{
            ...styles.button,
            background: "#A31515",
          }}
        >
          Reject
        </button>

        <button
          type="submit"
          name="status"
          value="more_information_required"
          disabled={pending}
          style={{
            ...styles.button,
            background: "#344A9A",
          }}
        >
          Request information
        </button>
      </div>
    </form>
  );
}

export default function AdminDashboard({
  applications,
  adminEmail,
}: Props) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const pendingCount = applications.filter(
    (item) => item.status === "pending"
  ).length;

  const approvedCount = applications.filter(
    (item) => item.status === "approved"
  ).length;

  const rejectedCount = applications.filter(
    (item) => item.status === "rejected"
  ).length;

  const filteredApplications = applications.filter((item) => {
    const matchesFilter =
      filter === "all" || item.status === filter;

    const searchText = [
      item.applicant_name,
      item.applicant_email,
      item.district,
      item.hometown,
    ]
      .join(" ")
      .toLowerCase();

    return (
      matchesFilter &&
      searchText.includes(search.toLowerCase())
    );
  });

  const stats = [
    {
      label: "Total applications",
      value: applications.length,
    },
    {
      label: "Pending reviews",
      value: pendingCount,
    },
    {
      label: "Approved members",
      value: approvedCount,
    },
    {
      label: "Rejected applications",
      value: rejectedCount,
    },
  ];

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <header
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 18,
            marginBottom: 32,
          }}
        >
          <div>
            <p
              style={{
                color: "#8F080D",
                fontWeight: 700,
                letterSpacing: 2,
                fontSize: 12,
              }}
            >
              NAMMAVARU · ADMINISTRATION
            </p>
            <h1 style={{ fontSize: 34, margin: "8px 0" }}>
              Admin Dashboard
            </h1>
            <p style={styles.muted}>
              Manage community applications and member verification.
            </p>
          </div>

          <div style={styles.card}>
            <p style={{ ...styles.muted, margin: 0 }}>
              Signed in as administrator
            </p>
            <strong>{adminEmail}</strong>
          </div>
        </header>

        <section
          aria-label="Application statistics"
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(190px, 1fr))",
            gap: 14,
            marginBottom: 30,
          }}
        >
          {stats.map((stat) => (
            <div key={stat.label} style={styles.card}>
              <p style={styles.muted}>{stat.label}</p>
              <strong style={{ fontSize: 32 }}>
                {stat.value}
              </strong>
            </div>
          ))}
        </section>

        <section>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 14,
              marginBottom: 18,
            }}
          >
            <div>
              <h2 style={{ fontSize: 23, margin: 0 }}>
                Community applications
              </h2>
              <p style={styles.muted}>
                Review applicant details before making a decision.
              </p>
            </div>

            <input
              aria-label="Search applications"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search name, email or district..."
              style={{
                ...styles.input,
                maxWidth: 320,
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginBottom: 20,
            }}
          >
            {[
              "all",
              "pending",
              "approved",
              "rejected",
              "more_information_required",
            ].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                style={{
                  padding: "9px 13px",
                  borderRadius: 30,
                  border:
                    filter === item
                      ? "1px solid #8F080D"
                      : "1px solid #EADFC9",
                  background:
                    filter === item ? "#8F080D" : "#FFFFFF",
                  color:
                    filter === item ? "#FFFFFF" : "#191010",
                  cursor: "pointer",
                  textTransform: "capitalize",
                }}
              >
                {formatStatus(item)}
              </button>
            ))}
          </div>

          {filteredApplications.length === 0 && (
            <div style={styles.card}>
              <h3>No applications found</h3>
              <p style={styles.muted}>
                There are no applications matching this filter.
              </p>
            </div>
          )}

          <div style={{ display: "grid", gap: 18 }}>
            {filteredApplications.map((application) => (
              <article
                key={application.id}
                style={styles.card}
              >
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 12,
                  }}
                >
                  <div>
                    <h3 style={{ margin: "0 0 6px", fontSize: 21 }}>
                      {application.applicant_name}
                    </h3>
                    <p style={{ ...styles.muted, margin: 0 }}>
                      {application.applicant_email}
                    </p>
                    <p style={{ ...styles.muted, margin: "5px 0" }}>
                      Account type: {application.applicant_role}
                    </p>
                  </div>

                  <span
                    style={{
                      ...statusColor(application.status),
                      padding: "7px 12px",
                      borderRadius: 30,
                      fontSize: 12,
                      fontWeight: 700,
                      textTransform: "capitalize",
                    }}
                  >
                    {formatStatus(application.status)}
                  </span>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: 16,
                    marginTop: 20,
                  }}
                >
                  <div>
                    <p style={styles.muted}>District</p>
                    <strong>{application.district}</strong>
                  </div>

                  <div>
                    <p style={styles.muted}>Hometown</p>
                    <strong>{application.hometown}</strong>
                  </div>

                  <div>
                    <p style={styles.muted}>Current location</p>
                    <strong>
                      {application.applicant_location || "Not provided"}
                    </strong>
                  </div>

                  <div>
                    <p style={styles.muted}>Submitted</p>
                    <strong>
                      {new Date(
                        application.created_at
                      ).toLocaleDateString("en-IN")}
                    </strong>
                  </div>
                </div>

                <div style={{ marginTop: 18 }}>
                  <p style={styles.muted}>
                    Karnataka connection
                  </p>
                  <p style={{ whiteSpace: "pre-wrap" }}>
                    {application.karnataka_connection || "Not provided"}
                  </p>

                  <p style={styles.muted}>Kannada assessment response</p>
                  <p style={{ whiteSpace: "pre-wrap" }}>
                    {application.kannada_response || "Not provided"}
                  </p>

                  <p style={styles.muted}>Introduction</p>
                  <p style={{ whiteSpace: "pre-wrap" }}>
                    {application.introduction}
                  </p>

                  {application.reviewed_at && (
                    <p style={styles.muted}>
                      Last reviewed:{" "}
                      {new Date(
                        application.reviewed_at
                      ).toLocaleString("en-IN")}
                    </p>
                  )}
                </div>

                <ReviewForm application={application} />
              </article>
            ))}
          </div>
        </section>

        <footer
          style={{
            marginTop: 38,
            paddingTop: 20,
            borderTop: "1px solid #EADFC9",
            color: "#756B62",
            fontSize: 13,
          }}
        >
          Nammavaru Administration · Review applications fairly
          and protect member information.
        </footer>
      </div>
    </main>
  );
}
