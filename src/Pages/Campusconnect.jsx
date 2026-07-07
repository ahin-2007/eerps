import { useState, useEffect } from "react";
import Dashboard from "../Components/Dashboard";
import BusTracking from "../Components/BusTracking";
import AboutCollege from "../Components/AboutCollege";
import Results from "../Components/Results";
import Timetable from "../Components/Timetable";
import Attendance from "../Components/Attendance";


const navItems = [
  { label: "Dashboard",    icon: "🏠" },
  { label: "AboutCollege", icon: "🏛️" },
  { label: "BusTracking",  icon: "🚌" },
  { label: "Results",      icon: "📄" },
  { label: "Timetable",    icon: "📅" },
  { label: "Attendance",   icon: "✅" },
  { label: "Notes",        icon: "📚" },
  { label: "NoticeBoard",  icon: "📢" },
  { label: "Placement",    icon: "💼" },
  { label: "Gallery",      icon: "🖼️" },
  { label: "ContactUs",    icon: "📞" },
];

// First 5 items appear in the mobile bottom tab bar
const bottomNavItems = navItems.slice(0, 5);

const COMPONENT_MAP = {
  Dashboard:    <Dashboard />,
  BusTracking:  <BusTracking />,
  AboutCollege: <AboutCollege />,
  Results:<Results/>,
  Timetable:<Timetable/>,
  Attendance:<Attendance/>
};

export default function CampusConnect() {
  const [activePage, setActivePage]   = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen]   = useState(false);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  const handleNavClick = (label) => {
    setActivePage(label);
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  const activeComponent = COMPONENT_MAP[activePage] ?? (
    <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-400 py-24">
      <span className="text-5xl">
        {navItems.find((n) => n.label === activePage)?.icon}
      </span>
      <p className="text-base font-semibold text-gray-500">{activePage}</p>
      <p className="text-sm">This page is coming soon.</p>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100 font-sans text-sm overflow-hidden">

      {/* ── Mobile backdrop ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Sidebar ──
          Mobile : fixed overlay drawer, slides in/out via translate
          Desktop: static always-visible panel at w-56
      ── */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-30 w-64 flex flex-col
          bg-white border-r border-gray-200
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:static md:z-auto md:w-56 md:translate-x-0 md:flex-shrink-0
          overflow-y-auto overflow-x-hidden
        `}
      >
        <div className="w-64 md:w-56 flex flex-col h-full">

          {/* Logo + mobile close */}
          <div className="flex items-center gap-2.5 px-4 py-4 border-b border-gray-100 flex-shrink-0">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white text-lg font-bold shadow-sm flex-shrink-0">
              C
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-blue-700 text-sm leading-tight">CampusConnect</p>
              <p className="text-gray-400 text-[10px] leading-tight">Everything Students Need</p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden ml-auto p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors flex-shrink-0"
              aria-label="Close sidebar"
            >
              ✕
            </button>
          </div>

          {/* Nav items */}
          <nav className="flex-1 py-2 overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.label)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors relative ${
                  activePage === item.label
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {activePage === item.label && (
                  <span className="absolute right-0 top-0 h-full w-0.5 bg-blue-600 rounded-l" />
                )}
                <span className="text-base flex-shrink-0">{item.icon}</span>
                <span className="text-[13px]">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Help widget */}
          <div className="p-3 border-t border-gray-100 flex-shrink-0">
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2.5">
              <span className="text-gray-400 text-lg flex-shrink-0">🎧</span>
              <div className="min-w-0">
                <p className="font-medium text-gray-700 text-[12px]">Need Help?</p>
                <p className="text-gray-400 text-[10px]">We are here to help you</p>
              </div>
            </div>
          </div>

        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0 w-full">

        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 flex items-center px-4 py-3 gap-3 flex-shrink-0">
          {/* Hamburger — always visible, opens drawer */}
          <button
            onClick={() => setSidebarOpen((o) => !o)}
            className="text-gray-500 hover:text-gray-700 text-xl flex-shrink-0 transition-colors"
            aria-label="Toggle sidebar"
          >
            ☰
          </button>

          {/* Search bar — hidden on mobile, shown on md+ */}
          <div className="hidden md:block flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full pl-4 pr-9 py-2 border border-gray-200 rounded-full text-[13px] bg-gray-50 focus:outline-none focus:border-blue-400 focus:bg-white transition"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              🔍
            </span>
          </div>

          {/* Mobile: search icon button */}
          <button
            onClick={() => setSearchOpen((o) => !o)}
            className="md:hidden text-xl text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Search"
          >
            🔍
          </button>

          {/* Breadcrumb */}
          <span className="hidden md:block text-[12px] text-gray-400 font-medium flex-shrink-0">
            {navItems.find((n) => n.label === activePage)?.icon}{" "}
            <span className="text-gray-600">{activePage}</span>
          </span>

          {/* Mobile: page title */}
          <span className="md:hidden flex-1 text-[13px] font-semibold text-gray-700 truncate">
            {navItems.find((n) => n.label === activePage)?.icon} {activePage}
          </span>

          <div className="flex items-center gap-3 ml-auto flex-shrink-0">
            <div className="relative cursor-pointer">
              <span className="text-xl text-gray-500">🔔</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                3
              </span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs flex-shrink-0">
                AR
              </div>
              <div className="hidden sm:block">
                <p className="text-[12px] font-semibold text-gray-700 leading-tight">Hello, Arun</p>
                <p className="text-[10px] text-gray-400 leading-tight">CSE · 2nd Year</p>
              </div>
              <span className="text-gray-400 text-xs hidden sm:block">▾</span>
            </div>
          </div>
        </header>

        {/* Mobile expandable search bar */}
        {searchOpen && (
          <div className="md:hidden px-4 py-2 bg-white border-b border-gray-200">
            <div className="relative">
              <input
                autoFocus
                type="text"
                placeholder="Search anything..."
                className="w-full pl-4 pr-9 py-2 border border-gray-200 rounded-full text-[13px] bg-gray-50 focus:outline-none focus:border-blue-400 focus:bg-white transition"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* ── Page content ── */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden pb-16 md:pb-0">
          {activeComponent}
        </main>

        {/* ── Mobile bottom nav bar ── */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-10 bg-white border-t border-gray-200 flex items-center justify-around px-1 py-1 safe-area-pb">
          {bottomNavItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.label)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg flex-1 transition-colors ${
                activePage === item.label
                  ? "text-blue-700"
                  : "text-gray-400"
              }`}
            >
              <span className="text-xl leading-none">{item.icon}</span>
              <span className="text-[9px] font-medium leading-tight truncate w-full text-center">
                {item.label}
              </span>
              {activePage === item.label && (
                <span className="w-1 h-1 rounded-full bg-blue-600 mt-0.5" />
              )}
            </button>
          ))}
          {/* "More" button opens the full drawer */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg flex-1 text-gray-400 transition-colors"
          >
            <span className="text-xl leading-none">☰</span>
            <span className="text-[9px] font-medium leading-tight">More</span>
          </button>
        </nav>

      </div>
    </div>
  );
}