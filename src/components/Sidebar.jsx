import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { ALL_COMPLAINTS } from '../data/mockData';

export default function Sidebar() {
  const { role } = useAuth();
  const { t } = useLanguage();

  const getNavItems = (roleKey) => {
    return [
      { to: '/dashboard', icon: '📊', label: t.nav?.overview || 'Overview' },
      { to: '/heatmap',   icon: '🗺️', label: t.nav?.heatmap || 'Risk Heatmap' },
      {
        to: '/alerts',
        icon: '🚨',
        label: t.nav?.alerts || 'Predictive Alert Feed',
        count: () => roleKey === 'police'
          ? ALL_COMPLAINTS.filter(c => c.confidence >= 70 && c.state === 'Maharashtra').length
          : ALL_COMPLAINTS.filter(c => c.confidence >= 75).length
      },
      { to: '/analytics', icon: '📈', label: t.nav?.analytics || 'Analytics & Reports' },
      { to: '/about',     icon: 'ℹ️', label: t.nav?.about || 'Methodology & Charter' },
    ];
  };

  const items = getNavItems(role);

  return (
    <aside className="w-[260px] min-h-[calc(100vh-92px)] bg-white border-r border-slate-200 fixed top-[92px] left-0 bottom-0 overflow-y-auto z-40 hidden lg:block shadow-xs">
      <nav className="p-3.5 space-y-1">
        <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider px-3 py-2 border-b border-slate-100 mb-1 flex items-center justify-between">
          <span>{t.portalTitleHindi ? 'पोर्टल नेविगेशन' : 'Navigation'}</span>
          <span className="text-[9px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-bold">NCRP</span>
        </div>

        {items.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/dashboard'}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2.5 rounded-md text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-[#0066cc]/10 text-[#0066cc] border-l-4 border-[#0066cc] font-bold shadow-xs'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 border-l-4 border-transparent'
              }`
            }
          >
            <span className="text-base shrink-0">{item.icon}</span>
            <span className="truncate">{item.label}</span>
            {item.count && (
              <span className="ml-auto text-[10px] font-bold bg-red-600 text-white px-1.5 py-0.5 rounded-full shadow-xs">
                {item.count()}
              </span>
            )}
          </NavLink>
        ))}

        <div className="pt-4 mt-4 border-t border-slate-100">
          <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider px-3 py-1.5 mb-1">
            STATUTORY COMPLIANCE
          </div>
          <div className="px-3 py-2 text-[11px] text-slate-600 bg-slate-50 rounded border border-slate-200 leading-relaxed">
            <p className="font-semibold text-slate-800">BNSS / CrPC Notice</p>
            <p className="text-[10px] text-slate-500 mt-0.5">
              {t.disclaimerText ? t.disclaimerText.substring(0, 85) + '...' : 'Strictly for designated Law Enforcement Agencies and Nodal Officers under I4C.'}
            </p>
          </div>
        </div>
      </nav>
    </aside>
  );
}
