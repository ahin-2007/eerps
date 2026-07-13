    import { useState, useRef, useEffect } from "react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
// Green gradient enterprise theme
const T = {
  primary:   "#1a6b3c",
  primary2:  "#22883f",
  accent:    "#4ade80",
  accentDim: "#bbf7d0",
  dark:      "#0f3d23",
  sidebar:   "#0d3320",
  sidebarHov:"#1a5c34",
  sidebarAct:"#22883f",
  text:      "#1a2e23",
  textMid:   "#4b6358",
  textLight: "#8aaa97",
  border:    "#d1e8d8",
  bg:        "#f4fbf6",
  card:      "#ffffff",
  red:       "#dc2626", redBg: "#fef2f2",
  amber:     "#d97706", amberBg: "#fffbeb",
  blue:      "#1d4ed8", blueBg: "#eff6ff",
  purple:    "#7c3aed", purpleBg: "#f5f3ff",
};

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const DEPT = "Computer Applications";
const HOD  = { name: "Dr. N. Suresh Singh", id: "HOD-001", dept: DEPT };

const KPI = {
  totalStudents:   248,
  totalFaculty:    14,
  year1: 68, year2: 64, year3: 62, year4: 54,
  attendance:      76.4,
  passPercent:     88.2,
  pendingLeave:    3,
  announcements:   5,
  lowAttendance:   12,
  complaints:      2,
};

const STUDENTS = Array.from({ length: 24 }, (_, i) => ({
  id:       `MCA${String(2026001 + i).slice(-4)}`,
  name:     ["Arun Kumar","Priya Devi","Rajan M","Kavitha S","Suresh P","Meena R","Arjun K","Lakshmi V","Dinesh T","Vijay N","Shalini A","Karthik B","Deepa C","Manoj D","Anitha E","Prakash F","Saranya G","Vinoth H","Prabha I","Selvam J","Rani K","Mani L","Uma M","Bala N"][i],
  year:     [1,1,1,2,2,2,2,3,3,3,3,3,4,4,4,4,1,2,3,4,1,2,3,4][i],
  sem:      [1,1,1,3,3,3,3,5,5,5,5,5,7,7,7,7,1,3,5,7,1,3,5,7][i],
  section:  ["A","A","B","A","B","A","B","A","A","B","B","C","A","A","B","B","C","C","C","C","D","D","D","D"][i],
  gender:   i % 3 === 0 ? "Female" : "Male",
  status:   i === 5 || i === 18 ? "Inactive" : "Active",
  attendance: Math.round(60 + Math.random() * 38),
  cgpa:     +(6.0 + Math.random() * 4).toFixed(2),
  feeStatus: i % 4 === 0 ? "Pending" : "Paid",
  photo:    null,
}));

const FACULTY_LIST = [
  { id:"F001", name:"Dr. N. Suresh Singh",         subject:"OS, .NET",      workload:18, leave:"Active", perf:92 },
  { id:"F002", name:"Dr. S. Priya Vasanth",        subject:".NET, ASP.NET", workload:16, leave:"Active", perf:89 },
  { id:"F003", name:"Dr. J.P. Medlin Julia",       subject:"AI, NM, Proj",  workload:20, leave:"Leave",  perf:94 },
  { id:"F004", name:"Mr. G. Borgia Crusu Venthan", subject:"SPM, OS",       workload:14, leave:"Active", perf:87 },
  { id:"F005", name:"Dr. A. Mary Subashini",       subject:"Maths, Stats",  workload:16, leave:"Active", perf:91 },
  { id:"F006", name:"Mr. R. Dinesh Kumar",         subject:"Java, DS",      workload:18, leave:"Active", perf:85 },
  { id:"F007", name:"Dr. K. Selvi",                subject:"DBMS, SQL",     workload:16, leave:"Leave",  perf:88 },
];

const LEAVE_REQUESTS = [
  { id:1, faculty:"Dr. J.P. Medlin Julia",       from:"2026-07-10", to:"2026-07-12", days:3, reason:"Medical", status:"Pending" },
  { id:2, faculty:"Dr. K. Selvi",                from:"2026-07-15", to:"2026-07-16", days:2, reason:"Personal",status:"Pending" },
  { id:3, faculty:"Mr. G. Borgia Crusu Venthan", from:"2026-07-20", to:"2026-07-20", days:1, reason:"Personal",status:"Pending" },
];

const ANNOUNCEMENTS = [
  { id:1, title:"II Internal Exam Scheduled",       date:"2026-07-06", priority:"High",   to:"All Students"  },
  { id:2, title:"TCS Campus Recruitment Drive",     date:"2026-07-05", priority:"Medium", to:"Final Year"    },
  { id:3, title:"TECHVISTA 2026 Symposium",         date:"2026-07-03", priority:"Medium", to:"All Students"  },
  { id:4, title:"Onam Holiday Notice",              date:"2026-07-01", priority:"Low",    to:"All"           },
  { id:5, title:"ASP.NET Lab Record Submission",    date:"2026-07-02", priority:"Medium", to:"3rd Year"      },
];

const NOTIFICATIONS = [
  { id:1, type:"alert",   msg:"12 students below 75% attendance",     time:"2h ago",  read:false },
  { id:2, type:"leave",   msg:"Leave request from Dr. Medlin Julia",  time:"3h ago",  read:false },
  { id:3, type:"assign",  msg:"3 assignment approvals pending",        time:"5h ago",  read:false },
  { id:4, type:"exam",    msg:"II Internal Exam on 08 Sep 2026",       time:"1d ago",  read:true  },
  { id:5, type:"complaint",msg:"2 student complaints unresolved",      time:"2d ago",  read:false },
];

