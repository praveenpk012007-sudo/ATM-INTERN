export function EmblemOfIndia({ className = "w-11 h-14" }) {
  return (
    <svg viewBox="0 0 100 125" className={className} fill="currentColor">
      {/* Ashoka Lion Capital Vector Silhouette */}
      <g fill="#1e293b">
        {/* Central Lion Head & Mane */}
        <path d="M50 12 C44 12 40 16 39 21 C37 21 34 23 34 27 C34 30 36 32 37 34 C36 37 37 41 40 43 C41 47 44 50 50 51 C56 50 59 47 60 43 C63 41 64 37 63 34 C64 32 66 30 66 27 C66 23 63 21 61 21 C60 16 56 12 50 12 Z M47 22 C47 20 48 18 50 18 C52 18 53 20 53 22 C53 23 52 24 50 24 C48 24 47 23 47 22 Z M44 32 C44 30 46 29 48 29 C50 29 50 31 50 33 C49 34 46 34 44 32 Z M56 32 C54 34 51 34 50 33 C50 31 50 29 52 29 C54 29 56 30 56 32 Z M48 40 L52 40 L51 44 L49 44 Z" />
        {/* Left Lion */}
        <path d="M28 24 C23 24 19 28 19 33 C17 34 15 37 16 41 C17 44 19 46 21 47 C22 51 25 54 31 55 C33 53 35 49 35 46 C32 44 30 40 30 36 C29 34 29 30 30 27 C29 25 28 24 28 24 Z" />
        {/* Right Lion */}
        <path d="M72 24 C72 24 71 25 70 27 C71 30 71 34 70 36 C70 40 68 44 65 46 C65 49 67 53 69 55 C75 54 78 51 79 47 C81 46 83 44 84 41 C85 37 83 34 81 33 C81 28 77 24 72 24 Z" />
        {/* Abacus / Base Platform */}
        <rect x="20" y="58" width="60" height="7" rx="1.5" />
        <ellipse cx="50" cy="71" rx="9" ry="9" fill="none" stroke="#1e293b" strokeWidth="2" />
        <circle cx="50" cy="71" r="2.5" />
        {/* Spoke lines in Ashoka Chakra */}
        <line x1="50" y1="62" x2="50" y2="80" stroke="#1e293b" strokeWidth="1" />
        <line x1="41" y1="71" x2="59" y2="71" stroke="#1e293b" strokeWidth="1" />
        <line x1="43.6" y1="64.6" x2="56.4" y2="77.4" stroke="#1e293b" strokeWidth="0.8" />
        <line x1="56.4" y1="64.6" x2="43.6" y2="77.4" stroke="#1e293b" strokeWidth="0.8" />
        {/* Bull & Horse shapes on sides */}
        <path d="M26 68 Q28 66 31 68 L32 73 L26 73 Z" />
        <path d="M74 68 Q72 66 69 68 L68 73 L74 73 Z" />
        {/* Lower Base Steps */}
        <rect x="16" y="80" width="68" height="5" rx="1" />
        <rect x="12" y="87" width="76" height="4" rx="1" />
        {/* Satyameva Jayate (सत्यमेव जयते) */}
        <text x="50" y="103" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="'Noto Sans Devanagari', 'Inter', sans-serif" fill="#1e293b">सत्यमेव जयते</text>
      </g>
    </svg>
  );
}

// Circular multi-colored ring logo (segmented circle: blue, orange, green, red with network/cloud in center)
export function CircularI4CRingLogo({ className = "w-16 h-16" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      {/* Segment 1: Top-Right (Blue #0066cc) */}
      <path
        d="M 50 10 A 40 40 0 0 1 90 50"
        stroke="#0066cc"
        strokeWidth="9"
        strokeLinecap="round"
      />
      {/* Segment 2: Bottom-Right (Orange #f28c28) */}
      <path
        d="M 90 50 A 40 40 0 0 1 50 90"
        stroke="#f28c28"
        strokeWidth="9"
        strokeLinecap="round"
      />
      {/* Segment 3: Bottom-Left (Green #138808 / #10b981) */}
      <path
        d="M 50 90 A 40 40 0 0 1 10 50"
        stroke="#10b981"
        strokeWidth="9"
        strokeLinecap="round"
      />
      {/* Segment 4: Top-Left (Red #dc2626) */}
      <path
        d="M 10 50 A 40 40 0 0 1 50 10"
        stroke="#dc2626"
        strokeWidth="9"
        strokeLinecap="round"
      />
      {/* Center Circle & Digital Cloud/Nodes */}
      <circle cx="50" cy="50" r="28" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      {/* Network Cloud / Node Icon in Center */}
      <g transform="translate(34, 34) scale(0.65)">
        <path
          d="M10 24 A8 8 0 0 1 24 12 A12 12 0 0 1 44 16 A8 8 0 0 1 48 24 L10 24 Z"
          fill="#0066cc"
          opacity="0.9"
        />
        <circle cx="16" cy="34" r="3" fill="#f28c28" />
        <circle cx="28" cy="36" r="3.5" fill="#0066cc" />
        <circle cx="40" cy="33" r="3" fill="#10b981" />
        <line x1="20" y1="24" x2="16" y2="34" stroke="#0066cc" strokeWidth="1.5" />
        <line x1="28" y1="24" x2="28" y2="36" stroke="#0066cc" strokeWidth="1.5" />
        <line x1="36" y1="24" x2="40" y2="33" stroke="#0066cc" strokeWidth="1.5" />
        <line x1="16" y1="34" x2="28" y2="36" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="28" y1="36" x2="40" y2="33" stroke="#cbd5e1" strokeWidth="1" />
      </g>
    </svg>
  );
}

