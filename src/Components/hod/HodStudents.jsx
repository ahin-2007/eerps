import React, { useState } from "react";

const ALL_STUDENTS = [
  { id: 1, name: "Arun Kumar", regNo: "902324104005", year: "2nd", sem: "4", section: "A", gender: "Male", status: "Active", attendance: 86.4, cgpa: 8.25, feeStatus: "Paid", initials: "AK" },
  { id: 2, name: "Bala Chandran", regNo: "902324104011", year: "2nd", sem: "4", section: "A", gender: "Male", status: "Active", attendance: 88.6, cgpa: 7.80, feeStatus: "Paid", initials: "BC" },
  { id: 3, name: "Christina Mary", regNo: "902324104018", year: "2nd", sem: "4", section: "B", gender: "Female", status: "Active", attendance: 93.1, cgpa: 9.10, feeStatus: "Paid", initials: "CM" },
  { id: 4, name: "Deepak Raj", regNo: "902324104022", year: "2nd", sem: "4", section: "A", gender: "Male", status: "Active", attendance: 70.4, cgpa: 6.95, feeStatus: "Due", initials: "DR" },
  { id: 5, name: "Ezhil Hassan", regNo: "902324104030", year: "2nd", sem: "4", section: "B", gender: "Male", status: "Active", attendance: 77.2, cgpa: 7.42, feeStatus: "Paid", initials: "EH" },
  { id: 6, name: "Fatima Banu", regNo: "902323104008", year: "3rd", sem: "6", section: "A", gender: "Female", status: "Active", attendance: 91.5, cgpa: 8.85, feeStatus: "Paid", initials: "FB" },
  { id: 7, name: "Ganesh Moorthy", regNo: "902323104015", year: "3rd", sem: "6", section: "A", gender: "Male", status: "Active", attendance: 82.3, cgpa: 7.60, feeStatus: "Due", initials: "GM" },
  { id: 8, name: "Harini Devi", regNo: "902325104003", year: "1st", sem: "2", section: "A", gender: "Female", status: "Active", attendance: 95.0, cgpa: 8.90, feeStatus: "Paid", initials: "HD" },
  { id: 9, name: "Isha Kumari", regNo: "902325104010", year: "1st", sem: "2", section: "B", gender: "Female", status: "Active", attendance: 89.4, cgpa: 8.15, feeStatus: "Paid", initials: "IK" },
  { id: 10, name: "Jayakumar S", regNo: "902322104020", year: "4th", sem: "8", section: "A", gender: "Male", status: "Active", attendance: 78.1, cgpa: 7.22, feeStatus: "Due", initials: "JS" },
];

