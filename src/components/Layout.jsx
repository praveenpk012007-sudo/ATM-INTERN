import { useState, useCallback, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Toastify from 'toastify-js';
import { ALL_COMPLAINTS } from '../data/mockData';

export default function Layout() {
  const [notifications, setNotifications] = useState([
    { level: 'urgent', title: '🚨 High-Risk Hotspot: Andheri East, Mumbai', desc: 'Predicted cash-out withdrawal at SBI ATM — 92% confidence score', time: Date.now() - 30000 },
    { level: 'medium', title: '⚠️ Mule Cluster Detected', desc: 'Cluster of 4 mule accounts identified in Dwarka, Delhi', time: Date.now() - 120000 },
    { level: 'info', title: 'ℹ️ NCRP Sync Active', desc: 'All-India predictive hotspot telemetry refreshed with CFCFRMS stream', time: Date.now() - 300000 },
  ]);
  const [liveComplaints, setLiveComplaints] = useState(ALL_COMPLAINTS);

  // Simulated periodic alerts
  useEffect(() => {
    const interval = setInterval(() => {
      const c = ALL_COMPLAINTS[Math.floor(Math.random() * ALL_COMPLAINTS.length)];
      const level = c.confidence >= 85 ? 'urgent' : c.confidence >= 65 ? 'medium' : 'info';
      const icons = { urgent: '🚨', medium: '⚠️', info: 'ℹ️' };
      const newNotif = {
        level,
        title: `${icons[level]} ${level === 'urgent' ? 'PRIORITY HOTSPOT' : 'Alert'}: ${c.area || c.district}`,
        desc: `${c.category} — ₹${c.fraudAmount.toLocaleString('en-IN')} — ${c.confidence}% confidence`,
        time: Date.now(),
      };
      setNotifications(prev => [newNotif, ...prev].slice(0, 50));

      if (level === 'urgent') {
        Toastify({
          text: `🚨 ${newNotif.title}\n${newNotif.desc}`,
          duration: 4500, gravity: 'top', position: 'right',
          style: {
            background: '#b91c1c',
            color: '#ffffff',
            borderRadius: '6px', fontFamily: 'Inter,sans-serif', fontSize: '12px',
            fontWeight: '600',
            padding: '12px 18px', maxWidth: '380px', boxShadow: '0 8px 24px rgba(0,0,0,0.2)', whiteSpace: 'pre-line',
            borderLeft: '4px solid #f87171'
          },
        }).showToast();
      }
    }, 25000 + Math.random() * 15000);
    return () => clearInterval(interval);
  }, []);

  const handleClearNotifs = useCallback(() => setNotifications([]), []);

  const handleNewComplaint = useCallback((complaint, payloads) => {
    setLiveComplaints(prev => [complaint, ...prev]);
    setNotifications(prev => [{
      level: complaint.confidence >= 85 ? 'urgent' : 'medium',
      title: `🚨 NEW INCIDENT: ${complaint.category} — ${complaint.id}`,
      desc: `₹${complaint.fraudAmount.toLocaleString('en-IN')} — ${complaint.confidence}% — ${complaint.predictedLocations[0]?.name || complaint.area}`,
      time: Date.now(),
    }, ...prev]);
  }, []);

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-slate-800 flex flex-col font-sans">
      <Header notifications={notifications} onClearNotifs={handleClearNotifs} onNewComplaint={handleNewComplaint} />
      <div className="flex pt-[92px] flex-1">
        <Sidebar />
        <main className="flex-1 lg:ml-[260px] p-5 sm:p-7 min-h-[calc(100vh-92px)] bg-[#f1f5f9]">
          <Outlet context={{ liveComplaints, notifications, onNewComplaint: handleNewComplaint }} />
        </main>
      </div>
      <div className="lg:ml-[260px]">
        <Footer />
      </div>
    </div>
  );
}
