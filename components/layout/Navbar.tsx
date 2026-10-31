
"use client";

type NavbarProps = {
  language: "en" | "kn";
  setLanguage: (language: "en" | "kn") => void;
  t: {
    navOpportunities: string;
    navInternships: string;
    navReferrals: string;
    navEmployers: string;
    signIn: string;
    join: string;
  };
};

function ArrowUpRight() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 17 17 7M7 7h10v10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Navbar({
  language,
  setLanguage,
  t,
}: NavbarProps) {
  const toggleLanguage = () => {
    setLanguage(language === "en" ? "kn" : "en");
  };

  return (
    <>
      <div className="announcement">
        <span className="announcement-dot" />
        <span>ಕರ್ನಾಟಕದ ಪ್ರತಿಭೆಗಳಿಗೆ</span>
        <span className="announcement-divider">/</span>
        <span>Built for our people, wherever they are.</span>
      </div>

      <header className="site-header">
        <a className="brand" href="#home" aria-label="Nammavaru home">
          <span className="brand-mark">ನ</span>
          <span className="brand-word">
            <strong>ನಮ್ಮವರು</strong>
            <small>NAMMAVARU</small>
          </span>
        </a>

        <nav className="main-nav">
          <a href="#opportunities">{t.navOpportunities}</a>
          <a href="#opportunities">{t.navInternships}</a>
          <a href="#opportunities">{t.navReferrals}</a>
          <a href="#employers">{t.navEmployers}</a>
        </nav>

        <div className="header-actions">
          <button
            className="language-toggle"
            onClick={toggleLanguage}
            type="button"
            aria-label="Switch website language"
          >
            {language === "en" ? "ಕನ್ನಡ" : "English"}
          </button>

          <a className="sign-in-link" href="#join">
            {t.signIn}
          </a>

          <a className="button button-primary nav-join" href="#join">
            {t.join} <ArrowUpRight />
          </a>
        </div>
      </header>
    </>
  );
}