export function I4CLogo({ className = "" }) {
  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      {/* Authentic I4C Graphic Icon */}
      <svg viewBox="0 0 110 80" className="w-14 h-12 shrink-0" fill="none">
        {/* Outer stylized concentric arcs in blue, orange, green */}
        <path d="M 28 20 A 30 30 0 0 1 50 10" stroke="#0080ff" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M 22 28 A 38 38 0 0 1 50 4" stroke="#ff7700" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M 16 38 A 46 46 0 0 1 50 -2" stroke="#10b981" strokeWidth="4.5" strokeLinecap="round" />
        {/* Lower arcs */}
        <path d="M 28 50 A 30 30 0 0 0 50 60" stroke="#ff7700" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M 22 58 A 38 38 0 0 0 50 66" stroke="#10b981" strokeWidth="4.5" strokeLinecap="round" />
        {/* Intersecting Digital Nodes & Network Cloud */}
        <path d="M 52 26 C 48 26 44 29 44 33 C 41 33 39 35 39 38 C 39 41 41 43 44 43 L 64 43 C 67 43 70 40 70 37 C 70 34 68 31 65 31 C 65 28 62 26 59 26 C 58 26 57 26.5 56 27 C 55 26.3 53.5 26 52 26 Z" fill="#3b82f6" opacity="0.85" />
        {/* Signal Lines to the right */}
        <line x1="68" y1="34" x2="88" y2="34" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 4" />
        <circle cx="91" cy="34" r="3" fill="#0284c7" />
        <line x1="68" y1="40" x2="82" y2="40" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 3" />
        <circle cx="85" cy="40" r="2.5" fill="#0284c7" />
        {/* Bold "IC" lettering styling */}
        <text x="12" y="58" fontSize="40" fontWeight="900" fontFamily="sans-serif" fill="#0284c7">I</text>
        <text x="24" y="58" fontSize="40" fontWeight="900" fontFamily="sans-serif" fill="#0284c7">C</text>
      </svg>

      {/* Official Text & Motto with proper vertical alignment */}
      <div className="flex flex-col justify-center text-left select-none">
        <span className="text-[12px] font-black text-[#0066b2] leading-[1.18] tracking-tight uppercase">
          Indian<br/>
          Cyber<br/>
          Crime<br/>
          Coordination<br/>
          Centre
        </span>
        <span className="text-[8.5px] font-semibold text-[#0066b2]/85 italic tracking-wide mt-0.5">
          सहवीर्यं करवावहै • Working Together With Vigour
        </span>
      </div>
    </div>
  );
}

// Digital India & Azadi Ka Amrit Mahotsav Style Badge Strip (Clean Government SVG placeholders)
export function GovBadgeStrip({ className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Digital India Style Badge */}
      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded shadow-2xs">
        <svg viewBox="0 0 32 32" className="w-5 h-5 shrink-0" fill="none">
          <circle cx="16" cy="16" r="14" fill="#0b3d91" />
          <path d="M8 16 L14 10 L20 16 L14 22 Z" fill="#ff9933" />
          <path d="M14 16 L20 10 L26 16 L20 22 Z" fill="#138808" />
          <circle cx="16" cy="16" r="2.5" fill="#ffffff" />
        </svg>
        <div className="flex flex-col leading-tight">
          <span className="text-[9px] font-black text-[#0b3d91] tracking-wider uppercase">Digital India</span>
          <span className="text-[7.5px] font-bold text-slate-500">Power To Empower</span>
        </div>
      </div>

      {/* Azadi Ka Amrit Mahotsav Style Tricolor Ribbon Badge */}
      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-orange-50/70 via-white to-green-50/70 border border-slate-200 rounded shadow-2xs">
        <svg viewBox="0 0 28 28" className="w-5 h-5 shrink-0" fill="none">
          <circle cx="14" cy="14" r="12" stroke="#ff9933" strokeWidth="2" strokeDasharray="3 2" />
          <circle cx="14" cy="14" r="8" stroke="#138808" strokeWidth="2" />
          <circle cx="14" cy="14" r="4" fill="#0b3d91" />
        </svg>
        <div className="flex flex-col leading-tight">
          <span className="text-[9px] font-black text-[#ff9933] tracking-wider uppercase">75+ आजादी का</span>
          <span className="text-[8px] font-extrabold text-[#138808]">अमृत महोत्सव</span>
        </div>
      </div>
    </div>
  );
}

