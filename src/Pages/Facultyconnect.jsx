import { useState, useEffect } from "react";

// ── Animated counter hook ────────────────────────────────────────────────────
function useCounter(target, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return val;
}

// ── SVG Dashboard Illustration ────────────────────────────────────────────────
function DashboardIllustration() {
  return (
    <svg viewBox="0 0 420 340" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0fdf4" />
          <stop offset="100%" stopColor="#dcfce7" />
        </linearGradient>
        <linearGradient id="card1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
        <linearGradient id="card2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f0fdf4" />
        </linearGradient>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#16a34a" floodOpacity="0.15" />
        </filter>
        <filter id="shadowSm">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000" floodOpacity="0.08" />
        </filter>
        <clipPath id="screenClip">
          <rect x="20" y="20" width="380" height="300" rx="16" />
        </clipPath>
      </defs>

      {/* Background */}
      <rect width="420" height="340" fill="url(#bg)" rx="20" />

      {/* Subtle grid pattern */}
      {Array.from({length:8},(_,i)=>i).map(i => (
        <line key={`h${i}`} x1="20" y1={30+i*38} x2="400" y2={30+i*38} stroke="#22c55e" strokeOpacity="0.06" strokeWidth="1"/>
      ))}
      {Array.from({length:11},(_,i)=>i).map(i => (
        <line key={`v${i}`} x1={20+i*38} y1="20" x2={20+i*38} y2="320" stroke="#22c55e" strokeOpacity="0.06" strokeWidth="1"/>
      ))}

      {/* ── Main dashboard card ── */}
      <rect x="18" y="18" width="248" height="192" rx="14" fill="white" filter="url(#shadow)" />
      {/* Header bar */}
      <rect x="18" y="18" width="248" height="38" rx="14" fill="url(#card1)" />
      <rect x="18" y="42" width="248" height="14" fill="#16a34a" />
      <circle cx="34" cy="37" r="5" fill="rgba(255,255,255,0.35)" />
      <circle cx="50" cy="37" r="5" fill="rgba(255,255,255,0.35)" />
      <circle cx="66" cy="37" r="5" fill="rgba(255,255,255,0.35)" />
      <text x="90" y="41" fill="white" fontSize="9" fontWeight="bold" fontFamily="system-ui">Faculty Dashboard</text>

      {/* Sidebar */}
      <rect x="18" y="56" width="52" height="154" fill="#f8fff9" />
      {["👥","📅","📊","📚","📢"].map((icon, i) => (
        <g key={i}>
          <rect x="22" y={62+i*28} width="44" height="22" rx="6"
            fill={i === 0 ? "#22c55e" : "transparent"} />
          <text x="44" y={77+i*28} textAnchor="middle" fontSize="11">{icon}</text>
        </g>
      ))}

      {/* Main content area */}
      {/* KPI row */}
      {[["248","#22c55e","Students"],["94%","#16a34a","Attendance"],["87%","#15803d","Pass Rate"]].map(([val, col, lbl], i) => (
        <g key={i}>
          <rect x={80+i*58} y="62" width="52" height="44" rx="8" fill="#f0fdf4" />
          <text x={106+i*58} y="81" textAnchor="middle" fontSize="12" fontWeight="bold" fill={col}>{val}</text>
          <text x={106+i*58} y="96" textAnchor="middle" fontSize="7" fill="#86efac">{lbl}</text>
        </g>
      ))}

      {/* Attendance chart */}
      <rect x="80" y="114" width="180" height="72" rx="8" fill="#f0fdf4" />
      <text x="88" y="127" fontSize="7" fontWeight="bold" fill="#15803d">Attendance Trend</text>
      {[38,52,44,60,48,56,50,64,58,70,55,66].map((h, i) => (
        <rect key={i} x={88+i*13} y={178-h} width="9" height={h} rx="3"
          fill={i===11?"#22c55e":"#86efac"} fillOpacity={0.7+i*0.025}/>
      ))}
      {["Jan","Apr","Jul","Oct"].map((m,i)=>(
        <text key={m} x={91+i*39} y="192" fontSize="6" fill="#86efac">{m}</text>
      ))}

      {/* ── Student list card ── */}
      <rect x="276" y="18" width="130" height="138" rx="14" fill="white" filter="url(#shadowSm)" />
      <rect x="276" y="18" width="130" height="32" rx="14" fill="#16a34a" />
      <rect x="276" y="36" width="130" height="14" fill="#16a34a" />
      <text x="284" y="38" fill="white" fontSize="8" fontWeight="bold">Students</text>
      <text x="382" y="38" fill="rgba(255,255,255,0.7)" fontSize="7" textAnchor="end">+Add</text>
      {[
        ["Priya D.","CSE-1","✓"],["Arun K.","CSE-2","✓"],["Meena R.","CSE-1","✗"],["Rajan M.","CSE-3","✓"]
      ].map(([name, sec, att], i) => (
        <g key={i}>
          <circle cx="288" cy={62+i*22} r="9" fill={att==="✓"?"#dcfce7":"#fef2f2"} />
          <text x="288" y={66+i*22} textAnchor="middle" fontSize="8">{name[0]}</text>
          <text x="302" y={63+i*22} fontSize="7.5" fontWeight="600" fill="#15803d">{name}</text>
          <text x="302" y={73+i*22} fontSize="6" fill="#86efac">{sec}</text>
          <circle cx="390" cy={62+i*22} r="6" fill={att==="✓"?"#22c55e":"#ef4444"} fillOpacity="0.85"/>
          <text x="390" y={66+i*22} textAnchor="middle" fontSize="8" fill="white">{att}</text>
        </g>
      ))}

      {/* ── Marks upload card ── */}
      <rect x="276" y="164" width="130" height="88" rx="14" fill="white" filter="url(#shadowSm)" />
      <text x="286" y="181" fontSize="8" fontWeight="bold" fill="#15803d">📊 Marks Entry</text>
      {[["Unit I",82],["Unit II",75],["Unit III",91]].map(([u,s],i)=>(
        <g key={i}>
          <text x="286" y={196+i*18} fontSize="7" fill="#4b6358">{u}</text>
          <rect x="320" y={188+i*18} width="70" height="7" rx="3.5" fill="#dcfce7" />
          <rect x="320" y={188+i*18} width={70*(s/100)} height="7" rx="3.5" fill="#22c55e" />
          <text x="396" y={196+i*18} fontSize="7" fill="#16a34a" fontWeight="bold">{s}</text>
        </g>
      ))}

      {/* ── Notice card ── */}
      <rect x="18" y="218" width="172" height="106" rx="14" fill="white" filter="url(#shadowSm)" />
      <rect x="18" y="218" width="172" height="30" rx="14" fill="#15803d" />
      <rect x="18" y="234" width="172" height="14" fill="#15803d" />
      <text x="28" y="237" fill="white" fontSize="8" fontWeight="bold">📢 Notices</text>
      {[
        ["II Internal – 08 Sep","2h ago"],
        ["Lab record deadline","1d ago"],
        ["TCS Placement Drive","3d ago"],
      ].map(([t, time], i) => (
        <g key={i}>
          <circle cx="29" cy={259+i*22} r="3.5" fill="#22c55e" />
          <text x="37" y={262+i*22} fontSize="7.5" fontWeight="600" fill="#1a2e23">{t}</text>
          <text x="37" y={272+i*22} fontSize="6" fill="#8aaa97">{time}</text>
        </g>
      ))}

      {/* ── Materials card ── */}
      <rect x="198" y="218" width="208" height="106" rx="14" fill="white" filter="url(#shadowSm)" />
      <rect x="198" y="218" width="208" height="30" rx="14" fill="#22c55e" />
      <rect x="198" y="234" width="208" height="14" fill="#22c55e" />
      <text x="208" y="237" fill="white" fontSize="8" fontWeight="bold">📚 Study Materials</text>
      {[
        ["📄","OS Unit I Notes.pdf","1.2 MB"],
        ["📊","AI Slides.pptx","3.4 MB"],
        ["📝","Assignment 2.docx","480 KB"],
        ["🎬","Demo Video.mp4","28 MB"],
      ].map(([icon, name, size], i) => (
        <g key={i}>
          <rect x="208" y={252+i*18} width="186" height="15" rx="4"
            fill={i%2===0?"#f0fdf4":"white"} />
          <text x="214" y={263+i*18} fontSize="9">{icon}</text>
          <text x="228" y={263+i*18} fontSize="7.5" fill="#1a2e23" fontWeight="500">{name}</text>
          <text x="384" y={263+i*18} fontSize="6.5" fill="#8aaa97" textAnchor="end">{size}</text>
        </g>
      ))}

      {/* ── Google login badge ── */}
      <rect x="140" y="256" width="56" height="22" rx="8" fill="white" filter="url(#shadowSm)" />
      <text x="146" y="271" fontSize="10">🔒</text>
      <text x="158" y="268" fontSize="6.5" fontWeight="bold" fill="#15803d">Gmail</text>
      <text x="158" y="276" fontSize="5.5" fill="#8aaa97">Secure</text>

      {/* Floating notification dot */}
      <circle cx="390" cy="30" r="14" fill="#22c55e" filter="url(#shadowSm)" />
      <text x="390" y="34" textAnchor="middle" fontSize="11">🔔</text>
      <circle cx="399" cy="22" r="6" fill="#ef4444" />
      <text x="399" y="26" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold">3</text>
    </svg>
  );
}

