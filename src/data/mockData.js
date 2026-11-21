/* ============================================================
   CyberEye — Mock Data Engine
   ~200 synthetic complaints, mule graphs, hotspot scores
   ============================================================ */

// ===== REFERENCE DATA =====
export const STATES = {
  'Maharashtra':    { code:'MH', lat:19.076, lng:72.877, capital:'Mumbai', districts:['Mumbai','Pune','Nagpur','Thane','Nashik','Aurangabad'] },
  'Delhi':          { code:'DL', lat:28.613, lng:77.209, capital:'New Delhi', districts:['Central Delhi','South Delhi','North Delhi','East Delhi','West Delhi','Dwarka'] },
  'Jharkhand':      { code:'JH', lat:23.610, lng:85.279, capital:'Ranchi', districts:['Jamtara','Deoghar','Dhanbad','Ranchi','Giridih','Bokaro'] },
  'Haryana':        { code:'HR', lat:29.058, lng:76.085, capital:'Chandigarh', districts:['Nuh (Mewat)','Gurugram','Faridabad','Panipat','Sonipat'] },
  'Karnataka':      { code:'KA', lat:12.971, lng:77.594, capital:'Bengaluru', districts:['Bengaluru Urban','Mysuru','Mangaluru','Hubli-Dharwad','Belgaum'] },
  'Uttar Pradesh':  { code:'UP', lat:26.846, lng:80.946, capital:'Lucknow', districts:['Lucknow','Noida','Varanasi','Agra','Kanpur','Ghaziabad'] },
  'Rajasthan':      { code:'RJ', lat:26.912, lng:75.787, capital:'Jaipur', districts:['Jaipur','Jodhpur','Udaipur','Kota','Ajmer','Bikaner','Bharatpur'] },
  'Tamil Nadu':     { code:'TN', lat:13.082, lng:80.270, capital:'Chennai', districts:['Chennai','Coimbatore','Madurai','Salem','Tiruchirappalli'] },
  'West Bengal':    { code:'WB', lat:22.572, lng:88.363, capital:'Kolkata', districts:['Kolkata','Howrah','Siliguri','Durgapur','Asansol'] },
  'Gujarat':        { code:'GJ', lat:23.022, lng:72.571, capital:'Ahmedabad', districts:['Ahmedabad','Surat','Vadodara','Rajkot','Gandhinagar'] },
  'Telangana':      { code:'TS', lat:17.385, lng:78.486, capital:'Hyderabad', districts:['Hyderabad','Warangal','Nizamabad','Karimnagar','Khammam'] },
  'Kerala':         { code:'KL', lat:10.850, lng:76.271, capital:'Thiruvananthapuram', districts:['Kochi','Thiruvananthapuram','Kozhikode','Thrissur','Kannur'] },
};

export const CRIME_CATEGORIES = [
  'UPI Fraud','Loan App Scam','Investment Fraud','Sextortion',
  'Job Fraud','OTP Phishing','KYC Fraud','Credit Card Fraud'
];

export const BANKS = [
  'State Bank of India','HDFC Bank','ICICI Bank','Punjab National Bank',
  'Bank of Baroda','Axis Bank','Canara Bank','Union Bank of India'
];

export function getRiskClassification(score) {
  if (score >= 80) {
    return {
      tier: 'critical',
      label: 'High Risk (Critical)',
      shortLabel: 'High Risk (Red)',
      color: '#dc2626', // Red
      hexBg: 'rgba(220, 38, 38, 0.92)',
      badgeClass: 'bg-red-50 text-red-700 border-red-200',
      dot: '🔴',
      dotColor: '#dc2626',
      description: 'Immediate LEA Interdiction & Emergency Debit Freeze',
      minScore: 80,
      maxScore: 100
    };
  }
  if (score >= 60) {
    return {
      tier: 'high',
      label: 'Medium Risk (Elevated)',
      shortLabel: 'Medium Risk (Orange)',
      color: '#ea580c', // Orange
      hexBg: 'rgba(234, 88, 12, 0.92)',
      badgeClass: 'bg-orange-50 text-orange-700 border-orange-200',
      dot: '🟠',
      dotColor: '#ea580c',
      description: 'Active Surveillance & Smart Patrol Unit Dispatch',
      minScore: 60,
      maxScore: 79
    };
  }
  return {
    tier: 'moderate',
    label: 'Moderate Risk (Watchlist)',
    shortLabel: 'Moderate Risk (Yellow)',
    color: '#ca8a04', // Yellow / Amber
    hexBg: 'rgba(202, 138, 4, 0.92)',
    badgeClass: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    dot: '🟡',
    dotColor: '#ca8a04',
    description: 'Preventive Monitoring & ATM Cluster Lead Tracking',
    minScore: 0,
    maxScore: 59
  };
}

