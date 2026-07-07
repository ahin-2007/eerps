import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// FACULTY
// ─────────────────────────────────────────────────────────────────────────────
const FACULTY = {
  SS:  { name: "Dr. N. Suresh Singh",         color: "#185FA5" },
  MJ:  { name: "Dr. J.P. Medlin Julia",       color: "#0f6e56" },
  GV:  { name: "Mr. G. Borgia Crusu Venthan", color: "#854F0B" },
  PV:  { name: "Dr. S. Priya Vasanth",        color: "#993556" },
};

// ─────────────────────────────────────────────────────────────────────────────
// SUBJECT STYLES
// ─────────────────────────────────────────────────────────────────────────────
const SUBJECT_STYLE = {
  "ASP.NET LAB":  { bg: "#E6F1FB", border: "#185FA5", text: "#0C447C", icon: "🖥️" },
  "OS":           { bg: "#EAF3DE", border: "#3B6D11", text: "#27500A", icon: "⚙️" },
  ".NET":         { bg: "#EEEDFE", border: "#534AB7", text: "#3C3489", icon: "🔷" },
  "SPM":          { bg: "#FAEEDA", border: "#854F0B", text: "#633806", icon: "📋" },
  "AI":           { bg: "#FAECE7", border: "#993C1D", text: "#712B13", icon: "🤖" },
  "NM":           { bg: "#FBEAF0", border: "#993556", text: "#72243E", icon: "🔢" },
  "PROJECT LAB":  { bg: "#E1F5EE", border: "#0F6E56", text: "#085041", icon: "🗂️" },
};

// ─────────────────────────────────────────────────────────────────────────────
// TIMETABLE — Day Order I–VI, 5 periods each
// ─────────────────────────────────────────────────────────────────────────────
const TIMETABLE = {
  I:   [
    { subject: "ASP.NET LAB", faculty: ["PV","PV","MJ"], isLab: true, span: 3 },
    null, null,
    { subject: "OS",   faculty: ["SS"] },
    { subject: ".NET", faculty: ["PV"] },
  ],
  II:  [
    { subject: "SPM", faculty: ["GV"] },
    { subject: "OS",  faculty: ["SS"] },
    { subject: "NM",  faculty: ["GV"] },
    { subject: "AI",  faculty: ["MJ"] },
    { subject: "OS",  faculty: ["SS"] },
  ],
  III: [
    { subject: "AI",          faculty: ["MJ"] },
    { subject: "SPM",         faculty: ["GV"] },
    { subject: ".NET",        faculty: ["PV"] },
    { subject: "PROJECT LAB", faculty: ["MJ","PV"], isLab: true, span: 2 },
    null,
  ],
  IV:  [
    { subject: "PROJECT LAB", faculty: ["GV","MJ","SS"], isLab: true, span: 3 },
    null, null,
    { subject: ".NET", faculty: ["PV"] },
    { subject: "AI",   faculty: ["MJ"] },
  ],
  V:   [
    { subject: "AI",  faculty: ["MJ"] },
    { subject: ".NET",faculty: ["PV"] },
    { subject: "SPM", faculty: ["GV"] },
    { subject: "OS",  faculty: ["SS"] },
    { subject: "ASP.NET LAB", faculty: ["MJ","PV"], isLab: true, span: 2 },
  ],
  VI:  [
    { subject: ".NET",faculty: ["PV"] },
    { subject: "AI",  faculty: ["MJ"] },
    { subject: "OS",  faculty: ["SS"] },
    { subject: "NM",  faculty: ["MJ"] },
    { subject: "SPM", faculty: ["GV"] },
  ],
};

const TIME_SLOTS = [
  "8:45 – 9:35",
  "9:35 – 10:25",
  "10:25 – 11:15",
  "11:15 – 12:05",
  "12:05 – 12:55",
];