// ── Feature card data ────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: "👥",
    title: "Student Management",
    color: { from: "#22c55e", to: "#16a34a", light: "#f0fdf4", ring: "#bbf7d0" },
    points: [
      "Register students using their Gmail address",
      "Remove or deactivate students when required",
      "Centralized dashboard for all student records",
    ],
  },
  {
    icon: "🔒",
    title: "Secure Google Login",
    color: { from: "#1d4ed8", to: "#1e40af", light: "#eff6ff", ring: "#bfdbfe" },
    points: [
      "Students sign in only with a faculty-approved Gmail",
      "Blocks unauthorized email accounts automatically",
      "Audit log of every login attempt",
    ],
  },
  {
    icon: "📅",
    title: "Attendance Management",
    color: { from: "#0891b2", to: "#0e7490", light: "#ecfeff", ring: "#a5f3fc" },
    points: [
      "Mark daily attendance in one tap per student",
      "Edit past records with a reason trail",
      "Auto-flag students below 75% threshold",
    ],
  },
  {
    icon: "📊",
    title: "Marks & Performance",
    color: { from: "#9333ea", to: "#7e22ce", light: "#faf5ff", ring: "#e9d5ff" },
    points: [
      "Upload unit-wise internal marks instantly",
      "Visual performance trends per student",
      "Export result sheets as PDF or Excel",
    ],
  },
  {
    icon: "📚",
    title: "Study Materials",
    color: { from: "#d97706", to: "#b45309", light: "#fffbeb", ring: "#fde68a" },
    points: [
      "Share PDFs, slides, videos, and assignments",
      "Organise by subject, unit, or date",
      "Students download on any device, anytime",
    ],
  },
  {
    icon: "📢",
    title: "Notices & Announcements",
    color: { from: "#dc2626", to: "#b91c1c", light: "#fef2f2", ring: "#fecaca" },
    points: [
      "Publish department-wide or class-specific notices",
      "Instant push notification to all enrolled students",
      "Schedule notices for future dates",
    ],
  },
];

