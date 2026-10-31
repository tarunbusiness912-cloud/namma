
"use client";

import { useMemo, useState } from "react";
import Reveal from "@/components/ui/Reveal";

type Opportunity = {
  id: number;
  type: "Job" | "Internship" | "Referral";
  role: string;
  company: string;
  location: string;
  mode: string;
  skills: string[];
  featured?: boolean;
};

const opportunities: Opportunity[] = [
  {
    id: 1,
    type: "Internship",
    role: "Software Development Intern",
    company: "Early-career opportunities",
    location: "Bengaluru",
    mode: "Hybrid",
    skills: ["Python", "React", "APIs"],
    featured: true,
  },
  {
    id: 2,
    type: "Job",
    role: "Junior Backend Developer",
    company: "Technology teams",
    location: "Bengaluru",
    mode: "On-site",
    skills: ["Python", "SQL", "REST APIs"],
  },
  {
    id: 3,
    type: "Referral",
    role: "Connect with tech professionals",
    company: "Community referrals",
    location: "Karnataka",
    mode: "Community",
    skills: ["Networking", "Career growth"],
  },
  {
    id: 4,
    type: "Internship",
    role: "Frontend Developer Intern",
    company: "Startup opportunities",
    location: "Remote",
    mode: "Remote",
    skills: ["JavaScript", "React", "CSS"],
  },
];

const categories = ["All opportunities", "Jobs", "Internships", "Referrals"];

