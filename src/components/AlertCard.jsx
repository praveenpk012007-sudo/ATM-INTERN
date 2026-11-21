import { useState } from 'react';
import { Link } from 'react-router-dom';
import ConfidenceBadge from './ConfidenceBadge';
import { formatAmount } from '../data/mockData';

export default function AlertCard({ complaint, compact = false, onAction }) {
  const [resolved, setResolved] = useState(false);
  const [showExplain, setShowExplain] = useState(false);
  const borderColor = complaint.confidence >= 80 ? 'border-l-red-600' :
                      complaint.confidence >= 60 ? 'border-l-amber-500' : 'border-l-slate-400';

  if (compact) {
    return (
      <Link to={`/cases/${complaint.index}`}
        className={`bg-white p-4 border border-slate-200 border-l-4 ${borderColor} rounded-lg hover:shadow-md transition-all block group`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-slate-800 group-hover:text-[#0066cc] transition-colors">
            📋 {complaint.id}
          </span>
          <ConfidenceBadge score={complaint.confidence} />
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div><span className="text-slate-500">Defrauded Amt:</span> <span className="text-red-600 font-bold">{formatAmount(complaint.fraudAmount)}</span></div>
          <div><span className="text-slate-500">Category:</span> <span className="text-slate-800 font-medium">{complaint.category}</span></div>
          <div><span className="text-slate-500">Jurisdiction:</span> <span className="text-slate-800 font-medium">{complaint.district}, {complaint.state}</span></div>
          <div><span className="text-slate-500">Telemetry:</span> <span className="text-slate-700 font-medium">⏱ {complaint.timeSince} ago</span></div>
        </div>
      </Link>
    );
  }

  return (
    <div className={`bg-white rounded-lg p-5 border border-slate-200 border-l-4 ${borderColor} shadow-xs hover:shadow-md transition-all animate-fade-in-up`}>
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono font-bold border border-slate-200">
            NCRP INCIDENT
          </span>
          <Link to={`/cases/${complaint.index}`} className="text-sm font-bold text-slate-900 hover:text-[#0066cc] transition-colors">
            {complaint.id}
          </Link>
        </div>
        <ConfidenceBadge score={complaint.confidence} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
        <div>
          <div className="text-[10px] text-slate-500 uppercase tracking-wide font-bold">Defrauded Value</div>
          <div className="text-sm text-red-600 font-extrabold">{formatAmount(complaint.fraudAmount)}</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-500 uppercase tracking-wide font-bold">Time Lapsed</div>
          <div className="text-sm text-slate-800 font-semibold">⏱ {complaint.timeSince} ago</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-500 uppercase tracking-wide font-bold">Modus Operandi</div>
          <div className="text-sm text-slate-800 font-semibold">{complaint.category}</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-500 uppercase tracking-wide font-bold">Jurisdiction Police</div>
          <div className="text-sm text-slate-800 font-semibold">{complaint.district}, {complaint.state}</div>
        </div>
      </div>

      {/* Predicted Withdrawal Locations */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 mb-3">
        <h4 className="text-[11px] text-slate-700 uppercase tracking-wider font-extrabold mb-2 flex items-center gap-1.5">
          <span>📍</span> Predicted Cash-Out Points (AI Hotspot Radius)
        </h4>
        <div className="space-y-1.5">
          {complaint.predictedLocations.map((loc, i) => (
            <div key={i} className="flex items-center justify-between py-1 px-2 rounded bg-white border border-slate-200">
              <span className="text-xs font-semibold text-slate-800 flex items-center gap-2">
                <span className="text-xs">{i === 0 ? '🔴' : '🟡'}</span>
                <span>{loc.name}</span>
                <span className="text-[10px] text-slate-400 font-normal">(PIN: {loc.pincode})</span>
              </span>
              <span className={`text-[11px] font-extrabold ${loc.confidence >= 75 ? 'text-red-600' : 'text-amber-700'}`}>
                {loc.confidence}% Probability
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Explainability */}
      <div
        className="bg-blue-50/70 border border-blue-200 rounded-lg p-3 mb-3 cursor-pointer hover:bg-blue-50 transition-all"
        onClick={() => setShowExplain(!showExplain)}
      >
        <div className="text-xs font-bold text-[#0066cc] flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span>💡</span> Explainable AI (XAI) Model Rationale
          </span>
          <span className="text-xs">{showExplain ? '▲ Hide' : '▼ View Rationale'}</span>
        </div>
        {showExplain && (
          <p className="text-xs text-slate-700 mt-2 leading-relaxed font-normal border-t border-blue-100 pt-2">
            {complaint.explainability}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 flex-wrap pt-1">
        <button
          onClick={() => onAction?.('bank', complaint)}
          className="px-3 py-1.5 rounded text-xs font-bold bg-blue-50 text-[#0066cc] border border-blue-200 hover:bg-blue-100 transition-all cursor-pointer flex items-center gap-1"
        >
          🏦 Freeze Request (Bank)
        </button>
        <button
          onClick={() => onAction?.('police', complaint)}
          className="px-3 py-1.5 rounded text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition-all cursor-pointer flex items-center gap-1"
        >
          👮 Dispatch Patrol (Police)
        </button>
        <button
          onClick={() => { setResolved(true); onAction?.('resolve', complaint); }}
          disabled={resolved}
          className={`px-3 py-1.5 rounded text-xs font-bold transition-all flex items-center gap-1 ${
            resolved
              ? 'bg-slate-100 text-slate-400 border border-slate-200'
              : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 cursor-pointer'
          }`}
        >
          {resolved ? '✓ Action Taken' : '✓ Mark Action Taken'}
        </button>
        <Link
          to={`/cases/${complaint.index}`}
          className="px-3 py-1.5 rounded text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 transition-all ml-auto flex items-center gap-1"
        >
          🔍 Case Dossier & Mule Graph →
        </Link>
      </div>
    </div>
  );
}
