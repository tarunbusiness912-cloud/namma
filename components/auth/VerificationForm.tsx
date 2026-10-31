
"use client";

import { useActionState } from "react";
import {
  submitVerification,
  type VerificationState,
} from "@/app/(platform)/onboarding/actions";

const initialState: VerificationState = {
  error: "",
  success: "",
};

const districts = [
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

type VerificationValues = {
  district: string;
  hometown: string;
  karnataka_connection: string;
  kannada_response: string;
  introduction: string;
};

type VerificationFormProps = {
  initialValues?: VerificationValues;
  adminNote?: string;
  isResubmission?: boolean;
};

export default function VerificationForm({
  initialValues,
  adminNote = "",
  isResubmission = false,
}: VerificationFormProps) {
  const [state, formAction, pending] = useActionState(
    submitVerification,
    initialState
  );

  return (
    <main className="verification-page">
      <section className="verification-card">
        <div className="verification-brand">
          <span className="verification-brand-mark">ನ</span>
          <span>Nammavaru</span>
        </div>

        <div className="verification-heading">
          <p className="verification-eyebrow">
            ನಮ್ಮವರು · COMMUNITY VERIFICATION
          </p>

          <h1>
            {isResubmission
              ? "Update your application."
              : "Let’s get to know you."}
          </h1>

          <p>
            {isResubmission
              ? "Our community team needs a little more information. Review the feedback and update your answers below."
              : "Tell us about your connection to Karnataka. Your application will be reviewed by our community team."}
          </p>
        </div>

        {isResubmission && (
          <div
            role="note"
            style={{
              background: "#FFF4D6",
              border: "1px solid #EADFC9",
              borderLeft: "4px solid #C81018",
              borderRadius: 10,
              padding: 16,
              marginBottom: 22,
            }}
          >
            <strong
              style={{
                display: "block",
                color: "#8F080D",
                marginBottom: 8,
              }}
            >
              Additional information requested
            </strong>

            <p
              style={{
                margin: 0,
                color: "#191010",
                whiteSpace: "pre-wrap",
              }}
            >
              {adminNote ||
                "Please review and update your application details."}
            </p>
          </div>
        )}

        <form action={formAction} className="verification-form">
          <div className="verification-section-heading">
            <span>01</span>
            <div>
              <h2>Your Karnataka connection</h2>
              <p>Tell us where your roots or connection are.</p>
            </div>
          </div>

          <label htmlFor="district">Karnataka district</label>

          <select
            id="district"
            name="district"
            required
            defaultValue={initialValues?.district ?? ""}
          >
            <option value="" disabled>
              Select your district
            </option>

            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>

          <label htmlFor="hometown">Your hometown or place</label>

          <input
            id="hometown"
            name="hometown"
            type="text"
            placeholder="Example: Davanagere"
            minLength={2}
            maxLength={100}
            required
            defaultValue={initialValues?.hometown ?? ""}
          />

          <label htmlFor="karnataka_connection">
            How are you connected to Karnataka?
          </label>

          <textarea
            id="karnataka_connection"
            name="karnataka_connection"
            placeholder="Tell us about your hometown, family, education, work or community connection..."
            minLength={20}
            maxLength={1000}
            rows={4}
            required
            defaultValue={
              initialValues?.karnataka_connection ?? ""
            }
          />

          <div className="verification-section-heading">
            <span>02</span>
            <div>
              <h2>Kannada language check</h2>
              <p>
                Read this short passage and answer the question.
              </p>
            </div>
          </div>

          <div className="kannada-passage">
            <p lang="kn">
              ರವಿ ಪ್ರತಿದಿನ ಬೆಳಿಗ್ಗೆ ಕನ್ನಡ ಪತ್ರಿಕೆ ಓದುತ್ತಾನೆ.
              ಅವನು ಮೈಸೂರಿನಲ್ಲಿ ವಾಸಿಸುತ್ತಾನೆ.
              ವಾರಾಂತ್ಯದಲ್ಲಿ ತನ್ನ ಸ್ನೇಹಿತರೊಂದಿಗೆ ಗ್ರಂಥಾಲಯಕ್ಕೆ ಹೋಗುತ್ತಾನೆ.
            </p>
          </div>

          <label htmlFor="kannada_response">
            ಪ್ರಶ್ನೆ: ರವಿ ಯಾವ ನಗರದಲ್ಲಿ ವಾಸಿಸುತ್ತಾನೆ?
          </label>

          <input
            id="kannada_response"
            name="kannada_response"
            type="text"
            placeholder="ನಿಮ್ಮ ಉತ್ತರವನ್ನು ಬರೆಯಿರಿ"
            minLength={2}
            maxLength={200}
            required
            defaultValue={
              initialValues?.kannada_response ?? ""
            }
          />

          <div className="verification-section-heading">
            <span>03</span>
            <div>
              <h2>Your introduction</h2>
              <p>Help us understand why you want to join.</p>
            </div>
          </div>

          <label htmlFor="introduction">
            Why do you want to join Nammavaru?
          </label>

          <textarea
            id="introduction"
            name="introduction"
            placeholder="Introduce yourself and tell us how you would contribute to the Kannada community..."
            minLength={20}
            maxLength={1000}
            rows={4}
            required
            defaultValue={initialValues?.introduction ?? ""}
          />

          {state.error && (
            <p className="verification-error" role="alert">
              {state.error}
            </p>
          )}

          {state.success && (
            <p className="verification-success" role="status">
              {state.success}
            </p>
          )}

          <button
            type="submit"
            className="verification-submit"
            disabled={pending}
          >
            {pending
              ? isResubmission
                ? "Resubmitting application..."
                : "Submitting application..."
              : isResubmission
                ? "Resubmit application"
                : "Submit for review"}

            {!pending && <span>→</span>}
          </button>

          <p className="verification-privacy">
            Your answers are used only for community verification.
            Approval is reviewed by the Nammavaru team.
          </p>
        </form>
      </section>
    </main>
  );
}
