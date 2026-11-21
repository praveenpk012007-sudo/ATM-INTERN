import { useState, useRef, useEffect } from 'react';

export default function NotificationCenter({ notifications, onClear }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const unread = notifications.filter(n => !n.read).length;

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center text-slate-700 hover:text-slate-900 transition-all cursor-pointer shadow-2xs"
        title="Official Alert Bulletins"
      >
        <span className="text-base">🔔</span>
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-red-600 rounded-full text-[10px] font-extrabold text-white flex items-center justify-center shadow-xs">
            {Math.min(unread, 99)}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-11 right-0 w-[380px] max-h-[500px] bg-white border border-slate-200 rounded-lg shadow-2xl z-50 overflow-hidden animate-fade-in-up">
          <div className="flex items-center justify-between px-4 py-3 bg-[#f8fafc] border-b border-slate-200">
            <div className="flex items-center gap-2">
              <span className="text-sm">🔔</span>
              <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">
                Official Incident Notifications
              </h3>
            </div>
            <button 
              onClick={onClear} 
              className="text-[11px] font-bold text-[#0066cc] hover:underline cursor-pointer"
            >
              Clear All
            </button>
          </div>
          <div className="max-h-[420px] overflow-y-auto p-2 divide-y divide-slate-100">
            {notifications.length === 0 ? (
              <p className="text-center text-slate-500 text-xs py-8 font-medium">No new incident dispatches</p>
            ) : notifications.slice(0, 25).map((n, i) => {
              const ago = Math.round((Date.now() - n.time) / 60000);
              const borderColor = n.level === 'urgent' ? 'border-l-red-600 bg-red-50/50 text-red-950' :
                                  n.level === 'medium' ? 'border-l-amber-500 bg-amber-50/50 text-amber-950' :
                                  'border-l-blue-600 bg-blue-50/30 text-blue-950';
              return (
                <div key={i} className={`p-3 rounded-md mb-1.5 cursor-pointer hover:bg-slate-50 transition-all border-l-4 ${borderColor} border border-slate-100 shadow-2xs`}>
                  <div className="text-xs font-bold text-slate-900 mb-0.5">{n.title}</div>
                  <div className="text-[11px] text-slate-600 leading-snug">{n.desc}</div>
                  <div className="text-[10px] text-slate-400 mt-1 font-semibold">
                    {ago < 1 ? 'Just now' : `${ago}m ago`}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="p-2 bg-slate-50 border-t border-slate-100 text-center text-[10px] text-slate-500 font-medium">
            National Cybercrime Telemetry Stream (NCRP 1930 / CFCFRMS)
          </div>
        </div>
      )}
    </div>
  );
}
