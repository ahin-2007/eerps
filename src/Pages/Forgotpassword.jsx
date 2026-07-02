import { useState, useRef, useEffect } from "react";

// ── Shared Icons ────────────────────────────────────────────────────────────

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

const HeadphonesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
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

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 text-blue-500">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

// ── Forgot-password illustration (envelope + lock) ───────────────────────────
const ForgotIllustration = () => (
  <svg viewBox="0 0 320 280" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Background */}
    <rect width="320" height="280" fill="#e8f4fd" rx="8" />

    {/* Decorative circles */}
    <circle cx="30" cy="50" r="28" fill="#bbdefb" opacity="0.5" />
    <circle cx="290" cy="230" r="36" fill="#bbdefb" opacity="0.4" />
    <circle cx="300" cy="60" r="18" fill="#e3f2fd" opacity="0.7" />
    <circle cx="20" cy="220" r="22" fill="#e3f2fd" opacity="0.6" />

    {/* Ground line */}
    <rect x="0" y="230" width="320" height="50" fill="#c8e6c9" />
    <rect x="0" y="240" width="320" height="40" fill="#a5d6a7" />

    {/* Envelope body */}
    <rect x="70" y="90" width="180" height="120" rx="10" fill="white" stroke="#90caf9" strokeWidth="3" />

    {/* Envelope flap */}
    <polygon points="70,90 160,155 250,90" fill="#e3f2fd" stroke="#90caf9" strokeWidth="2" />
    <polygon points="70,90 70,100 135,148 70,148" fill="#bbdefb" opacity="0.6" />
    <polygon points="250,90 250,148 185,148 250,100" fill="#bbdefb" opacity="0.6" />

    {/* Envelope lines (content suggestion) */}
    <rect x="100" y="165" width="80" height="5" rx="2.5" fill="#90caf9" opacity="0.5" />
    <rect x="100" y="177" width="60" height="5" rx="2.5" fill="#90caf9" opacity="0.35" />

    {/* Lock badge on envelope */}
    <circle cx="220" cy="88" r="30" fill="#1565c0" />
    <circle cx="220" cy="88" r="26" fill="#1976d2" />
    {/* Lock body */}
    <rect x="209" y="91" width="22" height="16" rx="3" fill="white" />
    {/* Lock shackle */}
    <path d="M213 91V85a7 7 0 0 1 14 0v6" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
    {/* Keyhole */}
    <circle cx="220" cy="97" r="3" fill="#1976d2" />
    <rect x="218.5" y="98" width="3" height="5" rx="1" fill="#1976d2" />

    {/* Dotted motion lines */}
    {[0,1,2].map(i => (
      <circle key={i} cx={42 + i * 12} cy={150 + i * 8} r="3" fill="#90caf9" opacity={0.8 - i * 0.25} />
    ))}
    {[0,1,2].map(i => (
      <circle key={i} cx={278 - i * 12} cy={150 + i * 8} r="3" fill="#90caf9" opacity={0.8 - i * 0.25} />
    ))}

    {/* Stars / sparkles */}
    <text x="52" y="85" fontSize="18" fill="#fdd835" opacity="0.9">✦</text>
    <text x="258" y="75" fontSize="12" fill="#fdd835" opacity="0.8">✦</text>
    <text x="40" y="180" fontSize="10" fill="#90caf9" opacity="0.7">✦</text>

    {/* Person with question mark */}
    <circle cx="88" cy="210" r="14" fill="#ffccbc" />
    <rect x="78" y="224" width="20" height="28" fill="#1976d2" rx="3" />
    <line x1="78" y1="224" x2="68" y2="244" stroke="#ffccbc" strokeWidth="4" strokeLinecap="round" />
    <line x1="98" y1="224" x2="108" y2="244" stroke="#ffccbc" strokeWidth="4" strokeLinecap="round" />
    <text x="84" y="207" fontSize="14" fill="#1565c0" fontWeight="bold">?</text>

    {/* Clouds */}
    <ellipse cx="60" cy="35" rx="28" ry="12" fill="white" opacity="0.75" />
    <ellipse cx="80" cy="30" rx="18" ry="9" fill="white" opacity="0.75" />
    <ellipse cx="255" cy="28" rx="24" ry="10" fill="white" opacity="0.65" />
    <ellipse cx="274" cy="23" rx="16" ry="8" fill="white" opacity="0.65" />
  </svg>
);

