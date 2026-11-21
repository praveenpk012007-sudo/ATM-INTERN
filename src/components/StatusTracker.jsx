const STEPS = ['New', 'Acknowledged', 'Under Investigation', 'Action Taken', 'Resolved'];

export default function StatusTracker({ currentStatus, onAdvance }) {
  const currentIndex = STEPS.indexOf(currentStatus);

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {STEPS.map((step, i) => (
        <div key={step} className="flex items-center gap-1.5">
          <span
            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all border ${
              i < currentIndex
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : i === currentIndex
                ? 'bg-blue-50 text-[#0066cc] border-blue-300 font-bold shadow-2xs'
                : 'bg-slate-100 text-slate-500 border-slate-200'
            }`}
          >
            {i < currentIndex ? '✓ ' : ''}{step}
          </span>
          {i < STEPS.length - 1 && <span className="text-slate-400 text-xs">→</span>}
        </div>
      ))}
      {onAdvance && currentIndex < STEPS.length - 1 && (
        <button
          onClick={onAdvance}
          className="ml-2 px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#0066cc] text-white hover:bg-[#0052a3] transition-colors shadow-2xs cursor-pointer"
        >
          ▶ Advance Status
        </button>
      )}
    </div>
  );
}
