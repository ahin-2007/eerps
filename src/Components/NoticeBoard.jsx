import React, { useState } from "react";

const INITIAL_NOTICES = [
  {
    id: 1,
    title: "Project Phase-2 Progress Review Schedule",
    category: "HOD Messages",
    date: "July 08, 2026",
    postedBy: "Dr. K. Rajkumar (HOD CSE)",
    importance: "High",
    dot: "bg-red-500",
    content: "All final year CSE students must present their project progress for the Phase-2 review on July 15, 2026. Please bring your draft project reports signed by your guides. Presentations should be limited to a maximum of 10 slides outlining progress, database models, and current UI mockups.",
    attachments: ["Project_Phase2_Schedule.pdf", "Report_Guidelines.pdf"]
  },
  {
    id: 2,
    title: "Special Class for Design and Analysis of Algorithms",
    category: "Faculty Messages",
    date: "July 08, 2026",
    postedBy: "Mrs. Sarah John (Assistant Professor)",
    importance: "Medium",
    dot: "bg-blue-500",
    content: "There will be an extra tutorial class for Design and Analysis of Algorithms (DAA) this Saturday, July 11, from 9:30 AM to 11:30 AM in Seminar Hall 2. We will cover dynamic programming and greedy algorithms coding problems in detail.",
    attachments: []
  },
  {
    id: 3,
    title: "Submission of Mobile Application Lab Records",
    category: "Faculty Messages",
    date: "July 07, 2026",
    postedBy: "Mr. R. Rajesh (Lab Instructor)",
    importance: "High",
    dot: "bg-red-500",
    content: "All students are instructed to submit their completed Mobile Application Development Lab record books on or before July 13, 2026. Late submissions will result in a deduction of internal marks. Ensure all program outputs are pasted and signed by the guide.",
    attachments: ["Lab_Index_Syllabus.pdf"]
  },
  {
    id: 4,
    title: "National CyberFest 2026 Symposium Volunteer Call",
    category: "HOD Messages",
    date: "July 05, 2026",
    postedBy: "Dr. K. Rajkumar (HOD CSE)",
    importance: "Medium",
    dot: "bg-blue-500",
    content: "Students interested in volunteering as student coordinators or web developers for the upcoming CSE national symposium 'CyberFest 2k26' are requested to gather in the HOD cabin tomorrow at 3:30 PM. Active participation is expected from 3rd and final year students.",
    attachments: []
  }
];

