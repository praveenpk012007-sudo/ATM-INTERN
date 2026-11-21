import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TREND_DATA, getCategoryBreakdown, getTopRiskDistricts, getStateRiskData, formatAmount } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

const COLORS = ['#dc2626', '#d97706', '#ca8a04', '#16a34a', '#0066cc', '#7c3aed', '#0891b2', '#ea580c'];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 shadow-lg text-xs">
      <p className="font-bold text-slate-800 mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-[11px] font-semibold" style={{ color: p.color }}>
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

export default function AnalyticsPage() {
  const { t } = useLanguage();
  const categoryData = getCategoryBreakdown();
  const topDistricts = getTopRiskDistricts(10);
  const stateRisk = getStateRiskData();
  const stateData = Object.entries(stateRisk).map(([name, s]) => ({
    name: name.substring(0, 10),
    risk: s.riskScore,
    complaints: s.complaints,
    fraud: Math.round(s.totalFraud / 100000)
  }));

  const recoveryData = [
    { month: 'Mar', before: 12, after: 12 },
    { month: 'Apr', before: 14, after: 18 },
    { month: 'May', before: 11, after: 22 },
    { month: 'Jun', before: 15, after: 28 },
    { month: 'Jul', before: 13, after: 35 },
    { month: 'Aug', before: 16, after: 42 },
    { month: 'Sep', before: 14, after: 48 },
  ];

  return (
    <div className="animate-fade-in-up space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>📈</span> {t.analytics?.title || "National Cybercrime Statistical Analytics & Forecast Bureau"}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.analytics?.subtitle || "Ministry of Home Affairs / I4C — Empirical incident distributions, recovery curve & predictive evaluation"}
          </p>
        </div>
        <span className="text-xs font-bold bg-blue-50 text-[#0066cc] border border-blue-200 px-2.5 py-1 rounded">
          {t.analytics?.centralDataLake || "NCRP Central Data Lake"}
        </span>
      </div>

      {/* Row 1: Area Trends & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs">
          <h3 className="text-sm font-extrabold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
            <span>📈</span> {t.analytics?.temporalVelocity || "National Ingestion & Resolution Velocity (Last 7 Days)"}
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={TREND_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, color: '#475569' }} />
              <Area type="monotone" dataKey="complaints" stroke="#0066cc" fill="#0066cc15" strokeWidth={2} name="Reported Complaints" />
              <Area type="monotone" dataKey="alerts" stroke="#d97706" fill="#d9770615" strokeWidth={2} name="AI Cash-Out Alerts" />
              <Area type="monotone" dataKey="resolved" stroke="#16a34a" fill="#16a34a15" strokeWidth={2} name="Enforced Interventions" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs">
          <h3 className="text-sm font-extrabold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
            <span>🍩</span> {t.analytics?.categoryBreakdown || "Modus Operandi & Category Classification"}
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={95}
                innerRadius={50}
                label={({ name, percent }) => `${name.substring(0, 10)} ${(percent * 100).toFixed(0)}%`}
                labelLine={{ stroke: '#94a3b8' }}
              >
                {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 2: State Risk Bar Chart & Recovery Velocity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs">
          <h3 className="text-sm font-extrabold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
            <span>🏛️</span> {t.analytics?.stateRiskMatrix || "State Risk Severity Index Comparison"}
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={stateData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 10 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="risk" fill="#dc2626" name="Risk Index (%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="complaints" fill="#0066cc" name="Active Incidents" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs">
          <h3 className="text-sm font-extrabold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
            <span>🚀</span> {t.analytics?.recoveryCurve || "Early Debit Freeze Recovery Trajectory (% Funds Preserved)"}
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={recoveryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} unit="%" />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="before" stroke="#94a3b8" strokeWidth={2} strokeDasharray="4 4" name={t.analytics?.preAIBaseline || "Pre-AI Baseline Recovery (%)"} />
              <Line type="monotone" dataKey="after" stroke="#16a34a" strokeWidth={3} name={t.analytics?.postAICyberEye || "Predictive CyberEye Recovery (%)"} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 3: Top Risk Districts Table */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs">
        <h3 className="text-sm font-extrabold text-slate-900 mb-3 pb-2 border-b border-slate-100 flex items-center gap-2">
          <span>🎯</span> {t.analytics?.topDistricts || "Top 10 High-Risk Withdrawal Clusters & Districts"}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold text-slate-600 uppercase tracking-wide">
                <th className="px-3.5 py-2.5">#</th>
                <th className="px-3.5 py-2.5">District</th>
                <th className="px-3.5 py-2.5">State</th>
                <th className="px-3.5 py-2.5">Incidents</th>
                <th className="px-3.5 py-2.5">Fraud Value</th>
                <th className="px-3.5 py-2.5">Risk Score</th>
                <th className="px-3.5 py-2.5">Intervention Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {topDistricts.map((d, i) => (
                <tr key={d.district} className="hover:bg-slate-50 transition-colors">
                  <td className="px-3.5 py-2.5 font-bold text-slate-400">{i + 1}</td>
                  <td className="px-3.5 py-2.5 font-bold text-slate-900">{d.district}</td>
                  <td className="px-3.5 py-2.5 text-slate-600">{d.state}</td>
                  <td className="px-3.5 py-2.5 font-semibold text-slate-800">{d.count}</td>
                  <td className="px-3.5 py-2.5 font-bold text-slate-900">{formatAmount(d.totalFraud)}</td>
                  <td className="px-3.5 py-2.5 font-extrabold text-red-600">{d.avgConfidence}%</td>
                  <td className="px-3.5 py-2.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${d.avgConfidence >= 80 ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}`}>
                      {d.avgConfidence >= 80 ? 'Tier 1 Priority' : 'Tier 2 Watch'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
