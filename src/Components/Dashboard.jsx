import React, { useState } from 'react';

const busStops = ["Marthandam", "Kalikavelai", "Thuckalay", "Nagercoil"];

const notices = [
  { id: 1, icon: "📋", title: "Important: Internal Exam Schedule Released", date: "20 May 2024", desc: "All departments internal exam schedule is released. Check now.", dot: "bg-red-500" },
  { id: 2, icon: "🎉", title: "College Day Celebration", date: "18 May 2024", desc: "College Day will be celebrated on 5th June 2024.", dot: "bg-yellow-400" },
  { id: 3, icon: "🌿", title: "Holiday Notice", date: "17 May 2024", desc: "College will remain closed on 27th May 2024.", dot: "bg-green-500" },
  { id: 4, icon: "💼", title: "Placement Drive", date: "16 May 2024", desc: "Infosys placement drive on 30th May 2024. Register now.", dot: "bg-blue-500" },
];

const events = [
  { day: "25", month: "MAY", title: "Technical Symposium", sub: "Department of CSE", time: "10:00 AM" },
  { day: "30", month: "MAY", title: "Infosys Placement Drive", sub: "Final Year Students", time: "09:30 AM" },
  { day: "05", month: "JUN", title: "College Day Celebration", sub: "All Students", time: "09:00 AM" },
];

const cornerItems = [
  { label: "Profile",       icon: "👤", color: "bg-blue-100 text-blue-600" },
  { label: "Attendance",    icon: "✅", color: "bg-green-100 text-green-600" },
  { label: "Results",       icon: "📈", color: "bg-purple-100 text-purple-600" },
  { label: "Notes",         icon: "📖", color: "bg-yellow-100 text-yellow-700" },
  { label: "Time Table",    icon: "🗓️", color: "bg-red-100 text-red-600" },
  { label: "Assignments",   icon: "📄", color: "bg-indigo-100 text-indigo-600" },
  { label: "Fees",          icon: "₹",  color: "bg-teal-100 text-teal-700" },
  { label: "Notifications", icon: "🔔", color: "bg-orange-100 text-orange-600" },
];

const quickCards = [
  { icon: "🚌", title: "Track Your Bus",  sub: "Live Bus Tracking",      color: "bg-purple-50 text-purple-600" },
  { icon: "📊", title: "Check Results",   sub: "View Semester Results",  color: "bg-green-50 text-green-600" },
  { icon: "🗓️", title: "Time Table",      sub: "View Class Timetable",   color: "bg-orange-50 text-orange-600" },
];

const galleryItems = [
  { bg: "bg-blue-200",   label: "Campus", emoji: "🏫" },
  { bg: "bg-purple-200", label: "Lab",    emoji: "🔬" },
  { bg: "bg-green-200",  label: "Events", emoji: "🎊" },
  { bg: "bg-amber-200",  label: "Sports", emoji: "⚽" },
];

