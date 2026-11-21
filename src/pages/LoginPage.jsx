import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { EmblemOfIndia, I4CLogo } from '../components/GovLogos';
import LanguageSelector from '../components/LanguageSelector';

const ROLES = [
  { key: 'i4c', labelKey: 'i4c', icon: '🏛️', user: 'officer.i4c@mha.gov.in', dept: 'Ministry of Home Affairs / I4C' },
  { key: 'police', labelKey: 'police', icon: '👮', user: 'dsp.cyber@mahapolice.gov.in', dept: 'State / UT Police Cyber Cell' },
  { key: 'bank', labelKey: 'bank', icon: '🏦', user: 'nodal.ciso@sbi.co.in', dept: 'Financial Institutions / Banks' },
  { key: 'investigator', labelKey: 'investigator', icon: '🔍', user: 'inv.spl@cbi.gov.in', dept: 'Investigating Agencies / ICJS' },
  { key: 'admin', labelKey: 'admin', icon: '⚙️', user: 'sysadmin.root@nic.in', dept: 'NIC / System Admin' },
];

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState('i4c');
  const [userId, setUserId] = useState(ROLES[0].user);
  const [password, setPassword] = useState('GovPortal@2026');
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleRoleChange = (roleKey) => {
    setSelectedRole(roleKey);
    const roleObj = ROLES.find(r => r.key === roleKey);
    if (roleObj) {
      setUserId(roleObj.user);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(userId, password, selectedRole);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#e8f5f2] selection:bg-[#0066b2]/20 selection:text-[#0066b2]">
      {/* 1. TOP NAVY BLUE BAR (Matching cyberpolice.nic.in with Live Language Controls) */}
      <div className="bg-[#0b3874] text-white px-6 py-2 flex flex-wrap items-center justify-between text-xs border-b border-[#082954] gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 leading-tight">
          <span className="font-semibold tracking-wide">{t.portalTitleHindi} | {t.govIndia}</span>
          <span className="hidden sm:inline text-white/50">|</span>
          <span className="text-[11px] uppercase tracking-wider text-white/90 font-medium">
            {t.govIndia} | {t.mha}
          </span>
        </div>
        
        {/* Multi-Language & Font Accessibility Controls */}
        <LanguageSelector />
      </div>

      {/* 2. MAIN WHITE GOVERNMENT HEADER */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 shadow-xs min-h-[86px] flex items-center">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
          {/* Left: Emblem + Official Project Title */}
          <div className="flex items-center gap-4">
            <EmblemOfIndia className="w-11 h-15 text-slate-900 shrink-0" />
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

          {/* Right: Authentic I4C Logo & Motto */}
          <div className="hidden md:flex items-center justify-end">
            <I4CLogo />
          </div>
        </div>
      </header>

      {/* 3. LIGHT MINT CONTAINER (Matches cyberpolice.nic.in) */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ===== LEFT COLUMN: VISION, MISSION, DISCLAIMER ===== */}
          <div className="lg:col-span-6 space-y-6">
            {/* I4C Mobile Banner if small screen */}
            <div className="md:hidden bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex justify-center">
              <I4CLogo />
            </div>

            {/* I4C Branding Card on Left */}
            <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200 hidden md:flex items-center justify-center">
              <I4CLogo />
            </div>

            {/* VISION CHEVRON BLOCK */}
            <div className="overflow-hidden rounded-lg shadow-sm">
              <div 
                className="bg-[#74b816] text-[#06241a] font-extrabold text-sm uppercase px-5 py-2 inline-block tracking-wider"
                style={{ clipPath: 'polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%)', paddingRight: '2rem' }}
              >
                {t.visionTitle}
              </div>
              <div className="bg-[#002b49] text-white p-5 text-[13.5px] leading-relaxed font-normal">
                {t.visionText}
              </div>
            </div>

            {/* MISSION CHEVRON BLOCK */}
            <div className="overflow-hidden rounded-lg shadow-sm">
              <div 
                className="bg-[#74b816] text-[#06241a] font-extrabold text-sm uppercase px-5 py-2 inline-block tracking-wider"
                style={{ clipPath: 'polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%)', paddingRight: '2rem' }}
              >
                {t.missionTitle}
              </div>
              <div className="bg-[#005a70] text-white p-5 text-[13px] leading-relaxed font-normal">
                {t.missionText}
              </div>
            </div>

            {/* DISCLAIMER CHEVRON BLOCK */}
            <div className="overflow-hidden rounded-lg shadow-sm">
              <div 
                className="bg-[#74b816] text-[#06241a] font-extrabold text-sm uppercase px-5 py-2 inline-block tracking-wider"
                style={{ clipPath: 'polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%)', paddingRight: '2rem' }}
              >
                {t.disclaimerTitle}
              </div>
              <div className="bg-[#002b49] text-white/90 p-5 text-xs leading-relaxed">
                {t.disclaimerText}
              </div>
            </div>
          </div>

          {/* ===== RIGHT COLUMN: EXACT LOGIN CARD ===== */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-7 md:p-9 relative">
              
              {/* Header: Centered blue LOGIN */}
              <h2 className="text-center text-2xl font-extrabold text-[#0066cc] tracking-wide mb-6">
                {t.login}
              </h2>

              {/* Radio buttons row (Matching screenshot) */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
                {ROLES.map(r => (
                  <label 
                    key={r.key} 
                    className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-slate-700 hover:text-[#0066cc] transition-colors"
                  >
                    <input
                      type="radio"
                      name="govRole"
                      value={r.key}
                      checked={selectedRole === r.key}
                      onChange={() => handleRoleChange(r.key)}
                      className="w-4 h-4 text-[#0066cc] focus:ring-[#0066cc] border-slate-300 accent-[#0066cc]"
                    />
                    <span>{t.roles[r.labelKey] || r.key}</span>
                  </label>
                ))}
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    {t.userId}
                  </label>
                  <input
                    type="text"
                    value={userId}
                    onChange={e => setUserId(e.target.value)}
                    placeholder={t.enterUserId}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#007bff] rounded-md text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#007bff]/20 shadow-xs placeholder:text-slate-400"
                    required
                  />
                  <div className="text-[11px] text-slate-500 mt-1">
                    Designation: <span className="font-semibold text-slate-700">{ROLES.find(r => r.key === selectedRole)?.dept}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    {t.password}
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder={t.enterPassword}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-md text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#007bff]/20 focus:border-[#007bff] shadow-xs placeholder:text-slate-400"
                    required
                  />
                </div>

                {/* Continue button (Blue right-aligned / prominent) */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-500">{t.authPersonnel}</span>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#007bff] hover:bg-[#0062cc] text-white text-sm font-bold rounded shadow-xs transition-colors cursor-pointer"
                  >
                    {t.continue}
                  </button>
                </div>

                {/* Forgot Password Link */}
                <div className="text-right pt-2">
                  <a href="#" className="text-xs text-[#0066cc] hover:underline font-medium">
                    {t.forgotPassword}
                  </a>
                </div>
              </form>
            </div>
          </div>

        </div>
      </main>

      {/* 4. FOOTER (Matching Official Government of India / NIC standards) */}
      <footer className="bg-white border-t border-slate-200 text-slate-600 text-xs py-4 px-6 text-center shadow-inner mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-[#0b3874] text-white flex items-center justify-center font-bold text-[10px]">NIC</span>
            <span>
              Designed, Developed and Hosted by <strong className="text-[#0066cc]">National Informatics Centre (NIC)</strong>
            </span>
          </div>
          <div>
            Website Content Managed by <strong className="text-slate-800">{t.i4cCenter}, {t.mha}</strong>
          </div>
        </div>
      </footer>
    </div>
  );
}
