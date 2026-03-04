import { Link, useLocation } from 'react-router';

export function Navbar() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  const isMonitorActive =
    location.pathname === '/monitor' ||
    location.pathname === '/industrial' ||
    location.pathname.startsWith('/stats/');
  
  return (
    <nav className="glass-nav px-4 sm:px-8 py-3 sm:py-4">
      <div className="flex flex-wrap items-center justify-between gap-3 max-w-[1440px] mx-auto">
        <div className="flex items-center gap-2 sm:gap-3">
          <img
            src="https://elementsenergies.com/logo-dark.png"
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
            className={`nav-link ${
              isActive('/')
                ? 'nav-link-active'
                : ''
            }`}
          >
            Overview
          </Link>
          <Link
            to="/monitor"
            className={`nav-link ${
              isMonitorActive
                ? 'nav-link-active'
                : ''
            }`}
          >
            Monitor
          </Link>
        </div>
      </div>
    </nav>
  );
}
