import { useState, useEffect } from "react";
import NoticeBoard from "../Components/NoticeBoard";
import ContactUs from "../Components/ContactUs";

const navItems = [
  { label: "Overview",       icon: "🏠" },
  { label: "Attendance",     icon: "✅" },
  { label: "Academics",      icon: "📈" },
  { label: "Circulars",      icon: "📢" },
  { label: "Staff Directory",icon: "📞" },
  { label: "Alerts",         icon: "🔔" },
];

export default function ParentConnect() {
  const [activePage, setActivePage] = useState("Overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Parent notifications / alerts state
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "Fee Alert",
      message: "Semester tuition and lab fee dues of ₹12,000 are pending. Please pay before July 15, 2026 to avoid late charges.",
      date: "Today",
      importance: "High",
      dot: "bg-red-500",
      read: false,
    },
    {
      id: 2,
      type: "Exam Alert",
      message: "End-Semester Practical Examinations schedule has been released. Exams start on July 20, 2026.",
      date: "Yesterday",
      importance: "Medium",
      dot: "bg-blue-500",
      read: false,
    },
    {
      id: 3,
      type: "Meeting Alert",
      message: "Parent-Teacher Meeting (PTM) for CSE 2nd-year students is scheduled for Saturday, July 18, at 10:00 AM.",
      date: "July 05",
      importance: "High",
      dot: "bg-red-500",
      read: true,
    }
  ]);

  const [leaveRequested, setLeaveRequested] = useState(false);
  const [leaveDate, setLeaveDate] = useState("");
  const [leaveReason, setLeaveReason] = useState("");

  const handleMarkRead = (id) => {
    setAlerts(alerts.map((a) => a.id === id ? { ...a, read: true } : a));
  };

  const handleDismissAlert = (id) => {
    setAlerts(alerts.filter((a) => a.id !== id));
  };

  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    if (!leaveDate || !leaveReason) return;
    setLeaveRequested(true);
    alert(`Leave notification submitted to Class Advisor for date: ${leaveDate}`);
  };

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  const handleNavClick = (label) => {
    setActivePage(label);
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  // Student details
  const child = {
    name: "Arun Kumar",
    regNo: "902324104005",
    class: "B.E. CSE - 2nd Year (4th Sem)",
    guide: "Dr. K. Rajkumar",
    guidePhone: "+91 98431 22334",
    overallAttendance: "86.4%",
    cgpa: "8.25",
    tuitionDue: "₹12,000",
  };

  // Attendance breakdown
  const attendanceBreakdown = [
    { code: "CS8401", subject: "Design and Analysis of Algorithms", conducted: 40, attended: 33, percent: 82.5, status: "Safe" },
    { code: "CS8402", subject: "Theory of Computation", conducted: 38, attended: 27, percent: 71.1, status: "Critical" },
    { code: "CS8403", subject: "Software Engineering", conducted: 35, attended: 31, percent: 88.6, status: "Safe" },
    { code: "CS8404", subject: "Database Management Systems", conducted: 42, attended: 39, percent: 92.8, status: "Safe" },
    { code: "CS8411", subject: "Mobile Application Lab", conducted: 20, attended: 19, percent: 95.0, status: "Safe" }
  ];

  // Academics performance
  const internalMarks = [
    { code: "CS8401", subject: "Algorithms", test1: "38/50", test2: "42/50", assignment: "9/10" },
    { code: "CS8402", subject: "Theory of Computation", test1: "29/50", test2: "32/50", assignment: "8/10" },
    { code: "CS8403", subject: "Software Engineering", test1: "44/50", test2: "41/50", assignment: "9/10" },
    { code: "CS8404", subject: "DBMS", test1: "40/50", test2: "45/50", assignment: "10/10" },
  ];

  const semesterGpas = [
    { semester: "Semester 1", gpa: "8.12", credits: "22", status: "Pass" },
    { semester: "Semester 2", gpa: "8.40", credits: "20", status: "Pass" },
    { semester: "Semester 3", gpa: "8.25", credits: "24", status: "Pass" },
  ];

  // Render components dynamically
  const renderContent = () => {
    switch (activePage) {
      case "Overview":
        return (
          <div className="space-y-4">
            {/* Student profile overview */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <div className="w-16 h-16 rounded-full bg-indigo-50 border-2 border-indigo-650 flex items-center justify-center text-indigo-700 font-extrabold text-xl shadow-inner">
                  AR
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-800 leading-tight">Child Profile: {child.name}</h2>
                  <p className="text-xs text-indigo-600 font-semibold">{child.class}</p>
                  <p className="text-[10px] text-gray-400 mt-1">Roll No: {child.regNo} · Advisor: {child.guide}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <a
                  href={`tel:${child.guidePhone}`}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs px-3.5 py-2 rounded-xl transition"
                >
                  📞 Call Advisor
                </a>
                <button
                  onClick={() => handleNavClick("Alerts")}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-3.5 py-2 rounded-xl transition shadow-sm"
                >
                  💬 View Alerts
                </button>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center gap-3">
                <span className="text-2xl bg-green-50 w-10 h-10 rounded-xl flex items-center justify-center">✅</span>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Overall Attendance</p>
                  <p className="font-extrabold text-green-700 text-lg leading-tight mt-0.5">{child.overallAttendance}</p>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center gap-3">
                <span className="text-2xl bg-blue-50 w-10 h-10 rounded-xl flex items-center justify-center">📈</span>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Cumulative GPA</p>
                  <p className="font-extrabold text-blue-700 text-lg leading-tight mt-0.5">{child.cgpa}</p>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center gap-3">
                <span className="text-2xl bg-red-50 w-10 h-10 rounded-xl flex items-center justify-center">₹</span>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Tuition Fees Due</p>
                  <p className="font-extrabold text-red-650 text-lg leading-tight mt-0.5">{child.tuitionDue}</p>
                </div>
              </div>
            </div>

            {/* Notification Alerts Sneak Peek */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-gray-50 pb-2">
                  <h3 className="font-bold text-gray-800 text-xs md:text-sm">Recent Alerts</h3>
                  <button onClick={() => setActivePage("Alerts")} className="text-xs text-blue-600 hover:underline">View All</button>
                </div>
                <div className="space-y-2.5">
                  {alerts.slice(0, 2).map((alert) => (
                    <div key={alert.id} className="flex gap-2 text-xs">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${alert.dot}`} />
                      <div>
                        <p className="font-bold text-gray-700">{alert.type}</p>
                        <p className="text-gray-500 text-[11px] mt-0.5 line-clamp-2">{alert.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Leave request box */}
              <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm space-y-3">
                <h3 className="font-bold text-gray-800 text-xs md:text-sm border-b border-gray-50 pb-2">Notify Student Absence</h3>
                
                {leaveRequested ? (
                  <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg text-xs font-semibold">
                    ✓ Absence notification has been dispatched to {child.guide}.
                  </div>
                ) : (
                  <form onSubmit={handleLeaveSubmit} className="space-y-2.5">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-semibold text-gray-500 mb-0.5">Date of Absence</label>
                        <input
                          type="date"
                          required
                          value={leaveDate}
                          onChange={(e) => setLeaveDate(e.target.value)}
                          className="w-full border border-gray-250 rounded px-2.5 py-1 text-xs text-gray-700 bg-gray-50 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-gray-500 mb-0.5">Reason Category</label>
                        <select className="w-full border border-gray-250 rounded px-2 py-1 text-xs text-gray-700 bg-gray-50 focus:outline-none">
                          <option>Medical Leave</option>
                          <option>Personal Reason</option>
                          <option>Family Event</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="e.g. Fever and cold, attending function"
                        required
                        value={leaveReason}
                        onChange={(e) => setLeaveReason(e.target.value)}
                        className="w-full border border-gray-250 rounded px-2.5 py-1 text-xs text-gray-700 bg-gray-50 focus:outline-none"
                      />
                    </div>
                    <button type="submit" className="bg-indigo-600 hover:bg-indigo-750 text-white font-semibold text-xs px-3 py-1.5 rounded-lg transition">
                      Submit Leave Intimation
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        );

      case "Attendance":
        return (
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
            <div>
              <h3 className="font-bold text-gray-800 text-sm">Detailed Attendance Logs</h3>
              <p className="text-gray-400 text-xs mt-0.5">Subject-wise class attendance tracking. A minimum of 75% is mandatory for exams.</p>
            </div>

            <div className="overflow-x-auto border border-gray-100 rounded-xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 font-bold border-b border-gray-100">
                    <th className="p-3">Subject</th>
                    <th className="p-3 text-center">Conducted</th>
                    <th className="p-3 text-center">Attended</th>
                    <th className="p-3 text-center">Percentage</th>
                    <th className="p-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {attendanceBreakdown.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50">
                      <td className="p-3 font-semibold text-gray-700">
                        {row.subject}
                        <span className="block text-[10px] text-gray-405 font-normal mt-0.5">{row.code}</span>
                      </td>
                      <td className="p-3 text-center text-gray-500">{row.conducted} Hrs</td>
                      <td className="p-3 text-center text-gray-500">{row.attended} Hrs</td>
                      <td className="p-3 text-center">
                        <span className={`font-bold ${row.percent < 75 ? 'text-red-500' : 'text-green-600'}`}>
                          {row.percent}%
                        </span>
                        {/* mini progress bar */}
                        <div className="w-24 bg-gray-100 h-1.5 rounded-full mx-auto mt-1.5 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${row.percent < 75 ? 'bg-red-500' : 'bg-green-500'}`} 
                            style={{ width: `${row.percent}%` }}
                          />
                        </div>
                      </td>
                      <td className="p-3 text-right">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          row.status === "Safe"
                            ? "bg-green-50 text-green-600 border border-green-100"
                            : "bg-red-50 text-red-650 border border-red-100"
                        }`}>
                          {row.status === "Safe" ? "✓ Safe" : "⚠️ Warning"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "Academics":
        return (
          <div className="space-y-4">
            {/* Current internal test marks */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-3">
              <div>
                <h3 className="font-bold text-gray-800 text-sm">Internal Test Performance (Current Sem)</h3>
                <p className="text-gray-400 text-xs mt-0.5">Continuous evaluation assessments and assignment grades.</p>
              </div>

              <div className="overflow-x-auto border border-gray-100 rounded-xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 font-bold border-b border-gray-100">
                      <th className="p-3">Subject Name</th>
                      <th className="p-3 text-center">Internal Test 1</th>
                      <th className="p-3 text-center">Internal Test 2</th>
                      <th className="p-3 text-right">Assignment Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {internalMarks.map((marks, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50">
                        <td className="p-3 font-semibold text-gray-700">{marks.subject}</td>
                        <td className="p-3 text-center text-gray-600 font-medium">{marks.test1}</td>
                        <td className="p-3 text-center text-gray-600 font-medium">{marks.test2}</td>
                        <td className="p-3 text-right text-indigo-600 font-bold">{marks.assignment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Past semester GPA summary */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-3">
              <div>
                <h3 className="font-bold text-gray-800 text-sm">End-Semester Grade Records</h3>
                <p className="text-gray-400 text-xs mt-0.5">Academic records of completed semesters.</p>
              </div>

              <div className="overflow-x-auto border border-gray-100 rounded-xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 font-bold border-b border-gray-100">
                      <th className="p-3">Semester</th>
                      <th className="p-3 text-center">Credits Earned</th>
                      <th className="p-3 text-center">Grade Point Average (GPA)</th>
                      <th className="p-3 text-right">Result Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {semesterGpas.map((gpaItem, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50">
                        <td className="p-3 font-semibold text-gray-700">{gpaItem.semester}</td>
                        <td className="p-3 text-center text-gray-550">{gpaItem.credits}</td>
                        <td className="p-3 text-center text-indigo-650 font-bold">{gpaItem.gpa}</td>
                        <td className="p-3 text-right">
                          <span className="bg-green-50 border border-green-100 text-green-700 px-2.5 py-0.5 rounded-full font-semibold text-[10px]">
                            {gpaItem.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case "Circulars":
        return <NoticeBoard />;

      case "Staff Directory":
        return <ContactUs />;

      case "Alerts":
        return (
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-50 pb-3">
              <div>
                <h3 className="font-bold text-gray-800 text-sm">Parent Alerts Dashboard</h3>
                <p className="text-gray-400 text-xs mt-0.5">Direct notifications regarding your child, exams, and college events.</p>
              </div>
              {alerts.some((a) => !a.read) && (
                <button
                  onClick={() => setAlerts(alerts.map((a) => ({ ...a, read: true })))}
                  className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-indigo-100 transition-colors"
                >
                  ✓ Mark all as Read
                </button>
              )}
            </div>

            <div className="space-y-3">
              {alerts.length > 0 ? (
                alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`border rounded-xl p-4 transition-all flex gap-3.5 ${
                      alert.read
                        ? "bg-white border-gray-100"
                        : "bg-indigo-50/30 border-indigo-100"
                    }`}
                  >
                    <span className="text-xl bg-gray-50 border border-gray-100 w-9 h-9 rounded-xl flex items-center justify-center shrink-0">
                      🔔
                    </span>
                    <div className="flex-1 min-w-0 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-800 text-xs">{alert.type}</span>
                        <span className="text-[10px] text-gray-400">📅 {alert.date}</span>
                      </div>
                      <p className="text-gray-655 text-xs leading-relaxed">{alert.message}</p>
                      
                      <div className="flex justify-between items-center pt-2 border-t border-gray-50 mt-1">
                        <span className="flex items-center gap-1.5 text-[10px] text-gray-450">
                          Priority:
                          <span className={`w-1.5 h-1.5 rounded-full ${alert.dot}`} />
                          <span className="font-semibold">{alert.importance}</span>
                        </span>
                        <div className="flex gap-2">
                          {!alert.read && (
                            <button
                              onClick={() => handleMarkRead(alert.id)}
                              className="text-indigo-650 hover:text-indigo-700 font-semibold"
                            >
                              Mark Read
                            </button>
                          )}
                          <button
                            onClick={() => handleDismissAlert(alert.id)}
                            className="text-red-550 hover:text-red-650 font-semibold"
                          >
                            Dismiss
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center flex flex-col items-center justify-center gap-2">
                  <span className="text-3xl">📭</span>
                  <p className="text-xs font-semibold text-gray-600">No active alerts</p>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans text-sm overflow-hidden">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-30 w-64 flex flex-col
          bg-white border-r border-gray-200
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:static md:z-auto md:w-56 md:translate-x-0 md:flex-shrink-0
          overflow-y-auto overflow-x-hidden
        `}
      >
        <div className="w-64 md:w-56 flex flex-col h-full">
          {/* Logo / Title */}
          <div className="flex items-center gap-2.5 px-4 py-4 border-b border-gray-100 flex-shrink-0">
            <div className="w-9 h-9 bg-indigo-700 rounded-lg flex items-center justify-center text-white text-lg font-bold shadow-sm shrink-0">
              P
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-indigo-700 text-sm leading-tight">ParentConnect</p>
              <p className="text-gray-400 text-[10px] leading-tight">EERPS Monitoring Portal</p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden ml-auto p-1 rounded-lg text-gray-400 hover:text-gray-650 hover:bg-gray-100 transition-colors shrink-0"
              aria-label="Close sidebar"
            >
              ✕
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 py-2 overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.label)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors relative ${
                  activePage === item.label
                    ? "bg-indigo-50 text-indigo-750 font-semibold"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {activePage === item.label && (
                  <span className="absolute right-0 top-0 h-full w-0.5 bg-indigo-650 rounded-l" />
                )}
                <span className="text-base shrink-0">{item.icon}</span>
                <span className="text-[13px]">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Child switcher view preview */}
          <div className="p-3 border-t border-gray-100 shrink-0">
            <div className="bg-gray-50 rounded-lg p-2.5 text-xs">
              <p className="text-gray-400 text-[9px] uppercase font-bold tracking-wider mb-1">Monitoring Child</p>
              <p className="font-semibold text-gray-800">{child.name}</p>
              <p className="text-gray-400 text-[10px]">{child.class.split(" - ")[1]}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0 w-full">
        {/* Top bar header */}
        <header className="bg-white border-b border-gray-200 flex items-center px-4 py-3 gap-3 shrink-0">
          <button
            onClick={() => setSidebarOpen((o) => !o)}
            className="text-gray-500 hover:text-gray-700 text-xl shrink-0 transition-colors"
            aria-label="Toggle sidebar"
          >
            ☰
          </button>

          {/* Title / Breadcrumb */}
          <span className="hidden md:block text-[12px] text-gray-400 font-medium shrink-0">
            {navItems.find((n) => n.label === activePage)?.icon}{" "}
            <span className="text-gray-600">{activePage}</span>
          </span>

          <span className="md:hidden flex-1 text-[13px] font-semibold text-gray-750 truncate">
            {navItems.find((n) => n.label === activePage)?.icon} {activePage}
          </span>

          {/* Right profile detail */}
          <div className="flex items-center gap-3 ml-auto shrink-0 text-xs">
            <div 
              onClick={() => handleNavClick("Alerts")}
              className="relative cursor-pointer hover:bg-gray-100 p-1.5 rounded-lg transition-colors"
              title="Parent Alerts"
            >
              <span className="text-xl text-gray-500">🔔</span>
              {alerts.filter((a) => !a.read).length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {alerts.filter((a) => !a.read).length}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2 border-l border-gray-250 pl-3">
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
                P
              </div>
              <div className="hidden sm:block leading-tight">
                <p className="font-semibold text-gray-750">Hello, Parent</p>
                <p className="text-[10px] text-gray-400">Ward: {child.name}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable content container */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 pb-12">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
