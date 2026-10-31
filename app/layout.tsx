
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nammavaru | ನಮ್ಮ ಜನ. ನಮ್ಮ ಅವಕಾಶಗಳು.",
  description:
    "Discover jobs, internships and career connections through Nammavaru — a community for students, freshers, professionals and employers across Karnataka.",
  applicationName: "Nammavaru",
  keywords: [
    "Nammavaru",
    "Kannada jobs",
    "Karnataka internships",
    "Bengaluru tech jobs",
    "fresher jobs in Karnataka",
    "job referrals",
    "Kannada professional community",
    "career opportunities for students",
  ],
  openGraph: {
    title: "Nammavaru — ನಮ್ಮ ಜನ. ನಮ್ಮ ಅವಕಾಶಗಳು.",
    description:
      "Find opportunities. Meet your people. Grow together.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
