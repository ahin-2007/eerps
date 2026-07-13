import { useState, useRef, useEffect,createContext } from "react";
import { Link } from "react-router-dom";
import CampusConnect from "./Campusconnect";

const roles = ["STUDENT", "PARENT", "FACULTY", "HOD", "ADMIN", ];

const roleIcons = {
  STUDENT: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  FACULTY: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  HOD: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <circle cx="12" cy="8" r="4" /><path d="M20 21a8 8 0 1 0-16 0" /><path d="M12 12v9" /><path d="M8 17l4-2 4 2" />
    </svg>
  ),
  ADMIN: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  STAFF: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  PARENT: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
};

const CampusIllustration = () => (
  <svg viewBox="0 0 320 280" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="320" height="280" fill="#e8f4fd" rx="8" />
    <rect x="0" y="210" width="320" height="70" fill="#c8e6c9" />
    <rect x="0" y="220" width="320" height="60" fill="#a5d6a7" />
    <ellipse cx="160" cy="240" rx="40" ry="8" fill="#bcaaa4" opacity="0.4" />
    <rect x="145" y="215" width="30" height="30" fill="#d7ccc8" rx="2" />
    <rect x="60" y="80" width="200" height="145" fill="#eceff1" rx="4" />
    <rect x="60" y="80" width="200" height="20" fill="#b0bec5" rx="4" />
    {[80, 115, 150, 185, 220].map((x, i) => (
      <rect key={`w1${i}`} x={x} y="115" width="22" height="18" fill="#90caf9" rx="2" />
    ))}
    {[80, 115, 150, 185, 220].map((x, i) => (
      <rect key={`w2${i}`} x={x} y="145" width="22" height="18" fill="#90caf9" rx="2" />
    ))}
    <rect x="139" y="185" width="42" height="40" fill="#78909c" rx="3" />
    <rect x="145" y="185" width="14" height="40" fill="#90a4ae" rx="2" />
    <circle cx="154" cy="207" r="2" fill="#cfd8dc" />
    <circle cx="166" cy="207" r="2" fill="#cfd8dc" />
    <rect x="118" y="173" width="84" height="12" fill="#1565c0" rx="2" />
    <text x="160" y="182" textAnchor="middle" fill="white" fontSize="6" fontFamily="Arial" fontWeight="bold">CAMPUSCONNECT</text>
    <line x1="160" y1="50" x2="160" y2="80" stroke="#78909c" strokeWidth="2" />
    <polygon points="160,50 178,58 160,66" fill="#e53935" />
    <rect x="28" y="165" width="8" height="50" fill="#795548" />
    <ellipse cx="32" cy="155" rx="22" ry="25" fill="#388e3c" />
    <ellipse cx="32" cy="148" rx="16" ry="18" fill="#43a047" />
    <rect x="284" y="165" width="8" height="50" fill="#795548" />
    <ellipse cx="288" cy="155" rx="22" ry="25" fill="#388e3c" />
    <ellipse cx="288" cy="148" rx="16" ry="18" fill="#43a047" />
    <rect x="50" y="185" width="5" height="30" fill="#795548" />
    <ellipse cx="52" cy="178" rx="13" ry="15" fill="#2e7d32" />
    <rect x="265" y="185" width="5" height="30" fill="#795548" />
    <ellipse cx="267" cy="178" rx="13" ry="15" fill="#2e7d32" />
    <circle cx="95" cy="205" r="9" fill="#ffccbc" />
    <rect x="89" y="214" width="12" height="22" fill="#1976d2" rx="2" />
    <rect x="87" y="216" width="6" height="14" fill="#0d47a1" rx="2" />
    <line x1="89" y1="214" x2="84" y2="230" stroke="#ffccbc" strokeWidth="3" strokeLinecap="round" />
    <line x1="101" y1="214" x2="106" y2="230" stroke="#ffccbc" strokeWidth="3" strokeLinecap="round" />
    <line x1="89" y1="236" x2="86" y2="252" stroke="#333" strokeWidth="3" strokeLinecap="round" />
    <line x1="101" y1="236" x2="104" y2="252" stroke="#333" strokeWidth="3" strokeLinecap="round" />
    <circle cx="135" cy="202" r="10" fill="#ffe0b2" />
    <rect x="128" y="212" width="14" height="25" fill="#424242" rx="2" />
    <line x1="128" y1="212" x2="122" y2="230" stroke="#ffe0b2" strokeWidth="3" strokeLinecap="round" />
    <line x1="142" y1="212" x2="148" y2="228" stroke="#ffe0b2" strokeWidth="3" strokeLinecap="round" />
    <rect x="145" y="218" width="8" height="12" fill="#795548" rx="1" />
    <line x1="128" y1="237" x2="125" y2="255" stroke="#212121" strokeWidth="3" strokeLinecap="round" />
    <line x1="142" y1="237" x2="145" y2="255" stroke="#212121" strokeWidth="3" strokeLinecap="round" />
    <circle cx="185" cy="205" r="9" fill="#ffccbc" />
    <rect x="179" y="214" width="12" height="22" fill="#e53935" rx="2" />
    <line x1="179" y1="214" x2="174" y2="230" stroke="#ffccbc" strokeWidth="3" strokeLinecap="round" />
    <line x1="191" y1="214" x2="196" y2="230" stroke="#ffccbc" strokeWidth="3" strokeLinecap="round" />
    <line x1="179" y1="236" x2="176" y2="252" stroke="#333" strokeWidth="3" strokeLinecap="round" />
    <line x1="191" y1="236" x2="194" y2="252" stroke="#333" strokeWidth="3" strokeLinecap="round" />
    <circle cx="225" cy="203" r="9" fill="#d7ccc8" />
    <rect x="219" y="212" width="12" height="22" fill="#6a1b9a" rx="2" />
    <line x1="219" y1="212" x2="214" y2="228" stroke="#d7ccc8" strokeWidth="3" strokeLinecap="round" />
    <line x1="231" y1="212" x2="236" y2="228" stroke="#d7ccc8" strokeWidth="3" strokeLinecap="round" />
    <rect x="210" y="216" width="7" height="10" fill="#4a148c" rx="2" />
    <line x1="219" y1="234" x2="216" y2="252" stroke="#333" strokeWidth="3" strokeLinecap="round" />
    <line x1="231" y1="234" x2="234" y2="252" stroke="#333" strokeWidth="3" strokeLinecap="round" />
    <circle cx="55" cy="218" r="6" fill="#b0bec5" />
    <rect x="51" y="224" width="8" height="15" fill="#546e7a" rx="1" />
    <line x1="51" y1="224" x2="47" y2="234" stroke="#b0bec5" strokeWidth="2" strokeLinecap="round" />
    <line x1="59" y1="224" x2="63" y2="234" stroke="#b0bec5" strokeWidth="2" strokeLinecap="round" />
    <circle cx="265" cy="218" r="6" fill="#ffab91" />
    <rect x="261" y="224" width="8" height="15" fill="#d84315" rx="1" />
    <line x1="261" y1="224" x2="257" y2="234" stroke="#ffab91" strokeWidth="2" strokeLinecap="round" />
    <line x1="269" y1="224" x2="273" y2="234" stroke="#ffab91" strokeWidth="2" strokeLinecap="round" />
    <ellipse cx="60" cy="35" rx="28" ry="12" fill="white" opacity="0.8" />
    <ellipse cx="80" cy="30" rx="20" ry="10" fill="white" opacity="0.8" />
    <ellipse cx="250" cy="28" rx="25" ry="11" fill="white" opacity="0.7" />
    <ellipse cx="270" cy="23" rx="18" ry="9" fill="white" opacity="0.7" />
  </svg>
);

