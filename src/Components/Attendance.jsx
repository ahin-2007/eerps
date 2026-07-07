import { useState } from "react";

// ── Calendar months (from day order chart) ──────────────────────────────────
const MONTHS = [
  { year: 2026, month: 5, name: "June 2026",      workingDays: 11, progressive: 11  },
  { year: 2026, month: 6, name: "July 2026",      workingDays: 21, progressive: 32  },
  { year: 2026, month: 7, name: "August 2026",    workingDays: 17, progressive: 49  },
  { year: 2026, month: 8, name: "September 2026", workingDays: 23, progressive: 72  },
  { year: 2026, month: 9, name: "October 2026",   workingDays: 18, progressive: 90  },
];

const WEEK_DAYS = ["SUN","MON","TUE","WED","THU","FRI","SAT"];

// ── Working days from day-order calendar ────────────────────────────────────
const WORKING_DAYS = new Set([
  "2026-06-15","2026-06-16","2026-06-17","2026-06-18","2026-06-19",
  "2026-06-22","2026-06-23","2026-06-24","2026-06-25","2026-06-29","2026-06-30",
  "2026-07-01","2026-07-02","2026-07-06","2026-07-07","2026-07-08","2026-07-09","2026-07-10",
  "2026-07-13","2026-07-14","2026-07-16","2026-07-17","2026-07-20","2026-07-21",
  "2026-07-22","2026-07-23","2026-07-24","2026-07-27","2026-07-28","2026-07-29","2026-07-30","2026-07-31",
  "2026-08-03","2026-08-04","2026-08-05","2026-08-06","2026-08-07",
  "2026-08-10","2026-08-11","2026-08-12","2026-08-13","2026-08-14",
  "2026-08-17","2026-08-18","2026-08-19","2026-08-20","2026-08-21",
  "2026-08-24","2026-08-25","2026-08-31",
  "2026-09-01","2026-09-02","2026-09-03","2026-09-05","2026-09-07","2026-09-08","2026-09-09",
  "2026-09-10","2026-09-11","2026-09-15","2026-09-16","2026-09-17","2026-09-18","2026-09-19",
  "2026-09-21","2026-09-22","2026-09-23","2026-09-24","2026-09-25","2026-09-28","2026-09-29","2026-09-30",
  "2026-10-01","2026-10-03","2026-10-05","2026-10-06","2026-10-07","2026-10-08","2026-10-09","2026-10-10",
  "2026-10-12","2026-10-13","2026-10-14","2026-10-15","2026-10-16","2026-10-17",
  "2026-10-21","2026-10-22","2026-10-23","2026-10-24",
]);

const HOLIDAYS = {
  "2026-06-26": "Muharam",
  "2026-07-03": "St. Thomas Day",
  "2026-07-15": "Mar Ivanios Day",
  "2026-08-15": "Independence Day",
  "2026-08-26": "Milad un Nabi",
  "2026-08-27": "Onam Holiday",
  "2026-08-28": "Onam Holiday",
  "2026-08-29": "Onam Holiday",
  "2026-09-04": "Krishna Jayanthi",
  "2026-09-14": "Vinayagar Cathurthi",
  "2026-09-20": "Reunion Day",
  "2026-10-02": "Gandhi Jayanthi",
  "2026-10-19": "Ayutha Pooja",
  "2026-10-20": "Vijaya Dasami",
};

const EVENTS = {
  "2026-08-25": "I Internal Exam",
  "2026-09-05": "PTA Meeting",
  "2026-09-08": "II Internal Exam",
  "2026-09-22": "Model Practical Exam",
};

// ── Generate random attendance for each working day ──────────────────────────
// Status: "present" | "absent" | "od" (on duty) | "medical"
function generateAttendance() {
  const att = {};
  const today = new Date().toISOString().split("T")[0];
  WORKING_DAYS.forEach(dateKey => {
    if (dateKey > today) return; // future = no data
    const r = Math.random();
    att[dateKey] = r < 0.78 ? "present"
                 : r < 0.88 ? "absent"
                 : r < 0.94 ? "od"
                 : "medical";
  });
  return att;
}

const ATT = generateAttendance();

