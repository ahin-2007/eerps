import { useState } from "react";

// ── Subjects from timetable ──────────────────────────────────────────────────
const SUBJECTS = [
  { code: "OS",     name: "Operating Systems",  short: "OS",       icon: "⚙️",  color: { bg: "#EAF3DE", border: "#3B6D11", text: "#27500A", bar: "#3B6D11" } },
  { code: "NET",    name: ".NET Programming",   short: ".NET",     icon: "🔷",  color: { bg: "#EEEDFE", border: "#534AB7", text: "#3C3489", bar: "#534AB7" } },
  { code: "SPM",    name: "Soft. Project Mgmt", short: "SPM",      icon: "📋",  color: { bg: "#FAEEDA", border: "#854F0B", text: "#633806", bar: "#854F0B" } },
  { code: "AI",     name: "Artificial Intel.",  short: "AI",       icon: "🤖",  color: { bg: "#FAECE7", border: "#993C1D", text: "#712B13", bar: "#993C1D" } },
  { code: "NM",     name: "Numerical Methods",  short: "NM",       icon: "🔢",  color: { bg: "#FBEAF0", border: "#993556", text: "#72243E", bar: "#993556" } },
  { code: "ASPNET", name: "ASP.NET Lab",        short: "ASP.NET",  icon: "🖥️",  color: { bg: "#E6F1FB", border: "#185FA5", text: "#0C447C", bar: "#185FA5" } },
  { code: "PROJ",   name: "Project Lab",        short: "Project",  icon: "🗂️",  color: { bg: "#E1F5EE", border: "#0F6E56", text: "#085041", bar: "#0F6E56" } },
];