const LogoIcon = () => (
  <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 shrink-0">
    <polygon points="24,2 44,13 44,35 24,46 4,35 4,13" fill="#1565c0" />
    <polygon points="24,8 40,17 40,33 24,42 8,33 8,17" fill="#1976d2" />
    <rect x="17" y="18" width="14" height="10" fill="white" rx="1" />
    <rect x="20" y="28" width="8" height="8" fill="white" rx="1" />
    <polygon points="24,12 34,17 34,18 14,18 14,17" fill="#fdd835" />
    <polygon points="24,10 28,13 24,12 20,13" fill="#f9a825" />
    <circle cx="24" cy="10" r="2" fill="#fdd835" />
  </svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

const HeadphonesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
export const usernameContext = createContext();

export default function Login() {
  const [activeRole, setActiveRole] = useState("STUDENT");
  const [campusId, setCampusId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    
  };

  const selectRole = (role) => {
    setActiveRole(role);
    setDropdownOpen(false);
  };
 

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col relative">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1562774053-701939374585?w=1600&q=80')`,
          filter: "blur(3px) brightness(0.65)",
          transform: "scale(1.05)",
        }}
      />
      <div className="absolute inset-0 bg-blue-900/30" />

      {/* Z-layer */}
      <div className="relative z-10 flex flex-col h-full">

        {/* Card wrapper */}
        <div className="flex-1 flex items-center justify-center px-4 py-3 min-h-0">
          <div
            className="w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{ maxWidth: "860px", maxHeight: "100%" }}
          >

            {/* ── Logo header ── */}
            <div className="flex items-center justify-center gap-3 px-6 py-3 border-b border-gray-100 shrink-0">
              <LogoIcon />
              <div>
                <div className="text-xl font-bold leading-tight">
                  <span className="text-gray-800">Campus</span>
                  <span className="text-blue-600">Connect</span>
                </div>
                <div className="text-xs text-gray-500">Your  College Companion</div>
              </div>
            </div>

            {/* ── Body ── */}
            <div className="flex flex-1 min-h-0">

              {/* Left illustration — hidden on mobile */}
              <div className="hidden md:flex flex-col justify-center items-center w-1/2 px-6 py-4 shrink-0">
                <h1 className="text-2xl font-bold text-gray-800 mb-3 self-start">
                  Unified Login Portal
                </h1>
                <div className="w-full flex-1 min-h-0" style={{ maxHeight: "260px" }}>
                  <CampusIllustration />
                </div>
              </div>

              {/* Divider — hidden on mobile */}
              <div className="hidden md:block w-px bg-gray-100 self-stretch shrink-0" />

              {/* Right — form (full width on mobile) */}
              <div className="w-full md:w-1/2 px-6 py-5 flex flex-col justify-center">

                {/* Mobile-only title */}
                <h1 className="md:hidden text-xl font-bold text-gray-800 mb-4 text-center">
                  Unified Login Portal
                </h1>

                {/* ── DESKTOP: tab strip ── */}
                <div className="hidden md:flex flex-wrap border-b border-gray-200 mb-4">
                  {roles.map((role) => (
                    <Link
                      key={role}
                      onClick={() => setActiveRole(role)}
                      className={`px-2.5 py-1.5 text-xs font-semibold tracking-wide transition-colors focus:outline-none ${activeRole === role
                          ? "text-blue-600 border-b-2 border-blue-600 -mb-px"
                          : "text-gray-500 hover:text-blue-500"
                        }`}
                    >
                      {role}
                    </Link>
                  ))}
                </div>

                {/* ── MOBILE: dropdown button ── */}
                <div className="md:hidden mb-4 relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setDropdownOpen((o) => !o)}
                    className="w-full flex items-center justify-between gap-2 px-4 py-3 border-2 border-blue-500 rounded-xl bg-blue-50 text-blue-700 font-semibold text-sm focus:outline-none"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-blue-600">{roleIcons[activeRole]}</span>
                      {activeRole}
                    </span>
                    <span className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}>
                      <ChevronDownIcon />
                    </span>
                  </button>

                  {/* Dropdown menu */}
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-30 overflow-x-scroll h-60">
                      {roles.map((role) => (
                        <button
                          key={role}
                          type="button"
                          onClick={() => {selectRole(role)
                           
                          }}
                          className={`w-full flex items-center justify-between gap-3 px-4 py-3 text-sm font-medium transition-colors ${activeRole === role
                              ? "bg-blue-50 text-blue-700"
                              : "text-gray-700 hover:bg-gray-50"
                            }`}
                        >
                          <span className="flex items-center gap-3">
                            <span className={activeRole === role ? "text-blue-600" : "text-gray-400"}>
                              {roleIcons[role]}
                            </span>
                            {role}
                          </span>
                          {activeRole === role && (
                            <span className="text-blue-600"><CheckIcon /></span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* ── Form fields ── */}
                <form onSubmit={handleLogin} className="flex flex-col gap-3">
                  <div className="flex items-center border border-gray-300 rounded-lg bg-white focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-200 transition-all">
                    <span className="pl-3 pr-2 text-gray-400"><UserIcon /></span>
                    <input
                      type="text"
                      placeholder="Campus ID / Email"
                      value={campusId}
                      
                      onChange={(e) => setCampusId(e.target.value)}
                      className="flex-1 py-3 pr-3 bg-transparent text-gray-700 placeholder-gray-400 text-sm focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center border border-gray-300 rounded-lg bg-white focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-200 transition-all">
                    <span className="pl-3 pr-2 text-gray-400"><LockIcon /></span>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="flex-1 py-3 bg-transparent text-gray-700 placeholder-gray-400 text-sm focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="pr-3 pl-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                    </button>
                  </div>


                  <Link
                    type="submit"
                    to={campusId ? `/${activeRole.toLowerCase()}` : "/"}
                    className="flex items-center justify-center gap-2 py-3 px-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg text-sm"
                  >
                    Login <ArrowRightIcon />
                  </Link>
                  
                    
                  <button
                    type="button"
                    className="flex items-center justify-center gap-3 py-3 px-6 w-full bg-white hover:bg-gray-100 active:bg-gray-200 text-gray-800 font-semibold rounded-lg border border-gray-300 transition-all shadow-md hover:shadow-lg text-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      className="w-5 h-5"
                    >
                      <path
                        fill="#FFC107"
                        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.5-.4-3.5z"
                      />
                      <path
                        fill="#FF3D00"
                        d="M6.3 14.7l6.6 4.8C14.7 15.4 19 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4c-7.7 0-14.4 4.3-17.7 10.7z"
                      />
                      <path
                        fill="#4CAF50"
                        d="M24 44c5.2 0 10-2 13.5-5.2l-6.2-5.2c-2.1 1.6-4.7 2.4-7.3 2.4-5.3 0-9.7-3.3-11.3-8l-6.6 5.1C9.5 39.6 16.2 44 24 44z"
                      />
                      <path
                        fill="#1976D2"
                        d="M43.6 20.5H42V20H24v8h11.3c-1.1 3-3.3 5.3-6 6.8l6.2 5.2C39.2 36.6 44 31 44 24c0-1.3-.1-2.5-.4-3.5z"
                      />
                    </svg>

                    <span>Continue with Google</span>
                  </button>

                  <div className="flex flex-col items-center gap-1 mt-1">
                    <Link to={'forgotpassword'} className="text-xs text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                      Forgot Password?
                    </Link>
                    <a href="#" className="text-xs text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                      Register (First Time Users)
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 py-2 text-center text-xs text-white/70">
          <span className="mr-3 hover:text-white cursor-pointer transition-colors">Terms &amp; Conditions</span>
          <span className="mr-3 hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
          <span>© 2024 CampusConnect. All Rights Reserved.</span>
        </div>
      </div>

      {/* Need Help */}
      <div className="fixed bottom-4 right-4 z-20">
        <button className="flex items-center gap-2 bg-gray-900/90 hover:bg-gray-900 text-white text-xs font-medium px-3 py-2.5 rounded-full shadow-lg transition-colors backdrop-blur-sm">
          Need Help? <HeadphonesIcon />
        </button>
      </div>
    </div>
  );
}