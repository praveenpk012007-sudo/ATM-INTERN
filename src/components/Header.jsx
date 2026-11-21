import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import NotificationCenter from './NotificationCenter';
import SimulateButton from './SimulateButton';
import LanguageSelector from './LanguageSelector';
import { EmblemOfIndia } from './GovLogos';

export default function Header({ notifications, onClearNotifs, onNewComplaint }) {
  const { user, role, switchRole, logout, ROLE_CONFIG } = useAuth();
  const { t } = useLanguage();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setRoleMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 shadow-sm">
      {/* 1. Official Government of India Navy Blue Top Strip with Helpline & Multi-Language */}
      <div className="bg-[#0b3874] text-white px-6 py-1.5 flex flex-wrap items-center justify-between text-xs border-b border-[#082954] gap-2">
        <div className="flex items-center gap-3">
          <span className="text-sm">🇮🇳</span>
          <span className="font-semibold tracking-wide">{t.govIndia}</span>
          <span className="text-white/40">|</span>
          <span className="uppercase tracking-wider text-white/90 text-[11px] font-medium hidden sm:inline">
            {t.mha}
          </span>
          <span className="text-white/40 hidden md:inline">|</span>
          <span className="bg-amber-400 text-slate-950 font-extrabold text-[10px] px-2 py-0.5 rounded hidden md:inline-flex items-center gap-1 shadow-2xs">
            <span>📞</span> 1930 National Cyber Helpline (Toll-Free)
          </span>
        </div>
        
        {/* Language and Font Accessibility Controls */}
        <LanguageSelector />
      </div>

      {/* 2. Tricolor National Bar */}
      <div className="tricolor-bar" />

      {/* 3. Main White Portal Navigation Header */}
      <header className="h-[68px] bg-white border-b border-slate-200 flex items-center px-6">
        {/* Left: State Emblem + Official Project Title */}
        <Link to="/dashboard" className="flex items-center gap-3.5 shrink-0">
          <EmblemOfIndia className="w-8 h-11 text-slate-900 shrink-0" />
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-[11px] font-bold text-slate-800">
                भारत सरकार • गृह मंत्रालय
              </span>
              <span className="text-slate-300 text-[9px] hidden sm:inline">•</span>
              <span className="text-[9.5px] font-semibold text-slate-600 hidden sm:inline">
                Government of India • Ministry of Home Affairs
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <h1 className="text-[14.5px] font-extrabold text-[#0B3D91] leading-tight tracking-tight">
                Predictive Cybercrime Intelligence Framework
              </h1>
              <span className="text-[9.5px] font-extrabold bg-[#0066cc]/10 text-[#0066cc] px-1.5 py-0.2 rounded border border-[#0066cc]/20">
                I4C Portal
              </span>
            </div>
          </div>
        </Link>

        {/* Center: Role Switcher & Search Bar */}
        <div className="flex-1 flex items-center gap-4 px-8">
          {/* Interactive Role Switcher Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-md text-xs font-bold text-slate-800 transition-all hover:border-[#0066cc] cursor-pointer shadow-xs"
              title="Switch designated operational role"
            >
              <span className="text-sm">{user?.icon || '🏛️'}</span>
              <span>{t.roles[role] || user?.label || 'I4C Officer'}</span>
              <span className="text-[10px] text-slate-500">▼</span>
            </button>

            {roleMenuOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden z-50 animate-fade-in-up">
                <div className="px-3.5 py-2 bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Select Officer Role Jurisdiction:
                </div>
                {Object.entries(ROLE_CONFIG).map(([key, cfg]) => (
                  <button
                    key={key}
                    onClick={() => {
                      switchRole(key);
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 flex items-center gap-2.5 text-xs transition-colors cursor-pointer ${
                      role === key
                        ? 'bg-[#0066cc]/10 text-[#0066cc] font-bold border-l-3 border-[#0066cc]'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-base">{cfg.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-slate-800">{t.roles[key] || cfg.label}</div>
                      <div className="text-[10px] text-slate-500">{cfg.jurisdiction} Jurisdiction</div>
                    </div>
                    {role === key && <span className="text-xs text-[#0066cc] font-bold">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Search */}
          <div className="flex-1 max-w-sm relative hidden md:block">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">🔍</span>
            <input
              type="text"
              placeholder="Search case ID, ATM location, suspect account..."
              className="w-full pl-8 pr-4 py-1.5 bg-slate-50 border border-slate-300 rounded-md text-slate-800 text-xs focus:border-[#0066cc] focus:bg-white focus:outline-none transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <SimulateButton onNewComplaint={onNewComplaint} />
          <NotificationCenter notifications={notifications} onClear={onClearNotifs} />
          
          <div
            className="w-8 h-8 rounded-md bg-[#0b3874] text-white flex items-center justify-center text-xs font-bold shadow-xs border border-slate-300"
            title={user?.username}
          >
            {user?.label ? user.label.substring(0, 1) : 'O'}
          </div>

          <button
            onClick={logout}
            className="px-3 py-1.5 bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 rounded-md text-xs font-semibold transition-colors cursor-pointer"
          >
            {t.nav?.logout || 'Logout'}
          </button>
        </div>
      </header>
    </div>
  );
}
