import { useState, useEffect, useRef } from "react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const G = {
  dark:    "#052e16", deep:  "#0f3d1f", primary: "#16a34a",
  mid:     "#22c55e", light: "#4ade80", pale:    "#dcfce7",
  palest:  "#f0fdf4", text:  "#052e16", muted:   "#4b6358",
  border:  "#bbf7d0", card:  "#ffffff",
};

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const FACULTY = { name:"Dr. S. Priya Vasanth", id:"F002", dept:"Dept. of Computer Applications", role:"Faculty" };

const MY_SUBJECTS = [
  { code:"NET601", name:".NET Programming", year:3, sem:5, section:"A", students:32 },
  { code:"ASP602", name:"ASP.NET Lab",      year:3, sem:5, section:"B", students:28 },
  { code:"NET401", name:"C# Basics",        year:2, sem:3, section:"A", students:35 },
  { code:"WD501",  name:"Web Development",  year:3, sem:5, section:"C", students:30 },
];

const TODAY_CLASSES = [
  { time:"8:45",  subj:".NET Programming", room:"CS-101", section:"A", done:true  },
  { time:"10:25", subj:"ASP.NET Lab",      room:"Lab-2",  section:"B", done:false },
  { time:"12:05", subj:"C# Basics",        room:"CS-102", section:"A", done:false },
  { time:"14:00", subj:"Web Development",  room:"CS-101", section:"C", done:false },
];

const STUDENTS = Array.from({ length: 30 }, (_, i) => ({
  id:         `MCA${String(2026001+i).slice(-4)}`,
  name:       ["Priya D","Arun K","Meena R","Rajan M","Kavitha S","Suresh P","Arjun K","Lakshmi V","Dinesh T","Vijay N","Shalini A","Karthik B","Deepa C","Manoj D","Anitha E","Prakash F","Saranya G","Vinoth H","Prabha I","Selvam J","Rani K","Mani L","Uma M","Bala N","Geetha O","Kumar P","Nisha Q","Anil R","Devi S","Raj T"][i],
  year:       [3,3,3,2,2,2,3,3,2,2,3,3,2,3,2,3,2,3,2,3,2,3,2,3,3,2,2,3,2,3][i],
  sem:        [5,5,5,3,3,3,5,5,3,3,5,5,3,5,3,5,3,5,3,5,3,5,3,5,5,3,3,5,3,5][i],
  section:    ["A","B","A","A","B","C","B","A","A","B","C","A","B","C","A","B","C","A","B","C","A","B","C","A","B","C","A","B","C","A"][i],
  attendance: Math.round(58 + Math.random()*40),
  internal:   Math.round(10 + Math.random()*10),
  assignment: ["Submitted","Pending","Late"][Math.floor(Math.random()*3)],
  gender:     i%3===0?"Female":"Male",
}));

const ASSIGNMENTS = [
  { id:1, title:"Unit III — Web Forms Exercise",   subject:".NET", due:"2026-07-15", submitted:24, total:32, late:3 },
  { id:2, title:"ASP.NET CRUD Lab Report",         subject:"ASP", due:"2026-07-18", submitted:18, total:28, late:5 },
  { id:3, title:"OOP Design Patterns",             subject:"C#",  due:"2026-07-20", submitted:30, total:35, late:2 },
  { id:4, title:"Responsive Layout Project",       subject:"Web", due:"2026-07-22", submitted:10, total:30, late:1 },
];

const MATERIALS = [
  { id:1, name:"ASP.NET MVC Architecture.pdf",   type:"pdf",  size:"1.1 MB", date:"2026-07-01", subj:".NET" },
  { id:2, name:"Entity Framework Guide.pdf",     type:"pdf",  size:"900 KB", date:"2026-07-03", subj:"ASP" },
  { id:3, name:"C# Basics Slides.pptx",          type:"ppt",  size:"3.4 MB", date:"2026-06-28", subj:"C#"  },
  { id:4, name:"Web API Demo.mp4",               type:"video",size:"28 MB",  date:"2026-07-05", subj:"Web" },
  { id:5, name:"LINQ Reference Sheet.pdf",       type:"pdf",  size:"420 KB", date:"2026-07-06", subj:".NET"},
];

const ANNOUNCEMENTS = [
  { id:1, title:"II Internal Exam — 08 Sep 2026",  priority:"High",   to:"All",       date:"2026-07-06" },
  { id:2, title:"Lab Record Submission Deadline",  priority:"Medium", to:"3rd Year",  date:"2026-07-04" },
  { id:3, title:"TCS Placement Drive Registration",priority:"High",   to:"Final Year",date:"2026-07-05" },
  { id:4, title:"TECHVISTA 2026 — Register Now",   priority:"Medium", to:"All",       date:"2026-07-03" },
];

const NOTIFICATIONS = [
  { id:1, type:"submit",  msg:"Priya D submitted Unit III Assignment",          time:"5m ago",  read:false },
  { id:2, type:"hod",     msg:"HOD: All records due by 20 July",               time:"1h ago",  read:false },
  { id:3, type:"exam",    msg:"II Internal Exam scheduled: 08 Sep 2026",       time:"2h ago",  read:false },
  { id:4, type:"submit",  msg:"4 new submissions for ASP.NET Lab Report",      time:"3h ago",  read:false },
  { id:5, type:"leave",   msg:"Arun K submitted a leave request",              time:"1d ago",  read:true  },
  { id:6, type:"dept",    msg:"Department meeting: Friday 4 PM, Seminar Hall", time:"1d ago",  read:true  },
];

const ATT_TREND = [
  { m:"Feb", val:83 },{ m:"Mar", val:79 },{ m:"Apr", val:77 },
  { m:"May", val:82 },{ m:"Jun", val:75 },{ m:"Jul", val:78 },
];

