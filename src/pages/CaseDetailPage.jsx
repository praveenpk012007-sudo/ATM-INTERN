import { useParams, Link } from 'react-router-dom';
import { ALL_COMPLAINTS, formatAmount, generateAuditLog, generateAlertPayloads } from '../data/mockData';
import ConfidenceBadge from '../components/ConfidenceBadge';
import StatusTracker from '../components/StatusTracker';
import MuleGraph from '../components/MuleGraph';
import { useState } from 'react';
import Toastify from 'toastify-js';

export default function CaseDetailPage() {
  const { id } = useParams();
  const complaint = ALL_COMPLAINTS.find(c => c.index === parseInt(id)) || ALL_COMPLAINTS[0];
  const [showPayload, setShowPayload] = useState('sms');

  const auditLog = generateAuditLog(complaint);
  const payloads = generateAlertPayloads(complaint);

  const toast = (msg) => Toastify({
    text: '✅ ' + msg,
    duration: 2500,
    gravity: 'bottom',
    position: 'center',
    style: { background: '#15803d', color: '#ffffff', borderRadius: '6px', fontFamily: 'Inter', fontSize: '12px', fontWeight: '600', padding: '10px 18px' }
  }).showToast();

  return (
    <div className="animate-fade-in-up space-y-5">
      {/* Top Breadcrumb & Header */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Link to="/dashboard" className="text-[#0066cc] hover:underline font-semibold">Dashboard</Link>
            <span>/</span>
            <Link to="/alerts" className="text-[#0066cc] hover:underline font-semibold">Alerts</Link>
            <span>/</span>
            <span className="text-slate-700 font-mono font-bold">{complaint.id}</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>📋</span> Case Investigation Dossier: <span className="font-mono text-[#0066cc]">{complaint.id}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Ingested via NCRP • Modus: <strong className="text-slate-800">{complaint.category}</strong> • Jurisdiction: <strong className="text-slate-800">{complaint.district}, {complaint.state}</strong>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ConfidenceBadge score={complaint.confidence} />
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 rounded text-xs font-bold transition-colors cursor-pointer"
          >
            🖨️ Print FIR Summary
          </button>
        </div>
      </div>

      {/* Status Flow Tracker */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
        <h3 className="text-xs font-extrabold text-slate-700 uppercase tracking-wide mb-3 flex items-center gap-1.5">
          <span>📌</span> Statutory Investigation Lifecycle (BNSS / CrPC Procedural Stages)
        </h3>
        <StatusTracker currentStatus={complaint.status} onAdvance={() => toast(`Investigation stage advanced for ${complaint.id}`)} />
      </div>

      {/* Two Column Layout: Details & Predictions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left: Case Parameters */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs">
          <h3 className="text-sm font-extrabold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
            <span>📝</span> NCRP Complaint Parameters
          </h3>
          <div className="divide-y divide-slate-100 text-xs">
            {[
              ['Victim / Complainant', complaint.complainant + ' (Identity Masked under IT Act)'],
              ['Contact Mask', complaint.phone.replace(/(\d{2})\d{6}(\d{2})/, '$1XXXXXX$2')],
              ['Modus Operandi', complaint.category],
              ['Total Defrauded Value', formatAmount(complaint.fraudAmount)],
              ['Police Jurisdiction', `${complaint.district}, ${complaint.state}`],
              ['Postal PIN Code', `${complaint.pincode} (${complaint.area})`],
              ['Suspect Account Number', complaint.suspectAccount],
              ['Beneficiary Bank / FI', complaint.suspectBank],
              ['Intermediary Mule Tiers', `${complaint.linkedMules} Layer(s)`],
              ['Time of Ingestion', complaint.dateTime],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between items-center py-2">
                <span className="text-slate-500 font-semibold">{label}</span>
                <span className="text-slate-900 font-bold text-right">{value}</span>
              </div>
            ))}
          </div>

          {/* Explainability Box */}
          <div className="mt-4 p-3.5 bg-blue-50/80 border border-blue-200 rounded-lg">
            <h4 className="text-xs font-bold text-[#0066cc] mb-1 flex items-center gap-1.5">
              <span>💡</span> Explainable AI (XAI) Model Assessment
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              {complaint.explainability}
            </p>
          </div>
        </div>

        {/* Right: Predicted Withdrawal ATMs & Transmission */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs">
          <h3 className="text-sm font-extrabold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
            <span>📍</span> Forecasted Cash-Out ATMs & Actionable Hubs
          </h3>
          <div className="space-y-2.5 mb-5">
            {complaint.predictedLocations.map((loc, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2.5">
                  <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-extrabold ${
                    i === 0 ? 'bg-red-100 text-red-700 border border-red-300' : 'bg-amber-100 text-amber-700 border border-amber-300'
                  }`}>
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{loc.name}</p>
                    <p className="text-[11px] text-slate-500">Postal PIN: {loc.pincode}</p>
                  </div>
                </div>
                <ConfidenceBadge score={loc.confidence} />
              </div>
            ))}
          </div>

          {/* Telemetry Payload Preview */}
          <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-2 flex items-center justify-between">
            <span>📤 Telemetry Dispatch Payload</span>
            <span className="text-[10px] text-slate-400 font-normal">Select Format:</span>
          </h4>
          <div className="flex gap-2 mb-3">
            {['sms', 'email', 'api'].map(type => (
              <button
                key={type}
                onClick={() => setShowPayload(type)}
                className={`px-3 py-1 rounded text-xs font-bold border transition-colors cursor-pointer ${
                  showPayload === type
                    ? 'bg-[#0066cc] text-white border-[#0066cc]'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {type === 'sms' ? '📱 SMS CAD' : type === 'email' ? '📧 Email Memo' : '🔌 API JSON'}
              </button>
            ))}
          </div>
          {showPayload === 'sms' && (
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs font-mono text-slate-800 leading-relaxed whitespace-pre-wrap">
              {payloads.sms}
            </div>
          )}
          {showPayload === 'email' && (
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs font-mono text-slate-800 leading-relaxed whitespace-pre-line">
              <span className="font-bold text-amber-900">Subject: {payloads.email.subject}</span>{'\n\n'}{payloads.email.body}
            </div>
          )}
          {showPayload === 'api' && (
            <pre className="bg-slate-900 text-emerald-400 p-3 rounded-lg text-[11px] font-mono leading-relaxed overflow-x-auto">
              {JSON.stringify(payloads.apiPayload, null, 2)}
            </pre>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4 flex-wrap pt-3 border-t border-slate-100">
            <button
              onClick={() => toast('Bank Nodal Alert transmitted over CFCFRMS')}
              className="px-3.5 py-2 rounded text-xs font-bold bg-[#0066cc] text-white hover:bg-[#0052a3] transition-colors shadow-xs cursor-pointer"
            >
              🏦 Transmit Bank Freeze Request
            </button>
            <button
              onClick={() => toast('Police Beat Patrol dispatched via CAD')}
              className="px-3.5 py-2 rounded text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100 transition-colors shadow-xs cursor-pointer"
            >
              👮 Dispatch Police Beat
            </button>
          </div>
        </div>
      </div>

      {/* Mule Account Graph Trace */}
      <MuleGraph complaint={complaint} />

      {/* Evidence Documents Section */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs">
        <h3 className="text-sm font-extrabold text-slate-900 mb-3 flex items-center gap-2">
          <span>📎</span> Digitally Signed Evidentiary Documents
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { name: 'NCRP_Acknowledgment_Form.pdf', size: '2.4 MB', type: 'PDF' },
            { name: 'Bank_Statement_L1_Layer.pdf', size: '1.1 MB', type: 'PDF' },
            { name: 'CFCFRMS_Packet_Trace.csv', size: '340 KB', type: 'CSV' },
          ].map(doc => (
            <div key={doc.name} className="bg-slate-50 rounded-lg p-3 border border-slate-200 flex items-center gap-3 hover:border-[#0066cc] transition-colors cursor-pointer">
              <span className="text-2xl">{doc.type === 'PDF' ? '📄' : '📊'}</span>
              <div>
                <p className="text-xs font-bold text-slate-800">{doc.name}</p>
                <p className="text-[11px] text-slate-500">{doc.size} • Verified Seal</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Official Audit Trail */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-200 bg-slate-50">
          <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
            🏛️ Statutory Chain of Custody & Audit Trail
          </h3>
          <p className="text-[11px] text-slate-500">Immutable forensic record of all investigator and system actions under Section 65B, Indian Evidence Act</p>
        </div>
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-200">
              {['Timestamp', 'Officer / System User', 'Designation / Agency', 'Procedural Action'].map(h => (
                <th key={h} className="px-4 py-2.5 font-bold text-slate-700 uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {auditLog.map((entry, i) => (
              <tr key={i} className="hover:bg-slate-50">
                <td className="px-4 py-2.5 text-slate-600 font-mono">{new Date(entry.timestamp).toLocaleString('en-IN')}</td>
                <td className="px-4 py-2.5 font-bold text-slate-800">{entry.user}</td>
                <td className="px-4 py-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-[#0066cc] border border-blue-200">
                    {entry.role}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-slate-700">{entry.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