// OTP illustration
const OtpIllustration = () => (
  <svg viewBox="0 0 320 280" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="320" height="280" fill="#e8f4fd" rx="8" />
    <circle cx="30" cy="50" r="28" fill="#bbdefb" opacity="0.5" />
    <circle cx="290" cy="230" r="36" fill="#bbdefb" opacity="0.4" />
    <rect x="0" y="230" width="320" height="50" fill="#c8e6c9" />
    <rect x="0" y="240" width="320" height="40" fill="#a5d6a7" />

    {/* Phone */}
    <rect x="110" y="60" width="100" height="170" rx="14" fill="#37474f" />
    <rect x="116" y="68" width="88" height="154" rx="10" fill="#eceff1" />
    {/* Notch */}
    <rect x="145" y="62" width="30" height="8" rx="4" fill="#263238" />
    {/* Screen content */}
    <rect x="126" y="85" width="68" height="6" rx="3" fill="#90caf9" />
    <rect x="130" y="98" width="60" height="4" rx="2" fill="#b0bec5" />
    <rect x="136" y="108" width="48" height="4" rx="2" fill="#b0bec5" />

    {/* OTP boxes on phone */}
    {[0,1,2,3].map(i => (
      <g key={i}>
        <rect x={126 + i * 18} y="122" width="14" height="18" rx="3" fill="white" stroke="#90caf9" strokeWidth="1.5" />
        <text x={133 + i * 18} y="135" textAnchor="middle" fontSize="10" fill="#1565c0" fontWeight="bold">
          {["3","7","*","9"][i]}
        </text>
      </g>
    ))}

    {/* Verify button on phone */}
    <rect x="126" y="148" width="68" height="14" rx="7" fill="#1565c0" />
    <text x="160" y="158" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold">Verify</text>

    {/* Bottom home bar */}
    <rect x="145" y="210" width="30" height="4" rx="2" fill="#90a4ae" />

    {/* Signal rings */}
    {[0,1,2].map(i => (
      <path key={i}
        d={`M ${160 - 20 - i*14} ${55 - i*14} Q 160 ${30 - i*14} ${160 + 20 + i*14} ${55 - i*14}`}
        fill="none" stroke="#90caf9" strokeWidth={2 - i*0.4} opacity={0.9 - i*0.25} strokeLinecap="round"
      />
    ))}

    {/* Sparkles */}
    <text x="52" y="85" fontSize="18" fill="#fdd835" opacity="0.9">✦</text>
    <text x="258" y="75" fontSize="12" fill="#fdd835" opacity="0.8">✦</text>

    {/* Clouds */}
    <ellipse cx="60" cy="35" rx="28" ry="12" fill="white" opacity="0.75" />
    <ellipse cx="80" cy="30" rx="18" ry="9" fill="white" opacity="0.75" />
    <ellipse cx="255" cy="28" rx="24" ry="10" fill="white" opacity="0.65" />
    <ellipse cx="274" cy="23" rx="16" ry="8" fill="white" opacity="0.65" />
  </svg>
);

// Reset illustration
const ResetIllustration = () => (
  <svg viewBox="0 0 320 280" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="320" height="280" fill="#e8f4fd" rx="8" />
    <circle cx="30" cy="50" r="28" fill="#bbdefb" opacity="0.5" />
    <circle cx="290" cy="230" r="36" fill="#bbdefb" opacity="0.4" />
    <rect x="0" y="230" width="320" height="50" fill="#c8e6c9" />
    <rect x="0" y="240" width="320" height="40" fill="#a5d6a7" />

    {/* Shield */}
    <path d="M160 55 L218 78 L218 130 C218 162 160 185 160 185 C160 185 102 162 102 130 L102 78 Z"
      fill="#1565c0" />
    <path d="M160 62 L212 83 L212 130 C212 158 160 178 160 178 C160 178 108 158 108 130 L108 83 Z"
      fill="#1976d2" />

    {/* Checkmark inside shield */}
    <polyline points="138,122 153,137 182,108"
      fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />

    {/* Stars */}
    <text x="52" y="85" fontSize="18" fill="#fdd835" opacity="0.9">✦</text>
    <text x="258" y="75" fontSize="12" fill="#fdd835" opacity="0.8">✦</text>
    <text x="82" y="190" fontSize="14" fill="#fdd835" opacity="0.7">✦</text>
    <text x="235" y="195" fontSize="10" fill="#90caf9" opacity="0.7">✦</text>

    {/* Lock open below shield */}
    <rect x="140" y="192" width="40" height="30" rx="5" fill="white" stroke="#90caf9" strokeWidth="2" />
    <path d="M148 192 V184 Q160 174 172 184 V188" fill="none" stroke="#90caf9" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="160" cy="206" r="5" fill="#1976d2" />
    <rect x="158" y="208" width="4" height="7" rx="2" fill="#1976d2" />

    {/* Clouds */}
    <ellipse cx="60" cy="35" rx="28" ry="12" fill="white" opacity="0.75" />
    <ellipse cx="80" cy="30" rx="18" ry="9" fill="white" opacity="0.75" />
    <ellipse cx="255" cy="28" rx="24" ry="10" fill="white" opacity="0.65" />
    <ellipse cx="274" cy="23" rx="16" ry="8" fill="white" opacity="0.65" />
  </svg>
);