// ─── NAV TREE ─────────────────────────────────────────────────────────────────
const NAV = [
  { key:"dashboard",  label:"Dashboard",      icon:"⊞", ch:[] },
  { key:"classes",    label:"My Classes",     icon:"🏫", ch:[
    {key:"today-cls",  label:"Today's Classes"},
    {key:"timetable",  label:"Weekly Timetable"},
    {key:"schedule",   label:"Class Schedule"},
  ]},
  { key:"students",   label:"Students",       icon:"🎓", ch:[
    {key:"my-students", label:"My Students"},
    {key:"profiles",    label:"Student Profiles"},
    {key:"att-hist",    label:"Attendance History"},
    {key:"performance", label:"Performance"},
  ]},
  { key:"attendance", label:"Attendance",     icon:"✅", ch:[
    {key:"take-att",  label:"Take Attendance"},
    {key:"edit-att",  label:"Edit Attendance"},
    {key:"att-rep",   label:"Attendance Reports"},
    {key:"low-att",   label:"Low Attendance"},
  ]},
  { key:"marks",      label:"Marks",          icon:"📊", ch:[
    {key:"internal",  label:"Internal Marks"},
    {key:"assign-mk", label:"Assignment Marks"},
    {key:"practical", label:"Practical Marks"},
    {key:"semester",  label:"Semester Marks"},
    {key:"mk-hist",   label:"Mark History"},
  ]},
  { key:"assignments",label:"Assignments",    icon:"📋", ch:[
    {key:"create-asgn",  label:"Create Assignment"},
    {key:"submitted",    label:"Submitted"},
    {key:"grade-asgn",   label:"Grade Assignments"},
    {key:"asgn-analytics",label:"Analytics"},
  ]},
  { key:"materials",  label:"Study Materials",icon:"📚", ch:[
    {key:"upload-notes",label:"Upload Notes"},
    {key:"upload-pdf",  label:"Upload PDFs"},
    {key:"upload-vid",  label:"Upload Videos"},
    {key:"course-mat",  label:"Course Materials"},
  ]},
  { key:"announces",  label:"Announcements",  icon:"📢", ch:[
    {key:"create-ann",  label:"Create Announcement"},
    {key:"dept-notices",label:"Department Notices"},
    {key:"notif",       label:"Student Notifications"},
  ]},
  { key:"reports",    label:"Reports",        icon:"📑", ch:[
    {key:"att-report", label:"Attendance Report"},
    {key:"marks-rep",  label:"Marks Report"},
    {key:"asgn-rep",   label:"Assignment Report"},
    {key:"cls-perf",   label:"Class Performance"},
    {key:"exp-pdf",    label:"Export PDF"},
    {key:"exp-excel",  label:"Export Excel"},
  ]},
  { key:"messages",   label:"Messages",       icon:"💬", ch:[
    {key:"stu-msg",    label:"Student Messages"},
    {key:"parent-msg", label:"Parent Messages"},
    {key:"dept-comm",  label:"Dept. Communication"},
  ]},
  { key:"profile",    label:"Profile",        icon:"👤", ch:[
    {key:"my-profile", label:"My Profile"},
    {key:"password",   label:"Change Password"},
  ]},
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function Avatar({ name, size=8, bg=G.primary }) {
  const i = name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
  const sz = { 7:"28px", 8:"32px", 10:"40px", 12:"48px" }[size] || "32px";
  return (
    <div className="rounded-xl flex items-center justify-center font-black text-white shrink-0"
      style={{ width:sz, height:sz, background:bg, fontSize: parseInt(sz)*0.32 }}>
      {i}
    </div>
  );
}

function Badge({ label }) {
  const m = {
    High:      { bg:"#fef2f2", c:"#dc2626" },
    Medium:    { bg:"#fffbeb", c:"#d97706" },
    Low:       { bg:"#f0fdf4", c:"#16a34a" },
    Submitted: { bg:"#f0fdf4", c:"#16a34a" },
    Pending:   { bg:"#fffbeb", c:"#d97706" },
    Late:      { bg:"#fef2f2", c:"#dc2626" },
    Present:   { bg:"#f0fdf4", c:"#16a34a" },
    Absent:    { bg:"#fef2f2", c:"#dc2626" },
  };
  const s = m[label]||{ bg:"#f3f4f6", c:"#374151" };
  return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
    style={{ background:s.bg, color:s.c }}>{label}</span>;
}

function AttBar({ value }) {
  const c = value>=75?"#22c55e":value>=60?"#d97706":"#dc2626";
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width:`${value}%`, background:c }} />
      </div>
      <span className="text-[11px] font-bold shrink-0" style={{ color:c }}>{value}%</span>
    </div>
  );
}

function MiniSpark({ data, color=G.mid }) {
  const max=Math.max(...data), min=Math.min(...data), r=max-min||1;
  const pts=data.map((v,i)=>`${(i/(data.length-1))*76},${24-((v-min)/r)*22}`).join(" ");
  return (
    <svg width="76" height="26" viewBox="0 0 76 26">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points={`0,26 ${pts} 76,26`} fill={color} fillOpacity="0.1" stroke="none"/>
    </svg>
  );
}

// ─── CHARTS ──────────────────────────────────────────────────────────────────
function AttTrendChart() {
  const max=90, h=80;
  return (
    <div>
      <div className="flex items-end gap-2" style={{ height:h }}>
        {ATT_TREND.map((d,i) => {
          const barH=Math.round((d.val/max)*h);
          const c=d.val>=75?G.mid:"#f59e0b";
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[9px] font-bold" style={{ color:c }}>{d.val}%</span>
              <div className="w-full rounded-t-lg" style={{ height:barH, background:c, opacity:0.85 }} />
            </div>
          );
        })}
      </div>
      <div className="flex mt-1">
        {ATT_TREND.map(d=>(
          <span key={d.m} className="flex-1 text-center text-[9px] text-gray-400">{d.m}</span>
        ))}
      </div>
    </div>
  );
}

function SubjPerfChart() {
  const data=[{s:"OS",v:82},{s:".NET",v:76},{s:"ASP",v:90},{s:"SPM",v:71},{s:"NM",v:65}];
  return (
    <div className="space-y-2">
      {data.map(d=>(
        <div key={d.s} className="flex items-center gap-2">
          <span className="text-[10px] font-semibold text-gray-600 w-10 shrink-0">{d.s}</span>
          <div className="flex-1 h-3 rounded-full bg-gray-100 overflow-hidden">
            <div className="h-full rounded-full" style={{ width:`${d.v}%`, background:`linear-gradient(90deg,${G.mid},${G.primary})` }} />
          </div>
          <span className="text-[10px] font-bold text-gray-700 w-7 text-right">{d.v}%</span>
        </div>
      ))}
    </div>
  );
}

