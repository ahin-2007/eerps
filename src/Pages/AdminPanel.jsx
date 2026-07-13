import { useState, useEffect, useRef } from "react";

// ─── TOKENS ──────────────────────────────────────────────────────────────────
const T = {
  // Green palette
  darkest:"#022c1a", dark:"#052e16", deep:"#0f3d1f", primary:"#15803d",
  mid:"#16a34a", bright:"#22c55e", light:"#4ade80", pale:"#bbf7d0",
  palest:"#f0fdf4",
  // Neutrals
  sidebar:"#0a1f12", sideHov:"#142e1c", sideAct:"#1a5c34",
  text:"#0f1a13", muted:"#4b6358", faint:"#8aaa97",
  border:"#d1e8d8", card:"#ffffff", bg:"#f4fbf6",
  // Status
  red:"#dc2626", redBg:"#fef2f2", redBd:"#fca5a5",
  amber:"#d97706", amberBg:"#fffbeb", amberBd:"#fcd34d",
  blue:"#1d4ed8", blueBg:"#eff6ff", blueBd:"#bfdbfe",
  purple:"#7c3aed", purpleBg:"#f5f3ff", purpleBd:"#c4b5fd",
};

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const COLLEGE = { name:"Malankara Catholic College", short:"MCC", place:"Mariagiri, Tamil Nadu" };

const KPI_DATA = {
  students:1248, parents:1190, faculty:87, hods:8, departments:10, courses:24,
  subjects:142, activeUsers:1089, todayAttendance:89.2, pendingFees:147,
  buses:12, routes:8, pendingLeave:9, announcements:5,
};

const DEPARTMENTS = [
  { id:"D1", name:"Computer Applications", code:"MCA", hod:"Dr. N. Suresh Singh",  faculty:14, students:248, courses:3 },
  { id:"D2", name:"Computer Science",      code:"CS",  hod:"Dr. A. Mary Subashini",faculty:12, students:210, courses:4 },
  { id:"D3", name:"Mathematics",           code:"MTH", hod:"Dr. R. Selvaraj",       faculty:8,  students:180, courses:2 },
  { id:"D4", name:"Physics",               code:"PHY", hod:"Dr. K. Arockia Mary",   faculty:7,  students:160, courses:2 },
  { id:"D5", name:"Commerce",              code:"COM", hod:"Dr. L. Vimala Devi",    faculty:10, students:220, courses:3 },
  { id:"D6", name:"English",               code:"ENG", hod:"Dr. M. Stella Mary",    faculty:9,  students:195, courses:2 },
  { id:"D7", name:"Tamil",                 code:"TAM", hod:"Dr. P. Geetha",         faculty:6,  students:145, courses:2 },
  { id:"D8", name:"Chemistry",             code:"CHM", hod:"Dr. S. Antony Raj",     faculty:7,  students:152, courses:2 },
];

const USERS = Array.from({length:32},(_,i)=>({
  id:`U${String(i+1).padStart(4,"0")}`,
  name:["Arun Kumar","Priya Devi","Rajan M","Kavitha S","Suresh P","Meena R","Arjun K","Lakshmi V","Dinesh T","Vijay N","Shalini A","Karthik B","Deepa C","Manoj D","Anitha E","Prakash F","Saranya G","Vinoth H","Prabha I","Selvam J","Rani K","Mani L","Uma M","Bala N","Geetha O","Kumar P","Nisha Q","Anil R","Devi S","Raj T","Mala U","Siva V"][i],
  role:["Student","Student","Faculty","HOD","Student","Parent","Faculty","Student","Admin","Student","Faculty","Student","HOD","Student","Faculty","Student","Student","Faculty","Student","HOD","Student","Faculty","Student","Faculty","Student","Faculty","Student","Admin","Student","Faculty","Student","Faculty"][i],
  dept:["MCA","CS","MCA","CS","PHY","—","COM","MTH","—","ENG","MCA","TAM","PHY","CS","MCA","COM","MTH","CHM","ENG","COM","CS","PHY","MCA","TAM","CS","CHM","MCA","—","ENG","COM","MTH","CS"][i],
  status:i%9===0?"Inactive":"Active",
  email:`user${i+1}@mcc.edu.in`,
  phone:`9${String(800000000+i*7)}`,
  lastLogin:i<3?"Just now":i<8?"Today":"Yesterday",
}));

const STUDENTS = Array.from({length:24},(_,i)=>({
  id:`MCA${String(2026001+i).slice(-4)}`,
  name:["Priya D","Arun K","Meena R","Rajan M","Kavitha S","Suresh P","Arjun K","Lakshmi V","Dinesh T","Vijay N","Shalini A","Karthik B","Deepa C","Manoj D","Anitha E","Prakash F","Saranya G","Vinoth H","Prabha I","Selvam J","Rani K","Mani L","Uma M","Bala N"][i],
  dept:"MCA", year:[1,1,1,2,2,2,2,3,3,3,3,3,4,4,4,4,1,2,3,4,1,2,3,4][i],
  sem:[1,1,1,3,3,3,3,5,5,5,5,5,7,7,7,7,1,3,5,7,1,3,5,7][i],
  attendance: Math.round(60+Math.random()*38),
  cgpa:+(6+Math.random()*4).toFixed(2),
  fee: i%4===0?"Pending":"Paid",
  status:i===5?"Inactive":"Active",
}));

const FACULTY_LIST = [
  {id:"F001",name:"Dr. N. Suresh Singh",        dept:"MCA", subjects:"OS,.NET",    workload:18, status:"Active", perf:92, leave:0},
  {id:"F002",name:"Dr. S. Priya Vasanth",       dept:"MCA", subjects:".NET,ASP",   workload:16, status:"Active", perf:89, leave:1},
  {id:"F003",name:"Dr. J.P. Medlin Julia",      dept:"MCA", subjects:"AI,NM,Proj", workload:20, status:"Leave",  perf:94, leave:0},
  {id:"F004",name:"Mr. G. Borgia Crusu Venthan",dept:"MCA", subjects:"SPM,OS",     workload:14, status:"Active", perf:87, leave:0},
  {id:"F005",name:"Dr. A. Mary Subashini",      dept:"CS",  subjects:"Maths,Stats",workload:16, status:"Active", perf:91, leave:0},
  {id:"F006",name:"Mr. R. Dinesh Kumar",        dept:"CS",  subjects:"Java,DS",    workload:18, status:"Active", perf:85, leave:2},
  {id:"F007",name:"Dr. K. Selvi",               dept:"CS",  subjects:"DBMS,SQL",   workload:16, status:"Leave",  perf:88, leave:0},
];

const LEAVE_REQUESTS = [
  {id:1,name:"Dr. J.P. Medlin Julia",  dept:"MCA",from:"2026-07-10",to:"2026-07-12",days:3,reason:"Medical",  status:"Pending"},
  {id:2,name:"Dr. K. Selvi",           dept:"CS", from:"2026-07-15",to:"2026-07-16",days:2,reason:"Personal", status:"Pending"},
  {id:3,name:"Mr. R. Dinesh Kumar",    dept:"CS", from:"2026-07-18",to:"2026-07-18",days:1,reason:"Personal", status:"Pending"},
  {id:4,name:"Dr. Selvaraj",           dept:"MTH",from:"2026-07-22",to:"2026-07-24",days:3,reason:"Medical",  status:"Approved"},
  {id:5,name:"Dr. Geetha",             dept:"TAM",from:"2026-07-25",to:"2026-07-25",days:1,reason:"Personal", status:"Rejected"},
];

const BUSES = [
  {id:"B01",number:"TN74 AB 1234",route:"Marthandam–College",driver:"Rajesh Kumar",capacity:50,students:43,status:"Active"},
  {id:"B02",number:"TN74 CD 5678",route:"Nagercoil–College",  driver:"Murugan S",  capacity:50,students:48,status:"Active"},
  {id:"B03",number:"TN74 EF 9012",route:"Thuckalay–College",  driver:"Selvam P",   capacity:40,students:35,status:"Active"},
  {id:"B04",number:"TN74 GH 3456",route:"Kalikavelai–College",driver:"Dhanush K",  capacity:40,students:29,status:"Maintenance"},
];