export const RISK_PINCODES = [
  // 🔴 HIGH RISK / CRITICAL (RED >= 80%)
  { pin:'815351', area:'Jamtara Central',  state:'Jharkhand',     lat:23.961, lng:86.802, riskScore:96, tier:'critical', atmCount:14, activeMules:18, flaggedBanks:['SBI','PNB','BOB'] },
  { pin:'122107', area:'Nuh Mewat Corridor', state:'Haryana',      lat:28.113, lng:77.012, riskScore:94, tier:'critical', atmCount:11, activeMules:15, flaggedBanks:['HDFC','Axis','Canara'] },
  { pin:'400058', area:'Andheri East',     state:'Maharashtra',   lat:19.119, lng:72.847, riskScore:92, tier:'critical', atmCount:28, activeMules:22, flaggedBanks:['ICICI','SBI','HDFC'] },
  { pin:'110075', area:'Dwarka Sector 12', state:'Delhi',         lat:28.592, lng:77.041, riskScore:90, tier:'critical', atmCount:19, activeMules:14, flaggedBanks:['Axis','SBI','PNB'] },
  { pin:'814112', area:'Deoghar Tower',    state:'Jharkhand',     lat:24.482, lng:86.697, riskScore:89, tier:'critical', atmCount:8,  activeMules:12, flaggedBanks:['SBI','Union Bank'] },
  { pin:'400001', area:'Fort Financial Hub', state:'Maharashtra', lat:18.934, lng:72.835, riskScore:88, tier:'critical', atmCount:35, activeMules:19, flaggedBanks:['SBI','BOB','ICICI'] },
  { pin:'110001', area:'Connaught Place',  state:'Delhi',         lat:28.632, lng:77.219, riskScore:87, tier:'critical', atmCount:42, activeMules:25, flaggedBanks:['HDFC','PNB','Axis'] },
  { pin:'226001', area:'Hazratganj',       state:'Uttar Pradesh', lat:26.856, lng:80.955, riskScore:85, tier:'critical', atmCount:16, activeMules:11, flaggedBanks:['Canara','SBI'] },
  { pin:'411001', area:'Shivajinagar',     state:'Maharashtra',   lat:18.530, lng:73.853, riskScore:83, tier:'critical', atmCount:21, activeMules:13, flaggedBanks:['HDFC','Axis'] },
  { pin:'560001', area:'MG Road Commercial', state:'Karnataka',   lat:12.975, lng:77.607, riskScore:82, tier:'critical', atmCount:29, activeMules:16, flaggedBanks:['SBI','ICICI'] },
  { pin:'226003', area:'Aminabad Bazaar',  state:'Uttar Pradesh', lat:26.845, lng:80.931, riskScore:80, tier:'critical', atmCount:12, activeMules:9,  flaggedBanks:['Union Bank','BOB'] },

  // 🟠 MEDIUM RISK / ELEVATED (ORANGE 60-79%)
  { pin:'560034', area:'Koramangala Tech Node', state:'Karnataka', lat:12.935, lng:77.624, riskScore:78, tier:'high', atmCount:24, activeMules:8, flaggedBanks:['HDFC','ICICI'] },
  { pin:'302001', area:'MI Road Central',  state:'Rajasthan',     lat:26.922, lng:75.778, riskScore:76, tier:'high', atmCount:18, activeMules:7, flaggedBanks:['SBI','PNB'] },
  { pin:'500001', area:'Abids Commercial', state:'Telangana',     lat:17.393, lng:78.475, riskScore:74, tier:'high', atmCount:22, activeMules:9, flaggedBanks:['Canara','SBI'] },
  { pin:'600001', area:'Parry\'s Corner',  state:'Tamil Nadu',    lat:13.093, lng:80.286, riskScore:72, tier:'high', atmCount:20, activeMules:6, flaggedBanks:['Indian Bank','SBI'] },
  { pin:'380001', area:'Lal Darwaja',      state:'Gujarat',       lat:23.024, lng:72.579, riskScore:68, tier:'high', atmCount:15, activeMules:7, flaggedBanks:['BOB','HDFC'] },
  { pin:'700001', area:'BBD Bagh Hub',     state:'West Bengal',   lat:22.574, lng:88.353, riskScore:65, tier:'high', atmCount:26, activeMules:8, flaggedBanks:['SBI','PNB'] },
  { pin:'440001', area:'Sitabuldi Nagpur', state:'Maharashtra',   lat:21.145, lng:79.088, riskScore:63, tier:'high', atmCount:14, activeMules:5, flaggedBanks:['BOB','Union Bank'] },
  { pin:'201301', area:'Noida Sector 18',  state:'Uttar Pradesh', lat:28.570, lng:77.321, riskScore:77, tier:'high', atmCount:31, activeMules:10, flaggedBanks:['Axis','HDFC'] },

  // 🟡 MODERATE RISK / WATCHLIST (YELLOW < 60%)
  { pin:'682001', area:'Fort Kochi Harbor', state:'Kerala',        lat:9.965,  lng:76.242, riskScore:55, tier:'moderate', atmCount:9,  activeMules:3, flaggedBanks:['Federal Bank','SBI'] },
  { pin:'695001', area:'Statue Junction',  state:'Kerala',        lat:8.498,  lng:76.949, riskScore:48, tier:'moderate', atmCount:11, activeMules:2, flaggedBanks:['Canara','SBI'] },
  { pin:'305001', area:'Ajmer Dargah Link', state:'Rajasthan',    lat:26.449, lng:74.639, riskScore:58, tier:'moderate', atmCount:10, activeMules:4, flaggedBanks:['PNB','BOB'] },
  { pin:'641001', area:'Gandhipuram',      state:'Tamil Nadu',    lat:11.016, lng:76.955, riskScore:52, tier:'moderate', atmCount:13, activeMules:3, flaggedBanks:['Indian Bank','SBI'] },
  { pin:'395003', area:'Varachha Road',    state:'Gujarat',       lat:21.205, lng:72.852, riskScore:56, tier:'moderate', atmCount:16, activeMules:4, flaggedBanks:['BOB','HDFC'] },
  { pin:'734001', area:'Siliguri Hill Cart', state:'West Bengal', lat:26.727, lng:88.431, riskScore:45, tier:'moderate', atmCount:8,  activeMules:2, flaggedBanks:['SBI','Union Bank'] },
];