export default function Dashboard() {
  const [busRoute, setBusRoute] = useState("Marthandam → Kalikavelai");

  return (
    <main className="overflow-auto">
      <div className="p-4 md:p-5 space-y-4">

        {/* ── Row 1: Hero + Bus Tracking ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

          {/* Hero Banner */}
          <div className="md:col-span-8 rounded-2xl overflow-hidden relative h-48 md:h-52 flex items-end"
            style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #0f2340 40%, #162d4a 100%)" }}
          >
            <div className="absolute inset-0 flex">
              <div className="flex-1 p-5 md:p-6 flex flex-col justify-center z-10">
                <p className="text-blue-300 text-xs font-medium uppercase tracking-wider mb-1">Welcome to</p>
                <h1 className="text-white text-2xl md:text-3xl font-bold leading-tight mb-1">CampusConnect</h1>
                <p className="text-blue-200 text-sm mb-2">Your Smart College Companion</p>
                <p className="text-gray-300 text-xs mb-4 leading-relaxed max-w-xs hidden sm:block">
                  Track your bus, check results, view notices, download notes and much more...
                </p>
                <button className="bg-blue-500 hover:bg-blue-400 text-white text-xs font-medium px-5 py-2 rounded-full w-fit flex items-center gap-1.5 transition-colors">
                  Explore Now →
                </button>
              </div>
              {/* Building illustration — hidden on mobile */}
              <div className="hidden sm:flex w-52 md:w-64 relative items-end justify-end pr-4 z-10">
                <div className="w-44 md:w-52 h-36 md:h-40 rounded-t-lg opacity-60 relative"
                  style={{ background: "linear-gradient(to top, #475569, #64748b)" }}
                >
                  <div className="grid grid-cols-6 gap-1 p-2 pt-4">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div key={i} className={`h-3 rounded-sm ${i % 7 === 3 ? 'bg-yellow-300 opacity-70' : 'bg-slate-400 opacity-40'}`} />
                    ))}
                  </div>
                  <div className="absolute bottom-0 left-2 w-4 h-8 bg-green-700 rounded-full opacity-80" />
                  <div className="absolute bottom-0 left-8 w-3 h-6 bg-green-600 rounded-full opacity-80" />
                  <div className="absolute bottom-0 right-2 w-4 h-7 bg-green-700 rounded-full opacity-80" />
                </div>
              </div>
            </div>
          </div>

          {/* Bus Tracking Card */}
          <div className="md:col-span-4 bg-white rounded-2xl border border-gray-100 p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-gray-700 text-sm">Bus Tracking</p>
              <button className="text-blue-600 text-xs hover:underline">View All</button>
            </div>
            <select
              value={busRoute}
              onChange={(e) => setBusRoute(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:border-blue-400 bg-gray-50"
            >
              <option>Marthandam → Kalikavelai</option>
              <option>Kalikavelai → Marthandam</option>
              <option>Thuckalay → Kalikavelai</option>
            </select>
            <div className="space-y-2">
              {[
                { label: "Bus No",           value: "TN74 AB 4567",  extra: null },
                { label: "Current Location", value: "Marthandam",    extra: "pulse" },
                { label: "Arrival",          value: "15 Minutes",    extra: "green" },
                { label: "Driver",           value: "Rajesh",        extra: "call" },
              ].map((row) => (
                <React.Fragment key={row.label}>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">{row.label}</span>
                    <span className={`font-semibold flex items-center gap-1.5 ${row.extra === 'green' ? 'text-green-600' : 'text-gray-700'}`}>
                      {row.extra === 'pulse' && <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
                      {row.value}
                      {row.extra === 'call' && (
                        <button className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px]">📞</button>
                      )}
                    </span>
                  </div>
                  <div className="h-px bg-gray-100" />
                </React.Fragment>
              ))}
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-colors mt-auto">
              📍 Live Tracking
            </button>
          </div>
        </div>

        {/* ── Row 2: Quick Feature Cards ── */}
        <div className="grid grid-cols-3 gap-3">
          {quickCards.map((card) => (
            <div
              key={card.title}
              className="bg-white border border-gray-100 rounded-xl p-3 md:p-4 flex flex-col gap-2 hover:shadow-md hover:border-blue-100 transition-all cursor-pointer group"
            >
              <div className={`w-9 h-9 md:w-10 md:h-10 rounded-xl ${card.color} flex items-center justify-center text-lg md:text-xl`}>
                {card.icon}
              </div>
              <div>
                <p className="font-semibold text-gray-700 text-[12px] md:text-[13px] leading-tight">{card.title}</p>
                <p className="text-gray-400 text-[10px] md:text-[11px] hidden sm:block">{card.sub}</p>
              </div>
              <span className="text-gray-300 group-hover:text-blue-400 transition-colors mt-auto self-end text-xs">→</span>
            </div>
          ))}
        </div>

        {/* ── Row 3: Notice Board + Upcoming Events ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

          {/* Notice Board */}
          <div className="md:col-span-5 bg-white rounded-2xl border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold text-gray-700 text-sm">Notice Board</p>
              <button className="text-blue-600 text-xs hover:underline">View All</button>
            </div>
            <div className="space-y-3">
              {notices.map((n) => (
                <div key={n.id} className="flex items-start gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0 group cursor-pointer">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-sm shrink-0 group-hover:bg-blue-50 transition-colors">
                    {n.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-medium text-gray-700 leading-tight line-clamp-1">{n.title}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed line-clamp-1">{n.desc}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span className="text-[10px] text-gray-400 whitespace-nowrap">{n.date}</span>
                    <span className={`w-2 h-2 rounded-full ${n.dot}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="md:col-span-4 bg-white rounded-2xl border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold text-gray-700 text-sm">Upcoming Events</p>
              <button className="text-blue-600 text-xs hover:underline">View All</button>
            </div>
            <div className="space-y-3">
              {events.map((e) => (
                <div key={e.day + e.month} className="flex items-center gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className="w-12 bg-blue-50 rounded-xl p-1.5 flex flex-col items-center shrink-0">
                    <span className="text-blue-700 font-bold text-base leading-tight">{e.day}</span>
                    <span className="text-blue-400 text-[9px] font-medium">{e.month}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-semibold text-gray-700 leading-tight line-clamp-1">{e.title}</p>
                    <p className="text-[10px] text-gray-400">{e.sub}</p>
                  </div>
                  <span className="text-[10px] text-gray-400 shrink-0 hidden sm:block">{e.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Student Corner */}
          <div className="md:col-span-3 bg-white rounded-2xl border border-gray-100 p-4">
            <p className="font-semibold text-gray-700 text-sm mb-3">Student Corner</p>
            <div className="grid grid-cols-4 md:grid-cols-4 gap-2">
              {cornerItems.map((item) => (
                <button
                  key={item.label}
                  className="flex flex-col items-center gap-1 p-1.5 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                  <div className={`w-8 h-8 md:w-9 md:h-9 rounded-xl ${item.color} flex items-center justify-center text-sm group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <span className="text-[9px] text-gray-500 text-center leading-tight">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100">
              <p className="font-semibold text-gray-700 text-xs mb-2">Quick Contact</p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-[10px] text-gray-500">
                  <span>📞</span> 04651 12345
                </div>
                <div className="flex items-center gap-2 text-[10px] text-gray-500 break-all">
                  <span className="shrink-0">✉️</span> info@kalikavelaicollege.edu.in
                </div>
                <div className="flex items-center gap-2 text-[10px] text-gray-500">
                  <span className="shrink-0">📍</span> Kalikavelai, TN - 629153
                </div>
                <div className="flex items-center gap-2 mt-2">
                  {["🟦", "📸", "▶️", "🐦"].map((s, i) => (
                    <button key={i} className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-[10px] hover:bg-gray-200 transition-colors">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Row 4: Gallery + Attendance ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

          {/* Latest Gallery */}
          <div className="md:col-span-8 bg-white rounded-2xl border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold text-gray-700 text-sm">Latest Gallery</p>
              <button className="text-blue-600 text-xs hover:underline">View All</button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {galleryItems.map((img) => (
                <div
                  key={img.label}
                  className={`${img.bg} rounded-xl h-20 md:h-24 flex items-end p-1.5 cursor-pointer hover:opacity-90 transition-opacity overflow-hidden relative group`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-white/30 rounded-lg flex items-center justify-center text-sm">
                      {img.emoji}
                    </div>
                  </div>
                  <span className="text-[9px] font-medium text-gray-700 z-10 bg-white/60 px-1 rounded">
                    {img.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Attendance Summary */}
          <div className="md:col-span-4 bg-white rounded-2xl border border-gray-100 p-4">
            <p className="font-semibold text-gray-700 text-sm mb-3">Attendance Summary</p>
            <div className="flex items-center justify-center mb-3">
              <div className="relative w-20 h-20 md:w-24 md:h-24">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f3f4f6" strokeWidth="3.5" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#22c55e" strokeWidth="3.5"
                    strokeDasharray="75 25" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg md:text-xl font-bold text-gray-700">75%</span>
                  <span className="text-[9px] text-gray-400">Present</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { label: "Present", val: "45", color: "bg-green-500" },
                { label: "Absent",  val: "12", color: "bg-red-400" },
                { label: "Leave",   val: "3",  color: "bg-yellow-400" },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${row.color}`} />
                  <span className="text-[11px] text-gray-500 flex-1">{row.label}</span>
                  <span className="text-[11px] font-semibold text-gray-700">{row.val} days</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="text-center py-4 border-t border-gray-100 bg-white">
        <p className="text-[11px] text-gray-400">
          © 2026 CampusConnect. All Rights Reserved.
          <span className="mx-3 text-gray-200">|</span>
          <button className="hover:text-blue-500 transition-colors">Privacy Policy</button>
          <span className="mx-2 text-gray-200">|</span>
          <button className="hover:text-blue-500 transition-colors">Terms & Conditions</button>
        </p>
      </div>
    </main>
  );
}