const FEES = [
  {id:"F1001",name:"Priya D",    dept:"MCA",year:3,amount:45000,paid:45000,status:"Paid",    dueDate:"2026-06-30"},
  {id:"F1002",name:"Arun K",     dept:"CS", year:2,amount:42000,paid:0,    status:"Pending", dueDate:"2026-06-30"},
  {id:"F1003",name:"Kavitha S",  dept:"MCA",year:2,amount:45000,paid:22500,status:"Partial", dueDate:"2026-07-15"},
  {id:"F1004",name:"Dinesh T",   dept:"PHY",year:3,amount:38000,paid:0,    status:"Overdue", dueDate:"2026-06-01"},
  {id:"F1005",name:"Shalini A",  dept:"COM",year:1,amount:40000,paid:40000,status:"Paid",    dueDate:"2026-07-30"},
];

const NOTIFICATIONS = [
  {id:1,type:"user",    msg:"23 new student registrations pending approval",  time:"10m ago",  read:false},
  {id:2,type:"fee",     msg:"147 students have overdue fee payments",          time:"30m ago",  read:false},
  {id:3,type:"leave",   msg:"9 faculty leave requests awaiting approval",      time:"1h ago",   read:false},
  {id:4,type:"att",     msg:"Low attendance alert: 18 students below 75%",     time:"2h ago",   read:false},
  {id:5,type:"system",  msg:"Automated backup completed successfully",         time:"3h ago",   read:true },
  {id:6,type:"exam",    msg:"II Internal Exam scheduled: 08 Sep 2026",         time:"5h ago",   read:true },
];

const ATT_TREND = [
  {m:"Feb",val:85},{m:"Mar",val:82},{m:"Apr",val:79},{m:"May",val:83},{m:"Jun",val:77},{m:"Jul",val:80}
];
const DEPT_PERF = [
  {d:"MCA",pass:88},{d:"CS",pass:84},{d:"MTH",pass:79},{d:"PHY",pass:76},{d:"COM",pass:82},{d:"ENG",pass:87},{d:"TAM",pass:81},{d:"CHM",pass:74}
];
const FEE_MONTHLY = [
  {m:"Feb",col:420000},{m:"Mar",col:680000},{m:"Apr",col:290000},{m:"May",col:540000},{m:"Jun",col:380000},{m:"Jul",col:510000}
];

// ─── NAV TREE ─────────────────────────────────────────────────────────────────
const NAV = [
  {key:"dashboard",   label:"Dashboard",           icon:"⊞",  ch:[]},
  {key:"users",       label:"User Management",     icon:"👥", ch:[
    {key:"all-users",   label:"All Users"},
    {key:"students-u",  label:"Students"},
    {key:"parents-u",   label:"Parents"},
    {key:"faculty-u",   label:"Faculty"},
    {key:"hods-u",      label:"HODs"},
    {key:"transport-u", label:"Transport Staff"},
    {key:"admins-u",    label:"Administrators"},
    {key:"roles",       label:"Assign Roles"},
    {key:"reset-pw",    label:"Reset Passwords"},
    {key:"permissions", label:"Permissions"},
  ]},
  {key:"departments", label:"Department Mgmt",     icon:"🏛️", ch:[
    {key:"depts",        label:"Departments"},
    {key:"courses",      label:"Courses"},
    {key:"programs",     label:"Programs"},
    {key:"acad-years",   label:"Academic Years"},
    {key:"semesters",    label:"Semesters"},
    {key:"sections",     label:"Sections"},
    {key:"subjects",     label:"Subjects"},
  ]},
  {key:"students",    label:"Student Management",  icon:"🎓", ch:[
    {key:"all-students", label:"All Students"},
    {key:"admission",    label:"Admission"},
    {key:"profiles",     label:"Student Profiles"},
    {key:"promote",      label:"Promote Students"},
    {key:"transfer",     label:"Transfer"},
    {key:"alumni",       label:"Alumni"},
  ]},
  {key:"faculty",     label:"Faculty Management",  icon:"👩‍🏫",ch:[
    {key:"faculty-list", label:"Faculty List"},
    {key:"assign-subj",  label:"Assign Subjects"},
    {key:"workload",     label:"Workload"},
    {key:"faculty-perf", label:"Performance"},
    {key:"leave-mgmt",   label:"Leave Management"},
  ]},
  {key:"attendance",  label:"Attendance",          icon:"✅", ch:[
    {key:"stu-att",   label:"Student Attendance"},
    {key:"fac-att",   label:"Faculty Attendance"},
    {key:"att-rep",   label:"Reports"},
    {key:"low-att",   label:"Low Attendance Alerts"},
  ]},
  {key:"exams",       label:"Examinations",        icon:"📝", ch:[
    {key:"int-exams",  label:"Internal Exams"},
    {key:"sem-exams",  label:"Semester Exams"},
    {key:"marks",      label:"Marks Management"},
    {key:"grades",     label:"Grade System"},
    {key:"results",    label:"Results"},
    {key:"result-an",  label:"Result Analysis"},
  ]},
  {key:"materials",   label:"Assignments & Materials",icon:"📚",ch:[
    {key:"assignments",label:"Assignments"},
    {key:"study-mat",  label:"Study Materials"},
    {key:"upload-ctr", label:"Upload Center"},
  ]},
  {key:"fees",        label:"Fees",                icon:"₹",  ch:[
    {key:"fee-struct", label:"Fee Structure"},
    {key:"payments",   label:"Student Payments"},
    {key:"pending-fee",label:"Pending Payments"},
    {key:"scholarships",label:"Scholarships"},
    {key:"receipts",   label:"Receipts"},
    {key:"fin-rep",    label:"Financial Reports"},
  ]},
  {key:"transport",   label:"Transport",           icon:"🚌", ch:[
    {key:"buses",      label:"Bus Management"},
    {key:"routes",     label:"Routes"},
    {key:"drivers",    label:"Drivers"},
    {key:"tracking",   label:"Vehicle Tracking"},
    {key:"gps",        label:"GPS Monitoring"},
    {key:"bus-alloc",  label:"Student Allocation"},
  ]},
  {key:"announces",   label:"Announcements",       icon:"📢", ch:[
    {key:"college-notice",label:"College Notices"},
    {key:"dept-notice",   label:"Department Notices"},
    {key:"events",         label:"Events"},
    {key:"emergency",      label:"Emergency Alerts"},
  ]},
  {key:"reports",     label:"Reports",             icon:"📑", ch:[
    {key:"stu-rep",   label:"Student Reports"},
    {key:"fac-rep",   label:"Faculty Reports"},
    {key:"att-report",label:"Attendance Reports"},
    {key:"fin-report",label:"Financial Reports"},
    {key:"acad-rep",  label:"Academic Reports"},
    {key:"trans-rep", label:"Transport Reports"},
    {key:"exp-pdf",   label:"Export PDF"},
    {key:"exp-excel", label:"Export Excel"},
  ]},
  {key:"settings",    label:"Settings",            icon:"⚙️", ch:[
    {key:"college-profile",label:"College Profile"},
    {key:"acad-settings",  label:"Academic Settings"},
    {key:"rbac",           label:"Roles & Permissions"},
    {key:"notif-settings", label:"Notifications"},
    {key:"email-sms",      label:"Email & SMS"},
    {key:"backup",         label:"Backup & Restore"},
    {key:"audit-logs",     label:"System Logs"},
  ]},
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const ROLE_COLOR = {
  Student:   { bg:"#f0fdf4", c:T.mid },
  Faculty:   { bg:"#eff6ff", c:T.blue },
  HOD:       { bg:"#faf5ff", c:T.purple },
  Parent:    { bg:"#fff7ed", c:"#c2410c" },
  Admin:     { bg:"#fef2f2", c:T.red },
  "Transport Staff":{ bg:"#fefce8", c:"#ca8a04" },
};

function RolePill({ role }) {
  const s = ROLE_COLOR[role]||{ bg:"#f3f4f6", c:"#374151" };
  return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap" style={{background:s.bg,color:s.c}}>{role}</span>;
}

function StatusPill({ status }) {
  const m = {
    Active:   {bg:"#f0fdf4",c:"#16a34a"}, Inactive: {bg:"#fef2f2",c:"#dc2626"},
    Paid:     {bg:"#f0fdf4",c:"#16a34a"}, Pending:  {bg:"#fffbeb",c:"#d97706"},
    Partial:  {bg:"#eff6ff",c:"#1d4ed8"}, Overdue:  {bg:"#fef2f2",c:"#dc2626"},
    Approved: {bg:"#f0fdf4",c:"#16a34a"}, Rejected: {bg:"#fef2f2",c:"#dc2626"},
    Leave:    {bg:"#fef2f2",c:"#dc2626"}, Maintenance:{bg:"#fffbeb",c:"#d97706"},
  };
  const s = m[status]||{bg:"#f3f4f6",c:"#374151"};
  return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap" style={{background:s.bg,color:s.c}}>{status}</span>;
}

function Avatar({ name, size="32px", bg=T.primary }) {
  const i = (name||"?").split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
  return <div className="rounded-xl flex items-center justify-center font-black text-white shrink-0"
    style={{width:size,height:size,background:bg,fontSize:parseInt(size)*0.3}}>{i}</div>;
}

function AttBar({ value }) {
  const c = value>=75?T.bright:value>=60?T.amber:T.red;
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{background:T.border}}>
        <div className="h-full rounded-full" style={{width:`${value}%`,background:c}}/>
      </div>
      <span className="text-[10px] font-bold shrink-0" style={{color:c}}>{value}%</span>
    </div>
  );
}