const FIRST_NAMES = ['Rajesh','Priya','Amit','Sneha','Vikram','Ananya','Suresh','Deepa','Arun','Kavita','Mohan','Neha','Ravi','Pooja','Karan','Divya','Sanjay','Meera','Nitin','Swati','Arjun','Lakshmi','Ramesh','Geeta','Vijay','Rekha','Manoj','Sunita','Pankaj','Aarti','Rohit','Sapna','Ashok','Jyoti','Praveen','Nisha','Sunil','Reema','Gaurav','Pallavi'];
const LAST_NAMES = ['Kumar','Sharma','Singh','Patel','Reddy','Nair','Gupta','Joshi','Rao','Mehta','Verma','Iyer','Das','Pillai','Bhat','Chauhan','Yadav','Mishra','Saxena','Agarwal'];

const MULE_EXPLANATIONS = [
  'Linked to {n} mule accounts showing similar cash-out pattern in {area} cluster. All accounts opened within 30 days, same KYC agent.',
  'Beneficiary account received funds from {n} reported fraud cases in last 48h. Withdrawal attempts detected at nearby ATMs.',
  'Account holder flagged in {n} previous NCRP complaints. Withdrawal pattern matches known syndicate operating in {area}.',
  'ATM withdrawal velocity anomaly — {n} transactions across 3 ATMs in 45 minutes. Exceeds normal human travel capability.',
  'Geo-velocity impossible: account accessed from {area} and Delhi within 20 minutes. Device fingerprint matches fraud cluster.',
  'Same device IMEI linked to {n} ongoing fraud complaints across states. Cash-out predicted at branch with prior mule activity.',
  'Funds layered through {n} intermediary accounts (avg hold time: 8 min) before reaching predicted cash-out point in {area}.',
  'CFCFRMS flagged rapid fund movement: ₹{amount} split into {n} sub-transactions to avoid reporting threshold. Converging at {area} ATMs.',
];

