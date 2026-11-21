import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { EmblemOfIndia, CircularI4CRingLogo, GovBadgeStrip } from '../components/GovLogos';
import Toastify from 'toastify-js';

export default function HomePage() {
  const { login } = useAuth();
  const { t, lang, setLang, fontScale, setFontScale } = useLanguage();
  const navigate = useNavigate();

  // Accessibility & UI State
  const [complaintModalOpen, setComplaintModalOpen] = useState(false);
  const [screenReaderModalOpen, setScreenReaderModalOpen] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const noticesRef = useRef(null);

  const handleRoleQuickLogin = (roleKey) => {
    const defaultCredentials = {
      i4c: 'officer.i4c@mha.gov.in',
      police: 'dsp.cyber@mahapolice.gov.in',
      bank: 'nodal.ciso@sbi.co.in',
      investigator: 'inv.spl@cbi.gov.in',
      admin: 'sysadmin.root@nic.in',
    };
    login(defaultCredentials[roleKey] || defaultCredentials.i4c, 'GovPortal@2026', roleKey);
    navigate('/dashboard');
  };

  const handleFileComplaintSubmit = (e) => {
    e.preventDefault();
    setComplaintModalOpen(false);
    Toastify({
      text: "✅ Telemetry Ingested into NCRP Framework. Dial 1930 immediately for urgent 'Golden Window' debit freeze.",
      duration: 6000,
      gravity: "top",
      position: "center",
      style: {
        background: "#0b3d91",
        color: "#ffffff",
        borderRadius: "6px",
        fontFamily: "Inter, sans-serif",
        fontSize: "13px",
        fontWeight: "600",
        padding: "14px 22px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
        borderLeft: "5px solid #ff9933"
      }
    }).showToast();
  };

  const faqs = [
    {
      q: "What is the Predictive Cybercrime Intelligence Framework?",
      a: "An AI/ML-driven analytical system established under I4C (Ministry of Home Affairs) that correlates cybercrime complaints filed via NCRP and 1930 to forecast suspect cash withdrawal locations (ATMs/branches), enabling proactive interception before illicit funds are cashed out."
    },
    {
      q: "How does the platform assist Law Enforcement Agencies (LEAs)?",
      a: "The framework issues real-time predictive alerts and risk hotspot coordinates to State & District Cyber Crime Police, providing actionable lead times to dispatch field units to ATM clusters exhibiting abnormal withdrawal velocity."
    },
    {
      q: "What is the role of Banks and Financial Institutions (CFCFRMS)?",
      a: "Banks receive automated high-confidence debit-freeze signals via CFCFRMS APIs to place liens on multi-hop mule beneficiary accounts during the initial 'Golden Hour' of transaction reporting."
    },
    {
      q: "How does a citizen report an incident to trigger this intelligence?",
      a: "Citizens can report financial cyber fraud immediately by dialing national toll-free helpline 1930 or submitting incident details on the National Cybercrime Reporting Portal (cybercrime.gov.in)."
    }
  ];

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
      isHighContrast ? 'bg-black text-white' : 'bg-gov-pattern text-slate-800'
    }`}>

      {/* ===================================================== */}
      {/* 2. TOP UTILITY BAR (GIGW Compliant Accessibility Strip) */}
      {/* ===================================================== */}
      <div className={`px-4 sm:px-8 py-1.5 text-[11px] border-b flex flex-wrap items-center justify-between gap-2 z-50 ${
        isHighContrast 
          ? 'bg-black text-yellow-300 border-yellow-400' 
          : 'bg-[#0B3D91] text-white border-[#072c69]'
      }`}>
        {/* Left: Skip to content + National Government Affiliation */}
        <div className="flex items-center gap-3">
          <a
            href="#main-content"
            className="px-2 py-0.5 bg-white/15 hover:bg-white/30 rounded text-[10px] font-bold text-white transition-colors focus:ring-2 focus:ring-amber-300 focus:outline-none"
          >
            Skip to main content
          </a>
          <span className="text-white/30 hidden sm:inline">|</span>
          <span className="font-semibold tracking-wide">भारत सरकार | Government of India</span>
          <span className="text-white/40 hidden md:inline">|</span>
          <span className="font-medium text-white/90 hidden md:inline">गृह मंत्रालय | Ministry of Home Affairs</span>
        </div>

        {/* Right: Accessibility Adjusters & Controls */}
        <div className="flex items-center gap-3 text-white/90">
          {/* Screen Reader Access */}
          <button
            onClick={() => setScreenReaderModalOpen(true)}
            className="flex items-center gap-1 hover:text-amber-300 transition-colors cursor-pointer text-[10.5px]"
            title="Screen Reader Access Information"
          >
            <span aria-hidden="true">🔊</span>
            <span className="hidden sm:inline">Screen Reader Access</span>
          </button>

          <span className="text-white/30 hidden sm:inline">|</span>

          {/* High Contrast Toggle */}
          <button
            onClick={() => setIsHighContrast(!isHighContrast)}
            className="flex items-center gap-1 px-1.5 py-0.5 rounded border border-white/20 hover:bg-white/10 text-[10px] font-bold cursor-pointer transition-colors"
            title="Toggle High Contrast Accessibility Mode"
            aria-pressed={isHighContrast}
          >
            <span aria-hidden="true">🌓</span>
            <span>{isHighContrast ? 'Normal View' : 'High Contrast'}</span>
          </button>

          <span className="text-white/30">|</span>

          {/* Text Size Adjuster (A- A A+) */}
          <div className="flex items-center border border-white/25 rounded bg-white/10 px-1 py-0.5" role="group" aria-label="Font Size Adjuster">
            <button
              onClick={() => setFontScale('small')}
              className={`px-1.5 py-0.2 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                fontScale === 'small' ? 'bg-white text-[#0B3D91]' : 'hover:text-white text-white/80'
              }`}
              title="Decrease Font Size (A-)"
            >
              A-
            </button>
            <button
              onClick={() => setFontScale('normal')}
              className={`px-1.5 py-0.2 rounded text-[11px] font-bold cursor-pointer transition-colors ${
                fontScale === 'normal' ? 'bg-white text-[#0B3D91]' : 'hover:text-white text-white/80'
              }`}
              title="Reset Font Size (A)"
            >
              A
            </button>
            <button
              onClick={() => setFontScale('large')}
              className={`px-1.5 py-0.2 rounded text-[12px] font-bold cursor-pointer transition-colors ${
                fontScale === 'large' ? 'bg-white text-[#0B3D91]' : 'hover:text-white text-white/80'
              }`}
              title="Increase Font Size (A+)"
            >
              A+
            </button>
          </div>

          <span className="text-white/30">|</span>

          {/* Bilingual Language Switch */}
          <div className="flex items-center gap-1.5 font-semibold text-[11px]">
            <button
              onClick={() => setLang('hi')}
              className={`cursor-pointer transition-colors ${
                lang === 'hi' ? 'text-amber-300 font-bold underline underline-offset-2' : 'hover:text-white text-white/80'
              }`}
            >
              हिन्दी
            </button>
            <span className="text-white/40">/</span>
            <button
              onClick={() => setLang('en')}
              className={`cursor-pointer transition-colors ${
                lang === 'en' ? 'text-amber-300 font-bold underline underline-offset-2' : 'hover:text-white text-white/80'
              }`}
            >
              English
            </button>
          </div>

          <span className="text-white/30 hidden lg:inline">|</span>

          {/* Last Updated Timestamp */}
          <div className="text-[10px] text-white/70 hidden lg:inline">
            Last Updated: <span className="font-semibold text-white/90">21 Sep 2026 | 21:50 IST</span>
          </div>
        </div>
      </div>

      {/* ===================================================== */}
      {/* 3. HEADER & LOGO CLUSTER                              */}
      {/* ===================================================== */}
      <header className={`px-4 sm:px-8 py-3 border-b transition-colors ${
        isHighContrast ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-4">
          {/* LEFT: Ashoka Pillar + Official Government Titles */}
          <div className="flex items-center gap-3.5 sm:gap-4">
            <EmblemOfIndia className="w-12 h-16 text-slate-900 shrink-0" />
            <div className="flex flex-col justify-center">
              <span className="text-xs sm:text-sm font-bold text-slate-800 leading-tight">
                भारत सरकार • गृह मंत्रालय
              </span>
              <span className="text-[11px] font-semibold text-slate-600 leading-tight">
                Government of India • Ministry of Home Affairs
              </span>
              <h1 className="text-base sm:text-xl font-extrabold text-[#0B3D91] leading-tight mt-1 tracking-tight">
                Predictive Cybercrime Intelligence Framework
              </h1>
              <span className="text-[11px] font-bold text-[#ea580c] tracking-wide">
                पूर्वानुमानित साइबर अपराध आसूचना ढांचा (I4C - MHA)
              </span>
            </div>
          </div>

          {/* RIGHT: I4C Ring Logo + Digital India & Azadi Badges */}
          <div className="flex items-center gap-3 sm:gap-4 self-center md:self-auto">
            {/* National Initiative Badges */}
            <GovBadgeStrip className="hidden lg:flex" />

            <div className="h-10 w-px bg-slate-200 hidden lg:block"></div>

            {/* I4C Logo & Center Title */}
            <div className="flex items-center gap-3 text-right">
              <div className="flex flex-col items-end leading-tight">
                <span className="text-xs sm:text-sm font-black text-[#0B3D91] tracking-tight uppercase">
                  I4C
                </span>
                <span className="text-[10px] font-bold text-slate-600">
                  Indian Cyber Crime Coordination Centre
                </span>
                <span className="text-[9px] italic text-[#138808] font-semibold">
                  सहवीर्यं करवावहै • Working Together With Vigour
                </span>
              </div>
              <CircularI4CRingLogo className="w-12 h-12 sm:w-14 sm:h-14 shrink-0" />
            </div>
          </div>
        </div>
      </header>

      {/* Tricolor Indicator Bar */}
      <div className="tricolor-bar"></div>

      {/* ===================================================== */}
      {/* 4. PRIMARY NAVIGATION BAR                             */}
      {/* ===================================================== */}
      <nav className={`sticky top-0 z-40 shadow-md ${
        isHighContrast ? 'bg-black border-b-2 border-yellow-400 text-white' : 'bg-[#0B3D91] text-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-[48px]">
          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-1 sm:space-x-2 text-[11px] font-bold uppercase tracking-wider overflow-x-auto py-1">
            <Link
              to="/"
              className="px-2.5 py-2 hover:text-amber-300 border-b-2 border-amber-400 text-amber-300 transition-colors whitespace-nowrap"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="px-2.5 py-2 hover:text-amber-300 border-b-2 border-transparent hover:border-amber-300 transition-colors whitespace-nowrap"
            >
              About the Framework
            </Link>
            <Link
              to="/heatmap"
              className="px-2.5 py-2 hover:text-amber-300 border-b-2 border-transparent hover:border-amber-300 transition-colors whitespace-nowrap"
            >
              Risk Heatmap Dashboard
            </Link>
            <button
              onClick={() => handleRoleQuickLogin('police')}
              className="px-2.5 py-2 hover:text-amber-300 border-b-2 border-transparent hover:border-amber-300 transition-colors whitespace-nowrap cursor-pointer"
            >
              LEA Login
            </button>
            <Link
              to="/analytics"
              className="px-2.5 py-2 hover:text-amber-300 border-b-2 border-transparent hover:border-amber-300 transition-colors whitespace-nowrap"
            >
              Reports & Analytics
            </Link>
            <Link
              to="/alerts"
              className="px-2.5 py-2 hover:text-amber-300 border-b-2 border-transparent hover:border-amber-300 transition-colors whitespace-nowrap"
            >
              Alerts
            </Link>
            <a
              href="#contact-footer"
              className="px-2.5 py-2 hover:text-amber-300 border-b-2 border-transparent hover:border-amber-300 transition-colors whitespace-nowrap"
            >
              Contact
            </a>
            <a
              href="#faqs-section"
              className="px-2.5 py-2 hover:text-amber-300 border-b-2 border-transparent hover:border-amber-300 transition-colors whitespace-nowrap"
            >
              FAQs
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden px-3 py-1.5 text-xs font-bold bg-white/10 hover:bg-white/20 rounded flex items-center gap-1.5 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            <span>☰</span> Menu
          </button>

          {/* Prominent 'Report Cybercrime (1930)' CTA Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setComplaintModalOpen(true)}
              className="bg-[#FF9933] hover:bg-[#e6821e] text-white font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
              <span>Report Cybercrime (1930)</span>
            </button>

            <Link
              to="/login"
              className="hidden sm:inline-flex items-center justify-center bg-white/15 hover:bg-white/25 text-white font-bold text-xs px-3 py-1.5 rounded border border-white/30 transition-all"
            >
              Portal Login ➔
            </Link>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#072c69] border-t border-white/15 px-4 py-3 space-y-2 text-xs font-bold">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-amber-300">Home</Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-amber-300">About the Framework</Link>
            <Link to="/heatmap" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-amber-300">Risk Heatmap Dashboard</Link>
            <button onClick={() => { setMobileMenuOpen(false); handleRoleQuickLogin('police'); }} className="block py-1 text-left hover:text-amber-300 w-full cursor-pointer">LEA Login</button>
            <Link to="/analytics" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-amber-300">Reports & Analytics</Link>
            <Link to="/alerts" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-amber-300">Alerts</Link>
            <a href="#contact-footer" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-amber-300">Contact</a>
            <a href="#faqs-section" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-amber-300">FAQs</a>
          </div>
        )}
      </nav>

      <main id="main-content">

        {/* ===================================================== */}
        {/* 5. HERO SECTION                                       */}
        {/* ===================================================== */}
        <section className={`relative min-h-[420px] text-white flex items-center overflow-hidden border-b ${
          isHighContrast 
            ? 'bg-zinc-950 border-yellow-400' 
            : 'bg-gradient-to-r from-[#061838] via-[#0B3D91] to-[#0d47a1] border-slate-300'
        }`}>
          {/* Subtle Geospatial Coordinate Grid */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#93c5fd_1.2px,transparent_1.2px)] [background-size:24px_24px]"></div>

          {/* Illustrative India Map Vector with Heatmap Overlay */}
          <div className="absolute right-2 top-0 bottom-0 w-full md:w-1/2 opacity-25 pointer-events-none hidden md:flex items-center justify-center">
            <svg viewBox="0 0 500 500" className="w-[460px] h-[460px]" fill="none">
              {/* Radar Rings */}
              <circle cx="250" cy="250" r="200" stroke="#93c5fd" strokeWidth="1" strokeDasharray="4 6" />
              <circle cx="250" cy="250" r="140" stroke="#93c5fd" strokeWidth="1" strokeDasharray="3 4" />
              <circle cx="250" cy="250" r="80" stroke="#FF9933" strokeWidth="1.5" />
              
              {/* Heatmap cluster gradient bubbles (Red, Orange, Yellow) */}
              <circle cx="220" cy="180" r="45" fill="#dc2626" opacity="0.4" filter="blur(15px)" />
              <circle cx="290" cy="230" r="55" fill="#ea580c" opacity="0.4" filter="blur(18px)" />
              <circle cx="200" cy="310" r="50" fill="#eab308" opacity="0.4" filter="blur(16px)" />
              <circle cx="340" cy="280" r="40" fill="#dc2626" opacity="0.35" filter="blur(14px)" />

              {/* Node connecting vectors */}
              <line x1="220" y1="180" x2="290" y2="230" stroke="#ea580c" strokeWidth="1.8" strokeDasharray="2 2" />
              <line x1="290" y1="230" x2="200" y2="310" stroke="#eab308" strokeWidth="1.5" />
              <line x1="290" y1="230" x2="340" y2="280" stroke="#dc2626" strokeWidth="1.8" />

              {/* Hotspot Pulse markers (Red, Orange, Yellow) */}
              <circle cx="220" cy="180" r="7" fill="#dc2626" />
              <circle cx="290" cy="230" r="8" fill="#ea580c" />
              <circle cx="200" cy="310" r="6" fill="#eab308" />
              <circle cx="340" cy="280" r="7" fill="#dc2626" />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 relative z-10 w-full">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-amber-300 border border-white/20">
                <span aria-hidden="true">🛡️</span> National Cybercrime Reporting Portal (NCRP) & CFCFRMS Telemetry
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Proactive Intelligence Against Financial Cybercrime
              </h2>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                Predicting likely cash withdrawal locations and ATM cluster trajectories from cybercrime complaint data to enable faster law enforcement interception, debit freeze execution, and citizen fund recovery.
              </p>

              {/* Hero CTA Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <Link
                  to="/dashboard"
                  className="px-6 py-2.5 rounded-md text-xs sm:text-sm font-bold bg-[#FF9933] hover:bg-[#e6821e] text-white transition-all shadow-md cursor-pointer flex items-center gap-2"
                >
                  <span>View Risk Dashboard (Secure LEA)</span>
                  <span>➔</span>
                </Link>

                <a
                  href="#how-it-works"
                  className="px-5 py-2.5 rounded-md text-xs sm:text-sm font-bold border-2 border-white text-white hover:bg-white hover:text-[#0B3D91] transition-all cursor-pointer"
                >
                  Learn How It Works
                </a>
              </div>
            </div>

            {/* LIVE STATS TICKER STRIP (Placeholder Data) */}
            <div className="mt-10 pt-6 border-t border-white/20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-left">
              <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-lg border border-white/15">
                <div className="text-xs font-semibold text-teal-200 uppercase tracking-wider">
                  Complaints Processed Today
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white mt-1">
                  8,420+
                </div>
                <div className="text-[10px] text-white/70 mt-0.5">Mock NCRP Ingestion Telemetry</div>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-lg border border-white/15">
                <div className="text-xs font-semibold text-amber-200 uppercase tracking-wider">
                  Active Alerts Issued
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white mt-1">
                  342
                </div>
                <div className="text-[10px] text-white/70 mt-0.5">Dispatched to Police Patrol Units</div>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-lg border border-white/15">
                <div className="text-xs font-semibold text-blue-200 uppercase tracking-wider">
                  Hotspots Identified
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white mt-1">
                  89 Clusters
                </div>
                <div className="text-[10px] text-white/70 mt-0.5">High Probability Cash-out Nodes</div>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-lg border border-white/15">
                <div className="text-xs font-semibold text-emerald-200 uppercase tracking-wider">
                  Funds Saved / Frozen
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#86efac] mt-1">
                  ₹14.82 Cr
                </div>
                <div className="text-[10px] text-white/70 mt-0.5">Golden Hour CFCFRMS Interception</div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================== */}
        {/* 6. "HOW IT WORKS" SECTION (4-Step Process)           */}
        {/* ===================================================== */}
        <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
          <div className={`rounded-xl shadow-gov border p-6 md:p-10 ${
            isHighContrast ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200'
          }`}>
            <div className="text-center max-w-3xl mx-auto mb-10">
              <div className="inline-block text-xs font-extrabold uppercase tracking-widest text-[#0B3D91] bg-blue-50 px-3 py-1 rounded-full mb-2">
                Operational Lifecycle
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#0B3D91] tracking-tight">
                How It Works: Predictive Cash Withdrawal Interdiction
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                Bridging victim fraud reporting to proactive on-ground police interdiction and banking debit freezes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {/* Step 1 */}
              <div className="bg-slate-50 rounded-lg p-5 border border-slate-200 flex flex-col items-center text-center relative hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-[#0B3D91] text-white flex items-center justify-center font-black text-base mb-3 shadow-xs">
                  ①
                </div>
                <div className="text-2xl mb-1" aria-hidden="true">📥</div>
                <h4 className="text-sm font-bold text-slate-900 mb-1.5">
                  Complaint Data Ingestion
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Real-time intake from the National Cybercrime Reporting Portal (NCRP 1930), capturing defrauded amounts, suspect UPIs, and mule account chains.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-slate-50 rounded-lg p-5 border border-slate-200 flex flex-col items-center text-center relative hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-[#0B3D91] text-white flex items-center justify-center font-black text-base mb-3 shadow-xs">
                  ②
                </div>
                <div className="text-2xl mb-1" aria-hidden="true">🧠</div>
                <h4 className="text-sm font-bold text-slate-900 mb-1.5">
                  AI/ML Predictive Analysis
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Graph Neural Network pattern detection and geospatial risk modeling evaluate transfer speed, mule network topology, and historical withdrawal habits.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-slate-50 rounded-lg p-5 border border-slate-200 flex flex-col items-center text-center relative hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-[#0B3D91] text-white flex items-center justify-center font-black text-base mb-3 shadow-xs">
                  ③
                </div>
                <div className="text-2xl mb-1" aria-hidden="true">🗺️</div>
                <h4 className="text-sm font-bold text-slate-900 mb-1.5">
                  Risk Heatmap Generation
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Generates real-time geospatial risk heatmaps identifying high-probability ATM clusters, bank branches, and postal zones before cash withdrawal occurs.
                </p>
              </div>

              {/* Step 4 */}
              <div className="bg-slate-50 rounded-lg p-5 border border-slate-200 flex flex-col items-center text-center relative hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-[#0B3D91] text-white flex items-center justify-center font-black text-base mb-3 shadow-xs">
                  ④
                </div>
                <div className="text-2xl mb-1" aria-hidden="true">🚨</div>
                <h4 className="text-sm font-bold text-slate-900 mb-1.5">
                  Actionable Alerts Dispatched
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Automated priority alerts sent to State Cyber Police patrol units for intercept, and to Bank Nodal Officers via CFCFRMS for immediate debit freezes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================== */}
        {/* 7. CORE MODULES SECTION (4-Card Grid Deliverables)   */}
        {/* ===================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-black text-[#0B3D91] tracking-tight">
              Core Framework Modules
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              National predictive infrastructure components built for Ministry of Home Affairs / I4C
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Module 1 */}
            <div className={`rounded-lg shadow-gov border border-t-4 border-t-[#0B3D91] p-5 flex flex-col justify-between hover:-translate-y-1 transition-transform ${
              isHighContrast ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200'
            }`}>
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0B3D91] flex items-center justify-center text-xl mb-3 font-bold">
                  🧠
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">
                  Predictive Analytics Engine
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  AI/ML hotspot forecasting engine that detects organized cyber syndicate patterns and predicts target withdrawal nodes with statistical confidence ratings.
                </p>
              </div>
              <Link to="/analytics" className="text-xs font-bold text-[#0B3D91] hover:underline mt-4 inline-flex items-center gap-1">
                <span>Explore Analytics Engine</span>
                <span>➔</span>
              </Link>
            </div>

            {/* Module 2 */}
            <div className={`rounded-lg shadow-gov border border-t-4 border-t-[#0f8b9e] p-5 flex flex-col justify-between hover:-translate-y-1 transition-transform ${
              isHighContrast ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200'
            }`}>
              <div>
                <div className="w-10 h-10 rounded-lg bg-teal-50 text-[#0f8b9e] flex items-center justify-center text-xl mb-3 font-bold">
                  🗺️
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">
                  Risk Heatmap Dashboard
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  GIS-enabled visualization interface with drill-down filters across 36 States/UTs, municipal zones, and high-density ATM clusters.
                </p>
              </div>
              <Link to="/heatmap" className="text-xs font-bold text-[#0f8b9e] hover:underline mt-4 inline-flex items-center gap-1">
                <span>View Heatmap Dashboard</span>
                <span>➔</span>
              </Link>
            </div>

            {/* Module 3 */}
            <div className={`rounded-lg shadow-gov border border-t-4 border-t-[#FF9933] p-5 flex flex-col justify-between hover:-translate-y-1 transition-transform ${
              isHighContrast ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200'
            }`}>
              <div>
                <div className="w-10 h-10 rounded-lg bg-orange-50 text-[#FF9933] flex items-center justify-center text-xl mb-3 font-bold">
                  🛡️
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">
                  Law Enforcement Interface
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Secure investigator access portal providing priority case dossiers, suspect mule account history, and interstate intelligence exchange under BNSS provisions.
                </p>
              </div>
              <button
                onClick={() => handleRoleQuickLogin('police')}
                className="text-xs font-bold text-[#ea580c] hover:underline mt-4 inline-flex items-center gap-1 text-left cursor-pointer"
              >
                <span>LEA Terminal Access</span>
                <span>➔</span>
              </button>
            </div>

            {/* Module 4 */}
            <div className={`rounded-lg shadow-gov border border-t-4 border-t-[#138808] p-5 flex flex-col justify-between hover:-translate-y-1 transition-transform ${
              isHighContrast ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200'
            }`}>
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#138808] flex items-center justify-center text-xl mb-3 font-bold">
                  🔔
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">
                  Alert & Notification System
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Multi-channel dispatch infrastructure delivering high-priority broadcast alerts to field officers and bank nodal officers via SMS, email, webhook API, and dashboard.
                </p>
              </div>
              <Link to="/alerts" className="text-xs font-bold text-[#138808] hover:underline mt-4 inline-flex items-center gap-1">
                <span>View Alert Feeds</span>
                <span>➔</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ===================================================== */}
        {/* 8. STAKEHOLDER SECTION (3 Audience Tiles)             */}
        {/* ===================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-black text-[#0B3D91] tracking-tight">
              Tailored Stakeholder Services
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Coordinated collaboration across citizens, law enforcement, and financial banking institutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stakeholder 1: Citizens */}
            <div className={`rounded-xl shadow-gov border p-6 flex flex-col justify-between ${
              isHighContrast ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200'
            }`}>
              <div>
                <div className="w-12 h-12 rounded-lg bg-amber-50 text-2xl flex items-center justify-center mb-4">
                  👥
                </div>
                <h4 className="text-base font-extrabold text-slate-900 mb-2">
                  For Citizens & Victims
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Report financial cyber fraud immediately within the <strong>"Golden Hour"</strong> to maximize the likelihood of tracing illicit funds and executing a banking debit freeze.
                </p>
                <div className="p-3 bg-amber-50 rounded border border-amber-200 text-[11px] text-amber-950 mb-4">
                  <strong>National Cyber Helpline: 1930</strong><br />
                  Toll-free 24x7 assistance for citizen complaints and financial loss reporting.
                </div>
              </div>

              <button
                onClick={() => setComplaintModalOpen(true)}
                className="w-full py-2.5 px-4 bg-[#FF9933] hover:bg-[#e6821e] text-white font-bold text-xs rounded-md shadow-xs transition-colors cursor-pointer text-center"
              >
                File Cyber Complaint (1930) ➔
              </button>
            </div>

            {/* Stakeholder 2: Law Enforcement Agencies */}
            <div className={`rounded-xl shadow-gov border p-6 flex flex-col justify-between ${
              isHighContrast ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200'
            }`}>
              <div>
                <div className="w-12 h-12 rounded-lg bg-blue-50 text-2xl flex items-center justify-center mb-4">
                  👮
                </div>
                <h4 className="text-base font-extrabold text-slate-900 mb-2">
                  For Law Enforcement Agencies (LEAs)
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Empowering State & UT Police Cyber Cells and district investigators with anticipatory hotspot alerts, suspect ATM clusters, and integrated case management.
                </p>
                <div className="p-3 bg-blue-50 rounded border border-blue-200 text-[11px] text-blue-950 mb-4">
                  <strong>Interstate Coordination</strong><br />
                  Standard Operating Procedures aligned with BNSS and Section 69/79 of the IT Act.
                </div>
              </div>

              <button
                onClick={() => handleRoleQuickLogin('police')}
                className="w-full py-2.5 px-4 bg-[#0B3D91] hover:bg-[#082954] text-white font-bold text-xs rounded-md shadow-xs transition-colors cursor-pointer text-center"
              >
                Secure LEA Portal Login ➔
              </button>
            </div>

            {/* Stakeholder 3: Banks & Financial Institutions */}
            <div className={`rounded-xl shadow-gov border p-6 flex flex-col justify-between ${
              isHighContrast ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200'
            }`}>
              <div>
                <div className="w-12 h-12 rounded-lg bg-emerald-50 text-2xl flex items-center justify-center mb-4">
                  🏦
                </div>
                <h4 className="text-base font-extrabold text-slate-900 mb-2">
                  For Banks & Financial Institutions
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Automated coordination via CFCFRMS for putting liens on suspect mule accounts, monitoring rapid cash disbursements, and mitigating financial fraud losses.
                </p>
                <div className="p-3 bg-emerald-50 rounded border border-emerald-200 text-[11px] text-emerald-950 mb-4">
                  <strong>API & Webhook Telemetry</strong><br />
                  Direct interoperability with 54+ member commercial banks and payment aggregators.
                </div>
              </div>

              <button
                onClick={() => handleRoleQuickLogin('bank')}
                className="w-full py-2.5 px-4 bg-[#138808] hover:bg-[#0f6b06] text-white font-bold text-xs rounded-md shadow-xs transition-colors cursor-pointer text-center"
              >
                Bank / FI Nodal Access ➔
              </button>
            </div>
          </div>
        </section>

        {/* ===================================================== */}
        {/* 9. TRUST & COMPLIANCE STRIP                           */}
        {/* ===================================================== */}
        <section className={`border-y py-6 px-4 sm:px-8 ${
          isHighContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-slate-100/90 border-slate-300'
        }`}>
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6 text-xs">
            {/* GIGW Badge */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-100 text-[#0B3D91] flex items-center justify-center font-black text-sm">
                ✓
              </div>
              <div>
                <div className="font-extrabold text-slate-900 uppercase tracking-wide">
                  GIGW 3.0 Compliant
                </div>
                <div className="text-[10px] text-slate-600">
                  Guidelines for Indian Government Websites Certified
                </div>
              </div>
            </div>

            {/* ISO 27001 Security */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-100 text-[#138808] flex items-center justify-center font-black text-sm">
                🔒
              </div>
              <div>
                <div className="font-extrabold text-slate-900 uppercase tracking-wide">
                  ISO/IEC 27001:2022
                </div>
                <div className="text-[10px] text-slate-600">
                  Information Security Management Certified & CERT-In Audited
                </div>
              </div>
            </div>

            {/* Data Privacy DPDP */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-orange-100 text-[#ea580c] flex items-center justify-center font-black text-sm">
                ⚖️
              </div>
              <div>
                <div className="font-extrabold text-slate-900 uppercase tracking-wide">
                  Data Privacy & Confidentiality
                </div>
                <div className="text-[10px] text-slate-600">
                  Protected under DPDP Act 2023 & IT Act 2000
                </div>
              </div>
            </div>

            {/* High Availability SLA */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center font-black text-sm">
                ☁️
              </div>
              <div>
                <div className="font-extrabold text-slate-900 uppercase tracking-wide">
                  99.98% High Availability
                </div>
                <div className="text-[10px] text-slate-600">
                  Hosted on MeghRaj National Government Cloud (NIC)
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================== */}
        {/* 10. FAQS ACCORDION SECTION                            */}
        {/* ===================================================== */}
        <section id="faqs-section" className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
          <div className={`rounded-xl shadow-gov border p-6 md:p-8 ${
            isHighContrast ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200'
          }`}>
            <div className="text-center mb-6">
              <h3 className="text-xl font-extrabold text-[#0B3D91] tracking-tight">
                Frequently Asked Questions (FAQs)
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Essential information regarding intelligence generation, law enforcement authority, and citizen guidance.
              </p>
            </div>

            <div className="space-y-3 max-w-4xl mx-auto">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-slate-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full text-left p-4 bg-slate-50 hover:bg-slate-100 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-800 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="text-slate-500 text-base">{activeFaq === idx ? '−' : '+'}</span>
                  </button>
                  {activeFaq === idx && (
                    <div className="p-4 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================== */}
        {/* 11. STATUTORY DISCLAIMER (Mandatory NCRP Notice)      */}
        {/* ===================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-4 mb-8">
          <div className={`rounded-lg shadow-gov border p-6 relative ${
            isHighContrast ? 'bg-zinc-950 border-yellow-400' : 'bg-white border-slate-200'
          }`}>
            <div className="ribbon-tab text-xs uppercase mb-3">
              STATUTORY DISCLAIMER
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              The Predictive Cybercrime Intelligence Framework is a decision-support and analytical intelligence system operated under the Indian Cyber Crime Coordination Centre (I4C), Ministry of Home Affairs, Government of India. Neither this platform nor I4C possesses executive jurisdiction to directly seize or unfreeze bank accounts. Operational account lien placement and cash recovery remain the statutory responsibility of the respective State and Union Territory Law Enforcement Agencies under the Bharatiya Nagarik Suraksha Sanhita (BNSS 2023) and Section 94/106 of relevant law.
            </p>
          </div>
        </section>
      </main>

      {/* ===================================================== */}
      {/* 12. GOVERNMENT SITEMAP FOOTER                         */}
      {/* ===================================================== */}
      <footer id="contact-footer" className={`text-slate-200 border-t-2 border-[#FF9933] mt-auto ${
        isHighContrast ? 'bg-black border-yellow-400' : 'bg-[#0B3D91]'
      }`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-xs">
            {/* Col 1: About I4C */}
            <div className="space-y-2.5">
              <h4 className="text-sm font-extrabold text-white uppercase tracking-wider pb-1.5 border-b border-white/15">
                About I4C & Framework
              </h4>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                National apex initiative under the Ministry of Home Affairs, Government of India, coordinating all activities related to cybercrime prevention and predictive threat response.
              </p>
              <ul className="space-y-1.5 text-slate-300 pt-1">
                <li><Link to="/about" className="hover:text-amber-300">About I4C Mandate</Link></li>
                <li><Link to="/about" className="hover:text-amber-300">Predictive Methodology Charter</Link></li>
                <li><Link to="/about" className="hover:text-amber-300">Annual Statistical Bulletins</Link></li>
                <li><a href="https://mha.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-300">Ministry of Home Affairs ↗</a></li>
              </ul>
            </div>

            {/* Col 2: Related Portals */}
            <div className="space-y-2.5">
              <h4 className="text-sm font-extrabold text-white uppercase tracking-wider pb-1.5 border-b border-white/15">
                Related Government Portals
              </h4>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-300 flex items-center gap-1.5">
                    <span>↗</span> NCRP Portal (cybercrime.gov.in)
                  </a>
                </li>
                <li>
                  <a href="https://cyberpolice.nic.in" target="_blank" rel="noreferrer" className="hover:text-amber-300 flex items-center gap-1.5">
                    <span>↗</span> CFCFRMS Financial Fraud System
                  </a>
                </li>
                <li>
                  <a href="https://icjs.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-300 flex items-center gap-1.5">
                    <span>↗</span> Inter-Operable Criminal Justice (ICJS)
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/CyberDost" target="_blank" rel="noreferrer" className="hover:text-amber-300 flex items-center gap-1.5">
                    <span>↗</span> Cyber Dost Awareness (@CyberDost)
                  </a>
                </li>
                <li>
                  <a href="https://india.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-300 flex items-center gap-1.5">
                    <span>↗</span> National Portal of India (india.gov.in)
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Statutory Policies & RTI */}
            <div className="space-y-2.5">
              <h4 className="text-sm font-extrabold text-white uppercase tracking-wider pb-1.5 border-b border-white/15">
                RTI, Policies & Compliance
              </h4>
              <ul className="space-y-2 text-slate-300">
                <li><Link to="/about" className="hover:text-amber-300">Right to Information (RTI Act 2005)</Link></li>
                <li><Link to="/about" className="hover:text-amber-300">Terms of Use & Legal Notices</Link></li>
                <li><Link to="/about" className="hover:text-amber-300">Data Privacy & Protection Policy</Link></li>
                <li><Link to="/about" className="hover:text-amber-300">Hyperlinking & Copyright Policy</Link></li>
                <li>
                  <button onClick={() => setScreenReaderModalOpen(true)} className="hover:text-amber-300 text-left cursor-pointer">
                    Accessibility Statement (WCAG 2.1 AA)
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Contact & Nodal Desk */}
            <div className="space-y-2.5">
              <h4 className="text-sm font-extrabold text-white uppercase tracking-wider pb-1.5 border-b border-white/15">
                Contact & Nodal Desk
              </h4>
              <div className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
                <p>
                  <strong className="text-white">National Cybercrime Helpline:</strong><br />
                  <span className="text-amber-300 font-bold text-sm">📞 1930 (Toll-Free 24x7)</span>
                </p>
                <p>
                  <strong className="text-white">Emergency Response:</strong> 112
                </p>
                <p>
                  <strong className="text-white">Nodal Email:</strong> cybercrime-i4c@gov.in
                </p>
                <p>
                  <strong className="text-white">Office Address:</strong><br />
                  Indian Cyber Crime Coordination Centre (I4C),<br />
                  Ministry of Home Affairs, North Block,<br />
                  New Delhi - 110001, India
                </p>
              </div>
            </div>
          </div>

          {/* Social / Government Links Row */}
          <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-[11px] text-slate-300 font-semibold">
            <a href="https://india.gov.in" target="_blank" rel="noreferrer" className="hover:text-white">National Portal of India</a>
            <span>•</span>
            <a href="https://mygov.in" target="_blank" rel="noreferrer" className="hover:text-white">MyGov.in</a>
            <span>•</span>
            <a href="https://digitalindia.gov.in" target="_blank" rel="noreferrer" className="hover:text-white">Digital India</a>
            <span>•</span>
            <a href="https://nic.in" target="_blank" rel="noreferrer" className="hover:text-white">National Informatics Centre (NIC)</a>
            <span>•</span>
            <a href="https://mha.gov.in" target="_blank" rel="noreferrer" className="hover:text-white">Ministry of Home Affairs</a>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="bg-[#051c45] py-3.5 px-6 border-t border-white/10 text-center text-[10.5px] text-slate-400">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <div>
              © 2026 Predictive Cybercrime Intelligence Framework | Content owned by Indian Cyber Crime Coordination Centre (I4C), Ministry of Home Affairs, Government of India.
            </div>
            <div>
              Hosted by National Informatics Centre (NIC) | GIGW 3.0 Certified
            </div>
          </div>
        </div>
      </footer>

      {/* ===================================================== */}
      {/* SCREEN READER ACCESSIBILITY MODAL                     */}
      {/* ===================================================== */}
      {screenReaderModalOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          onClick={() => setScreenReaderModalOpen(false)}
        >
          <div
            className="bg-white max-w-md w-full rounded-xl shadow-2xl border border-slate-200 p-6 animate-fade-in-up"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🔊</span>
                <h3 className="text-sm font-extrabold text-slate-900">
                  Screen Reader Access Information
                </h3>
              </div>
              <button
                onClick={() => setScreenReaderModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <p>
                The Predictive Cybercrime Intelligence Framework adheres to the Guidelines for Indian Government Websites (GIGW 3.0) and World Wide Web Consortium (W3C) Web Content Accessibility Guidelines (WCAG) 2.1 level AA.
              </p>
              <p>
                This enables individuals with visual impairments to access the portal using assistive technologies such as screen readers (NVDA, JAWS, VoiceOver, and Orca).
              </p>
              <div className="p-3 bg-blue-50 rounded border border-blue-200 text-[11px] text-blue-900">
                <strong>Keyboard Shortcuts:</strong><br />
                • Tab / Shift+Tab: Navigate links and inputs<br />
                • Enter / Space: Activate buttons<br />
                • Skip link available at top: "Skip to main content"
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setScreenReaderModalOpen(false)}
                className="px-4 py-2 bg-[#0B3D91] hover:bg-[#072c69] text-white rounded font-bold text-xs cursor-pointer"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================== */}
      {/* CITIZEN COMPLAINT INTAKE MODAL (NCRP 1930)            */}
      {/* ===================================================== */}
      {complaintModalOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          onClick={() => setComplaintModalOpen(false)}
        >
          <div
            className="bg-white max-w-lg w-full rounded-xl shadow-2xl border border-slate-200 p-6 animate-fade-in-up"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-lg">📝</span>
                <h3 className="text-sm font-extrabold text-slate-900">
                  National Cybercrime Telemetry Intake (NCRP 1930)
                </h3>
              </div>
              <button
                onClick={() => setComplaintModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFileComplaintSubmit} className="space-y-3.5 text-xs">
              <div className="p-3 bg-amber-50 rounded border border-amber-200 text-[11px] text-amber-900 leading-snug">
                ⚠️ If financial fraud occurred in the last 2 hours, call <strong>1930</strong> immediately so bank debit liens can be placed in the "Golden Hour".
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Complainant Mobile Number:</label>
                <input
                  type="tel"
                  placeholder="+91 9XXXXXXXXX"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded text-slate-800 focus:outline-none focus:border-[#0B3D91]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Defrauded Amount (INR):</label>
                <input
                  type="number"
                  placeholder="e.g. 50000"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded text-slate-800 focus:outline-none focus:border-[#0B3D91]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Suspect Beneficiary Account / UPI ID:</label>
                <input
                  type="text"
                  placeholder="e.g. 9876543210@sbi or IFSC + Account No"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded text-slate-800 focus:outline-none focus:border-[#0B3D91]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Incident Category:</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded text-slate-800 focus:outline-none focus:border-[#0B3D91]">
                  <option>UPI Phishing / QR Scam</option>
                  <option>Part-Time Job / Task Scam</option>
                  <option>Digital Arrest / Police Impersonation</option>
                  <option>Investment / Stock Trading Fraud</option>
                  <option>Loan App Extortion</option>
                  <option>Card Cloning / ATM Skimming</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setComplaintModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B3D91] hover:bg-[#072c69] text-white rounded font-bold shadow-xs cursor-pointer"
                >
                  Submit for Predictive Telemetry Intake ➔
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
