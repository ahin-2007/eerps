const stats = [
  { value: "1998", label: "Established", icon: "🏛️" },
  { value: "26+", label: "Years of Service", icon: "📅" },
  { value: "13", label: "UG Programmes", icon: "🎓" },
  { value: "11", label: "PG Programmes", icon: "📚" },
  { value: "7", label: "Research Wings", icon: "🔬" },
  { value: "10,782+", label: "Library Books", icon: "📖" },
];

const leadership = [
  {
    name: "Most Rev. Dr. Vincent Mar Paulos",
    role: "Chairman & Manager",
    desc: "Bishop of Marthandam Diocese, fostering academic excellence and moral formation across our institutions.",
    initials: "VM",
    color: "bg-purple-100 text-purple-700",
  },
  {
    name: "Rev. Fr. Franklin Jose",
    role: "Correspondent / Secretary",
    desc: "Dedicated to administrative excellence and the holistic growth of our students.",
    initials: "FJ",
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Dr. T. Subash",
    role: "Principal",
    desc: "Intellectual curiosity meets moral integrity. Together we shape future leaders.",
    initials: "TS",
    color: "bg-green-100 text-green-700",
  },
  {
    name: "Rev. Fr. Justin",
    role: "Bursar",
    desc: "Maintains financial stewardship and supports the college's sustained growth.",
    initials: "FJ",
    color: "bg-amber-100 text-amber-700",
  },
];

const programmes = [
  {
    level: "Under Graduate",
    tag: "UG",
    count: "13 Courses",
    color: "bg-blue-600",
    tagBg: "bg-blue-100 text-blue-700",
    courses: [
      "B.A. English Literature",
      "B.Sc. Biochemistry",
      "B.Sc. Biotechnology",
      "B.Sc. Chemistry",
      "B.Sc. Computer Science",
      "B.Sc. Microbiology",
      "B.Sc. Physics",
      "B.Com",
      "BBA",
      "B.Sc. Mathematics",
      "B.Sc. Zoology",
      "BSW",
      "B.Sc. Nutrition",
    ],
    link: "https://malankara.edu.in/ug-degree-courses.php",
  },
  {
    level: "Post Graduate",
    tag: "PG",
    count: "11 Courses",
    color: "bg-emerald-600",
    tagBg: "bg-emerald-100 text-emerald-700",
    courses: [
      "M.A. English",
      "M.Com",
      "M.Sc. Biochemistry",
      "M.Sc. Biotechnology",
      "M.Sc. Chemistry",
      "M.Sc. Computer Science",
      "M.Sc. Microbiology",
      "M.Sc. Physics",
      "MSW",
      "M.Sc. Mathematics",
      "MBA",
    ],
    link: "https://malankara.edu.in/pg-degree-courses.php",
  },
  {
    level: "Research / Ph.D",
    tag: "PhD",
    count: "7 Wings",
    color: "bg-violet-600",
    tagBg: "bg-violet-100 text-violet-700",
    courses: [
      "Ph.D. Biotechnology",
      "Ph.D. Computer Science",
      "Ph.D. Microbiology",
      "Ph.D. Physics",
      "Ph.D. Chemistry",
      "Ph.D. English",
      "Ph.D. Commerce",
    ],
    link: "https://malankara.edu.in/research-wings.php",
  },
];

const highlights = [
  {
    icon: "🧪",
    title: "Well-Equipped Labs",
    desc: "Computer and science labs with modern infrastructure supporting hands-on learning.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: "📖",
    title: "Central Library",
    desc: "10,782+ books, 18 national & international journals, and a digital resource centre.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: "🏃",
    title: "Sports & Fitness",
    desc: "Dedicated coaching for games and athletics, promoting intercollegiate participation.",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: "🚌",
    title: "Transport Facilities",
    desc: "Fleet of buses covering Nellimoodu, Kannaravilai, Avanakuzhi and all nearby towns.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: "🤝",
    title: "NSS / NCC / YRC",
    desc: "Active social service wings building leadership, discipline, and community values.",
    color: "bg-red-50 text-red-600",
  },
  {
    icon: "💼",
    title: "HR & Placement",
    desc: "Dedicated placement cell bridging academic excellence with career opportunities.",
    color: "bg-teal-50 text-teal-600",
  },
];

