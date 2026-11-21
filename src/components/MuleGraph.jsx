import { useEffect, useRef } from 'react';
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';
import { getMuleGraphForCase } from '../data/mockData';

export default function MuleGraph({ complaint }) {
  const containerRef = useRef(null);
  const networkRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !complaint) return;

    const graphData = getMuleGraphForCase(complaint);
    const nodes = new DataSet(graphData.nodes);
    const edges = new DataSet(graphData.edges);

    const options = {
      layout: { hierarchical: { direction: 'LR', sortMethod: 'directed', levelSeparation: 190, nodeSpacing: 90 } },
      physics: { enabled: false },
      interaction: { hover: true, tooltipDelay: 100 },
      nodes: {
        borderWidth: 2,
        shadow: { enabled: true, color: 'rgba(0,0,0,0.1)', size: 6 },
        font: { multi: 'md' },
      },
      edges: {
        smooth: { type: 'cubicBezier', forceDirection: 'horizontal' },
        shadow: { enabled: true, color: 'rgba(0,0,0,0.05)', size: 3 },
      },
    };

    networkRef.current = new Network(containerRef.current, { nodes, edges }, options);

    return () => { if (networkRef.current) networkRef.current.destroy(); };
  }, [complaint]);

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
      <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <div>
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <span>🔗</span> Inter-Bank Mule Account Fund Flow Analysis (CFCFRMS Layer Trace)
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Directed transaction graph tracing illicit proceeds from victim to predicted cash-out nodes
          </p>
        </div>
        <span className="text-[11px] font-bold bg-blue-50 text-[#0066cc] border border-blue-200 px-2 py-0.5 rounded">
          Graph Neural Network
        </span>
      </div>
      <div className="flex gap-4 px-5 py-2.5 bg-slate-50/50 border-b border-slate-200 text-xs text-slate-700">
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#0066cc]"></span> Victim Account</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#dc2626]"></span> Mule Hop Account</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#d97706]"></span> Predicted Cash-Out ATM</span>
        <span className="flex items-center gap-1.5 text-slate-500 ml-auto font-mono text-[11px]">--- Dashed: Machine Forecast</span>
      </div>
      <div ref={containerRef} style={{ height: 320, background: '#f8fafc' }} />
    </div>
  );
}
