import { useState } from "react";

// ── Data ──────────────────────────────────────────────────────────────────────

const internalExams = [
  { id: 1, label: "Internal Exam 1", mark: 13, total: 20, status: "done" },
  { id: 2, label: "Internal Exam 2", mark: null, total: 20, status: "upcoming" },
];

const phpRecord = {
  label: "PHP Record",
  submitStatus: "not_submitted", // "submitted" | "not_submitted"
};

const weekendExams = Array.from({ length: 20 }, (_, i) => {
  const week = i + 1;
  if (week === 1) return { week, mark: 12, total: 20, status: "done" };
  if (week === 2) return { week, mark: null, total: 20, status: "upcoming" };
  return { week, mark: null, total: 20, status: "upcoming" };
});

// ── Helpers ───────────────────────────────────────────────────────────────────

function percentage(mark, total) {
  return Math.round((mark / total) * 100);
}

function grade(pct) {
  if (pct >= 90) return { label: "A+", color: "#0f6e56" };
  if (pct >= 75) return { label: "A",  color: "#185FA5" };
  if (pct >= 60) return { label: "B",  color: "#ba7517" };
  if (pct >= 50) return { label: "C",  color: "#D85A30" };
  return { label: "F", color: "#a32d2d" };
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ScorePill({ mark, total }) {
  const pct = percentage(mark, total);
  const g = grade(pct);
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold"
      style={{ background: g.color + "18", color: g.color }}
    >
      {mark}/{total}
      <span className="opacity-70">·</span>
      {g.label}
    </span>
  );
}

function UpcomingBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-400">
      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 inline-block" />
      Upcoming
    </span>
  );
}

function MiniBar({ mark, total }) {
  const pct = percentage(mark, total);
  const g = grade(pct);
  return (
    <div className="flex items-center gap-2 mt-1.5">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: g.color }}
        />
      </div>
      <span className="text-[10px] text-gray-400 w-7 text-right">{pct}%</span>
    </div>
  );
}

// ── Section wrapper ───────────────────────────────────────────────────────────

function Section({ title, icon, children, badge }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
        <span className="text-base">{icon}</span>
        <h2 className="text-[13px] font-bold text-gray-700 flex-1">{title}</h2>
        {badge}
      </div>
      {children}
    </div>
  );
}

// ── Weekend Exam Grid ─────────────────────────────────────────────────────────

function WeekendExamGrid() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? weekendExams : weekendExams.slice(0, 8);
  const doneCount = weekendExams.filter((w) => w.status === "done").length;

  return (
    <Section
      title="Weekend Exams"
      icon="📅"
      badge={
        <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
          {doneCount}/{weekendExams.length} done
        </span>
      }
    >
      <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
        {visible.map((w) => (
          <div
            key={w.week}
            className={`rounded-xl border px-3 py-2.5 flex flex-col gap-0.5 ${
              w.status === "done"
                ? "border-gray-200 bg-white"
                : "border-dashed border-gray-200 bg-gray-50"
            }`}
          >
            <span className="text-[11px] font-semibold text-gray-500">
              Week {w.week}
            </span>
            {w.status === "done" ? (
              <>
                <ScorePill mark={w.mark} total={w.total} />
                <MiniBar mark={w.mark} total={w.total} />
              </>
            ) : (
              <span className="text-[11px] text-gray-300 font-medium mt-0.5">
                —
              </span>
            )}
          </div>
        ))}
      </div>

      {weekendExams.length > 8 && (
        <button
          onClick={() => setExpanded((e) => !e)}
          className="w-full py-2.5 text-[12px] font-semibold text-blue-600 hover:bg-blue-50 transition-colors border-t border-gray-100"
        >
          {expanded
            ? "Show less ↑"
            : `Show all ${weekendExams.length} weeks ↓`}
        </button>
      )}
    </Section>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function Results() {
  // Compute overall summary
  const completedInternals = internalExams.filter((e) => e.status === "done");
  const completedWeekends  = weekendExams.filter((w) => w.status === "done");

  const avgInternal =
    completedInternals.length > 0
      ? Math.round(
          completedInternals.reduce(
            (sum, e) => sum + percentage(e.mark, e.total),
            0
          ) / completedInternals.length
        )
      : null;

  const avgWeekend =
    completedWeekends.length > 0
      ? Math.round(
          completedWeekends.reduce(
            (sum, w) => sum + percentage(w.mark, w.total),
            0
          ) / completedWeekends.length
        )
      : null;

  return (
    <div className="p-4 md:p-6 space-y-4 max-w-3xl mx-auto">

      {/* ── Page header ── */}
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-bold text-gray-800">Results</h1>
        <span className="text-[11px] text-gray-400 font-medium bg-gray-100 px-2 py-0.5 rounded-full">
          CSE · Sem 4
        </span>
      </div>

      {/* ── Summary cards ── */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: "Internal avg",
            value: avgInternal != null ? `${avgInternal}%` : "—",
            sub:   avgInternal != null ? grade(avgInternal).label : "pending",
            color: avgInternal != null ? grade(avgInternal).color : "#b4b2a9",
          },
          {
            label: "Weekend avg",
            value: avgWeekend != null ? `${avgWeekend}%` : "—",
            sub:   avgWeekend != null ? grade(avgWeekend).label : "pending",
            color: avgWeekend != null ? grade(avgWeekend).color : "#b4b2a9",
          },
          {
            label: "Record",
            value: phpRecord.submitStatus === "submitted" ? "✓" : "✗",
            sub:   phpRecord.submitStatus === "submitted" ? "submitted" : "not submitted",
            color: phpRecord.submitStatus === "submitted" ? "#0f6e56" : "#a32d2d",
          },
        ].map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-2xl border border-gray-100 px-3 py-3 flex flex-col gap-0.5"
          >
            <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">
              {card.label}
            </span>
            <span
              className="text-xl font-bold"
              style={{ color: card.color }}
            >
              {card.value}
            </span>
            <span className="text-[10px] text-gray-400">{card.sub}</span>
          </div>
        ))}
      </div>

      {/* ── Internal Exams ── */}
      <Section title="Internal Exams" icon="📝">
        <div className="divide-y divide-gray-100">
          {internalExams.map((exam) => (
            <div
              key={exam.id}
              className="flex items-center justify-between px-4 py-3"
            >
              <div>
                <p className="text-[13px] font-semibold text-gray-700">
                  {exam.label}
                </p>
                {exam.status === "done" && (
                  <MiniBar mark={exam.mark} total={exam.total} />
                )}
              </div>
              {exam.status === "done" ? (
                <ScorePill mark={exam.mark} total={exam.total} />
              ) : (
                <UpcomingBadge />
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* ── PHP Record ── */}
      <Section title="Lab Records" icon="🧪">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <p className="text-[13px] font-semibold text-gray-700">
              {phpRecord.label}
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5">
              Submission required by faculty
            </p>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
              phpRecord.submitStatus === "submitted"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-600"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                phpRecord.submitStatus === "submitted"
                  ? "bg-green-500"
                  : "bg-red-400"
              }`}
            />
            {phpRecord.submitStatus === "submitted"
              ? "Submitted"
              : "Not submitted"}
          </span>
        </div>
      </Section>

      {/* ── Weekend Exams ── */}
      <WeekendExamGrid />

    </div>
  );
}
