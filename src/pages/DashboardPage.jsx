import { useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import StatCard from '../components/StatCard';
import AlertCard from '../components/AlertCard';
import RiskMap from '../components/RiskMap';
import StatusTracker from '../components/StatusTracker';
import ConfidenceBadge from '../components/ConfidenceBadge';
import { STATES, CRIME_CATEGORIES, formatAmount, getStateRiskData } from '../data/mockData';
import Toastify from 'toastify-js';

function toast(msg) {
  Toastify({
    text: '✅ ' + msg,
    duration: 2500,
    gravity: 'bottom',
    position: 'center',
    style: {
      background: '#15803d',
      color: '#ffffff',
      borderRadius: '6px',
      fontFamily: 'Inter',
      fontSize: '12px',
      fontWeight: '600',
      padding: '10px 18px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    }
  }).showToast();
}

// ===== I4C OFFICER (National View) =====
function I4CView({ complaints }) {
  const { t } = useLanguage();
  const [stateFilter, setStateFilter] = useState('All');
  const [crimeFilter, setCrimeFilter] = useState('All');
  const filtered = complaints.filter(c => (stateFilter === 'All' || c.state === stateFilter) && (crimeFilter === 'All' || c.category === crimeFilter));
  const highRisk = filtered.filter(c => c.confidence >= 80).length;
  const alertsSent = filtered.filter(c => c.confidence >= 65).length;
  const escalated = filtered.filter(c => c.confidence >= 90).length;

  return (
    <div className="animate-fade-in-up space-y-6">
      {/* Title Banner */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>🏛️</span> {t.dashboard?.i4cTitle || "National Predictive Cybercrime Overview"}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.dashboard?.i4cSubtitle || "Ministry of Home Affairs | Indian Cyber Crime Coordination Centre (I4C) — Central Telemetry"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold bg-blue-50 text-[#0066cc] border border-blue-200 px-2.5 py-1 rounded">
            {t.dashboard?.liveStream || "Live Stream: CFCFRMS + NCRP"}
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon="📥" value={filtered.length} label={t.stats?.complaints || "Complaints Ingested"} change="12% from yesterday" changeDir="up" variant="danger" />
        <StatCard icon="🔥" value={highRisk} label={t.stats?.highRisk || "High-Risk Zones Flagged"} change="5 new hotspots" changeDir="up" variant="warning" />
        <StatCard icon="📤" value={alertsSent} label={t.stats?.alertsSent || "Automated LEA Alerts"} change="8% from yesterday" changeDir="up" variant="info" />
        <StatCard icon="📈" value={escalated} label={t.stats?.escalated || "Priority Interventions"} change="3% from yesterday" changeDir="down" variant="success" />
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex flex-wrap gap-3 items-end">
        <div className="flex-1 min-w-[160px]">
          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
            {t.filters?.state || "State / UT Jurisdiction"}
          </label>
          <select
            value={stateFilter}
            onChange={e => setStateFilter(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-slate-800 text-xs focus:border-[#0066cc] focus:outline-none"
          >
            <option value="All">{t.filters?.allStates || "All States & UTs"}</option>
            {Object.keys(STATES).map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="flex-1 min-w-[160px]">
          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
            {t.filters?.crime || "Crime Category"}
          </label>
          <select
            value={crimeFilter}
            onChange={e => setCrimeFilter(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-slate-800 text-xs focus:border-[#0066cc] focus:outline-none"
          >
            <option value="All">{t.filters?.allCrimes || "All Crime Categories"}</option>
            {CRIME_CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="flex-1 min-w-[140px]">
          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
            {t.filters?.date || "Date Window"}
          </label>
          <input
            type="date"
            defaultValue="2026-09-21"
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-slate-800 text-xs focus:border-[#0066cc] focus:outline-none"
          />
        </div>
        <button
          onClick={() => toast(t.dashboard?.filterApplied || 'Telemetry filter criteria applied')}
          className="px-5 py-2 bg-[#0066cc] text-white text-xs font-bold rounded hover:bg-[#0052a3] transition-colors shadow-xs cursor-pointer"
        >
          {t.dashboard?.applyFilter || "Apply Filters"}
        </button>
      </div>

      {/* GIS Map Container */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-lg">🗺️</span>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {t.map?.title || "All-India Predictive Cash-Out Heatmap"}
              </h3>
              <p className="text-[11px] text-slate-500">
                {t.map?.subtitle || "Visualizing anticipated ATM & branch cash withdrawal nodes based on neural graph propagation"}
              </p>
            </div>
          </div>
          <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-2 py-0.5 rounded">
            ● {t.map?.liveSync || "Live Sync"}
          </span>
        </div>
        <RiskMap filterState={stateFilter} height={460} />
      </div>

      {/* Top Alerts Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
            <span>🚨</span> {t.dashboard?.topAlertsHeading || "Top Priority Cash-Out Alerts"} ({filtered.slice(0, 8).length})
          </h3>
          <Link to="/alerts" className="text-xs font-bold text-[#0066cc] hover:underline">
            {t.dashboard?.viewAll || "View All Alerts"} ({filtered.length}) →
          </Link>
        </div>
        <div className="grid gap-3.5">
          {filtered.slice(0, 8).map(c => (
            <AlertCard
              key={c.id}
              complaint={c}
              onAction={(type) => toast(`${type.toUpperCase()} notification transmitted for ${c.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== POLICE OFFICIAL =====
function PoliceView({ complaints }) {
  const { t } = useLanguage();
  const stateComplaints = complaints.filter(c => c.state === 'Maharashtra');
  const statusCounts = { New: 0, Acknowledged: 0, 'Under Investigation': 0, 'Action Taken': 0, Resolved: 0 };
  stateComplaints.forEach(c => { if (statusCounts[c.status] !== undefined) statusCounts[c.status]++; });

  return (
    <div className="animate-fade-in-up space-y-6">
      {/* Title */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>👮</span> {t.dashboard?.policeTitle || "Maharashtra State Cyber Cell — Jurisdiction Operational Desk"}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.dashboard?.policeSubtitle || "Local Area Law Enforcement Command & Control | Smart Patrol Dispatch"}
          </p>
        </div>
        <span className="text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded">
          Jurisdiction: State of Maharashtra
        </span>
      </div>

      {/* Status counts bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {Object.entries(statusCounts).map(([status, count]) => {
          const colors = {
            New: 'border-l-red-600 text-red-700',
            Acknowledged: 'border-l-blue-600 text-blue-700',
            'Under Investigation': 'border-l-amber-500 text-amber-700',
            'Action Taken': 'border-l-indigo-600 text-indigo-700',
            Resolved: 'border-l-emerald-600 text-emerald-700'
          };
          return (
            <div key={status} className={`bg-white p-3 rounded-lg border border-slate-200 border-l-4 ${colors[status]} shadow-xs`}>
              <div className="text-2xl font-extrabold">{count}</div>
              <div className="text-[11px] font-semibold text-slate-600 mt-0.5 uppercase tracking-wide truncate">{status}</div>
            </div>
          );
        })}
      </div>

      {/* Summary KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon="📩" value={stateComplaints.length} label={t.stats?.complaints || "Active State Incidents"} variant="danger" />
        <StatCard icon="🎯" value={stateComplaints.filter(c => c.confidence >= 75).length} label={t.stats?.highRisk || "High Confidence Cash-Outs"} variant="warning" />
        <StatCard icon="💰" value={`₹${Math.round(stateComplaints.reduce((s, c) => s + c.fraudAmount, 0) / 100000)} Lakhs`} label={t.stats?.fundsProtected || "Reported Fraud Exposure"} variant="info" />
      </div>

      {/* Local Map */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-2">
          📍 Maharashtra ATM Cash-Out Vulnerability Grid
        </h3>
        <RiskMap center={[19.076, 72.877]} zoom={10} filterState="Maharashtra" height={380} />
      </div>

      {/* Alert Feed */}
      <div>
        <h3 className="text-sm font-extrabold text-slate-900 mb-3 flex items-center gap-2">
          <span>🚨</span> Jurisdiction Immediate Response Feed
        </h3>
        <div className="grid gap-3.5">
          {stateComplaints.slice(0, 10).map(c => (
            <div key={c.id} className="bg-white p-4 rounded-lg border border-slate-200 border-l-4 border-l-red-600 shadow-xs">
              <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                <Link to={`/cases/${c.index}`} className="text-sm font-bold text-[#0066cc] hover:underline">
                  📋 {c.id}
                </Link>
                <ConfidenceBadge score={c.confidence} />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs mb-3 bg-slate-50 p-2.5 rounded border border-slate-100">
                <div><span className="text-slate-500">Location:</span> <span className="text-slate-800 font-semibold">📍 {c.district}, {c.area}</span></div>
                <div><span className="text-slate-500">Defrauded:</span> <span className="text-red-600 font-bold">{formatAmount(c.fraudAmount)}</span></div>
                <div><span className="text-slate-500">Elapsed:</span> <span className="text-slate-700 font-semibold">⏱ {c.timeSince} ago</span></div>
              </div>
              <StatusTracker currentStatus={c.status} onAdvance={() => toast(`Status progressed for ${c.id}`)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== BANK / FI =====
function BankView({ complaints }) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('active');
  const freezeAlerts = complaints.filter(c => c.confidence >= 70);
  const resolved = complaints.filter(c => c.status === 'Resolved');
  const totalFrozen = freezeAlerts.reduce((s, c) => s + c.fraudAmount, 0);

  return (
    <div className="animate-fade-in-up space-y-6">
      {/* Title */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>🏦</span> {t.dashboard?.bankTitle || "Financial Institution & Nodal Officer Portal"}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.dashboard?.bankSubtitle || "CFCFRMS Real-Time Account Lien & Debit Freeze Management"}
          </p>
        </div>
        <span className="text-xs font-bold bg-blue-50 text-[#0066cc] border border-blue-200 px-2.5 py-1 rounded">
          Designated Institution: State Bank of India
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon="🔒" value={freezeAlerts.length} label={t.stats?.frozenAccounts || "Pending Freeze Requests"} variant="danger" />
        <StatCard icon="💰" value={`₹${Math.round(totalFrozen / 100000)} Lakhs`} label={t.stats?.fundsProtected || "At-Risk Amount Flagged"} variant="warning" />
        <StatCard icon="✅" value={resolved.length} label="Accounts Frozen (Resolved)" variant="success" />
        <StatCard icon="⏱" value="4.2 mins" label="Mean Response Time" variant="info" />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'active'
              ? 'bg-[#0066cc] text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Active Freeze Requests ({freezeAlerts.length})
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'history'
              ? 'bg-[#0066cc] text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Lien & Freeze History
        </button>
      </div>

      {activeTab === 'active' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200">
                {[t.dashboard?.thId || 'Case Ref', 'Beneficiary Account', 'Bank / FI', t.dashboard?.thAmount || 'Fraud Amount', t.dashboard?.thConfidence || 'Confidence', 'Elapsed', t.dashboard?.thStatus || 'LEA Status', t.dashboard?.thActions || 'Lien Action'].map(h => (
                  <th key={h} className="px-4 py-3 text-[11px] font-extrabold text-slate-700 uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs">
              {freezeAlerts.slice(0, 15).map(c => (
                <tr key={c.id} className="hover:bg-blue-50/40 transition-colors">
                  <td className="px-4 py-3 font-bold text-[#0066cc]">
                    <Link to={`/cases/${c.index}`}>{c.id}</Link>
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-800 font-semibold">{c.suspectAccount}</td>
                  <td className="px-4 py-3 text-slate-700">{c.suspectBank}</td>
                  <td className="px-4 py-3 font-extrabold text-red-600">{formatAmount(c.fraudAmount)}</td>
                  <td className="px-4 py-3"><ConfidenceBadge score={c.confidence} /></td>
                  <td className="px-4 py-3 text-slate-600">⏱ {c.timeSince} ago</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                      Pending Action
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={(e) => { e.target.textContent = '✅ Frozen'; e.target.disabled = true; toast(`Debit freeze initiated for ${c.suspectAccount}`); }}
                      className="px-2.5 py-1 rounded text-xs font-bold bg-[#0066cc] text-white hover:bg-[#0052a3] transition-colors shadow-xs cursor-pointer"
                    >
                      🔒 Place Lien
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200">
                {['Case Ref', 'Account', 'Amount', 'Action Taken', 'Resolution', 'Timestamp'].map(h => (
                  <th key={h} className="px-4 py-3 text-[11px] font-extrabold text-slate-700 uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs">
              {resolved.concat(complaints.slice(30, 45)).map(c => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-bold text-[#0066cc]">{c.id}</td>
                  <td className="px-4 py-3 font-mono text-slate-800">{c.suspectAccount}</td>
                  <td className="px-4 py-3 font-semibold text-slate-800">{formatAmount(c.fraudAmount)}</td>
                  <td className="px-4 py-3"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800">Debit Frozen</span></td>
                  <td className="px-4 py-3"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Secured</span></td>
                  <td className="px-4 py-3 text-slate-500">{c.dateTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ===== INVESTIGATOR =====
function InvestigatorView({ complaints }) {
  const { t } = useLanguage();
  const activeCases = complaints.filter(c => c.status !== 'Resolved').slice(0, 20);
  return (
    <div className="animate-fade-in-up space-y-6">
      {/* Title */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>🔍</span> {t.dashboard?.invTitle || "Inter-Agency Case Investigation & Syndicate Intelligence Unit"}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.dashboard?.invSubtitle || "Multi-jurisdictional mule account clusters, graph neural network propagation & ICJS integration"}
          </p>
        </div>
        <span className="text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200 px-2.5 py-1 rounded">
          Central Cyber Forensics Node
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon="📂" value={activeCases.length} label="Active Investigated Dossiers" variant="danger" />
        <StatCard icon="🕸️" value="14 Identified" label={t.stats?.networkNodes || "Mule Syndicates Mapped"} variant="warning" />
        <StatCard icon="⏱" value="18 mins" label="Mean Hop Interception Window" variant="info" />
        <StatCard icon="⚖️" value="42 Filings" label="Section 65B FIR Intimations" variant="success" />
      </div>

      {/* Active Investigations Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-x-auto">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-slate-900">
            {t.dashboard?.recentIncidents || "Active Priority Incidents for In-Depth Graph Analysis"}
          </h3>
          <span className="text-xs text-slate-500">Sorted by AI Confidence</span>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-200">
              {[t.dashboard?.thId || 'Complaint ID', t.dashboard?.thCategory || 'Category', t.dashboard?.thAmount || 'Amount', 'Originating Account', t.dashboard?.thNode || 'Predicted Withdrawal Node', t.dashboard?.thConfidence || 'Confidence', t.dashboard?.thStatus || 'Status', t.dashboard?.thActions || 'Action'].map(h => (
                <th key={h} className="px-4 py-3 text-[11px] font-extrabold text-slate-700 uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-xs">
            {activeCases.map(c => (
              <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 font-bold text-[#0066cc]">
                  <Link to={`/cases/${c.index}`}>{c.id}</Link>
                </td>
                <td className="px-4 py-3 text-slate-700">{c.category}</td>
                <td className="px-4 py-3 font-bold text-slate-900">{formatAmount(c.fraudAmount)}</td>
                <td className="px-4 py-3 font-mono text-slate-600">{c.suspectAccount}</td>
                <td className="px-4 py-3 text-slate-800 font-semibold">{c.predictedLocations[0]?.name || c.area}</td>
                <td className="px-4 py-3"><ConfidenceBadge score={c.confidence} /></td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                    {c.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Link
                    to={`/cases/${c.index}`}
                    className="px-2.5 py-1 rounded text-xs font-bold bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors inline-block"
                  >
                    🔍 View Dossier
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ===== ADMIN =====
function AdminView({ complaints }) {
  const { t } = useLanguage();
  const stateRisk = getStateRiskData();
  return (
    <div className="animate-fade-in-up space-y-6">
      {/* Title */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>⚙️</span> {t.dashboard?.adminTitle || "CyberEye Portal Administration & Central Telemetry Gateway"}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.dashboard?.adminSubtitle || "System Health, API Integration Pipelines & National Crime Records Ingestion Telemetry"}
          </p>
        </div>
        <span className="text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded">
          Gateway: Healthy & In Sync
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon="⚡" value="99.98%" label="Inference Engine Uptime" variant="success" />
        <StatCard icon="⏱" value="184 ms" label="Model Latency (P99)" variant="info" />
        <StatCard icon="🗄️" value="3,842 / sec" label="NCRP Stream Ingestion Rate" variant="warning" />
        <StatCard icon="🛡️" value="0 Vulnerabilities" label="Security Audit Status" variant="danger" />
      </div>

      {/* System Infrastructure Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-slate-900">National Crime Records Ingestion</h4>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">ONLINE</span>
          </div>
          <p className="text-xs text-slate-500 mb-2">Kafka cluster consuming NCRP 1930 stream with real-time tokenized deduplication.</p>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div className="bg-[#0066cc] h-2 rounded-full" style={{ width: '92%' }}></div>
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">Throughput: 92% of provisioned capacity</span>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-slate-900">Graph Neural Network Pipeline</h4>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">ACTIVE</span>
          </div>
          <p className="text-xs text-slate-500 mb-2">PyTorch Geometric inference container updating cash-out node probabilities every 30 seconds.</p>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '45%' }}></div>
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">GPU Load: 45% (Tesla T4 Cluster)</span>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-slate-900">Bank CFCFRMS API Outbound</h4>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">SYNCED</span>
          </div>
          <p className="text-xs text-slate-500 mb-2">Authenticated TLS 1.3 mTLS connection to 54 Member Banks & NBFC nodal endpoints.</p>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div className="bg-purple-600 h-2 rounded-full" style={{ width: '100%' }}></div>
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">54 / 54 Member Gateways Connected</span>
        </div>
      </div>

      {/* State-wise System Telemetry */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-x-auto">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-slate-900">
            State-by-State Telemetry Ingestion Matrix
          </h3>
          <span className="text-xs text-slate-500">Live Synchronization</span>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-200">
              {['State / UT', t.stats?.complaints || 'Complaints Ingested', 'Risk Index Score', 'Total Fraud Value', 'Model Confidence', 'Inference Status'].map(h => (
                <th key={h} className="px-4 py-3 text-[11px] font-extrabold text-slate-700 uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-xs">
            {Object.entries(stateRisk).map(([name, s]) => (
              <tr key={name} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 font-bold text-slate-900">{name}</td>
                <td className="px-4 py-3 text-slate-700 font-semibold">{s.complaints}</td>
                <td className="px-4 py-3 font-extrabold text-red-600">{s.riskScore}%</td>
                <td className="px-4 py-3 font-bold text-slate-800">{formatAmount(s.totalFraud)}</td>
                <td className="px-4 py-3 text-slate-700 font-medium">{s.avgConfidence}%</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    ● Streaming
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ===== MAIN DASHBOARD ROUTER =====
export default function DashboardPage() {
  const { role } = useAuth();
  const { liveComplaints } = useOutletContext();

  switch (role) {
    case 'police': return <PoliceView complaints={liveComplaints} />;
    case 'bank': return <BankView complaints={liveComplaints} />;
    case 'investigator': return <InvestigatorView complaints={liveComplaints} />;
    case 'admin': return <AdminView complaints={liveComplaints} />;
    default: return <I4CView complaints={liveComplaints} />;
  }
}
