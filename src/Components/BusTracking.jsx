import { useState, useEffect, useRef } from "react";

const ROUTES = [
  {
    id: 1,
    label: "Marthandam → Kalikavelai",
    from: "Marthandam",
    to: "Kalikavelai",
    busNo: "TN74 AB 4567",
    driver: "Rajesh",
    phone: "+91 98765 43210",
    stops: [
      { name: "Marthandam", distance: 0, eta: "departed" },
      { name: "Thuckalay", distance: 4, eta: "5 min" },
      { name: "Kuzhithurai", distance: 9, eta: "12 min" },
      { name: "Kaliyakkavilai", distance: 14, eta: "19 min" },
      { name: "Eraniel", distance: 19, eta: "27 min" },
      { name: "Colachel", distance: 24, eta: "35 min" },
      { name: "Muttom", distance: 29, eta: "43 min" },
      { name: "Kalikavelai", distance: 34, eta: "50 min" },
    ],
    currentStopIndex: 1,
    progress: 14,
    speed: 42,
    capacity: 52,
    occupied: 38,
  },
  {
    id: 2,
    label: "Nagercoil → Kalikavelai",
    from: "Nagercoil",
    to: "Kalikavelai",
    busNo: "TN74 CD 8821",
    driver: "Murugan",
    phone: "+91 98765 11234",
    stops: [
      { name: "Nagercoil", distance: 0, eta: "departed" },
      { name: "Kottar", distance: 5, eta: "8 min" },
      { name: "Thuckalay", distance: 12, eta: "18 min" },
      { name: "Colachel", distance: 20, eta: "30 min" },
      { name: "Muttom", distance: 26, eta: "39 min" },
      { name: "Kalikavelai", distance: 32, eta: "48 min" },
    ],
    currentStopIndex: 2,
    progress: 37,
    speed: 55,
    capacity: 48,
    occupied: 41,
  },
  {
    id: 3,
    label: "Padmanabhapuram → Kalikavelai",
    from: "Padmanabhapuram",
    to: "Kalikavelai",
    busNo: "TN74 EF 3390",
    driver: "Selvam",
    phone: "+91 87654 99012",
    stops: [
      { name: "Padmanabhapuram", distance: 0, eta: "departed" },
      { name: "Thuckalay", distance: 7, eta: "10 min" },
      { name: "Kuzhithurai", distance: 13, eta: "20 min" },
      { name: "Colachel", distance: 20, eta: "31 min" },
      { name: "Kalikavelai", distance: 28, eta: "42 min" },
    ],
    currentStopIndex: 0,
    progress: 3,
    speed: 0,
    capacity: 44,
    occupied: 12,
  },
];

