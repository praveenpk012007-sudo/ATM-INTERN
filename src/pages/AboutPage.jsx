import { useLanguage } from '../context/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="animate-fade-in-up max-w-5xl mx-auto space-y-6">
      {/* Top Header Card */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>ℹ️</span> {t.about?.title || "CyberEye Platform Charter & Algorithmic Methodology"}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.about?.subtitle || "Ministry of Home Affairs | Indian Cyber Crime Coordination Centre (I4C) — Central Telemetry & Interdiction Architecture"}
          </p>
        </div>
        <span className="text-xs font-bold bg-blue-50 text-[#0066cc] border border-blue-200 px-3 py-1 rounded">
          {t.about?.specification || "MHA / I4C Approved Operational Standard"}
        </span>
      </div>

      {/* Dual-Layer Prediction Architecture */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs">
        <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
          <span>🧠</span> {t.about?.dualLayerTitle || "Dual-Layer Hybrid Predictive Framework"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-blue-50/50 rounded-lg p-5 border border-blue-200">
            <h4 className="text-sm font-bold text-[#0066cc] mb-2 flex items-center gap-1.5">
              <span>🌐</span> {t.about?.layer1Title || "Layer 1: Aggregate Hotspot Geolocation Model"}
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed mb-3">
              {t.about?.layer1Desc || "Ingests longitudinal NCRP complaint records, spatiotemporal density, historical time-of-day cash-out habits, and ATM cluster density to forecast high-risk extraction pockets."}
            </p>
            <ul className="text-xs text-slate-600 space-y-1.5">
              <li className="flex items-start gap-2"><span className="text-[#0066cc] font-bold">✓</span> Recency-weighted spatial crime cluster calculations</li>
              <li className="flex items-start gap-2"><span className="text-[#0066cc] font-bold">✓</span> Time-of-day & bank settlement window modeling</li>
              <li className="flex items-start gap-2"><span className="text-[#0066cc] font-bold">✓</span> Modus operandi grouping (UPI Phishing, Job scams, etc.)</li>
              <li className="flex items-start gap-2"><span className="text-[#0066cc] font-bold">✓</span> ATM cash vault density as opportunity index</li>
            </ul>
          </div>

          <div className="bg-amber-50/50 rounded-lg p-5 border border-amber-200">
            <h4 className="text-sm font-bold text-amber-800 mb-2 flex items-center gap-1.5">
              <span>🕸️</span> {t.about?.layer2Title || "Layer 2: Case-Specific Graph Neural Propagation"}
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed mb-3">
              {t.about?.layer2Desc || "Traces transaction flows across intermediary mule accounts (L1, L2, L3) via CFCFRMS banking telemetry, predicting the ultimate cash-out node before withdrawal happens."}
            </p>
            <ul className="text-xs text-slate-600 space-y-1.5">
              <li className="flex items-start gap-2"><span className="text-amber-700 font-bold">✓</span> Directed acyclic graph tracing from victim to mules</li>
              <li className="flex items-start gap-2"><span className="text-amber-700 font-bold">✓</span> Mule syndicate behavioral pattern matching</li>
              <li className="flex items-start gap-2"><span className="text-amber-700 font-bold">✓</span> Geo-velocity impossibility detection (impossible travel speed)</li>
              <li className="flex items-start gap-2"><span className="text-amber-700 font-bold">✓</span> Real-time confidence calibration upon multi-hop convergence</li>
            </ul>
          </div>
        </div>

        <div className="mt-5 p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 leading-relaxed">
          <strong className="text-slate-900">{t.about?.convergenceTitle || "Convergence & Tiered Alert Trigger"}:</strong> {t.about?.convergenceDesc || "Both layers execute in parallel. When aggregate geographical risk intersects with a directed money flow route pointing to a specific postal pincode, confidence scores exceed 80%, instantly generating high-priority CAD alerts for local Police Patrol and Bank Nodal Officers."}
        </div>
      </div>

      {/* Statutory Legal Framework */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs">
        <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
          <span>⚖️</span> {t.about?.legalFrameworkTitle || "Statutory Legal & Compliance Framework"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-1">BNSS / CrPC Procedural Authority</h4>
            <p className="text-slate-600 leading-relaxed">
              CyberEye functions as a predictive decision-support system. Procedural seizure, account freezing, and arrest powers reside solely with authorized LEA officers under the Bharatiya Nagarik Suraksha Sanhita (BNSS) and CrPC.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-1">Information Technology Act, 2000</h4>
            <p className="text-slate-600 leading-relaxed">
              Full evidentiary chain of custody maintained in strict compliance with Section 65B of the Indian Evidence Act. All audit logs are cryptographically timestamped and immutable.
            </p>
          </div>
        </div>
      </div>

      {/* Architecture & Tech Stack */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs">
        <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
          <span>💻</span> Technology Stack & Standards
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <div className="text-slate-500 font-semibold text-[10px] uppercase">Frontend Framework</div>
            <div className="font-bold text-slate-900 mt-1">React 19 + Vite</div>
          </div>
          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <div className="text-slate-500 font-semibold text-[10px] uppercase">Geospatial GIS</div>
            <div className="font-bold text-slate-900 mt-1">Leaflet + Heat Engine</div>
          </div>
          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <div className="text-slate-500 font-semibold text-[10px] uppercase">Graph Visualization</div>
            <div className="font-bold text-slate-900 mt-1">vis-network Engine</div>
          </div>
          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <div className="text-slate-500 font-semibold text-[10px] uppercase">Design Standard</div>
            <div className="font-bold text-slate-900 mt-1">NIC Government Theme</div>
          </div>
        </div>
      </div>
    </div>
  );
}
