
import { Link, NavLink } from 'react-router-dom'
import { Play, ArrowRight, Menu, X } from 'lucide-react'
import { useState } from 'react'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/#features' },
    { name: 'My Lectures', path: '/lectures' },
    { name: 'Quiz', path: '/quiz' }
  ]

  return (
    <nav className="relative z-50 border-b border-white/[0.06] bg-[#060411]/75 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">

        <Link to="/" className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <Play size={18} fill="white" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            AI Learning <span className="text-indigo-400">Assistant</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            link.name === 'Features' ? (
              <a
                key={link.name}
                href="/#features"
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ) : (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                  }`
                }
              >
                {link.name}
              </NavLink>
            )
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm font-medium text-slate-300 hover:text-white px-3 py-2 transition-colors"
          >
            Sign in
          </Link>

          <Link
            to="/upload"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-5 py-3 rounded-full shadow-lg shadow-indigo-600/20 transition-all hover:-translate-y-0.5"
          >
            Upload a lecture <ArrowRight size={16} />
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white p-2"
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0b0818] px-6 py-5 space-y-4">
          {links.map(link => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className="block text-sm text-slate-300 hover:text-white"
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/upload"
            onClick={() => setMenuOpen(false)}
            className="block text-center bg-indigo-600 rounded-full py-3 text-sm font-semibold"
          >
            Upload a lecture →
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