export default function NoticeBoard() {
  const [notices, setNotices] = useState(INITIAL_NOTICES);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modals state
  const [viewNotice, setViewNotice] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  
  // Notice creation form state
  const [newNoticeTitle, setNewNoticeTitle] = useState("");
  const [newNoticeCategory, setNewNoticeCategory] = useState("HOD Messages");
  const [newNoticeImportance, setNewNoticeImportance] = useState("Medium");
  const [newNoticeContent, setNewNoticeContent] = useState("");
  const [newNoticePostedBy, setNewNoticePostedBy] = useState("");
  const [newNoticeAttachment, setNewNoticeAttachment] = useState("");

  const categories = ["All", "HOD Messages", "Faculty Messages"];

  const handleCreateNotice = (e) => {
    e.preventDefault();
    if (!newNoticeTitle || !newNoticeContent) return;

    let dotColor = "bg-gray-400";
    if (newNoticeImportance === "High") dotColor = "bg-red-500";
    else if (newNoticeImportance === "Medium") dotColor = "bg-blue-500";
    else if (newNoticeImportance === "Low") dotColor = "bg-green-500";

    const noticeItem = {
      id: Date.now(),
      title: newNoticeTitle,
      category: newNoticeCategory,
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }),
      postedBy: newNoticePostedBy || "Faculty Member",
      importance: newNoticeImportance,
      dot: dotColor,
      content: newNoticeContent,
      attachments: newNoticeAttachment ? [newNoticeAttachment] : [],
    };

    setNotices([noticeItem, ...notices]);
    
    // Reset Form
    setNewNoticeTitle("");
    setNewNoticeCategory("HOD Messages");
    setNewNoticeImportance("Medium");
    setNewNoticeContent("");
    setNewNoticePostedBy("");
    setNewNoticeAttachment("");
    setIsCreateOpen(false);
  };

  const filteredNotices = notices.filter((n) => {
    const matchesCategory = selectedCategory === "All" || n.category === selectedCategory;
    const matchesSearch = 
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.postedBy.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-4 md:p-6 space-y-4 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-indigo-900 via-blue-800 to-blue-900 rounded-2xl p-5 md:p-6 text-white relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold">Campus Notice Board 📢</h1>
            <p className="text-blue-200 text-xs md:text-sm mt-1">
              Stay informed with official circulars, exam schedules, and placement updates.
            </p>
          </div>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="bg-white text-blue-900 hover:bg-blue-50 text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm self-start sm:self-auto flex items-center gap-1.5"
          >
            ➕ Post a Notice
          </button>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Search */}
        <div className="relative max-w-md w-full">
          <input
            type="text"
            placeholder="Search notices, keywords, departments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-xs bg-gray-50 focus:outline-none focus:border-blue-400 focus:bg-white transition"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">
            🔍
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Categories Carousel */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Notices Grid */}
      {filteredNotices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNotices.map((notice) => (
            <div
              key={notice.id}
              onClick={() => setViewNotice(notice)}
              className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-blue-100 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Meta details */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      notice.importance === "High"
                        ? "bg-red-50 text-red-600 border border-red-100"
                        : notice.importance === "Medium"
                        ? "bg-blue-50 text-blue-600 border border-blue-100"
                        : "bg-green-50 text-green-600 border border-green-100"
                    }`}
                  >
                    {notice.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                    <span>📅 {notice.date}</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${notice.dot}`} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-bold text-gray-800 text-xs md:text-sm leading-snug line-clamp-2 mb-2 hover:text-blue-600 transition-colors">
                  {notice.title}
                </h3>

                {/* Text Content snippet */}
                <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 mb-4">
                  {notice.content}
                </p>
              </div>

              {/* Bottom Row */}
              <div className="flex items-center justify-between border-t border-gray-50 pt-3 mt-auto flex-shrink-0">
                <span className="text-[10px] text-gray-400 font-medium truncate max-w-[200px]">
                  👤 By: {notice.postedBy}
                </span>
                
                {notice.attachments.length > 0 && (
                  <span className="text-[10px] text-blue-600 font-semibold flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded">
                    📎 {notice.attachments.length} Document(s)
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center flex flex-col items-center justify-center gap-3">
          <span className="text-4xl">📭</span>
          <p className="text-sm font-semibold text-gray-600">No notices found</p>
          <p className="text-xs text-gray-400">Try adjusting your filters or search terms.</p>
        </div>
      )}

      {/* ── View Notice Detail Modal ── */}
      {viewNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-xl animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-4 md:p-5 text-white flex items-center justify-between">
              <div>
                <span className="text-[9px] uppercase tracking-wider font-bold bg-white/20 px-2 py-0.5 rounded">
                  {viewNotice.category} Notice
                </span>
                <p className="text-xs text-blue-100 mt-1">📅 Posted on {viewNotice.date}</p>
              </div>
              <button
                onClick={() => setViewNotice(null)}
                className="text-white hover:text-blue-100 p-1 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-xs"
              >
                ✕ Close
              </button>
            </div>

            {/* Content body */}
            <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
              <h2 className="text-sm md:text-base font-bold text-gray-800 leading-snug">
                {viewNotice.title}
              </h2>
              
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <span className="font-semibold text-gray-600">Issued by:</span>
                <span>{viewNotice.postedBy}</span>
              </div>

              <div className="h-px bg-gray-100" />

              <p className="text-gray-600 text-xs md:text-sm leading-relaxed whitespace-pre-line">
                {viewNotice.content}
              </p>

              {/* Attachments */}
              {viewNotice.attachments && viewNotice.attachments.length > 0 && (
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 space-y-2">
                  <p className="text-xs font-semibold text-gray-700">Attachments:</p>
                  <div className="space-y-1.5">
                    {viewNotice.attachments.map((file, idx) => (
                      <a
                        key={idx}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          alert(`Downloading attachment: ${file}`);
                        }}
                        className="flex items-center justify-between bg-white border border-gray-150 p-2 rounded-lg text-xs text-blue-600 hover:text-blue-700 hover:border-blue-200 transition-colors"
                      >
                        <span className="truncate">📄 {file}</span>
                        <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-medium shrink-0">
                          Download ⬇️
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-5 py-3.5 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
              <span className="flex items-center gap-1">
                Importance: 
                <span className={`w-2 h-2 rounded-full ${viewNotice.dot}`} />
                <span className="font-semibold text-gray-600">{viewNotice.importance}</span>
              </span>
              <span>Notice ID: #{viewNotice.id.toString().slice(-4)}</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Post Circular Modal ── */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs">
          <form
            onSubmit={handleCreateNotice}
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-xl animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Header */}
            <div className="bg-blue-900 p-4 text-white flex items-center justify-between">
              <h2 className="text-xs md:text-sm font-bold flex items-center gap-1.5">
                📢 Post New Campus Notice
              </h2>
              <button
                type="button"
                onClick={() => setIsCreateOpen(false)}
                className="text-white hover:text-blue-100 p-1 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-xs"
              >
                ✕ Close
              </button>
            </div>

            {/* Form Fields */}
            <div className="p-5 space-y-3.5 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Notice Category *
                  </label>
                  <select
                    value={newNoticeCategory}
                    onChange={(e) => setNewNoticeCategory(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-700 focus:outline-none focus:border-blue-400 bg-gray-50"
                  >
                    <option>HOD Messages</option>
                    <option>Faculty Messages</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Importance *
                  </label>
                  <select
                    value={newNoticeImportance}
                    onChange={(e) => setNewNoticeImportance(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-700 focus:outline-none focus:border-blue-400 bg-gray-50"
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Notice Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter notice title..."
                  value={newNoticeTitle}
                  onChange={(e) => setNewNoticeTitle(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:border-blue-400 bg-gray-50 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Author/Department *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dept of computer science, Controller of Exams"
                  value={newNoticePostedBy}
                  onChange={(e) => setNewNoticePostedBy(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:border-blue-400 bg-gray-50 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Detailed Content *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Provide all notice details, instructions, links, dates etc..."
                  value={newNoticeContent}
                  onChange={(e) => setNewNoticeContent(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:border-blue-400 bg-gray-50 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Mock Attachment File Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Registration_Form_Link.pdf"
                  value={newNoticeAttachment}
                  onChange={(e) => setNewNoticeAttachment(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:border-blue-400 bg-gray-50 focus:bg-white transition"
                />
              </div>
            </div>

            {/* Footer buttons */}
            <div className="bg-gray-50 px-5 py-3.5 border-t border-gray-150 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setIsCreateOpen(false)}
                className="bg-white border border-gray-200 hover:bg-gray-50 text-xs font-semibold px-4 py-2 rounded-xl text-gray-600 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition shadow-sm"
              >
                Publish Notice Circular 📢
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
