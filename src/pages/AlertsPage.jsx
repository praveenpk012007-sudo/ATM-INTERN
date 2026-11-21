import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import AlertCard from '../components/AlertCard';
import SimulateButton from '../components/SimulateButton';
import { STATES, CRIME_CATEGORIES, generateAlertPayloads } from '../data/mockData';
import Toastify from 'toastify-js';

export default function AlertsPage() {
  const { role } = useAuth();
  const { liveComplaints, onNewComplaint } = useOutletContext();
  const { t } = useLanguage();
  const [filterConf, setFilterConf] = useState('all');
  const [filterState, setFilterState] = useState('All');
  const [filterCrime, setFilterCrime] = useState('All');
  const [showPayloadModal, setShowPayloadModal] = useState(null);

  let filtered = [...liveComplaints];
  if (role === 'police') filtered = filtered.filter(c => c.state === 'Maharashtra');
  if (role === 'bank') filtered = filtered.filter(c => c.confidence >= 70);
  if (filterConf === 'high') filtered = filtered.filter(c => c.confidence >= 80);
  else if (filterConf === 'medium') filtered = filtered.filter(c => c.confidence >= 60 && c.confidence < 80);
  else if (filterConf === 'low') filtered = filtered.filter(c => c.confidence < 60);
  if (filterState !== 'All') filtered = filtered.filter(c => c.state === filterState);
  if (filterCrime !== 'All') filtered = filtered.filter(c => c.category === filterCrime);

  const handleAction = (type, complaint) => {
    if (type === 'bank' || type === 'police') {
      const payloads = generateAlertPayloads(complaint);
      setShowPayloadModal({ complaint, payloads, type });
    }
    Toastify({
      text: `✅ ${type.toUpperCase()} alert action dispatched for ${complaint.id}`,
      duration: 2500,
      gravity: 'bottom',
      position: 'center',
      style: { background: '#15803d', color: '#ffffff', borderRadius: '6px', fontFamily: 'Inter', fontSize: '12px', fontWeight: '600', padding: '10px 18px' }
    }).showToast();
  };

  return (
    <div className="animate-fade-in-up space-y-5">
      {/* Top Banner */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>🚨</span> {role === 'bank' ? (t.alertsPage?.bankTitle || 'CFCFRMS Debit Freeze Alert Queue') : (t.alertsPage?.title || 'NCRP Predictive Alert Repository')}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.alertsPage?.subtitle || `Displaying ${filtered.length} active incidents prioritized by AI confidence score & cash-out velocity`}
          </p>
        </div>
        <SimulateButton onNewComplaint={onNewComplaint} />
      </div>

      {/* Filter Card */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex flex-wrap gap-3 items-end">
        <div className="min-w-[140px] flex-1">
          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
            {t.alertsPage?.confFilter || t.map?.minConfidence || "Confidence Score"}
          </label>
          <select
            value={filterConf}
            onChange={e => setFilterConf(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-slate-800 text-xs focus:border-[#0066cc] focus:outline-none"
          >
            <option value="all">{t.alertsPage?.allConf || "All Confidence Levels"}</option>
            <option value="high">{t.alertsPage?.highConf || "High Priority (≥80%)"}</option>
            <option value="medium">{t.alertsPage?.medConf || "Medium Priority (60-79%)"}</option>
            <option value="low">{t.alertsPage?.lowConf || "Low (<60%)"}</option>
          </select>
        </div>

        {role !== 'police' && (
          <div className="min-w-[140px] flex-1">
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              {t.filters?.state || "State Jurisdiction"}
            </label>
            <select
              value={filterState}
              onChange={e => setFilterState(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-slate-800 text-xs focus:border-[#0066cc] focus:outline-none"
            >
              <option value="All">{t.filters?.allStates || "All States & UTs"}</option>
              {Object.keys(STATES).map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        )}

        <div className="min-w-[140px] flex-1">
          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
            {t.filters?.crime || "Modus Operandi"}
          </label>
          <select
            value={filterCrime}
            onChange={e => setFilterCrime(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-slate-800 text-xs focus:border-[#0066cc] focus:outline-none"
          >
            <option value="All">{t.filters?.allCrimes || "All Categories"}</option>
            {CRIME_CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Alerts Feed */}
      <div className="grid gap-3.5">
        {filtered.slice(0, 30).map(c => (
          <AlertCard key={c.id} complaint={c} onAction={handleAction} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="bg-white p-8 rounded-lg border border-slate-200 text-center text-slate-500 text-sm">
          No alerts match the selected filters.
        </div>
      )}

      {/* Official Alert Payload Modal */}
      {showPayloadModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4" onClick={() => setShowPayloadModal(null)}>
          <div className="bg-white max-w-xl w-full p-6 rounded-xl border border-slate-200 shadow-2xl max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <span>📤</span> Official Telemetry Payload — {showPayloadModal.type === 'bank' ? 'Bank Freeze API Dispatch' : 'Police Emergency CAD SMS'}
                </h3>
                <span className="text-xs text-slate-500 font-mono">Case Ref: {showPayloadModal.complaint.id}</span>
              </div>
              <button
                onClick={() => setShowPayloadModal(null)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-[#0066cc] mb-1.5 flex items-center gap-1.5">
                  <span>📱</span> Emergency SMS Payload (For 112 Patrol & Nodal Officer)
                </h4>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 font-mono text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {showPayloadModal.payloads.sms}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#0066cc] mb-1.5 flex items-center gap-1.5">
                  <span>📧</span> Official Dispatch Memo (LEA Intimation)
                </h4>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 font-mono text-slate-800 whitespace-pre-line leading-relaxed">
                  <div className="font-bold text-amber-900 border-b border-slate-200 pb-1 mb-2">
                    Subject: {showPayloadModal.payloads.email.subject}
                  </div>
                  {showPayloadModal.payloads.email.body}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#0066cc] mb-1.5 flex items-center gap-1.5">
                  <span>🔌</span> CFCFRMS REST API JSON Payload (Direct Bank Gateway)
                </h4>
                <pre className="bg-slate-900 text-emerald-400 p-3.5 rounded-lg text-[11px] font-mono overflow-x-auto">
                  {JSON.stringify(showPayloadModal.payloads.apiPayload, null, 2)}
                </pre>
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                <button
                  onClick={() => setShowPayloadModal(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded cursor-pointer"
                >
                  {t.common?.close || "Close"}
                </button>
                <button
                  onClick={() => {
                    toast('Payload transmitted over secure LEA channel');
                    setShowPayloadModal(null);
                  }}
                  className="px-4 py-2 bg-[#0066cc] hover:bg-[#0052a3] text-white text-xs font-bold rounded shadow-xs cursor-pointer"
                >
                  Transmit Alert Now →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
