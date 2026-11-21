export default function StatCard({ icon, value, label, change, changeDir, variant = 'info' }) {
  const topBorders = {
    danger: 'border-t-red-600',
    warning: 'border-t-amber-500',
    success: 'border-t-emerald-600',
    info: 'border-t-[#0066cc]',
  };

  const badgeBgs = {
    danger: 'bg-red-50 text-red-700 border-red-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    info: 'bg-blue-50 text-blue-700 border-blue-200',
  };

  return (
    <div className={`bg-white rounded-lg p-5 border border-slate-200 border-t-4 ${topBorders[variant]} shadow-xs hover:shadow-md transition-all duration-200`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl p-2 rounded-md bg-slate-50 border border-slate-100">{icon}</span>
        {change && (
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${changeDir === 'up' ? badgeBgs.danger : badgeBgs.success}`}>
            {changeDir === 'up' ? '▲' : '▼'} {change}
          </span>
        )}
      </div>
      <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
        {typeof value === 'number' ? value.toLocaleString('en-IN') : value}
      </div>
      <div className="text-xs text-slate-500 mt-1 font-semibold uppercase tracking-wide">
        {label}
      </div>
    </div>
  );
}