const copy = {
  en: {
    navOpportunities: "Opportunities",
    navInternships: "Internships",
    navReferrals: "Referrals",
    navEmployers: "For employers",
    signIn: "Sign in",
    join: "Join ನಮ್ಮವರು",
    eyebrow: "ಕರ್ನಾಟಕದ ಪ್ರತಿಭೆಗಳಿಗೆ · BUILT FOR OUR PEOPLE",
    heroLine1: "ನಮ್ಮವರ ಜೊತೆ,",
    heroLine2: "ನಿಮ್ಮ ಮುಂದಿನ ಹೆಜ್ಜೆ.",
    subtitle: "Find opportunities. Meet your people. Grow together.",
    description:
      "Jobs, internships and referrals from a community that understands where you come from — and where you want to go.",
    explore: "ಅವಕಾಶ ಹುಡುಕಿ",
    community: "ನಮ್ಮವರ ಜೊತೆ ಸೇರಿ",
    trust: "A community for students, freshers, professionals and employers across Karnataka.",
    communityLabel: "A community that moves careers forward",
    communityTitle: "Good opportunities travel through people.",
    communityDescription:
      "Sometimes, your next step starts with a conversation, a referral or someone who believes in your potential.",
    searchTitle: "Your next opportunity starts here.",
    searchDescription:
      "Explore career opportunities and find a path that fits you.",
    searchPlaceholder: "Search roles, skills or locations...",
    searchButton: "Search",
    featured: "A place to start",
    viewAll: "Explore opportunities",
    howTitle: "Your next step, made simpler.",
    howDescription:
      "No complicated process. Just people, possibilities and progress.",
    step1Title: "Discover",
    step1Description:
      "Find jobs, internships and opportunities that match your interests.",
    step2Title: "Connect",
    step2Description:
      "Learn from people in your community and discover referral pathways.",
    step3Title: "Grow",
    step3Description:
      "Build your experience, expand your network and take your next step.",
    peopleTitle: "Wherever you are in your journey, you belong here.",
    students: "Students",
    studentsDesc: "Explore internships and take your first career step.",
    freshers: "Freshers",
    freshersDesc: "Find entry-level roles and build your professional path.",
    professionals: "Professionals",
    professionalsDesc: "Share knowledge, build connections and grow together.",
    employers: "Employers",
    employersDesc: "Discover emerging talent and connect with the community.",
    ctaTitle: "Your next opportunity could start with ನಮ್ಮವರು.",
    ctaDesc:
      "Join a growing community built around shared roots and new possibilities.",
    ctaButton: "Be part of the community",
    footerText: "ನಮ್ಮ ಜನ. ನಮ್ಮ ಅವಕಾಶಗಳು.",
    footerDescription:
      "Connecting Karnataka's talent with opportunities, people and possibilities.",
    browse: "Browse",
    communityLink: "Community",
    forEmployers: "For employers",
    disclaimer:
      "Sample opportunities shown for design purposes. Live listings will appear when verified opportunities are connected.",
    emptyTitle: "No matching opportunities yet.",
    emptyDescription: "Try another keyword or choose a different category.",
    clearFilters: "Clear filters",
  },
  kn: {
    navOpportunities: "ಅವಕಾಶಗಳು",
    navInternships: "ಇಂಟರ್ನ್‌ಶಿಪ್‌ಗಳು",
    navReferrals: "ರೆಫರಲ್‌ಗಳು",
    navEmployers: "ಉದ್ಯೋಗದಾತರಿಗೆ",
    signIn: "ಲಾಗಿನ್",
    join: "ನಮ್ಮವರ ಜೊತೆ ಸೇರಿ",
    eyebrow: "ಕರ್ನಾಟಕದ ಪ್ರತಿಭೆಗಳಿಗೆ · BUILT FOR OUR PEOPLE",
    heroLine1: "ನಮ್ಮವರ ಜೊತೆ,",
    heroLine2: "ನಿಮ್ಮ ಮುಂದಿನ ಹೆಜ್ಜೆ.",
    subtitle: "ಅವಕಾಶಗಳನ್ನು ಹುಡುಕಿ. ನಿಮ್ಮವರನ್ನು ಭೇಟಿ ಮಾಡಿ. ಒಟ್ಟಿಗೆ ಬೆಳೆಯಿರಿ.",
    description:
      "ನಿಮ್ಮ ಹಿನ್ನೆಲೆಯನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವ ಸಮುದಾಯದ ಮೂಲಕ ಉದ್ಯೋಗಗಳು, ಇಂಟರ್ನ್‌ಶಿಪ್‌ಗಳು ಮತ್ತು ರೆಫರಲ್‌ಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.",
    explore: "ಅವಕಾಶ ಹುಡುಕಿ",
    community: "ನಮ್ಮವರ ಜೊತೆ ಸೇರಿ",
    trust:
      "ಕರ್ನಾಟಕದ ವಿದ್ಯಾರ್ಥಿಗಳು, ಫ್ರೆಶರ್‌ಗಳು, ವೃತ್ತಿಪರರು ಮತ್ತು ಉದ್ಯೋಗದಾತರಿಗಾಗಿ ಒಂದು ಸಮುದಾಯ.",
    communityLabel: "ವೃತ್ತಿಜೀವನಕ್ಕೆ ಹೊಸ ದಾರಿ",
    communityTitle: "ಒಳ್ಳೆಯ ಅವಕಾಶಗಳು ಜನರ ಮೂಲಕ ತಲುಪುತ್ತವೆ.",
    communityDescription:
      "ಕೆಲವೊಮ್ಮೆ ನಿಮ್ಮ ಮುಂದಿನ ಹೆಜ್ಜೆ ಒಂದು ಮಾತುಕತೆ, ಒಂದು ರೆಫರಲ್ ಅಥವಾ ನಿಮ್ಮ ಸಾಮರ್ಥ್ಯವನ್ನು ನಂಬುವ ವ್ಯಕ್ತಿಯಿಂದ ಆರಂಭವಾಗುತ್ತದೆ.",
    searchTitle: "ನಿಮ್ಮ ಮುಂದಿನ ಅವಕಾಶ ಇಲ್ಲಿಂದ ಆರಂಭವಾಗಲಿ.",
    searchDescription:
      "ನಿಮಗೆ ಹೊಂದುವ ಉದ್ಯೋಗ ಮತ್ತು ವೃತ್ತಿ ಅವಕಾಶಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.",
    searchPlaceholder: "ಹುದ್ದೆ, ಕೌಶಲ್ಯ ಅಥವಾ ಸ್ಥಳ ಹುಡುಕಿ...",
    searchButton: "ಹುಡುಕಿ",
    featured: "ಇಲ್ಲಿಂದ ಆರಂಭಿಸಿ",
    viewAll: "ಎಲ್ಲಾ ಅವಕಾಶಗಳನ್ನು ನೋಡಿ",
    howTitle: "ನಿಮ್ಮ ಮುಂದಿನ ಹೆಜ್ಜೆ, ಇನ್ನಷ್ಟು ಸುಲಭ.",
    howDescription: "ಜನರು, ಅವಕಾಶಗಳು ಮತ್ತು ಬೆಳವಣಿಗೆ — ಒಂದೇ ಸಮುದಾಯದಲ್ಲಿ.",
    step1Title: "ಅನ್ವೇಷಿಸಿ",
    step1Description:
      "ನಿಮ್ಮ ಆಸಕ್ತಿಗೆ ಹೊಂದುವ ಉದ್ಯೋಗಗಳು ಮತ್ತು ಇಂಟರ್ನ್‌ಶಿಪ್‌ಗಳನ್ನು ಹುಡುಕಿ.",
    step2Title: "ಸಂಪರ್ಕಿಸಿ",
    step2Description:
      "ನಿಮ್ಮ ಸಮುದಾಯದ ಜನರಿಂದ ಕಲಿಯಿರಿ ಮತ್ತು ರೆಫರಲ್ ಅವಕಾಶಗಳನ್ನು ತಿಳಿಯಿರಿ.",
    step3Title: "ಬೆಳೆಯಿರಿ",
    step3Description:
      "ಅನುಭವ ಬೆಳೆಸಿಕೊಳ್ಳಿ, ಸಂಪರ್ಕಗಳನ್ನು ವಿಸ್ತರಿಸಿ ಮತ್ತು ಮುಂದುವರಿಯಿರಿ.",
    peopleTitle: "ನಿಮ್ಮ ಪ್ರಯಾಣದ ಯಾವುದೇ ಹಂತದಲ್ಲಿದ್ದರೂ, ಇಲ್ಲಿ ನಿಮಗೂ ಸ್ಥಾನವಿದೆ.",
    students: "ವಿದ್ಯಾರ್ಥಿಗಳು",
    studentsDesc: "ಇಂಟರ್ನ್‌ಶಿಪ್‌ಗಳನ್ನು ಹುಡುಕಿ, ನಿಮ್ಮ ವೃತ್ತಿಜೀವನ ಆರಂಭಿಸಿ.",
    freshers: "ಫ್ರೆಶರ್‌ಗಳು",
    freshersDesc: "ಆರಂಭಿಕ ಹುದ್ದೆಗಳನ್ನು ಹುಡುಕಿ, ನಿಮ್ಮ ವೃತ್ತಿಪಥ ರೂಪಿಸಿ.",
    professionals: "ವೃತ್ತಿಪರರು",
    professionalsDesc: "ಜ್ಞಾನ ಹಂಚಿಕೊಳ್ಳಿ, ಸಂಪರ್ಕ ಬೆಳೆಸಿ, ಒಟ್ಟಿಗೆ ಬೆಳೆಯಿರಿ.",
    employers: "ಉದ್ಯೋಗದಾತರು",
    employersDesc: "ಹೊಸ ಪ್ರತಿಭೆಗಳನ್ನು ಗುರುತಿಸಿ, ಸಮುದಾಯದೊಂದಿಗೆ ಸಂಪರ್ಕಿಸಿ.",
    ctaTitle: "ನಿಮ್ಮ ಮುಂದಿನ ಅವಕಾಶ ನಮ್ಮವರಿಂದ ಆರಂಭವಾಗಬಹುದು.",
    ctaDesc:
      "ನಮ್ಮ ನೆಲೆಯ ಸಂಪರ್ಕ ಮತ್ತು ಹೊಸ ಸಾಧ್ಯತೆಗಳನ್ನು ಬೆಸೆಯುವ ಸಮುದಾಯಕ್ಕೆ ಸೇರಿ.",
    ctaButton: "ಸಮುದಾಯದ ಭಾಗವಾಗಿ",
    footerText: "ನಮ್ಮ ಜನ. ನಮ್ಮ ಅವಕಾಶಗಳು.",
    footerDescription:
      "ಕರ್ನಾಟಕದ ಪ್ರತಿಭೆಗಳನ್ನು ಅವಕಾಶಗಳು ಮತ್ತು ಜನರೊಂದಿಗೆ ಸಂಪರ್ಕಿಸುವ ವೇದಿಕೆ.",
    browse: "ಅನ್ವೇಷಿಸಿ",
    communityLink: "ಸಮುದಾಯ",
    forEmployers: "ಉದ್ಯೋಗದಾತರಿಗೆ",
    disclaimer:
      "ವಿನ್ಯಾಸದ ಉದಾಹರಣೆಗಾಗಿ ಮಾದರಿ ಅವಕಾಶಗಳನ್ನು ತೋರಿಸಲಾಗಿದೆ. ಪರಿಶೀಲಿಸಿದ ಅವಕಾಶಗಳನ್ನು ಸಂಪರ್ಕಿಸಿದ ನಂತರ ನೈಜ ಪಟ್ಟಿಗಳು ಕಾಣಿಸುತ್ತವೆ.",
    emptyTitle: "ಹೊಂದುವ ಅವಕಾಶಗಳು ಸದ್ಯಕ್ಕೆ ಕಂಡುಬಂದಿಲ್ಲ.",
    emptyDescription: "ಬೇರೆ ಪದವನ್ನು ಹುಡುಕಿ ಅಥವಾ ಮತ್ತೊಂದು ವಿಭಾಗ ಆಯ್ಕೆಮಾಡಿ.",
    clearFilters: "ಫಿಲ್ಟರ್ ತೆರವುಗೊಳಿಸಿ",
  },
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

function SearchIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="10.8"
        cy="10.8"
        r="6.8"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="m16 16 4.2 4.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function OpportunityIcon({ type }: { type: Opportunity["type"] }) {
  if (type === "Internship") {
    return <span aria-hidden="true">↗</span>;
  }
  if (type === "Referral") {
    return <span aria-hidden="true">◎</span>;
  }
  return <span aria-hidden="true">⌘</span>;
}

