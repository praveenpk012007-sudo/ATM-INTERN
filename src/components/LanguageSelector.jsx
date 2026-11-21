import { useState, useRef, useEffect } from 'react';
import { useLanguage, INDIAN_LANGUAGES } from '../context/LanguageContext';

export default function LanguageSelector() {
  const { lang, setLang, fontScale, setFontScale, t } = useLanguage();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLangObj = INDIAN_LANGUAGES.find(l => l.code === lang) || INDIAN_LANGUAGES[0];

  const filteredLanguages = INDIAN_LANGUAGES.filter(l => 
    l.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.native.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex items-center gap-3 text-xs" ref={ref}>
      {/* Font Size Accessibility Controls (A- A A+) */}
      <div className="flex items-center border border-white/25 rounded bg-white/10 px-1 py-0.5 shadow-2xs">
        <button
          onClick={() => setFontScale('small')}
          className={`px-1.5 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-colors ${fontScale === 'small' ? 'bg-white text-[#0b3874]' : 'hover:text-white text-white/80'}`}
          title="Small Font Size"
        >
          A-
        </button>
        <button
          onClick={() => setFontScale('normal')}
          className={`px-1.5 py-0.5 rounded text-[11px] font-bold cursor-pointer transition-colors ${fontScale === 'normal' ? 'bg-white text-[#0b3874]' : 'hover:text-white text-white/80'}`}
          title="Normal Font Size"
        >
          A
        </button>
        <button
          onClick={() => setFontScale('large')}
          className={`px-1.5 py-0.5 rounded text-[12px] font-bold cursor-pointer transition-colors ${fontScale === 'large' ? 'bg-white text-[#0b3874]' : 'hover:text-white text-white/80'}`}
          title="Large Font Size"
        >
          A+
        </button>
      </div>

      {/* Quick Hindi / English Switch */}
      <div className="flex items-center gap-1.5 text-[11px]">
        <button
          onClick={() => setLang('hi')}
          className={`cursor-pointer transition-colors ${lang === 'hi' ? 'text-white font-bold underline underline-offset-2' : 'text-white/80 hover:text-white'}`}
        >
          हिन्दी
        </button>
        <span className="text-white/40">|</span>
        <button
          onClick={() => setLang('en')}
          className={`cursor-pointer transition-colors ${lang === 'en' ? 'text-white font-bold underline underline-offset-2' : 'text-white/80 hover:text-white'}`}
        >
          English
        </button>
      </div>

      {/* Full Indian Languages Selector Dropdown (All 22 Official + English = 23) */}
      <div className="relative">
        <button
          onClick={() => {
            setDropdownOpen(!dropdownOpen);
            setSearchQuery('');
          }}
          className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 border border-white/30 text-white px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer shadow-2xs"
          title="Select from 22 Official Scheduled Languages of India + English"
        >
          <span>🌐</span>
          <span>{currentLangObj.native}</span>
          <span className="text-[9px] bg-white/20 px-1 py-0.2 rounded text-white/90 font-mono">22+1</span>
          <span className="text-[9px]">▼</span>
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-1.5 w-64 bg-white border border-slate-200 rounded-lg shadow-2xl py-2 z-[100] text-slate-800 animate-fade-in-up">
            <div className="px-3 pb-2 border-b border-slate-100">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600 flex items-center justify-between">
                <span>Official Indian Languages</span>
                <span className="text-[9px] bg-blue-50 text-blue-700 font-bold px-1.5 py-0.5 rounded">23 Total</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                Eighth Schedule of Constitution of India + English
              </div>
              {/* Quick Search */}
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search language / भाषा..."
                className="mt-1.5 w-full px-2 py-1 text-xs bg-slate-50 border border-slate-200 rounded text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0066cc]"
                autoFocus
              />
            </div>

            <div className="max-h-60 overflow-y-auto divide-y divide-slate-50">
              {filteredLanguages.length === 0 ? (
                <div className="px-3 py-3 text-xs text-slate-400 text-center">
                  No matching Indian language found
                </div>
              ) : (
                filteredLanguages.map(l => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 flex items-center justify-between text-xs hover:bg-blue-50 transition-colors cursor-pointer ${
                      lang === l.code ? 'bg-blue-50/80 font-bold text-[#0066cc]' : 'text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{l.native}</span>
                      <span className="text-[10px] text-slate-500 font-normal">({l.label})</span>
                    </div>
                    {lang === l.code && <span className="text-xs text-[#0066cc]">✓</span>}
                  </button>
                ))
              )}
            </div>
            <div className="px-3 pt-1.5 border-t border-slate-100 text-[9px] text-slate-400 text-center">
              Changes interface language across entire portal
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
