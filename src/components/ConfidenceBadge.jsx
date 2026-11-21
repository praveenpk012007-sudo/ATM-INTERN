export default function ConfidenceBadge({ score }) {
  const level = score >= 80 ? 'high' : score >= 60 ? 'medium' : 'low';
  const styles = {
    high: 'bg-red-50 text-red-700 border-red-200',
    medium: 'bg-amber-50 text-amber-800 border-amber-200',
    low: 'bg-slate-100 text-slate-700 border-slate-300',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border shadow-2xs ${styles[level]}`}>
      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: level === 'high' ? '#dc2626' : level === 'medium' ? '#d97706' : '#64748b' }} />
      <span>{score}% Confidence</span>
    </span>
  );
}
