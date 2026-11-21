import { useState } from 'react';
import RiskMap from '../components/RiskMap';
import { STATES, CRIME_CATEGORIES, RISK_PINCODES, getRiskClassification } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import Toastify from 'toastify-js';

function showToast(msg, bg = '#0b3874') {
  Toastify({
    text: msg,
    duration: 3000,
    gravity: 'bottom',
    position: 'center',
    style: {
      background: bg,
      color: '#ffffff',
      borderRadius: '6px',
      fontFamily: 'Inter, sans-serif',
      fontSize: '12px',
      fontWeight: '600',
      padding: '10px 18px',
      boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
    }
  }).showToast();
}

export default function HeatmapPage() {
  const { t } = useLanguage();
  const [stateFilter, setStateFilter] = useState('All');
  const [riskTier, setRiskTier] = useState('all'); // 'all' | 'critical' | 'high' | 'moderate'
  const [timeRange, setTimeRange] = useState('24h');
  const [crimeType, setCrimeType] = useState('All');
  const [searchPin, setSearchPin] = useState('');
  const [selectedHotspot, setSelectedHotspot] = useState(null);

  // Counts across risk tiers
  const criticalHotspots = RISK_PINCODES.filter(p => p.riskScore >= 80);
  const highHotspots = RISK_PINCODES.filter(p => p.riskScore >= 60 && p.riskScore < 80);
  const moderateHotspots = RISK_PINCODES.filter(p => p.riskScore < 60);

  // Filtered list for the matrix table
  const filteredHotspots = RISK_PINCODES.filter(p => {
    const matchesState = stateFilter === 'All' || p.state === stateFilter;
    const matchesTier = riskTier === 'all' || p.tier === riskTier;
    const matchesSearch = !searchPin ||
      p.pin.includes(searchPin) ||
      p.area.toLowerCase().includes(searchPin.toLowerCase()) ||
      p.state.toLowerCase().includes(searchPin.toLowerCase());
    return matchesState && matchesTier && matchesSearch;
  });

  return (
    <div className="animate-fade-in-up space-y-6">
      {/* Title Banner */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🗺️</span>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <span>National Geospatial Risk Heatmap & Hotspot Identification</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                AI-Driven Spatiotemporal Forecasting of Cybercrime Cash Withdrawal Nodes & ATM Clusters
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold bg-blue-50 text-[#0066cc] border border-blue-200 px-3 py-1 rounded-md flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#0066cc] animate-pulse"></span>
            NIC / Survey of India Spatial Grid
          </span>
        </div>
      </div>

      {/* Risk-Wise Identification KPI Strip (Red, Orange, Yellow) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 🔴 RED: High Risk Card */}
        <div
          onClick={() => setRiskTier(riskTier === 'critical' ? 'all' : 'critical')}
          className={`p-4 rounded-xl border transition-all cursor-pointer bg-gradient-to-br from-white to-red-50/40 shadow-xs hover:shadow-md ${
            riskTier === 'critical'
              ? 'border-red-500 ring-2 ring-red-500/30'
              : 'border-red-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-red-700 flex items-center gap-1.5">
              <span>🔴</span> High Risk (Critical)
            </span>
            <span className="text-[11px] font-extrabold bg-red-100 text-red-800 border border-red-200 px-2 py-0.5 rounded font-mono">
              Score ≥ 80%
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-red-600">{criticalHotspots.length}</span>
            <span className="text-xs text-slate-600 font-semibold">Priority Interdiction Hotspots</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
            Immediate action: Emergency debit freeze under BNSS/CrPC & rapid beat patrol dispatch to flagged ATMs.
          </p>
          <div className="mt-3 pt-2.5 border-t border-red-100 flex items-center justify-between text-[11px] text-red-700 font-bold">
            <span>Color Code: Red (#dc2626)</span>
            <span>{riskTier === 'critical' ? '✓ Filter Active' : 'Filter by Red →'}</span>
          </div>
        </div>

        {/* 🟠 ORANGE: Medium Risk Card */}
        <div
          onClick={() => setRiskTier(riskTier === 'high' ? 'all' : 'high')}
          className={`p-4 rounded-xl border transition-all cursor-pointer bg-gradient-to-br from-white to-orange-50/40 shadow-xs hover:shadow-md ${
            riskTier === 'high'
              ? 'border-orange-500 ring-2 ring-orange-500/30'
              : 'border-orange-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-700 flex items-center gap-1.5">
              <span>🟠</span> Medium Risk (Elevated)
            </span>
            <span className="text-[11px] font-extrabold bg-orange-100 text-orange-800 border border-orange-200 px-2 py-0.5 rounded font-mono">
              Score 60% – 79%
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-orange-600">{highHotspots.length}</span>
            <span className="text-xs text-slate-600 font-semibold">Active Surveillance Nodes</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
            Elevated monitoring: High-frequency ATM withdrawal velocity alerts & smart patrol unit check-ins.
          </p>
          <div className="mt-3 pt-2.5 border-t border-orange-100 flex items-center justify-between text-[11px] text-orange-700 font-bold">
            <span>Color Code: Orange (#ea580c)</span>
            <span>{riskTier === 'high' ? '✓ Filter Active' : 'Filter by Orange →'}</span>
          </div>
        </div>

        {/* 🟡 YELLOW: Moderate Risk Card */}
        <div
          onClick={() => setRiskTier(riskTier === 'moderate' ? 'all' : 'moderate')}
          className={`p-4 rounded-xl border transition-all cursor-pointer bg-gradient-to-br from-white to-yellow-50/40 shadow-xs hover:shadow-md ${
            riskTier === 'moderate'
              ? 'border-yellow-500 ring-2 ring-yellow-500/30'
              : 'border-yellow-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-yellow-800 flex items-center gap-1.5">
              <span>🟡</span> Moderate Risk (Watchlist)
            </span>
            <span className="text-[11px] font-extrabold bg-yellow-100 text-yellow-900 border border-yellow-200 px-2 py-0.5 rounded font-mono">
              Score &lt; 60%
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-yellow-600">{moderateHotspots.length}</span>
            <span className="text-xs text-slate-600 font-semibold">Preventive Lead Clusters</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
            Preventive watch: Baseline anomaly detection & multi-hop mule account KYC verification queues.
          </p>
          <div className="mt-3 pt-2.5 border-t border-yellow-100 flex items-center justify-between text-[11px] text-yellow-800 font-bold">
            <span>Color Code: Yellow (#ca8a04)</span>
            <span>{riskTier === 'moderate' ? '✓ Filter Active' : 'Filter by Yellow →'}</span>
          </div>
        </div>
      </div>

      {/* Global Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap gap-3 items-end">
        {/* Risk Tier Filter */}
        <div className="flex-1 min-w-[170px]">
          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
            Risk Identification Tier
          </label>
          <select
            value={riskTier}
            onChange={e => setRiskTier(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-800 text-xs font-semibold focus:border-[#0066cc] focus:outline-none"
          >
            <option value="all">All Risk Levels ({RISK_PINCODES.length} Nodes)</option>
            <option value="critical">🔴 High Risk (Red, ≥80%)</option>
            <option value="high">🟠 Medium Risk (Orange, 60-79%)</option>
            <option value="moderate">🟡 Moderate Risk (Yellow, &lt;60%)</option>
          </select>
        </div>

        {/* State / UT Jurisdiction */}
        <div className="flex-1 min-w-[150px]">
          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
            {t.filters?.state || "State / UT Jurisdiction"}
          </label>
          <select
            value={stateFilter}
            onChange={e => setStateFilter(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-800 text-xs focus:border-[#0066cc] focus:outline-none"
          >
            <option value="All">{t.filters?.allStates || "All States & UTs"}</option>
            {Object.keys(STATES).map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        {/* Observation Window */}
        <div className="flex-1 min-w-[130px]">
          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
            Observation Window
          </label>
          <select
            value={timeRange}
            onChange={e => setTimeRange(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-800 text-xs focus:border-[#0066cc] focus:outline-none"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="48h">Last 48 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>

        {/* Crime Category */}
        <div className="flex-1 min-w-[140px]">
          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
            Modus Operandi
          </label>
          <select
            value={crimeType}
            onChange={e => setCrimeType(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-800 text-xs focus:border-[#0066cc] focus:outline-none"
          >
            <option value="All">All Crime Categories</option>
            {CRIME_CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Reset */}
        <button
          onClick={() => {
            setStateFilter('All');
            setRiskTier('all');
            setCrimeType('All');
            setSearchPin('');
            showToast('✅ Reset heatmap filters to all-India risk baseline');
          }}
          className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-200 transition-colors border border-slate-300 cursor-pointer"
        >
          Reset Filters
        </button>
      </div>

      {/* Main Interactive Leaflet Map Component with Red, Orange, Yellow Heatmap */}
      <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
        <RiskMap
          filterState={stateFilter}
          riskTierFilter={riskTier}
          height={580}
          onHotspotSelect={(pin) => {
            setSelectedHotspot(pin);
            showToast(`📍 Selected Hotspot: ${pin.area} (PIN ${pin.pin}) — Risk: ${pin.riskScore}%`);
          }}
        />
      </div>

      {/* Risk-Wise Identification & Priority Hotspot Matrix */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <span>📋</span> Risk-Wise Identification & Priority Hotspot Matrix
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Showing {filteredHotspots.length} flagged postal PIN codes categorized by Red, Orange, Yellow severity
            </p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search PIN / Area / State..."
              value={searchPin}
              onChange={e => setSearchPin(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-[#0066cc] w-48 sm:w-60"
            />
          </div>
        </div>

        {/* Hotspots Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase text-[10.5px] tracking-wider">
                <th className="py-3 px-3">Risk Level</th>
                <th className="py-3 px-3">PIN Code & Area</th>
                <th className="py-3 px-3">State / UT</th>
                <th className="py-3 px-3">Withdrawal Probability</th>
                <th className="py-3 px-3">Flagged ATMs</th>
                <th className="py-3 px-3">Mule Accounts</th>
                <th className="py-3 px-3">Flagged Banks</th>
                <th className="py-3 px-3 text-right">Operational Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredHotspots.map(p => {
                const meta = getRiskClassification(p.riskScore);
                const isSelected = selectedHotspot?.pin === p.pin;

                return (
                  <tr
                    key={p.pin}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      isSelected ? 'bg-blue-50/50' : ''
                    }`}
                  >
                    {/* Risk Level Badge */}
                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold border ${meta.badgeClass}`}>
                        <span>{meta.dot}</span>
                        <span>{meta.shortLabel}</span>
                      </span>
                    </td>

                    {/* PIN & Area */}
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900 text-[12.5px] flex items-center gap-1.5">
                        <span className="font-mono text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
                          {p.pin}
                        </span>
                        <span>{p.area}</span>
                      </div>
                    </td>

                    {/* State */}
                    <td className="py-3 px-3 text-slate-600">
                      {p.state}
                    </td>

                    {/* Risk Score Progress */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${p.riskScore}%`, backgroundColor: meta.color }}
                          />
                        </div>
                        <span className="font-extrabold text-[12px]" style={{ color: meta.color }}>
                          {p.riskScore}%
                        </span>
                      </div>
                    </td>

                    {/* Flagged ATMs */}
                    <td className="py-3 px-3 font-semibold text-slate-800">
                      🏧 {p.atmCount || 12} Nodes
                    </td>

                    {/* Active Mules */}
                    <td className="py-3 px-3 font-bold text-slate-800">
                      👥 {p.activeMules || 8} Linked
                    </td>

                    {/* Banks */}
                    <td className="py-3 px-3">
                      <span className="text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {(p.flaggedBanks || ['SBI', 'HDFC']).join(', ')}
                      </span>
                    </td>

                    {/* Operational Action */}
                    <td className="py-3 px-3 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => showToast(`🚨 Smart Patrol Unit Dispatched to PIN ${p.pin} (${p.area})`, meta.color)}
                          className="px-2.5 py-1 text-[11px] font-bold rounded text-white shadow-2xs hover:opacity-90 transition-opacity cursor-pointer"
                          style={{ backgroundColor: meta.color }}
                        >
                          Dispatch Patrol
                        </button>
                        <button
                          onClick={() => showToast(`🏦 Multi-Bank Debit Freeze Lien Broadcasted for PIN ${p.pin}`, '#0b3874')}
                          className="px-2.5 py-1 text-[11px] font-bold rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition-colors cursor-pointer"
                        >
                          Freeze Lien
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredHotspots.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400 text-xs">
                    No hotspots match the specified risk and jurisdiction filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Explanatory Protocols */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <h4 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
            <span>🔴</span> Red Tier (≥80%) Protocol
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Indicates high-velocity complaint convergence with mule cash-out in progress. <strong>Mandatory 15-minute response:</strong> State Police Control Room broadcasts to local beat marshals; CFCFRMS sends automated API hold on beneficiary accounts.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <h4 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
            <span>🟠</span> Orange Tier (60-79%) Protocol
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Represents secondary layering hops and anticipated withdrawal corridors within 1-3 hours. Police Cyber Cells monitor CCTV feeds at flagged ATM kiosks; bank nodal officers queue KYC audits.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <h4 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
            <span>🟡</span> Yellow Tier (&lt;60%) Protocol
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Historical vulnerability and baseline syndication monitoring. Incorporates seasonal fraud patterns (phishing campaigns, loan apps) for preventive deterrence and citizen awareness drives.
          </p>
        </div>
      </div>
    </div>
  );
}