// ── Stat counter card ────────────────────────────────────────────────────────
function StatCard({ target, suffix, label }) {
  const val = useCounter(target);
  return (
    <div className="flex flex-col items-center px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
      <span className="text-2xl font-black text-white tracking-tight">
        {val}{suffix}
      </span>
      <span className="text-[11px] text-green-200 font-medium mt-0.5 text-center leading-tight">{label}</span>
    </div>
  );
}

// ── Feature card ─────────────────────────────────────────────────────────────
function FeatureCard({ feature, index }) {
  const [hovered, setHovered] = useState(false);
  const { icon, title, color, points } = feature;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative bg-white rounded-2xl border overflow-hidden cursor-default"
      style={{
        borderColor: hovered ? color.ring : "#e5e7eb",
        boxShadow: hovered
          ? `0 20px 40px -8px ${color.from}30, 0 0 0 1px ${color.ring}`
          : "0 2px 12px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
      }}
    >
      {/* Top accent bar */}
      <div className="h-1 w-full" style={{
        background: `linear-gradient(90deg, ${color.from}, ${color.to})`,
        opacity: hovered ? 1 : 0.4,
        transition: "opacity 0.25s"
      }} />

      <div className="p-5">
        {/* Icon */}
        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl mb-4 transition-transform duration-300"
          style={{
            background: `linear-gradient(135deg, ${color.from}18, ${color.to}30)`,
            border: `1.5px solid ${color.ring}`,
            transform: hovered ? "scale(1.1) rotate(-4deg)" : "scale(1) rotate(0deg)",
          }}>
          {icon}
        </div>

        <h3 className="text-[14px] font-black text-gray-800 mb-3 leading-tight">{title}</h3>

        <ul className="space-y-2">
          {points.map((pt, i) => (
            <li key={i} className="flex items-start gap-2 text-[12px] text-gray-500 leading-snug">
              <span className="w-4 h-4 rounded-full flex items-center justify-center mt-0.5 shrink-0"
                style={{ background: color.light, border: `1px solid ${color.ring}` }}>
                <svg viewBox="0 0 10 10" width="8" height="8">
                  <polyline points="2,5 4,7 8,3" fill="none" stroke={color.from} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              {pt}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function FacultyConnect() {
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <div className="min-h-screen w-full" style={{ background: "#f8fffe", fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ══ HERO SECTION ══════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #052e16 0%, #14532d 40%, #166534 70%, #15803d 100%)" }}
      >
        {/* Ambient blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(34,197,94,0.18) 0%, transparent 70%)", transform: "translate(-50%,-50%)" }} />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(21,128,61,0.25) 0%, transparent 70%)", transform: "translate(50%,50%)" }} />

        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 py-16 md:py-20">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* ── Left ── */}
            <div className="flex-1 text-center lg:text-left">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 border"
                style={{ background: "rgba(34,197,94,0.12)", borderColor: "rgba(134,239,172,0.3)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-300 text-[11px] font-semibold uppercase tracking-widest">Education ERP</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-black text-white leading-[1.05] tracking-tight mb-5">
                Faculty
                <span className="block" style={{ color: "#4ade80" }}>Connect</span>
              </h1>

              <p className="text-green-200 text-[15px] leading-relaxed max-w-md mx-auto lg:mx-0 mb-8">
                Faculty members manage students, monitor academics, record attendance, upload marks, share study materials,
                and publish announcements — from one centralized dashboard.
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3 mb-8 max-w-sm mx-auto lg:mx-0">
                <StatCard target={248} suffix="" label="Active Students" />
                <StatCard target={94}  suffix="%" label="Avg Attendance" />
                <StatCard target={6}   suffix="" label="Core Features" />
              </div>

              {/* CTA */}
              <button
                onMouseEnter={() => setBtnHovered(true)}
                onMouseLeave={() => setBtnHovered(false)}
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-2xl font-bold text-[14px] transition-all duration-200"
                style={{
                  background: btnHovered
                    ? "linear-gradient(135deg, #4ade80, #22c55e)"
                    : "linear-gradient(135deg, #22c55e, #16a34a)",
                  color: "#052e16",
                  boxShadow: btnHovered
                    ? "0 12px 32px rgba(34,197,94,0.45), 0 0 0 2px rgba(74,222,128,0.4)"
                    : "0 4px 16px rgba(34,197,94,0.3)",
                  transform: btnHovered ? "translateY(-1px)" : "translateY(0)",
                }}
              >
                Explore Faculty Portal
                <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor"
                  style={{ transform: btnHovered ? "translateX(3px)" : "translateX(0)", transition: "transform 0.2s" }}>
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"/>
                </svg>
              </button>

              {/* Trust line */}
              <p className="text-green-500 text-[11px] mt-4 font-medium">
                🔒 Secured with Google OAuth · Zero unauthorized access
              </p>
            </div>

            {/* ── Right: Illustration ── */}
            <div className="flex-1 w-full max-w-lg mx-auto lg:mx-0">
              <div className="relative">
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-3xl"
                  style={{ background: "radial-gradient(ellipse at center, rgba(34,197,94,0.2) 0%, transparent 70%)", transform: "scale(1.1)" }} />
                {/* Glass card around illustration */}
                <div className="relative rounded-3xl p-3 border"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    backdropFilter: "blur(12px)",
                    borderColor: "rgba(134,239,172,0.2)",
                    boxShadow: "0 24px 64px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)"
                  }}>
                  <DashboardIllustration />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-10">
            <path d="M0,40 C360,0 1080,0 1440,40 L1440,40 L0,40 Z" fill="#f8fffe" />
          </svg>
        </div>
      </section>

      {/* ══ FEATURES SECTION ══════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-16 md:py-20">

        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-block text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
            style={{ background: "#dcfce7", color: "#15803d" }}>
            Everything in one place
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
            Built for how faculty
            <span className="block" style={{ color: "#16a34a" }}>actually teach</span>
          </h2>
          <p className="text-gray-500 text-[14px] mt-3 max-w-xl mx-auto leading-relaxed">
            Every tool faculty needs — from the first day of semester to the final result — connected in a single, fast interface.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </section>

      {/* ══ HOW IT WORKS STRIP ════════════════════════════════════════════════ */}
      <section className="px-5 sm:px-8 py-14" style={{ background: "#f0fdf4" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black text-gray-800">How it works</h2>
            <p className="text-gray-500 text-[13px] mt-2">Three steps from setup to a fully running class.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step:"1", icon:"✉️", title:"Register students", body:"Enter each student's Gmail address. They'll only be able to sign in using that exact account." },
              { step:"2", icon:"📋", title:"Run your class", body:"Mark attendance, upload marks, share resources, and post notices — everything live in real time." },
              { step:"3", icon:"📊", title:"Track progress", body:"Dashboards show attendance trends, performance charts, and flagged students in a single view." },
            ].map(s => (
              <div key={s.step} className="relative bg-white rounded-2xl p-6 border"
                style={{ borderColor: "#bbf7d0", boxShadow: "0 2px 16px rgba(34,197,94,0.08)" }}>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm text-white mb-4"
                  style={{ background: "linear-gradient(135deg,#22c55e,#16a34a)" }}>
                  {s.step}
                </div>
                <span className="text-2xl mb-3 block">{s.icon}</span>
                <h3 className="text-[14px] font-black text-gray-800 mb-2">{s.title}</h3>
                <p className="text-[12px] text-gray-500 leading-relaxed">{s.body}</p>
                {s.step !== "3" && (
                  <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-8 h-8 rounded-full bg-white border flex items-center justify-center text-green-500 font-bold"
                      style={{ borderColor: "#bbf7d0" }}>›</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER ════════════════════════════════════════════════════════ */}
      <section className="px-5 sm:px-8 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="rounded-3xl p-10 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #052e16 0%, #14532d 50%, #15803d 100%)",
              boxShadow: "0 24px 64px rgba(34,197,94,0.25)"
            }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(74,222,128,0.12) 0%, transparent 60%)" }} />
            <span className="text-4xl mb-4 block">🎓</span>
            <h2 className="text-2xl font-black text-white mb-3">Start managing your class today</h2>
            <p className="text-green-300 text-[13px] mb-7 leading-relaxed">
              Connect your department, register students, and take control of academics — in minutes, not days.
            </p>
            <button className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-black text-[14px] transition-all duration-200 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #4ade80, #22c55e)",
                color: "#052e16",
                boxShadow: "0 8px 24px rgba(34,197,94,0.4)"
              }}>
              Open Faculty Portal
              <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Footer line */}
      <footer className="text-center pb-8">
        <p className="text-[11px] text-gray-400">
          © 2026 CampusConnect · Malankara Catholic College · All rights reserved
        </p>
      </footer>
    </div>
  );
}