// ── Notes data ───────────────────────────────────────────────────────────────
const NOTES = {
  OS: [
    { id: "os-1", title: "Unit I – Process Management",        type: "pdf",  size: "1.2 MB", pages: 24, uploaded: "12 Jun 2026", uploader: "Dr. N. Suresh Singh",  downloads: 142 },
    { id: "os-2", title: "Unit II – Memory Management",        type: "pdf",  size: "980 KB", pages: 18, uploaded: "19 Jun 2026", uploader: "Dr. N. Suresh Singh",  downloads: 118 },
    { id: "os-3", title: "Unit III – File Systems",            type: "pdf",  size: "1.4 MB", pages: 22, uploaded: "01 Jul 2026", uploader: "Dr. N. Suresh Singh",  downloads: 97  },
    { id: "os-4", title: "Unit IV – Deadlocks & Scheduling",   type: "pdf",  size: "860 KB", pages: 16, uploaded: "14 Jul 2026", uploader: "Dr. N. Suresh Singh",  downloads: 73  },
    { id: "os-5", title: "OS Reference Slides (Full)",         type: "ppt",  size: "3.1 MB", pages: 84, uploaded: "15 Jun 2026", uploader: "Dr. N. Suresh Singh",  downloads: 201 },
  ],
  NET: [
    { id: "net-1", title: "C# Basics & OOP Concepts",          type: "pdf",  size: "1.5 MB", pages: 30, uploaded: "13 Jun 2026", uploader: "Dr. S. Priya Vasanth", downloads: 165 },
    { id: "net-2", title: "ASP.NET MVC Architecture",          type: "pdf",  size: "1.1 MB", pages: 26, uploaded: "25 Jun 2026", uploader: "Dr. S. Priya Vasanth", downloads: 134 },
    { id: "net-3", title: "Entity Framework & LINQ",           type: "pdf",  size: "900 KB", pages: 20, uploaded: "07 Jul 2026", uploader: "Dr. S. Priya Vasanth", downloads: 89  },
    { id: "net-4", title: "Web API & REST Services",           type: "pdf",  size: "780 KB", pages: 17, uploaded: "21 Jul 2026", uploader: "Dr. S. Priya Vasanth", downloads: 54  },
    { id: "net-5", title: ".NET Lab Manual 2026–27",           type: "doc",  size: "2.3 MB", pages: 56, uploaded: "14 Jun 2026", uploader: "Dr. S. Priya Vasanth", downloads: 188 },
  ],
  SPM: [
    { id: "spm-1", title: "Unit I – Project Planning Basics",  type: "pdf",  size: "1.0 MB", pages: 21, uploaded: "16 Jun 2026", uploader: "Mr. G. Borgia Crusu Venthan", downloads: 110 },
    { id: "spm-2", title: "Unit II – Risk Management",         type: "pdf",  size: "870 KB", pages: 19, uploaded: "28 Jun 2026", uploader: "Mr. G. Borgia Crusu Venthan", downloads: 87  },
    { id: "spm-3", title: "Unit III – Agile & Scrum",          type: "pdf",  size: "760 KB", pages: 15, uploaded: "09 Jul 2026", uploader: "Mr. G. Borgia Crusu Venthan", downloads: 63  },
    { id: "spm-4", title: "SPM Case Studies Compilation",      type: "pdf",  size: "1.8 MB", pages: 38, uploaded: "17 Jun 2026", uploader: "Mr. G. Borgia Crusu Venthan", downloads: 145 },
  ],
  AI: [
    { id: "ai-1", title: "Unit I – Intelligent Agents",        type: "pdf",  size: "1.3 MB", pages: 28, uploaded: "15 Jun 2026", uploader: "Dr. J.P. Medlin Julia",  downloads: 156 },
    { id: "ai-2", title: "Unit II – Search Algorithms",        type: "pdf",  size: "1.6 MB", pages: 32, uploaded: "27 Jun 2026", uploader: "Dr. J.P. Medlin Julia",  downloads: 133 },
    { id: "ai-3", title: "Unit III – Knowledge Representation",type: "pdf",  size: "1.1 MB", pages: 24, uploaded: "10 Jul 2026", uploader: "Dr. J.P. Medlin Julia",  downloads: 91  },
    { id: "ai-4", title: "Unit IV – Machine Learning Intro",   type: "pdf",  size: "2.0 MB", pages: 40, uploaded: "22 Jul 2026", uploader: "Dr. J.P. Medlin Julia",  downloads: 67  },
    { id: "ai-5", title: "AI Algorithm Cheat Sheet",           type: "pdf",  size: "420 KB", pages: 6,  uploaded: "18 Jun 2026", uploader: "Dr. J.P. Medlin Julia",  downloads: 312 },
  ],
  NM: [
    { id: "nm-1", title: "Unit I – Error Analysis & Roots",    type: "pdf",  size: "980 KB", pages: 22, uploaded: "16 Jun 2026", uploader: "Dr. J.P. Medlin Julia",  downloads: 98  },
    { id: "nm-2", title: "Unit II – Interpolation Methods",    type: "pdf",  size: "850 KB", pages: 18, uploaded: "30 Jun 2026", uploader: "Dr. J.P. Medlin Julia",  downloads: 74  },
    { id: "nm-3", title: "Unit III – Numerical Integration",   type: "pdf",  size: "720 KB", pages: 16, uploaded: "13 Jul 2026", uploader: "Dr. J.P. Medlin Julia",  downloads: 55  },
    { id: "nm-4", title: "NM Formula Sheet",                   type: "pdf",  size: "300 KB", pages: 4,  uploaded: "20 Jun 2026", uploader: "Dr. J.P. Medlin Julia",  downloads: 267 },
  ],
  ASPNET: [
    { id: "asp-1", title: "ASP.NET Lab Exercises 1–10",        type: "pdf",  size: "1.7 MB", pages: 34, uploaded: "15 Jun 2026", uploader: "Dr. S. Priya Vasanth", downloads: 178 },
    { id: "asp-2", title: "Lab Exercises 11–20",               type: "pdf",  size: "1.9 MB", pages: 38, uploaded: "02 Jul 2026", uploader: "Dr. S. Priya Vasanth", downloads: 124 },
    { id: "asp-3", title: "Database Connectivity Guide",       type: "pdf",  size: "1.1 MB", pages: 22, uploaded: "19 Jul 2026", uploader: "Dr. S. Priya Vasanth", downloads: 86  },
  ],
  PROJ: [
    { id: "proj-1", title: "Project Report Format & Template", type: "doc",  size: "560 KB", pages: 12, uploaded: "15 Jun 2026", uploader: "Dr. J.P. Medlin Julia",  downloads: 234 },
    { id: "proj-2", title: "Literature Review Guidelines",     type: "pdf",  size: "480 KB", pages: 10, uploaded: "22 Jun 2026", uploader: "Dr. J.P. Medlin Julia",  downloads: 145 },
    { id: "proj-3", title: "Presentation Rubric 2026–27",      type: "pdf",  size: "320 KB", pages: 5,  uploaded: "01 Jul 2026", uploader: "Dr. J.P. Medlin Julia",  downloads: 198 },
  ],
};

// ── Question Papers ──────────────────────────────────────────────────────────
const QP_YEARS = ["2024–25", "2023–24", "2022–23", "2021–22"];

