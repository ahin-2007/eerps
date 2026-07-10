import { useState, useEffect } from "react";
import NoticeBoard from "../Components/NoticeBoard";
import ContactUs from "../Components/ContactUs";

// ── Navigation Groups ─────────────────────────────────────────────────────────
const NAV_GROUPS = [
  { label: "MAIN",           items: [{ label: "Dashboard",       icon: "🏠" }] },
  { label: "MY CHILD",       items: [{ label: "Student Profile", icon: "🎓" }] },
  {
    label: "ACADEMICS",
    items: [
      { label: "Attendance",      icon: "✅" },
      { label: "Academics",       icon: "📈" },
      { label: "Assignments",     icon: "📝" },
      { label: "Study Materials", icon: "📚" },
      { label: "Timetable",       icon: "🗓️" },
    ],
  },
  {
    label: "ADMINISTRATION",
    items: [
      { label: "Fees",          icon: "💳" },
      { label: "Transport",     icon: "🚌" },
      { label: "Announcements", icon: "📢" },
      { label: "Messages",      icon: "💬" },
      { label: "Leave Request", icon: "📋" },
    ],
  },
  { label: "SETTINGS", items: [{ label: "Profile", icon: "👤" }] },
];
const ALL_NAV = NAV_GROUPS.flatMap((g) => g.items);

// ── Mock Data ─────────────────────────────────────────────────────────────────
const child = {
  name: "Arun Kumar", photo: "AK", regNo: "902324104005", rollNo: "23CSE005",
  dept: "Computer Science & Engineering", year: "2nd Year",
  semester: "4th Semester", section: "Section A",
  guide: "Dr. K. Rajkumar", guidePhone: "+91 98431 22334",
  guideEmail: "rajkumar@college.edu",
  overallAttendance: 86.4, cgpa: 8.25, rank: 4,
  feeStatus: "Pending", busAssigned: true,
};

const parentInfo = {
  name: "Kumar Selvam", relation: "Father",
  phone: "+91 98765 43210", email: "kumar.selvam@email.com",
  address: "No. 14, Rose Nagar, Coimbatore – 641001",
};

const attendanceBreakdown = [
  { code: "CS8401", subject: "Design and Analysis of Algorithms", conducted: 40, attended: 33, percent: 82.5, status: "Safe" },
  { code: "CS8402", subject: "Theory of Computation",            conducted: 38, attended: 27, percent: 71.1, status: "Critical" },
  { code: "CS8403", subject: "Software Engineering",             conducted: 35, attended: 31, percent: 88.6, status: "Safe" },
  { code: "CS8404", subject: "Database Management Systems",      conducted: 42, attended: 39, percent: 92.8, status: "Safe" },
  { code: "CS8411", subject: "Mobile Application Lab",           conducted: 20, attended: 19, percent: 95.0, status: "Safe" },
];

const monthlyAttendance = [
  { month: "Jan", percent: 92 }, { month: "Feb", percent: 88 },
  { month: "Mar", percent: 79 }, { month: "Apr", percent: 85 },
  { month: "May", percent: 91 }, { month: "Jun", percent: 83 },
  { month: "Jul", percent: 86 },
];

const internalMarks = [
  { code: "CS8401", subject: "Algorithms",            test1: 38, test2: 42, assignment: 9,  practical: null },
  { code: "CS8402", subject: "Theory of Computation", test1: 29, test2: 32, assignment: 8,  practical: null },
  { code: "CS8403", subject: "Software Engineering",  test1: 44, test2: 41, assignment: 9,  practical: null },
  { code: "CS8404", subject: "DBMS",                  test1: 40, test2: 45, assignment: 10, practical: null },
  { code: "CS8411", subject: "Mobile App Lab",        test1: null, test2: null, assignment: null, practical: 92 },
];

const semesterGpas = [
  { semester: "Semester 1", gpa: 8.12, credits: 22, status: "Pass", rank: 6 },
  { semester: "Semester 2", gpa: 8.40, credits: 20, status: "Pass", rank: 5 },
  { semester: "Semester 3", gpa: 8.25, credits: 24, status: "Pass", rank: 4 },
];

const assignments = [
  { id: 1, subject: "Algorithms",          title: "Greedy Algorithm Case Study",    dueDate: "July 14, 2026", status: "Pending",   grade: null,    remarks: "Not yet submitted." },
  { id: 2, subject: "Software Engineering",title: "SRS Document Preparation",       dueDate: "July 18, 2026", status: "Pending",   grade: null,    remarks: "Draft review pending." },
  { id: 3, subject: "DBMS",               title: "ER Diagram & Normalization",      dueDate: "July 08, 2026", status: "Submitted", grade: "9/10",  remarks: "Good work. Minor ER corrections needed." },
  { id: 4, subject: "Theory of Computation",title: "DFA Construction Problems",    dueDate: "June 28, 2026", status: "Late",      grade: "7/10",  remarks: "Submitted 2 days late. Marks deducted." },
  { id: 5, subject: "Mobile App Lab",      title: "Todo App with SQLite",           dueDate: "July 05, 2026", status: "Submitted", grade: "10/10", remarks: "Excellent implementation!" },
];

const studyMaterials = {
  Notes: [
    { name: "DAA – Unit 1 Notes",        subject: "CS8401", type: "PDF", size: "1.2 MB", uploaded: "July 06" },
    { name: "TOC – Automata Theory",     subject: "CS8402", type: "PDF", size: "890 KB", uploaded: "July 04" },
    { name: "SE – SDLC Models Summary",  subject: "CS8403", type: "PDF", size: "540 KB", uploaded: "July 01" },
    { name: "DBMS – SQL Reference",      subject: "CS8404", type: "PDF", size: "2.1 MB", uploaded: "June 28" },
  ],
  PDFs: [
    { name: "Question Bank – Algorithms",       subject: "CS8401", type: "PDF", size: "3.4 MB", uploaded: "July 07" },
    { name: "Previous Year Papers 2024",        subject: "All",    type: "PDF", size: "5.1 MB", uploaded: "July 05" },
    { name: "Lab Manual – Mobile App",          subject: "CS8411", type: "PDF", size: "4.2 MB", uploaded: "June 30" },
  ],
  Videos: [
    { name: "Dynamic Programming – Full Lecture",        subject: "CS8401", type: "MP4", size: "480 MB", uploaded: "July 03" },
    { name: "Database Normalization Walkthrough",        subject: "CS8404", type: "MP4", size: "310 MB", uploaded: "June 25" },
    { name: "Android Studio Setup & Hello World",        subject: "CS8411", type: "MP4", size: "210 MB", uploaded: "June 20" },
  ],
};

const classTimetable = {
  Mon: ["DAA", "TOC", "—", "SE",   "DBMS", "—"   ],
  Tue: ["TOC", "—",   "SE", "DAA", "—",    "Lab" ],
  Wed: ["DBMS","DAA", "—", "TOC",  "—",    "SE"  ],
  Thu: ["SE",  "DBMS","DAA","—",   "TOC",  "—"   ],
  Fri: ["—",   "TOC", "DBMS","—",  "DAA",  "Lab" ],
};
const periods = ["8:30–9:30","9:30–10:30","10:30–11:30","11:30–12:30","1:30–2:30","2:30–4:30"];

const examTimetable = [
  { date: "July 20", day: "Mon", subject: "Design & Analysis of Algorithms", code: "CS8401", time: "10:00 AM", hall: "H-101" },
  { date: "July 22", day: "Wed", subject: "Theory of Computation",           code: "CS8402", time: "10:00 AM", hall: "H-102" },
  { date: "July 24", day: "Fri", subject: "Software Engineering",            code: "CS8403", time: "10:00 AM", hall: "H-101" },
  { date: "July 28", day: "Tue", subject: "Database Management Systems",     code: "CS8404", time: "10:00 AM", hall: "H-103" },
  { date: "July 30", day: "Thu", subject: "Mobile Application Lab (Practical)", code: "CS8411", time: "9:00 AM", hall: "Lab-B" },
];