export default function HodStudents() {
  const [search, setSearch] = useState("");
  const [filterYear, setFilterYear] = useState("All");
  const [filterSection, setFilterSection] = useState("All");
  const [filterGender, setFilterGender] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [viewProfile, setViewProfile] = useState(null);

  const filtered = ALL_STUDENTS.filter((s) => {
    if (filterYear !== "All" && s.year !== filterYear) return false;
    if (filterSection !== "All" && s.section !== filterSection) return false;
    if (filterGender !== "All" && s.gender !== filterGender) return false;
    if (filterStatus !== "All" && s.status !== filterStatus) return false;
    if (search) {
      const q = search.toLowerCase();
      return s.name.toLowerCase().includes(q) || s.regNo.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Filter Bar */}
      <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex flex-col md:flex-row md:items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <input type="text" placeholder="Search by name or register number..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-lg text-xs bg-gray-50 focus:outline-none focus:border-emerald-400 focus:bg-white transition" />
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">🔍</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { val: filterYear, set: setFilterYear, opts: ["All", "1st", "2nd", "3rd", "4th"], label: "Year" },
            { val: filterSection, set: setFilterSection, opts: ["All", "A", "B", "C"], label: "Section" },
            { val: filterGender, set: setFilterGender, opts: ["All", "Male", "Female"], label: "Gender" },
            { val: filterStatus, set: setFilterStatus, opts: ["All", "Active", "Inactive"], label: "Status" },
          ].map((f) => (
            <select key={f.label} value={f.val} onChange={(e) => f.set(e.target.value)}
              className="border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-gray-700 bg-gray-50 focus:outline-none focus:border-emerald-400">
              {f.opts.map((o) => <option key={o} value={o}>{f.label}: {o}</option>)}
            </select>
          ))}
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <h3 className="font-bold text-gray-800 text-sm">Student Directory ({filtered.length})</h3>
          <button onClick={() => alert("Downloading student list as PDF...")} className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition">
            📄 Export PDF
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 font-bold border-b border-gray-100">
                <th className="p-3">Student</th>
                <th className="p-3">Reg No</th>
                <th className="p-3 text-center">Year</th>
                <th className="p-3 text-center">Sem</th>
                <th className="p-3 text-center">Section</th>
                <th className="p-3 text-center">Attendance</th>
                <th className="p-3 text-center">CGPA</th>
                <th className="p-3 text-center">Fee</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length > 0 ? filtered.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50/60">
                  <td className="p-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-[10px] shrink-0">{s.initials}</div>
                      <span className="font-semibold text-gray-700">{s.name}</span>
                    </div>
                  </td>
                  <td className="p-3 text-gray-500">{s.regNo}</td>
                  <td className="p-3 text-center text-gray-600">{s.year}</td>
                  <td className="p-3 text-center text-gray-600">{s.sem}</td>
                  <td className="p-3 text-center text-gray-600">{s.section}</td>
                  <td className="p-3 text-center">
                    <span className={`font-bold ${s.attendance < 75 ? "text-red-500" : "text-green-600"}`}>{s.attendance}%</span>
                  </td>
                  <td className="p-3 text-center font-bold text-emerald-700">{s.cgpa}</td>
                  <td className="p-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${s.feeStatus === "Paid" ? "bg-green-50 text-green-600 border border-green-100" : "bg-red-50 text-red-600 border border-red-100"}`}>{s.feeStatus}</span>
                  </td>
                  <td className="p-3 text-right">
                    <button onClick={() => setViewProfile(s)} className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-emerald-100 transition">View</button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={9} className="p-8 text-center text-gray-400 text-xs">No students match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Profile Modal */}
      {viewProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-xl">
            <div className="bg-gradient-to-r from-emerald-700 to-green-800 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">{viewProfile.initials}</div>
                <div>
                  <h3 className="font-bold text-sm">{viewProfile.name}</h3>
                  <p className="text-emerald-200 text-[10px]">{viewProfile.regNo} · {viewProfile.year} Year, Sec {viewProfile.section}</p>
                </div>
              </div>
              <button onClick={() => setViewProfile(null)} className="text-white/70 hover:text-white p-1 bg-white/10 hover:bg-white/20 rounded-lg text-xs transition">✕</button>
            </div>
            <div className="p-4 space-y-3 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-green-50 border border-green-100 rounded-xl p-2.5 text-center">
                  <p className="text-[9px] text-green-700 font-bold uppercase">Attendance</p>
                  <p className={`font-extrabold text-sm ${viewProfile.attendance < 75 ? "text-red-500" : "text-green-700"}`}>{viewProfile.attendance}%</p>
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-2.5 text-center">
                  <p className="text-[9px] text-blue-700 font-bold uppercase">CGPA</p>
                  <p className="font-extrabold text-sm text-blue-700">{viewProfile.cgpa}</p>
                </div>
                <div className={`rounded-xl p-2.5 text-center border ${viewProfile.feeStatus === "Paid" ? "bg-emerald-50 border-emerald-100" : "bg-red-50 border-red-100"}`}>
                  <p className="text-[9px] font-bold uppercase text-gray-600">Fee</p>
                  <p className={`font-extrabold text-sm ${viewProfile.feeStatus === "Paid" ? "text-emerald-700" : "text-red-600"}`}>{viewProfile.feeStatus}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs text-gray-600">
                <div><p className="text-gray-400 text-[10px]">Gender:</p><p className="font-semibold">{viewProfile.gender}</p></div>
                <div><p className="text-gray-400 text-[10px]">Status:</p><p className="font-semibold">{viewProfile.status}</p></div>
                <div><p className="text-gray-400 text-[10px]">Semester:</p><p className="font-semibold">{viewProfile.sem}</p></div>
                <div><p className="text-gray-400 text-[10px]">Section:</p><p className="font-semibold">{viewProfile.section}</p></div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 border-t border-gray-100 flex justify-end gap-2">
              <button onClick={() => alert(`Downloading report for ${viewProfile.name}`)} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition">📄 Download Report</button>
              <button onClick={() => setViewProfile(null)} className="bg-white border border-gray-200 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-50 transition">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
