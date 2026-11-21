import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import { STATES, RISK_PINCODES, ALL_COMPLAINTS, getStateRiskData, getRiskClassification } from '../data/mockData';

export default function RiskMap({
  center,
  zoom,
  filterState = 'All',
  riskTierFilter = 'all', // 'all' | 'critical' | 'high' | 'moderate'
  complaints,
  height = 520,
  showControls = true,
  onHotspotSelect
}) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const heatLayerRef = useRef(null);
  const historicalLayerRef = useRef(null);
  const markersLayerRef = useRef(null);

  const [activeLayer, setActiveLayer] = useState('realtime'); // 'realtime' | 'clusters'
  const [selectedRiskTier, setSelectedRiskTier] = useState(riskTierFilter);
  const [selectedPin, setSelectedPin] = useState(null);

  const data = complaints || ALL_COMPLAINTS;
  const stateRisk = getStateRiskData();

  // Keep internal risk filter synced with prop if provided
  useEffect(() => {
    if (riskTierFilter) {
      setSelectedRiskTier(riskTierFilter);
    }
  }, [riskTierFilter]);

  useEffect(() => {
    if (mapInstance.current) {
      mapInstance.current.remove();
      mapInstance.current = null;
    }
    if (!mapRef.current) return;

    // Initialize Map
    const map = L.map(mapRef.current, {
      zoomControl: true,
      scrollWheelZoom: true,
      attributionControl: true
    }).setView(center || [22.8, 81.5], zoom || 5);

    // Dark sleek geospatial basemap
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap | © CARTO | I4C MHA GIS',
      maxZoom: 18,
    }).addTo(map);

    const heatData = [];
    const markersGroup = L.layerGroup().addTo(map);
    markersLayerRef.current = markersGroup;

    // 1. STATE-LEVEL GEOSPATIAL RISK CIRCLES
    Object.entries(stateRisk).forEach(([name, s]) => {
      if (filterState && filterState !== 'All' && name !== filterState) return;
      if (selectedRiskTier !== 'all' && s.tier !== selectedRiskTier) return;

      const riskMeta = getRiskClassification(s.riskScore);

      const circle = L.circleMarker([s.lat, s.lng], {
        radius: Math.max(14, Math.min(28, s.riskScore / 3.8)),
        fillColor: riskMeta.color,
        color: '#ffffff',
        weight: 1.8,
        opacity: 0.9,
        fillOpacity: 0.72,
      }).addTo(markersGroup);

      circle.bindPopup(`
        <div style="min-width:220px; font-family:'Inter',sans-serif; padding:4px;">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px; border-bottom:1px solid #e2e8f0; padding-bottom:6px;">
            <h3 style="margin:0; font-size:14px; font-weight:800; color:#0f172a;">${name}</h3>
            <span style="background:${riskMeta.color}; color:#fff; font-size:10px; font-weight:800; padding:2px 7px; border-radius:4px;">
              ${riskMeta.dot} ${riskMeta.shortLabel}
            </span>
          </div>
          <div style="font-size:12px; line-height:1.6; color:#334155;">
            <div style="display:flex; justify-content:space-between; margin-bottom:3px;">
              <span>Predicted Risk Velocity:</span>
              <strong style="color:${riskMeta.color}; font-size:13px;">${s.riskScore}%</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:3px;">
              <span>Active NCRP Ingestions:</span>
              <strong>${s.complaints}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
              <span>Estimated Fraud Value:</span>
              <strong>₹${(s.totalFraud / 100000).toFixed(1)} Lakhs</strong>
            </div>
            <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:6px; border-radius:4px; font-size:10.5px; color:#64748b; margin-top:6px;">
              <strong>Action Protocol:</strong> ${riskMeta.description}
            </div>
          </div>
        </div>
      `);

      // Heat point distribution
      const density = Math.max(8, Math.round(s.complaints / 1.5));
      for (let i = 0; i < density; i++) {
        heatData.push([
          s.lat + (Math.random() - 0.5) * 2.2,
          s.lng + (Math.random() - 0.5) * 2.2,
          s.riskScore / 100
        ]);
      }
    });

    // 2. PINCODE / ATM CLUSTER HOTSPOT MARKERS (RED, ORANGE, YELLOW)
    RISK_PINCODES.forEach(p => {
      if (filterState && filterState !== 'All' && p.state !== filterState) return;
      if (selectedRiskTier !== 'all' && p.tier !== selectedRiskTier) return;

      const meta = getRiskClassification(p.riskScore);

      // Add high-intensity heat points centered on hot coordinates
      heatData.push([p.lat, p.lng, (p.riskScore / 100) * 1.5]);
      heatData.push([p.lat + 0.005, p.lng - 0.005, p.riskScore / 100]);
      heatData.push([p.lat - 0.005, p.lng + 0.005, p.riskScore / 100]);

      // Custom Risk Pin HTML with Red/Orange/Yellow identification
      const pinHtml = `
        <div style="
          background: ${meta.color};
          color: #ffffff;
          padding: 3px 8px;
          border-radius: 6px;
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 800;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 4px;
          box-shadow: 0 3px 10px rgba(0,0,0,0.5), 0 0 0 2px rgba(255,255,255,0.85);
          cursor: pointer;
          transform: translateY(-2px);
          transition: transform 0.2s;
        ">
          <span>${meta.dot}</span>
          <span>PIN ${p.pin}</span>
          <span style="background:rgba(0,0,0,0.25); padding:1px 4px; border-radius:3px; font-size:9px;">${p.riskScore}%</span>
        </div>
      `;

      const marker = L.marker([p.lat, p.lng], {
        icon: L.divIcon({
          className: '',
          html: pinHtml,
          iconSize: [98, 24],
          iconAnchor: [49, 24],
        }),
      }).addTo(markersGroup);

      marker.on('click', () => {
        setSelectedPin(p);
        if (onHotspotSelect) onHotspotSelect(p);
      });

      marker.bindPopup(`
        <div style="min-width:240px; font-family:'Inter',sans-serif; padding:4px;">
          <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:8px; margin-bottom:8px; border-bottom:1px solid #e2e8f0; padding-bottom:6px;">
            <div>
              <h4 style="margin:0; font-size:14px; font-weight:800; color:#0f172a;">${p.area}</h4>
              <div style="font-size:11px; color:#64748b; margin-top:1px;">📮 PIN: <strong>${p.pin}</strong> | ${p.state}</div>
            </div>
            <span style="background:${meta.color}; color:#fff; font-size:10px; font-weight:800; padding:2px 7px; border-radius:4px; white-space:nowrap;">
              ${meta.label}
            </span>
          </div>

          <div style="margin-bottom:10px;">
            <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:3px;">
              <span style="color:#64748b;">Withdrawal Risk Velocity:</span>
              <strong style="color:${meta.color};">${p.riskScore}% Probability</strong>
            </div>
            <div style="width:100%; height:6px; background:#e2e8f0; border-radius:3px; overflow:hidden;">
              <div style="width:${p.riskScore}%; height:100%; background:${meta.color};"></div>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; font-size:11px; margin-bottom:8px;">
            <div style="background:#f8fafc; padding:6px; border-radius:4px; border:1px solid #e2e8f0;">
              <span style="color:#64748b; display:block; font-size:9.5px; text-transform:uppercase;">Flagged ATMs</span>
              <strong style="font-size:13px; color:#0f172a;">🏧 ${p.atmCount || 12} Nodes</strong>
            </div>
            <div style="background:#f8fafc; padding:6px; border-radius:4px; border:1px solid #e2e8f0;">
              <span style="color:#64748b; display:block; font-size:9.5px; text-transform:uppercase;">Active Mules</span>
              <strong style="font-size:13px; color:#dc2626;">👥 ${p.activeMules || 8} Accts</strong>
            </div>
          </div>

          <div style="font-size:10.5px; color:#475569; background:#fff7ed; border:1px solid #fed7aa; padding:6px; border-radius:4px; margin-bottom:6px;">
            <strong>Flagged Banks:</strong> ${(p.flaggedBanks || ['SBI', 'HDFC', 'ICICI']).join(', ')}
          </div>

          <div style="font-size:10.5px; color:#334155; font-style:italic;">
            ⚡ <strong>SOP Protocol:</strong> ${meta.description}
          </div>
        </div>
      `);
    });

    // 3. STRICT RED, ORANGE, YELLOW HEATMAP LAYERS
    // Real-Time Risk Layer Gradient: Yellow (0.2) -> Orange (0.6) -> Red (0.85) -> Deep Crimson (1.0)
    const realtimeGradient = {
      0.15: 'rgba(250, 204, 21, 0.25)', // Yellow glow
      0.35: '#facc15',                  // Yellow
      0.60: '#f97316',                  // Orange
      0.82: '#ef4444',                  // Red
      1.00: '#991b1b',                  // Dark Crimson Red
    };

    heatLayerRef.current = L.heatLayer(heatData, {
      radius: 36,
      blur: 24,
      maxZoom: 12,
      max: 1.0,
      gradient: realtimeGradient,
    }).addTo(map);

    // Multi-Hop Cluster Gradient: Yellow -> Deep Orange -> Intense Red
    const clusterGradient = {
      0.20: '#fde047',
      0.50: '#ea580c',
      0.80: '#dc2626',
      1.00: '#7f1d1d'
    };

    const clusterData = heatData.map(p => [
      p[0] + 0.15 + (Math.random() - 0.5) * 0.3,
      p[1] + 0.15 + (Math.random() - 0.5) * 0.3,
      p[2] * 0.85
    ]);

    historicalLayerRef.current = L.heatLayer(clusterData, {
      radius: 40,
      blur: 28,
      maxZoom: 12,
      gradient: clusterGradient
    });

    mapInstance.current = map;
    setTimeout(() => map.invalidateSize(), 250);

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [filterState, selectedRiskTier]);

  const toggleLayer = (layer) => {
    setActiveLayer(layer);
    if (!mapInstance.current) return;
    if (layer === 'realtime') {
      if (historicalLayerRef.current) mapInstance.current.removeLayer(historicalLayerRef.current);
      if (heatLayerRef.current) heatLayerRef.current.addTo(mapInstance.current);
    } else {
      if (heatLayerRef.current) mapInstance.current.removeLayer(heatLayerRef.current);
      if (historicalLayerRef.current) historicalLayerRef.current.addTo(mapInstance.current);
    }
  };

  // Node counts by tier
  const criticalCount = RISK_PINCODES.filter(p => p.riskScore >= 80).length;
  const highCount = RISK_PINCODES.filter(p => p.riskScore >= 60 && p.riskScore < 80).length;
  const moderateCount = RISK_PINCODES.filter(p => p.riskScore < 60).length;

  return (
    <div className="bg-slate-900 border border-slate-700/60 rounded-xl overflow-hidden shadow-xl text-white">
      {/* Top Header & Interactive Filter Bar */}
      {showControls && (
        <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className="text-base">🗺️</span>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-white tracking-wide flex items-center gap-2">
                <span>National Risk Heatmap</span>
                <span className="text-[10px] bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded font-mono font-bold">
                  AI Hotspot Radar
                </span>
              </h3>
              <p className="text-[10.5px] text-slate-400">
                Risk-Wise Identification Engine: Red (≥80%), Orange (60-79%), Yellow (&lt;60%)
              </p>
            </div>
          </div>

          {/* Controls: Risk Tier Filter & Layer Mode */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Risk Tier Selection Buttons */}
            <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-800 text-[11px]">
              <button
                onClick={() => setSelectedRiskTier('all')}
                className={`px-2.5 py-1 rounded font-bold transition-all cursor-pointer ${
                  selectedRiskTier === 'all'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All ({RISK_PINCODES.length})
              </button>
              <button
                onClick={() => setSelectedRiskTier('critical')}
                className={`px-2.5 py-1 rounded font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  selectedRiskTier === 'critical'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-red-400 hover:bg-red-950/40'
                }`}
                title="Critical / High Risk Tier (Red ≥80%)"
              >
                <span>🔴</span>
                <span className="hidden sm:inline">High Risk</span> ({criticalCount})
              </button>
              <button
                onClick={() => setSelectedRiskTier('high')}
                className={`px-2.5 py-1 rounded font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  selectedRiskTier === 'high'
                    ? 'bg-orange-500 text-white shadow-xs'
                    : 'text-orange-400 hover:bg-orange-950/40'
                }`}
                title="Elevated / Medium Risk Tier (Orange 60-79%)"
              >
                <span>🟠</span>
                <span className="hidden sm:inline">Medium Risk</span> ({highCount})
              </button>
              <button
                onClick={() => setSelectedRiskTier('moderate')}
                className={`px-2.5 py-1 rounded font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  selectedRiskTier === 'moderate'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-yellow-400 hover:bg-yellow-950/40'
                }`}
                title="Moderate / Watchlist Risk Tier (Yellow <60%)"
              >
                <span>🟡</span>
                <span className="hidden sm:inline">Moderate</span> ({moderateCount})
              </button>
            </div>

            {/* Layer Mode Toggle */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-[11px]">
              <button
                onClick={() => toggleLayer('realtime')}
                className={`px-2.5 py-1 rounded font-bold transition-all cursor-pointer ${
                  activeLayer === 'realtime'
                    ? 'bg-slate-700 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🔥 Thermal Heatmap
              </button>
              <button
                onClick={() => toggleLayer('clusters')}
                className={`px-2.5 py-1 rounded font-bold transition-all cursor-pointer ${
                  activeLayer === 'clusters'
                    ? 'bg-slate-700 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🕸️ Multi-Hop Nodes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* The Leaflet Map Container */}
      <div ref={mapRef} style={{ height }} className="w-full relative z-0" />

      {/* Bottom Risk-Wise Color Identification Legend Strip */}
      <div className="px-4 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Risk Identification Legend:
          </span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
          {/* 🔴 RED: High Risk */}
          <div
            onClick={() => setSelectedRiskTier(selectedRiskTier === 'critical' ? 'all' : 'critical')}
            className={`flex items-center gap-2 px-2.5 py-1 rounded-md cursor-pointer transition-all border ${
              selectedRiskTier === 'critical'
                ? 'bg-red-950/80 border-red-500 text-white ring-2 ring-red-500/40'
                : 'bg-slate-900/80 border-red-900/40 text-slate-300 hover:border-red-600'
            }`}
          >
            <span className="w-3.5 h-3.5 rounded-full bg-red-600 shadow-xs flex items-center justify-center text-[8px] text-white">
              ●
            </span>
            <span className="text-xs font-bold text-red-400">
              🔴 High Risk (≥80%)
            </span>
            <span className="text-[10px] bg-red-900/60 text-red-200 px-1.5 py-0.2 rounded font-mono font-bold">
              {criticalCount} nodes
            </span>
            <span className="text-[10px] text-slate-400 hidden lg:inline">— Immediate Interdiction</span>
          </div>

          {/* 🟠 ORANGE: Medium Risk */}
          <div
            onClick={() => setSelectedRiskTier(selectedRiskTier === 'high' ? 'all' : 'high')}
            className={`flex items-center gap-2 px-2.5 py-1 rounded-md cursor-pointer transition-all border ${
              selectedRiskTier === 'high'
                ? 'bg-orange-950/80 border-orange-500 text-white ring-2 ring-orange-500/40'
                : 'bg-slate-900/80 border-orange-900/40 text-slate-300 hover:border-orange-600'
            }`}
          >
            <span className="w-3.5 h-3.5 rounded-full bg-orange-500 shadow-xs flex items-center justify-center text-[8px] text-white">
              ●
            </span>
            <span className="text-xs font-bold text-orange-400">
              🟠 Medium Risk (60-79%)
            </span>
            <span className="text-[10px] bg-orange-900/60 text-orange-200 px-1.5 py-0.2 rounded font-mono font-bold">
              {highCount} nodes
            </span>
            <span className="text-[10px] text-slate-400 hidden lg:inline">— Active Patrol Watch</span>
          </div>

          {/* 🟡 YELLOW: Moderate Risk */}
          <div
            onClick={() => setSelectedRiskTier(selectedRiskTier === 'moderate' ? 'all' : 'moderate')}
            className={`flex items-center gap-2 px-2.5 py-1 rounded-md cursor-pointer transition-all border ${
              selectedRiskTier === 'moderate'
                ? 'bg-yellow-950/80 border-yellow-500 text-white ring-2 ring-yellow-500/40'
                : 'bg-slate-900/80 border-yellow-900/40 text-slate-300 hover:border-yellow-600'
            }`}
          >
            <span className="w-3.5 h-3.5 rounded-full bg-yellow-500 shadow-xs flex items-center justify-center text-[8px] text-slate-950">
              ●
            </span>
            <span className="text-xs font-bold text-yellow-300">
              🟡 Moderate Risk (&lt;60%)
            </span>
            <span className="text-[10px] bg-yellow-900/60 text-yellow-200 px-1.5 py-0.2 rounded font-mono font-bold">
              {moderateCount} nodes
            </span>
            <span className="text-[10px] text-slate-400 hidden lg:inline">— Preventive Monitoring</span>
          </div>
        </div>
      </div>
    </div>
  );
}

