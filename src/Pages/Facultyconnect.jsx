import React, { useState } from "react";

// Initial student database for Faculty control
const INITIAL_STUDENTS = [
  { id: 1, name: "Arun Kumar", regNo: "902324104005", attendancePercent: 86.4, classesAttended: 38, classesConducted: 44, cgpa: 8.25, test1: 42, test2: 45, assignment: 9 },
  { id: 2, name: "Bala Chandran", regNo: "902324104011", attendancePercent: 88.6, classesAttended: 39, classesConducted: 44, cgpa: 7.80, test1: 38, test2: 40, assignment: 8 },
  { id: 3, name: "Christina Mary", regNo: "902324104018", attendancePercent: 93.1, classesAttended: 41, classesConducted: 44, cgpa: 9.10, test1: 48, test2: 46, assignment: 10 },
  { id: 4, name: "Deepak Raj", regNo: "902324104022", attendancePercent: 70.4, classesAttended: 31, classesConducted: 44, cgpa: 6.95, test1: 30, test2: 28, assignment: 7 },
  { id: 5, name: "Ezhil Hassan", regNo: "902324104030", attendancePercent: 77.2, classesAttended: 34, classesConducted: 44, cgpa: 7.42, test1: 35, test2: 37, assignment: 8 }
];

const INITIAL_MATERIALS = [
  { id: 1, title: "DAA Unit 3: Dynamic Programming Notes", type: "Notes", file: "DAA_Dynamic_Programming.pdf", date: "July 05, 2026" },
  { id: 2, title: "Software Engineering Syllabus & Objectives", type: "Syllabus", file: "SE_Syllabus_Outline.pdf", date: "July 01, 2026" },
  { id: 3, title: "DBMS Practice Questions on Relational Algebra", type: "Question Bank", file: "DBMS_Practice_Relational_Alg.pdf", date: "June 28, 2026" }
];

const navItems = [
  { label: "Class Overview",  icon: "🏫" },
  { label: "Record Attendance",icon: "✅" },
  { label: "Upload Marks",     icon: "📈" },
  { label: "Share Materials",  icon: "📚" },
  { label: "Publish Circular", icon: "📢" }
];