const QUESTION_PAPERS = {
  OS: [
    { year: "2024–25", exam: "End Semester", month: "Nov 2024", type: "Theory",  pages: 2, size: "340 KB", downloads: 289 },
    { year: "2024–25", exam: "I Internal",   month: "Sep 2024", type: "Internal", pages: 1, size: "180 KB", downloads: 201 },
    { year: "2023–24", exam: "End Semester", month: "Nov 2023", type: "Theory",  pages: 2, size: "310 KB", downloads: 345 },
    { year: "2023–24", exam: "I Internal",   month: "Sep 2023", type: "Internal", pages: 1, size: "165 KB", downloads: 267 },
    { year: "2022–23", exam: "End Semester", month: "Nov 2022", type: "Theory",  pages: 2, size: "295 KB", downloads: 412 },
    { year: "2021–22", exam: "End Semester", month: "Nov 2021", type: "Theory",  pages: 2, size: "280 KB", downloads: 388 },
  ],
  NET: [
    { year: "2024–25", exam: "End Semester", month: "Nov 2024", type: "Theory",  pages: 2, size: "360 KB", downloads: 265 },
    { year: "2024–25", exam: "I Internal",   month: "Sep 2024", type: "Internal", pages: 1, size: "190 KB", downloads: 189 },
    { year: "2023–24", exam: "End Semester", month: "Nov 2023", type: "Theory",  pages: 2, size: "325 KB", downloads: 320 },
    { year: "2022–23", exam: "End Semester", month: "Nov 2022", type: "Theory",  pages: 2, size: "305 KB", downloads: 378 },
    { year: "2021–22", exam: "End Semester", month: "Nov 2021", type: "Theory",  pages: 2, size: "290 KB", downloads: 355 },
  ],
  SPM: [
    { year: "2024–25", exam: "End Semester", month: "Nov 2024", type: "Theory",  pages: 2, size: "335 KB", downloads: 241 },
    { year: "2023–24", exam: "End Semester", month: "Nov 2023", type: "Theory",  pages: 2, size: "300 KB", downloads: 298 },
    { year: "2022–23", exam: "End Semester", month: "Nov 2022", type: "Theory",  pages: 2, size: "285 KB", downloads: 367 },
    { year: "2021–22", exam: "End Semester", month: "Nov 2021", type: "Theory",  pages: 2, size: "275 KB", downloads: 344 },
  ],
  AI: [
    { year: "2024–25", exam: "End Semester", month: "Nov 2024", type: "Theory",  pages: 2, size: "355 KB", downloads: 302 },
    { year: "2024–25", exam: "I Internal",   month: "Sep 2024", type: "Internal", pages: 1, size: "195 KB", downloads: 218 },
    { year: "2023–24", exam: "End Semester", month: "Nov 2023", type: "Theory",  pages: 2, size: "320 KB", downloads: 356 },
    { year: "2022–23", exam: "End Semester", month: "Nov 2022", type: "Theory",  pages: 2, size: "300 KB", downloads: 423 },
    { year: "2021–22", exam: "End Semester", month: "Nov 2021", type: "Theory",  pages: 2, size: "288 KB", downloads: 401 },
  ],
  NM: [
    { year: "2024–25", exam: "End Semester", month: "Nov 2024", type: "Theory",  pages: 2, size: "325 KB", downloads: 221 },
    { year: "2023–24", exam: "End Semester", month: "Nov 2023", type: "Theory",  pages: 2, size: "295 KB", downloads: 278 },
    { year: "2022–23", exam: "End Semester", month: "Nov 2022", type: "Theory",  pages: 2, size: "280 KB", downloads: 334 },
    { year: "2021–22", exam: "End Semester", month: "Nov 2021", type: "Theory",  pages: 2, size: "268 KB", downloads: 312 },
  ],
  ASPNET: [
    { year: "2024–25", exam: "Practical Exam", month: "Nov 2024", type: "Practical", pages: 1, size: "210 KB", downloads: 187 },
    { year: "2023–24", exam: "Practical Exam", month: "Nov 2023", type: "Practical", pages: 1, size: "195 KB", downloads: 245 },
    { year: "2022–23", exam: "Practical Exam", month: "Nov 2022", type: "Practical", pages: 1, size: "185 KB", downloads: 298 },
  ],
  PROJ: [
    { year: "2024–25", exam: "Viva Questions", month: "Nov 2024", type: "Viva", pages: 1, size: "160 KB", downloads: 312 },
    { year: "2023–24", exam: "Viva Questions", month: "Nov 2023", type: "Viva", pages: 1, size: "150 KB", downloads: 389 },
  ],
};

