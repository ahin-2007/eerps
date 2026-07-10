import React from "react";

const kpiCards = [
  { label: "Total Students", value: "342", icon: "👥", color: "bg-emerald-50 text-emerald-700 border-emerald-100" },
  { label: "Total Faculty", value: "18", icon: "👨‍🏫", color: "bg-green-50 text-green-700 border-green-100" },
  { label: "1st Year Students", value: "98", icon: "🎓", color: "bg-teal-50 text-teal-700 border-teal-100" },
  { label: "2nd Year Students", value: "92", icon: "📘", color: "bg-cyan-50 text-cyan-700 border-cyan-100" },
  { label: "3rd Year Students", value: "84", icon: "📗", color: "bg-lime-50 text-lime-700 border-lime-100" },
  { label: "4th Year Students", value: "68", icon: "📕", color: "bg-amber-50 text-amber-700 border-amber-100" },
  { label: "Attendance %", value: "84.7%", icon: "📊", color: "bg-blue-50 text-blue-700 border-blue-100" },
  { label: "Pass %", value: "91.2%", icon: "✅", color: "bg-violet-50 text-violet-700 border-violet-100" },
  { label: "Pending Requests", value: "5", icon: "📋", color: "bg-orange-50 text-orange-700 border-orange-100" },
  { label: "Announcements", value: "3 New", icon: "📢", color: "bg-rose-50 text-rose-700 border-rose-100" },
];

const attendanceTrend = [
  { month: "Jan", value: 88 },
  { month: "Feb", value: 85 },
  { month: "Mar", value: 82 },
  { month: "Apr", value: 79 },
  { month: "May", value: 84 },
  { month: "Jun", value: 87 },
  { month: "Jul", value: 85 },
];

const recentAnnouncements = [
  { id: 1, title: "End Semester Exam Schedule Released", date: "Today", type: "Exam", dot: "bg-red-500" },
  { id: 2, title: "Faculty Workshop on AI in Education", date: "Yesterday", type: "Event", dot: "bg-blue-500" },
  { id: 3, title: "Internal Assessment 2 Marks Submission Deadline", date: "Jul 05", type: "Academic", dot: "bg-amber-500" },
];

const topPerformers = [
  { name: "Christina Mary", regNo: "902324104018", cgpa: 9.10, year: "2nd Year" },
  { name: "Rahul Menon", regNo: "902324104042", cgpa: 9.05, year: "3rd Year" },
  { name: "Priya Lakshmi", regNo: "902324104055", cgpa: 8.92, year: "1st Year" },
  { name: "Arun Kumar", regNo: "902324104005", cgpa: 8.25, year: "2nd Year" },
];