export default function FacultyConnect() {
  const [activePage, setActivePage] = useState("Class Overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  
  // Attendance Register states
  const [selectedSubject, setSelectedSubject] = useState("Design and Analysis of Algorithms");
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendanceStates, setAttendanceStates] = useState(
    INITIAL_STUDENTS.reduce((acc, stu) => ({ ...acc, [stu.id]: true }), {})
  );
  const [attendanceSaved, setAttendanceSaved] = useState(false);

  // Marks Entry states
  const [selectedMarkSubject, setSelectedMarkSubject] = useState("Design and Analysis of Algorithms");
  const [selectedAssessment, setSelectedAssessment] = useState("test1"); // test1, test2, assignment
  const [tempMarks, setTempMarks] = useState(
    INITIAL_STUDENTS.reduce((acc, stu) => ({ ...acc, [stu.id]: stu.test1 }), {})
  );
  const [marksSaved, setMarksSaved] = useState(false);

  // Materials states
  const [materials, setMaterials] = useState(INITIAL_MATERIALS);
  const [newMaterialTitle, setNewMaterialTitle] = useState("");
  const [newMaterialType, setNewMaterialType] = useState("Notes");
  const [newMaterialFile, setNewMaterialFile] = useState("");

  // Circular states
  const [circularCategory, setCircularCategory] = useState("Faculty Messages");
  const [circularTitle, setCircularTitle] = useState("");
  const [circularImportance, setCircularImportance] = useState("Medium");
  const [circularContent, setCircularContent] = useState("");
  const [circularPublished, setCircularPublished] = useState(false);

  const toggleAttendance = (id) => {
    setAttendanceStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAttendanceSubmit = (e) => {
    e.preventDefault();
    
    // Update attendance numbers locally
    const updated = students.map((stu) => {
      const present = attendanceStates[stu.id];
      const newAttended = present ? stu.classesAttended + 1 : stu.classesAttended;
      const newConducted = stu.classesConducted + 1;
      const newPercent = parseFloat(((newAttended / newConducted) * 100).toFixed(1));
      return {
        ...stu,
        classesAttended: newAttended,
        classesConducted: newConducted,
        attendancePercent: newPercent
      };
    });

    setStudents(updated);
    setAttendanceSaved(true);
    setTimeout(() => setAttendanceSaved(false), 4000);
  };

  const handleMarkChange = (id, value) => {
    const val = value === "" ? "" : parseInt(value) || 0;
    setTempMarks((prev) => ({ ...prev, [id]: val }));
  };

  const handleMarksSubmit = (e) => {
    e.preventDefault();
    
    const updated = students.map((stu) => ({
      ...stu,
      [selectedAssessment]: tempMarks[stu.id]
    }));

    setStudents(updated);
    setMarksSaved(true);
    setTimeout(() => setMarksSaved(false), 4000);
  };

  // Sync marks inputs when subject or assessment type changes
  React.useEffect(() => {
    setTempMarks(
      students.reduce((acc, stu) => ({ ...acc, [stu.id]: stu[selectedAssessment] }), {})
    );
  }, [selectedAssessment, students]);

  const handleAddMaterial = (e) => {
    e.preventDefault();
    if (!newMaterialTitle || !newMaterialFile) return;

    const item = {
      id: Date.now(),
      title: newMaterialTitle,
      type: newMaterialType,
      file: newMaterialFile,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
    };

    setMaterials([item, ...materials]);
    setNewMaterialTitle("");
    setNewMaterialFile("");
    alert("Study material shared successfully!");
  };

  const handleDeleteMaterial = (id) => {
    setMaterials(materials.filter((m) => m.id !== id));
  };

  const handleCircularSubmit = (e) => {
    e.preventDefault();
    if (!circularTitle || !circularContent) return;

    setCircularPublished(true);
    setCircularTitle("");
    setCircularContent("");
    setTimeout(() => setCircularPublished(false), 5050);
    alert("Circular published successfully to student notice board!");
  };

  const handleNavClick = (label) => {
    setActivePage(label);
    if (window.innerWidth < 768) setSidebarOpen(false);
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
          {/* Logo / Header */}
          <div className="flex items-center gap-2.5 px-4 py-4 border-b border-gray-100 flex-shrink-0">
            <div className="w-9 h-9 bg-blue-800 rounded-lg flex items-center justify-center text-white text-lg font-bold shadow-sm shrink-0">
              F
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-blue-805 text-sm leading-tight">FacultyPortal</p>
              <p className="text-gray-400 text-[10px] leading-tight">EERPS Classroom Suite</p>
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
                    ? "bg-blue-50 text-blue-750 font-semibold"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {activePage === item.label && (
                  <span className="absolute right-0 top-0 h-full w-0.5 bg-blue-650 rounded-l" />
                )}
                <span className="text-base shrink-0">{item.icon}</span>
                <span className="text-[13px]">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Profile card preview */}
          <div className="p-3 border-t border-gray-100 shrink-0">
            <div className="bg-gray-50 rounded-lg p-2.5 text-xs text-gray-600">
              <p className="text-gray-400 text-[9px] uppercase font-bold tracking-wider mb-1">Signed in as</p>
              <p className="font-semibold text-gray-800">Mrs. Sarah John</p>
              <p className="text-gray-400 text-[10px]">Assistant Professor</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0 w-full">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 flex items-center px-4 py-3 gap-3 shrink-0">
          <button
            onClick={() => setSidebarOpen((o) => !o)}
            className="text-gray-500 hover:text-gray-700 text-xl shrink-0 transition-colors"
            aria-label="Toggle sidebar"
          >
            ☰
          </button>

          {/* Title Breadcrumbs */}
          <span className="hidden md:block text-[12px] text-gray-400 font-medium shrink-0">
            {navItems.find((n) => n.label === activePage)?.icon}{" "}
            <span className="text-gray-600">{activePage}</span>
          </span>

          <span className="md:hidden flex-1 text-[13px] font-semibold text-gray-750 truncate">
            {navItems.find((n) => n.label === activePage)?.icon} {activePage}
          </span>

          {/* Right profile info */}
          <div className="flex items-center gap-2.5 ml-auto shrink-0 text-xs text-gray-650">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center">
              SJ
            </div>
            <div className="hidden sm:block leading-tight text-[11px]">
              <p className="font-semibold text-gray-800">Mrs. Sarah John</p>
              <p className="text-gray-400 text-[9px]">Department of CSE</p>
            </div>
          </div>
        </header>

        {/* Scrollable Viewport */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 pb-12">
          {/* Class Overview Dashboard */}
          {activePage === "Class Overview" && (
            <div className="space-y-4">
              {/* Quick statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { value: "5", label: "Students Managed", icon: "👥", color: "bg-blue-50 text-blue-600" },
                  { value: "81.2%", label: "Average Attendance", icon: "📈", color: "bg-green-50 text-green-600" },
                  { value: "7.91", label: "Class Average CGPA", icon: "📊", color: "bg-purple-50 text-purple-600" },
                  { value: "3 Shared", label: "Study Resources", icon: "📚", color: "bg-amber-50 text-amber-600" }
                ].map((card, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center gap-3">
                    <span className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center text-lg`}>
                      {card.icon}
                    </span>
                    <div>
                      <p className="text-[10px] text-gray-450 uppercase font-bold tracking-wider mb-0.5">{card.label}</p>
                      <p className="font-extrabold text-gray-800 text-sm md:text-base leading-none">{card.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Student Directory Grid */}
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-3">
                <h3 className="font-bold text-gray-800 text-sm">Class Student Directory (CSE 2nd Year)</h3>
                
                <div className="overflow-x-auto border border-gray-100 rounded-xl">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 font-bold border-b border-gray-100">
                        <th className="p-3">Student Name</th>
                        <th className="p-3 text-center">Register No</th>
                        <th className="p-3 text-center">Attendance %</th>
                        <th className="p-3 text-center">CGPA GPA</th>
                        <th className="p-3 text-right">Attendance Warning</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {students.map((stu) => (
                        <tr key={stu.id} className="hover:bg-gray-50/50">
                          <td className="p-3 font-semibold text-gray-700">{stu.name}</td>
                          <td className="p-3 text-center text-gray-500">{stu.regNo}</td>
                          <td className="p-3 text-center font-bold text-gray-700">{stu.attendancePercent}%</td>
                          <td className="p-3 text-center text-blue-600 font-bold">{stu.cgpa}</td>
                          <td className="p-3 text-right">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              stu.attendancePercent >= 75
                                ? "bg-green-50 text-green-600 border border-green-100"
                                : "bg-red-50 text-red-600 border border-red-100"
                            }`}>
                              {stu.attendancePercent >= 75 ? "Safe" : "Low Attendance"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Record Attendance */}
          {activePage === "Record Attendance" && (
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="border-b border-gray-55 pb-3 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-gray-800 text-sm">Class Attendance Register</h3>
                  <p className="text-gray-400 text-xs mt-0.5">Record attendance logs. Changes update student percentage scores dynamically.</p>
                </div>
                
                {attendanceSaved && (
                  <span className="bg-green-50 border border-green-200 text-green-700 font-semibold px-3.5 py-1.5 rounded-lg text-xs animate-pulse">
                    ✓ Attendance record saved successfully!
                  </span>
                )}
              </div>

              {/* Class setup row */}
              <form onSubmit={handleAttendanceSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Subject Title *</label>
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="w-full border border-gray-250 rounded-lg px-2.5 py-1.5 text-xs text-gray-750 bg-gray-50 focus:outline-none"
                    >
                      <option>Design and Analysis of Algorithms</option>
                      <option>Software Engineering</option>
                      <option>Mobile Application Lab</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Date *</label>
                    <input
                      type="date"
                      required
                      value={attendanceDate}
                      onChange={(e) => setAttendanceDate(e.target.value)}
                      className="w-full border border-gray-250 rounded-lg px-3 py-1.5 text-xs text-gray-750 bg-gray-50 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Students list with checkboxes */}
                <div className="overflow-x-auto border border-gray-100 rounded-xl">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 font-bold border-b border-gray-100">
                        <th className="p-3">Student Name</th>
                        <th className="p-3 text-center">Register No</th>
                        <th className="p-3 text-center">Status Toggle</th>
                        <th className="p-3 text-right">Attendance Percent</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {students.map((stu) => (
                        <tr key={stu.id} className="hover:bg-gray-50/50">
                          <td className="p-3 font-semibold text-gray-700">{stu.name}</td>
                          <td className="p-3 text-center text-gray-500">{stu.regNo}</td>
                          <td className="p-3 text-center">
                            <button
                              type="button"
                              onClick={() => toggleAttendance(stu.id)}
                              className={`px-3.5 py-1 rounded-lg font-bold text-[10px] w-20 transition-all ${
                                attendanceStates[stu.id]
                                  ? "bg-green-500 text-white shadow-sm"
                                  : "bg-red-500 text-white shadow-sm"
                              }`}
                            >
                              {attendanceStates[stu.id] ? "Present" : "Absent"}
                            </button>
                          </td>
                          <td className="p-3 text-right text-gray-500">{stu.attendancePercent}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl transition shadow-sm text-xs"
                >
                  Save Attendance Sheet ✅
                </button>
              </form>
            </div>
          )}

          {/* Upload Marks */}
          {activePage === "Upload Marks" && (
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="border-b border-gray-55 pb-3 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-gray-800 text-sm">Upload Student Test Marks</h3>
                  <p className="text-gray-400 text-xs mt-0.5">Input assessments and assignments scores. Max Marks: Tests (50), Assignment (10).</p>
                </div>
                
                {marksSaved && (
                  <span className="bg-green-50 border border-green-200 text-green-700 font-semibold px-3.5 py-1.5 rounded-lg text-xs animate-pulse">
                    ✓ Assessment marks uploaded successfully!
                  </span>
                )}
              </div>

              {/* Assessment setup row */}
              <form onSubmit={handleMarksSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Subject *</label>
                    <select
                      value={selectedMarkSubject}
                      onChange={(e) => setSelectedMarkSubject(e.target.value)}
                      className="w-full border border-gray-250 rounded-lg px-2.5 py-1.5 text-xs text-gray-750 bg-gray-50 focus:outline-none"
                    >
                      <option>Design and Analysis of Algorithms</option>
                      <option>Software Engineering</option>
                      <option>Mobile Application Lab</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Assessment Type *</label>
                    <select
                      value={selectedAssessment}
                      onChange={(e) => setSelectedAssessment(e.target.value)}
                      className="w-full border border-gray-250 rounded-lg px-2.5 py-1.5 text-xs text-gray-750 bg-gray-50 focus:outline-none"
                    >
                      <option value="test1">Internal Assessment Test 1 (Max: 50)</option>
                      <option value="test2">Internal Assessment Test 2 (Max: 50)</option>
                      <option value="assignment">Assignment Sheet (Max: 10)</option>
                    </select>
                  </div>
                </div>

                {/* Marks input fields list */}
                <div className="overflow-x-auto border border-gray-100 rounded-xl">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 font-bold border-b border-gray-100">
                        <th className="p-3">Student Name</th>
                        <th className="p-3 text-center">Register No</th>
                        <th className="p-3 text-right">Enter Score</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {students.map((stu) => (
                        <tr key={stu.id} className="hover:bg-gray-50/50">
                          <td className="p-3 font-semibold text-gray-700">{stu.name}</td>
                          <td className="p-3 text-center text-gray-500">{stu.regNo}</td>
                          <td className="p-3 text-right">
                            <input
                              type="number"
                              required
                              max={selectedAssessment === "assignment" ? 10 : 50}
                              min={0}
                              value={tempMarks[stu.id] ?? ""}
                              onChange={(e) => handleMarkChange(stu.id, e.target.value)}
                              placeholder={`0 - ${selectedAssessment === "assignment" ? 10 : 50}`}
                              className="border border-gray-200 rounded px-2.5 py-1 text-xs text-right w-24 bg-gray-50 focus:bg-white text-gray-700 focus:outline-none"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl transition shadow-sm text-xs"
                >
                  Upload Assessment Marks 🚀
                </button>
              </form>
            </div>
          )}

          {/* Share Materials */}
          {activePage === "Share Materials" && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              {/* Form to add notes links */}
              <div className="md:col-span-5 bg-white border border-gray-100 rounded-2xl p-4 md:p-5 shadow-sm h-fit space-y-4">
                <h3 className="font-bold text-gray-800 text-sm border-b border-gray-55 pb-2">Share Study Resource</h3>
                
                <form onSubmit={handleAddMaterial} className="space-y-3.5 text-xs text-gray-700">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Resource Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Unit 4 Heap Trees Lectures"
                      value={newMaterialTitle}
                      onChange={(e) => setNewMaterialTitle(e.target.value)}
                      className="w-full border border-gray-250 rounded-lg px-3 py-1.5 text-xs bg-gray-50 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Resource Type</label>
                      <select
                        value={newMaterialType}
                        onChange={(e) => setNewMaterialType(e.target.value)}
                        className="w-full border border-gray-255 rounded-lg px-2 py-1.5 text-xs bg-gray-50 focus:outline-none"
                      >
                        <option>Notes</option>
                        <option>Syllabus</option>
                        <option>Slides</option>
                        <option>Question Bank</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">File Link (Mock)</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. DAA_Unit_4.pdf"
                        value={newMaterialFile}
                        onChange={(e) => setNewMaterialFile(e.target.value)}
                        className="w-full border border-gray-250 rounded-lg px-2.5 py-1.5 text-xs bg-gray-50 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl transition shadow-sm text-xs"
                  >
                    Share with Class 📚
                  </button>
                </form>
              </div>

              {/* Shared materials list */}
              <div className="md:col-span-7 bg-white border border-gray-100 rounded-2xl p-4 md:p-5 shadow-sm space-y-4">
                <h3 className="font-bold text-gray-800 text-sm border-b border-gray-55 pb-2">Shared Materials Directory</h3>
                
                <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                  {materials.map((m) => (
                    <div key={m.id} className="bg-gray-50 border border-gray-100 rounded-xl p-3 flex items-center justify-between gap-3 text-xs">
                      <div className="space-y-1">
                        <p className="font-bold text-gray-700 leading-snug">{m.title}</p>
                        <div className="flex gap-2 text-[10px] text-gray-400">
                          <span className="font-semibold text-blue-600 uppercase bg-blue-50 px-1.5 rounded">{m.type}</span>
                          <span>📎 File: {m.file}</span>
                          <span>📅 Shared: {m.date}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteMaterial(m.id)}
                        className="text-red-500 hover:text-red-700 font-bold shrink-0 hover:bg-red-50 w-7 h-7 rounded-full flex items-center justify-center transition"
                        title="Delete Resource"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Publish Circular */}
          {activePage === "Publish Circular" && (
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm max-w-xl mx-auto space-y-4">
              <div className="border-b border-gray-55 pb-3">
                <h3 className="font-bold text-gray-800 text-sm">Publish Department Circular notice</h3>
                <p className="text-gray-400 text-xs mt-0.5">Post notices regarding classes, tests, or events visible to all students.</p>
              </div>

              {circularPublished && (
                <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg text-xs font-semibold animate-pulse">
                  ✓ Circular bulletin published successfully on Student/Parent dashboards!
                </div>
              )}

              <form onSubmit={handleCircularSubmit} className="space-y-4 text-xs text-gray-750">
                <div className="grid grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Circular Category</label>
                    <select
                      value={circularCategory}
                      onChange={(e) => setCircularCategory(e.target.value)}
                      className="w-full border border-gray-250 rounded-lg px-2 py-1.5 text-xs bg-gray-50 focus:outline-none font-medium"
                    >
                      <option>Faculty Messages</option>
                      <option>HOD Messages</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Importance</label>
                    <select
                      value={circularImportance}
                      onChange={(e) => setCircularImportance(e.target.value)}
                      className="w-full border border-gray-250 rounded-lg px-2.5 py-1.5 text-xs bg-gray-50 focus:outline-none font-medium"
                    >
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Circular Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Schedule of DAA Lab Practice Session"
                    value={circularTitle}
                    onChange={(e) => setCircularTitle(e.target.value)}
                    className="w-full border border-gray-250 rounded-lg px-3 py-1.5 text-xs bg-gray-50 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Bulletin Content *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Enter detailed notice information, instructions, deadlines etc..."
                    value={circularContent}
                    onChange={(e) => setCircularContent(e.target.value)}
                    className="w-full border border-gray-250 rounded-lg px-3 py-1.5 text-xs bg-gray-50 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl transition shadow-sm text-xs"
                >
                  Broadcast Circular Circular 📢
                </button>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