// ─────────────────────────────────────────────────────────────────────────────
// FULL CALENDAR DATA from Image 1
// ─────────────────────────────────────────────────────────────────────────────
const CALENDAR = {
  // JUNE 2026
  "2026-06-15": { dayOrder: "I"   },
  "2026-06-16": { dayOrder: "II"  },
  "2026-06-17": { dayOrder: "III" },
  "2026-06-18": { dayOrder: "IV"  },
  "2026-06-19": { dayOrder: "V"   },
  "2026-06-22": { dayOrder: "VI"  },
  "2026-06-23": { dayOrder: "I"   },
  "2026-06-24": { dayOrder: "II"  },
  "2026-06-25": { dayOrder: "III" },
  "2026-06-26": { holiday: true, holidayName: "Muharam" },
  "2026-06-29": { dayOrder: "IV"  },
  "2026-06-30": { dayOrder: "V"   },
  // JULY 2026
  "2026-07-01": { dayOrder: "VI"  },
  "2026-07-02": { dayOrder: "I"   },
  "2026-07-03": { holiday: true, holidayName: "St. Thomas Day" },
  "2026-07-06": { dayOrder: "II"  },
  "2026-07-07": { dayOrder: "III" },
  "2026-07-08": { dayOrder: "IV"  },
  "2026-07-09": { dayOrder: "V"   },
  "2026-07-10": { dayOrder: "VI"  },
  "2026-07-13": { dayOrder: "I"   },
  "2026-07-14": { dayOrder: "II"  },
  "2026-07-15": { holiday: true, holidayName: "Mar Ivanios Day" },
  "2026-07-16": { dayOrder: "III" },
  "2026-07-17": { dayOrder: "IV"  },
  "2026-07-20": { dayOrder: "V"   },
  "2026-07-21": { dayOrder: "VI"  },
  "2026-07-22": { dayOrder: "I"   },
  "2026-07-23": { dayOrder: "II"  },
  "2026-07-24": { dayOrder: "III" },
  "2026-07-27": { dayOrder: "IV"  },
  "2026-07-28": { dayOrder: "V"   },
  "2026-07-29": { dayOrder: "VI"  },
  "2026-07-30": { dayOrder: "I"   },
  "2026-07-31": { dayOrder: "II"  },
  // AUGUST 2026
  "2026-08-03": { dayOrder: "III" },
  "2026-08-04": { dayOrder: "IV"  },
  "2026-08-05": { dayOrder: "V"   },
  "2026-08-06": { dayOrder: "VI"  },
  "2026-08-07": { dayOrder: "I"   },
  "2026-08-10": { dayOrder: "II"  },
  "2026-08-11": { dayOrder: "III" },
  "2026-08-12": { dayOrder: "IV"  },
  "2026-08-13": { dayOrder: "V"   },
  "2026-08-14": { dayOrder: "VI"  },
  "2026-08-15": { holiday: true, holidayName: "Independence Day" },
  "2026-08-17": { dayOrder: "I"   },
  "2026-08-18": { dayOrder: "II"  },
  "2026-08-19": { dayOrder: "III" },
  "2026-08-20": { dayOrder: "IV"  },
  "2026-08-21": { dayOrder: "V"   },
  "2026-08-24": { dayOrder: "VI"  },
  "2026-08-25": { dayOrder: "I",  note: "I Internal Exam" },
  "2026-08-26": { holiday: true, holidayName: "Milad un Nabi" },
  "2026-08-27": { holiday: true, holidayName: "Onam Holiday" },
  "2026-08-28": { holiday: true, holidayName: "Onam Holiday" },
  "2026-08-29": { holiday: true, holidayName: "Onam Holiday" },
  "2026-08-31": { dayOrder: "II"  },
  // SEPTEMBER 2026
  "2026-09-01": { dayOrder: "III" },
  "2026-09-02": { dayOrder: "IV"  },
  "2026-09-03": { dayOrder: "V"   },
  "2026-09-04": { holiday: true, holidayName: "Krishna Jayanthi" },
  "2026-09-05": { dayOrder: "VI", note: "PTA Meeting" },
  "2026-09-07": { dayOrder: "I"   },
  "2026-09-08": { dayOrder: "II"  },
  "2026-09-09": { dayOrder: "III" },
  "2026-09-10": { dayOrder: "IV"  },
  "2026-09-11": { dayOrder: "V"   },
  "2026-09-14": { holiday: true, holidayName: "Vinayagar Cathurthi" },
  "2026-09-15": { dayOrder: "VI"  },
  "2026-09-16": { dayOrder: "I"   },
  "2026-09-17": { dayOrder: "II"  },
  "2026-09-18": { dayOrder: "III" },
  "2026-09-19": { dayOrder: "IV"  },
  "2026-09-20": { holiday: true, holidayName: "Reunion Day" },
  "2026-09-21": { dayOrder: "V"   },
  "2026-09-22": { dayOrder: "VI"  },
  "2026-09-23": { dayOrder: "I"   },
  "2026-09-24": { dayOrder: "II"  },
  "2026-09-25": { dayOrder: "III" },
  "2026-09-28": { dayOrder: "IV"  },
  "2026-09-29": { dayOrder: "V"   },
  "2026-09-30": { dayOrder: "VI"  },
  // OCTOBER 2026
  "2026-10-01": { dayOrder: "I"   },
  "2026-10-02": { holiday: true, holidayName: "Gandhi Jayanthi" },
  "2026-10-03": { dayOrder: "II"  },
  "2026-10-05": { dayOrder: "III" },
  "2026-10-06": { dayOrder: "IV"  },
  "2026-10-07": { dayOrder: "V"   },
  "2026-10-08": { dayOrder: "VI"  },
  "2026-10-09": { dayOrder: "I"   },
  "2026-10-10": { dayOrder: "II"  },
  "2026-10-12": { dayOrder: "III" },
  "2026-10-13": { dayOrder: "IV"  },
  "2026-10-14": { dayOrder: "V"   },
  "2026-10-15": { dayOrder: "VI"  },
  "2026-10-16": { dayOrder: "I"   },
  "2026-10-17": { dayOrder: "II"  },
  "2026-10-19": { holiday: true, holidayName: "Ayutha Pooja" },
  "2026-10-20": { holiday: true, holidayName: "Vijaya Dasami" },
  "2026-10-21": { dayOrder: "III" },
  "2026-10-22": { dayOrder: "IV"  },
  "2026-10-23": { dayOrder: "V"   },
  "2026-10-24": { dayOrder: "VI"  },
};

