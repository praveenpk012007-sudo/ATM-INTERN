import { simulateNewComplaint, generateAlertPayloads } from '../data/mockData';
import Toastify from 'toastify-js';

export default function SimulateButton({ onNewComplaint }) {
  const handleSimulate = () => {
    const newComplaint = simulateNewComplaint();
    const payloads = generateAlertPayloads(newComplaint);

    Toastify({
      text: `🚨 OFFICIAL NCRP TELEMETRY DISPATCH:\n${newComplaint.category} — ${newComplaint.id}\nDefrauded: ₹${newComplaint.fraudAmount.toLocaleString('en-IN')} | AI Confidence: ${newComplaint.confidence}%\nPredicted Extraction: ${newComplaint.predictedLocations[0]?.name || newComplaint.area}`,
      duration: 5500,
      gravity: 'top',
      position: 'right',
      style: {
        background: '#0b3874',
        color: '#ffffff',
        borderRadius: '6px',
        fontFamily: 'Inter, sans-serif',
        fontSize: '12px',
        fontWeight: '600',
        padding: '14px 20px',
        maxWidth: '420px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
        whiteSpace: 'pre-line',
        borderLeft: '5px solid #dc2626',
      },
    }).showToast();

    if (onNewComplaint) onNewComplaint(newComplaint, payloads);
  };

  return (
    <button
      onClick={handleSimulate}
      className="px-4 py-2 rounded-md text-xs font-bold bg-[#0066cc] hover:bg-[#0052a3] text-white shadow-xs hover:shadow transition-all active:scale-98 flex items-center gap-2 cursor-pointer border border-[#0052a3]"
      title="Trigger simulated live NCRP / CFCFRMS telemetry incident feed"
    >
      <span>📡</span>
      <span>Ingest Live NCRP Stream</span>
    </button>
  );
}
