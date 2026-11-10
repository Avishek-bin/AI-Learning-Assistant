
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Play,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react'

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  })
  const [message, setMessage] = useState('')

  const handleChange = event => {
    const { name, value, checked, type } = event.target

    setFormData(previous => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    setMessage(
      'Login form validated! Sign-in will work once backend authentication is connected.'
    )
  }

  const inputClass =
    'w-full bg-white/[0.04] border border-white/10 rounded-xl py-3.5 pl-12 pr-12 text-sm text-white placeholder:text-slate-500 outline-none focus:border-indigo-500/70 transition-colors'

  return (
    <div className="relative min-h-screen flex items-center justify-center px-5 py-16 overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[550px] h-[550px] bg-indigo-700/25 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-700/15 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">

        {/* BRAND */}
        <Link to="/" className="flex justify-center items-center gap-3 mb-9">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <Play size={18} fill="white" />
          </div>

          <span className="text-white font-bold text-xl">
            AI Learning <span className="text-indigo-400">Assistant</span>
          </span>
        </Link>

        {/* LOGIN CARD */}
        <div className="glass-card p-6 sm:p-9">

          <div className="text-center mb-9">
            <div className="inline-flex items-center gap-2 text-indigo-300 text-xs font-bold tracking-widest uppercase mb-4">
              <Sparkles size={14} />
              Welcome back
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Let's get learning.
            </h1>

            <p className="text-slate-400 text-sm mt-3 leading-6">
              Sign in to continue where you left off.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* EMAIL */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Email address
              </label>

              <div className="relative">
                <Mail
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold text-slate-300">
                  Password
                </label>
              </div>

              <div className="relative">
                <Lock
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className={inputClass}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword
                    ? <EyeOff size={17} />
                    : <Eye size={17} />
                  }
                </button>
              </div>
            </div>

            {/* REMEMBER ME */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="accent-indigo-500 w-4 h-4"
              />

              <span className="text-xs text-slate-400">
                Remember me
              </span>
            </label>

            {/* FORM MESSAGE */}
            {message && (
              <div className="flex items-start gap-2 rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-3 text-xs text-indigo-200 leading-5">
                <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                {message}
              </div>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              className="gradient-button w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-bold text-sm"
            >
              Sign in <ArrowRight size={17} />
            </button>
          </form>

          {/* REGISTER LINK */}
          <div className="relative my-8">
            <div className="border-t border-white/10" />
            <span className="absolute left-1/2 -translate-x-1/2 -top-2.5 bg-[#111020] px-3 text-[10px] text-slate-500">
              NEW HERE?
            </span>
          </div>

          <p className="text-center text-sm text-slate-400">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-indigo-300 font-semibold hover:text-white transition-colors"
            >
              Create an account
            </Link>
          </p>
        </div>

        <Link
          to="/"
          className="block text-center text-xs text-slate-500 hover:text-white mt-7 transition-colors"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  )
}

export default Login
