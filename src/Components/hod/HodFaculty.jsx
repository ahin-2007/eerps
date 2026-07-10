import React, { useState } from "react";

const FACULTY_LIST = [
  { id: 1, name: "Mrs. Sarah John", designation: "Asst. Professor", subjects: ["DAA", "Python Programming"], workload: 18, maxLoad: 20, attendance: 96.2, initials: "SJ" },
  { id: 2, name: "Mr. R. Rajesh", designation: "Lab Instructor", subjects: ["Mobile App Lab", "DBMS Lab"], workload: 16, maxLoad: 20, attendance: 94.8, initials: "RR" },
  { id: 3, name: "Dr. P. Meena", designation: "Assoc. Professor", subjects: ["Software Engineering", "Cloud Computing"], workload: 14, maxLoad: 18, attendance: 97.5, initials: "PM" },
  { id: 4, name: "Mr. K. Vivek", designation: "Asst. Professor", subjects: ["Theory of Computation", "Compiler Design"], workload: 19, maxLoad: 20, attendance: 91.3, initials: "KV" },
  { id: 5, name: "Mrs. L. Priya", designation: "Asst. Professor", subjects: ["Computer Networks", "OS"], workload: 17, maxLoad: 20, attendance: 93.7, initials: "LP" },
];

const LEAVE_REQUESTS = [
  { id: 101, faculty: "Mr. K. Vivek", type: "Medical Leave", from: "Jul 10, 2026", to: "Jul 12, 2026", days: 3, reason: "Scheduled dental surgery and recovery.", status: "Pending" },
  { id: 102, faculty: "Mrs. L. Priya", type: "Personal Leave", from: "Jul 14, 2026", to: "Jul 14, 2026", days: 1, reason: "Family function attendance.", status: "Pending" },
  { id: 103, faculty: "Mrs. Sarah John", type: "Conference Leave", from: "Jul 20, 2026", to: "Jul 22, 2026", days: 3, reason: "Presenting paper at IEEE Conference, Chennai.", status: "Pending" },
];

export default function HodFaculty() {
  const [activeTab, setActiveTab] = useState("directory");
  const [leaves, setLeaves] = useState(LEAVE_REQUESTS);

  const handleLeaveAction = (id, action) => {
    setLeaves(leaves.map((l) => l.id === id ? { ...l, status: action } : l));
    alert(`Leave request ${action.toLowerCase()} successfully!`);
  };

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="bg-white border border-gray-100 rounded-xl p-1.5 shadow-sm flex gap-1.5">
        {[
          { id: "directory", label: "Faculty Directory 👨‍🏫" },
          { id: "workload", label: "Workload Overview 📊" },
          { id: "leaves", label: `Leave Requests (${leaves.filter((l) => l.status === "Pending").length}) 📋` },
        ].map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex-1 ${activeTab === tab.id ? "bg-emerald-600 text-white" : "text-gray-600 hover:bg-gray-50"}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Faculty Directory */}
      {activeTab === "directory" && (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="font-bold text-gray-800 text-sm">Department Faculty ({FACULTY_LIST.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 font-bold border-b border-gray-100">
                  <th className="p-3">Faculty</th>
                  <th className="p-3">Designation</th>
                  <th className="p-3">Subjects</th>
                  <th className="p-3 text-center">Workload</th>
                  <th className="p-3 text-right">Attendance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {FACULTY_LIST.map((f) => (
                  <tr key={f.id} className="hover:bg-gray-50/50">
                    <td className="p-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-[10px]">{f.initials}</div>
                        <span className="font-semibold text-gray-700">{f.name}</span>
                      </div>
                    </td>
                    <td className="p-3 text-gray-500">{f.designation}</td>
                    <td className="p-3"><div className="flex flex-wrap gap-1">{f.subjects.map((s) => <span key={s} className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[9px] font-bold px-1.5 py-0.5 rounded">{s}</span>)}</div></td>
                    <td className="p-3 text-center font-semibold text-gray-700">{f.workload}/{f.maxLoad} hrs</td>
                    <td className="p-3 text-right font-bold text-green-600">{f.attendance}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Workload Overview */}
      {activeTab === "workload" && (
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
          <h3 className="font-bold text-gray-800 text-sm">Faculty Workload Distribution</h3>
          <div className="space-y-3">
            {FACULTY_LIST.map((f) => {
              const pct = Math.round((f.workload / f.maxLoad) * 100);
              return (
                <div key={f.id} className="flex items-center gap-3 text-xs">
                  <div className="w-32 shrink-0 font-semibold text-gray-700 truncate">{f.name}</div>
                  <div className="flex-1 bg-gray-100 h-4 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${pct >= 90 ? "bg-red-500" : pct >= 75 ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: `${pct}%` }} />
                  </div>
                  <span className="w-16 text-right font-bold text-gray-700">{f.workload}/{f.maxLoad} hrs</span>
                  <span className={`w-12 text-right font-bold ${pct >= 90 ? "text-red-500" : pct >= 75 ? "text-amber-600" : "text-emerald-600"}`}>{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Leave Requests */}
      {activeTab === "leaves" && (
        <div className="space-y-3">
          {leaves.map((l) => (
            <div key={l.id} className={`bg-white border rounded-xl p-4 shadow-sm ${l.status === "Pending" ? "border-amber-200" : "border-gray-100"}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div>
                  <h4 className="font-bold text-gray-800 text-xs">{l.faculty}</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">{l.type} · {l.from} → {l.to} ({l.days} day{l.days > 1 ? "s" : ""})</p>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full self-start ${l.status === "Pending" ? "bg-amber-50 text-amber-700 border border-amber-200" : l.status === "Approved" ? "bg-green-50 text-green-700 border border-green-100" : "bg-red-50 text-red-600 border border-red-100"}`}>
                  {l.status}
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed mb-3">"{l.reason}"</p>
              {l.status === "Pending" && (
                <div className="flex gap-2 border-t border-gray-55 pt-2.5">
                  <button onClick={() => handleLeaveAction(l.id, "Approved")} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg transition shadow-sm">✓ Approve</button>
                  <button onClick={() => handleLeaveAction(l.id, "Rejected")} className="bg-white border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold px-3.5 py-1.5 rounded-lg transition">✕ Reject</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