// ── Step indicator ────────────────────────────────────────────────────────────
const steps = ["Email / ID", "Verify OTP", "Reset Password"];

const StepIndicator = ({ current }) => (
  <div className="flex items-center justify-center gap-0 mb-5">
    {steps.map((label, i) => {
      const done = i < current;
      const active = i === current;
      return (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all
              ${done ? "bg-blue-600 border-blue-600 text-white"
                : active ? "bg-white border-blue-600 text-blue-600"
                : "bg-white border-gray-300 text-gray-400"}`}>
              {done ? (
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : i + 1}
            </div>
            <span className={`text-xs mt-1 font-medium whitespace-nowrap
              ${active ? "text-blue-600" : done ? "text-blue-400" : "text-gray-400"}`}>
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-12 h-0.5 mb-4 mx-1 transition-all ${i < current ? "bg-blue-600" : "bg-gray-200"}`} />
          )}
        </div>
      );
    })}
  </div>
);

// ── OTP Input ─────────────────────────────────────────────────────────────────
const OtpInput = ({ value, onChange }) => {
  const inputs = useRef([]);
  const digits = (value + "      ").slice(0, 6).split("");

  const handleKey = (e, i) => {
    if (e.key === "Backspace") {
      const next = value.slice(0, i) + value.slice(i + 1);
      onChange(next);
      if (i > 0) inputs.current[i - 1]?.focus();
    } else if (/^\d$/.test(e.key)) {
      const next = value.slice(0, i) + e.key + value.slice(i + 1);
      onChange(next.slice(0, 6));
      if (i < 5) inputs.current[i + 1]?.focus();
    }
    e.preventDefault();
  };

  return (
    <div className="flex gap-2 justify-center my-2">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={el => inputs.current[i] = el}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={d.trim()}
          onKeyDown={(e) => handleKey(e, i)}
          onChange={() => {}}
          onFocus={e => e.target.select()}
          className={`w-10 h-12 text-center text-lg font-bold border-2 rounded-lg outline-none transition-all
            ${d.trim() ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-300 bg-white text-gray-800"}
            focus:border-blue-500 focus:ring-1 focus:ring-blue-200`}
        />
      ))}
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
export default function ForgotPassword() {
  const [step, setStep] = useState(0);            // 0 = email, 1 = otp, 2 = reset, 3 = success
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpTimer, setOtpTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);

  // Countdown for resend OTP
  useEffect(() => {
    if (step !== 1) return;
    setOtpTimer(60);
    setCanResend(false);
    const id = setInterval(() => {
      setOtpTimer(t => {
        if (t <= 1) { clearInterval(id); setCanResend(true); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [step]);

  const pwStrength = (() => {
    if (!password) return null;
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  })();

  const strengthLabel = ["Weak", "Fair", "Good", "Strong"];
  const strengthColor = ["bg-red-400", "bg-yellow-400", "bg-blue-400", "bg-green-500"];

  const IllustrationMap = [ForgotIllustration, OtpIllustration, ResetIllustration, ResetIllustration];
  const CurrentIllustration = IllustrationMap[Math.min(step, 2)];

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col relative">

      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1562774053-701939374585?w=1600&q=80')`,
          filter: "blur(3px) brightness(0.65)",
          transform: "scale(1.05)",
        }} />
      <div className="absolute inset-0 bg-blue-900/30" />

      <div className="relative z-10 flex flex-col h-full">

        {/* Card */}
        <div className="flex-1 flex items-center justify-center px-4 py-3 min-h-0">
          <div className="w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{ maxWidth: "820px", maxHeight: "100%" }}>

            {/* Logo header */}
            <div className="flex items-center justify-center gap-3 px-6 py-3 border-b border-gray-100 shrink-0">
              <LogoIcon />
              <div>
                <div className="text-xl font-bold leading-tight">
                  <span className="text-gray-800">Campus</span>
                  <span className="text-blue-600">Connect</span>
                </div>
                <div className="text-xs text-gray-500">Your Smart College Companion</div>
              </div>
            </div>

            {/* Body */}
            <div className="flex flex-1 min-h-0">

              {/* Left — illustration (hidden mobile) */}
              <div className="hidden md:flex flex-col justify-center items-center w-1/2 px-6 py-4 shrink-0">
                <h1 className="text-2xl font-bold text-gray-800 mb-1 self-start">
                  {step === 3 ? "All Done!" : "Forgot Password?"}
                </h1>
                <p className="text-xs text-gray-500 self-start mb-3">
                  {step === 0 && "Enter your registered email or Campus ID to receive a verification code."}
                  {step === 1 && "Check your email / phone for the 6-digit OTP we just sent."}
                  {step === 2 && "Choose a strong new password to secure your account."}
                  {step === 3 && "Your password has been reset successfully."}
                </p>
                <div className="w-full flex-1 min-h-0" style={{ maxHeight: "240px" }}>
                  <CurrentIllustration />
                </div>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px bg-gray-100 self-stretch shrink-0" />

              {/* Right — form */}
              <div className="w-full md:w-1/2 px-6 py-4 flex flex-col justify-center">

                {/* Mobile title */}
                <div className="md:hidden mb-3 text-center">
                  <h1 className="text-xl font-bold text-gray-800">
                    {step === 3 ? "All Done!" : "Forgot Password?"}
                  </h1>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {step === 0 && "Enter your email or Campus ID"}
                    {step === 1 && "Enter the OTP sent to your email"}
                    {step === 2 && "Set a new password"}
                    {step === 3 && "Your password was reset"}
                  </p>
                </div>

                {/* Step indicator — only for steps 0-2 */}
                {step < 3 && <StepIndicator current={step} />}

                {/* ── STEP 0 : Email / ID ─────────────────────────── */}
                {step === 0 && (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center border border-gray-300 rounded-lg bg-white focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-200 transition-all">
                      <span className="pl-3 pr-2"><MailIcon /></span>
                      <input
                        type="text"
                        placeholder="Campus ID / Registered Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="flex-1 py-3 pr-3 bg-transparent text-gray-700 placeholder-gray-400 text-sm focus:outline-none"
                      />
                    </div>

                    <button
                      onClick={() => email.trim() && setStep(1)}
                      className="flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-md text-sm"
                    >
                      Send OTP <ArrowRightIcon />
                    </button>

                    <a href="#" onClick={e => { e.preventDefault(); }}
                      className="flex items-center justify-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 hover:underline transition-colors mt-1">
                      <ArrowLeftIcon /> Back to Login
                    </a>
                  </div>
                )}

                {/* ── STEP 1 : OTP ────────────────────────────────── */}
                {step === 1 && (
                  <div className="flex flex-col gap-3">
                    <p className="text-xs text-center text-gray-500">
                      OTP sent to <span className="font-semibold text-gray-700">{email || "your email"}</span>
                    </p>

                    <OtpInput value={otp} onChange={setOtp} />

                    {/* Timer / resend */}
                    <div className="text-center">
                      {canResend ? (
                        <button
                          onClick={() => { setOtp(""); setStep(1); }}
                          className="text-xs text-blue-600 hover:underline font-medium"
                        >
                          Resend OTP
                        </button>
                      ) : (
                        <p className="text-xs text-gray-400">
                          Resend OTP in <span className="font-semibold text-blue-600">{String(Math.floor(otpTimer/60)).padStart(2,"0")}:{String(otpTimer%60).padStart(2,"0")}</span>
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => otp.length === 6 && setStep(2)}
                      className="flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-md text-sm"
                    >
                      Verify OTP <ArrowRightIcon />
                    </button>

                    <button onClick={() => setStep(0)}
                      className="flex items-center justify-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                      <ArrowLeftIcon /> Change Email / ID
                    </button>
                  </div>
                )}

                {/* ── STEP 2 : New password ────────────────────────── */}
                {step === 2 && (
                  <div className="flex flex-col gap-3">
                    {/* New password */}
                    <div>
                      <div className="flex items-center border border-gray-300 rounded-lg bg-white focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-200 transition-all">
                        <span className="pl-3 pr-2"><LockIcon /></span>
                        <input
                          type={showPw ? "text" : "password"}
                          placeholder="New Password"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          className="flex-1 py-3 bg-transparent text-gray-700 placeholder-gray-400 text-sm focus:outline-none"
                        />
                        <button type="button" onClick={() => setShowPw(p => !p)}
                          className="pr-3 pl-2 text-gray-400 hover:text-gray-600">
                          {showPw ? <EyeIcon /> : <EyeOffIcon />}
                        </button>
                      </div>
                      {/* Strength bar */}
                      {pwStrength !== null && (
                        <div className="mt-1.5 flex items-center gap-2">
                          <div className="flex gap-1 flex-1">
                            {[0,1,2,3].map(i => (
                              <div key={i}
                                className={`h-1 flex-1 rounded-full transition-all ${i < pwStrength ? strengthColor[pwStrength - 1] : "bg-gray-200"}`} />
                            ))}
                          </div>
                          <span className={`text-xs font-medium ${["text-red-500","text-yellow-500","text-blue-500","text-green-600"][pwStrength - 1]}`}>
                            {strengthLabel[pwStrength - 1]}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Confirm password */}
                    <div>
                      <div className={`flex items-center border rounded-lg bg-white transition-all focus-within:ring-1
                        ${confirmPassword && confirmPassword !== password
                          ? "border-red-400 focus-within:border-red-400 focus-within:ring-red-100"
                          : "border-gray-300 focus-within:border-blue-500 focus-within:ring-blue-200"}`}>
                        <span className="pl-3 pr-2"><LockIcon /></span>
                        <input
                          type={showCpw ? "text" : "password"}
                          placeholder="Confirm New Password"
                          value={confirmPassword}
                          onChange={e => setConfirmPassword(e.target.value)}
                          className="flex-1 py-3 bg-transparent text-gray-700 placeholder-gray-400 text-sm focus:outline-none"
                        />
                        <button type="button" onClick={() => setShowCpw(p => !p)}
                          className="pr-3 pl-2 text-gray-400 hover:text-gray-600">
                          {showCpw ? <EyeIcon /> : <EyeOffIcon />}
                        </button>
                      </div>
                      {confirmPassword && confirmPassword !== password && (
                        <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                      )}
                    </div>

                    {/* Password rules */}
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                      {[
                        ["8+ characters", password.length >= 8],
                        ["Uppercase letter", /[A-Z]/.test(password)],
                        ["A number", /[0-9]/.test(password)],
                        ["Special character", /[^A-Za-z0-9]/.test(password)],
                      ].map(([label, met]) => (
                        <div key={label} className="flex items-center gap-1.5">
                          <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0
                            ${met ? "bg-green-500" : "bg-gray-200"}`}>
                            {met && (
                              <svg viewBox="0 0 24 24" className="w-2.5 h-2.5" fill="none" stroke="white" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </div>
                          <span className={`text-xs ${met ? "text-green-600" : "text-gray-400"}`}>{label}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => password && password === confirmPassword && setStep(3)}
                      className="flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-md text-sm mt-1"
                    >
                      Reset Password <ArrowRightIcon />
                    </button>
                  </div>
                )}

                {/* ── STEP 3 : Success ─────────────────────────────── */}
                {step === 3 && (
                  <div className="flex flex-col items-center gap-4 py-4">
                    <CheckCircleIcon />
                    <div className="text-center">
                      <p className="text-base font-bold text-gray-800">Password Reset Successful!</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Your password has been updated. You can now log in with your new password.
                      </p>
                    </div>
                    <button
                      onClick={() => { setStep(0); setEmail(""); setOtp(""); setPassword(""); setConfirmPassword(""); }}
                      className="flex items-center justify-center gap-2 py-3 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-md text-sm"
                    >
                      Back to Login <ArrowRightIcon />
                    </button>
                  </div>
                )}

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