const accreditation = [
  { label: "NAAC Accredited", icon: "🏅", color: "bg-amber-50 border-amber-200 text-amber-800" },
  { label: "NIRF Ranked", icon: "📊", color: "bg-blue-50 border-blue-200 text-blue-800" },
  { label: "Govt. of Tamil Nadu Approved", icon: "✅", color: "bg-green-50 border-green-200 text-green-800" },
  { label: "MSU Affiliated", icon: "🎓", color: "bg-purple-50 border-purple-200 text-purple-800" },
];

export default function AboutCollege() {
  return (
    <div className="w-full bg-gray-50 font-sans overflow-y-auto">

      {/* ── Hero Banner ── */}
      <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 px-4 sm:px-8 py-10 sm:py-14 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 bg-white/15 text-blue-100 text-[11px] font-semibold px-3 py-1 rounded-full mb-4 border border-white/20">
            🏛️ Est. 1998 · Mariagiri, Kanyakumari
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-3">
            Malankara Catholic College
          </h1>
          <p className="text-blue-200 text-sm sm:text-base leading-relaxed mb-2">
            Owned & managed by the <span className="text-white font-semibold">Diocese of Marthandam</span>, affiliated to{" "}
            <span className="text-white font-semibold">Manonmaniam Sundaranar University</span>, Tirunelveli.
          </p>
          <p className="text-blue-300 text-xs italic mb-6">
            "Transformation of Society through Human Resources."
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href="https://malankara.edu.in/online-admission/"
              target="_blank"
              rel="noreferrer"
              className="bg-white text-blue-800 font-semibold text-xs px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Apply for Admission →
            </a>
            <a
              href="https://malankara.edu.in"
              target="_blank"
              rel="noreferrer"
              className="bg-white/15 border border-white/30 text-white font-semibold text-xs px-4 py-2 rounded-xl hover:bg-white/20 transition-colors"
            >
              Visit Website ↗
            </a>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-5 max-w-4xl mx-auto">

        {/* ── Stats ── */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-3 flex flex-col items-center text-center">
              <span className="text-xl mb-1">{s.icon}</span>
              <p className="text-base font-bold text-gray-800 leading-tight">{s.value}</p>
              <p className="text-[10px] text-gray-400 leading-tight mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── About / History ── */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-5 bg-blue-600 rounded-full" />
            <h2 className="text-sm font-bold text-gray-800">About the College</h2>
          </div>
          <p className="text-[13px] text-gray-600 leading-relaxed mb-3">
            Malankara Catholic College (MCC) is a co-educational institution of higher education located at Mariagiri,
            Kaliakkavilai, Kanyakumari District, Tamil Nadu — 629153. Established on{" "}
            <span className="font-semibold text-gray-800">20th July, 1998</span>, it was born out of the educational
            vision of the Most Rev. Lawrence Mar Ephraem, the first Bishop of the Catholic Diocese of Marthandam.
          </p>
          <p className="text-[13px] text-gray-600 leading-relaxed">
            Under the untiring inspiration of subsequent leadership and the dedication of its staff, the institution
            has blossomed into a centre of academic excellence and holistic formation — offering quality higher education
            to the youth of the surrounding rural and semi-urban communities at the Kerala–Tamil Nadu border.
          </p>
          {/* Quick info grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-gray-50">
            {[
              { label: "Management", value: "Diocese of Marthandam" },
              { label: "Affiliation", value: "MSU, Tirunelveli" },
              { label: "Type", value: "Co-Educational" },
              { label: "Location", value: "Kanyakumari, TN" },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
                <p className="text-[12px] font-semibold text-gray-700 mt-0.5">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Vision & Mission ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-blue-600 rounded-2xl p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🔭</span>
              <h3 className="text-sm font-bold text-white">Our Vision</h3>
            </div>
            <p className="text-blue-100 text-[13px] leading-relaxed">
              To be a premier institution of higher learning that nurtures intellectually competent,
              morally upright, and socially responsible leaders committed to the service of God and humanity.
            </p>
          </div>
          <div className="bg-indigo-50 rounded-2xl border border-indigo-100 p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🎯</span>
              <h3 className="text-sm font-bold text-indigo-800">Our Mission</h3>
            </div>
            <p className="text-indigo-700 text-[13px] leading-relaxed">
              To provide quality, value-based education through innovative teaching, research, and outreach — empowering
              students to achieve academic excellence and contribute meaningfully to society.
            </p>
          </div>
        </div>

        {/* ── Leadership ── */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-purple-600 rounded-full" />
            <h2 className="text-sm font-bold text-gray-800">Leadership</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {leadership.map((l) => (
              <div key={l.name} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 ${l.color}`}>
                  {l.initials}
                </div>
                <div className="min-w-0">
                  <p className="text-[12px] font-bold text-gray-800 leading-tight">{l.name}</p>
                  <p className="text-[10px] font-semibold text-blue-600 mb-1">{l.role}</p>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{l.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Programmes ── */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-green-600 rounded-full" />
            <h2 className="text-sm font-bold text-gray-800">Programmes Offered</h2>
          </div>
          <div className="space-y-3">
            {programmes.map((p) => (
              <div key={p.level} className="border border-gray-100 rounded-xl overflow-hidden">
                {/* Header */}
                <div className={`${p.color} px-4 py-2.5 flex items-center justify-between`}>
                  <div className="flex items-center gap-2">
                    <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {p.tag}
                    </span>
                    <span className="text-white text-[13px] font-bold">{p.level}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white/80 text-[11px]">{p.count}</span>
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-white/20 hover:bg-white/30 text-white text-[10px] font-semibold px-2.5 py-1 rounded-lg transition-colors"
                    >
                      View all ↗
                    </a>
                  </div>
                </div>
                {/* Courses */}
                <div className="p-3 flex flex-wrap gap-1.5">
                  {p.courses.map((c) => (
                    <span key={c} className={`text-[10px] font-medium px-2.5 py-1 rounded-full border ${p.tagBg} border-transparent`}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Campus Highlights ── */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-amber-500 rounded-full" />
            <h2 className="text-sm font-bold text-gray-800">Campus Highlights</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {highlights.map((h) => (
              <div key={h.title} className={`${h.color.split(" ")[0]} rounded-xl p-3 border border-gray-100`}>
                <span className="text-xl block mb-1.5">{h.icon}</span>
                <p className={`text-[12px] font-bold mb-1 ${h.color.split(" ")[1]}`}>{h.title}</p>
                <p className="text-[11px] text-gray-500 leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Accreditation ── */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-red-500 rounded-full" />
            <h2 className="text-sm font-bold text-gray-800">Accreditation & Recognition</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {accreditation.map((a) => (
              <div key={a.label} className={`flex flex-col items-center text-center gap-1.5 p-3 rounded-xl border ${a.color}`}>
                <span className="text-2xl">{a.icon}</span>
                <p className="text-[11px] font-semibold leading-tight">{a.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Contact Card ── */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-4 sm:p-5">
          <h2 className="text-sm font-bold text-white mb-3">Contact the College</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { icon: "📍", label: "Address", value: "Mariagiri, Kaliakkavilai, Kanyakumari Dist., TN – 629153" },
              { icon: "📞", label: "Phone", value: "+91-04651 244155 / 244156\n+91 9442336243" },
              { icon: "✉️", label: "Email", value: "malankaracollege@gmail.com" },
            ].map(({ icon, label, value }) => (
              <div key={label} className="bg-white/10 rounded-xl p-3 border border-white/20">
                <p className="text-blue-200 text-[10px] font-bold uppercase tracking-wider mb-1">
                  {icon} {label}
                </p>
                <p className="text-white text-[12px] font-medium leading-relaxed whitespace-pre-line">{value}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {[
              { label: "🌐 Website", href: "https://malankara.edu.in" },
              { label: "📘 Facebook", href: "https://www.facebook.com/malankara.edu.in/" },
              { label: "📸 Instagram", href: "https://www.instagram.com/malankaracatholiccollege" },
              { label: "▶️ YouTube", href: "https://www.youtube.com/@mccmedia9579" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="bg-white/15 hover:bg-white/25 text-white text-[11px] font-semibold px-3 py-1.5 rounded-xl border border-white/20 transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}