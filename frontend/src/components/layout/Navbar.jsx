
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Play, ArrowRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/#features' },
    { name: 'My Lectures', path: '/lectures' },
    { name: 'Quiz', path: '/quiz' }
  ]

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname, location.hash])

  const isLinkActive = (link) => {
    if (link.name === 'Home') {
      return location.pathname === '/' && !location.hash
    }

    if (link.name === 'Features') {
      return location.pathname === '/' && location.hash === '#features'
    }

    return location.pathname === link.path
  }

  return (
    <nav className="relative z-50 px-4 pt-5">
      <div className="max-w-7xl mx-auto">

        {/* Main Floating Navbar */}
        <div className="relative flex items-center justify-between gap-4 rounded-full border border-white/[0.09] bg-[#100d1c]/80 backdrop-blur-2xl px-4 sm:px-6 py-3 shadow-[0_8px_40px_rgba(0,0,0,0.35)]">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.35)]">
              <Play size={17} fill="white" />
            </div>

            <span className="text-white font-bold text-base sm:text-lg tracking-tight">
              AI Learning <span className="text-indigo-400">Assistant</span>
            </span>
          </Link>

          {/* Desktop Segmented Navigation */}
          <div className="hidden lg:flex items-center rounded-full border border-white/[0.07] bg-black/30 p-1.5">

            {links.map((link) => {
              const active = isLinkActive(link)

              return (
                <div key={link.name} className="relative">
                  {link.name === 'Features' ? (
                    <a
                      href="/#features"
                      className={`relative z-10 block px-5 py-2.5 text-sm font-medium transition-colors duration-300 ${
                        active
                          ? 'text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="activeTab"
                          className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 shadow-[0_0_18px_rgba(139,92,246,0.4)]"
                          transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 30
                          }}
                        />
                      )}
                      {link.name}
                    </a>
                  ) : (
                    <NavLink
                      to={link.path}
                      end={link.path === '/'}
                      className={`relative z-10 block px-5 py-2.5 text-sm font-medium transition-colors duration-300 ${
                        active
                          ? 'text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="activeTab"
                          className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 shadow-[0_0_18px_rgba(139,92,246,0.4)]"
                          transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 30
                          }}
                        />
                      )}
                      {link.name}
                    </NavLink>
                  )}
                </div>
              )
            })}

          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <Link
              to="/login"
              className="text-sm font-medium text-slate-300 hover:text-white px-3 py-2 transition-colors"
            >
              Sign in
            </Link>

            <Link
              to="/upload"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-5 py-3 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.25)] transition-all hover:-translate-y-0.5"
            >
              Upload <ArrowRight size={16} />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden mt-3 rounded-3xl border border-white/10 bg-[#100d1c]/95 backdrop-blur-2xl p-4 shadow-2xl"
          >
            <div className="space-y-1">
              {links.map((link) => {
                const active = isLinkActive(link)

                return link.name === 'Features' ? (
                  <a
                    key={link.name}
                    href="/#features"
                    className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      active
                        ? 'bg-indigo-600/20 text-white'
                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </a>
                ) : (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    end={link.path === '/'}
                    className={({ isActive }) =>
                      `block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-indigo-600/20 text-white'
                          : 'text-slate-400 hover:bg-white/5 hover:text-white'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                )
              })}
            </div>

            <div className="border-t border-white/10 mt-3 pt-3 space-y-2">
              <Link
                to="/login"
                className="block text-center text-sm text-slate-300 hover:text-white py-2"
              >
                Sign in
              </Link>

              <Link
                to="/upload"
                className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full py-3 text-sm font-semibold transition-colors"
              >
                Upload a lecture <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        )}

      </div>
    </nav>
  )
}

export default Navbar
