import React, { useState } from "react";

const INITIAL_DRIVES = [
  {
    id: 1,
    company: "Infosys",
    role: "Systems Engineer Specialist",
    ctc: "5.0 - 6.2 LPA",
    eligibility: "CGPA >= 7.0, B.Sc CS / BCA / MCA / B.Tech",
    date: "July 30, 2026",
    description: "Infosys is looking for enthusiastic developers to join their Specialist Programmer and Systems Engineer roles. Core skills required: Java/Python, RDBMS, and strong problem-solving capabilities.",
    status: "Open"
  },
  {
    id: 2,
    company: "Zoho Corporation",
    role: "Software Developer",
    ctc: "7.0 - 8.5 LPA",
    eligibility: "No active backlogs, Any Degree",
    date: "August 05, 2026",
    description: "Zoho is hiring Software Developers for its product development teams. Evaluation process consists of Written Coding, Advanced Programming, and Technical interviews.",
    status: "Open"
  },
  {
    id: 3,
    company: "Wipro",
    role: "Project Engineer",
    ctc: "3.6 - 4.5 LPA",
    eligibility: "CGPA >= 6.0, CSE/IT/ECE",
    date: "August 12, 2026",
    description: "Wipro Elite National Talent Hunt is a freshers hiring initiative. Candidates will be assessed on quantitative aptitude, programming code, and English communications.",
    status: "Open"
  },
  {
    id: 4,
    company: "TCS (Tata Consultancy Services)",
    role: "TCS Ninja / Digital",
    ctc: "3.36 - 7.0 LPA",
    eligibility: "CGPA >= 6.5, All Engineering / CS branches",
    date: "August 18, 2026",
    description: "TCS National Qualifier Test (NQT) determines cognitive skills, professional skills and coding skills for entry-level roles at TCS.",
    status: "Open"
  }
];

const INITIAL_APPLICATIONS = [
  {
    id: 101,
    company: "Cognizant",
    role: "GenC Developer",
    ctc: "4.0 LPA",
    appliedDate: "June 15, 2026",
    status: "Interview Scheduled",
    steps: [
      { name: "Registered", date: "June 15", completed: true },
      { name: "Aptitude Test", date: "June 22", completed: true },
      { name: "Technical Interview", date: "July 10", completed: false },
      { name: "HR Interview", date: "Pending", completed: false }
    ]
  },
  {
    id: 102,
    company: "Capgemini",
    role: "Analyst",
    ctc: "4.25 LPA",
    appliedDate: "June 10, 2026",
    status: "Test Cleared",
    steps: [
      { name: "Registered", date: "June 10", completed: true },
      { name: "Aptitude Test", date: "June 29", completed: true },
      { name: "Technical Interview", date: "Pending", completed: false },
      { name: "HR Interview", date: "Pending", completed: false }
    ]
  }
];

const RECRUITERS = [
  { name: "Infosys", logo: "💻", count: "34 Selected last year" },
  { name: "Zoho", logo: "⚙️", count: "12 Selected last year" },
  { name: "TCS", logo: "🏢", count: "45 Selected last year" },
  { name: "Wipro", logo: "🌐", count: "28 Selected last year" },
  { name: "Cognizant", logo: "📦", count: "30 Selected last year" },
  { name: "Federal Bank", logo: "🏦", count: "8 Selected last year" },
  { name: "Accenture", logo: "📊", count: "22 Selected last year" },
  { name: "UST Global", logo: "💾", count: "19 Selected last year" }
];