function AssignDonut({ submitted, pending, late, total }) {
  const r=30, circ=2*Math.PI*r;
  const s_pct=submitted/total, p_pct=pending/total, l_pct=late/total;
  const s_dash=s_pct*circ, p_dash=p_pct*circ, l_dash=l_pct*circ;
  return (
    <div className="flex items-center gap-4">
      <svg width="80" height="80" viewBox="0 0 80 80" className="-rotate-90">
        <circle cx="40" cy="40" r={r} fill="none" stroke="#f3f4f6" strokeWidth="10"/>
        <circle cx="40" cy="40" r={r} fill="none" stroke="#22c55e" strokeWidth="10"
          strokeDasharray={`${s_dash} ${circ-s_dash}`}/>
        <circle cx="40" cy="40" r={r} fill="none" stroke="#f59e0b" strokeWidth="10"
          strokeDasharray={`${p_dash} ${circ-p_dash}`} strokeDashoffset={-s_dash}/>
        <circle cx="40" cy="40" r={r} fill="none" stroke="#ef4444" strokeWidth="10"
          strokeDasharray={`${l_dash} ${circ-l_dash}`} strokeDashoffset={-(s_dash+p_dash)}/>
      </svg>
      <div className="space-y-1.5">
        {[["Submitted",submitted,"#22c55e"],["Pending",pending,"#f59e0b"],["Late",late,"#ef4444"]].map(([l,v,c])=>(
          <div key={l} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background:c }} />
            <span className="text-[11px] text-gray-600">{l}</span>
            <span className="text-[11px] font-bold text-gray-800 ml-auto">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── KPI CARD ─────────────────────────────────────────────────────────────────
function KPICard({ icon, label, value, sub, color, trend, alert }) {
  return (
    <div className="bg-white rounded-2xl p-4 border hover:shadow-md transition-shadow"
      style={{ borderColor: alert?"#fca5a5":G.border, background: alert?"#fff8f8":"white" }}>
      <div className="flex items-center justify-between mb-2">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
          style={{ background: alert?"#fef2f2":`${color}18` }}>{icon}</div>
        {trend && <MiniSpark data={trend} color={color} />}
        {alert && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
      </div>
      <p className="text-2xl font-black" style={{ color: alert?"#dc2626":color }}>{value}</p>
      <p className="text-[11px] font-semibold text-gray-600 mt-0.5 leading-tight">{label}</p>
      {sub && <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>}
    </div>
  );
}

// ─── PAGE: DASHBOARD ──────────────────────────────────────────────────────────
function PageDashboard({ setPage }) {
  const totalStudents = MY_SUBJECTS.reduce((s,x)=>s+x.students,0);
  const pendingAtt = TODAY_CLASSES.filter(c=>!c.done).length;
  return (
    <div className="space-y-5">
      {/* Welcome */}
      <div className="rounded-2xl p-5 text-white overflow-hidden relative"
        style={{ background:`linear-gradient(135deg,${G.dark} 0%,${G.deep} 50%,${G.primary} 100%)` }}>
        <div className="absolute right-0 top-0 w-40 h-full opacity-10 flex items-center justify-center text-9xl select-none">🎓</div>
        <div className="relative">
          <p className="text-green-300 text-[10px] font-bold uppercase tracking-widest mb-1">Faculty Dashboard</p>
          <h2 className="text-xl font-black">Good morning, Dr. Priya Vasanth 👋</h2>
          <p className="text-green-200 text-sm mt-1">{FACULTY.dept} · {new Date().toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long"})}</p>
          <div className="flex gap-3 mt-4 flex-wrap">
            {[["✅ Take Attendance","take-att"],["📊 Upload Marks","internal"],["📋 New Assignment","create-asgn"],["📢 Announce","create-ann"]].map(([l,k])=>(
              <button key={k} onClick={()=>setPage(k)}
                className="text-[11px] font-bold px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 transition-colors">{l}</button>
            ))}
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <KPICard icon="👥" label="Assigned Students" value={totalStudents} color={G.primary} trend={[110,115,118,120,122,125]} />
        <KPICard icon="📖" label="Subjects" value={MY_SUBJECTS.length} color="#1d4ed8" sub="This semester" />
        <KPICard icon="🏫" label="Today's Classes" value={TODAY_CLASSES.length} color="#7c3aed" sub={`${TODAY_CLASSES.filter(c=>c.done).length} completed`}/>
        <KPICard icon="⚠️" label="Pending Attendance" value={pendingAtt} color="#dc2626" alert={pendingAtt>0} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <KPICard icon="📋" label="To Review" value={ASSIGNMENTS.reduce((s,a)=>s+a.submitted,0)} color="#d97706" sub="Assignment submissions" trend={[12,18,22,26,30,32]}/>
        <KPICard icon="📊" label="Marks Pending" value={2} color="#0891b2" sub="Subjects pending upload"/>
        <KPICard icon="📅" label="Upcoming Exams" value={1} color="#7c3aed" sub="II Internal – 08 Sep"/>
        <KPICard icon="📢" label="Announcements" value={ANNOUNCEMENTS.length} color={G.primary} sub="This week"/>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border p-4" style={{ borderColor:G.border }}>
          <p className="text-[12px] font-bold text-gray-700 mb-3">Attendance Trend</p>
          <AttTrendChart />
        </div>
        <div className="bg-white rounded-2xl border p-4" style={{ borderColor:G.border }}>
          <p className="text-[12px] font-bold text-gray-700 mb-3">Subject Performance</p>
          <SubjPerfChart />
        </div>
        <div className="bg-white rounded-2xl border p-4" style={{ borderColor:G.border }}>
          <p className="text-[12px] font-bold text-gray-700 mb-1">Assignment Status</p>
          <p className="text-[10px] text-gray-400 mb-3">All subjects combined</p>
          <AssignDonut
            submitted={ASSIGNMENTS.reduce((s,a)=>s+a.submitted,0)}
            pending={ASSIGNMENTS.reduce((s,a)=>s+(a.total-a.submitted-a.late),0)}
            late={ASSIGNMENTS.reduce((s,a)=>s+a.late,0)}
            total={ASSIGNMENTS.reduce((s,a)=>s+a.total,0)}
          />
        </div>
      </div>

      {/* Today's classes + Recent announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border p-4" style={{ borderColor:G.border }}>
          <div className="flex justify-between items-center mb-3">
            <p className="text-[12px] font-bold text-gray-700">Today's Schedule</p>
            <button onClick={()=>setPage("today-cls")} className="text-[10px] font-bold" style={{ color:G.primary }}>View all</button>
          </div>
          <div className="space-y-2">
            {TODAY_CLASSES.map((c,i)=>(
              <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl border ${c.done?"border-green-100 bg-green-50/40":"border-gray-100"}`}>
                <div className="text-center w-10 shrink-0">
                  <p className="text-[11px] font-black text-gray-700">{c.time}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-bold text-gray-800 truncate">{c.subj}</p>
                  <p className="text-[10px] text-gray-400">{c.room} · Sec {c.section}</p>
                </div>
                {c.done
                  ? <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Done</span>
                  : <button onClick={()=>setPage("take-att")} className="text-[10px] font-bold text-white px-2.5 py-1 rounded-lg" style={{ background:G.primary }}>Attend</button>
                }
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border p-4" style={{ borderColor:G.border }}>
          <div className="flex justify-between items-center mb-3">
            <p className="text-[12px] font-bold text-gray-700">Recent Announcements</p>
            <button onClick={()=>setPage("dept-notices")} className="text-[10px] font-bold" style={{ color:G.primary }}>All</button>
          </div>
          <div className="space-y-2">
            {ANNOUNCEMENTS.map(a=>(
              <div key={a.id} className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                <span className="text-base shrink-0">📢</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-gray-700 leading-snug">{a.title}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{a.to} · {a.date}</p>
                </div>
                <Badge label={a.priority} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PAGE: STUDENTS ───────────────────────────────────────────────────────────
function PageStudents({ setPage }) {
  const [search,  setSearch]  = useState("");
  const [filterY, setFilterY] = useState("all");
  const [filterS, setFilterS] = useState("all");
  const [filterSec,setFilterSec]=useState("all");
  const [filterSub,setFilterSub]=useState("all");
  const [selected, setSelected] = useState(null);
  const [remark,   setRemark]   = useState("");

  const filtered = STUDENTS.filter(s=>{
    const ms=!search||s.name.toLowerCase().includes(search.toLowerCase())||s.id.toLowerCase().includes(search.toLowerCase());
    const my=filterY==="all"||s.year===+filterY;
    const msem=filterS==="all"||s.sem===+filterS;
    const msec=filterSec==="all"||s.section===filterSec;
    return ms&&my&&msem&&msec;
  });

  if (selected) return (
    <div className="space-y-4">
      <button onClick={()=>setSelected(null)} className="flex items-center gap-1 text-sm font-bold" style={{color:G.primary}}>← Back</button>
      <div className="bg-white rounded-2xl border p-6" style={{borderColor:G.border}}>
        <div className="flex items-start gap-4 mb-6">
          <Avatar name={selected.name} size={12} />
          <div className="flex-1">
            <h2 className="text-xl font-black text-gray-800">{selected.name}</h2>
            <p className="text-gray-500 text-sm">{selected.id} · Year {selected.year} · Sem {selected.sem} · Sec {selected.section}</p>
            <div className="flex gap-2 mt-2">
              <Badge label={selected.gender} />
              <Badge label={selected.assignment} />
            </div>
          </div>
          <button className="text-xs font-bold px-4 py-2 rounded-xl text-white" style={{background:G.primary}}>Download Report</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            {label:"Attendance",value:`${selected.attendance}%`,color:selected.attendance>=75?G.primary:"#dc2626"},
            {label:"Internal",value:`${selected.internal}/20`,color:G.primary},
            {label:"Assignment",value:selected.assignment,color:"#374151"},
            {label:"Semester",value:selected.sem,color:"#374151"},
          ].map(d=>(
            <div key={d.label} className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-xl font-black" style={{color:d.color}}>{d.value}</p>
              <p className="text-[11px] text-gray-500">{d.label}</p>
            </div>
          ))}
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wide text-gray-500 mb-2">Add Remark</p>
          <div className="flex gap-2">
            <input value={remark} onChange={e=>setRemark(e.target.value)} placeholder="Add a remark for this student..."
              className="flex-1 border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
              style={{borderColor:G.border}} />
            <button className="px-4 py-2 rounded-xl text-sm font-bold text-white" style={{background:G.primary}}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-base font-black text-gray-800">My Students</h2>
        <button className="text-xs font-bold px-3 py-1.5 rounded-xl text-white" style={{background:G.primary}}>Export</button>
      </div>
      <div className="bg-white rounded-2xl border p-4 space-y-3" style={{borderColor:G.border}}>
        <div className="relative">
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name or register no..."
            className="w-full pl-8 pr-4 py-2.5 border rounded-xl text-[13px] bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-300"
            style={{borderColor:G.border}} />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {[
            {val:filterY,set:setFilterY,opts:[["all","All Years"],["2","Year 2"],["3","Year 3"]]},
            {val:filterS,set:setFilterS,opts:[["all","All Sems"],["3","Sem 3"],["5","Sem 5"]]},
            {val:filterSec,set:setFilterSec,opts:[["all","All Sections"],["A","A"],["B","B"],["C","C"]]},
          ].map((f,i)=>(
            <select key={i} value={f.val} onChange={e=>f.set(e.target.value)}
              className="text-[12px] border rounded-lg px-3 py-1.5 bg-white focus:outline-none" style={{borderColor:G.border}}>
              {f.opts.map(([v,l])=><option key={v} value={v}>{l}</option>)}
            </select>
          ))}
        </div>
        <p className="text-[11px] text-gray-400">{filtered.length} students</p>
      </div>
      <div className="bg-white rounded-2xl border overflow-hidden" style={{borderColor:G.border}}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr style={{background:`${G.primary}12`}}>
                {["Student","Reg No","Yr","Sem","Sec","Attendance","Internal","Assignment","Actions"].map(h=>(
                  <th key={h} className="px-3 py-3 text-left text-[10px] font-bold uppercase tracking-wide" style={{color:G.primary}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s,i)=>(
                <tr key={s.id} className="border-t hover:bg-green-50/30 transition-colors" style={{borderColor:G.border}}>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <Avatar name={s.name} size={7} />
                      <span className="text-[12px] font-semibold text-gray-800">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-[11px] font-mono text-gray-500">{s.id}</td>
                  <td className="px-3 py-2.5 text-[12px] text-gray-600">{s.year}</td>
                  <td className="px-3 py-2.5 text-[12px] text-gray-600">{s.sem}</td>
                  <td className="px-3 py-2.5 text-[12px] text-gray-600">{s.section}</td>
                  <td className="px-3 py-2.5 w-28"><AttBar value={s.attendance} /></td>
                  <td className="px-3 py-2.5">
                    <span className="text-[12px] font-bold" style={{color:s.internal>=15?G.primary:s.internal>=10?"#d97706":"#dc2626"}}>{s.internal}/20</span>
                  </td>
                  <td className="px-3 py-2.5"><Badge label={s.assignment} /></td>
                  <td className="px-3 py-2.5">
                    <div className="flex gap-1">
                      <button onClick={()=>setSelected(s)} className="text-[10px] font-bold px-2 py-1 rounded-lg text-white" style={{background:G.primary}}>View</button>
                      <button onClick={()=>setPage("take-att")} className="text-[10px] font-bold px-2 py-1 rounded-lg border" style={{borderColor:G.border,color:G.muted}}>Att</button>
                      <button onClick={()=>setPage("internal")} className="text-[10px] font-bold px-2 py-1 rounded-lg border" style={{borderColor:G.border,color:G.muted}}>Marks</button>
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

// ─── PAGE: TAKE ATTENDANCE ────────────────────────────────────────────────────
function PageAttendance() {
  const [subject, setSubject] = useState(MY_SUBJECTS[0].code);
  const [date,    setDate]    = useState(new Date().toISOString().split("T")[0]);
  const [confirm, setConfirm] = useState(false);
  const [saved,   setSaved]   = useState(false);
  const sub = MY_SUBJECTS.find(s=>s.code===subject)||MY_SUBJECTS[0];
  const students = STUDENTS.filter(s=>s.year===sub.year&&s.section===sub.section);
  const [att, setAtt] = useState({});
  const mark = (id,status) => setAtt(a=>({...a,[id]:status}));
  const markAll = (status) => { const n={}; students.forEach(s=>n[s.id]=status); setAtt(n); };

  if (saved) return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <span className="text-6xl">✅</span>
      <p className="text-xl font-black text-gray-800">Attendance Saved!</p>
      <p className="text-gray-500 text-sm">{subject} · {date} · {students.length} students</p>
      <button onClick={()=>setSaved(false)} className="mt-2 text-sm font-bold px-6 py-2.5 rounded-xl text-white" style={{background:G.primary}}>Take Another</button>
    </div>
  );

  return (
    <div className="space-y-4">
      <h2 className="text-base font-black text-gray-800">Take Attendance</h2>
      <div className="bg-white rounded-2xl border p-4 grid grid-cols-1 sm:grid-cols-3 gap-3" style={{borderColor:G.border}}>
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wide text-gray-500 block mb-1">Subject</label>
          <select value={subject} onChange={e=>setSubject(e.target.value)}
            className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none" style={{borderColor:G.border}}>
            {MY_SUBJECTS.map(s=><option key={s.code} value={s.code}>{s.name} — Sec {s.section}</option>)}
          </select>
        </div>
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wide text-gray-500 block mb-1">Date</label>
          <input type="date" value={date} onChange={e=>setDate(e.target.value)}
            className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none" style={{borderColor:G.border}} />
        </div>
        <div className="flex items-end gap-2">
          <button onClick={()=>markAll("Present")} className="flex-1 py-2 rounded-xl text-xs font-bold bg-green-100 text-green-700 hover:bg-green-200 transition-colors">All Present</button>
          <button onClick={()=>markAll("Absent")}  className="flex-1 py-2 rounded-xl text-xs font-bold bg-red-100 text-red-600 hover:bg-red-200 transition-colors">All Absent</button>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white rounded-2xl border p-3 flex items-center gap-3" style={{borderColor:G.border}}>
        <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
          <div className="h-full rounded-full transition-all" style={{ width:`${(Object.keys(att).length/students.length)*100}%`, background:G.mid }} />
        </div>
        <span className="text-[12px] font-bold text-gray-700 shrink-0">{Object.keys(att).length}/{students.length} marked</span>
      </div>

      <div className="bg-white rounded-2xl border overflow-hidden" style={{borderColor:G.border}}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[500px]">
            <thead>
              <tr style={{background:`${G.primary}10`}}>
                {["Student","Reg No","Status"].map(h=>(
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wide" style={{color:G.primary}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map(s=>(
                <tr key={s.id} className="border-t" style={{borderColor:G.border}}>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <Avatar name={s.name} size={7} />
                      <span className="text-[12px] font-semibold text-gray-800">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-[11px] font-mono text-gray-500">{s.id}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex gap-1.5">
                      {["Present","Absent","Late"].map(st=>(
                        <button key={st} onClick={()=>mark(s.id,st)}
                          className="text-[10px] font-bold px-2.5 py-1 rounded-lg transition-all"
                          style={{
                            background: att[s.id]===st ? (st==="Present"?G.primary:st==="Absent"?"#dc2626":"#d97706") : "#f3f4f6",
                            color:      att[s.id]===st ? "white" : "#6b7280",
                          }}>{st}</button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button onClick={()=>setConfirm(true)}
        className="w-full py-3 rounded-2xl font-bold text-white transition-opacity hover:opacity-90"
        style={{background:`linear-gradient(135deg,${G.dark},${G.primary})`}}>
        Save Attendance
      </button>

      {/* Confirm dialog */}
      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <p className="text-[15px] font-black text-gray-800 mb-2">Confirm Attendance</p>
            <p className="text-[13px] text-gray-500 mb-5">
              Save attendance for <strong>{subject}</strong> on <strong>{date}</strong>?<br />
              {Object.values(att).filter(v=>v==="Present").length} present · {Object.values(att).filter(v=>v==="Absent").length} absent · {Object.values(att).filter(v=>v==="Late").length} late
            </p>
            <div className="flex gap-3">
              <button onClick={()=>setConfirm(false)} className="flex-1 py-2.5 rounded-xl border text-sm font-bold" style={{borderColor:G.border}}>Cancel</button>
              <button onClick={()=>{setConfirm(false);setSaved(true);}} className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold" style={{background:G.primary}}>Confirm & Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PAGE: MARKS ─────────────────────────────────────────────────────────────
function PageMarks() {
  const [subject, setSubject] = useState(MY_SUBJECTS[0].code);
  const [marks,   setMarks]   = useState({});
  const [saved,   setSaved]   = useState(false);
  const sub = MY_SUBJECTS.find(s=>s.code===subject)||MY_SUBJECTS[0];
  const students = STUDENTS.filter(s=>s.year===sub.year&&s.section===sub.section);

  const setMark=(id,v)=>{
    const n=parseInt(v);
    if(v===""||(!isNaN(n)&&n>=0&&n<=20)) setMarks(m=>({...m,[id]:v}));
  };

  if (saved) return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <span className="text-6xl">📊</span>
      <p className="text-xl font-black text-gray-800">Marks Uploaded!</p>
      <button onClick={()=>{setSaved(false);setMarks({});}} className="mt-2 text-sm font-bold px-6 py-2.5 rounded-xl text-white" style={{background:G.primary}}>Upload Again</button>
    </div>
  );

  return (
    <div className="space-y-4">
      <h2 className="text-base font-black text-gray-800">Internal Marks</h2>
      <div className="bg-white rounded-2xl border p-4 flex gap-3 flex-wrap" style={{borderColor:G.border}}>
        <select value={subject} onChange={e=>setSubject(e.target.value)}
          className="border rounded-xl px-3 py-2 text-sm focus:outline-none" style={{borderColor:G.border}}>
          {MY_SUBJECTS.map(s=><option key={s.code} value={s.code}>{s.name}</option>)}
        </select>
        <button className="text-xs font-bold px-4 py-2 rounded-xl border" style={{borderColor:G.border,color:G.muted}}>📥 Bulk Upload Excel</button>
        <button className="text-xs font-bold px-4 py-2 rounded-xl border" style={{borderColor:G.border,color:G.muted}}>📑 Download Template</button>
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 text-[12px] text-amber-700 font-medium">
        ⚠️ Marks must be between 0 and 20. Invalid entries are highlighted in red.
      </div>
      <div className="bg-white rounded-2xl border overflow-hidden" style={{borderColor:G.border}}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[500px]">
            <thead>
              <tr style={{background:`${G.primary}10`}}>
                {["Student","Reg No","I Internal (/20)","Status"].map(h=>(
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wide" style={{color:G.primary}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map(s=>{
                const val=marks[s.id]??"";
                const invalid=val!==""&&(isNaN(parseInt(val))||parseInt(val)<0||parseInt(val)>20);
                return (
                  <tr key={s.id} className="border-t" style={{borderColor:G.border}}>
                    <td className="px-4 py-2.5"><div className="flex items-center gap-2"><Avatar name={s.name} size={7}/><span className="text-[12px] font-semibold text-gray-800">{s.name}</span></div></td>
                    <td className="px-4 py-2.5 text-[11px] font-mono text-gray-500">{s.id}</td>
                    <td className="px-4 py-2.5">
                      <input value={val} onChange={e=>setMark(s.id,e.target.value)} placeholder="0–20"
                        className="w-20 border rounded-lg px-2.5 py-1.5 text-[13px] text-center font-bold focus:outline-none focus:ring-2"
                        style={{
                          borderColor: invalid?"#dc2626":G.border,
                          background: invalid?"#fef2f2":"white",
                          color: invalid?"#dc2626":"#374151",
                          ringColor: invalid?"#dc2626":G.primary,
                        }} />
                    </td>
                    <td className="px-4 py-2.5">
                      {val===""?<span className="text-[10px] text-gray-400">—</span>:invalid?<span className="text-[10px] text-red-500 font-bold">Invalid</span>:<span className="text-[10px] text-green-600 font-bold">✓ Valid</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <button onClick={()=>setSaved(true)}
        className="w-full py-3 rounded-2xl font-bold text-white" style={{background:`linear-gradient(135deg,${G.dark},${G.primary})`}}>
        Upload Marks
      </button>
    </div>
  );
}

// ─── PAGE: ASSIGNMENTS ────────────────────────────────────────────────────────
function PageAssignments({ setPage }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-base font-black text-gray-800">Assignments</h2>
        <button onClick={()=>setPage("create-asgn")} className="text-xs font-bold px-4 py-2 rounded-xl text-white" style={{background:G.primary}}>+ Create</button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {label:"Total",   value:ASSIGNMENTS.length,                                    color:G.primary},
          {label:"Submitted",value:ASSIGNMENTS.reduce((s,a)=>s+a.submitted,0),           color:"#22c55e"},
          {label:"Pending", value:ASSIGNMENTS.reduce((s,a)=>s+(a.total-a.submitted),0),  color:"#d97706"},
          {label:"Late",    value:ASSIGNMENTS.reduce((s,a)=>s+a.late,0),                 color:"#dc2626"},
        ].map(c=>(
          <div key={c.label} className="bg-white rounded-2xl border p-4 text-center" style={{borderColor:G.border}}>
            <p className="text-2xl font-black" style={{color:c.color}}>{c.value}</p>
            <p className="text-[11px] text-gray-500 mt-0.5">{c.label}</p>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        {ASSIGNMENTS.map(a=>(
          <div key={a.id} className="bg-white rounded-2xl border p-4" style={{borderColor:G.border}}>
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <p className="text-[13px] font-bold text-gray-800">{a.title}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">{a.subject} · Due: {a.due}</p>
              </div>
              <button className="text-[11px] font-bold px-3 py-1.5 rounded-xl text-white shrink-0" style={{background:G.primary}}>Grade</button>
            </div>
            <div className="flex gap-4 mb-2">
              {[["Submitted",a.submitted,"#22c55e"],["Pending",a.total-a.submitted-a.late,"#d97706"],["Late",a.late,"#dc2626"]].map(([l,v,c])=>(
                <span key={l} className="flex items-center gap-1 text-[11px] text-gray-600">
                  <span className="w-2 h-2 rounded-full" style={{background:c}} />{l}: <strong>{v}</strong>
                </span>
              ))}
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden flex">
              <div style={{width:`${(a.submitted/a.total)*100}%`, background:"#22c55e"}} />
              <div style={{width:`${(a.late/a.total)*100}%`,      background:"#ef4444"}} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PAGE: CREATE ASSIGNMENT ──────────────────────────────────────────────────
function PageCreateAssign() {
  const [form,setSaved]=useState(false);
  if(form) return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <span className="text-6xl">📋</span>
      <p className="text-xl font-black text-gray-800">Assignment Created!</p>
      <button onClick={()=>setSaved(false)} className="mt-2 text-sm font-bold px-6 py-2.5 rounded-xl text-white" style={{background:G.primary}}>Create Another</button>
    </div>
  );
  return (
    <div className="space-y-4 max-w-xl">
      <h2 className="text-base font-black text-gray-800">Create Assignment</h2>
      <div className="bg-white rounded-2xl border p-5 space-y-4" style={{borderColor:G.border}}>
        {[
          {label:"Title",type:"text",placeholder:"Assignment title..."},
          {label:"Due Date",type:"date",placeholder:""},
          {label:"Max Marks",type:"number",placeholder:"e.g. 10"},
        ].map(f=>(
          <div key={f.label}>
            <label className="text-[10px] font-bold uppercase tracking-wide text-gray-500 block mb-1">{f.label}</label>
            <input type={f.type} placeholder={f.placeholder}
              className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
              style={{borderColor:G.border}} />
          </div>
        ))}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wide text-gray-500 block mb-1">Subject</label>
          <select className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none" style={{borderColor:G.border}}>
            {MY_SUBJECTS.map(s=><option key={s.code}>{s.name}</option>)}
          </select>
        </div>
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wide text-gray-500 block mb-1">Description</label>
          <textarea rows={3} placeholder="Instructions for students..."
            className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none resize-none" style={{borderColor:G.border}} />
        </div>
        <div className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors" style={{borderColor:G.border}}>
          <p className="text-2xl mb-1">📎</p>
          <p className="text-[12px] font-semibold text-gray-600">Attach PDF or Document</p>
          <p className="text-[10px] text-gray-400 mt-0.5">PDF, DOCX, PPT up to 50 MB</p>
        </div>
        <button onClick={()=>setSaved(true)}
          className="w-full py-3 rounded-2xl font-bold text-white" style={{background:`linear-gradient(135deg,${G.dark},${G.primary})`}}>
          Publish Assignment
        </button>
      </div>
    </div>
  );
}

// ─── PAGE: MATERIALS ──────────────────────────────────────────────────────────
function PageMaterials() {
  const [saved,setSaved]=useState(false);
  const typeIcon={pdf:"📄",ppt:"📊",video:"🎬",doc:"📝"};
  return (
    <div className="space-y-4">
      <h2 className="text-base font-black text-gray-800">Study Materials</h2>
      <div className="border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors" style={{borderColor:G.border}}>
        <p className="text-4xl mb-2">☁️</p>
        <p className="text-[13px] font-bold text-gray-700">Upload Study Material</p>
        <p className="text-[11px] text-gray-400 mt-1">PDF · PPT · DOCX · MP4 · Images · External Links</p>
        <button className="mt-4 px-6 py-2 rounded-xl text-sm font-bold text-white" style={{background:G.primary}}>Choose Files</button>
      </div>
      {saved&&<div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-green-700 text-[12px] font-semibold">✅ File uploaded successfully! Students can access it now.</div>}
      <div className="bg-white rounded-2xl border overflow-hidden" style={{borderColor:G.border}}>
        <div className="px-4 py-3 border-b flex justify-between" style={{borderColor:G.border}}>
          <p className="text-[12px] font-bold text-gray-700">Uploaded Files</p>
          <span className="text-[10px] text-gray-400">{MATERIALS.length} files</span>
        </div>
        <div className="divide-y" style={{divideColor:G.border}}>
          {MATERIALS.map(m=>(
            <div key={m.id} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
              <span className="text-2xl">{typeIcon[m.type]||"📁"}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-semibold text-gray-800 truncate">{m.name}</p>
                <p className="text-[10px] text-gray-400">{m.subj} · {m.size} · {m.date}</p>
              </div>
              <div className="flex gap-1.5 shrink-0">
                <button className="text-[10px] font-bold px-2.5 py-1 rounded-lg border" style={{borderColor:G.border,color:G.muted}}>Share</button>
                <button className="text-[10px] font-bold px-2.5 py-1 rounded-lg text-red-600 bg-red-50">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PAGE: ANNOUNCEMENTS ──────────────────────────────────────────────────────
function PageAnnouncements() {
  const [sent,setSent]=useState(false);
  const [title,setTitle]=useState(""); const [body,setBody]=useState(""); const [to,setTo]=useState("All Students");
  if(sent) return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <span className="text-5xl">📢</span>
      <p className="text-xl font-black text-gray-800">Announcement Sent!</p>
      <button onClick={()=>{setSent(false);setTitle("");setBody("");}} className="mt-2 text-sm font-bold px-6 py-2.5 rounded-xl text-white" style={{background:G.primary}}>Create another</button>
    </div>
  );
  return (
    <div className="space-y-4">
      <h2 className="text-base font-black text-gray-800">Create Announcement</h2>
      <div className="bg-white rounded-2xl border p-5 space-y-4 max-w-xl" style={{borderColor:G.border}}>
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wide text-gray-500 block mb-1">Title</label>
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Announcement title..."
            className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300" style={{borderColor:G.border}}/>
        </div>
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wide text-gray-500 block mb-1">Send To</label>
          <select value={to} onChange={e=>setTo(e.target.value)} className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none" style={{borderColor:G.border}}>
            {["All Students","Year 2","Year 3","Section A","Section B","Section C"].map(o=><option key={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wide text-gray-500 block mb-1">Message</label>
          <textarea value={body} onChange={e=>setBody(e.target.value)} rows={4} placeholder="Write your announcement..."
            className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none resize-none" style={{borderColor:G.border}}/>
        </div>
        <button onClick={()=>title&&body&&setSent(true)}
          className="w-full py-3 rounded-2xl font-bold text-white" style={{background:`linear-gradient(135deg,${G.dark},${G.primary})`}}>
          Send Announcement
        </button>
      </div>
      <div className="bg-white rounded-2xl border p-4 max-w-xl" style={{borderColor:G.border}}>
        <p className="text-[12px] font-bold text-gray-700 mb-3">Recent Announcements</p>
        <div className="space-y-2">
          {ANNOUNCEMENTS.map(a=>(
            <div key={a.id} className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-gray-50">
              <span className="text-base shrink-0">📢</span>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-semibold text-gray-700">{a.title}</p>
                <p className="text-[10px] text-gray-400">{a.to} · {a.date}</p>
              </div>
              <Badge label={a.priority}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PAGE: REPORTS ────────────────────────────────────────────────────────────
function PageReports() {
  const reports=[
    {name:"Student Attendance Report",icon:"✅",desc:"Detailed attendance by student & subject"},
    {name:"Internal Marks Report",   icon:"📊",desc:"Unit-wise marks for all students"},
    {name:"Assignment Report",       icon:"📋",desc:"Submission & grading summary"},
    {name:"Class Performance",       icon:"🏆",desc:"Overall class analytics"},
  ];
  return (
    <div className="space-y-4">
      <h2 className="text-base font-black text-gray-800">Reports</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {reports.map(r=>(
          <div key={r.name} className="bg-white rounded-2xl border p-4 flex items-center gap-4 hover:shadow-md transition-shadow" style={{borderColor:G.border}}>
            <span className="text-3xl">{r.icon}</span>
            <div className="flex-1">
              <p className="text-[13px] font-bold text-gray-800">{r.name}</p>
              <p className="text-[11px] text-gray-500">{r.desc}</p>
            </div>
            <div className="flex gap-1.5">
              <button className="text-[10px] font-bold px-2.5 py-1.5 rounded-lg text-white" style={{background:"#dc2626"}}>PDF</button>
              <button className="text-[10px] font-bold px-2.5 py-1.5 rounded-lg text-white" style={{background:G.primary}}>Excel</button>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border p-4" style={{borderColor:G.border}}>
        <p className="text-[12px] font-bold text-gray-700 mb-3">Performance Analytics</p>
        <SubjPerfChart />
      </div>
    </div>
  );
}

function PagePlaceholder({ label }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-gray-400">
      <span className="text-6xl">🛠️</span>
      <p className="text-base font-bold text-gray-600">{label}</p>
      <p className="text-sm">Coming soon.</p>
    </div>
  );
}

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────
function Sidebar({ page, setPage, open, setOpen }) {
  const [exp,setExp]=useState({dashboard:true,students:true,attendance:true});
  const tog=k=>setExp(e=>({...e,[k]:!e[k]}));
  return (
    <>
      {open&&<div className="fixed inset-0 z-20 bg-black/50 md:hidden" onClick={()=>setOpen(false)}/>}
      <aside className={`fixed inset-y-0 left-0 z-30 w-60 flex flex-col transition-transform duration-300
        ${open?"translate-x-0":"-translate-x-full"} md:static md:translate-x-0 md:flex-shrink-0 overflow-y-auto`}
        style={{background:G.dark}}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-lg shrink-0"
            style={{background:G.mid,color:G.dark}}>C</div>
          <div className="min-w-0">
            <p className="text-white font-black text-sm leading-tight">CampusConnect</p>
            <p className="text-green-400 text-[9px] font-semibold">Faculty Portal</p>
          </div>
          <button onClick={()=>setOpen(false)} className="md:hidden ml-auto text-white/40 text-lg">✕</button>
        </div>
        {/* Profile strip */}
        <div className="flex items-center gap-2.5 px-4 py-3 border-b border-white/10">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-black shrink-0"
            style={{background:G.pale,color:G.dark}}>PV</div>
          <div className="min-w-0">
            <p className="text-white text-[11px] font-bold truncate">{FACULTY.name}</p>
            <p className="text-green-400 text-[9px] truncate">.NET & ASP.NET</p>
          </div>
        </div>
        {/* Nav */}
        <nav className="flex-1 py-2">
          {NAV.map(item=>{
            const isAct=page===item.key||item.ch.some(c=>c.key===page);
            return (
              <div key={item.key}>
                <button onClick={()=>{ item.ch.length?tog(item.key):(setPage(item.key),setOpen(false)); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-[12px] font-semibold transition-colors"
                  style={{color:isAct?"#4ade80":"rgba(255,255,255,0.65)"}}
                  onMouseEnter={e=>e.currentTarget.style.background="#1a5c34"}
                  onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                  <span className="text-sm shrink-0">{item.icon}</span>
                  <span className="flex-1">{item.label}</span>
                  {item.ch.length>0&&<span className="text-[10px] text-white/30">{exp[item.key]?"▾":"›"}</span>}
                  {item.key==="attendance"&&<span className="bg-red-500 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center">3</span>}
                </button>
                {item.ch.length>0&&exp[item.key]&&(
                  <div className="pb-1">
                    {item.ch.map(c=>(
                      <button key={c.key} onClick={()=>{setPage(c.key);setOpen(false);}}
                        className="w-full flex items-center gap-2 pl-11 pr-4 py-2 text-left text-[11px] transition-colors"
                        style={{color:page===c.key?"#4ade80":"rgba(255,255,255,0.5)",fontWeight:page===c.key?700:500,background:page===c.key?"rgba(34,197,94,0.12)":"transparent"}}
                        onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.06)"}
                        onMouseLeave={e=>e.currentTarget.style.background=page===c.key?"rgba(34,197,94,0.12)":"transparent"}>
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{background:page===c.key?"#4ade80":"rgba(255,255,255,0.25)"}}/>{c.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <div className="p-3 border-t border-white/10">
          <div className="flex items-center gap-2 bg-white/5 rounded-xl p-2.5">
            <span className="text-green-400 text-sm">🎧</span>
            <div><p className="text-white text-[11px] font-semibold">IT Support</p><p className="text-white/40 text-[9px]">it@mcc.edu.in</p></div>
          </div>
        </div>
      </aside>
    </>
  );
}

// ─── QUICK ACTIONS FAB ────────────────────────────────────────────────────────
function QuickActions({ setPage }) {
  const [open,setOpen]=useState(false);
  const actions=[
    {label:"Take Attendance",icon:"✅",page:"take-att"},
    {label:"Upload Marks",  icon:"📊",page:"internal"},
    {label:"New Assignment", icon:"📋",page:"create-asgn"},
    {label:"Upload Material",icon:"📚",page:"course-mat"},
    {label:"Announce",       icon:"📢",page:"create-ann"},
  ];
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {open&&actions.map((a,i)=>(
        <button key={i} onClick={()=>{setPage(a.page);setOpen(false);}}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-white text-[12px] font-bold shadow-lg transition-all"
          style={{background:`linear-gradient(135deg,${G.deep},${G.primary})`,
            animation:`slideIn 0.15s ease ${i*0.05}s both`}}>
          <span>{a.icon}</span>{a.label}
        </button>
      ))}
      <button onClick={()=>setOpen(o=>!o)}
        className="w-12 h-12 rounded-2xl text-2xl shadow-xl flex items-center justify-center transition-transform"
        style={{background:`linear-gradient(135deg,${G.primary},${G.mid})`,
          transform:open?"rotate(45deg)":"rotate(0deg)",transition:"transform 0.2s"}}>
        {open?"✕":"⚡"}
      </button>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function FacultyDashboard() {
  const [page,   setPage]   = useState("dashboard");
  const [sbOpen, setSbOpen] = useState(false);
  const [notif,  setNotif]  = useState(false);
  const unread = NOTIFICATIONS.filter(n=>!n.read).length;

  const pageLabel=(()=>{
    for(const item of NAV){
      if(item.key===page) return item.label;
      for(const c of item.ch) if(c.key===page) return c.label;
    }
    return page;
  })();

  const renderPage=()=>{
    if(page==="dashboard")  return <PageDashboard setPage={setPage}/>;
    if(["my-students","profiles","att-hist","performance"].includes(page)) return <PageStudents setPage={setPage}/>;
    if(page==="take-att"||page==="edit-att"||page==="att-rep"||page==="low-att") return <PageAttendance/>;
    if(["internal","assign-mk","practical","semester","mk-hist"].includes(page)) return <PageMarks/>;
    if(["submitted","grade-asgn","asgn-analytics"].includes(page)) return <PageAssignments setPage={setPage}/>;
    if(page==="create-asgn") return <PageCreateAssign/>;
    if(["upload-notes","upload-pdf","upload-vid","course-mat"].includes(page)) return <PageMaterials/>;
    if(["create-ann","dept-notices","notif"].includes(page)) return <PageAnnouncements/>;
    if(["att-report","marks-rep","asgn-rep","cls-perf","exp-pdf","exp-excel"].includes(page)) return <PageReports/>;
    return <PagePlaceholder label={pageLabel}/>;
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{background:"#f4fbf6",fontFamily:"system-ui,sans-serif"}}>
      <style>{`@keyframes slideIn{from{opacity:0;transform:translateX(12px)}to{opacity:1;transform:translateX(0)}}`}</style>
      <Sidebar page={page} setPage={setPage} open={sbOpen} setOpen={setSbOpen}/>

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <header className="bg-white border-b flex items-center px-4 py-3 gap-3 shrink-0" style={{borderColor:G.border}}>
          <button onClick={()=>setSbOpen(o=>!o)} className="text-gray-500 hover:text-gray-700 text-xl md:hidden shrink-0">☰</button>
          <div className="hidden md:flex items-center gap-2 text-xs text-gray-400">
            <span className="font-semibold" style={{color:G.primary}}>Faculty</span>
            <span>/</span>
            <span className="text-gray-600 font-semibold">{pageLabel}</span>
          </div>
          <p className="md:hidden text-sm font-bold text-gray-700 flex-1">{pageLabel}</p>

          <div className="flex items-center gap-3 ml-auto shrink-0">
            <div className="relative">
              <button onClick={()=>setNotif(o=>!o)}
                className="relative w-9 h-9 rounded-xl flex items-center justify-center hover:bg-gray-100 border transition-colors"
                style={{borderColor:G.border}}>
                <span>🔔</span>
                {unread>0&&<span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-black">{unread}</span>}
              </button>
              {notif&&(
                <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border z-50 overflow-hidden" style={{borderColor:G.border}}>
                  <div className="px-4 py-3 border-b flex justify-between items-center" style={{borderColor:G.border}}>
                    <p className="text-sm font-bold text-gray-700">Notifications</p>
                    <button onClick={()=>setNotif(false)} className="text-gray-400 text-lg">✕</button>
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y" style={{divideColor:G.border}}>
                    {NOTIFICATIONS.map(n=>{
                      const icons={submit:"📋",hod:"👨‍💼",exam:"📅",leave:"📝",dept:"🏛️"};
                      return (
                        <div key={n.id} className={`flex items-start gap-3 px-4 py-3 ${!n.read?"bg-green-50":""}`}>
                          <span className="text-base shrink-0">{icons[n.type]||"🔔"}</span>
                          <div className="flex-1 min-w-0">
                            <p className={`text-[12px] leading-snug ${!n.read?"font-bold text-gray-800":"text-gray-600"}`}>{n.msg}</p>
                            <p className="text-[10px] text-gray-400 mt-0.5">{n.time}</p>
                          </div>
                          {!n.read&&<span className="w-2 h-2 rounded-full mt-1 shrink-0" style={{background:G.primary}}/>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-black text-white" style={{background:G.primary}}>PV</div>
              <div className="hidden sm:block">
                <p className="text-[11px] font-bold text-gray-700">Dr. Priya Vasanth</p>
                <p className="text-[9px] text-gray-400">.NET & ASP.NET</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-24">
          {renderPage()}
        </main>
      </div>

      <QuickActions setPage={setPage}/>
    </div>
  );
}