import { Link, useLocation } from 'react-router-dom'

export function Navbar() {
  const { pathname } = useLocation()

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200 shadow-sm">
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="text-brand-700 font-bold text-lg tracking-tight">
          Portfolio
        </Link>
        <div className="flex gap-6 text-sm font-medium">
          <Link
            to="/"
            className={`transition-colors ${pathname === '/' ? 'text-brand-600' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Home
          </Link>
          <Link
            to="/resume"
            className={`transition-colors ${pathname === '/resume' ? 'text-brand-600' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Resume
          </Link>
        </div>
      </div>
    </nav>
  )
}