function MiniSpark({ data, color=T.bright }) {
  const max=Math.max(...data),min=Math.min(...data),r=max-min||1;
  const pts=data.map((v,i)=>`${(i/(data.length-1))*72},${20-((v-min)/r)*18}`).join(" ");
  return (
    <svg width="72" height="22" viewBox="0 0 72 22">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points={`0,22 ${pts} 72,22`} fill={color} fillOpacity="0.12" stroke="none"/>
    </svg>
  );
}

function Toast({ msg, onClose }) {
  useEffect(()=>{const t=setTimeout(onClose,3000);return()=>clearTimeout(t);},[]);
  return (
    <div className="fixed top-4 right-4 z-[100] flex items-center gap-3 px-4 py-3 rounded-xl text-white text-sm font-semibold shadow-xl"
      style={{background:`linear-gradient(135deg,${T.deep},${T.primary})`}}>
      <span>✅</span>{msg}
      <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100">✕</button>
    </div>
  );
}

function ConfirmDialog({ msg, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
        <p className="text-[15px] font-black text-gray-800 mb-2">Confirm Action</p>
        <p className="text-[13px] text-gray-500 mb-5">{msg}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl border text-sm font-bold" style={{borderColor:T.border}}>Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold" style={{background:T.red}}>Confirm</button>
        </div>
      </div>
    </div>
  );
}

// ─── CHARTS ──────────────────────────────────────────────────────────────────
function BarChart({ data, valueKey, labelKey, color=T.bright, maxH=80 }) {
  const max = Math.max(...data.map(d=>d[valueKey]))||1;
  return (
    <div>
      <div className="flex items-end gap-1.5" style={{height:maxH}}>
        {data.map((d,i)=>{
          const h=Math.round((d[valueKey]/max)*maxH);
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
              <span className="text-[8px] font-bold" style={{color}}>{d[valueKey]}{valueKey==="pass"?"%":""}</span>
              <div className="w-full rounded-t-md" style={{height:h,background:color,opacity:0.8+i*0.01}}/>
            </div>
          );
        })}
      </div>
      <div className="flex mt-1">
        {data.map(d=><span key={d[labelKey]} className="flex-1 text-center text-[8px] text-gray-400">{d[labelKey]}</span>)}
      </div>
    </div>
  );
}