export default function HomePage() {
  const [language, setLanguage] = useState<"en" | "kn">("en");
  const [activeCategory, setActiveCategory] = useState("All opportunities");
  const [search, setSearch] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = copy[language];

  const filteredOpportunities = useMemo(() => {
    const query = search.trim().toLowerCase();

    return opportunities.filter((item) => {
      const categoryMatch =
        activeCategory === "All opportunities" ||
        (activeCategory === "Jobs" && item.type === "Job") ||
        (activeCategory === "Internships" && item.type === "Internship") ||
        (activeCategory === "Referrals" && item.type === "Referral");

      const searchableText = [
        item.role,
        item.company,
        item.location,
        item.mode,
        item.type,
        ...item.skills,
      ]
        .join(" ")
        .toLowerCase();

      return categoryMatch && (!query || searchableText.includes(query));
    });
  }, [activeCategory, search]);

  function scrollToOpportunities() {
    document.getElementById("opportunities")?.scrollIntoView({
      behavior: "smooth",
    });
    setMobileMenuOpen(false);
  }


  return (
    <main className="site-shell">
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

        <button
          className="mobile-menu-button"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>

        <nav className={`main-nav ${mobileMenuOpen ? "nav-open" : ""}`}>
          <a href="#opportunities" onClick={() => setMobileMenuOpen(false)}>
            {t.navOpportunities}
          </a>
          <a
            href="#opportunities"
            onClick={() => {
              setActiveCategory("Internships");
              setMobileMenuOpen(false);
            }}
          >
            {t.navInternships}
          </a>
          <a
            href="#opportunities"
            onClick={() => {
              setActiveCategory("Referrals");
              setMobileMenuOpen(false);
            }}
          >
            {t.navReferrals}
          </a>
          <a href="#employers" onClick={() => setMobileMenuOpen(false)}>
            {t.navEmployers}
          </a>
          <div className="mobile-nav-actions">
            <button
              className="language-toggle"
              onClick={() =>
                setLanguage((current) => (current === "en" ? "kn" : "en"))
              }
              type="button"
            >
              {language === "en" ? "ಕನ್ನಡ" : "English"}
            </button>
            <a className="button button-primary nav-join" href="/register">
              {t.join} <ArrowUpRight />
            </a>
          </div>
        </nav>

        <div className="header-actions">
          <button
            className="language-toggle"
            onClick={() =>
              setLanguage((current) => (current === "en" ? "kn" : "en"))
            }
            type="button"
            aria-label="Switch website language"
          >
            {language === "en" ? "ಕನ್ನಡ" : "English"}
          </button>
          <a className="sign-in-link" href="/login">
            {t.signIn}
          </a>
          <a className="button button-primary nav-join" href="/register">
            {t.join} <ArrowUpRight />
          </a>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <div className="eyebrow reveal">
            <span className="eyebrow-line" />
            {t.eyebrow}
          </div>

          <h1 className="hero-title reveal reveal-delay-1">
            {t.heroLine1}
            <br />
            <span className="hero-title-accent">{t.heroLine2}</span>
          </h1>

          <p className="hero-subtitle reveal reveal-delay-2">{t.subtitle}</p>

          <p className="hero-description reveal reveal-delay-2">
            {t.description}
          </p>

          <div className="hero-actions reveal reveal-delay-3">
            <button
              className="button button-primary button-large"
              onClick={scrollToOpportunities}
              type="button"
            >
              {t.explore} <ArrowUpRight />
            </button>
            <a className="button button-secondary button-large" href="/register">
              {t.community}
            </a>
          </div>

          <div className="hero-note reveal reveal-delay-3">
            <span className="note-star">✳</span>
            <span>{t.trust}</span>
          </div>
        </div>

        <Reveal direction="left" delay={180}>
          <div className="hero-art" aria-label="Nammavaru community illustration">
          <div className="art-topline">
            <span>ಕರ್ನಾಟಕ / 01</span>
            <span>PEOPLE · PURPOSE · POSSIBILITY</span>
          </div>

          <div className="art-stage">
            <div className="art-sun" />
            <div className="art-circle art-circle-one" />
            <div className="art-circle art-circle-two" />

            <div className="art-building">
              <div className="palace-roof roof-one" />
              <div className="palace-roof roof-two" />
              <div className="palace-center">
                <div className="palace-dome" />
                <div className="palace-window-row">
                  <i />
                  <i />
                  <i />
                </div>
                <div className="palace-arch" />
                <div className="palace-base" />
              </div>
              <div className="palace-wing wing-left">
                <i />
                <i />
                <i />
              </div>
              <div className="palace-wing wing-right">
                <i />
                <i />
                <i />
              </div>
              <div className="palace-ground" />
            </div>

            <div className="art-caption art-caption-left">
              <span className="caption-index">01 /</span>
              <span>OUR ROOTS</span>
            </div>
            <div className="art-caption art-caption-right">
              <span className="caption-index">02 /</span>
              <span>OUR FUTURE</span>
            </div>

            <div className="floating-note floating-note-top">
              <span className="floating-note-icon">✳</span>
              <span>
                <strong>ನಮ್ಮ ಜನ</strong>
                <small>Our people</small>
              </span>
            </div>

            <div className="floating-note floating-note-bottom">
              <span className="floating-note-icon note-yellow">↗</span>
              <span>
                <strong>ಹೊಸ ಅವಕಾಶ</strong>
                <small>A new opportunity</small>
              </span>
            </div>
          </div>

          <div className="art-footer">
            <span>ಕರ್ನಾಟಕದಿಂದ ಜಗತ್ತಿನವರೆಗೆ</span>
            <span>FROM KARNATAKA, TO THE WORLD ↗</span>
          </div>
          </div>
        </Reveal>
      </section>

      <div className="values-strip">
        <span>01 &nbsp; CAREERS</span>
        <span className="values-separator">✳</span>
        <span>02 &nbsp; CONNECTIONS</span>
        <span className="values-separator">✳</span>
        <span>03 &nbsp; COMMUNITY</span>
        <span className="values-separator">✳</span>
        <span>04 &nbsp; GROWTH</span>
      </div>

      <Reveal direction="up">
         <section className="opportunities-section section-padding" id="opportunities">
        <div className="section-heading">
          <div>
            <p className="section-kicker">
              <span className="kicker-number">01</span>
              {t.featured}
            </p>
            <h2>{t.searchTitle}</h2>
            <p className="section-description">{t.searchDescription}</p>
          </div>
          <a className="text-link desktop-link" href="#opportunity-list">
            {t.viewAll} <ArrowUpRight />
          </a>
        </div>

        <form
          className="search-panel"
          onSubmit={(event) => {
            event.preventDefault();
            document.getElementById("opportunity-list")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        >
          <div className="search-input-wrap">
            <SearchIcon />
            <input
              type="search"
              placeholder={t.searchPlaceholder}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label={t.searchPlaceholder}
            />
          </div>
          <button className="button button-primary search-button" type="submit">
            {t.searchButton} <ArrowUpRight />
          </button>
        </form>

        <div className="filter-row" role="group" aria-label="Filter opportunities">
          <div className="filter-tabs">
            {categories.map((category) => {
              const label =
                category === "All opportunities"
                  ? language === "kn"
                    ? "ಎಲ್ಲಾ ಅವಕಾಶಗಳು"
                    : category
                  : category === "Jobs"
                    ? language === "kn"
                      ? "ಉದ್ಯೋಗಗಳು"
                      : category
                    : category === "Internships"
                      ? language === "kn"
                        ? "ಇಂಟರ್ನ್‌ಶಿಪ್‌ಗಳು"
                        : category
                      : language === "kn"
                        ? "ರೆಫರಲ್‌ಗಳು"
                        : category;

              return (
                <button
                  key={category}
                  className={`filter-tab ${
                    activeCategory === category ? "filter-tab-active" : ""
                  }`}
                  onClick={() => setActiveCategory(category)}
                  type="button"
                  aria-pressed={activeCategory === category}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <span className="result-count">
            {filteredOpportunities.length}{" "}
            {language === "kn" ? "ಫಲಿತಾಂಶಗಳು" : "results"}
          </span>
        </div>

        <div className="opportunity-grid" id="opportunity-list">
          {filteredOpportunities.map((item, index) => (
            <article
              className="opportunity-card"
              key={item.id}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="opportunity-card-top">
                <span className={`opportunity-icon icon-${item.type.toLowerCase()}`}>
                  <OpportunityIcon type={item.type} />
                </span>
                <span className={`type-label type-${item.type.toLowerCase()}`}>
                  {language === "kn"
                    ? item.type === "Job"
                      ? "ಉದ್ಯೋಗ"
                      : item.type === "Internship"
                        ? "ಇಂಟರ್ನ್‌ಶಿಪ್"
                        : "ರೆಫರಲ್"
                    : item.type}
                </span>
              </div>

              <h3>{item.role}</h3>
              <p className="company-name">{item.company}</p>

              <div className="opportunity-meta">
                <span>⌖ &nbsp;{item.location}</span>
                <span>◷ &nbsp;{item.mode}</span>
              </div>

              <div className="skill-list">
                {item.skills.map((skill) => (
                  <span className="skill-chip" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>

              <button
                className="card-link"
                type="button"
                onClick={() => {
                  alert(
                    "This is a sample listing. Connect a real opportunity detail page and verified listing data to enable applications."
                  );
                }}
              >
                {language === "kn" ? "ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ" : "Explore opportunity"}
                <ArrowUpRight />
              </button>
            </article>
          ))}
        </div>

        {filteredOpportunities.length === 0 && (
          <div className="empty-state">
            <span className="empty-state-icon">⌕</span>
            <h3>{t.emptyTitle}</h3>
            <p>{t.emptyDescription}</p>
            <button
              className="button button-secondary"
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All opportunities");
              }}
            >
              {t.clearFilters}
            </button>
          </div>
        )}

        <p className="listing-disclaimer">{t.disclaimer}</p>

        <a className="text-link mobile-view-all" href="#opportunity-list">
          {t.viewAll} <ArrowUpRight />
        </a>
      </section>
    </Reveal>

      <Reveal direction="up">
      <section className="community-section section-padding" id="community">
        <div className="community-intro">
          <p className="section-kicker">
            <span className="kicker-number">02</span>
            {t.communityLabel}
          </p>
          <h2>{t.communityTitle}</h2>
          <p className="section-description">{t.communityDescription}</p>
          <a className="text-link" href="/register">
            {t.community} <ArrowUpRight />
          </a>
        </div>

        <div className="community-visual">
          <div className="community-quote-mark">“</div>
          <p className="community-quote">
            ಒಟ್ಟಿಗೆ ಬೆಳೆಯೋಣ.
            <br />
            <span>Let’s grow together.</span>
          </p>
          <div className="community-bottom">
            <span>ROOTED IN KARNATAKA</span>
            <span className="community-flower">✳</span>
            <span>OPEN TO THE WORLD</span>
          </div>
        </div>
      </section>
      </Reveal>

      <Reveal direction="up">
      <section className="steps-section section-padding">
        <div className="section-heading">
          <div>
            <p className="section-kicker">
              <span className="kicker-number">03</span>
              {language === "kn" ? "ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ" : "HOW IT WORKS"}
            </p>
            <h2>{t.howTitle}</h2>
            <p className="section-description">{t.howDescription}</p>
          </div>
        </div>

        <div className="steps-grid">
          <article className="step-card">
            <span className="step-number">01</span>
            <div className="step-symbol">⌕</div>
            <h3>{t.step1Title}</h3>
            <p>{t.step1Description}</p>
            <span className="step-bottom-label">FIND YOUR PATH ↗</span>
          </article>
          <article className="step-card step-card-highlight">
            <span className="step-number">02</span>
            <div className="step-symbol">◎</div>
            <h3>{t.step2Title}</h3>
            <p>{t.step2Description}</p>
            <span className="step-bottom-label">MEET YOUR PEOPLE ↗</span>
          </article>
          <article className="step-card">
            <span className="step-number">03</span>
            <div className="step-symbol">↗</div>
            <h3>{t.step3Title}</h3>
            <p>{t.step3Description}</p>
            <span className="step-bottom-label">MAKE YOUR MOVE ↗</span>
          </article>
        </div>
      </section>
      </Reveal>

      <Reveal direction="up">
      <section className="people-section section-padding" id="employers">
        <div className="section-heading">
          <div>
            <p className="section-kicker">
              <span className="kicker-number">04</span>
              {language === "kn" ? "ನಿಮಗಾಗಿ ಒಂದು ಸ್ಥಳ" : "A PLACE FOR YOU"}
            </p>
            <h2>{t.peopleTitle}</h2>
          </div>
        </div>

        <div className="people-grid">
          <article className="people-card">
            <span className="people-index">01 / LEARN</span>
            <span className="people-symbol">↗</span>
            <h3>{t.students}</h3>
            <p>{t.studentsDesc}</p>
            <a href="#opportunities" aria-label={t.students}>
              <ArrowUpRight />
            </a>
          </article>
          <article className="people-card">
            <span className="people-index">02 / BEGIN</span>
            <span className="people-symbol">✳</span>
            <h3>{t.freshers}</h3>
            <p>{t.freshersDesc}</p>
            <a href="#opportunities" aria-label={t.freshers}>
              <ArrowUpRight />
            </a>
          </article>
          <article className="people-card">
            <span className="people-index">03 / CONNECT</span>
            <span className="people-symbol">◎</span>
            <h3>{t.professionals}</h3>
            <p>{t.professionalsDesc}</p>
            <a href="#community" aria-label={t.professionals}>
              <ArrowUpRight />
            </a>
          </article>
          <article className="people-card people-card-employer">
            <span className="people-index">04 / DISCOVER</span>
            <span className="people-symbol">⌘</span>
            <h3>{t.employers}</h3>
            <p>{t.employersDesc}</p>
            <a href="#join" aria-label={t.employers}>
              <ArrowUpRight />
            </a>
          </article>
        </div>
      </section>
      </Reveal>

      <Reveal direction="up">
      <section className="final-cta section-padding" id="join">
        <div className="cta-decoration cta-decoration-one" />
        <div className="cta-decoration cta-decoration-two" />
        <p className="cta-eyebrow">ನಮ್ಮ ಜನ. ನಮ್ಮ ಅವಕಾಶಗಳು.</p>
        <h2>{t.ctaTitle}</h2>
        <p>{t.ctaDesc}</p>
        <a className="button button-light button-large" href="/register">
          {t.ctaButton} <ArrowUpRight />
        </a>
        <span className="cta-note">
          Made with care in Karnataka <span>♥</span>
        </span>
      </section>
      </Reveal>

      <footer className="site-footer">
        <div className="footer-main">
          <a className="brand footer-brand" href="#home">
            <span className="brand-mark">ನ</span>
            <span className="brand-word">
              <strong>ನಮ್ಮವರು</strong>
              <small>NAMMAVARU</small>
            </span>
          </a>
          <p className="footer-description">{t.footerDescription}</p>

          <div className="footer-links">
            <div>
              <span className="footer-heading">{t.browse}</span>
              <a href="#opportunities">{t.navOpportunities}</a>
              <a
                href="#opportunities"
                onClick={() => setActiveCategory("Internships")}
              >
                {t.navInternships}
              </a>
              <a
                href="#opportunities"
                onClick={() => setActiveCategory("Referrals")}
              >
                {t.navReferrals}
              </a>
            </div>
            <div>
              <span className="footer-heading">{t.communityLink}</span>
              <a href="#community">{t.community}</a>
              <a href="/register">{t.join}</a>
              <a href="#employers">{t.forEmployers}</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Nammavaru</span>
          <span>{t.footerText}</span>
          <a href="#home">
            BACK TO TOP ↑
          </a>
        </div>
      </footer>
    </main>
  );
}
