import React, { useState } from "react";

export default function NotificationPanel({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDismiss,
  onClearAll,
  onChangePage
}) {
  const [filterTab, setFilterTab] = useState("All");

  // Notifications preference toggles state
  const [prefs, setPrefs] = useState({
    academic: true,
    placements: true,
    transport: true,
    emailDigest: false,
    smsAlerts: true
  });

  const handleTogglePref = (key) => {
    setPrefs({ ...prefs, [key]: !prefs[key] });
  };

  const filteredNotifications = notifications.filter((item) => {
    if (filterTab === "Unread") return !item.read;
    if (filterTab === "Important") return item.important;
    return true;
  });

  const getCategoryColor = (category) => {
    switch (category) {
      case "Academic":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "Placements":
        return "bg-blue-100 text-blue-750 border-blue-200";
      case "Transport":
        return "bg-amber-100 text-amber-700 border-amber-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-5 max-w-6xl mx-auto">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-blue-900 rounded-2xl p-5 md:p-6 text-white relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold">Notification Center 🔔</h1>
            <p className="text-blue-200 text-xs md:text-sm mt-1">
              View notifications, official updates, and alerts. Manage notification preferences.
            </p>
          </div>
          {notifications.some((n) => !n.read) && (
            <button
              onClick={onMarkAllAsRead}
              className="bg-white text-blue-900 hover:bg-blue-50 text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm self-start sm:self-auto"
            >
              ✓ Mark All as Read
            </button>
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Notifications List */}
        <div className="md:col-span-8 space-y-4">
          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-center justify-between">
            <div className="flex gap-1.5">
              {["All", "Unread", "Important"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilterTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    filterTab === tab
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-250"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {notifications.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-red-650 hover:text-red-700 text-xs font-semibold hover:underline"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="space-y-3">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((item) => (
                <div
                  key={item.id}
                  className={`border rounded-xl p-4 shadow-sm transition-all flex gap-3.5 ${
                    item.read
                      ? "bg-white border-gray-100"
                      : "bg-blue-50/40 border-blue-100 hover:bg-blue-50/60"
                  }`}
                >
                  {/* Category icon */}
                  <span className="text-xl bg-gray-50 border border-gray-100 w-10 h-10 rounded-xl flex items-center justify-center shadow-inner shrink-0">
                    {item.icon}
                  </span>

                  <div className="flex-1 min-w-0 space-y-1.5">
                    {/* Header line */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${getCategoryColor(
                          item.category
                        )}`}
                      >
                        {item.category}
                      </span>
                      {item.important && (
                        <span className="text-[9px] font-bold bg-red-100 text-red-700 border border-red-200 px-2 py-0.5 rounded uppercase tracking-wider">
                          Urgent
                        </span>
                      )}
                      <span className="text-[10px] text-gray-400 ml-auto">📅 {item.date}</span>
                    </div>

                    {/* Notification content */}
                    <div>
                      <p className={`text-xs md:text-sm leading-snug font-bold text-gray-800 ${item.read ? "font-semibold" : "font-extrabold"}`}>
                        {item.title}
                      </p>
                      <p className="text-gray-500 text-xs leading-relaxed mt-1">{item.description}</p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-3 pt-2.5 border-t border-gray-100 mt-2 text-xs flex-wrap">
                      {item.actionLabel && onChangePage && (
                        <button
                          onClick={() => onChangePage(item.actionPage)}
                          className="text-blue-600 hover:text-blue-700 font-bold bg-blue-50 px-2.5 py-1 rounded hover:bg-blue-100 transition-colors"
                        >
                          {item.actionLabel} →
                        </button>
                      )}
                      
                      {!item.read && (
                        <button
                          onClick={() => onMarkAsRead(item.id)}
                          className="text-gray-500 hover:text-gray-700 font-medium"
                        >
                          Mark as Read
                        </button>
                      )}
                      
                      <button
                        onClick={() => onDismiss(item.id)}
                        className="text-red-500 hover:text-red-700 font-medium ml-auto"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl border border-gray-100 p-12 text-center flex flex-col items-center justify-center gap-3">
                <span className="text-4xl">🔔</span>
                <p className="text-sm font-semibold text-gray-600">All caught up!</p>
                <p className="text-xs text-gray-400">No new notifications in this category.</p>
              </div>
            )}
          </div>
        </div>

        {/* Preferences Side Panel */}
        <div className="md:col-span-4 bg-white border border-gray-100 rounded-xl p-4 md:p-5 shadow-sm space-y-4 h-fit">
          <h3 className="font-bold text-gray-800 text-sm">Alert Preferences</h3>
          
          <div className="space-y-3.5">
            {[
              { key: "academic", label: "Academic Notices", desc: "Exam schedules, calendars, result notifications" },
              { key: "placements", label: "Placement Updates", desc: "Registration deadlines, drive schedules" },
              { key: "transport", label: "Transport Alerts", desc: "Delay notifications, route diversions" }
            ].map((option) => (
              <div key={option.key} className="flex items-start justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <p className="font-semibold text-gray-700">{option.label}</p>
                  <p className="text-gray-400 text-[10px] leading-snug">{option.desc}</p>
                </div>
                <input
                  type="checkbox"
                  checked={prefs[option.key]}
                  onChange={() => handleTogglePref(option.key)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 focus:ring-1 border-gray-300 mt-1 cursor-pointer"
                />
              </div>
            ))}
          </div>

          <div className="h-px bg-gray-100" />

          <h3 className="font-bold text-gray-800 text-sm">Delivery Channels</h3>
          
          <div className="space-y-3.5">
            {[
              { key: "emailDigest", label: "Email Digests", desc: "Weekly summary of notices to registered email" },
              { key: "smsAlerts", label: "SMS Alerts", desc: "Urgent notifications directly to registered mobile" }
            ].map((channel) => (
              <div key={channel.key} className="flex items-start justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <p className="font-semibold text-gray-700">{channel.label}</p>
                  <p className="text-gray-400 text-[10px] leading-snug">{channel.desc}</p>
                </div>
                <input
                  type="checkbox"
                  checked={prefs[channel.key]}
                  onChange={() => handleTogglePref(channel.key)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 focus:ring-1 border-gray-300 mt-1 cursor-pointer"
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => alert("Notification settings saved successfully!")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl text-xs transition shadow-sm mt-2"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