const fees = {
  total: 45000, paid: 33000, outstanding: 12000, dueDate: "July 15, 2026",
  history: [
    { id: "REC001", date: "Jan 15, 2026", desc: "Semester 4 Tuition Fee (Partial)", amount: 20000, status: "Paid" },
    { id: "REC002", date: "Mar 02, 2026", desc: "Lab & Exam Fee",                  amount: 8000,  status: "Paid" },
    { id: "REC003", date: "Mar 20, 2026", desc: "Library & Miscellaneous",         amount: 5000,  status: "Paid" },
    { id: "REC004", date: "July 15, 2026",desc: "Remaining Tuition Fee",           amount: 12000, status: "Overdue" },
  ],
};

const transport = {
  busNo: "TN-07-AB-1234", route: "Route 7 – Gandhipuram → College",
  driver: "Murugan K.", driverPhone: "+91 94432 10987",
  pickup: "7:20 AM", drop: "5:00 PM",
  currentLocation: "Singanallur Junction", eta: "18 mins",
  stops: [
    { stop: "Gandhipuram Bus Stand",  time: "7:00 AM" },
    { stop: "RS Puram Signal",        time: "7:10 AM" },
    { stop: "Singanallur Junction",   time: "7:20 AM" },
    { stop: "Saravanampatti",         time: "7:35 AM" },
    { stop: "College Main Gate",      time: "7:50 AM" },
  ],
};

const announcements = {
  "College Notices": [
    { id: 1, title: "Annual Day Celebration 2026",        date: "July 09", importance: "High",   content: "Annual Day celebrations will be held on July 25, 2026 at the college auditorium from 9 AM onwards. All students must attend in formal dress." },
    { id: 2, title: "Anti-Ragging Committee Meeting",     date: "July 07", importance: "Medium", content: "The Anti-Ragging Committee will conduct awareness sessions on July 12 for all first-year students." },
  ],
  "Department Notices": [
    { id: 3, title: "Project Phase-2 Review Schedule",    date: "July 08", importance: "High",   content: "All final year CSE students must present their project Phase-2 on July 15. Bring signed project reports and 10-slide presentations." },
    { id: 4, title: "CyberFest 2026 Volunteer Registration", date: "July 05", importance: "Medium", content: "Students interested in volunteering for CyberFest 2k26 report to the HOD cabin at 3:30 PM tomorrow." },
  ],
  "Events": [
    { id: 5, title: "Hackathon 2026 – Registration Open", date: "July 06", importance: "High",   content: "Inter-college Hackathon on August 2–3. Register via the college portal. Prize pool: ₹50,000." },
    { id: 6, title: "Guest Lecture: AI & Cloud Computing",date: "July 03", importance: "Medium", content: "Guest lecture by Mr. Karthik from Zoho Corp on July 16, 2:00 PM in the Seminar Hall." },
  ],
  "Holidays": [
    { id: 7, title: "Bakrid Public Holiday",              date: "July 07", importance: "Low",    content: "The college will remain closed on July 17 (Thursday) for Bakrid. Classes compensated on Saturday July 19." },
    { id: 8, title: "Semester Break: July 31 – Aug 5",   date: "July 05", importance: "Medium", content: "Post end-semester exams, college will have a semester break from July 31 to August 5. New semester begins August 6." },
  ],
};

const messages = {
  "Faculty": [
    { id: 1, from: "Mrs. Sarah John",   subject: "Assignment Extension Request", date: "July 08, 10:30 AM", body: "Dear Parent, I have noted your request. Considering the circumstances, I am granting a 2-day extension for the SRS document assignment until July 20. Please ensure timely submission.", read: true },
    { id: 2, from: "Mr. R. Rajesh",     subject: "Lab Record Pending",           date: "July 07, 3:00 PM",  body: "The lab record for Mobile Application Development has not been submitted by Arun. Please ensure it is submitted before July 13 to avoid internal mark deduction.", read: false },
  ],
  "HOD": [
    { id: 3, from: "Dr. K. Rajkumar (HOD)", subject: "Parent-Teacher Meeting Reminder", date: "July 06, 9:00 AM", body: "This is to remind you that the PTM for CSE 2nd year is scheduled on Saturday, July 18 at 10:00 AM. Please plan to attend and discuss your ward's progress.", read: true },
  ],
  "Administration": [
    { id: 4, from: "Fee Office", subject: "Urgent: Fee Due Reminder", date: "July 08, 11:00 AM", body: "This is a final reminder that ₹12,000 in outstanding fees for Arun Kumar (Reg: 902324104005) is due by July 15, 2026. After the due date, a late fee of ₹500/day will be applied.", read: false },
  ],
};

const CALENDAR_ATTENDANCE = {
  1:"P",2:"P",3:"P",4:"P",5:"H",6:"P",7:"P",8:"P",9:"P",10:"P",
  11:"A",12:"H",13:"P",14:"P",15:"P",16:"A",17:"P",18:"P",19:"P",
  20:"P",21:"P",22:"P",23:"P",24:"P",25:"P",26:"H",27:"P",28:"P",29:"P",30:"P",31:"P",
};

// ── SVG Chart Components ───────────────────────────────────────────────────────
function BarChart({ data, height = 110 }) {
  const bW = Math.floor(240 / data.length) - 6;
  return (
    <svg viewBox={`0 0 280 ${height + 32}`} className="w-full" style={{ height: height + 32 }}>
      {data.map((d, i) => {
        const bH = Math.round((d.percent / 100) * height);
        const x = 10 + i * (bW + 6);
        const y = height - bH + 4;
        const low = d.percent < 80;
        return (
          <g key={i}>
            <rect x={x} y={height + 4} width={bW} height={0} rx={3} fill={low ? "#f87171" : "#6366f1"} fillOpacity={0.15} />
            <rect x={x} y={y} width={bW} height={bH} rx={3} fill={low ? "#f87171" : "#6366f1"} fillOpacity={0.85} />
            <text x={x + bW / 2} y={height + 17} textAnchor="middle" fontSize="7" fill="#9ca3af">{d.month}</text>
            <text x={x + bW / 2} y={y - 3} textAnchor="middle" fontSize="7" fill={low ? "#ef4444" : "#4f46e5"} fontWeight="bold">{d.percent}%</text>
          </g>
        );
      })}
      <line x1={8} y1={height + 4} x2={272} y2={height + 4} stroke="#e5e7eb" strokeWidth={1} />
    </svg>
  );
}

function HorizBarChart({ data }) {
  return (
    <div className="space-y-2.5">
      {data.filter(d => d.test2 !== null).map((d, i) => {
        const pct = Math.round((d.test2 / 50) * 100);
        const color = pct >= 80 ? "bg-indigo-500" : pct >= 60 ? "bg-amber-400" : "bg-red-400";
        return (
          <div key={i} className="flex items-center gap-2 text-xs">
            <span className="w-28 truncate text-gray-500 text-[11px]">{d.subject}</span>
            <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
              <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
            </div>
            <span className="w-10 text-right font-bold text-indigo-600 text-[11px]">{d.test2}/50</span>
          </div>
        );
      })}
    </div>
  );
}

function LineChart({ data, height = 110 }) {
  const gpas = data.map((d) => d.gpa);
  const minG = Math.min(...gpas) - 0.3, maxG = Math.max(...gpas) + 0.3;
  const W = 260, pad = 22;
  const xStep = (W - pad * 2) / (data.length - 1);
  const tx = (i) => pad + i * xStep;
  const ty = (v) => height - pad - ((v - minG) / (maxG - minG)) * (height - pad * 2);
  const pathD = data.map((d, i) => `${i === 0 ? "M" : "L"}${tx(i).toFixed(1)},${ty(d.gpa).toFixed(1)}`).join(" ");
  const areaD = `${pathD} L${tx(data.length-1).toFixed(1)},${height-pad} L${tx(0).toFixed(1)},${height-pad} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${height}`} className="w-full" style={{ height }}>
      <defs>
        <linearGradient id="lgGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#lgGrad)" />
      <path d={pathD} fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((d, i) => (
        <g key={i}>
          <circle cx={tx(i)} cy={ty(d.gpa)} r="4.5" fill="white" stroke="#6366f1" strokeWidth="2" />
          <text x={tx(i)} y={ty(d.gpa) - 9} textAnchor="middle" fontSize="8.5" fill="#4f46e5" fontWeight="bold">{d.gpa}</text>
          <text x={tx(i)} y={height - 5} textAnchor="middle" fontSize="7" fill="#9ca3af">{d.semester.replace("Semester ", "S")}</text>
        </g>
      ))}
    </svg>
  );
}