const MONTHS = [
  { year: 2026, month: 5,  name: "June 2026",      workingDays: 11, progressive: 11  },
  { year: 2026, month: 6,  name: "July 2026",      workingDays: 21, progressive: 32  },
  { year: 2026, month: 7,  name: "August 2026",    workingDays: 17, progressive: 49  },
  { year: 2026, month: 8,  name: "September 2026", workingDays: 23, progressive: 72  },
  { year: 2026, month: 9,  name: "October 2026",   workingDays: 18, progressive: 90  },
];

const WEEK_DAYS = ["SUN","MON","TUE","WED","THU","FRI","SAT"];

const DAY_ORDER_COLORS = {
  I:   { bg: "#E6F1FB", border: "#185FA5", text: "#0C447C" },
  II:  { bg: "#EAF3DE", border: "#3B6D11", text: "#27500A" },
  III: { bg: "#EEEDFE", border: "#534AB7", text: "#3C3489" },
  IV:  { bg: "#FAEEDA", border: "#854F0B", text: "#633806" },
  V:   { bg: "#FAECE7", border: "#993C1D", text: "#712B13" },
  VI:  { bg: "#E1F5EE", border: "#0F6E56", text: "#085041" },
};

function padDate(y, m, d) {
  return `${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
}
function getDaysInMonth(y, m) { return new Date(y, m+1, 0).getDate(); }
function getFirstDay(y, m)    { return new Date(y, m, 1).getDay(); }

// ─────────────────────────────────────────────────────────────────────────────
// SCHEDULE MODAL
// ─────────────────────────────────────────────────────────────────────────────
function SchedulePanel({ dateKey, onClose }) {
  const info = CALENDAR[dateKey];
  const parts = dateKey.split("-");
  const dateObj = new Date(+parts[0], +parts[1]-1, +parts[2]);
  const dateLabel = dateObj.toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}>

        {info?.holiday ? (
          <>
            <div className="px-5 py-4 flex items-center justify-between bg-amber-50 border-b-2 border-amber-300">
              <div>
                <p className="text-[11px] text-amber-600 font-semibold uppercase tracking-wide">{dateLabel}</p>
                <h2 className="text-lg font-black text-amber-800 mt-0.5">{info.holidayName}</h2>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-lg hover:bg-amber-200 transition-colors">✕</button>
            </div>
            <div className="p-6 flex flex-col items-center gap-2 text-center">
              <span className="text-5xl">🎉</span>
              <p className="text-gray-500 text-sm">College holiday — no classes today.</p>
            </div>
          </>
        ) : info?.dayOrder ? (() => {
          const do_ = info.dayOrder;
          const c   = DAY_ORDER_COLORS[do_];
          const ps  = TIMETABLE[do_];
          return (
            <>
              {/* Header */}
              <div className="px-5 py-4 flex items-center justify-between shrink-0"
                style={{ background: c.bg, borderBottom: `2px solid ${c.border}` }}>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: c.border }}>{dateLabel}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xl font-black" style={{ color: c.text }}>Day Order {do_}</span>
                    {info.note && (
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: c.border }}>
                        {info.note}
                      </span>
                    )}
                  </div>
                </div>
                <button onClick={onClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/10 text-gray-500 transition-colors text-lg">✕</button>
              </div>

              {/* Periods */}
              <div className="overflow-y-auto flex-1 p-4 space-y-2">
                {ps.map((p, i) => {
                  if (p === null) return null;
                  const s = SUBJECT_STYLE[p.subject];
                  return (
                    <div key={i} className="flex items-stretch gap-0 rounded-xl border border-gray-100 overflow-hidden hover:shadow-sm transition-shadow">
                      {/* Period + time */}
                      <div className="flex flex-col items-center justify-center px-3 py-3 shrink-0 w-16 text-center"
                        style={{ background: s.bg }}>
                        <span className="text-[11px] font-black" style={{ color: s.text }}>P{i+1}</span>
                        <span className="text-[8px] leading-tight mt-1" style={{ color: s.border }}>
                          {TIME_SLOTS[i].replace("–", "–\n")}
                        </span>
                      </div>

                      {/* Subject + faculty */}
                      <div className="flex-1 py-3 px-3 border-l" style={{ borderColor: s.border + "40" }}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">{s.icon}</span>
                          <span className="text-[13px] font-bold" style={{ color: s.text }}>{p.subject}</span>
                          {p.isLab && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white ml-auto"
                              style={{ background: s.border }}>
                              LAB · {p.span}P
                            </span>
                          )}
                        </div>
                        <div className="space-y-1.5">
                          {[...new Set(p.faculty)].map(f => (
                            <div key={f} className="flex items-center gap-2">
                              <span className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black text-white shrink-0"
                                style={{ background: FACULTY[f]?.color || "#888" }}>
                                {f}
                              </span>
                              <span className="text-[12px] text-gray-700 font-medium">{FACULTY[f]?.name || f}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 shrink-0">
                <p className="text-[10px] text-gray-400 text-center">Dept. of Computer Applications · Malankara Catholic College · Odd Sem 2026–27</p>
              </div>
            </>
          );
        })() : (
          <>
            <div className="px-5 py-4 flex items-center justify-between border-b border-gray-100">
              <p className="text-sm text-gray-600">{dateLabel}</p>
              <button onClick={onClose} className="text-gray-400 text-lg">✕</button>
            </div>
            <div className="p-6 text-center text-gray-400 text-sm">No schedule assigned for this day.</div>
          </>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MONTH CALENDAR
// ─────────────────────────────────────────────────────────────────────────────
function MonthCalendar({ monthInfo, onDayClick, selectedDate, today }) {
  const { year, month, name, workingDays, progressive } = monthInfo;
  const totalDays = getDaysInMonth(year, month);
  const firstDay  = getFirstDay(year, month);
  const cells     = Array(firstDay).fill(null).concat(Array.from({ length: totalDays }, (_, i) => i + 1));

  const holidays = [];
  for (let d = 1; d <= totalDays; d++) {
    const k = padDate(year, month, d);
    if (CALENDAR[k]?.holiday) holidays.push({ day: d, name: CALENDAR[k].holidayName });
    if (CALENDAR[k]?.note)    holidays.push({ day: d, name: CALENDAR[k].note, isNote: true });
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Month header */}
      <div className="bg-[#0f2340] px-4 py-3 flex items-center justify-between">
        <h3 className="text-white font-bold text-sm tracking-wide">{name}</h3>
        <div className="flex gap-4">
          <div className="text-right">
            <p className="text-[9px] text-blue-300 uppercase tracking-wide">Working days</p>
            <p className="text-white text-sm font-bold">{workingDays}</p>
          </div>
          <div className="w-px bg-blue-800" />
          <div className="text-right">
            <p className="text-[9px] text-blue-300 uppercase tracking-wide">Progressive</p>
            <p className="text-white text-sm font-bold">{progressive}</p>
          </div>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-100">
        {WEEK_DAYS.map(d => (
          <div key={d} className={`py-2 text-center text-[9px] font-bold tracking-wide ${d==="SUN"?"text-red-400":"text-gray-400"}`}>
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-px bg-gray-100">
        {cells.map((day, idx) => {
          if (!day) return <div key={idx} className="bg-white" style={{ minHeight: 52 }} />;

          const dateKey  = padDate(year, month, day);
          const info     = CALENDAR[dateKey];
          const isToday  = dateKey === today;
          const isSun    = (idx % 7) === 0;
          const isSel    = dateKey === selectedDate;
          const hasOrder = info?.dayOrder;
          const isHol    = info?.holiday;
          const clickable= !!(info && (isHol || hasOrder));
          const doColor  = hasOrder ? DAY_ORDER_COLORS[hasOrder] : null;

          return (
            <button
              key={idx}
              disabled={!clickable}
              onClick={() => clickable && onDayClick(dateKey)}
              className={`
                relative flex flex-col items-center justify-start pt-1.5 pb-1 px-1
                bg-white transition-all duration-150
                ${clickable ? "cursor-pointer hover:z-10 hover:shadow-lg hover:scale-110" : "cursor-default"}
                ${isSel ? "ring-2 ring-inset ring-blue-600 z-10 scale-105" : ""}
              `}
              style={{
                minHeight: 52,
                background: isHol ? "#FFFBEB" : isSel && doColor ? doColor.bg : "white",
              }}
            >
              {/* Today indicator */}
              {isToday && (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-blue-600" />
              )}

              {/* Day number */}
              <span className={`text-[11px] md:text-[12px] font-bold leading-none ${
                isToday ? "text-blue-600" :
                isHol   ? "text-amber-600" :
                isSun   ? "text-red-400"   : "text-gray-700"
              }`}>
                {day}
              </span>

              {/* Day Order badge */}
              {hasOrder && (
                <span className="mt-1 text-[8px] md:text-[9px] font-black px-1 py-0.5 rounded leading-none text-white"
                  style={{ background: doColor.border }}>
                  {hasOrder}
                </span>
              )}

              {/* Holiday dot */}
              {isHol && <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-400" />}

              {/* Note dot */}
              {info?.note && <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-purple-500" />}
            </button>
          );
        })}
      </div>

      {/* Holidays / notes footer */}
      {holidays.length > 0 && (
        <div className="px-3 py-2 border-t border-gray-100 flex flex-wrap gap-x-4 gap-y-1">
          {holidays.map((h, i) => (
            <span key={i} className="flex items-center gap-1 text-[10px] text-gray-500">
              <span className={`w-1.5 h-1.5 rounded-full ${h.isNote ? "bg-purple-500" : "bg-amber-400"}`} />
              <span className="font-semibold">{h.day}</span> – {h.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────
export default function Timetable() {
  const [selectedDate, setSelectedDate] = useState(null);
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-4">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <h1 className="text-lg font-bold text-gray-800">Day Order Calendar</h1>
          <p className="text-[11px] text-gray-400">
            Malankara Catholic College · Odd Semester 2026–27 · Tap any working day to see your schedule
          </p>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-gray-500 flex-wrap">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#185FA5]" />Day order</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400" />Holiday</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-500" />Event</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-600" />Today</span>
        </div>
      </div>

      {/* Day Order colour key */}
      <div className="flex gap-1.5 flex-wrap">
        {Object.entries(DAY_ORDER_COLORS).map(([d, c]) => (
          <span key={d} className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-lg"
            style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}>
            Day {d}
          </span>
        ))}
      </div>

      {/* Month grids */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {MONTHS.map(m => (
          <MonthCalendar
            key={m.name}
            monthInfo={m}
            onDayClick={setSelectedDate}
            selectedDate={selectedDate}
            today={today}
          />
        ))}
      </div>

      {/* Modal */}
      {selectedDate && (
        <SchedulePanel dateKey={selectedDate} onClose={() => setSelectedDate(null)} />
      )}
    </div>
  );
}