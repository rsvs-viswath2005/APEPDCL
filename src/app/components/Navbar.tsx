import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import {
  CircleUserRound,
  HelpCircle,
  LogOut,
  Mail,
  Phone,
  Settings,
  ShieldCheck,
  X,
} from 'lucide-react';

type OtpField = 'mobile' | 'email';

export function Navbar() {
  const location = useLocation();
  const profileRef = useRef<HTMLDivElement | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [supportTitle, setSupportTitle] = useState('');
  const [supportMessage, setSupportMessage] = useState('');

  const [username, setUsername] = useState('APEPDCL');
  const [mobile, setMobile] = useState('+91 XXXXXXX');
  const [email, setEmail] = useState('support@xxxxxxxx.com');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showOtp, setShowOtp] = useState<Record<OtpField, boolean>>({
    mobile: false,
    email: false,
  });
  const [otpValues, setOtpValues] = useState<Record<OtpField, string>>({
    mobile: '',
    email: '',
  });
  const [verified, setVerified] = useState<Record<OtpField, boolean>>({
    mobile: false,
    email: false,
  });

  useEffect(() => {
    const onDocClick = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener('mousedown', onDocClick);
    }

    return () => {
      document.removeEventListener('mousedown', onDocClick);
    };
  }, [isProfileOpen]);

  const isActive = (path: string) => location.pathname === path;
  const searchParams = new URLSearchParams(location.search);
  const currentTab = searchParams.get('tab');
  const isConsumerActive =
    location.pathname === '/monitor' && (currentTab === null || currentTab === 'commercial');
  const isIndustrialActive =
    location.pathname === '/industrial' ||
    (location.pathname === '/monitor' && currentTab === 'industrial');

  const openSupport = () => {
    setIsProfileOpen(false);
    setIsSupportOpen(true);
  };

  const openSettings = () => {
    setIsProfileOpen(false);
    setIsSettingsOpen(true);
  };

  const showOtpField = (field: OtpField) => {
    setShowOtp((prev) => ({ ...prev, [field]: true }));
    setVerified((prev) => ({ ...prev, [field]: false }));
  };

  const verifyOtp = (field: OtpField) => {
    const isValid = otpValues[field].trim().length >= 4;
    setVerified((prev) => ({ ...prev, [field]: isValid }));
  };

  const OtpBlock = ({
    field,
  }: {
    field: OtpField;
  }) => (
    <div className="space-y-1.5">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={otpValues[field]}
          onChange={(e) => setOtpValues((prev) => ({ ...prev, [field]: e.target.value }))}
          placeholder="Enter OTP"
          className="glass-input flex-1 px-3 py-2 text-sm"
        />
        <button
          type="button"
          onClick={() => verifyOtp(field)}
          className="glass-pill px-3 py-2 text-sm font-semibold"
        >
          Verify
        </button>
      </div>
      {verified[field] && (
        <p className="text-xs text-emerald-600 font-semibold">OTP verified</p>
      )}
    </div>
  );

  return (
    <>
      <nav className="glass-nav px-4 sm:px-8 py-3 sm:py-4">
        <div className="flex flex-wrap items-center justify-between gap-3 max-w-[1440px] mx-auto">
          <div className="flex items-center gap-2 sm:gap-3">
            <img
              src="https://ap.elementsenergies.com/images/eelogo.webp"
              alt="Elements Energies Logo"
              className="h-9 sm:h-10 w-auto object-contain"
              loading="eager"
            />
            <div className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900">
              APEPDCL Dashboard
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'nav-link-active' : ''}`}
            >
              Overview
            </Link>
            <Link
              to="/monitor?tab=commercial"
              className={`nav-link ${isConsumerActive ? 'nav-link-active' : ''}`}
            >
              Consumer
            </Link>
            <Link
              to="/monitor?tab=industrial"
              className={`nav-link ${isIndustrialActive ? 'nav-link-active' : ''}`}
            >
              Industrial
            </Link>

            <div className="relative" ref={profileRef}>
              <button
                type="button"
                className="p-2 rounded-full bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
                onClick={() => setIsProfileOpen((prev) => !prev)}
                aria-label="Profile menu"
              >
                <CircleUserRound className="w-5 h-5 text-slate-700" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 w-[240px] bg-white border border-slate-200 rounded-xl p-2 z-50 shadow-lg">
                  <div className="px-2 py-2">
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Account</p>
                    <p className="text-sm font-bold text-slate-900">APEPDCL</p>
                  </div>
                  <div className="h-px bg-slate-300/70 my-1" />
                  <button
                    type="button"
                    onClick={openSupport}
                    className="w-full text-left px-2 py-2 rounded-lg hover:bg-white/80 text-slate-800 text-sm flex items-center gap-2"
                  >
                    <HelpCircle className="w-4 h-4" />
                    Help & Support
                  </button>
                  <button
                    type="button"
                    onClick={openSettings}
                    className="w-full text-left px-2 py-2 rounded-lg hover:bg-white/80 text-slate-800 text-sm flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsProfileOpen(false)}
                    className="w-full text-left px-2 py-2 rounded-lg hover:bg-white/80 text-red-600 text-sm flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {isSupportOpen && (
        <div className="fixed inset-0 bg-slate-950/35 backdrop-blur-[2px] z-[60] flex items-center justify-center p-3">
          <div className="bg-white border border-slate-200 w-full max-w-[720px] rounded-2xl p-4 sm:p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-extrabold text-slate-900">Help & Support</h3>
              <button
                type="button"
                className="glass-pill p-1.5"
                onClick={() => setIsSupportOpen(false)}
              >
                <X className="w-4 h-4 text-slate-700" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-semibold text-slate-700">Title</label>
                <input
                  type="text"
                  value={supportTitle}
                  onChange={(e) => setSupportTitle(e.target.value)}
                  className="glass-input mt-1 w-full px-3 py-2"
                  placeholder="Enter support title"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">Message</label>
                <textarea
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  className="glass-input mt-1 w-full px-3 py-2 min-h-[110px]"
                  placeholder="Describe your issue"
                />
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-3">
                <p className="text-sm font-semibold text-slate-800 mb-2">Contact details</p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm text-slate-700">
                  <p className="flex items-center gap-2"><Mail className="w-4 h-4" />support@xxxxxxxx.com</p>
                  <p className="flex items-center gap-2"><Phone className="w-4 h-4" />+91 xxxxxxx</p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  className="glass-pill px-4 py-2 text-sm font-semibold"
                  onClick={() => setIsSupportOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="glass-pill glass-pill-active px-4 py-2 text-sm font-semibold"
                  onClick={() => setIsSupportOpen(false)}
                >
                  Send Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isSettingsOpen && (
        <div className="fixed inset-0 bg-slate-950/35 backdrop-blur-[2px] z-[60] flex items-center justify-center p-3">
          <div className="bg-white border border-slate-200 w-full max-w-[760px] rounded-2xl p-4 sm:p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-extrabold text-slate-900">Settings</h3>
              <button
                type="button"
                className="glass-pill p-1.5"
                onClick={() => setIsSettingsOpen(false)}
              >
                <X className="w-4 h-4 text-slate-700" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="glass-input w-full px-3 py-2"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Mobile</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="glass-input flex-1 px-3 py-2"
                  />
                  <button type="button" className="glass-pill px-3 py-2 text-sm font-semibold" onClick={() => showOtpField('mobile')}>
                    OTP
                  </button>
                </div>
                {showOtp.mobile && <OtpBlock field="mobile" />}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Email Address</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="glass-input flex-1 px-3 py-2"
                  />
                  <button type="button" className="glass-pill px-3 py-2 text-sm font-semibold" onClick={() => showOtpField('email')}>
                    OTP
                  </button>
                </div>
                {showOtp.email && <OtpBlock field="email" />}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="glass-input w-full px-3 py-2"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="glass-input w-full px-3 py-2"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  className="glass-pill px-4 py-2 text-sm font-semibold"
                  onClick={() => setIsSettingsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="glass-pill glass-pill-active px-4 py-2 text-sm font-semibold inline-flex items-center gap-1.5"
                  onClick={() => setIsSettingsOpen(false)}
                >
                  <ShieldCheck className="w-4 h-4" />
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