const ATT_TREND = [
  { m:"Feb", y1:82, y2:79, y3:74, y4:81 },
  { m:"Mar", y1:80, y2:77, y3:72, y4:79 },
  { m:"Apr", y1:78, y2:76, y3:70, y4:77 },
  { m:"May", y1:81, y2:80, y3:73, y4:82 },
  { m:"Jun", y1:76, y2:74, y3:69, y4:78 },
  { m:"Jul", y1:79, y2:77, y3:71, y4:80 },
];

const PERF_DATA = [
  { subj:"OS",      pass:92, avg:74 },
  { subj:".NET",    pass:88, avg:71 },
  { subj:"AI",      pass:85, avg:68 },
  { subj:"SPM",     pass:90, avg:76 },
  { subj:"NM",      pass:78, avg:62 },
  { subj:"ASP.NET", pass:95, avg:79 },
];

// ─── SIDEBAR NAV TREE ─────────────────────────────────────────────────────────
const NAV = [
  { key:"dashboard",   label:"Dashboard",    icon:"⊞",  ch:[] },
  { key:"students",    label:"Students",     icon:"🎓", ch:[
    { key:"all-students",      label:"All Students"    },
    { key:"yr1",               label:"1st Year"        },
    { key:"yr2",               label:"2nd Year"        },
    { key:"yr3",               label:"3rd Year"        },
    { key:"yr4",               label:"4th Year"        },
    { key:"student-profile",   label:"Student Profile" },
    { key:"promotion",         label:"Promotion"       },
    { key:"student-reports",   label:"Reports"         },
  ]},
  { key:"faculty",     label:"Faculty",      icon:"👩‍🏫", ch:[
    { key:"all-faculty",   label:"All Faculty"    },
    { key:"workload",      label:"Workload"       },
    { key:"leave-req",     label:"Leave Requests" },
    { key:"faculty-perf",  label:"Performance"    },
  ]},
  { key:"attendance",  label:"Attendance",   icon:"✅", ch:[
    { key:"overall-att",  label:"Overall"          },
    { key:"yearwise-att", label:"Year-wise"        },
    { key:"subjwise-att", label:"Subject-wise"     },
    { key:"low-att",      label:"Low Attendance"   },
  ]},
  { key:"academics",   label:"Academics",    icon:"📚", ch:[
    { key:"internal-marks", label:"Internal Marks"  },
    { key:"sem-results",    label:"Semester Results"},
    { key:"subj-alloc",     label:"Subject Allocation"},
    { key:"timetable",      label:"Timetable"       },
    { key:"acad-cal",       label:"Academic Calendar"},
  ]},
  { key:"materials",   label:"Assignments & Materials", icon:"📋", ch:[
    { key:"uploaded-mat", label:"Uploaded Materials" },
    { key:"assignments",  label:"Assignments"        },
    { key:"approvals",    label:"Approval Requests"  },
  ]},
  { key:"dept-mgmt",   label:"Department Mgmt", icon:"🏛️", ch:[
    { key:"courses",    label:"Courses"   },
    { key:"subjects",   label:"Subjects"  },
    { key:"sections",   label:"Sections"  },
    { key:"batches",    label:"Batches"   },
  ]},
  { key:"reports",     label:"Reports",      icon:"📊", ch:[
    { key:"student-rep", label:"Student Reports"      },
    { key:"faculty-rep", label:"Faculty Reports"      },
    { key:"att-rep",     label:"Attendance Reports"   },
    { key:"result-an",   label:"Result Analysis"      },
    { key:"dept-perf",   label:"Dept Performance"     },
    { key:"export",      label:"Export PDF/Excel"     },
  ]},
  { key:"notices",     label:"Announcements", icon:"📢", ch:[
    { key:"create-ann",  label:"Create Announcement" },
    { key:"dept-notice", label:"Department Notices"  },
    { key:"events",      label:"Events"              },
  ]},
  { key:"transport",   label:"Transport",    icon:"🚌", ch:[
    { key:"live-bus",   label:"Live Bus Tracking" },
    { key:"bus-routes", label:"Bus Routes"        },
    { key:"drivers",    label:"Driver Details"    },
  ]},
  { key:"settings",    label:"Settings",     icon:"⚙️", ch:[
    { key:"profile",    label:"Profile"         },
    { key:"password",   label:"Change Password" },
  ]},
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function Avatar({ name, size=8, bg=T.primary }) {
  const initials = name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
  return (
    <div className={`w-${size} h-${size} rounded-xl flex items-center justify-center font-black text-white text-xs shrink-0`}
      style={{ background: bg }}>
      {initials}
    </div>
  );
}

function Badge({ label, color="blue" }) {
  const map = {
    High:    { bg:"#fef2f2", c:"#dc2626" },
    Medium:  { bg:"#fffbeb", c:"#d97706" },
    Low:     { bg:"#f0fdf4", c:"#16a34a" },
    Active:  { bg:"#f0fdf4", c:"#16a34a" },
    Inactive:{ bg:"#fef2f2", c:"#dc2626" },
    Pending: { bg:"#fffbeb", c:"#d97706" },
    Paid:    { bg:"#f0fdf4", c:"#16a34a" },
    Leave:   { bg:"#fef2f2", c:"#dc2626" },
  };
  const s = map[label] || { bg:"#f3f4f6", c:"#374151" };
  return (
    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
      style={{ background: s.bg, color: s.c }}>{label}</span>
  );
}

function MiniLineChart({ data, color="#22883f" }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 80, h = 28;
  const pts = data.map((v, i) => {
    const x = (i / (data.length-1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={`0,${h} ${pts} ${w},${h}`}
        fill={color} fillOpacity="0.12" stroke="none" />
    </svg>
  );
}

function AttBar({ value, max=100 }) {
  const pct = value / max * 100;
  const c = value >= 75 ? "#22883f" : value >= 60 ? "#d97706" : "#dc2626";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
        <div className="h-full rounded-full" style={{ width:`${pct}%`, background: c }} />
      </div>
      <span className="text-[11px] font-bold shrink-0" style={{ color: c }}>{value}%</span>
    </div>
  );
}

// ─── MINI CHARTS ─────────────────────────────────────────────────────────────
function AttTrendChart() {
  const maxH = 80;
  const colors = { y1:"#22883f", y2:"#854F0B", y3:"#185FA5", y4:"#7c3aed" };
  const labels = ["Y1","Y2","Y3","Y4"];
  const keys   = ["y1","y2","y3","y4"];
  return (
    <div>
      <div className="flex items-end gap-1.5 h-20">
        {ATT_TREND.map((row, mi) => (
          <div key={mi} className="flex-1 flex items-end gap-0.5">
            {keys.map((k, ki) => {
              const h = Math.round((row[k] / 100) * maxH);
              return (
                <div key={k} className="flex-1 rounded-t-sm transition-all"
                  style={{ height: h, background: colors[k], opacity: 0.85 }} />
              );
            })}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-1.5">
        {ATT_TREND.map(r => (
          <span key={r.m} className="flex-1 text-center text-[9px] text-gray-400 font-medium">{r.m}</span>
        ))}
      </div>
      <div className="flex gap-3 mt-2 flex-wrap">
        {keys.map((k,i) => (
          <span key={k} className="flex items-center gap-1 text-[9px] text-gray-500">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ background: colors[k] }} />
            {labels[i]}
          </span>
        ))}
      </div>
    </div>
  );
}

function PerfChart() {
  return (
    <div className="space-y-2">
      {PERF_DATA.map(d => (
        <div key={d.subj} className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-gray-600 w-14 shrink-0">{d.subj}</span>
          <div className="flex-1 relative h-4 bg-gray-100 rounded-full overflow-hidden">
            <div className="absolute inset-y-0 left-0 rounded-full" style={{ width:`${d.pass}%`, background: T.primary, opacity:0.85 }} />
            <div className="absolute inset-y-0 left-0 rounded-full" style={{ width:`${d.avg}%`, background: T.accent, opacity:0.6 }} />
          </div>
          <span className="text-[10px] font-bold text-gray-700 w-8 text-right">{d.pass}%</span>
        </div>
      ))}
      <div className="flex gap-4 mt-1">
        <span className="flex items-center gap-1 text-[9px] text-gray-500"><span className="w-3 h-2 rounded" style={{background:T.primary}}/> Pass %</span>
        <span className="flex items-center gap-1 text-[9px] text-gray-500"><span className="w-3 h-2 rounded" style={{background:T.accent}}/> Avg Score</span>
      </div>
    </div>
  );
}

// ─── KPI CARD ─────────────────────────────────────────────────────────────────
function KPICard({ label, value, sub, icon, trend, color, alert }) {
  return (
    <div className="bg-white rounded-2xl p-4 border flex flex-col gap-2 hover:shadow-md transition-shadow"
      style={{ borderColor: alert ? T.red+"44" : T.border, background: alert ? "#fff8f8" : "white" }}>
      <div className="flex items-center justify-between">
        <span className="text-xl">{icon}</span>
        {trend && <MiniLineChart data={trend} color={color || T.primary} />}
        {alert && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
      </div>
      <div>
        <p className="text-2xl font-black" style={{ color: color || T.primary }}>
          {typeof value === "number" && !Number.isInteger(value) ? value.toFixed(1) : value}
          {label.includes("%") || label === "Attendance" || label === "Pass Rate" ? "%" : ""}
        </p>
        <p className="text-[11px] font-bold text-gray-600 leading-tight">{label}</p>
        {sub && <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

// ─── PAGE SECTIONS ────────────────────────────────────────────────────────────
function DashboardHome({ setPage }) {
  const unread = NOTIFICATIONS.filter(n => !n.read).length;
  return (
    <div className="space-y-5">
      {/* Welcome */}
      <div className="rounded-2xl p-5 text-white overflow-hidden relative"
        style={{ background: `linear-gradient(135deg, ${T.dark} 0%, ${T.primary} 60%, ${T.primary2} 100%)` }}>
        <div className="relative z-10">
          <p className="text-green-200 text-xs font-semibold uppercase tracking-widest">HOD Dashboard</p>
          <h2 className="text-2xl font-black mt-1">Good morning, Dr. Suresh Singh</h2>
          <p className="text-green-200 text-sm mt-1">Dept. of Computer Applications · {new Date().toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}</p>
          <div className="flex gap-3 mt-4 flex-wrap">
            <button onClick={() => setPage("create-ann")}
              className="text-xs font-bold px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm">
              + Announcement
            </button>
            <button onClick={() => setPage("leave-req")}
              className="text-xs font-bold px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm flex items-center gap-1">
              Leave Requests
              {LEAVE_REQUESTS.filter(l=>l.status==="Pending").length > 0 && (
                <span className="bg-red-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {LEAVE_REQUESTS.filter(l=>l.status==="Pending").length}
                </span>
              )}
            </button>
            <button onClick={() => setPage("low-att")}
              className="text-xs font-bold px-4 py-2 rounded-xl bg-amber-400/80 hover:bg-amber-400 transition-colors text-amber-900">
              ⚠️ {KPI.lowAttendance} Low Attendance
            </button>
          </div>
        </div>
        {/* BG decoration */}
        <div className="absolute right-0 top-0 w-48 h-full opacity-10 flex items-center justify-center text-[120px] pointer-events-none select-none">🎓</div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <KPICard label="Total Students"   value={KPI.totalStudents}  icon="👥" trend={[230,235,240,242,245,248]} />
        <KPICard label="Total Faculty"    value={KPI.totalFaculty}   icon="👩‍🏫" trend={[12,12,13,13,14,14]} />
        <KPICard label="Attendance"       value={KPI.attendance}     icon="✅" color={KPI.attendance>=75?T.primary:T.red} trend={[79,77,81,76,78,76]} />
        <KPICard label="Pass Rate"        value={KPI.passPercent}    icon="📊" trend={[85,86,87,88,88,88]} />
        <KPICard label="Pending Leaves"   value={KPI.pendingLeave}   icon="📋" alert={KPI.pendingLeave>0} color={T.amber} />
      </div>

      {/* Year breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[["1st Year",KPI.year1,"#185FA5"],["2nd Year",KPI.year2,"#854F0B"],["3rd Year",KPI.year3,"#0F6E56"],["4th Year",KPI.year4,"#7c3aed"]].map(([l,v,c]) => (
          <div key={l} className="bg-white rounded-xl border p-3 flex items-center gap-3" style={{ borderColor:T.border }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-black text-white"
              style={{ background: c }}>{v}</div>
            <div>
              <p className="text-lg font-black" style={{ color: c }}>{v}</p>
              <p className="text-[11px] text-gray-500">{l}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border p-4" style={{ borderColor:T.border }}>
          <div className="flex justify-between items-center mb-4">
            <p className="text-[13px] font-bold text-gray-700">Attendance Trend</p>
            <span className="text-[10px] text-gray-400">Feb – Jul 2026</span>
          </div>
          <AttTrendChart />
        </div>
        <div className="bg-white rounded-2xl border p-4" style={{ borderColor:T.border }}>
          <div className="flex justify-between items-center mb-4">
            <p className="text-[13px] font-bold text-gray-700">Subject Performance</p>
            <span className="text-[10px] text-gray-400">Odd Sem 2026–27</span>
          </div>
          <PerfChart />
        </div>
      </div>

      {/* Recent Announcements + Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border p-4" style={{ borderColor:T.border }}>
          <div className="flex justify-between items-center mb-3">
            <p className="text-[13px] font-bold text-gray-700">Recent Announcements</p>
            <button onClick={()=>setPage("dept-notice")} className="text-[10px] font-bold" style={{color:T.primary}}>View all</button>
          </div>
          <div className="space-y-2">
            {ANNOUNCEMENTS.map(a => (
              <div key={a.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                <span className="text-base">📢</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-gray-700 truncate">{a.title}</p>
                  <p className="text-[10px] text-gray-400">{a.to} · {a.date}</p>
                </div>
                <Badge label={a.priority} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border p-4" style={{ borderColor:T.border }}>
          <div className="flex justify-between items-center mb-3">
            <p className="text-[13px] font-bold text-gray-700">Notifications</p>
            {unread > 0 && <span className="text-[10px] font-bold text-red-600">{unread} unread</span>}
          </div>
          <div className="space-y-2">
            {NOTIFICATIONS.map(n => {
              const icons = { alert:"⚠️", leave:"📋", assign:"📝", exam:"📅", complaint:"🚨" };
              return (
                <div key={n.id} className={`flex items-start gap-3 p-2.5 rounded-xl transition-colors ${!n.read ? "bg-green-50" : "hover:bg-gray-50"}`}>
                  <span className="text-base shrink-0">{icons[n.type]}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[12px] leading-snug ${!n.read ? "font-bold text-gray-800" : "font-medium text-gray-600"}`}>{n.msg}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{n.time}</p>
                  </div>
                  {!n.read && <span className="w-2 h-2 rounded-full mt-1 shrink-0" style={{background:T.primary}} />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function StudentsPage({ yearFilter }) {
  const [search,    setSearch]    = useState("");
  const [yr,        setYr]        = useState(yearFilter || "all");
  const [sem,       setSem]       = useState("all");
  const [sec,       setSec]       = useState("all");
  const [gender,    setGender]    = useState("all");
  const [status,    setStatus]    = useState("all");
  const [selected,  setSelected]  = useState(null);

  const filtered = STUDENTS.filter(s => {
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase());
    const matchYr     = yr === "all"     || s.year === +yr;
    const matchSem    = sem === "all"    || s.sem === +sem;
    const matchSec    = sec === "all"    || s.section === sec;
    const matchGender = gender === "all" || s.gender === gender;
    const matchStatus = status === "all" || s.status === status;
    return matchSearch && matchYr && matchSem && matchSec && matchGender && matchStatus;
  });

  if (selected) {
    const s = selected;
    return (
      <div className="space-y-4">
        <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-sm font-bold" style={{color:T.primary}}>
          ← Back to Students
        </button>
        <div className="bg-white rounded-2xl border p-6" style={{borderColor:T.border}}>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-white"
              style={{background:T.primary}}>
              {s.name.split(" ").map(w=>w[0]).join("").slice(0,2)}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-black text-gray-800">{s.name}</h2>
              <p className="text-gray-500 text-sm">{s.id} · Year {s.year} · Sem {s.sem} · Section {s.section}</p>
              <div className="flex gap-2 mt-2"><Badge label={s.status} /><Badge label={s.feeStatus} /></div>
            </div>
            <button className="text-xs font-bold px-4 py-2 rounded-xl text-white" style={{background:T.primary}}>Download Report</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label:"Attendance", value:`${s.attendance}%`, color: s.attendance>=75?T.primary:T.red },
              { label:"CGPA",       value:s.cgpa,             color: T.primary2 },
              { label:"Fee Status", value:s.feeStatus,        color: s.feeStatus==="Paid"?T.primary:T.red },
              { label:"Gender",     value:s.gender,           color: T.textMid  },
            ].map(d => (
              <div key={d.label} className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-xl font-black" style={{color:d.color}}>{d.value}</p>
                <p className="text-[11px] text-gray-500">{d.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-base font-black text-gray-800">Students — {DEPT}</h2>
        <div className="flex gap-2">
          <button className="text-xs font-bold px-3 py-2 rounded-xl text-white" style={{background:T.primary}}>Export</button>
          <button className="text-xs font-bold px-3 py-2 rounded-xl border" style={{borderColor:T.border}}>Print</button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border p-4 space-y-3" style={{borderColor:T.border}}>
        <div className="relative">
          <input value={search} onChange={e=>setSearch(e.target.value)}
            placeholder="Search by name or register number..."
            className="w-full pl-8 pr-4 py-2.5 border rounded-xl text-[13px] bg-gray-50 focus:outline-none focus:ring-2"
            style={{borderColor:T.border}} />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {[
            { label:"Year", val:yr, setVal:setYr, opts:[["all","All Years"],["1","Year 1"],["2","Year 2"],["3","Year 3"],["4","Year 4"]] },
            { label:"Sem",  val:sem, setVal:setSem, opts:[["all","All Sems"],["1","Sem 1"],["3","Sem 3"],["5","Sem 5"],["7","Sem 7"]] },
            { label:"Sec",  val:sec, setVal:setSec, opts:[["all","All Sections"],["A","A"],["B","B"],["C","C"],["D","D"]] },
            { label:"Gender",val:gender,setVal:setGender,opts:[["all","All"],["Male","Male"],["Female","Female"]] },
            { label:"Status",val:status,setVal:setStatus,opts:[["all","All"],["Active","Active"],["Inactive","Inactive"]] },
          ].map(f => (
            <select key={f.label} value={f.val} onChange={e=>f.setVal(e.target.value)}
              className="text-[12px] border rounded-lg px-3 py-1.5 bg-white focus:outline-none font-medium"
              style={{borderColor:T.border}}>
              {f.opts.map(([v,l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          ))}
        </div>
        <p className="text-[11px] text-gray-400">{filtered.length} student{filtered.length!==1?"s":""} found</p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border overflow-hidden" style={{borderColor:T.border}}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr style={{background:`${T.primary}0f`}}>
                {["#","Reg No","Name","Yr","Sem","Sec","Attendance","CGPA","Fee","Action"].map(h => (
                  <th key={h} className="px-3 py-3 text-left text-[11px] font-bold uppercase tracking-wide" style={{color:T.primary}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y" style={{divideColor:T.border}}>
              {filtered.map((s, i) => (
                <tr key={s.id} className="hover:bg-green-50/40 transition-colors">
                  <td className="px-3 py-2.5 text-[11px] text-gray-400">{i+1}</td>
                  <td className="px-3 py-2.5 text-[12px] font-mono font-semibold text-gray-600">{s.id}</td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <Avatar name={s.name} size={7} />
                      <div>
                        <p className="text-[12px] font-bold text-gray-800">{s.name}</p>
                        <p className="text-[10px] text-gray-400">{s.gender}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-[12px] font-semibold text-gray-700">{s.year}</td>
                  <td className="px-3 py-2.5 text-[12px] text-gray-600">{s.sem}</td>
                  <td className="px-3 py-2.5 text-[12px] text-gray-600">{s.section}</td>
                  <td className="px-3 py-2.5"><AttBar value={s.attendance} /></td>
                  <td className="px-3 py-2.5">
                    <span className="text-[12px] font-bold" style={{color: s.cgpa>=8?T.primary:s.cgpa>=6?T.amber:T.red}}>{s.cgpa}</span>
                  </td>
                  <td className="px-3 py-2.5"><Badge label={s.feeStatus} /></td>
                  <td className="px-3 py-2.5">
                    <div className="flex gap-1">
                      <button onClick={()=>setSelected(s)}
                        className="text-[10px] font-bold px-2 py-1 rounded-lg text-white transition-opacity hover:opacity-80"
                        style={{background:T.primary}}>View</button>
                      <button className="text-[10px] font-bold px-2 py-1 rounded-lg border transition-colors hover:bg-gray-50"
                        style={{borderColor:T.border,color:T.textMid}}>Report</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function FacultyPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-base font-black text-gray-800">Faculty — {DEPT}</h2>
      <div className="bg-white rounded-2xl border overflow-hidden" style={{borderColor:T.border}}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr style={{background:`${T.primary}0f`}}>
                {["Faculty","Subjects","Workload (hrs)","Status","Performance","Action"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wide" style={{color:T.primary}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y" style={{divideColor:T.border}}>
              {FACULTY_LIST.map(f => (
                <tr key={f.id} className="hover:bg-green-50/40 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={f.name} />
                      <div>
                        <p className="text-[12px] font-bold text-gray-800">{f.name}</p>
                        <p className="text-[10px] text-gray-400">{f.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[12px] text-gray-600">{f.subject}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                        <div className="h-full rounded-full" style={{width:`${(f.workload/24)*100}%`, background:T.primary}} />
                      </div>
                      <span className="text-[11px] font-semibold text-gray-600">{f.workload}h</span>
                    </div>
                  </td>
                  <td className="px-4 py-3"><Badge label={f.leave} /></td>
                  <td className="px-4 py-3">
                    <span className="text-[13px] font-black" style={{color:f.perf>=90?T.primary:T.amber}}>{f.perf}%</span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-[10px] font-bold px-3 py-1 rounded-lg text-white" style={{background:T.primary}}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function LeaveRequestsPage() {
  const [reqs, setReqs] = useState(LEAVE_REQUESTS);
  const act = (id, status) => setReqs(r => r.map(x => x.id===id ? {...x, status} : x));
  return (
    <div className="space-y-4">
      <h2 className="text-base font-black text-gray-800">Leave Requests</h2>
      <div className="space-y-3">
        {reqs.map(r => (
          <div key={r.id} className="bg-white rounded-2xl border p-4 flex flex-col sm:flex-row sm:items-center gap-4"
            style={{borderColor: r.status==="Pending" ? T.amber+"66" : T.border}}>
            <Avatar name={r.faculty} size={10} />
            <div className="flex-1">
              <p className="text-[13px] font-bold text-gray-800">{r.faculty}</p>
              <p className="text-[11px] text-gray-500 mt-0.5">{r.from} → {r.to} · {r.days} day{r.days>1?"s":""} · {r.reason}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge label={r.status} />
              {r.status === "Pending" && (
                <>
                  <button onClick={()=>act(r.id,"Approved")}
                    className="text-xs font-bold px-3 py-1.5 rounded-xl text-white" style={{background:T.primary}}>Approve</button>
                  <button onClick={()=>act(r.id,"Rejected")}
                    className="text-xs font-bold px-3 py-1.5 rounded-xl bg-red-100 text-red-700">Reject</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AttendancePage({ yearFilter }) {
  return (
    <div className="space-y-4">
      <h2 className="text-base font-black text-gray-800">Attendance Overview</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[["Year 1",82,"#185FA5"],["Year 2",77,"#854F0B"],["Year 3",71,"#0F6E56"],["Year 4",80,"#7c3aed"]].map(([l,v,c])=>(
          <div key={l} className="bg-white rounded-2xl border p-4 text-center" style={{borderColor:T.border}}>
            <p className="text-2xl font-black" style={{color: v>=75?c:T.red}}>{v}%</p>
            <p className="text-[11px] text-gray-500 mt-1">{l}</p>
            <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div style={{width:`${v}%`, background: v>=75?c:T.red, height:"100%"}} className="rounded-full" />
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border p-4" style={{borderColor:T.border}}>
        <p className="text-[13px] font-bold text-gray-700 mb-4">Monthly Trend by Year</p>
        <AttTrendChart />
      </div>
      <div className="bg-white rounded-2xl border p-4" style={{borderColor:T.border}}>
        <div className="flex justify-between mb-3">
          <p className="text-[13px] font-bold text-gray-700">⚠️ Low Attendance Students</p>
          <span className="text-[11px] font-bold text-red-600">{STUDENTS.filter(s=>s.attendance<75).length} students</span>
        </div>
        <div className="space-y-2">
          {STUDENTS.filter(s=>s.attendance<75).map(s=>(
            <div key={s.id} className="flex items-center gap-3 p-2.5 bg-red-50 rounded-xl border border-red-100">
              <Avatar name={s.name} />
              <div className="flex-1">
                <p className="text-[12px] font-bold text-gray-800">{s.name}</p>
                <p className="text-[10px] text-gray-500">{s.id} · Year {s.year} · Sec {s.section}</p>
              </div>
              <span className="text-[13px] font-black text-red-600">{s.attendance}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AnnouncementPage() {
  const [title, setTitle] = useState("");
  const [body,  setBody]  = useState("");
  const [to,    setTo]    = useState("All Students");
  const [sent,  setSent]  = useState(false);
  return (
    <div className="space-y-4">
      <h2 className="text-base font-black text-gray-800">Create Announcement</h2>
      <div className="bg-white rounded-2xl border p-5 space-y-4" style={{borderColor:T.border}}>
        {sent ? (
          <div className="text-center py-8">
            <span className="text-5xl">✅</span>
            <p className="text-lg font-black text-gray-700 mt-3">Announcement Sent!</p>
            <button onClick={()=>{setSent(false);setTitle("");setBody("");}} className="mt-3 text-sm font-bold" style={{color:T.primary}}>
              Create another
            </button>
          </div>
        ) : (
          <>
            <div>
              <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wide">Title</label>
              <input value={title} onChange={e=>setTitle(e.target.value)}
                className="mt-1 w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2"
                style={{borderColor:T.border}} placeholder="Announcement title..." />
            </div>
            <div>
              <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wide">Send To</label>
              <select value={to} onChange={e=>setTo(e.target.value)}
                className="mt-1 w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none"
                style={{borderColor:T.border}}>
                {["All Students","All Faculty","1st Year","2nd Year","3rd Year","4th Year","Final Year","All"].map(o=><option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wide">Message</label>
              <textarea value={body} onChange={e=>setBody(e.target.value)} rows={4}
                className="mt-1 w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none resize-none"
                style={{borderColor:T.border}} placeholder="Write your announcement..." />
            </div>
            <button onClick={()=>title&&body&&setSent(true)}
              className="w-full py-3 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{background:`linear-gradient(135deg,${T.dark},${T.primary2})`}}>
              Send Announcement
            </button>
          </>
        )}
      </div>
      <div className="bg-white rounded-2xl border p-4" style={{borderColor:T.border}}>
        <p className="text-[13px] font-bold text-gray-700 mb-3">Recent Announcements</p>
        <div className="space-y-2">
          {ANNOUNCEMENTS.map(a=>(
            <div key={a.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50">
              <span className="text-lg">📢</span>
              <div className="flex-1"><p className="text-[12px] font-semibold text-gray-700">{a.title}</p><p className="text-[10px] text-gray-400">{a.to} · {a.date}</p></div>
              <Badge label={a.priority} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReportsPage() {
  const reports = [
    { name:"Student Attendance Report",  icon:"✅", desc:"Year/subject-wise attendance summary" },
    { name:"Internal Marks Report",      icon:"📝", desc:"All units, all years" },
    { name:"Semester Result Report",     icon:"📊", desc:"Pass/fail analysis" },
    { name:"Faculty Workload Report",    icon:"👩‍🏫", desc:"Hours per faculty" },
    { name:"Department Performance",     icon:"🏛️", desc:"Overall dept metrics" },
    { name:"Year-wise Student List",     icon:"👥", desc:"Printable roster" },
  ];
  return (
    <div className="space-y-4">
      <h2 className="text-base font-black text-gray-800">Reports</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {reports.map(r => (
          <div key={r.name} className="bg-white rounded-2xl border p-4 flex items-center gap-4 hover:shadow-md transition-shadow" style={{borderColor:T.border}}>
            <span className="text-3xl">{r.icon}</span>
            <div className="flex-1">
              <p className="text-[13px] font-bold text-gray-800">{r.name}</p>
              <p className="text-[11px] text-gray-500">{r.desc}</p>
            </div>
            <div className="flex gap-1.5">
              <button className="text-[10px] font-bold px-2.5 py-1.5 rounded-lg text-white" style={{background:T.red}}>PDF</button>
              <button className="text-[10px] font-bold px-2.5 py-1.5 rounded-lg text-white" style={{background:T.primary}}>Excel</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlaceholderPage({ label }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-gray-400">
      <span className="text-6xl">🛠️</span>
      <p className="text-lg font-bold text-gray-600">{label}</p>
      <p className="text-sm">This section is coming soon.</p>
    </div>
  );
}

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────
function Sidebar({ page, setPage, open, setOpen }) {
  const [expanded, setExpanded] = useState({ students:true, faculty:false, attendance:false, academics:false, notices:false });
  const toggle = key => setExpanded(e => ({ ...e, [key]: !e[key] }));

  return (
    <>
      {open && <div className="fixed inset-0 z-20 bg-black/50 md:hidden" onClick={()=>setOpen(false)} />}
      <aside className={`
        fixed inset-y-0 left-0 z-30 flex flex-col
        transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:static md:translate-x-0 md:flex-shrink-0
        w-64 overflow-y-auto overflow-x-hidden
      `} style={{ background: T.sidebar }}>

        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-lg"
            style={{ background: T.accent, color: T.dark }}>C</div>
          <div>
            <p className="text-white font-black text-sm leading-tight">CampusConnect</p>
            <p className="text-green-400 text-[9px] font-semibold">HOD Panel</p>
          </div>
          <button onClick={()=>setOpen(false)} className="md:hidden ml-auto text-white/40 hover:text-white">✕</button>
        </div>

        {/* HOD info */}
        <div className="flex items-center gap-2.5 px-4 py-3 border-b border-white/10">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-black"
            style={{ background: T.accentDim, color: T.dark }}>NS</div>
          <div className="min-w-0">
            <p className="text-white text-[11px] font-bold truncate">{HOD.name}</p>
            <p className="text-green-400 text-[9px] truncate">{HOD.dept}</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-2">
          {NAV.map(item => {
            const isActive = page === item.key || item.ch.some(c => c.key === page);
            return (
              <div key={item.key}>
                <button
                  onClick={() => {
                    if (item.ch.length === 0) { setPage(item.key); setOpen(false); }
                    else toggle(item.key);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors text-[12px] font-semibold"
                  style={{
                    color:      isActive ? T.accent : "rgba(255,255,255,0.7)",
                    background: isActive && item.ch.length===0 ? T.sidebarAct+"33" : "transparent",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = T.sidebarHov}
                  onMouseLeave={e => e.currentTarget.style.background = isActive && item.ch.length===0 ? T.sidebarAct+"33" : "transparent"}
                >
                  <span className="text-base shrink-0">{item.icon}</span>
                  <span className="flex-1">{item.label}</span>
                  {item.ch.length > 0 && (
                    <span className="text-white/40 text-[10px]">{expanded[item.key] ? "▾" : "›"}</span>
                  )}
                  {item.key === "faculty" && LEAVE_REQUESTS.filter(l=>l.status==="Pending").length > 0 && (
                    <span className="bg-red-500 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                      {LEAVE_REQUESTS.filter(l=>l.status==="Pending").length}
                    </span>
                  )}
                </button>
                {item.ch.length > 0 && expanded[item.key] && (
                  <div className="pb-1">
                    {item.ch.map(child => (
                      <button key={child.key}
                        onClick={() => { setPage(child.key); setOpen(false); }}
                        className="w-full flex items-center gap-2 pl-11 pr-4 py-2 text-left transition-colors text-[11px]"
                        style={{
                          color:      page === child.key ? T.accent : "rgba(255,255,255,0.55)",
                          background: page === child.key ? T.sidebarAct+"22" : "transparent",
                          fontWeight: page === child.key ? 700 : 500,
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = T.sidebarHov+"66"}
                        onMouseLeave={e => e.currentTarget.style.background = page===child.key ? T.sidebarAct+"22" : "transparent"}
                      >
                        <span className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{background: page===child.key ? T.accent : "rgba(255,255,255,0.3)"}} />
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-white/10">
          <div className="flex items-center gap-2 bg-white/5 rounded-xl p-2.5">
            <span className="text-green-400">🎧</span>
            <div>
              <p className="text-white text-[11px] font-semibold">Support</p>
              <p className="text-white/40 text-[9px]">it@mcc.edu.in</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function HODDashboard() {
  const [page,        setPage]        = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen,   setNotifOpen]   = useState(false);
  const unread = NOTIFICATIONS.filter(n => !n.read).length;

  const pageLabel = (() => {
    for (const item of NAV) {
      if (item.key === page) return item.label;
      for (const c of item.ch) if (c.key === page) return c.label;
    }
    return page;
  })();

  const renderPage = () => {
    if (page === "dashboard")   return <DashboardHome setPage={setPage} />;
    if (["all-students","student-profile","student-reports"].includes(page)) return <StudentsPage />;
    if (page === "yr1")         return <StudentsPage yearFilter={1} />;
    if (page === "yr2")         return <StudentsPage yearFilter={2} />;
    if (page === "yr3")         return <StudentsPage yearFilter={3} />;
    if (page === "yr4")         return <StudentsPage yearFilter={4} />;
    if (page === "all-faculty" || page === "workload" || page === "faculty-perf") return <FacultyPage />;
    if (page === "leave-req")   return <LeaveRequestsPage />;
    if (["overall-att","yearwise-att","subjwise-att","low-att"].includes(page)) return <AttendancePage />;
    if (page === "create-ann" || page === "dept-notice") return <AnnouncementPage />;
    if (["student-rep","faculty-rep","att-rep","result-an","dept-perf","export"].includes(page)) return <ReportsPage />;
    return <PlaceholderPage label={pageLabel} />;
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: T.bg, fontFamily: "system-ui, sans-serif" }}>
      <Sidebar page={page} setPage={setPage} open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b flex items-center px-4 py-3 gap-3 shrink-0" style={{ borderColor: T.border }}>
          <button onClick={()=>setSidebarOpen(o=>!o)}
            className="text-gray-500 hover:text-gray-700 text-xl md:hidden shrink-0">☰</button>

          <div className="hidden md:flex items-center gap-2 text-xs text-gray-400">
            <span style={{color:T.primary}} className="font-semibold">HOD</span>
            <span>/</span>
            <span className="text-gray-600 font-semibold">{pageLabel}</span>
          </div>

          <div className="flex-1 md:hidden">
            <p className="text-sm font-bold text-gray-700">{pageLabel}</p>
          </div>

          <div className="flex items-center gap-3 ml-auto shrink-0">
            {/* Notifications */}
            <div className="relative">
              <button onClick={()=>setNotifOpen(o=>!o)}
                className="relative w-9 h-9 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors"
                style={{border:`1px solid ${T.border}`}}>
                <span className="text-lg">🔔</span>
                {unread > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-black">
                    {unread}
                  </span>
                )}
              </button>
              {notifOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border z-50 overflow-hidden"
                  style={{borderColor:T.border}}>
                  <div className="px-4 py-3 border-b flex justify-between" style={{borderColor:T.border}}>
                    <p className="text-sm font-bold text-gray-700">Notifications</p>
                    <button onClick={()=>setNotifOpen(false)} className="text-gray-400">✕</button>
                  </div>
                  <div className="divide-y max-h-80 overflow-y-auto" style={{divideColor:T.border}}>
                    {NOTIFICATIONS.map(n => {
                      const icons = { alert:"⚠️", leave:"📋", assign:"📝", exam:"📅", complaint:"🚨" };
                      return (
                        <div key={n.id} className={`flex items-start gap-3 px-4 py-3 ${!n.read?"bg-green-50":""}`}>
                          <span className="text-base shrink-0">{icons[n.type]}</span>
                          <div className="flex-1 min-w-0">
                            <p className={`text-[12px] leading-snug ${!n.read?"font-bold text-gray-800":"text-gray-600"}`}>{n.msg}</p>
                            <p className="text-[10px] text-gray-400 mt-0.5">{n.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Avatar */}
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-black text-white"
                style={{background:T.primary}}>NS</div>
              <div className="hidden sm:block">
                <p className="text-[11px] font-bold text-gray-700">Dr. N. Suresh Singh</p>
                <p className="text-[9px] text-gray-400">HOD · Computer Applications</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