export default function Placement() {
  const [activeTab, setActiveTab] = useState("activeDrives");
  const [drives, setDrives] = useState(INITIAL_DRIVES);
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
  const [selectedDrive, setSelectedDrive] = useState(null);

  const stats = [
    { value: "92%", label: "Placement Rate", icon: "📈", color: "text-green-600 bg-green-50" },
    { value: "12 LPA", label: "Highest Package", icon: "💰", color: "text-indigo-600 bg-indigo-50" },
    { value: "4.8 LPA", label: "Average Package", icon: "💼", color: "text-blue-600 bg-blue-50" },
    { value: "45+", label: "Companies Visited", icon: "🏛️", color: "text-amber-600 bg-amber-50" }
  ];

  const handleRegisterDrive = (drive) => {
    // Add to applied applications list
    const alreadyApplied = applications.some((app) => app.company === drive.company);
    if (alreadyApplied) {
      alert(`You are already registered for ${drive.company}!`);
      return;
    }

    const newApp = {
      id: Date.now(),
      company: drive.company,
      role: drive.role,
      ctc: drive.ctc,
      appliedDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "Registered",
      steps: [
        { name: "Registered", date: "Today", completed: true },
        { name: "Aptitude Test", date: "Pending", completed: false },
        { name: "Technical Interview", date: "Pending", completed: false },
        { name: "HR Interview", date: "Pending", completed: false }
      ]
    };

    setApplications([newApp, ...applications]);
    
    // Disable or update registration status of that drive
    setDrives(drives.map((d) => d.id === drive.id ? { ...d, status: "Registered" } : d));
    
    alert(`Successfully registered for ${drive.company} - ${drive.role}! Tracking details are added under "My Applications".`);
    setSelectedDrive(null);
  };

  return (
    <div className="p-4 md:p-6 space-y-5 max-w-6xl mx-auto">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-blue-900 via-indigo-850 to-indigo-950 rounded-2xl p-5 md:p-6 text-white relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-xl md:text-2xl font-bold">Placement Cell Portal 💼</h1>
          <p className="text-blue-200 text-xs md:text-sm mt-1">
            Build your career. Discover drives, apply for opportunities, and access study materials.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center text-lg`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider leading-none mb-1">{stat.label}</p>
              <p className="font-bold text-gray-800 text-sm md:text-base leading-tight">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Sub Tabs Navigation */}
      <div className="bg-white border border-gray-100 rounded-xl p-1.5 shadow-sm flex flex-wrap gap-1.5">
        {[
          { id: "activeDrives", label: "Active Drives 📢" },
          { id: "myApplications", label: `My Applications (${applications.length}) 📁` },
          { id: "recruiters", label: "Our Recruiters 🤝" },
          { id: "prepPortal", label: "Preparation Portal 📚" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex-1 md:flex-initial ${
              activeTab === tab.id
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="space-y-4">
        {/* Active Drives */}
        {activeTab === "activeDrives" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {drives.map((drive) => {
              const alreadyApplied = applications.some((app) => app.company === drive.company);
              return (
                <div key={drive.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex flex-col justify-between hover:border-blue-200 transition-colors">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-800 text-sm">{drive.company}</h3>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        alreadyApplied || drive.status === "Registered"
                          ? "bg-green-50 text-green-600 border border-green-100"
                          : "bg-blue-50 text-blue-600 border border-blue-100"
                      }`}>
                        {alreadyApplied || drive.status === "Registered" ? "✓ Registered" : "Open"}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-blue-600 mb-2">{drive.role}</p>
                    
                    <div className="space-y-1.5 mb-3 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-400">CTC Package:</span>
                        <span className="font-medium text-gray-700">{drive.ctc}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Eligibility:</span>
                        <span className="font-medium text-gray-700 text-[11px] truncate max-w-[200px]" title={drive.eligibility}>
                          {drive.eligibility}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Drive Date:</span>
                        <span className="font-medium text-gray-700">{drive.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 border-t border-gray-50 pt-3 mt-3">
                    <button
                      onClick={() => setSelectedDrive(drive)}
                      className="bg-gray-100 hover:bg-gray-250 text-gray-600 text-xs font-semibold px-3 py-2 rounded-lg flex-1 transition"
                    >
                      View Details
                    </button>
                    <button
                      disabled={alreadyApplied || drive.status === "Registered"}
                      onClick={() => handleRegisterDrive(drive)}
                      className={`text-xs font-semibold px-3 py-2 rounded-lg flex-1 transition text-center ${
                        alreadyApplied || drive.status === "Registered"
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-150"
                          : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                      }`}
                    >
                      {alreadyApplied || drive.status === "Registered" ? "Registered" : "Register"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* My Applications */}
        {activeTab === "myApplications" && (
          <div className="space-y-4">
            {applications.length > 0 ? (
              applications.map((app) => (
                <div key={app.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm space-y-4">
                  {/* Top summary */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-gray-55">
                    <div>
                      <h3 className="font-bold text-gray-800 text-sm flex items-center gap-2">
                        {app.company} 
                        <span className="text-xs font-medium text-blue-600">({app.role})</span>
                      </h3>
                      <p className="text-[10px] text-gray-400 mt-0.5">Applied on: {app.appliedDate} · Package: {app.ctc}</p>
                    </div>
                    <span className="bg-blue-50 text-blue-700 border border-blue-100 font-semibold px-3 py-1 rounded-lg text-[10px] self-start sm:self-auto uppercase tracking-wide">
                      Status: {app.status}
                    </span>
                  </div>

                  {/* Status Steps Tracker */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-1">
                    {app.steps.map((step, idx) => (
                      <div key={idx} className="relative flex items-start gap-2.5">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 shadow-sm ${
                          step.completed 
                            ? "bg-green-500 text-white" 
                            : "bg-gray-100 text-gray-400 border border-gray-200"
                        }`}>
                          {step.completed ? "✓" : idx + 1}
                        </div>
                        <div>
                          <p className={`text-xs font-semibold leading-tight ${step.completed ? "text-gray-800" : "text-gray-400"}`}>
                            {step.name}
                          </p>
                          <p className="text-[9px] text-gray-450 mt-0.5">{step.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl border border-gray-100 p-12 text-center flex flex-col items-center justify-center gap-3">
                <span className="text-4xl">📁</span>
                <p className="text-sm font-semibold text-gray-600">No applications yet</p>
                <p className="text-xs text-gray-400">Register for active drives above to track your recruitment process.</p>
              </div>
            )}
          </div>
        )}

        {/* Our Recruiters */}
        {activeTab === "recruiters" && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {RECRUITERS.map((recruiter) => (
              <div key={recruiter.name} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm text-center space-y-2.5 flex flex-col items-center justify-center hover:border-blue-150 hover:shadow-xs transition">
                <span className="text-3xl bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center shadow-inner">
                  {recruiter.logo}
                </span>
                <div>
                  <p className="font-bold text-gray-800 text-xs">{recruiter.name}</p>
                  <p className="text-[10px] text-gray-400 font-medium mt-0.5">{recruiter.count}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Prep Portal */}
        {activeTab === "prepPortal" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "Aptitude & Technical MCQ Prep",
                desc: "Practice quantitative aptitude, logical reasoning, and programming questions commonly asked in MNC online tests.",
                links: ["Quantitative Practice", "Logical Reasoning Questions", "C/C++/Java MCQs"],
                icon: "📝"
              },
              {
                title: "Resume & Portfolio Building",
                desc: "Get ATS-friendly resume templates, guidelines for building GitHub portfolios, and creating active LinkedIn profiles.",
                links: ["ATS Resume Template (Word)", "Sample GitHub Projects Guide", "LinkedIn Profile Tips"],
                icon: "📄"
              },
              {
                title: "Interview Cracking Tips",
                desc: "Read experience logs of placed seniors. Prepare for technical rounds (DSA, OOPs, DBMS) and standard HR interview questions.",
                links: ["Senior Interview Experiences", "Top 50 DSA Prep Sheet", "Standard HR Q&A Guide"],
                icon: "💬"
              }
            ].map((prep, idx) => (
              <div key={idx} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm space-y-3.5 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{prep.icon}</span>
                    <h3 className="font-bold text-gray-800 text-xs md:text-sm">{prep.title}</h3>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed">{prep.desc}</p>
                </div>
                
                <div className="border-t border-gray-50 pt-3 space-y-1.5">
                  {prep.links.map((link) => (
                    <a
                      key={link}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        alert(`Opening resource: ${link}`);
                      }}
                      className="block text-xs text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                    >
                      🔗 {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Drive Detail Modal ── */}
      {selectedDrive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-xl animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-blue-900 p-4 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-xs md:text-sm">{selectedDrive.company}</h3>
                <p className="text-[10px] text-blue-200">{selectedDrive.role}</p>
              </div>
              <button
                onClick={() => setSelectedDrive(null)}
                className="text-white hover:text-blue-100 p-1 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-xs"
              >
                ✕ Close
              </button>
            </div>

            {/* Content Body */}
            <div className="p-5 space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-700">Job Description:</p>
                <p className="text-gray-600 text-xs leading-relaxed whitespace-pre-line">
                  {selectedDrive.description}
                </p>
              </div>

              <div className="h-px bg-gray-100" />

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-gray-400">CTC Package:</p>
                  <p className="font-bold text-gray-700">{selectedDrive.ctc}</p>
                </div>
                <div>
                  <p className="text-gray-400">Drive Date:</p>
                  <p className="font-bold text-gray-700">{selectedDrive.date}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-400">Eligible Branches / Criteria:</p>
                  <p className="font-bold text-gray-700">{selectedDrive.eligibility}</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-5 py-3.5 border-t border-gray-100 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedDrive(null)}
                className="bg-white border border-gray-200 hover:bg-gray-50 text-xs font-semibold px-4 py-2 rounded-xl text-gray-600 transition"
              >
                Cancel
              </button>
              
              {applications.some((app) => app.company === selectedDrive.company) ? (
                <span className="bg-green-150 text-green-700 border border-green-200 font-semibold px-4 py-2 rounded-xl text-xs flex items-center gap-1">
                  ✓ Registered
                </span>
              ) : (
                <button
                  onClick={() => handleRegisterDrive(selectedDrive)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition shadow-sm"
                >
                  Register Now 🚀
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
