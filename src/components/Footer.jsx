import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t-2 border-[#0066cc]/20 bg-white text-slate-600 shadow-sm mt-8">
      {/* 1. Official Government Navigation & Policy Links */}
      <div className="bg-[#f8fafc] border-b border-slate-200 py-3.5 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-700">
          <Link to="/dashboard" className="hover:text-[#0066cc] transition-colors">{t.nav?.overview || 'National Overview'}</Link>
          <span className="text-slate-300">|</span>
          <Link to="/heatmap" className="hover:text-[#0066cc] transition-colors">{t.nav?.heatmap || 'Risk Heatmap'}</Link>
          <span className="text-slate-300">|</span>
          <Link to="/alerts" className="hover:text-[#0066cc] transition-colors">{t.nav?.alerts || 'Predictive Alerts'}</Link>
          <span className="text-slate-300">|</span>
          <Link to="/analytics" className="hover:text-[#0066cc] transition-colors">{t.nav?.analytics || 'Analytics Bureau'}</Link>
          <span className="text-slate-300">|</span>
          <Link to="/about" className="hover:text-[#0066cc] transition-colors">{t.nav?.about || 'Platform Charter & SOP'}</Link>
          <span className="text-slate-300">|</span>
          <span className="text-slate-500 cursor-pointer hover:text-[#0066cc]">Terms & Conditions</span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-500 cursor-pointer hover:text-[#0066cc]">Privacy Policy</span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-500 cursor-pointer hover:text-[#0066cc]">Hyperlink Policy</span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-500 cursor-pointer hover:text-[#0066cc]">Copyright Policy</span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-500 cursor-pointer hover:text-[#0066cc]">Accessibility Statement</span>
        </div>
      </div>

      {/* 2. Statutory Legal Notice */}
      <div className="py-4 px-6 max-w-7xl mx-auto border-b border-slate-100">
        <p className="text-[11px] text-slate-500 text-center leading-relaxed">
          ⚖️ <strong>Statutory Disclaimer:</strong> {t.footer?.statutoryDisclaimer || 'CyberEye generates predictive intelligence and tactical alerts for decision support. Fund freezing and account debit freeze authority rests strictly with State/UT Law Enforcement Agencies (LEAs) and authorized Nodal Officers of Financial Institutions under relevant provisions of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023, CrPC, and Information Technology Act, 2000.'}
        </p>
      </div>

      {/* 3. Official NIC & Ministry Accreditation */}
      <div className="bg-white py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#0b3874] text-white flex items-center justify-center font-extrabold text-[11px] shadow-xs">
              NIC
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-800">
                Designed, Developed and Hosted by <strong className="text-[#0066cc]">National Informatics Centre (NIC)</strong>
              </p>
              <p className="text-[10px] text-slate-500">
                Ministry of Electronics & Information Technology, Government of India
              </p>
            </div>
          </div>

          <div className="text-center md:text-right text-[11px]">
            <p className="font-semibold text-slate-800">
              Website Content Managed by <strong className="text-[#0b3874]">{t.i4cCenter || 'Indian Cyber Crime Coordination Centre (I4C)'}</strong>
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">
              {t.mha || 'Ministry of Home Affairs, Government of India'} • Last Reviewed: 21 September 2026
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
