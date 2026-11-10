
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Play,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react'

function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false
  })
  const [message, setMessage] = useState('')

  const handleChange = event => {
    const { name, value, type, checked } = event.target

    setFormData(previous => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    setMessage('')

    if (formData.password.length < 8) {
      setMessage('Password must contain at least 8 characters.')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match.')
      return
    }

    if (!formData.agree) {
      setMessage('Please accept the Terms and Conditions.')
      return
    }

    setMessage(
      'Your form is valid! Account creation will be enabled after backend authentication is connected.'
    )
  }

  const inputClass =
    'w-full bg-white/[0.04] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-slate-500 outline-none focus:border-indigo-500/70 transition-colors'

  return (
    <div className="relative min-h-screen flex items-center justify-center px-5 py-16 overflow-hidden">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-700/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-700/15 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">

        <Link to="/" className="flex justify-center items-center gap-3 mb-9">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <Play size={18} fill="white" />
          </div>
          <span className="text-white font-bold text-xl">
            AI Learning <span className="text-indigo-400">Assistant</span>
          </span>
        </Link>

        <div className="glass-card p-6 sm:p-9">

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-indigo-300 text-xs font-bold tracking-widest uppercase mb-4">
              <Sparkles size={14} />
              Start your learning journey
            </div>

            <h1 className="text-3xl font-extrabold text-white">
              Create your account
            </h1>

            <p className="text-slate-400 text-sm mt-3">
              One account. A smarter way to learn.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Full name
              </label>

              <div className="relative">
                <User size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Email address
              </label>

              <div className="relative">
                <Mail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
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

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Password
              </label>

              <div className="relative">
                <Lock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  className={`${inputClass} pr-12`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Confirm password
              </label>

              <div className="relative">
                <Lock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  required
                  className={`${inputClass} pr-12`}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirmPassword
                    ? <EyeOff size={17} />
                    : <Eye size={17} />
                  }
                </button>
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="mt-1 accent-indigo-500"
              />
              <span className="text-xs text-slate-400 leading-5">
                I agree to the Terms and Conditions and Privacy Policy.
              </span>
            </label>

            {message && (
              <div className="flex gap-2 items-start rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-3 text-xs text-indigo-200 leading-5">
                <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                {message}
              </div>
            )}

            <button
              type="submit"
              className="gradient-button w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-bold text-sm"
            >
              Create account <ArrowRight size={17} />
            </button>
          </form>

          <div className="relative my-7">
            <div className="border-t border-white/10" />
            <span className="absolute left-1/2 -translate-x-1/2 -top-2.5 bg-[#111020] px-3 text-[10px] text-slate-500">
              OR
            </span>
          </div>

          <p className="text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-300 font-semibold hover:text-white">
              Sign in
            </Link>
          </p>
        </div>

        <Link to="/" className="block text-center text-xs text-slate-500 hover:text-white mt-7">
          ← Back to home
        </Link>
      </div>
    </div>
  )
}

export default Register