/* ── Stop timeline (horizontal scroll) ───────────────────── */
function RouteMap({ route }) {
  const { stops, currentStopIndex: current } = route;
  return (
    <div className="overflow-x-auto pb-1 -mx-1 px-1">
      <div
        className="flex items-start"
        style={{ minWidth: `${Math.max(stops.length * 72, 320)}px` }}
      >
        {stops.map((stop, i) => {
          const done = i < current;
          const cur = i === current;
          const last = i === stops.length - 1;
          return (
            <div key={stop.name} className="flex-1 flex flex-col items-center relative">
              {!last && (
                <div className="absolute top-[10px] left-1/2 w-full h-[3px] z-0">
                  <div className={`h-full transition-all duration-500 ${done || cur ? "bg-blue-500" : "bg-gray-200"}`} />
                </div>
              )}
              <div
                className={`relative z-10 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  cur
                    ? "bg-blue-600 border-blue-600 scale-125 ring-4 ring-blue-100"
                    : done
                    ? "bg-blue-500 border-blue-500"
                    : "bg-white border-gray-300"
                }`}
              >
                {cur && <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />}
                {done && (
                  <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div className="mt-1.5 text-center px-0.5">
                <p className={`text-[9px] font-semibold leading-tight ${cur ? "text-blue-700" : done ? "text-gray-400 line-through" : "text-gray-600"}`}>
                  {stop.name}
                </p>
                {!done && (
                  <p className={`text-[8px] mt-0.5 ${cur ? "text-blue-500 font-medium" : "text-gray-400"}`}>
                    {cur ? "Here" : stop.eta}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Speed gauge SVG ─────────────────────────────────────── */
function SpeedGauge({ speed, maxSpeed = 80 }) {
  const pct = Math.min(speed / maxSpeed, 1);
  const angle = -135 + pct * 270;
  const r = 34, cx = 50, cy = 46;
  const arc = (s, e, rad) => {
    const toRad = (d) => (d * Math.PI) / 180;
    const x1 = cx + rad * Math.cos(toRad(s)), y1 = cy + rad * Math.sin(toRad(s));
    const x2 = cx + rad * Math.cos(toRad(e)), y2 = cy + rad * Math.sin(toRad(e));
    return `M ${x1} ${y1} A ${rad} ${rad} 0 ${e - s > 180 ? 1 : 0} 1 ${x2} ${y2}`;
  };
  const nx = cx + (r - 7) * Math.cos((angle * Math.PI) / 180);
  const ny = cy + (r - 7) * Math.sin((angle * Math.PI) / 180);
  return (
    <svg viewBox="0 0 100 64" className="w-full h-full">
      <path d={arc(-135, 135, r)} fill="none" stroke="#e5e7eb" strokeWidth="5" strokeLinecap="round" />
      {speed > 0 && (
        <path d={arc(-135, -135 + pct * 270, r)} fill="none" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round" />
      )}
      <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="3.5" fill="#1d4ed8" />
      <text x={cx} y={cy + 13} textAnchor="middle" fontSize="10" fontWeight="700" fill="#1d4ed8">{speed}</text>
      <text x={cx} y={cy + 21} textAnchor="middle" fontSize="7" fill="#9ca3af">km/h</text>
    </svg>
  );
}

/* ── Main component ──────────────────────────────────────── */
export default function BusTracking() {
  const [selectedRouteId, setSelectedRouteId] = useState(1);
  const [liveProgress, setLiveProgress] = useState({});
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const intervalRef = useRef(null);

  const route = ROUTES.find((r) => r.id === selectedRouteId);
  const progress = liveProgress[selectedRouteId] ?? route.progress;
  const statusKey = route.currentStopIndex === 0 ? 0 : route.speed === 0 ? 0 : 1;
  const occupancyPct = Math.round((route.occupied / route.capacity) * 100);
  const nextStop = route.stops[route.currentStopIndex + 1] || route.stops[route.stops.length - 1];
  const timeStr = lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setLiveProgress((prev) => {
        const updated = { ...prev };
        ROUTES.forEach((r) => {
          const cur = prev[r.id] ?? r.progress;
          if (cur < 98) updated[r.id] = Math.min(cur + 0.05, 98);
        });
        return updated;
      });
      setLastUpdated(new Date());
    }, 800);
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
    setLastUpdated(new Date());
  };

  const occColor =
    occupancyPct > 80
      ? { bar: "bg-red-400", badge: "bg-red-100 text-red-700" }
      : occupancyPct > 60
      ? { bar: "bg-amber-400", badge: "bg-amber-100 text-amber-700" }
      : { bar: "bg-green-500", badge: "bg-green-100 text-green-700" };

  return (
    /* Outer wrapper — fits inside any parent, scrolls internally */
    <div className="w-full bg-gray-50 font-sans overflow-y-auto">

      {/* ── Header ── */}
      <div className="bg-white border-b border-gray-200 px-3 sm:px-5 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="1" y="6" width="22" height="12" rx="2" strokeWidth={2} />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 18v2M8 18v2M1 10h22" />
              <circle cx="8" cy="15" r="1.5" fill="currentColor" stroke="none" />
              <circle cx="16" cy="15" r="1.5" fill="currentColor" stroke="none" />
            </svg>
          </div>
          <div className="min-w-0">
            <h1 className="text-sm font-bold text-gray-800 leading-tight">Bus tracking</h1>
            <p className="text-[10px] text-gray-400 leading-tight hidden sm:block">Live college transport</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-gray-400">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            {timeStr}
          </div>
          <button
            onClick={handleRefresh}
            className={`p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all ${refreshing ? "opacity-50" : ""}`}
          >
            <svg className={`w-3.5 h-3.5 text-gray-500 ${refreshing ? "animate-spin" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      <div className="p-3 sm:p-4 space-y-3">

        {/* ── Route selector — horizontal scroll on mobile ── */}
        <div className="overflow-x-auto pb-1 -mx-3 px-3 sm:mx-0 sm:px-0">
          <div className="flex gap-2.5 sm:grid sm:grid-cols-3" style={{ minWidth: "max-content" }}>
            {ROUTES.map((r) => {
              const p = liveProgress[r.id] ?? r.progress;
              const isActive = r.id === selectedRouteId;
              const isBoarding = r.currentStopIndex === 0;
              return (
                <button
                  key={r.id}
                  onClick={() => setSelectedRouteId(r.id)}
                  className={`text-left p-3 rounded-xl border transition-all flex-shrink-0 w-44 sm:w-auto ${
                    isActive
                      ? "bg-blue-600 border-blue-600"
                      : "bg-white border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-1 ${
                      isActive
                        ? "bg-blue-500 text-blue-100"
                        : isBoarding
                        ? "bg-amber-100 text-amber-700"
                        : "bg-green-100 text-green-700"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${isBoarding ? "bg-amber-400" : "bg-green-500"}`} />
                      {isBoarding ? "Boarding" : "En route"}
                    </span>
                    <span className={`text-[9px] font-bold ${isActive ? "text-blue-200" : "text-gray-400"}`}>
                      {r.busNo.split(" ").slice(-2).join(" ")}
                    </span>
                  </div>
                  <p className={`text-xs font-bold leading-tight ${isActive ? "text-white" : "text-gray-700"}`}>{r.from}</p>
                  <p className={`text-[10px] mb-2 ${isActive ? "text-blue-200" : "text-gray-400"}`}>→ {r.to}</p>
                  <div className={`w-full h-1 rounded-full ${isActive ? "bg-blue-500" : "bg-gray-100"}`}>
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${isActive ? "bg-white" : "bg-blue-500"}`}
                      style={{ width: `${Math.round(p)}%` }}
                    />
                  </div>
                  <p className={`text-[9px] mt-1 font-medium ${isActive ? "text-blue-200" : "text-gray-400"}`}>
                    {Math.round(p)}% complete
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Route progress card ── */}
        <div className="bg-white rounded-xl border border-gray-100 p-3 sm:p-4">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="min-w-0">
              <p className="text-xs font-bold text-gray-800 truncate">{route.from} → {route.to}</p>
              <p className="text-[10px] text-gray-400">{route.stops.length} stops · Bus {route.busNo}</p>
            </div>
            <span className={`flex-shrink-0 flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full ${
              statusKey === 0 ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${statusKey === 0 ? "bg-amber-400" : "bg-green-500 animate-pulse"}`} />
              {statusKey === 0 ? "Boarding" : "En route"}
            </span>
          </div>

          {/* Progress bar */}
          <div className="mb-3">
            <div className="flex justify-between text-[10px] text-gray-400 mb-1">
              <span className="truncate mr-2">{route.from}</span>
              <span className="truncate text-right">{route.to}</span>
            </div>
            <div className="relative h-2.5 bg-gray-100 rounded-full overflow-visible">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.round(progress)}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-600 border-2 border-white rounded-full flex items-center justify-center transition-all duration-500 shadow-sm"
                style={{ left: `calc(${Math.round(progress)}% - 8px)` }}
              >
                <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
              </div>
            </div>
            <div className="flex justify-between text-[10px] mt-1">
              <span className="text-blue-600 font-semibold">{Math.round(progress)}% complete</span>
              <span className="text-gray-400">Next: {nextStop?.eta || "Arrived"}</span>
            </div>
          </div>

          {/* Stop map — always scrollable */}
          <RouteMap route={route} />
        </div>

        {/* ── Speed + Occupancy row ── */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl border border-gray-100 p-3">
            <p className="text-[10px] font-semibold text-gray-500 mb-1">Speed</p>
            <div className="h-16 sm:h-20">
              <SpeedGauge speed={route.speed} />
            </div>
            {route.speed === 0 && (
              <p className="text-center text-[9px] text-amber-600 font-medium mt-0.5 leading-tight">
                Stopped · {route.stops[route.currentStopIndex]?.name}
              </p>
            )}
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-[10px] font-semibold text-gray-500">Occupancy</p>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${occColor.badge}`}>
                  {occupancyPct}%
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-1.5">
                <div className={`h-full rounded-full transition-all ${occColor.bar}`} style={{ width: `${occupancyPct}%` }} />
              </div>
              <p className="text-[10px] text-gray-400">{route.occupied}/{route.capacity} seats</p>
            </div>

            <div className="mt-2 pt-2 border-t border-gray-50">
              <p className="text-[10px] font-semibold text-gray-500 mb-1">Bus no.</p>
              <p className="text-xs font-bold text-gray-700">{route.busNo}</p>
            </div>
          </div>
        </div>

        {/* ── Driver card ── */}
        <div className="bg-white rounded-xl border border-gray-100 p-3">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2.5">Driver</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-base">
              {route.driver.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-800 truncate">{route.driver}</p>
              <p className="text-[10px] text-gray-400">Bus driver</p>
            </div>
            <span className="flex-shrink-0 flex items-center gap-1 bg-green-50 text-green-700 text-[9px] font-bold px-2 py-1 rounded-full">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              On duty
            </span>
          </div>
          <a
            href={`tel:${route.phone}`}
            className="mt-3 flex items-center justify-center gap-2 w-full py-2 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-xs font-semibold rounded-xl transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
            </svg>
            Call {route.driver} · {route.phone}
          </a>
        </div>

        {/* ── Upcoming stops ── */}
        <div className="bg-white rounded-xl border border-gray-100 p-3">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Upcoming stops</p>
          <div className="space-y-0.5">
            {route.stops.slice(route.currentStopIndex).map((stop, i) => (
              <div
                key={stop.name}
                className={`flex items-center gap-2.5 py-2 px-2.5 rounded-lg ${i === 0 ? "bg-blue-50" : "hover:bg-gray-50"}`}
              >
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${i === 0 ? "bg-blue-600 ring-2 ring-blue-200" : "bg-gray-300"}`} />
                <span className={`text-xs font-semibold flex-1 min-w-0 truncate ${i === 0 ? "text-blue-700" : "text-gray-600"}`}>
                  {stop.name}
                </span>
                <span className={`text-[10px] flex-shrink-0 ${i === 0 ? "text-blue-500 font-semibold" : "text-gray-400"}`}>
                  {i === 0 ? "Current" : stop.eta}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Vehicle info ── */}
        <div className="bg-white rounded-xl border border-gray-100 p-3 mb-1">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Vehicle info</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-0">
            {[
              { label: "Bus number", value: route.busNo },
              { label: "Total stops", value: `${route.stops.length} stops` },
              { label: "Route", value: `${route.from} → ${route.to}` },
              { label: "Capacity", value: `${route.capacity} seats` },
            ].map(({ label, value }) => (
              <div key={label} className="py-2 border-b border-gray-50">
                <p className="text-[9px] text-gray-400 mb-0.5">{label}</p>
                <p className="text-[11px] font-semibold text-gray-700 truncate">{value}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}