// ===== COMPLAINT GENERATOR =====
let complaintCounter = 200;

function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function generateComplaint(index) {
  const stateKeys = Object.keys(STATES);
  const stateName = stateKeys[index % stateKeys.length];
  const state = STATES[stateName];
  const district = pick(state.districts);
  const pinData = RISK_PINCODES.filter(p => p.state === stateName);
  const pin = pinData.length > 0 ? pick(pinData) : pick(RISK_PINCODES);
  const category = pick(CRIME_CATEGORIES);
  const bank = pick(BANKS);
  const confidence = rand(35, 97);
  const fraudAmount = rand(8000, 4500000);
  const minutesAgo = rand(5, 720);
  const muleCount = rand(1, 6);
  const hrs = Math.floor(minutesAgo / 60);
  const mins = minutesAgo % 60;
  const statusOptions = ['New','Acknowledged','Under Investigation','Action Taken','Resolved'];
  const status = confidence > 85 ? pick(statusOptions.slice(0,2)) : pick(statusOptions);
  const caseNum = String(1000 + index).padStart(5, '0');

  const explain = pick(MULE_EXPLANATIONS)
    .replace('{n}', muleCount)
    .replace('{area}', pin.area)
    .replace('{amount}', fraudAmount.toLocaleString('en-IN'));

  const locCount = rand(1, 3);
  const predictedLocations = [];
  for (let j = 0; j < locCount; j++) {
    const lp = RISK_PINCODES[(index + j) % RISK_PINCODES.length];
    predictedLocations.push({
      name: `${lp.area} ATM, ${pick(BANKS)}`,
      lat: lp.lat + (Math.random() - 0.5) * 0.015,
      lng: lp.lng + (Math.random() - 0.5) * 0.015,
      confidence: Math.max(30, confidence - j * 14 - rand(0, 8)),
      pincode: lp.pin,
    });
  }

  return {
    id: `NCRP/2026/${state.code}/${caseNum}`,
    index,
    complainant: `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`,
    phone: `98${rand(10000000, 99999999)}`,
    state: stateName,
    stateCode: state.code,
    district,
    pincode: pin.pin,
    area: pin.area,
    lat: pin.lat + (Math.random() - 0.5) * 0.05,
    lng: pin.lng + (Math.random() - 0.5) * 0.05,
    category,
    fraudAmount,
    suspectAccount: `XXXX${rand(1000, 9999)}`,
    suspectBank: bank,
    confidence,
    status,
    predictedLocations,
    linkedMules: muleCount,
    explainability: explain,
    timeSince: hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`,
    minutesAgo,
    dateTime: new Date(Date.now() - minutesAgo * 60000).toLocaleString('en-IN'),
    timestamp: Date.now() - minutesAgo * 60000,
  };
}

// Generate 300 complaints
export const ALL_COMPLAINTS = Array.from({ length: 300 }, (_, i) => generateComplaint(i))
  .sort((a, b) => b.confidence - a.confidence);

// ===== NEW COMPLAINT SIMULATOR =====
export function simulateNewComplaint() {
  complaintCounter++;
  const c = generateComplaint(complaintCounter);
  c.confidence = rand(75, 97); // High confidence for dramatic demo
  c.status = 'New';
  c.minutesAgo = 0;
  c.timeSince = 'Just now';
  c.dateTime = new Date().toLocaleString('en-IN');
  c.timestamp = Date.now();
  c.id = `NCRP/2026/${c.stateCode}/${String(complaintCounter + 1000).padStart(5, '0')}`;
  return c;
}

// ===== AGGREGATE STATE RISK SCORES =====
export function getStateRiskData() {
  const stateData = {};
  Object.entries(STATES).forEach(([name, s]) => {
    const stateComplaints = ALL_COMPLAINTS.filter(c => c.state === name);
    const avgConf = stateComplaints.length > 0
      ? Math.round(stateComplaints.reduce((sum, c) => sum + c.confidence, 0) / stateComplaints.length)
      : rand(30, 50);
    const riskScore = Math.min(99, Math.round(avgConf * 0.6 + stateComplaints.length * 0.4));
    const classification = getRiskClassification(riskScore);

    stateData[name] = {
      ...s,
      name,
      complaints: stateComplaints.length,
      riskScore,
      avgConfidence: avgConf,
      totalFraud: stateComplaints.reduce((sum, c) => sum + c.fraudAmount, 0),
      color: classification.color,
      tier: classification.tier,
      tierLabel: classification.shortLabel,
      badgeClass: classification.badgeClass,
      dot: classification.dot,
    };
  });
  return stateData;
}

// ===== MULE ACCOUNT GRAPH DATA =====
export function getMuleGraphForCase(complaint) {
  const totalAmount = complaint.fraudAmount;
  const nodes = [];
  const edges = [];

  nodes.push({
    id: 'victim',
    label: `Victim\n${complaint.complainant.split(' ')[0]}\nXXXX${rand(1000, 9999)}`,
    color: '#0066cc',
    shape: 'dot',
    size: 20,
    font: { color: '#0f172a', size: 11, face: 'Inter', bold: true },
  });

  const muleCount = Math.min(complaint.linkedMules || 2, 4);
  let prevId = 'victim';

  for (let i = 0; i < muleCount; i++) {
    const muleId = `mule_${i + 1}`;
    const fraction = Math.max(0.3, 1 - (i * 0.15) - Math.random() * 0.1);
    nodes.push({
      id: muleId,
      label: `Mule Acct ${i + 1}\nXXXX${rand(1000, 9999)}\n${pick(BANKS).split(' ').slice(0, 2).join(' ')}`,
      color: '#dc2626',
      shape: 'dot',
      size: 17,
      font: { color: '#0f172a', size: 10, face: 'Inter' },
    });
    edges.push({
      from: prevId,
      to: muleId,
      label: `₹${Math.round(totalAmount * fraction).toLocaleString('en-IN')}`,
      color: { color: '#dc2626', highlight: '#991b1b' },
      font: { color: '#0f172a', size: 10, strokeWidth: 2, strokeColor: '#ffffff' },
      arrows: 'to',
      width: 2,
    });
    prevId = muleId;
  }

  // Predicted withdrawal endpoints
  complaint.predictedLocations.forEach((loc, i) => {
    const atmId = `atm_${i}`;
    nodes.push({
      id: atmId,
      label: `🏧 ${loc.name}\n(${loc.confidence}% conf)`,
      color: '#d97706',
      shape: 'diamond',
      size: 22,
      font: { color: '#0f172a', size: 10, face: 'Inter', bold: true },
      borderWidth: 3,
      borderWidthSelected: 5,
    });
    edges.push({
      from: prevId,
      to: atmId,
      label: 'Cash-out',
      color: { color: '#d97706', highlight: '#b45309' },
      font: { color: '#0f172a', size: 10, strokeWidth: 2, strokeColor: '#ffffff' },
      arrows: 'to',
      dashes: true,
      width: 2,
    });
  });

  return { nodes, edges };
}

// ===== TREND DATA (7 days) =====
export const TREND_DATA = [
  { day: 'Sep 15', complaints: 142, alerts: 88, resolved: 52 },
  { day: 'Sep 16', complaints: 138, alerts: 95, resolved: 61 },
  { day: 'Sep 17', complaints: 165, alerts: 110, resolved: 58 },
  { day: 'Sep 18', complaints: 148, alerts: 102, resolved: 72 },
  { day: 'Sep 19', complaints: 182, alerts: 128, resolved: 65 },
  { day: 'Sep 20', complaints: 158, alerts: 114, resolved: 78 },
  { day: 'Sep 21', complaints: 200, alerts: 135, resolved: 82 },
];

// ===== CATEGORY BREAKDOWN =====
export function getCategoryBreakdown() {
  const counts = {};
  ALL_COMPLAINTS.forEach(c => { counts[c.category] = (counts[c.category] || 0) + 1; });
  return Object.entries(counts).map(([name, value]) => ({ name, value }));
}

// ===== TOP RISK DISTRICTS =====
export function getTopRiskDistricts(limit = 10) {
  const districtMap = {};
  ALL_COMPLAINTS.forEach(c => {
    const key = `${c.district}, ${c.state}`;
    if (!districtMap[key]) districtMap[key] = { district: c.district, state: c.state, count: 0, totalFraud: 0, avgConf: 0 };
    districtMap[key].count++;
    districtMap[key].totalFraud += c.fraudAmount;
  });
  Object.values(districtMap).forEach(d => { d.avgConf = Math.round(d.totalFraud / d.count / 10000); });
  return Object.values(districtMap).sort((a, b) => b.count - a.count).slice(0, limit);
}

// ===== NOTIFICATION TEMPLATES =====
export function generateAlertPayloads(complaint) {
  return {
    sms: `[CyberEye ALERT] Case ${complaint.id}: ${complaint.category} — ₹${complaint.fraudAmount.toLocaleString('en-IN')} — Predicted withdrawal at ${complaint.predictedLocations[0]?.name || 'Unknown'}. Confidence: ${complaint.confidence}%. Action required.`,
    email: {
      subject: `[URGENT] CyberEye Alert — ${complaint.id} — ${complaint.confidence}% Confidence`,
      body: `Dear Officer,\n\nA high-confidence prediction has been generated for case ${complaint.id}.\n\nFraud Type: ${complaint.category}\nAmount: ₹${complaint.fraudAmount.toLocaleString('en-IN')}\nPredicted Withdrawal: ${complaint.predictedLocations.map(l => l.name).join(', ')}\nConfidence: ${complaint.confidence}%\n\nExplainability: ${complaint.explainability}\n\nPlease take immediate action.\n\n— CyberEye Predictive Analytics System`,
    },
    apiPayload: {
      alert_id: `ALERT-${Date.now()}`,
      case_ref: complaint.id,
      priority: complaint.confidence >= 85 ? 'CRITICAL' : complaint.confidence >= 65 ? 'HIGH' : 'MEDIUM',
      type: 'PREDICTED_WITHDRAWAL',
      confidence: complaint.confidence,
      predicted_locations: complaint.predictedLocations,
      fraud_amount: complaint.fraudAmount,
      suspect_account: complaint.suspectAccount,
      suspect_bank: complaint.suspectBank,
      timestamp: new Date().toISOString(),
    },
  };
}

// ===== AUDIT LOG GENERATOR =====
export function generateAuditLog(complaint) {
  const actions = [
    { user: 'System', role: 'system', action: 'Case created from NCRP complaint', timestamp: complaint.timestamp },
    { user: 'System', role: 'system', action: 'Predictive model executed — confidence: ' + complaint.confidence + '%', timestamp: complaint.timestamp + 30000 },
    { user: 'System', role: 'system', action: `Alert dispatched to ${complaint.state} police and ${complaint.suspectBank}`, timestamp: complaint.timestamp + 45000 },
  ];
  if (complaint.status !== 'New') {
    actions.push({ user: 'SI Rajan (Police)', role: 'police', action: 'Case viewed and acknowledged', timestamp: complaint.timestamp + 180000 });
  }
  if (['Under Investigation', 'Action Taken', 'Resolved'].includes(complaint.status)) {
    actions.push({ user: 'SI Rajan (Police)', role: 'police', action: 'Investigation initiated — field team dispatched', timestamp: complaint.timestamp + 600000 });
    actions.push({ user: `${complaint.suspectBank} Fraud Desk`, role: 'bank', action: 'Account freeze request received and acknowledged', timestamp: complaint.timestamp + 720000 });
  }
  if (['Action Taken', 'Resolved'].includes(complaint.status)) {
    actions.push({ user: `${complaint.suspectBank} Fraud Desk`, role: 'bank', action: 'Account frozen — hold placed on ₹' + complaint.fraudAmount.toLocaleString('en-IN'), timestamp: complaint.timestamp + 900000 });
    actions.push({ user: 'SI Rajan (Police)', role: 'police', action: 'Suspect apprehended at ' + (complaint.predictedLocations[0]?.name || 'predicted location'), timestamp: complaint.timestamp + 1800000 });
  }
  if (complaint.status === 'Resolved') {
    actions.push({ user: 'DSP Mehra (I4C)', role: 'i4c', action: 'Case reviewed and closed — funds recovery initiated', timestamp: complaint.timestamp + 3600000 });
  }
  return actions.sort((a, b) => a.timestamp - b.timestamp);
}

// ===== FORMAT HELPERS =====
export function formatAmount(n) { return '₹' + n.toLocaleString('en-IN'); }
export function confidenceLevel(c) { return c >= 80 ? 'high' : c >= 60 ? 'medium' : 'low'; }
export function urgencyLabel(c) { return c >= 85 ? 'CRITICAL' : c >= 70 ? 'HIGH' : c >= 55 ? 'MEDIUM' : 'LOW'; }