// ── File type meta ────────────────────────────────────────────────────────────
const FILE_META = {
  pdf:  { label: "PDF",  color: "#dc2626", bg: "#fef2f2", icon: "📄" },
  ppt:  { label: "PPT",  color: "#d97706", bg: "#fffbeb", icon: "📊" },
  doc:  { label: "DOC",  color: "#185FA5", bg: "#E6F1FB", icon: "📝" },
};

const EXAM_TYPE_META = {
  Theory:    { color: "#185FA5", bg: "#E6F1FB", icon: "📝" },
  Internal:  { color: "#854F0B", bg: "#FAEEDA", icon: "📋" },
  Practical: { color: "#0F6E56", bg: "#E1F5EE", icon: "💻" },
  Viva:      { color: "#6B21A8", bg: "#F5F3FF", icon: "🎤" },
};

// ── Sub-components ────────────────────────────────────────────────────────────

function FileCard({ item, color }) {
  const [downloaded, setDownloaded] = useState(false);
  const fm = FILE_META[item.type] || FILE_META.pdf;

  return (
    <div className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all bg-white group">
      {/* File icon */}
      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
        style={{ background: fm.bg }}>
        {fm.icon}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-bold text-gray-800 leading-tight">{item.title}</p>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded"
            style={{ background: fm.bg, color: fm.color }}>{fm.label}</span>
          <span className="text-[10px] text-gray-400">{item.pages} pages</span>
          <span className="text-[10px] text-gray-400">{item.size}</span>
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-[10px] text-gray-400 truncate">{item.uploader}</span>
          <span className="text-[10px] text-gray-400 shrink-0 ml-2">⬇ {item.downloads}</span>
        </div>
      </div>

      {/* Download button */}
      <button
        onClick={() => setDownloaded(true)}
        className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
          downloaded
            ? "bg-green-100 text-green-600"
            : "text-white hover:opacity-90 active:scale-95"
        }`}
        style={downloaded ? {} : { background: color.bar }}
        title="Download"
      >
        {downloaded ? "✓" : "⬇"}
      </button>
    </div>
  );
}

function QPCard({ qp, color }) {
  const [downloaded, setDownloaded] = useState(false);
  const em = EXAM_TYPE_META[qp.type] || EXAM_TYPE_META.Theory;

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all bg-white">
      {/* Year badge */}
      <div className="w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0"
        style={{ background: em.bg }}>
        <span className="text-base leading-none">{em.icon}</span>
        <span className="text-[8px] font-black mt-0.5" style={{ color: em.color }}>
          {qp.year.split("–")[0]}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <p className="text-[12px] font-bold text-gray-800">{qp.exam}</p>
          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded"
            style={{ background: em.bg, color: em.color }}>{qp.type}</span>
        </div>
        <div className="flex items-center gap-3 mt-0.5">
          <span className="text-[10px] text-gray-400">{qp.month}</span>
          <span className="text-[10px] text-gray-400">{qp.pages}p · {qp.size}</span>
          <span className="text-[10px] text-gray-400 ml-auto">⬇ {qp.downloads}</span>
        </div>
      </div>

      {/* Download */}
      <button
        onClick={() => setDownloaded(true)}
        className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all text-sm ${
          downloaded
            ? "bg-green-100 text-green-600"
            : "text-white hover:opacity-90 active:scale-95"
        }`}
        style={downloaded ? {} : { background: color.bar }}
      >
        {downloaded ? "✓" : "⬇"}
      </button>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Notes() {
  const [tab,           setTab]           = useState("notes");       // "notes" | "qp"
  const [activeSubject, setActiveSubject] = useState("OS");
  const [qpYear,        setQpYear]        = useState("all");
  const [search,        setSearch]        = useState("");

  const subject = SUBJECTS.find(s => s.code === activeSubject);
  const color   = subject.color;

  const notes = (NOTES[activeSubject] || []).filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  const qps = (QUESTION_PAPERS[activeSubject] || []).filter(q =>
    (qpYear === "all" || q.year === qpYear) &&
    q.exam.toLowerCase().includes(search.toLowerCase())
  );

  // Total downloads for this subject
  const totalDownloads = [
    ...(NOTES[activeSubject] || []),
    ...(QUESTION_PAPERS[activeSubject] || []),
  ].reduce((s, i) => s + i.downloads, 0);

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-4">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-lg font-bold text-gray-800">Notes & Question Papers</h1>
          <p className="text-[11px] text-gray-400">Dept. of Computer Applications · Odd Semester 2026–27</p>
        </div>
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search files..."
            className="pl-8 pr-4 py-2 border border-gray-200 rounded-xl text-[12px] bg-gray-50 focus:outline-none focus:border-blue-400 focus:bg-white transition w-full sm:w-48"
          />
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-[12px]">🔍</span>
          {search && (
            <button onClick={() => setSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-[10px]">✕</button>
          )}
        </div>
      </div>

      {/* ── Subject pills ── */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {SUBJECTS.map(s => (
          <button
            key={s.code}
            onClick={() => setActiveSubject(s.code)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold shrink-0 transition-all border ${
              activeSubject === s.code
                ? "text-white shadow-md scale-105"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
            }`}
            style={activeSubject === s.code
              ? { background: s.color.bar, borderColor: s.color.bar }
              : {}}
          >
            <span>{s.icon}</span>
            <span>{s.short}</span>
          </button>
        ))}
      </div>

      {/* ── Active subject banner ── */}
      <div className="rounded-2xl px-4 py-3 flex items-center justify-between"
        style={{ background: color.bg, border: `1.5px solid ${color.border}` }}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{subject.icon}</span>
          <div>
            <p className="text-[13px] font-black" style={{ color: color.text }}>{subject.name}</p>
            <p className="text-[10px]" style={{ color: color.border }}>
              {(NOTES[activeSubject] || []).length} notes · {(QUESTION_PAPERS[activeSubject] || []).length} question papers
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-black" style={{ color: color.text }}>{totalDownloads.toLocaleString()}</p>
          <p className="text-[9px]" style={{ color: color.border }}>total downloads</p>
        </div>
      </div>

      {/* ── Tab bar ── */}
      <div className="flex gap-1 p-1 bg-gray-100 rounded-xl w-fit">
        {[
          { key: "notes", label: "📚 Notes",             count: notes.length },
          { key: "qp",    label: "📝 Question Papers",   count: qps.length   },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] font-bold transition-all ${
              tab === t.key
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}>
            {t.label}
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
              tab === t.key ? "bg-blue-100 text-blue-700" : "bg-gray-200 text-gray-500"
            }`}>{t.count}</span>
          </button>
        ))}
      </div>

      {/* ── Notes tab ── */}
      {tab === "notes" && (
        <div className="space-y-2">
          {notes.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 py-12 flex flex-col items-center gap-2 text-gray-400">
              <span className="text-4xl">📂</span>
              <p className="text-sm font-semibold">No notes found</p>
              {search && <p className="text-[11px]">Try a different search term</p>}
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <p className="text-[11px] text-gray-500 font-medium">{notes.length} file{notes.length !== 1 ? "s" : ""}</p>
                <div className="flex gap-2 text-[10px] text-gray-400">
                  {Object.entries(FILE_META).map(([k,v]) => (
                    <span key={k} className="flex items-center gap-1">
                      <span style={{ color: v.color }}>{v.icon}</span>{k.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
              {notes.map(n => (
                <FileCard key={n.id} item={n} color={color} />
              ))}
            </>
          )}
        </div>
      )}

      {/* ── Question Papers tab ── */}
      {tab === "qp" && (
        <div className="space-y-3">

          {/* Year filter */}
          <div className="flex gap-1.5 overflow-x-auto pb-0.5">
            {["all", ...QP_YEARS].map(y => (
              <button key={y} onClick={() => setQpYear(y)}
                className={`shrink-0 text-[11px] font-bold px-3 py-1.5 rounded-lg transition-all ${
                  qpYear === y
                    ? "text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                style={qpYear === y ? { background: color.bar } : {}}>
                {y === "all" ? "All Years" : y}
              </button>
            ))}
          </div>

          {qps.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 py-12 flex flex-col items-center gap-2 text-gray-400">
              <span className="text-4xl">🗂️</span>
              <p className="text-sm font-semibold">No question papers found</p>
            </div>
          ) : (
            <>
              {/* Group by year */}
              {(qpYear === "all" ? QP_YEARS : [qpYear]).map(year => {
                const yearQps = qps.filter(q => q.year === year);
                if (yearQps.length === 0) return null;
                return (
                  <div key={year}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[11px] font-black text-gray-500 uppercase tracking-wide">{year}</span>
                      <div className="flex-1 h-px bg-gray-100" />
                      <span className="text-[10px] text-gray-400">{yearQps.length} paper{yearQps.length !== 1 ? "s" : ""}</span>
                    </div>
                    <div className="space-y-2">
                      {yearQps.map((q, i) => (
                        <QPCard key={`${q.year}-${q.exam}-${i}`} qp={q} color={color} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {/* Tip */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-2">
            <span className="text-lg shrink-0">💡</span>
            <p className="text-[11px] text-amber-800">
              <span className="font-bold">Study tip:</span> Start with the most recent 2 years' papers to understand the current question pattern and important topics.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}