function DonutChart({ segments }) {
  const total = segments.reduce((s,x)=>s+x.value,0)||1;
  const r=30, circ=2*Math.PI*r;
  let off=0;
  return (
    <div className="flex items-center gap-4">
      <svg width="80" height="80" viewBox="0 0 80 80" className="-rotate-90">
        <circle cx="40" cy="40" r={r} fill="none" stroke="#f3f4f6" strokeWidth="12"/>
        {segments.map((s,i)=>{
          const dash=(s.value/total)*circ;
          const el=<circle key={i} cx="40" cy="40" r={r} fill="none" stroke={s.color} strokeWidth="12"
            strokeDasharray={`${dash} ${circ-dash}`} strokeDashoffset={-off}/>;
          off+=dash; return el;
        })}
      </svg>
      <div className="space-y-1.5">
        {segments.map(s=>(
          <div key={s.label} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{background:s.color}}/>
            <span className="text-[10px] text-gray-600">{s.label}</span>
            <span className="text-[10px] font-bold text-gray-800 ml-1">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── KPI CARD ─────────────────────────────────────────────────────────────────
function KPICard({ icon, label, value, sub, color=T.primary, trend, alert, suffix="" }) {
  return (
    <div className="bg-white rounded-2xl p-4 border hover:shadow-lg transition-all duration-200 group"
      style={{borderColor:alert?T.redBd:T.border,background:alert?"#fff8f8":"white"}}>
      <div className="flex items-start justify-between mb-2">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl"
          style={{background:alert?"#fef2f2":`${color}15`}}>{icon}</div>
        {trend&&<MiniSpark data={trend} color={color}/>}
        {alert&&<span className="w-2 h-2 rounded-full bg-red-500 animate-pulse mt-1"/>}
      </div>
      <p className="text-2xl font-black leading-none" style={{color:alert?T.red:color}}>
        {typeof value==="number"&&!Number.isInteger(value)?value.toFixed(1):value}{suffix}
      </p>
      <p className="text-[11px] font-semibold text-gray-600 mt-1 leading-tight">{label}</p>
      {sub&&<p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>}
    </div>
  );
}

// ─── PAGE: DASHBOARD ──────────────────────────────────────────────────────────
function PageDashboard({ setPage }) {
  const feeCol = FEE_MONTHLY.reduce((s,f)=>s+f.col,0);
  return (
    <div className="space-y-5">
      {/* Hero banner */}
      <div className="rounded-2xl p-6 text-white overflow-hidden relative"
        style={{background:`linear-gradient(135deg,${T.darkest} 0%,${T.deep} 45%,${T.mid} 100%)`}}>
        <div className="absolute right-0 top-0 w-48 h-full opacity-10 flex items-center justify-end pr-6 text-[100px] select-none">🎓</div>
        <div className="relative">
          <p className="text-green-300 text-[10px] font-bold uppercase tracking-widest mb-1">Admin Control Panel</p>
          <h2 className="text-2xl font-black">{COLLEGE.name}</h2>
          <p className="text-green-200 text-sm mt-1">{COLLEGE.place} · {new Date().toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}</p>
          <div className="flex gap-3 mt-4 flex-wrap">
            {[["+ Add User","all-users"],["Departments","depts"],["Fee Reports","fin-rep"],["Audit Logs","audit-logs"]].map(([l,k])=>(
              <button key={k} onClick={()=>setPage(k)}
                className="text-[11px] font-bold px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 transition-colors border border-white/10">{l}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Primary KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {[
          {icon:"🎓",label:"Students",     value:KPI_DATA.students,      color:T.primary,  trend:[1180,1200,1215,1228,1240,1248]},
          {icon:"👨‍👩‍👧",label:"Parents",     value:KPI_DATA.parents,       color:"#854F0B"},
          {icon:"👩‍🏫",label:"Faculty",      value:KPI_DATA.faculty,        color:T.blue},
          {icon:"🏛️",label:"Departments",  value:KPI_DATA.departments,    color:T.purple},
          {icon:"📖",label:"Courses",      value:KPI_DATA.courses,         color:"#0891b2"},
          {icon:"📚",label:"Subjects",     value:KPI_DATA.subjects,        color:"#7c3aed"},
          {icon:"🟢",label:"Active Users", value:KPI_DATA.activeUsers,     color:T.bright, trend:[1020,1040,1060,1075,1082,1089]},
        ].map(k=><KPICard key={k.label} {...k}/>)}
      </div>

      {/* Secondary KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <KPICard icon="✅" label="Today's Attendance" value={KPI_DATA.todayAttendance} suffix="%" color={T.mid} trend={[85,82,86,79,83,89]}/>
        <KPICard icon="₹"  label="Pending Fees"       value={KPI_DATA.pendingFees}     sub="students"     color={T.red}  alert/>
        <KPICard icon="🚌" label="Active Buses"        value={KPI_DATA.buses}           sub={`${KPI_DATA.routes} routes`} color="#854F0B"/>
        <KPICard icon="📋" label="Pending Leave"       value={KPI_DATA.pendingLeave}    sub="requests"     color={T.amber} alert/>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border p-4" style={{borderColor:T.border}}>
          <p className="text-[12px] font-bold text-gray-700 mb-3">Attendance Trend (6M)</p>
          <BarChart data={ATT_TREND} valueKey="val" labelKey="m" color={T.mid} maxH={72}/>
        </div>
        <div className="bg-white rounded-2xl border p-4" style={{borderColor:T.border}}>
          <p className="text-[12px] font-bold text-gray-700 mb-1">Department Performance</p>
          <p className="text-[10px] text-gray-400 mb-3">Pass % by department</p>
          <BarChart data={DEPT_PERF} valueKey="pass" labelKey="d" color={T.primary} maxH={72}/>
        </div>
        <div className="bg-white rounded-2xl border p-4" style={{borderColor:T.border}}>
          <p className="text-[12px] font-bold text-gray-700 mb-1">User Distribution</p>
          <p className="text-[10px] text-gray-400 mb-3">Active system users</p>
          <DonutChart segments={[
            {label:"Students",value:1248,color:T.primary},
            {label:"Faculty", value:87,  color:T.blue},
            {label:"Parents", value:1190,color:"#d97706"},
            {label:"HODs",    value:8,   color:T.purple},
            {label:"Admin",   value:4,   color:T.red},
          ]}/>
        </div>
      </div>

      {/* Tables row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent leave requests */}
        <div className="bg-white rounded-2xl border p-4" style={{borderColor:T.border}}>
          <div className="flex justify-between items-center mb-3">
            <p className="text-[12px] font-bold text-gray-700">Pending Leave Requests</p>
            <button onClick={()=>setPage("leave-mgmt")} className="text-[10px] font-bold" style={{color:T.primary}}>View all</button>
          </div>
          <div className="space-y-2">
            {LEAVE_REQUESTS.filter(l=>l.status==="Pending").map(l=>(
              <div key={l.id} className="flex items-center gap-3 p-2.5 rounded-xl border" style={{borderColor:T.amberBd,background:T.amberBg}}>
                <Avatar name={l.name} size="32px"/>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-bold text-gray-800 truncate">{l.name}</p>
                  <p className="text-[10px] text-gray-500">{l.dept} · {l.days}d · {l.reason}</p>
                </div>
                <div className="flex gap-1.5">
                  <button className="text-[10px] font-bold px-2 py-1 rounded-lg text-white" style={{background:T.primary}}>Approve</button>
                  <button className="text-[10px] font-bold px-2 py-1 rounded-lg text-red-600 bg-red-50">Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fee overview */}
        <div className="bg-white rounded-2xl border p-4" style={{borderColor:T.border}}>
          <div className="flex justify-between items-center mb-3">
            <p className="text-[12px] font-bold text-gray-700">Fee Collection (2026)</p>
            <button onClick={()=>setPage("fin-rep")} className="text-[10px] font-bold" style={{color:T.primary}}>Reports</button>
          </div>
          <p className="text-2xl font-black mb-3" style={{color:T.primary}}>₹{(feeCol/100000).toFixed(1)}L <span className="text-sm font-semibold text-gray-400">collected</span></p>
          <BarChart data={FEE_MONTHLY} valueKey="col" labelKey="m" color="#16a34a" maxH={60}/>
        </div>
      </div>

      {/* System health */}
      <div className="bg-white rounded-2xl border p-4" style={{borderColor:T.border}}>
        <p className="text-[12px] font-bold text-gray-700 mb-3">🖥️ System Health</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            {label:"Server Uptime",value:"99.8%",  color:T.primary},
            {label:"DB Health",   value:"Healthy", color:T.primary},
            {label:"Last Backup", value:"2h ago",  color:T.mid},
            {label:"Active Sessions",value:"342",  color:T.blue},
          ].map(s=>(
            <div key={s.label} className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-base font-black" style={{color:s.color}}>{s.value}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PAGE: ALL USERS ──────────────────────────────────────────────────────────
function PageUsers({ roleFilter }) {
  const [search,  setSearch]  = useState("");
  const [role,    setRole]    = useState(roleFilter||"all");
  const [status,  setStatus]  = useState("all");
  const [selected,setSelected]=useState([]);
  const [toast,   setToast]   = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [page,    setPage]    = useState(1);
  const PER = 10;

  const filtered = USERS.filter(u=>{
    const ms = !search||u.name.toLowerCase().includes(search.toLowerCase())||u.id.toLowerCase().includes(search.toLowerCase());
    const mr = role==="all"||u.role===role;
    const mst= status==="all"||u.status===status;
    return ms&&mr&&mst;
  });
  const pages=Math.ceil(filtered.length/PER);
  const visible=filtered.slice((page-1)*PER,page*PER);
  const allSel=visible.every(u=>selected.includes(u.id));

  const toggleSel=(id)=>setSelected(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id]);
  const toggleAll=()=>setSelected(allSel?selected.filter(id=>!visible.find(u=>u.id===id)):
    [...new Set([...selected,...visible.map(u=>u.id)])]);

  return (
    <div className="space-y-4">
      {toast&&<Toast msg={toast} onClose={()=>setToast(null)}/>}
      {confirm&&<ConfirmDialog msg={confirm.msg} onConfirm={()=>{setToast(confirm.onConfirm());setConfirm(null);}} onCancel={()=>setConfirm(null)}/>}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-base font-black text-gray-800">
          {role==="all"?"All Users":`${role}s`}
          <span className="text-sm font-normal text-gray-400 ml-2">({filtered.length})</span>
        </h2>
        <div className="flex gap-2 flex-wrap">
          {selected.length>0&&(
            <button onClick={()=>setConfirm({msg:`Deactivate ${selected.length} selected users?`,onConfirm:()=>"Users deactivated!"})}
              className="text-xs font-bold px-3 py-1.5 rounded-xl bg-red-50 text-red-600 border border-red-200">Deactivate ({selected.length})</button>
          )}
          <button className="text-xs font-bold px-3 py-1.5 rounded-xl border" style={{borderColor:T.border}}>📥 Import Excel</button>
          <button className="text-xs font-bold px-3 py-1.5 rounded-xl border" style={{borderColor:T.border}}>📤 Export</button>
          <button onClick={()=>setToast("New user form opened!")} className="text-xs font-bold px-3 py-1.5 rounded-xl text-white" style={{background:T.primary}}>+ Add User</button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border p-4 space-y-3" style={{borderColor:T.border}}>
        <div className="relative">
          <input value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}} placeholder="Search by name, ID, or email..."
            className="w-full pl-8 pr-4 py-2.5 border rounded-xl text-[13px] bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-300"
            style={{borderColor:T.border}}/>
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {[
            {val:role,set:v=>{setRole(v);setPage(1);},opts:[["all","All Roles"],["Student","Students"],["Faculty","Faculty"],["HOD","HODs"],["Parent","Parents"],["Admin","Admins"]]},
            {val:status,set:v=>{setStatus(v);setPage(1);},opts:[["all","All Status"],["Active","Active"],["Inactive","Inactive"]]},
          ].map((f,i)=>(
            <select key={i} value={f.val} onChange={e=>f.set(e.target.value)}
              className="text-[12px] border rounded-lg px-3 py-1.5 bg-white focus:outline-none" style={{borderColor:T.border}}>
              {f.opts.map(([v,l])=><option key={v} value={v}>{l}</option>)}
            </select>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border overflow-hidden" style={{borderColor:T.border}}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">
            <thead>
              <tr style={{background:`${T.primary}10`}}>
                <th className="px-3 py-3 text-left w-8">
                  <input type="checkbox" checked={allSel} onChange={toggleAll} className="rounded"/>
                </th>
                {["User","ID","Email","Dept","Role","Status","Last Login","Actions"].map(h=>(
                  <th key={h} className="px-3 py-3 text-left text-[10px] font-bold uppercase tracking-wide cursor-pointer hover:text-green-700 transition-colors" style={{color:T.primary}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visible.map(u=>(
                <tr key={u.id} className="border-t hover:bg-green-50/20 transition-colors" style={{borderColor:T.border}}>
                  <td className="px-3 py-2.5"><input type="checkbox" checked={selected.includes(u.id)} onChange={()=>toggleSel(u.id)} className="rounded"/></td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <Avatar name={u.name} size="30px"/>
                      <div>
                        <p className="text-[12px] font-bold text-gray-800 whitespace-nowrap">{u.name}</p>
                        <p className="text-[10px] text-gray-400">{u.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-[11px] font-mono text-gray-500">{u.id}</td>
                  <td className="px-3 py-2.5 text-[11px] text-gray-500">{u.email}</td>
                  <td className="px-3 py-2.5 text-[11px] text-gray-600">{u.dept}</td>
                  <td className="px-3 py-2.5"><RolePill role={u.role}/></td>
                  <td className="px-3 py-2.5"><StatusPill status={u.status}/></td>
                  <td className="px-3 py-2.5 text-[10px] text-gray-400 whitespace-nowrap">{u.lastLogin}</td>
                  <td className="px-3 py-2.5">
                    <div className="flex gap-1">
                      {[["View","#374151"],["Edit",T.primary],["🔑","#d97706"],["🗑","#dc2626"]].map(([l,c])=>(
                        <button key={l} onClick={()=>setToast(`${l==="🗑"?"Delete":l==="🔑"?"Password reset":l} action triggered`)}
                          className="text-[10px] font-bold px-2 py-1 rounded-lg transition-colors hover:opacity-80"
                          style={{color:l.length===1?c:"white",background:l.length===1?`${c}15`:c}}>
                          {l}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t" style={{borderColor:T.border}}>
          <p className="text-[11px] text-gray-400">Showing {(page-1)*PER+1}–{Math.min(page*PER,filtered.length)} of {filtered.length}</p>
          <div className="flex gap-1">
            <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}
              className="text-[11px] font-bold px-3 py-1.5 rounded-lg border disabled:opacity-40" style={{borderColor:T.border}}>← Prev</button>
            {Array.from({length:Math.min(pages,5)},(_,i)=>i+1).map(p=>(
              <button key={p} onClick={()=>setPage(p)}
                className="text-[11px] font-bold w-8 h-7 rounded-lg"
                style={{background:page===p?T.primary:"transparent",color:page===p?"white":T.muted}}>
                {p}
              </button>
            ))}
            <button onClick={()=>setPage(p=>Math.min(pages,p+1))} disabled={page===pages}
              className="text-[11px] font-bold px-3 py-1.5 rounded-lg border disabled:opacity-40" style={{borderColor:T.border}}>Next →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PAGE: DEPARTMENTS ────────────────────────────────────────────────────────
function PageDepartments() {
  const [toast,setToast]=useState(null);
  return (
    <div className="space-y-4">
      {toast&&<Toast msg={toast} onClose={()=>setToast(null)}/>}
      <div className="flex justify-between items-center">
        <h2 className="text-base font-black text-gray-800">Departments ({DEPARTMENTS.length})</h2>
        <button onClick={()=>setToast("Add department form opened!")} className="text-xs font-bold px-4 py-2 rounded-xl text-white" style={{background:T.primary}}>+ Add Department</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {DEPARTMENTS.map(d=>(
          <div key={d.id} className="bg-white rounded-2xl border p-4 hover:shadow-md transition-shadow" style={{borderColor:T.border}}>
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm text-white"
                style={{background:T.primary}}>{d.code}</div>
              <button onClick={()=>setToast(`Editing ${d.name}`)} className="text-[10px] text-gray-400 hover:text-gray-600">✎ Edit</button>
            </div>
            <p className="text-[13px] font-black text-gray-800 leading-tight">{d.name}</p>
            <p className="text-[11px] text-gray-500 mt-0.5">HOD: {d.hod.split(" ").slice(0,2).join(" ")}</p>
            <div className="grid grid-cols-3 gap-2 mt-3">
              {[["👩‍🏫",d.faculty,"Faculty"],["🎓",d.students,"Students"],["📚",d.courses,"Courses"]].map(([ic,v,l])=>(
                <div key={l} className="text-center">
                  <p className="text-base font-black" style={{color:T.primary}}>{v}</p>
                  <p className="text-[9px] text-gray-400">{l}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PAGE: STUDENTS ───────────────────────────────────────────────────────────
function PageStudents({ setPageNav }) {
  const [search,setSearch]=useState("");
  const [yr,setYr]=useState("all");
  const [toast,setToast]=useState(null);

  const filtered = STUDENTS.filter(s=>
    (!search||s.name.toLowerCase().includes(search.toLowerCase())||s.id.toLowerCase().includes(search.toLowerCase()))&&
    (yr==="all"||s.year===+yr)
  );
  return (
    <div className="space-y-4">
      {toast&&<Toast msg={toast} onClose={()=>setToast(null)}/>}
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h2 className="text-base font-black text-gray-800">All Students <span className="text-sm font-normal text-gray-400">({filtered.length})</span></h2>
        <div className="flex gap-2">
          <button className="text-xs font-bold px-3 py-1.5 rounded-xl border" style={{borderColor:T.border}}>📥 Bulk Import</button>
          <button className="text-xs font-bold px-3 py-1.5 rounded-xl border" style={{borderColor:T.border}}>📤 Export</button>
          <button onClick={()=>setToast("Admission form opened!")} className="text-xs font-bold px-3 py-1.5 rounded-xl text-white" style={{background:T.primary}}>+ Admit Student</button>
        </div>
      </div>
      <div className="bg-white rounded-2xl border p-4 flex gap-3 flex-wrap" style={{borderColor:T.border}}>
        <div className="relative flex-1 min-w-48">
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name or register no..."
            className="w-full pl-8 pr-4 py-2 border rounded-xl text-[12px] bg-gray-50 focus:outline-none" style={{borderColor:T.border}}/>
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
        </div>
        <select value={yr} onChange={e=>setYr(e.target.value)} className="text-[12px] border rounded-xl px-3 py-2 focus:outline-none" style={{borderColor:T.border}}>
          {[["all","All Years"],["1","Year 1"],["2","Year 2"],["3","Year 3"],["4","Year 4"]].map(([v,l])=><option key={v} value={v}>{l}</option>)}
        </select>
      </div>
      <div className="bg-white rounded-2xl border overflow-hidden" style={{borderColor:T.border}}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[750px]">
            <thead>
              <tr style={{background:`${T.primary}10`}}>
                {["Student","Reg No","Dept","Year","Sem","Attendance","CGPA","Fee","Status","Actions"].map(h=>(
                  <th key={h} className="px-3 py-3 text-left text-[10px] font-bold uppercase tracking-wide" style={{color:T.primary}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(s=>(
                <tr key={s.id} className="border-t hover:bg-green-50/20 transition-colors" style={{borderColor:T.border}}>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2"><Avatar name={s.name} size="28px"/>
                      <span className="text-[12px] font-semibold text-gray-800 whitespace-nowrap">{s.name}</span></div>
                  </td>
                  <td className="px-3 py-2.5 text-[11px] font-mono text-gray-500">{s.id}</td>
                  <td className="px-3 py-2.5 text-[11px] text-gray-600">{s.dept}</td>
                  <td className="px-3 py-2.5 text-[11px] text-gray-600">{s.year}</td>
                  <td className="px-3 py-2.5 text-[11px] text-gray-600">{s.sem}</td>
                  <td className="px-3 py-2.5 w-28"><AttBar value={s.attendance}/></td>
                  <td className="px-3 py-2.5 text-[12px] font-bold" style={{color:s.cgpa>=8?T.primary:s.cgpa>=6?T.amber:T.red}}>{s.cgpa}</td>
                  <td className="px-3 py-2.5"><StatusPill status={s.fee}/></td>
                  <td className="px-3 py-2.5"><StatusPill status={s.status}/></td>
                  <td className="px-3 py-2.5">
                    <div className="flex gap-1">
                      {["View","Edit","Report"].map(a=>(
                        <button key={a} onClick={()=>setToast(`${a} triggered for ${s.name}`)}
                          className="text-[10px] font-bold px-2 py-1 rounded-lg text-white transition-opacity hover:opacity-80"
                          style={{background:a==="View"?T.primary:a==="Edit"?T.blue:T.purple}}>{a}</button>
                      ))}
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

// ─── PAGE: FACULTY ────────────────────────────────────────────────────────────
function PageFaculty() {
  const [toast,setToast]=useState(null);
  const [leaves,setLeaves]=useState(LEAVE_REQUESTS);
  return (
    <div className="space-y-4">
      {toast&&<Toast msg={toast} onClose={()=>setToast(null)}/>}
      <div className="flex justify-between items-center">
        <h2 className="text-base font-black text-gray-800">Faculty Management</h2>
        <button onClick={()=>setToast("Add faculty form opened!")} className="text-xs font-bold px-4 py-2 rounded-xl text-white" style={{background:T.primary}}>+ Add Faculty</button>
      </div>
      <div className="bg-white rounded-2xl border overflow-hidden" style={{borderColor:T.border}}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr style={{background:`${T.primary}10`}}>
                {["Faculty","ID","Dept","Subjects","Workload","Status","Performance","Actions"].map(h=>(
                  <th key={h} className="px-3 py-3 text-left text-[10px] font-bold uppercase tracking-wide" style={{color:T.primary}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FACULTY_LIST.map(f=>(
                <tr key={f.id} className="border-t hover:bg-green-50/20 transition-colors" style={{borderColor:T.border}}>
                  <td className="px-3 py-2.5"><div className="flex items-center gap-2"><Avatar name={f.name} size="30px"/><span className="text-[12px] font-semibold text-gray-800 whitespace-nowrap">{f.name}</span></div></td>
                  <td className="px-3 py-2.5 text-[11px] font-mono text-gray-500">{f.id}</td>
                  <td className="px-3 py-2.5 text-[11px] text-gray-600">{f.dept}</td>
                  <td className="px-3 py-2.5 text-[11px] text-gray-600">{f.subjects}</td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{background:T.border}}>
                        <div className="h-full rounded-full" style={{width:`${(f.workload/24)*100}%`,background:T.primary}}/>
                      </div>
                      <span className="text-[10px] font-semibold text-gray-600">{f.workload}h</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5"><StatusPill status={f.status}/></td>
                  <td className="px-3 py-2.5"><span className="text-[13px] font-black" style={{color:f.perf>=90?T.primary:T.amber}}>{f.perf}%</span></td>
                  <td className="px-3 py-2.5">
                    <div className="flex gap-1">
                      {["View","Edit","Assign"].map(a=>(
                        <button key={a} onClick={()=>setToast(`${a}: ${f.name}`)}
                          className="text-[10px] font-bold px-2 py-1 rounded-lg text-white"
                          style={{background:a==="View"?T.primary:a==="Edit"?T.blue:T.purple}}>{a}</button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Leave requests */}
      <h3 className="text-sm font-black text-gray-700 mt-2">Leave Requests</h3>
      <div className="space-y-2">
        {leaves.map(l=>(
          <div key={l.id} className="bg-white rounded-xl border p-4 flex items-center gap-4" style={{borderColor:l.status==="Pending"?T.amberBd:T.border}}>
            <Avatar name={l.name} size="36px"/>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-bold text-gray-800">{l.name} <span className="font-normal text-gray-500">· {l.dept}</span></p>
              <p className="text-[11px] text-gray-500">{l.from} → {l.to} · {l.days}d · {l.reason}</p>
            </div>
            <StatusPill status={l.status}/>
            {l.status==="Pending"&&(
              <div className="flex gap-2">
                <button onClick={()=>{setLeaves(r=>r.map(x=>x.id===l.id?{...x,status:"Approved"}:x));setToast("Leave approved!");}}
                  className="text-[10px] font-bold px-3 py-1.5 rounded-xl text-white" style={{background:T.primary}}>Approve</button>
                <button onClick={()=>{setLeaves(r=>r.map(x=>x.id===l.id?{...x,status:"Rejected"}:x));setToast("Leave rejected!");}}
                  className="text-[10px] font-bold px-3 py-1.5 rounded-xl bg-red-50 text-red-600">Reject</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PAGE: FEES ───────────────────────────────────────────────────────────────
function PageFees() {
  const [toast,setToast]=useState(null);
  const totalCol=FEES.filter(f=>f.status==="Paid").reduce((s,f)=>s+f.paid,0);
  const totalPend=FEES.filter(f=>f.status!=="Paid").reduce((s,f)=>s+(f.amount-f.paid),0);
  return (
    <div className="space-y-4">
      {toast&&<Toast msg={toast} onClose={()=>setToast(null)}/>}
      <div className="flex justify-between items-center">
        <h2 className="text-base font-black text-gray-800">Fee Management</h2>
        <div className="flex gap-2">
          <button className="text-xs font-bold px-3 py-1.5 rounded-xl border" style={{borderColor:T.border}}>📑 Receipts</button>
          <button onClick={()=>setToast("Financial report generating...")} className="text-xs font-bold px-3 py-1.5 rounded-xl text-white" style={{background:T.primary}}>📊 Reports</button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl border p-4 text-center" style={{borderColor:T.border}}>
          <p className="text-xl font-black" style={{color:T.primary}}>₹{(totalCol/100000).toFixed(1)}L</p>
          <p className="text-[11px] text-gray-500 mt-0.5">Collected</p>
        </div>
        <div className="bg-white rounded-2xl border p-4 text-center" style={{borderColor:T.redBd,background:T.redBg}}>
          <p className="text-xl font-black" style={{color:T.red}}>₹{(totalPend/100000).toFixed(1)}L</p>
          <p className="text-[11px] text-gray-500 mt-0.5">Pending</p>
        </div>
        <div className="bg-white rounded-2xl border p-4 text-center" style={{borderColor:T.border}}>
          <p className="text-xl font-black" style={{color:T.purple}}>{FEES.filter(f=>f.status==="Overdue").length}</p>
          <p className="text-[11px] text-gray-500 mt-0.5">Overdue</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl border overflow-hidden" style={{borderColor:T.border}}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr style={{background:`${T.primary}10`}}>
                {["Student","Dept","Year","Amount","Paid","Status","Due Date","Actions"].map(h=>(
                  <th key={h} className="px-3 py-3 text-left text-[10px] font-bold uppercase" style={{color:T.primary}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FEES.map(f=>(
                <tr key={f.id} className="border-t hover:bg-green-50/20" style={{borderColor:T.border}}>
                  <td className="px-3 py-2.5"><div className="flex items-center gap-2"><Avatar name={f.name} size="28px"/><span className="text-[12px] font-semibold text-gray-800">{f.name}</span></div></td>
                  <td className="px-3 py-2.5 text-[11px] text-gray-600">{f.dept}</td>
                  <td className="px-3 py-2.5 text-[11px] text-gray-600">{f.year}</td>
                  <td className="px-3 py-2.5 text-[12px] font-semibold text-gray-700">₹{f.amount.toLocaleString()}</td>
                  <td className="px-3 py-2.5 text-[12px] font-semibold" style={{color:T.primary}}>₹{f.paid.toLocaleString()}</td>
                  <td className="px-3 py-2.5"><StatusPill status={f.status}/></td>
                  <td className="px-3 py-2.5 text-[11px] text-gray-500">{f.dueDate}</td>
                  <td className="px-3 py-2.5">
                    <button onClick={()=>setToast(`Receipt generated for ${f.name}`)} className="text-[10px] font-bold px-2.5 py-1 rounded-lg text-white" style={{background:T.primary}}>Receipt</button>
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

// ─── PAGE: TRANSPORT ──────────────────────────────────────────────────────────
function PageTransport() {
  const [toast,setToast]=useState(null);
  return (
    <div className="space-y-4">
      {toast&&<Toast msg={toast} onClose={()=>setToast(null)}/>}
      <div className="flex justify-between items-center">
        <h2 className="text-base font-black text-gray-800">Transport Management</h2>
        <button onClick={()=>setToast("Add bus form opened!")} className="text-xs font-bold px-4 py-2 rounded-xl text-white" style={{background:T.primary}}>+ Add Bus</button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[["🚌","Total Buses",BUSES.length,T.primary],["🟢","Active",BUSES.filter(b=>b.status==="Active").length,T.bright],["🔧","Maintenance",BUSES.filter(b=>b.status==="Maintenance").length,T.amber],["👥","Students",BUSES.reduce((s,b)=>s+b.students,0),T.blue]].map(([i,l,v,c])=>(
          <div key={l} className="bg-white rounded-2xl border p-4 text-center" style={{borderColor:T.border}}>
            <span className="text-2xl">{i}</span>
            <p className="text-xl font-black mt-1" style={{color:c}}>{v}</p>
            <p className="text-[11px] text-gray-400">{l}</p>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        {BUSES.map(b=>(
          <div key={b.id} className="bg-white rounded-2xl border p-4 flex flex-col sm:flex-row sm:items-center gap-4" style={{borderColor:b.status==="Maintenance"?T.amberBd:T.border}}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{background:T.palest}}>🚌</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-[13px] font-black text-gray-800">{b.number}</p>
                <StatusPill status={b.status}/>
              </div>
              <p className="text-[11px] text-gray-500 mt-0.5">{b.route}</p>
              <p className="text-[11px] text-gray-400">Driver: {b.driver}</p>
            </div>
            <div className="flex gap-4 text-center">
              <div>
                <p className="text-lg font-black" style={{color:T.primary}}>{b.students}</p>
                <p className="text-[9px] text-gray-400">Students</p>
              </div>
              <div>
                <p className="text-lg font-black text-gray-600">{b.capacity}</p>
                <p className="text-[9px] text-gray-400">Capacity</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={()=>setToast(`Tracking ${b.number}`)} className="text-[11px] font-bold px-3 py-1.5 rounded-xl text-white" style={{background:T.primary}}>📍 Track</button>
              <button onClick={()=>setToast(`Editing ${b.number}`)} className="text-[11px] font-bold px-3 py-1.5 rounded-xl border" style={{borderColor:T.border}}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PAGE: REPORTS ────────────────────────────────────────────────────────────
function PageReports() {
  const [toast,setToast]=useState(null);
  const reports=[
    {name:"Student Attendance Report",   icon:"✅",desc:"Year/dept attendance analytics"},
    {name:"Faculty Reports",             icon:"👩‍🏫",desc:"Workload, performance, leave"},
    {name:"Financial Reports",           icon:"₹",  desc:"Fee collection, pending, receipts"},
    {name:"Academic Performance",        icon:"📊",desc:"Marks, results, rank lists"},
    {name:"Transport Reports",           icon:"🚌",desc:"Route utilisation, student allocation"},
    {name:"Department Performance",      icon:"🏛️",desc:"Department-wise pass % and analytics"},
  ];
  return (
    <div className="space-y-4">
      {toast&&<Toast msg={toast} onClose={()=>setToast(null)}/>}
      <h2 className="text-base font-black text-gray-800">Reports & Analytics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map(r=>(
          <div key={r.name} className="bg-white rounded-2xl border p-4 hover:shadow-md transition-shadow" style={{borderColor:T.border}}>
            <span className="text-3xl mb-3 block">{r.icon}</span>
            <p className="text-[13px] font-black text-gray-800">{r.name}</p>
            <p className="text-[11px] text-gray-500 mt-1 mb-4">{r.desc}</p>
            <div className="flex gap-2">
              <button onClick={()=>setToast(`Generating ${r.name} PDF...`)} className="flex-1 py-2 rounded-xl text-[11px] font-bold text-white" style={{background:T.red}}>PDF</button>
              <button onClick={()=>setToast(`Generating ${r.name} Excel...`)} className="flex-1 py-2 rounded-xl text-[11px] font-bold text-white" style={{background:T.primary}}>Excel</button>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border p-4" style={{borderColor:T.border}}>
        <p className="text-[12px] font-bold text-gray-700 mb-3">Analytics — Department Pass Rate</p>
        <BarChart data={DEPT_PERF} valueKey="pass" labelKey="d" color={T.primary} maxH={80}/>
      </div>
    </div>
  );
}

// ─── PAGE: SETTINGS ───────────────────────────────────────────────────────────
function PageSettings() {
  const [toast,setToast]=useState(null);
  const [dark,setDark]=useState(false);
  return (
    <div className="space-y-4 max-w-2xl">
      {toast&&<Toast msg={toast} onClose={()=>setToast(null)}/>}
      <h2 className="text-base font-black text-gray-800">System Settings</h2>
      {[
        {title:"College Profile",icon:"🏫",desc:"Name, logo, address, contact"},
        {title:"Academic Settings",icon:"📅",desc:"Year, semester, grading system"},
        {title:"Roles & Permissions (RBAC)",icon:"🔐",desc:"Role-based access control"},
        {title:"Notification Settings",icon:"🔔",desc:"Email, SMS, push alerts"},
        {title:"Backup & Restore",icon:"💾",desc:"Automated backups, restore points"},
        {title:"Audit Logs",icon:"📋",desc:"User activity, login history"},
      ].map(s=>(
        <div key={s.title} className="bg-white rounded-2xl border p-4 flex items-center gap-4" style={{borderColor:T.border}}>
          <span className="text-2xl">{s.icon}</span>
          <div className="flex-1">
            <p className="text-[13px] font-bold text-gray-800">{s.title}</p>
            <p className="text-[11px] text-gray-400">{s.desc}</p>
          </div>
          <button onClick={()=>setToast(`Opening ${s.title}...`)} className="text-[11px] font-bold px-4 py-2 rounded-xl border hover:bg-gray-50 transition-colors" style={{borderColor:T.border}}>Configure</button>
        </div>
      ))}
      <div className="bg-white rounded-2xl border p-4 flex items-center gap-4" style={{borderColor:T.border}}>
        <span className="text-2xl">🌙</span>
        <div className="flex-1">
          <p className="text-[13px] font-bold text-gray-800">Dark Mode</p>
          <p className="text-[11px] text-gray-400">Toggle system appearance</p>
        </div>
        <button onClick={()=>{setDark(d=>!d);setToast(dark?"Light mode active":"Dark mode active (UI preview only)");}}
          className="w-12 h-6 rounded-full transition-colors relative" style={{background:dark?T.primary:T.border}}>
          <span className="absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all" style={{left:dark?"26px":"2px"}}/>
        </button>
      </div>
    </div>
  );
}

function PagePlaceholder({ label }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-gray-400">
      <span className="text-6xl">🛠️</span>
      <p className="text-base font-bold text-gray-600">{label}</p>
      <p className="text-sm">This module is coming soon.</p>
    </div>
  );
}

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────
function Sidebar({ page, setPage, open, setOpen }) {
  const [exp,setExp]=useState({dashboard:true,users:true,students:true,faculty:true});
  const tog=k=>setExp(e=>({...e,[k]:!e[k]}));
  const pendBadge={users:KPI_DATA.pendingFees,faculty:LEAVE_REQUESTS.filter(l=>l.status==="Pending").length,attendance:18};
  return (
    <>
      {open&&<div className="fixed inset-0 z-20 bg-black/50 md:hidden" onClick={()=>setOpen(false)}/>}
      <aside className={`fixed inset-y-0 left-0 z-30 w-60 flex flex-col transition-transform duration-300
        ${open?"translate-x-0":"-translate-x-full"} md:static md:translate-x-0 md:flex-shrink-0 overflow-y-auto`}
        style={{background:T.sidebar}}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-base shrink-0"
            style={{background:T.bright,color:T.darkest}}>M</div>
          <div className="min-w-0">
            <p className="text-white font-black text-sm leading-tight">MCC Admin</p>
            <p className="text-[9px] font-semibold" style={{color:T.light}}>Education ERP</p>
          </div>
          <button onClick={()=>setOpen(false)} className="md:hidden ml-auto text-white/40 text-xl">✕</button>
        </div>
        {/* Admin tag */}
        <div className="flex items-center gap-2.5 px-4 py-3 border-b border-white/10">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-black shrink-0"
            style={{background:T.pale,color:T.darkest}}>AD</div>
          <div className="min-w-0">
            <p className="text-white text-[11px] font-bold truncate">System Administrator</p>
            <p className="text-[9px] font-semibold" style={{color:T.light}}>Full Access</p>
          </div>
        </div>
        {/* Nav */}
        <nav className="flex-1 py-2">
          {NAV.map(item=>{
            const isAct=page===item.key||item.ch.some(c=>c.key===page);
            const badge=pendBadge[item.key];
            return (
              <div key={item.key}>
                <button onClick={()=>{item.ch.length?tog(item.key):(setPage(item.key),setOpen(false));}}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-[12px] font-semibold transition-colors"
                  style={{color:isAct?T.bright:"rgba(255,255,255,0.65)"}}
                  onMouseEnter={e=>e.currentTarget.style.background=T.sideHov}
                  onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                  <span className="text-sm shrink-0">{item.icon}</span>
                  <span className="flex-1 truncate">{item.label}</span>
                  {badge>0&&<span className="bg-red-500 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center shrink-0">{badge>9?"9+":badge}</span>}
                  {item.ch.length>0&&<span className="text-[10px] text-white/30 shrink-0">{exp[item.key]?"▾":"›"}</span>}
                </button>
                {item.ch.length>0&&exp[item.key]&&(
                  <div className="pb-1">
                    {item.ch.map(c=>(
                      <button key={c.key} onClick={()=>{setPage(c.key);setOpen(false);}}
                        className="w-full flex items-center gap-2 pl-11 pr-4 py-2 text-left text-[11px] transition-colors"
                        style={{color:page===c.key?T.bright:"rgba(255,255,255,0.5)",fontWeight:page===c.key?700:500,background:page===c.key?"rgba(34,197,94,0.12)":"transparent"}}
                        onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.05)"}
                        onMouseLeave={e=>e.currentTarget.style.background=page===c.key?"rgba(34,197,94,0.12)":"transparent"}>
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{background:page===c.key?T.bright:"rgba(255,255,255,0.2)"}}/>{c.label}
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
            <span className="text-base">🎧</span>
            <div><p className="text-white text-[11px] font-semibold">IT Support</p><p className="text-white/40 text-[9px]">it@mcc.edu.in</p></div>
          </div>
        </div>
      </aside>
    </>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function AdminPanel() {
  const [page,    setPage]   = useState("dashboard");
  const [sbOpen,  setSbOpen] = useState(false);
  const [notif,   setNotif]  = useState(false);
  const [search,  setSearch] = useState("");
  const unread = NOTIFICATIONS.filter(n=>!n.read).length;

  const crumb=(()=>{
    for(const item of NAV){
      if(item.key===page) return [item.label];
      for(const c of item.ch) if(c.key===page) return [item.label,c.label];
    }
    return [page];
  })();

  const renderPage=()=>{
    if(page==="dashboard")  return <PageDashboard setPage={setPage}/>;
    if(["all-users","students-u","faculty-u","hods-u","parents-u","transport-u","admins-u","roles","reset-pw","permissions"].includes(page))
      return <PageUsers roleFilter={page==="students-u"?"Student":page==="faculty-u"?"Faculty":page==="hods-u"?"HOD":page==="parents-u"?"Parent":page==="admins-u"?"Admin":undefined}/>;
    if(["depts","courses","programs","acad-years","semesters","sections","subjects"].includes(page)) return <PageDepartments/>;
    if(["all-students","admission","profiles","promote","transfer","alumni"].includes(page)) return <PageStudents setPageNav={setPage}/>;
    if(["faculty-list","assign-subj","workload","faculty-perf","leave-mgmt"].includes(page)) return <PageFaculty/>;
    if(["payments","pending-fee","fee-struct","scholarships","receipts","fin-rep"].includes(page)) return <PageFees/>;
    if(["buses","routes","drivers","tracking","gps","bus-alloc"].includes(page)) return <PageTransport/>;
    if(["stu-rep","fac-rep","att-report","fin-report","acad-rep","trans-rep","exp-pdf","exp-excel"].includes(page)) return <PageReports/>;
    if(["college-profile","acad-settings","rbac","notif-settings","email-sms","backup","audit-logs"].includes(page)) return <PageSettings/>;
    return <PagePlaceholder label={crumb[crumb.length-1]}/>;
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{background:T.bg,fontFamily:"system-ui,sans-serif"}}>
      <Sidebar page={page} setPage={setPage} open={sbOpen} setOpen={setSbOpen}/>

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Sticky header */}
        <header className="bg-white border-b flex items-center px-4 py-3 gap-3 shrink-0 sticky top-0 z-10" style={{borderColor:T.border}}>
          <button onClick={()=>setSbOpen(o=>!o)} className="text-gray-500 hover:text-gray-700 text-xl md:hidden shrink-0">☰</button>

          {/* Global search */}
          <div className="hidden sm:block relative flex-1 max-w-xs">
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Global search..."
              className="w-full pl-8 pr-4 py-2 border rounded-xl text-[12px] bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-300"
              style={{borderColor:T.border}}/>
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          </div>

          {/* Breadcrumb */}
          <div className="hidden md:flex items-center gap-1 text-[11px] text-gray-400 ml-2">
            <span className="font-semibold" style={{color:T.primary}}>Admin</span>
            {crumb.map((c,i)=>(
              <span key={i} className="flex items-center gap-1">
                <span>›</span>
                <span className={i===crumb.length-1?"font-bold text-gray-700":""}>{c}</span>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 ml-auto shrink-0">
            {/* Notif bell */}
            <div className="relative">
              <button onClick={()=>setNotif(o=>!o)}
                className="relative w-9 h-9 rounded-xl flex items-center justify-center hover:bg-gray-100 border transition-colors"
                style={{borderColor:T.border}}>
                <span>🔔</span>
                {unread>0&&<span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-black">{unread}</span>}
              </button>
              {notif&&(
                <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border z-50 overflow-hidden" style={{borderColor:T.border}}>
                  <div className="px-4 py-3 border-b flex items-center justify-between" style={{borderColor:T.border}}>
                    <p className="text-sm font-bold text-gray-700">Notifications</p>
                    <button onClick={()=>setNotif(false)} className="text-gray-400">✕</button>
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y" style={{divideColor:T.border}}>
                    {NOTIFICATIONS.map(n=>{
                      const ic={user:"👥",fee:"₹",leave:"📋",att:"⚠️",system:"🖥️",exam:"📅"};
                      return (
                        <div key={n.id} className={`flex items-start gap-3 px-4 py-3 ${!n.read?"bg-green-50":""}`}>
                          <span className="text-base shrink-0">{ic[n.type]||"🔔"}</span>
                          <div className="flex-1 min-w-0">
                            <p className={`text-[12px] leading-snug ${!n.read?"font-bold text-gray-800":"text-gray-600"}`}>{n.msg}</p>
                            <p className="text-[10px] text-gray-400 mt-0.5">{n.time}</p>
                          </div>
                          {!n.read&&<span className="w-2 h-2 rounded-full mt-1 shrink-0" style={{background:T.primary}}/>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            {/* Avatar */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-black text-white" style={{background:T.primary}}>AD</div>
              <div className="hidden sm:block">
                <p className="text-[11px] font-bold text-gray-700">Administrator</p>
                <p className="text-[9px] text-gray-400">Full Access</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}