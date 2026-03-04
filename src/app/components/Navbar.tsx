import { Link, useLocation } from 'react-router';

export function Navbar() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between max-w-[1440px] mx-auto">
        <div className="text-xl font-semibold text-gray-900">
          APEPDCL Dashboard
        </div>
        <div className="flex gap-8">
          <Link
            to="/"
            className={`px-4 py-2 rounded-lg transition-colors ${
              isActive('/')
                ? 'bg-purple-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Overview
          </Link>
          <Link
            to="/industrial"
            className={`px-4 py-2 rounded-lg transition-colors ${
              isActive('/industrial')
                ? 'bg-purple-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Industrial
          </Link>
          <Link
            to="/tariff"
            className={`px-4 py-2 rounded-lg transition-colors ${
              isActive('/tariff')
                ? 'bg-purple-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Commercial
          </Link>
        </div>
      </div>
    </nav>
  );
}