function DonutChart({ pending, submitted, late }) {
  const total = pending + submitted + late || 1;
  const R = 38, CX = 58, CY = 58, SW = 13;
  const circ = 2 * Math.PI * R;
  const s1 = (submitted / total) * circ;
  const s2 = (pending / total) * circ;
  const s3 = (late / total) * circ;
  const offset = circ * 0.25;
  return (
    <svg viewBox="0 0 116 116" className="w-28 h-28">
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="#f3f4f6" strokeWidth={SW} />
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="#22c55e" strokeWidth={SW}
        strokeDasharray={`${s1} ${circ - s1}`} strokeDashoffset={offset} strokeLinecap="butt" />
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="#f59e0b" strokeWidth={SW}
        strokeDasharray={`${s2} ${circ - s2}`} strokeDashoffset={offset - s1} strokeLinecap="butt" />
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="#ef4444" strokeWidth={SW}
        strokeDasharray={`${s3} ${circ - s3}`} strokeDashoffset={offset - s1 - s2} strokeLinecap="butt" />
      <text x={CX} y={CY - 5} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1f2937">{total}</text>
      <text x={CX} y={CY + 10} textAnchor="middle" fontSize="7.5" fill="#9ca3af">Tasks</text>
    </svg>
  );
}

// ── Attendance Calendar ───────────────────────────────────────────────────────
function AttendanceCalendar() {
  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const startDay = 3; // July 1 2026 = Wednesday
  const cells = Array(startDay).fill(null).concat(Array.from({ length: 31 }, (_, i) => i + 1));
  return (
    <div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map((d) => <div key={d} className="text-center text-[9px] font-bold text-gray-400 py-0.5">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <div key={`e${i}`} />;
          const s = CALENDAR_ATTENDANCE[day];
          const isToday = day === 10;
          return (
            <div key={day}
              title={s === "P" ? "Present" : s === "A" ? "Absent" : s === "H" ? "Holiday" : ""}
              className={[
                "aspect-square flex items-center justify-center rounded-lg text-[11px] font-semibold",
                s === "P" ? "bg-green-50 text-green-700 border border-green-100" : "",
                s === "A" ? "bg-red-50 text-red-600 border border-red-100" : "",
                s === "H" ? "bg-gray-100 text-gray-400 border border-gray-100" : "",
                !s ? "text-gray-200" : "",
                isToday ? "ring-2 ring-indigo-400 ring-offset-1" : "",
              ].join(" ")}>
              {day}
            </div>
          );
        })}
      </div>
      <div className="flex gap-4 mt-3 text-[10px] text-gray-500">
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-green-200" />Present</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-red-200" />Absent</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-gray-200" />Holiday</span>
      </div>
    </div>
  );
}