export default function HodDashboard({ onNavigate }) {
  const maxVal = Math.max(...attendanceTrend.map((d) => d.value));

  return (
    <div className="space-y-5">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-emerald-800 via-green-800 to-green-900 rounded-2xl p-5 md:p-6 text-white relative overflow-hidden shadow-md">
        <div className="absolute top-0 right-0 w-56 h-56 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-36 h-36 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        <div className="relative z-10">
          <p className="text-emerald-200 text-[11px] uppercase tracking-widest font-bold mb-1">Department of Computer Science & Engineering</p>
          <h1 className="text-xl md:text-2xl font-bold">Welcome back, Dr. K. Rajkumar 👋</h1>
          <p className="text-green-200 text-xs md:text-sm mt-1">Here's your department overview for today.</p>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {kpiCards.map((card) => (
          <div key={card.label} className={`bg-white border rounded-xl p-3.5 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${card.color.split(" ")[2] || "border-gray-100"}`}>
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`w-8 h-8 rounded-lg ${card.color.split(" ").slice(0, 2).join(" ")} flex items-center justify-center text-sm`}>{card.icon}</span>
            </div>
            <p className="text-[10px] text-gray-450 uppercase font-bold tracking-wider leading-none">{card.label}</p>
            <p className="font-extrabold text-gray-800 text-base md:text-lg leading-tight mt-1">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Charts + Announcements Row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Attendance Trend Bar Chart */}
        <div className="md:col-span-7 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-gray-800 text-sm mb-4">Monthly Attendance Trend</h3>
          <div className="flex items-end gap-2 h-36">
            {attendanceTrend.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[9px] font-bold text-gray-500">{d.value}%</span>
                <div
                  className="w-full bg-gradient-to-t from-emerald-500 to-green-400 rounded-t-md transition-all hover:from-emerald-600 hover:to-green-500"
                  style={{ height: `${(d.value / maxVal) * 100}%`, minHeight: "8px" }}
                />
                <span className="text-[9px] text-gray-400 font-medium">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Announcements */}
        <div className="md:col-span-5 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-800 text-sm">Recent Announcements</h3>
            <button onClick={() => onNavigate?.("Create Announcement")} className="text-emerald-600 text-xs font-semibold hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            {recentAnnouncements.map((a) => (
              <div key={a.id} className="flex items-start gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                <span className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${a.dot}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-700 line-clamp-1">{a.title}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{a.type} · {a.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance + Quick Actions Row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Top Performers */}
        <div className="md:col-span-7 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-gray-800 text-sm mb-3">Top Performers</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 font-bold border-b border-gray-100">
                  <th className="p-2.5">#</th>
                  <th className="p-2.5">Student</th>
                  <th className="p-2.5 text-center">Year</th>
                  <th className="p-2.5 text-right">CGPA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {topPerformers.map((s, i) => (
                  <tr key={s.regNo} className="hover:bg-gray-50/50">
                    <td className="p-2.5 font-bold text-emerald-600">{i + 1}</td>
                    <td className="p-2.5">
                      <p className="font-semibold text-gray-700">{s.name}</p>
                      <p className="text-[10px] text-gray-400">{s.regNo}</p>
                    </td>
                    <td className="p-2.5 text-center text-gray-500">{s.year}</td>
                    <td className="p-2.5 text-right font-bold text-emerald-700">{s.cgpa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="md:col-span-5 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-gray-800 text-sm mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { label: "View Students", icon: "👥", page: "All Students" },
              { label: "Faculty Leaves", icon: "📋", page: "Leave Requests" },
              { label: "Low Attendance", icon: "⚠️", page: "Low Attendance" },
              { label: "Post Notice", icon: "📢", page: "Create Announcement" },
              { label: "View Results", icon: "📊", page: "Semester Results" },
              { label: "Export Reports", icon: "📄", page: "Student Reports" },
            ].map((action) => (
              <button
                key={action.label}
                onClick={() => onNavigate?.(action.page)}
                className="bg-gray-50 hover:bg-emerald-50 border border-gray-100 hover:border-emerald-200 rounded-xl p-3 text-left transition-all group"
              >
                <span className="text-lg">{action.icon}</span>
                <p className="text-[11px] font-semibold text-gray-700 group-hover:text-emerald-700 mt-1.5">{action.label}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Year-wise Strength Chart */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
        <h3 className="font-bold text-gray-800 text-sm mb-3">Student Strength by Year</h3>
        <div className="grid grid-cols-4 gap-3">
          {[
            { year: "1st Year", count: 98, pct: 28.6, color: "from-emerald-500 to-green-400" },
            { year: "2nd Year", count: 92, pct: 26.9, color: "from-teal-500 to-cyan-400" },
            { year: "3rd Year", count: 84, pct: 24.6, color: "from-blue-500 to-indigo-400" },
            { year: "4th Year", count: 68, pct: 19.9, color: "from-violet-500 to-purple-400" },
          ].map((y) => (
            <div key={y.year} className="text-center">
              <div className="relative w-16 h-16 mx-auto mb-2">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="url(#grad)" strokeWidth="3"
                    strokeDasharray={`${y.pct * 0.88} 100`} strokeLinecap="round" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-extrabold text-gray-800">{y.count}</span>
              </div>
              <p className="text-[11px] font-semibold text-gray-700">{y.year}</p>
              <p className="text-[9px] text-gray-400">{y.pct}%</p>
            </div>
          ))}
        </div>
        <svg width="0" height="0">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