// ── Helpers ──────────────────────────────────────────────────────────────────
function padDate(y, m, d) {
  return `${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
}
function getDaysInMonth(y, m) { return new Date(y, m+1, 0).getDate(); }
function getFirstDay(y, m)    { return new Date(y, m, 1).getDay(); }

const STATUS_META = {
  present: { label: "Present",  color: "#16a34a", bg: "#f0fdf4", border: "#86efac", dot: "bg-green-500"  },
  absent:  { label: "Absent",   color: "#dc2626", bg: "#fef2f2", border: "#fca5a5", dot: "bg-red-500"    },
  od:      { label: "On Duty",  color: "#d97706", bg: "#fffbeb", border: "#fcd34d", dot: "bg-amber-400"  },
  medical: { label: "Medical",  color: "#7c3aed", bg: "#f5f3ff", border: "#c4b5fd", dot: "bg-violet-500" },
  holiday: { label: "Holiday",  color: "#0369a1", bg: "#eff6ff", border: "#bae6fd", dot: "bg-sky-400"    },
  future:  { label: "Upcoming", color: "#9ca3af", bg: "#f9fafb", border: "#e5e7eb", dot: "bg-gray-300"   },
};

function getStatusForDate(dateKey) {
  const today = new Date().toISOString().split("T")[0];
  if (HOLIDAYS[dateKey]) return "holiday";
  if (!WORKING_DAYS.has(dateKey)) return null; // Sunday or non-working non-holiday
  if (dateKey > today) return "future";
  return ATT[dateKey] || null;
}

// ── Summary calculation ───────────────────────────────────────────────────────
function computeSummary() {
  let present = 0, absent = 0, od = 0, medical = 0, total = 0;
  WORKING_DAYS.forEach(dk => {
    const s = ATT[dk];
    if (!s) return;
    total++;
    if (s === "present") present++;
    else if (s === "absent") absent++;
    else if (s === "od") od++;
    else if (s === "medical") medical++;
  });
  const attended = present + od + medical;
  const pct = total > 0 ? Math.round((attended / total) * 100) : 0;
  return { present, absent, od, medical, total, attended, pct };
}

const SUMMARY = computeSummary();
const REQUIRED = 75;

function classesNeeded(attended, total) {
  const n = Math.ceil((0.75 * total - attended) / 0.25);
  return n > 0 ? n : 0;
}
function canBunk(attended, total) {
  const n = Math.floor(attended / 0.75 - total);
  return n > 0 ? n : 0;
}

// ── Circular progress ─────────────────────────────────────────────────────────
function CircleProgress({ pct, size = 120 }) {
  const stroke = 10;
  const r      = (size - stroke) / 2;
  const circ   = 2 * Math.PI * r;
  const dash   = (pct / 100) * circ;
  const reqD   = (REQUIRED / 100) * circ;
  const color  = pct >= REQUIRED ? "#16a34a" : "#dc2626";

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#F1F0EC" strokeWidth={stroke} />
        {/* 75% required marker */}
        <circle cx={size/2} cy={size/2} r={r} fill="none"
          stroke="#fca5a5" strokeWidth={stroke + 2}
          strokeDasharray={`2 ${circ - 2}`}
          strokeDashoffset={-(reqD - 2)} />
        {/* Actual progress */}
        <circle cx={size/2} cy={size/2} r={r} fill="none"
          stroke={color} strokeWidth={stroke}
          strokeDasharray={`${dash} ${circ - dash}`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 0.8s ease" }} />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-black" style={{ color }}>{pct}%</span>
        <span className="text-[10px] font-semibold text-gray-400">Attendance</span>
      </div>
    </div>
  );
}

// ── Month bar chart (attended vs absent per month) ───────────────────────────
function MonthBarChart() {
  const data = MONTHS.map(m => {
    let present = 0, absent = 0, od = 0, medical = 0, total = 0;
    const days = getDaysInMonth(m.year, m.month);
    for (let d = 1; d <= days; d++) {
      const dk = padDate(m.year, m.month, d);
      const s  = ATT[dk];
      if (!s) continue;
      total++;
      if (s === "present") present++;
      else if (s === "absent") absent++;
      else if (s === "od") od++;
      else if (s === "medical") medical++;
    }
    const attended = present + od + medical;
    const pct = total > 0 ? Math.round((attended / total) * 100) : 0;
    return { name: m.name.split(" ")[0], attended, absent, total, pct };
  });

  const maxTotal = Math.max(...data.map(d => d.total), 1);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4">
      <p className="text-[13px] font-bold text-gray-700 mb-4">Monthly Attendance</p>
      <div className="flex items-end gap-3 h-32">
        {data.map((d, i) => {
          if (d.total === 0) return null;
          const totalH   = Math.round((d.total   / maxTotal) * 112);
          const attendH  = Math.round((d.attended / maxTotal) * 112);
          const color    = d.pct >= REQUIRED ? "#16a34a" : "#dc2626";
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[10px] font-bold" style={{ color }}>{d.pct}%</span>
              <div className="w-full relative flex items-end justify-center" style={{ height: totalH }}>
                {/* Total bar (background) */}
                <div className="absolute inset-x-0 bottom-0 rounded-t-lg"
                  style={{ height: totalH, background: "#F1F0EC" }} />
                {/* Attended bar */}
                <div className="absolute inset-x-0 bottom-0 rounded-t-lg transition-all duration-700"
                  style={{ height: attendH, background: color, opacity: 0.85 }} />
              </div>
              <span className="text-[9px] text-gray-400 font-medium">{d.name}</span>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-4 mt-3 flex-wrap">
        <span className="flex items-center gap-1.5 text-[10px] text-gray-500">
          <span className="w-3 h-3 rounded bg-green-500" />Attended
        </span>
        <span className="flex items-center gap-1.5 text-[10px] text-gray-500">
          <span className="w-3 h-3 rounded bg-gray-200" />Total working days
        </span>
        <span className="flex items-center gap-1.5 text-[10px] text-red-400">
          <span className="w-3 h-1 rounded bg-red-300" />75% required
        </span>
      </div>
    </div>
  );
}

// ── Day detail modal ──────────────────────────────────────────────────────────
function DayModal({ dateKey, onClose }) {
  if (!dateKey) return null;
  const parts   = dateKey.split("-");
  const dateObj = new Date(+parts[0], +parts[1]-1, +parts[2]);
  const label   = dateObj.toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric"
  });
  const status  = getStatusForDate(dateKey);
  const meta    = status ? STATUS_META[status] : null;
  const holiday = HOLIDAYS[dateKey];
  const event   = EVENTS[dateKey];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.45)" }}
      onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-xs shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="px-5 py-4 flex items-start justify-between"
          style={{ background: meta?.bg || "#f9fafb", borderBottom: `2px solid ${meta?.border || "#e5e7eb"}` }}>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide"
              style={{ color: meta?.color || "#9ca3af" }}>{label}</p>
            {holiday && <p className="text-base font-black text-gray-800 mt-0.5">{holiday}</p>}
            {event   && <p className="text-[11px] font-bold text-purple-600 mt-1">📌 {event}</p>}
          </div>
          <button onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:bg-black/10 text-lg ml-2 shrink-0">✕</button>
        </div>

        {/* Status */}
        <div className="p-5 flex flex-col items-center gap-3">
          {!meta ? (
            <p className="text-gray-400 text-sm">No data for this day.</p>
          ) : (
            <>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                style={{ background: meta.bg, border: `2px solid ${meta.border}` }}>
                {status === "present" ? "✅"
                 : status === "absent"  ? "❌"
                 : status === "od"      ? "🏷️"
                 : status === "medical" ? "🏥"
                 : status === "holiday" ? "🎉"
                 : "📅"}
              </div>
              <div className="text-center">
                <p className="text-lg font-black" style={{ color: meta.color }}>{meta.label}</p>
                {status === "future" && <p className="text-[11px] text-gray-400 mt-0.5">Not yet recorded</p>}
                {status === "od"     && <p className="text-[11px] text-amber-600 mt-0.5">Counted as present</p>}
                {status === "medical"&& <p className="text-[11px] text-violet-600 mt-0.5">Counted as present</p>}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Month calendar ─────────────────────────────────────────────────────────
function MonthCalendar({ monthInfo, onDayClick, selectedDate }) {
  const { year, month, name } = monthInfo;
  const totalDays = getDaysInMonth(year, month);
  const firstDay  = getFirstDay(year, month);
  const today     = new Date().toISOString().split("T")[0];
  const cells     = Array(firstDay).fill(null)
    .concat(Array.from({ length: totalDays }, (_, i) => i + 1));

  // Month stats
  let mPresent=0, mAbsent=0, mOd=0, mMedical=0, mTotal=0;
  for (let d = 1; d <= totalDays; d++) {
    const dk = padDate(year, month, d);
    const s  = ATT[dk];
    if (!s) continue;
    mTotal++;
    if (s==="present") mPresent++;
    else if (s==="absent") mAbsent++;
    else if (s==="od") mOd++;
    else if (s==="medical") mMedical++;
  }
  const mAtt = mPresent + mOd + mMedical;
  const mPct = mTotal > 0 ? Math.round((mAtt / mTotal) * 100) : 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Month header */}
      <div className="px-4 py-3 flex items-center justify-between bg-[#0f2340]">
        <h3 className="text-white font-bold text-sm">{name}</h3>
        {mTotal > 0 && (
          <span className={`text-xs font-black px-2 py-0.5 rounded-full ${mPct >= REQUIRED ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
            {mPct}%
          </span>
        )}
      </div>

      {/* Weekday labels */}
      <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-100">
        {WEEK_DAYS.map(d => (
          <div key={d} className={`py-1.5 text-center text-[9px] font-bold tracking-wide ${d==="SUN"?"text-red-400":"text-gray-400"}`}>{d}</div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-px bg-gray-100">
        {cells.map((day, idx) => {
          if (!day) return <div key={idx} className="bg-white" style={{ minHeight: 48 }} />;

          const dk      = padDate(year, month, day);
          const status  = getStatusForDate(dk);
          const isSun   = (idx % 7) === 0;
          const isToday = dk === today;
          const isSel   = dk === selectedDate;
          const holiday = HOLIDAYS[dk];
          const event   = EVENTS[dk];
          const meta    = status ? STATUS_META[status] : null;
          const clickable = !!status;

          return (
            <button
              key={idx}
              disabled={!clickable}
              onClick={() => clickable && onDayClick(dk)}
              className={`
                relative flex flex-col items-center justify-start pt-1.5 pb-1 px-0.5
                transition-all duration-150 bg-white
                ${clickable ? "cursor-pointer hover:z-10 hover:scale-110 hover:shadow-lg" : "cursor-default"}
                ${isSel ? "ring-2 ring-inset ring-blue-500 z-10" : ""}
              `}
              style={{
                minHeight: 48,
                background: meta ? meta.bg : "white",
              }}
            >
              {/* Today dot */}
              {isToday && (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-blue-600" />
              )}

              {/* Day number */}
              <span className={`text-[11px] font-bold leading-none ${
                isToday ? "text-blue-600" :
                status === "holiday" ? "text-sky-600" :
                status === "absent"  ? "text-red-500" :
                isSun   ? "text-red-400" : "text-gray-700"
              }`}>
                {day}
              </span>

              {/* Status indicator */}
              {meta && status !== "future" && (
                <span className={`mt-1 w-1.5 h-1.5 rounded-full ${meta.dot}`} />
              )}

              {/* Event pin */}
              {event && (
                <span className="mt-0.5 text-[8px] leading-none">📌</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Month mini stats */}
      {mTotal > 0 && (
        <div className="px-3 py-2 border-t border-gray-100 grid grid-cols-4 gap-1 text-center">
          {[
            { label: "P", value: mPresent, color: "text-green-600" },
            { label: "A", value: mAbsent,  color: "text-red-500"   },
            { label: "OD",value: mOd,      color: "text-amber-600" },
            { label: "M", value: mMedical, color: "text-violet-600"},
          ].map(s => (
            <div key={s.label}>
              <p className={`text-[12px] font-black ${s.color}`}>{s.value}</p>
              <p className="text-[9px] text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────
export default function Attendance() {
  const [selectedDate, setSelectedDate] = useState(null);

  const needed  = classesNeeded(SUMMARY.attended, SUMMARY.total);
  const canSkip = canBunk(SUMMARY.attended, SUMMARY.total);

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-4">

      {/* ── Header ── */}
      <div>
        <h1 className="text-lg font-bold text-gray-800">Attendance</h1>
        <p className="text-[11px] text-gray-400">
          Malankara Catholic College · Odd Semester 2026–27 · Tap any day to view status
        </p>
      </div>

      {/* ── Summary card ── */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <div className="flex flex-col sm:flex-row items-center gap-5">

          {/* Circle */}
          <CircleProgress pct={SUMMARY.pct} size={120} />

          {/* Stats */}
          <div className="flex-1 w-full space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { label: "Present",  value: SUMMARY.present,  color: "text-green-600",  icon: "✅" },
                { label: "Absent",   value: SUMMARY.absent,   color: "text-red-500",    icon: "❌" },
                { label: "On Duty",  value: SUMMARY.od,       color: "text-amber-600",  icon: "🏷️" },
                { label: "Medical",  value: SUMMARY.medical,  color: "text-violet-600", icon: "🏥" },
              ].map(s => (
                <div key={s.label} className="bg-gray-50 rounded-xl p-2.5 flex flex-col items-center">
                  <span className="text-base">{s.icon}</span>
                  <span className={`text-xl font-black ${s.color}`}>{s.value}</span>
                  <span className="text-[10px] text-gray-400">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div>
              <div className="flex justify-between text-[10px] mb-1.5">
                <span className="font-semibold text-gray-600">
                  {SUMMARY.attended} / {SUMMARY.total} days attended
                </span>
                <span className={SUMMARY.pct >= REQUIRED ? "text-green-600 font-bold" : "text-red-500 font-bold"}>
                  {SUMMARY.pct}%
                </span>
              </div>
              <div className="relative w-full h-3 rounded-full overflow-hidden bg-gray-100">
                <div className="absolute top-0 bottom-0 w-0.5 bg-red-400 z-10" style={{ left: `${REQUIRED}%` }} />
                <div className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${SUMMARY.pct}%`,
                    background: SUMMARY.pct >= REQUIRED ? "#16a34a" : "#dc2626",
                  }} />
              </div>
              <div className="flex justify-end mt-1">
                <span className="text-[9px] text-red-400 font-semibold">▲ 75% minimum</span>
              </div>
            </div>

            {/* Advice */}
            <div className={`rounded-xl px-3 py-2.5 flex items-center gap-3 ${
              SUMMARY.pct >= REQUIRED
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}>
              <span className="text-xl shrink-0">{SUMMARY.pct >= REQUIRED ? "🎉" : "⚠️"}</span>
              <p className={`text-[12px] font-semibold ${SUMMARY.pct >= REQUIRED ? "text-green-800" : "text-red-700"}`}>
                {SUMMARY.pct >= REQUIRED
                  ? <>You're safe! You can skip <strong>{canSkip}</strong> more day{canSkip !== 1 ? "s" : ""} and stay above 75%.</>
                  : <>Shortage! Attend <strong>{needed}</strong> consecutive day{needed !== 1 ? "s" : ""} to reach 75%.</>
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Legend ── */}
      <div className="flex gap-2 flex-wrap">
        {Object.entries(STATUS_META).filter(([k]) => k !== "future").map(([k, m]) => (
          <span key={k} className="flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full"
            style={{ background: m.bg, color: m.color, border: `1px solid ${m.border}` }}>
            <span className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />{m.label}
          </span>
        ))}
        <span className="flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-gray-50 text-gray-500 border border-gray-200">
          <span className="text-[10px]">📌</span>Event
        </span>
      </div>

      {/* ── Monthly bar chart ── */}
      <MonthBarChart />

      {/* ── Calendar grids ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {MONTHS.map(m => (
          <MonthCalendar
            key={m.name}
            monthInfo={m}
            onDayClick={setSelectedDate}
            selectedDate={selectedDate}
          />
        ))}
      </div>

      {/* ── Day modal ── */}
      {selectedDate && (
        <DayModal dateKey={selectedDate} onClose={() => setSelectedDate(null)} />
      )}
    </div>
  );
}