// ── KPI Card ──────────────────────────────────────────────────────────────────
function KPICard({ icon, label, value, sub, bg, valColor, onClick }) {
  return (
    <div onClick={onClick}
      className={`bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-start gap-3 ${onClick ? "cursor-pointer hover:shadow-md transition-shadow" : ""}`}>
      <span className={`text-xl ${bg} w-10 h-10 rounded-xl flex items-center justify-center shrink-0`}>{icon}</span>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider leading-tight">{label}</p>
        <p className={`font-extrabold text-base leading-tight mt-0.5 ${valColor || "text-gray-800"}`}>{value}</p>
        {sub && <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

// ── Status badge helper ────────────────────────────────────────────────────────
function Badge({ status }) {
  const map = {
    Safe:      "bg-green-50 text-green-600 border-green-100",
    Critical:  "bg-red-50 text-red-600 border-red-100",
    Pending:   "bg-amber-50 text-amber-600 border-amber-100",
    Submitted: "bg-green-50 text-green-600 border-green-100",
    Late:      "bg-red-50 text-red-600 border-red-100",
    Paid:      "bg-green-50 text-green-600 border-green-100",
    Overdue:   "bg-red-50 text-red-600 border-red-100",
    Approved:  "bg-green-50 text-green-600 border-green-100",
    Rejected:  "bg-red-50 text-red-600 border-red-100",
    Pass:      "bg-green-50 text-green-700 border-green-100",
    High:      "bg-red-50 text-red-600 border-red-100",
    Medium:    "bg-amber-50 text-amber-600 border-amber-100",
    Low:       "bg-gray-50 text-gray-500 border-gray-100",
    Active:    "bg-green-50 text-green-700 border-green-100",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border inline-block ${map[status] || "bg-gray-50 text-gray-500 border-gray-100"}`}>
      {status}
    </span>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function ParentConnect() {
  const [activePage, setActivePage]       = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen]     = useState(false);
  const [activeTab, setActiveTab]         = useState({});

  const [alertsList, setAlertsList] = useState([
    { id: 1, type: "Fee Alert",     dot: "bg-red-500",  importance: "High",   date: "Today",    read: false, message: "Semester tuition and lab fee dues of ₹12,000 are pending. Please pay before July 15, 2026 to avoid late charges." },
    { id: 2, type: "Exam Alert",    dot: "bg-blue-500", importance: "Medium", date: "Yesterday",read: false, message: "End-Semester Practical Examinations schedule has been released. Exams start on July 20, 2026." },
    { id: 3, type: "Meeting Alert", dot: "bg-red-500",  importance: "High",   date: "July 05",  read: true,  message: "Parent-Teacher Meeting (PTM) for CSE 2nd-year students is scheduled for Saturday, July 18, at 10:00 AM." },
    { id: 4, type: "Attendance",    dot: "bg-amber-500",importance: "Medium", date: "July 04",  read: true,  message: "Theory of Computation (CS8402) attendance is at 71.1% — below the 75% threshold. Immediate attention required." },
  ]);

  const [leaveDate, setLeaveDate]         = useState("");
  const [leaveReason, setLeaveReason]     = useState("");
  const [leaveCategory, setLeaveCategory] = useState("Medical Leave");
  const [leaveSubmitOk, setLeaveSubmitOk] = useState(false);
  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, date: "June 12, 2026", category: "Medical Leave", reason: "Fever and cold", status: "Approved" },
    { id: 2, date: "May 28, 2026",  category: "Family Event",  reason: "Sister's wedding ceremony", status: "Approved" },
  ]);

  const getTab = (page, def) => activeTab[page] || def;
  const setTab = (page, tab) => setActiveTab((p) => ({ ...p, [page]: tab }));

  const handleMarkRead    = (id) => setAlertsList((p) => p.map((a) => a.id === id ? { ...a, read: true } : a));
  const handleDismiss     = (id) => setAlertsList((p) => p.filter((a) => a.id !== id));
  const handleMarkAllRead = ()   => setAlertsList((p) => p.map((a) => ({ ...a, read: true })));

  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    if (!leaveDate || !leaveReason) return;
    const newReq = {
      id: leaveRequests.length + 1,
      date: new Date(leaveDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      category: leaveCategory, reason: leaveReason, status: "Pending",
    };
    setLeaveRequests((p) => [newReq, ...p]);
    setLeaveSubmitOk(true);
    setLeaveDate(""); setLeaveReason("");
    setTimeout(() => setLeaveSubmitOk(false), 4000);
  };

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  const handleNavClick = (label) => {
    setActivePage(label);
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  const unreadCount        = alertsList.filter((a) => !a.read).length;
  const pendingCount       = assignments.filter((a) => a.status === "Pending").length;
  const submittedCount     = assignments.filter((a) => a.status === "Submitted").length;
  const lateCount          = assignments.filter((a) => a.status === "Late").length;
  const unreadMsgCount     = Object.values(messages).flat().filter((m) => !m.read).length;
  const totalAnnouncements = Object.values(announcements).flat().length;

  // ── Section Renderers ─────────────────────────────────────────────────────

  // DASHBOARD
  const renderDashboard = () => (
    <div className="space-y-5">
      {/* KPI Cards */}
      <div>
        <h2 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-3">Overview</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <KPICard icon="✅" label="Attendance"          value={`${child.overallAttendance}%`} sub="Min 75% required"    bg="bg-green-50"  valColor="text-green-700" onClick={() => handleNavClick("Attendance")} />
          <KPICard icon="🎓" label="Current CGPA"        value={child.cgpa}                    sub={`Rank #${child.rank} in class`} bg="bg-indigo-50" valColor="text-indigo-700" onClick={() => handleNavClick("Academics")} />
          <KPICard icon="📝" label="Pending Assignments" value={pendingCount}                   sub="Due soon"           bg="bg-amber-50"  valColor="text-amber-700" onClick={() => handleNavClick("Assignments")} />
          <KPICard icon="📅" label="Upcoming Exams"      value={examTimetable.length}           sub="Starting July 20"  bg="bg-blue-50"   valColor="text-blue-700"  onClick={() => handleNavClick("Timetable")} />
          <KPICard icon="💳" label="Fee Due"             value="₹12,000"                       sub={`Due: ${fees.dueDate}`} bg="bg-red-50" valColor="text-red-600"   onClick={() => handleNavClick("Fees")} />
          <KPICard icon="🚌" label="Bus Status"          value="On Route"                       sub={`ETA: ${transport.eta}`} bg="bg-cyan-50" valColor="text-cyan-700" onClick={() => handleNavClick("Transport")} />
          <KPICard icon="📢" label="Announcements"       value={totalAnnouncements}             sub="Active notices"    bg="bg-purple-50" valColor="text-purple-700" onClick={() => handleNavClick("Announcements")} />
          <KPICard icon="🔔" label="Notifications"       value={unreadCount}                    sub="Unread alerts"     bg="bg-orange-50" valColor="text-orange-600" onClick={() => setActivePage("Notifications")} />
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
          <p className="font-bold text-gray-800 text-xs">Monthly Attendance Trend</p>
          <p className="text-[10px] text-gray-400 mb-3 mt-0.5">Attendance % per month (2026)</p>
          <BarChart data={monthlyAttendance} />
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
          <p className="font-bold text-gray-800 text-xs">Subject-wise Performance</p>
          <p className="text-[10px] text-gray-400 mb-3 mt-0.5">Internal Test 2 scores /50</p>
          <HorizBarChart data={internalMarks} />
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
          <p className="font-bold text-gray-800 text-xs">GPA Progression</p>
          <p className="text-[10px] text-gray-400 mb-3 mt-0.5">Semester-wise GPA trend</p>
          <LineChart data={semesterGpas} />
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
          <p className="font-bold text-gray-800 text-xs">Assignment Completion</p>
          <p className="text-[10px] text-gray-400 mb-3 mt-0.5">Submission status this semester</p>
          <div className="flex items-center gap-6 mt-2">
            <DonutChart pending={pendingCount} submitted={submittedCount} late={lateCount} />
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500 shrink-0" /><span className="text-gray-600">Submitted <strong>{submittedCount}</strong></span></div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-400 shrink-0" /><span className="text-gray-600">Pending <strong>{pendingCount}</strong></span></div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500 shrink-0"  /><span className="text-gray-600">Late <strong>{lateCount}</strong></span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Notifications + Student Snapshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-gray-50 pb-2">
            <p className="font-bold text-gray-800 text-xs">Recent Notifications</p>
            <button onClick={() => setActivePage("Notifications")} className="text-xs text-indigo-600 hover:underline">View All</button>
          </div>
          {alertsList.slice(0, 3).map((a) => (
            <div key={a.id} className="flex gap-2 text-xs">
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${a.dot}`} />
              <div>
                <p className="font-bold text-gray-700">{a.type}</p>
                <p className="text-gray-500 text-[11px] mt-0.5 line-clamp-2">{a.message}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
          <p className="font-bold text-gray-800 text-xs border-b border-gray-50 pb-2 mb-3">Student Overview</p>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-700 font-extrabold flex items-center justify-center text-sm shrink-0">{child.photo}</div>
            <div>
              <p className="font-bold text-gray-800 text-sm">{child.name}</p>
              <p className="text-[11px] text-indigo-600 font-semibold">{child.dept}</p>
              <p className="text-[10px] text-gray-400">{child.year} · {child.semester} · {child.section}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="bg-gray-50 rounded-lg p-2"><p className="text-[9px] text-gray-400 uppercase font-bold">Reg No</p><p className="font-semibold text-gray-700 truncate">{child.regNo}</p></div>
            <div className="bg-gray-50 rounded-lg p-2"><p className="text-[9px] text-gray-400 uppercase font-bold">Advisor</p><p className="font-semibold text-gray-700 truncate">{child.guide}</p></div>
          </div>
          <button onClick={() => handleNavClick("Student Profile")} className="w-full mt-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-2 rounded-lg transition">
            View Full Profile →
          </button>
        </div>
      </div>
    </div>
  );

  // STUDENT PROFILE
  const renderStudentProfile = () => (
    <div className="space-y-4">
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="flex flex-col items-center gap-2 shrink-0">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-100 to-indigo-200 text-indigo-700 font-extrabold flex items-center justify-center text-2xl shadow-inner border-2 border-indigo-200">{child.photo}</div>
            <Badge status="Active" />
          </div>
          <div className="flex-1 space-y-1">
            <h2 className="text-lg font-extrabold text-gray-900">{child.name}</h2>
            <p className="text-sm text-indigo-600 font-semibold">{child.dept}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
              {[
                { label: "Register Number", value: child.regNo },
                { label: "Roll Number",     value: child.rollNo },
                { label: "Year",            value: child.year },
                { label: "Semester",        value: child.semester },
                { label: "Section",         value: child.section },
                { label: "Academic Advisor",value: child.guide },
              ].map((f) => (
                <div key={f.label} className="bg-gray-50 rounded-xl p-3">
                  <p className="text-[9px] text-gray-400 uppercase font-bold tracking-wider">{f.label}</p>
                  <p className="text-xs font-semibold text-gray-700 mt-0.5">{f.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-3">
          <p className="font-bold text-gray-800 text-sm border-b border-gray-50 pb-2">Academic Summary</p>
          {[
            { label: "Current CGPA",        value: child.cgpa,              color: "text-indigo-600" },
            { label: "Overall Attendance",  value: `${child.overallAttendance}%`, color: "text-green-600" },
            { label: "Class Rank",          value: `#${child.rank}`,        color: "text-blue-600" },
            { label: "Fee Status",          value: child.feeStatus,         color: "text-red-500" },
            { label: "Transport",           value: child.busAssigned ? `Bus ${child.busNo || transport.busNo}` : "Not Assigned", color: "text-gray-700" },
          ].map((s) => (
            <div key={s.label} className="flex items-center justify-between text-xs bg-gray-50 rounded-lg px-3 py-2">
              <span className="text-gray-500">{s.label}</span>
              <span className={`font-bold ${s.color}`}>{s.value}</span>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-3">
          <p className="font-bold text-gray-800 text-sm border-b border-gray-50 pb-2">Parent / Guardian Information</p>
          {[
            { label: "Name",     value: parentInfo.name },
            { label: "Relation", value: parentInfo.relation },
            { label: "Phone",    value: parentInfo.phone },
            { label: "Email",    value: parentInfo.email },
            { label: "Address",  value: parentInfo.address },
          ].map((f) => (
            <div key={f.label} className="flex flex-col text-xs bg-gray-50 rounded-lg px-3 py-2">
              <span className="text-[9px] text-gray-400 uppercase font-bold tracking-wider">{f.label}</span>
              <span className="font-semibold text-gray-700 mt-0.5">{f.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold text-indigo-600">Academic Advisor</p>
          <p className="text-sm font-extrabold text-gray-800 mt-0.5">{child.guide}</p>
          <p className="text-[11px] text-indigo-500 mt-0.5">{child.guidePhone} · {child.guideEmail}</p>
        </div>
        <a href={`tel:${child.guidePhone}`} className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition text-center">
          📞 Call Advisor
        </a>
      </div>
    </div>
  );

  // ATTENDANCE
  const renderAttendance = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Overall %",        value: `${child.overallAttendance}%`, color: "text-green-700",  bg: "bg-green-50 border-green-100" },
          { label: "Classes Present",  value: "149",                         color: "text-indigo-700", bg: "bg-indigo-50 border-indigo-100" },
          { label: "Classes Absent",   value: "23",                          color: "text-red-600",    bg: "bg-red-50 border-red-100" },
          { label: "Subjects at Risk", value: "1",                           color: "text-amber-600",  bg: "bg-amber-50 border-amber-100" },
        ].map((c) => (
          <div key={c.label} className={`border rounded-2xl p-3 text-center ${c.bg}`}>
            <p className={`text-2xl font-extrabold ${c.color}`}>{c.value}</p>
            <p className="text-[10px] text-gray-500 mt-0.5">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-red-50 border border-red-100 rounded-xl p-3 flex items-start gap-2.5 text-xs">
        <span className="text-lg shrink-0">⚠️</span>
        <div>
          <p className="font-bold text-red-700">Low Attendance Alert</p>
          <p className="text-red-500 mt-0.5">Theory of Computation (CS8402) attendance is <strong>71.1%</strong> — below the mandatory 75%. This may affect exam eligibility. Immediate action required.</p>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-bold text-gray-800 text-sm">July 2026 — Attendance Calendar</p>
            <p className="text-[10px] text-gray-400 mt-0.5">Daily attendance record for the current month</p>
          </div>
          <button onClick={() => alert("Downloading attendance report...")} className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded-lg transition font-semibold">
            ⬇ Download Report
          </button>
        </div>
        <AttendanceCalendar />
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-3">
        <p className="font-bold text-gray-800 text-sm">Subject-wise Attendance</p>
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
                    <span className="block text-[10px] text-gray-400 font-normal mt-0.5">{row.code}</span>
                  </td>
                  <td className="p-3 text-center text-gray-500">{row.conducted} Hrs</td>
                  <td className="p-3 text-center text-gray-500">{row.attended} Hrs</td>
                  <td className="p-3 text-center">
                    <span className={`font-bold ${row.percent < 75 ? "text-red-500" : "text-green-600"}`}>{row.percent}%</span>
                    <div className="w-20 bg-gray-100 h-1.5 rounded-full mx-auto mt-1.5 overflow-hidden">
                      <div className={`h-full rounded-full ${row.percent < 75 ? "bg-red-400" : "bg-green-500"}`} style={{ width: `${row.percent}%` }} />
                    </div>
                  </td>
                  <td className="p-3 text-right"><Badge status={row.status === "Safe" ? "Safe" : "Critical"} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // ACADEMICS
  const renderAcademics = () => (
    <div className="space-y-4">
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-3">
        <div>
          <p className="font-bold text-gray-800 text-sm">Internal Test Performance</p>
          <p className="text-gray-400 text-xs mt-0.5">Continuous evaluation results — Current Semester</p>
        </div>
        <div className="overflow-x-auto border border-gray-100 rounded-xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50 text-gray-500 font-bold border-b border-gray-100">
                <th className="p-3">Subject</th>
                <th className="p-3 text-center">Test 1</th>
                <th className="p-3 text-center">Test 2</th>
                <th className="p-3 text-center">Assignment</th>
                <th className="p-3 text-center">Practical</th>
                <th className="p-3 text-right">Remark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {internalMarks.map((m, idx) => {
                const score = m.test2 || m.practical;
                const remark = m.test2 !== null
                  ? m.test2 >= 40 ? "Excellent" : m.test2 >= 30 ? "Average" : "Needs Work"
                  : "Good";
                const remarkColor = remark === "Excellent" ? "text-green-600" : remark === "Average" ? "text-amber-500" : remark === "Good" ? "text-indigo-600" : "text-red-500";
                return (
                  <tr key={idx} className="hover:bg-gray-50/50">
                    <td className="p-3 font-semibold text-gray-700">
                      {m.subject}
                      <span className="block text-[10px] text-gray-400 font-normal">{m.code}</span>
                    </td>
                    <td className="p-3 text-center text-gray-600 font-semibold">{m.test1 !== null ? `${m.test1}/50` : "—"}</td>
                    <td className="p-3 text-center text-gray-600 font-semibold">{m.test2 !== null ? `${m.test2}/50` : "—"}</td>
                    <td className="p-3 text-center text-indigo-600 font-bold">{m.assignment !== null ? `${m.assignment}/10` : "—"}</td>
                    <td className="p-3 text-center text-purple-600 font-bold">{m.practical !== null ? `${m.practical}/100` : "—"}</td>
                    <td className={`p-3 text-right text-[11px] font-bold ${remarkColor}`}>{remark}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-3">
          <div>
            <p className="font-bold text-gray-800 text-sm">End-Semester Grade Records</p>
            <p className="text-gray-400 text-xs mt-0.5">Completed semester results</p>
          </div>
          <div className="overflow-x-auto border border-gray-100 rounded-xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50 text-gray-500 font-bold border-b border-gray-100">
                  <th className="p-3">Semester</th>
                  <th className="p-3 text-center">Credits</th>
                  <th className="p-3 text-center">GPA</th>
                  <th className="p-3 text-center">Rank</th>
                  <th className="p-3 text-right">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {semesterGpas.map((g, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50">
                    <td className="p-3 font-semibold text-gray-700">{g.semester}</td>
                    <td className="p-3 text-center text-gray-500">{g.credits}</td>
                    <td className="p-3 text-center text-indigo-600 font-bold">{g.gpa}</td>
                    <td className="p-3 text-center text-gray-500">#{g.rank}</td>
                    <td className="p-3 text-right"><Badge status="Pass" /></td>
                  </tr>
                ))}
                <tr className="bg-indigo-50/50">
                  <td className="p-3 font-bold text-indigo-700" colSpan={2}>CGPA (Overall)</td>
                  <td className="p-3 text-center text-indigo-700 font-extrabold">{child.cgpa}</td>
                  <td className="p-3 text-center text-indigo-600 font-bold">#{child.rank}</td>
                  <td className="p-3 text-right"><span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-[10px] font-semibold border border-indigo-200">Overall</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <button onClick={() => alert("Downloading report card...")} className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition">
            ⬇ Download Report Card
          </button>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <p className="font-bold text-gray-800 text-sm mb-1">GPA Progression Chart</p>
          <p className="text-[10px] text-gray-400 mb-3">Semester-wise performance trend</p>
          <LineChart data={semesterGpas} height={120} />
        </div>
      </div>
    </div>
  );

  // ASSIGNMENTS
  const renderAssignments = () => {
    const tab = getTab("Assignments", "Pending");
    const filtered = tab === "All" ? assignments : assignments.filter((a) => a.status === tab);
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Pending",   count: pendingCount,   cls: "bg-amber-50 border-amber-100 text-amber-600" },
            { label: "Submitted", count: submittedCount, cls: "bg-green-50 border-green-100 text-green-600" },
            { label: "Late",      count: lateCount,      cls: "bg-red-50 border-red-100 text-red-600" },
          ].map((s) => (
            <div key={s.label} className={`border rounded-2xl p-3 text-center ${s.cls}`}>
              <p className="text-2xl font-extrabold">{s.count}</p>
              <p className="text-[10px] font-bold uppercase mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-100">
            {["Pending","Submitted","Late","All"].map((t) => (
              <button key={t} onClick={() => setTab("Assignments", t)}
                className={`flex-1 py-2.5 text-xs font-semibold transition-colors ${tab === t ? "bg-indigo-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}>
                {t}
              </button>
            ))}
          </div>
          <div className="p-4 space-y-3">
            {filtered.length === 0 && <div className="py-10 text-center text-xs text-gray-400">No {tab.toLowerCase()} assignments.</div>}
            {filtered.map((a) => (
              <div key={a.id} className="border border-gray-100 rounded-xl p-4 space-y-2 hover:border-indigo-100 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-bold text-gray-800 text-xs">{a.title}</p>
                    <p className="text-[11px] text-indigo-600 font-semibold mt-0.5">{a.subject}</p>
                  </div>
                  <Badge status={a.status} />
                </div>
                <div className="flex items-center gap-4 text-[11px] text-gray-500">
                  <span>📅 Due: {a.dueDate}</span>
                  {a.grade && <span className="font-bold text-indigo-600">Grade: {a.grade}</span>}
                </div>
                <p className="text-[11px] text-gray-500 bg-gray-50 rounded-lg px-3 py-2 italic">💬 {a.remarks}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // STUDY MATERIALS
  const renderStudyMaterials = () => {
    const tab = getTab("StudyMaterials", "Notes");
    const iconMap = { PDF: "📄", MP4: "🎬" };
    return (
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-100">
          {Object.keys(studyMaterials).map((t) => (
            <button key={t} onClick={() => setTab("StudyMaterials", t)}
              className={`flex-1 py-3 text-xs font-semibold transition-colors ${tab === t ? "bg-indigo-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}>
              {t}
            </button>
          ))}
        </div>
        <div className="p-4 space-y-3">
          {studyMaterials[tab].map((f, i) => (
            <div key={i} className="flex items-center gap-3 border border-gray-100 rounded-xl p-3 hover:border-indigo-100 hover:bg-indigo-50/20 transition-colors">
              <span className="text-2xl">{iconMap[f.type] || "📁"}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 text-xs truncate">{f.name}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{f.subject} · {f.size} · Uploaded {f.uploaded}</p>
              </div>
              <button onClick={() => alert(`Downloading: ${f.name}`)}
                className="shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg transition">
                ⬇ Download
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // TIMETABLE
  const renderTimetable = () => {
    const tab = getTab("Timetable", "Class");
    const subjectColors = {
      "DAA": "bg-indigo-50 text-indigo-700 border-indigo-100",
      "TOC": "bg-blue-50 text-blue-700 border-blue-100",
      "SE":  "bg-green-50 text-green-700 border-green-100",
      "DBMS":"bg-purple-50 text-purple-700 border-purple-100",
      "Lab": "bg-amber-50 text-amber-700 border-amber-100",
      "—":   "bg-gray-50 text-gray-400 border-gray-100",
    };
    const calendarEvents = [
      { date: "July 14–18",    event: "Revision & Study Period",          type: "study",    icon: "📖" },
      { date: "July 18",       event: "Parent-Teacher Meeting",           type: "event",    icon: "👥" },
      { date: "July 20–30",    event: "End-Semester Examinations",        type: "exam",     icon: "📝" },
      { date: "July 25",       event: "Annual Day Celebration",           type: "event",    icon: "🎉" },
      { date: "July 31–Aug 5", event: "Semester Break",                  type: "holiday",  icon: "🏖️" },
      { date: "August 6",      event: "New Semester Begins (Semester 5)", type: "academic", icon: "🎓" },
    ];
    const calColors = { study: "border-blue-200 bg-blue-50", event: "border-indigo-200 bg-indigo-50", exam: "border-red-200 bg-red-50", holiday: "border-green-200 bg-green-50", academic: "border-purple-200 bg-purple-50" };
    return (
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-100">
          {["Class","Exam","Calendar"].map((t) => (
            <button key={t} onClick={() => setTab("Timetable", t)}
              className={`flex-1 py-3 text-xs font-semibold transition-colors ${tab === t ? "bg-indigo-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}>
              {t} Timetable
            </button>
          ))}
        </div>
        <div className="p-4">
          {tab === "Class" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs min-w-[560px]">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 font-bold border-b border-gray-100">
                    <th className="p-2 text-[10px] w-12">Day</th>
                    {periods.map((p) => <th key={p} className="p-2 text-center text-[10px]">{p}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(classTimetable).map(([day, slots]) => (
                    <tr key={day} className="border-b border-gray-50 hover:bg-gray-50/50">
                      <td className="p-2 font-bold text-gray-700 text-xs">{day}</td>
                      {slots.map((s, i) => (
                        <td key={i} className="p-1.5 text-center">
                          <span className={`inline-block px-2 py-1 rounded-lg text-[10px] font-semibold border ${subjectColors[s] || "bg-gray-50 text-gray-400 border-gray-100"}`}>{s}</span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {tab === "Exam" && (
            <div className="space-y-3">
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 flex gap-2 text-xs">
                <span className="shrink-0">📢</span>
                <p className="text-amber-700 font-semibold">End-Semester Examinations begin July 20, 2026. Admit card is mandatory. Report 15 mins before exam time.</p>
              </div>
              <div className="overflow-x-auto border border-gray-100 rounded-xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 font-bold border-b border-gray-100">
                      <th className="p-3">Date</th>
                      <th className="p-3">Subject</th>
                      <th className="p-3 text-center">Time</th>
                      <th className="p-3 text-center">Hall</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {examTimetable.map((e, i) => (
                      <tr key={i} className="hover:bg-gray-50/50">
                        <td className="p-3">
                          <p className="font-bold text-gray-800">{e.date}</p>
                          <p className="text-[10px] text-gray-400">{e.day}</p>
                        </td>
                        <td className="p-3">
                          <p className="font-semibold text-gray-700">{e.subject}</p>
                          <p className="text-[10px] text-indigo-500">{e.code}</p>
                        </td>
                        <td className="p-3 text-center text-gray-600 font-semibold">{e.time}</td>
                        <td className="p-3 text-center">
                          <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full text-[10px] font-bold border border-indigo-100">{e.hall}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {tab === "Calendar" && (
            <div className="space-y-3">
              {calendarEvents.map((e, i) => (
                <div key={i} className={`flex items-center gap-3 border rounded-xl p-3 text-xs ${calColors[e.type] || "border-gray-200 bg-gray-50"}`}>
                  <span className="text-xl shrink-0">{e.icon}</span>
                  <div>
                    <p className="font-bold text-gray-800">{e.event}</p>
                    <p className="text-gray-500 mt-0.5">{e.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // FEES
  const renderFees = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm text-center">
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Total Fees</p>
          <p className="text-2xl font-extrabold text-gray-800 mt-1">₹{fees.total.toLocaleString()}</p>
          <p className="text-[10px] text-gray-400 mt-0.5">Academic Year 2025–26</p>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-2xl p-4 shadow-sm text-center">
          <p className="text-[10px] text-green-600 uppercase font-bold tracking-wider">Amount Paid</p>
          <p className="text-2xl font-extrabold text-green-700 mt-1">₹{fees.paid.toLocaleString()}</p>
          <div className="w-full bg-green-100 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-green-500 rounded-full" style={{ width: `${(fees.paid / fees.total) * 100}%` }} />
          </div>
          <p className="text-[10px] text-green-500 mt-1">{Math.round((fees.paid / fees.total) * 100)}% paid</p>
        </div>
        <div className="bg-red-50 border border-red-100 rounded-2xl p-4 shadow-sm text-center">
          <p className="text-[10px] text-red-500 uppercase font-bold tracking-wider">Outstanding Balance</p>
          <p className="text-2xl font-extrabold text-red-600 mt-1">₹{fees.outstanding.toLocaleString()}</p>
          <p className="text-[11px] text-red-400 mt-1 font-semibold">Due: {fees.dueDate}</p>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-3">
        <p className="font-bold text-gray-800 text-sm">Payment History</p>
        <div className="overflow-x-auto border border-gray-100 rounded-xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50 text-gray-500 font-bold border-b border-gray-100">
                <th className="p-3">Receipt No.</th>
                <th className="p-3">Date</th>
                <th className="p-3">Description</th>
                <th className="p-3 text-center">Amount</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {fees.history.map((f, i) => (
                <tr key={i} className="hover:bg-gray-50/50">
                  <td className="p-3 font-semibold text-gray-600 font-mono">{f.id}</td>
                  <td className="p-3 text-gray-500">{f.date}</td>
                  <td className="p-3 text-gray-700 font-medium">{f.desc}</td>
                  <td className="p-3 text-center font-bold text-gray-800">₹{f.amount.toLocaleString()}</td>
                  <td className="p-3 text-right"><Badge status={f.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => alert("Downloading receipts...")} className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-4 py-2 rounded-lg transition">
            ⬇ Download All Receipts
          </button>
          <button onClick={() => alert("Redirecting to payment gateway...")} className="bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition">
            💳 Pay Now — ₹{fees.outstanding.toLocaleString()}
          </button>
        </div>
      </div>
    </div>
  );

  // TRANSPORT
  const renderTransport = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-3">
          <p className="font-bold text-gray-800 text-sm">🚌 Bus Details</p>
          {[
            { label: "Bus Number",     value: transport.busNo },
            { label: "Route",          value: transport.route },
            { label: "Driver",         value: transport.driver },
            { label: "Driver Contact", value: transport.driverPhone },
            { label: "Morning Pickup", value: transport.pickup },
            { label: "Evening Drop",   value: transport.drop },
          ].map((f) => (
            <div key={f.label} className="flex items-center justify-between text-xs bg-gray-50 rounded-lg px-3 py-2">
              <span className="text-gray-500">{f.label}</span>
              <span className="font-semibold text-gray-700">{f.value}</span>
            </div>
          ))}
          <a href={`tel:${transport.driverPhone}`}
            className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-2 rounded-lg transition">
            📞 Call Driver
          </a>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-3">
          <p className="font-bold text-gray-800 text-sm">📍 Live Status</p>
          <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 border border-blue-100 rounded-xl h-32 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0">
              {[...Array(6)].map((_, i) => <div key={`h${i}`} className="border-b border-blue-100" style={{ height: "16.67%" }} />)}
            </div>
            <div className="text-center z-10">
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xl mx-auto" style={{ animation: "bounce 1.2s infinite" }}>🚌</div>
              <p className="text-xs font-bold text-indigo-700 mt-2">{transport.currentLocation}</p>
            </div>
          </div>
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 text-xs">
            <p className="font-bold text-indigo-700">ETA to College Gate</p>
            <p className="text-2xl font-extrabold text-indigo-800 mt-0.5">{transport.eta}</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-3">
        <p className="font-bold text-gray-800 text-sm">🗺️ Route & Stops</p>
        <div className="space-y-0">
          {transport.stops.map((s, i) => {
            const isCurrent = i === 2;
            const isPast    = i < 2;
            return (
              <div key={i} className="flex items-stretch gap-3 text-xs">
                <div className="flex flex-col items-center shrink-0 w-4">
                  <div className={`w-3 h-3 rounded-full border-2 mt-2 shrink-0 ${isCurrent ? "bg-indigo-600 border-indigo-600" : isPast ? "bg-green-500 border-green-500" : "bg-gray-200 border-gray-300"}`} />
                  {i < transport.stops.length - 1 && <div className={`flex-1 w-0.5 ${isPast ? "bg-green-400" : "bg-gray-200"}`} />}
                </div>
                <div className={`flex-1 flex items-center justify-between py-2 px-3 rounded-lg mb-1 ${isCurrent ? "bg-indigo-50 border border-indigo-100" : isPast ? "bg-green-50/50" : "bg-gray-50"}`}>
                  <span className={`font-semibold ${isCurrent ? "text-indigo-700" : "text-gray-700"}`}>{s.stop}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 font-medium">{s.time}</span>
                    {isCurrent && <span className="text-[9px] bg-indigo-600 text-white px-1.5 py-0.5 rounded-full font-bold">📍 Current</span>}
                    {isPast && <span className="text-[9px] bg-green-100 text-green-600 px-1.5 py-0.5 rounded-full font-bold">✓</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // ANNOUNCEMENTS
  const renderAnnouncements = () => {
    const tab   = getTab("Announcements", "College Notices");
    const items = announcements[tab] || [];
    return (
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex flex-wrap border-b border-gray-100">
          {Object.keys(announcements).map((t) => (
            <button key={t} onClick={() => setTab("Announcements", t)}
              className={`flex-1 min-w-fit py-2.5 px-3 text-[11px] font-semibold transition-colors ${tab === t ? "bg-indigo-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}>
              {t}
            </button>
          ))}
        </div>
        <div className="p-4 space-y-3">
          {items.map((item) => (
            <div key={item.id} className="border border-gray-100 rounded-xl p-4 space-y-2 hover:border-indigo-100 transition-colors">
              <div className="flex items-start gap-2 justify-between">
                <p className="font-bold text-gray-800 text-xs">{item.title}</p>
                <Badge status={item.importance} />
              </div>
              <p className="text-[10px] text-gray-400">📅 {item.date}</p>
              <p className="text-xs text-gray-600 leading-relaxed">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // MESSAGES
  const renderMessages = () => {
    const tab  = getTab("Messages", "Faculty");
    const msgs = messages[tab] || [];
    return (
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-100">
          {Object.keys(messages).map((t) => (
            <button key={t} onClick={() => setTab("Messages", t)}
              className={`flex-1 py-3 text-[11px] font-semibold transition-colors px-2 relative ${tab === t ? "bg-indigo-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}>
              {t}
              {messages[t].filter((m) => !m.read).length > 0 && (
                <span className={`ml-1 text-[9px] px-1.5 py-0.5 rounded-full font-bold ${tab === t ? "bg-white text-indigo-600" : "bg-red-500 text-white"}`}>
                  {messages[t].filter((m) => !m.read).length}
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="p-4 space-y-3">
          {msgs.map((msg) => (
            <div key={msg.id} className={`border rounded-xl p-4 space-y-2 ${!msg.read ? "border-indigo-200 bg-indigo-50/30" : "border-gray-100"}`}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0">{msg.from[0]}</div>
                  <div>
                    <p className="font-bold text-gray-800 text-xs">{msg.from}</p>
                    <p className="text-[10px] text-gray-400">{msg.date}</p>
                  </div>
                </div>
                {!msg.read && <span className="text-[9px] bg-indigo-600 text-white px-2 py-0.5 rounded-full font-bold shrink-0">NEW</span>}
              </div>
              <p className="text-[11px] font-bold text-gray-600">Subject: {msg.subject}</p>
              <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 rounded-lg p-3">{msg.body}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // LEAVE REQUEST
  const renderLeaveRequest = () => {
    const tab = getTab("Leave", "Apply");
    return (
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-100">
          {["Apply","Status & History"].map((t) => (
            <button key={t} onClick={() => setTab("Leave", t)}
              className={`flex-1 py-3 text-xs font-semibold transition-colors ${tab === t ? "bg-indigo-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}>
              {t}
            </button>
          ))}
        </div>
        <div className="p-5">
          {tab === "Apply" && (
            <div className="space-y-4 max-w-lg">
              <div>
                <p className="font-bold text-gray-800 text-sm">Apply Leave for {child.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">Requests are forwarded to the class advisor for approval. Read-only access — you cannot edit academic records.</p>
              </div>
              {leaveSubmitOk && (
                <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-xl text-xs font-semibold">
                  ✓ Leave request submitted to {child.guide} successfully. Status: Pending review.
                </div>
              )}
              <form onSubmit={handleLeaveSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 mb-1">Date of Absence</label>
                    <input type="date" required value={leaveDate} onChange={(e) => setLeaveDate(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 bg-gray-50 focus:outline-none focus:border-indigo-300" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 mb-1">Category</label>
                    <select value={leaveCategory} onChange={(e) => setLeaveCategory(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 bg-gray-50 focus:outline-none focus:border-indigo-300">
                      <option>Medical Leave</option>
                      <option>Personal Reason</option>
                      <option>Family Event</option>
                      <option>Emergency</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 mb-1">Reason for Leave</label>
                  <textarea required rows={3} value={leaveReason} onChange={(e) => setLeaveReason(e.target.value)}
                    placeholder="Describe the reason for the absence..."
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 bg-gray-50 focus:outline-none focus:border-indigo-300 resize-none" />
                </div>
                <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-5 py-2.5 rounded-lg transition">
                  📤 Submit Leave Request
                </button>
              </form>
            </div>
          )}
          {tab === "Status & History" && (
            <div className="space-y-3">
              <p className="font-bold text-gray-800 text-sm">Leave Request History</p>
              {leaveRequests.length === 0 && (
                <div className="py-10 text-center text-xs text-gray-400">No leave requests on record.</div>
              )}
              {leaveRequests.map((r) => (
                <div key={r.id} className="border border-gray-100 rounded-xl p-4 flex items-center justify-between gap-3 hover:border-indigo-100 transition-colors">
                  <div className="text-xs space-y-1">
                    <p className="font-bold text-gray-800">📅 {r.date}</p>
                    <p className="text-indigo-600 font-semibold">{r.category}</p>
                    <p className="text-gray-500">{r.reason}</p>
                  </div>
                  <Badge status={r.status} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // PROFILE
  const renderProfile = () => (
    <div className="space-y-4 max-w-2xl">
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
        <p className="font-bold text-gray-800 text-sm border-b border-gray-50 pb-2">Parent Profile</p>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-700 font-extrabold flex items-center justify-center text-xl border-2 border-indigo-200">
            {parentInfo.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <p className="font-bold text-gray-800">{parentInfo.name}</p>
            <p className="text-xs text-indigo-600 font-semibold">{parentInfo.relation} of {child.name}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{parentInfo.phone}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: "Full Name",     value: parentInfo.name },
            { label: "Relation",      value: parentInfo.relation },
            { label: "Mobile Number", value: parentInfo.phone },
            { label: "Email Address", value: parentInfo.email },
            { label: "Address",       value: parentInfo.address, full: true },
          ].map((f) => (
            <div key={f.label} className={f.full ? "sm:col-span-2" : ""}>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{f.label}</label>
              <div className="border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 bg-gray-50">{f.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-3">
        <p className="font-bold text-gray-800 text-sm border-b border-gray-50 pb-2">Linked Student</p>
        <div className="flex items-center gap-3 bg-indigo-50 border border-indigo-100 rounded-xl p-3">
          <div className="w-10 h-10 rounded-full bg-indigo-200 text-indigo-700 font-bold text-sm flex items-center justify-center shrink-0">{child.photo}</div>
          <div className="text-xs flex-1 min-w-0">
            <p className="font-bold text-gray-800">{child.name}</p>
            <p className="text-indigo-600 truncate">{child.dept} · {child.year}</p>
            <p className="text-gray-400">Reg: {child.regNo}</p>
          </div>
          <Badge status="Active" />
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-3">
        <p className="font-bold text-gray-800 text-sm border-b border-gray-50 pb-2">Change Password</p>
        <div className="space-y-3 max-w-sm">
          {["Current Password","New Password","Confirm New Password"].map((f) => (
            <div key={f}>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{f}</label>
              <input type="password" placeholder="••••••••" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs bg-gray-50 focus:outline-none focus:border-indigo-300" />
            </div>
          ))}
          <button onClick={() => alert("Password updated successfully!")} className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition">
            Update Password
          </button>
        </div>
      </div>
    </div>
  );

  // NOTIFICATIONS
  const renderNotifications = () => (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-50 pb-3">
        <div>
          <p className="font-bold text-gray-800 text-sm">Parent Notifications</p>
          <p className="text-gray-400 text-xs mt-0.5">{unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={handleMarkAllRead}
            className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-indigo-100 transition-colors">
            ✓ Mark all Read
          </button>
        )}
      </div>
      {alertsList.length === 0 ? (
        <div className="py-12 text-center flex flex-col items-center gap-2">
          <span className="text-3xl">📭</span>
          <p className="text-xs font-semibold text-gray-600">No active notifications</p>
        </div>
      ) : (
        <div className="space-y-3">
          {alertsList.map((a) => (
            <div key={a.id} className={`border rounded-xl p-4 flex gap-3.5 transition-all ${a.read ? "bg-white border-gray-100" : "bg-indigo-50/30 border-indigo-100"}`}>
              <span className="text-xl bg-gray-50 border border-gray-100 w-9 h-9 rounded-xl flex items-center justify-center shrink-0">🔔</span>
              <div className="flex-1 min-w-0 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-800">{a.type}</span>
                  <span className="text-[10px] text-gray-400">📅 {a.date}</span>
                </div>
                <p className="text-gray-600 text-xs leading-relaxed">{a.message}</p>
                <div className="flex justify-between items-center pt-1.5 border-t border-gray-50">
                  <span className="flex items-center gap-1.5 text-[10px] text-gray-400">
                    Priority: <span className={`w-1.5 h-1.5 rounded-full ${a.dot}`} /> <span className="font-semibold">{a.importance}</span>
                  </span>
                  <div className="flex gap-3">
                    {!a.read && (
                      <button onClick={() => handleMarkRead(a.id)} className="text-indigo-600 hover:text-indigo-700 font-semibold text-[11px]">Mark Read</button>
                    )}
                    <button onClick={() => handleDismiss(a.id)} className="text-red-500 hover:text-red-600 font-semibold text-[11px]">Dismiss</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Circulars + Staff Directory (existing components)
  const renderContent = () => {
    switch (activePage) {
      case "Dashboard":       return renderDashboard();
      case "Student Profile": return renderStudentProfile();
      case "Attendance":      return renderAttendance();
      case "Academics":       return renderAcademics();
      case "Assignments":     return renderAssignments();
      case "Study Materials": return renderStudyMaterials();
      case "Timetable":       return renderTimetable();
      case "Fees":            return renderFees();
      case "Transport":       return renderTransport();
      case "Announcements":   return renderAnnouncements();
      case "Messages":        return renderMessages();
      case "Leave Request":   return renderLeaveRequest();
      case "Profile":         return renderProfile();
      case "Notifications":   return renderNotifications();
      default:                return renderDashboard();
    }
  };

  // ── Layout ────────────────────────────────────────────────────────────────────
  return (
    <div className="flex h-screen bg-gray-50 font-sans text-sm overflow-hidden">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
      )}

      {/* Sidebar */}
      <aside className={[
        "fixed inset-y-0 left-0 z-30 w-60 flex flex-col bg-white border-r border-gray-200",
        "transition-transform duration-300 ease-in-out",
        sidebarOpen ? "translate-x-0" : "-translate-x-full",
        "md:static md:z-auto md:translate-x-0 md:flex-shrink-0",
        "overflow-y-auto overflow-x-hidden",
      ].join(" ")}>
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-4 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-sm shrink-0">P</div>
          <div className="min-w-0 flex-1">
            <p className="font-bold text-indigo-700 text-sm leading-tight">ParentConnect</p>
            <p className="text-gray-400 text-[10px] leading-tight">EERPS Monitoring Portal</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden ml-auto p-1 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors shrink-0" aria-label="Close sidebar">✕</button>
        </div>

        {/* Nav Groups */}
        <nav className="flex-1 py-2 overflow-y-auto">
          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="mb-1">
              <p className="px-4 pt-3 pb-1 text-[9px] font-extrabold text-gray-400 uppercase tracking-widest">{group.label}</p>
              {group.items.map((item) => {
                const isActive = activePage === item.label;
                const badge =
                  item.label === "Notifications" && unreadCount > 0 ? unreadCount :
                  item.label === "Messages"      && unreadMsgCount > 0 ? unreadMsgCount :
                  null;
                return (
                  <button key={item.label} onClick={() => handleNavClick(item.label)}
                    className={[
                      "w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors relative",
                      isActive ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-gray-600 hover:bg-gray-50",
                    ].join(" ")}>
                    {isActive && <span className="absolute right-0 top-0 h-full w-0.5 bg-indigo-600 rounded-l" />}
                    <span className="text-sm shrink-0">{item.icon}</span>
                    <span className="text-[13px] truncate">{item.label}</span>
                    {badge && (
                      <span className={`ml-auto text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold shrink-0 ${isActive ? "bg-indigo-600 text-white" : "bg-red-500 text-white"}`}>
                        {badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Child card at bottom */}
        <div className="p-3 border-t border-gray-100 shrink-0">
          <div className="bg-gray-50 rounded-xl p-2.5 flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 font-bold text-[11px] flex items-center justify-center shrink-0">{child.photo}</div>
            <div className="min-w-0">
              <p className="text-[9px] text-gray-400 uppercase font-bold tracking-wider">Monitoring</p>
              <p className="font-semibold text-gray-800 text-xs truncate">{child.name}</p>
              <p className="text-gray-400 text-[10px] truncate">{child.year} · {child.section}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0 w-full">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 flex items-center px-4 py-3 gap-3 shrink-0">
          <button onClick={() => setSidebarOpen((o) => !o)} className="text-gray-500 hover:text-gray-700 text-xl shrink-0 transition-colors md:hidden" aria-label="Toggle sidebar">☰</button>

          {/* Desktop menu toggle */}
          <button onClick={() => setSidebarOpen((o) => !o)} className="hidden md:flex text-gray-400 hover:text-gray-600 transition-colors shrink-0" aria-label="Toggle sidebar">
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="0" y1="1" x2="18" y2="1"/><line x1="0" y1="7" x2="18" y2="7"/><line x1="0" y1="13" x2="18" y2="13"/>
            </svg>
          </button>

          <span className="text-[13px] font-semibold text-gray-700 truncate flex items-center gap-1.5">
            <span>{ALL_NAV.find((n) => n.label === activePage)?.icon || "🏠"}</span>
            {activePage}
          </span>

          <div className="flex items-center gap-3 ml-auto shrink-0">
            <button onClick={() => setActivePage("Notifications")} className="relative hover:bg-gray-100 p-1.5 rounded-lg transition-colors" title="Notifications">
              <span className="text-xl text-gray-500">🔔</span>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{unreadCount}</span>
              )}
            </button>
            <div className="flex items-center gap-2 border-l border-gray-200 pl-3">
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs shrink-0">P</div>
              <div className="hidden sm:block leading-tight">
                <p className="font-semibold text-gray-700 text-xs">Hello, {parentInfo.name.split(" ")[0]}</p>
                <p className="text-[10px] text-gray-400">Ward: {child.name}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 pb-12">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
