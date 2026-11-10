
import {
  ArrowRight,
  Play,
  Sparkles,
  FileText,
  Brain,
  MessageCircle,
  Clock,
  Search,
  Zap,
  Upload,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Code2,
  Copy,
  AudioLines,
  WandSparkles,
  Layers3,
  ChevronRight
} from 'lucide-react'
import { Link } from 'react-router-dom'

function Landing() {
  const features = [
    {
      icon: FileText,
      title: 'Smart Transcripts',
      description: 'Search every word with accurate timestamps. Jump directly to the concept you need.',
      tags: ['Timestamps', 'Copy'],
      action: 'Open transcript',
      path: '/transcript',
      type: 'transcript'
    },
    {
      icon: BookOpen,
      title: 'AI Summaries',
      description: 'Turn lengthy lectures into concise revision notes and detailed explanations.',
      tags: ['Short', 'Detailed'],
      action: 'Read summary',
      path: '/notes',
      type: 'summary'
    },
    {
      icon: Brain,
      title: 'Interactive Quizzes',
      description: 'Test your understanding with questions based on your actual lecture content.',
      tags: ['5 Questions', 'Score'],
      action: 'Take quiz',
      path: '/quiz',
      type: 'quiz'
    },
    {
      icon: MessageCircle,
      title: 'AI Study Tutor',
      description: 'Ask questions, clear doubts and explore difficult topics with your AI tutor.',
      tags: ['Lecture-aware', 'Instant'],
      action: 'Start chatting',
      path: '/chat',
      type: 'chat'
    }
  ]

  const capabilities = [
    'Drag and drop',
    'Timestamps',
    'Key points',
    'MP4 video',
    'MP3 audio',
    'WAV audio',
    'Ask anything',
    'Track progress',
    'Copy notes',
    'Revisit lectures',
    'Summarise',
    'Quiz yourself'
  ]

  const demoLectures = [
    {
      title: 'DBMS Lecture',
      subject: 'Database Management Systems',
      status: 'Completed',
      icon: Layers3,
      color: 'text-indigo-400',
      bg: 'from-indigo-600/30 to-violet-900/20'
    },
    {
      title: 'Database',
      subject: 'Database Fundamentals',
      status: 'Processing',
      icon: Brain,
      color: 'text-amber-400',
      bg: 'from-amber-500/20 to-orange-900/20'
    },
    {
      title: 'Operating System',
      subject: 'Process Management',
      status: 'Completed',
      icon: Code2,
      color: 'text-violet-400',
      bg: 'from-violet-600/30 to-purple-900/20'
    }
  ]

  return (
    <div className="overflow-hidden">

      {/* HERO */}
      <section className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-16 lg:pt-28 lg:pb-24">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-32 right-0 w-80 h-80 bg-violet-600/15 rounded-full blur-[130px] pointer-events-none" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-[0.2em] uppercase mb-7">
              <Sparkles size={15} />
              Upload. Learn. Ask. Grow.
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[66px] font-extrabold text-white leading-[1.13] tracking-tight mb-8">
              Turn any lecture into{' '}
              <span className="inline-block border border-amber-400/40 bg-amber-400/10 px-3 py-1 rounded-xl text-amber-300">
                notes, quizzes
              </span>{' '}
              and answers.
            </h1>

            <p className="text-slate-400 text-base sm:text-lg leading-8 max-w-xl mb-10">
              Drop in a video or audio file. Get a timestamped transcript,
              a summary, a quiz and an AI tutor that knows your lecture.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/upload"
                className="gradient-button inline-flex items-center gap-3 text-white font-semibold px-7 py-4 rounded-full text-sm sm:text-base shadow-xl shadow-indigo-600/30"
              >
                Start learning <ArrowRight size={19} />
              </Link>

              <a
                href="#features"
                className="inline-flex items-center gap-3 border border-white/15 hover:border-white/40 text-slate-200 font-medium px-7 py-4 rounded-full text-sm sm:text-base backdrop-blur-sm transition-all"
              >
                <Play size={17} /> Explore features
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-6 mt-12 text-xs text-slate-500">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-emerald-400" />
                One upload, four tools
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-emerald-400" />
                Learn at your own pace
              </span>
            </div>
          </div>

          {/* RIGHT PREVIEW */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-indigo-600/20 blur-[90px] rounded-full" />

            <div className="relative bg-slate-900/80 border border-white/10 rounded-3xl p-5 sm:p-7 shadow-2xl shadow-indigo-950/50 backdrop-blur-xl transform lg:rotate-1 hover:rotate-0 transition-transform duration-500">

              <div className="flex flex-wrap items-center justify-between gap-3 mb-7">
                <span className="bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 text-xs px-3 py-2 rounded-full font-medium">
                  <Sparkles size={12} className="inline mr-1" />
                  Quiz ready: 5 questions
                </span>

                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-3 py-2 rounded-full font-medium">
                  <CheckCircle2 size={12} className="inline mr-1" />
                  Completed
                </span>
              </div>

              <div className="flex items-center gap-5 border-b border-white/10 mb-5 overflow-x-auto">
                <span className="text-white text-xs font-semibold border-b-2 border-indigo-500 pb-3 whitespace-nowrap">
                  Transcript
                </span>
                <span className="text-slate-500 text-xs pb-3 whitespace-nowrap">Summary</span>
                <span className="text-slate-500 text-xs pb-3 whitespace-nowrap">Quiz</span>
                <span className="text-slate-500 text-xs pb-3 whitespace-nowrap">AI Chat</span>
              </div>

              <div className="space-y-3">
                {[
                  ['00:12', 'Introduction to process management'],
                  ['01:34', 'Understanding process states'],
                  ['02:48', 'Process Control Block (PCB)'],
                  ['04:16', 'Context switching explained']
                ].map((item, index) => (
                  <div
                    key={item[0]}
                    className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.05] rounded-xl px-3 py-3"
                  >
                    <span className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" />
                    <span className="text-indigo-300 text-xs font-mono">{item[0]}</span>
                    <span className="text-slate-300 text-xs">{item[1]}</span>
                    {index === 0 && <Play size={13} className="ml-auto text-slate-500" />}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
                <div className="w-9 h-9 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-300">
                  <Brain size={18} />
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">AI generated learning material</p>
                  <p className="text-slate-500 text-[11px] mt-1">Transcript, notes and quiz ready</p>
                </div>
                <CheckCircle2 size={17} className="ml-auto text-emerald-400" />
              </div>
            </div>

            {/* FLOATING NOTIFICATION */}
            <div className="hidden sm:flex absolute -bottom-7 -right-4 lg:-right-8 bg-amber-400 text-slate-950 text-xs font-bold px-5 py-4 rounded-xl shadow-2xl items-center gap-3 border border-amber-300">
              <MessageCircle size={17} />
              "What is an array?" answered
            </div>
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            {
              value: '4 tools',
              description: 'Transcript, summary, quiz and chat for every lecture',
              accent: false
            },
            {
              value: '2 summaries',
              description: 'Short for revision, detailed for deep study',
              accent: false
            },
            {
              value: '1 upload',
              description: 'Everything else is generated for you',
              accent: true
            }
          ].map(item => (
            <div
              key={item.value}
              className={`rounded-2xl p-7 border ${
                item.accent
                  ? 'bg-indigo-600 border-indigo-500 shadow-xl shadow-indigo-600/20'
                  : 'bg-slate-900/40 border-white/10'
              }`}
            >
              <h3 className="text-3xl font-extrabold text-white mb-2">{item.value}</h3>
              <p className={`text-xs leading-6 ${item.accent ? 'text-indigo-100' : 'text-slate-400'}`}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CAPABILITY TICKER */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-wrap justify-center gap-3">
          {capabilities.map(item => (
            <span
              key={item}
              className="bg-slate-900/60 border border-white/10 px-4 py-2.5 rounded-full text-xs text-slate-400 hover:text-white hover:border-indigo-500/50 transition-all"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="section-anchor max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-indigo-400 text-xs font-bold tracking-[0.2em] uppercase">
            Everything in one place
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-5 mb-5 tracking-tight">
            One lecture. <span className="gradient-text">Four ways</span> to learn it.
          </h2>
          <p className="text-slate-400 leading-7">
            Stop going through hours of recordings. Focus on understanding,
            revising and mastering what matters.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(feature => {
            const Icon = feature.icon

            return (
              <div
                key={feature.title}
                className="group bg-slate-900/50 border border-white/10 rounded-2xl p-5 hover:border-indigo-500/50 hover:-translate-y-2 transition-all duration-300 flex flex-col"
              >
                {/* PREVIEW */}
                <div className="bg-slate-950/80 border border-white/5 rounded-xl p-4 mb-6 h-44 flex flex-col justify-between overflow-hidden">
                  {feature.type === 'transcript' && (
                    <>
                      <div className="flex items-center justify-between">
                        <div className="w-9 h-9 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center">
                          <Code2 size={20} />
                        </div>
                        <span className="text-[10px] text-emerald-400">● Live transcript</span>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[10px] text-indigo-300 font-mono">00:12 <span className="text-slate-400">Process management...</span></p>
                        <p className="text-[10px] text-indigo-300 font-mono">01:34 <span className="text-slate-400">Process states...</span></p>
                        <p className="text-[10px] text-indigo-300 font-mono">02:48 <span className="text-slate-400">PCB structure...</span></p>
                      </div>
                    </>
                  )}

                  {feature.type === 'summary' && (
                    <>
                      <div className="flex items-center gap-2 text-amber-300">
                        <BookOpen size={19} />
                        <span className="text-xs font-bold">Key concepts</span>
                      </div>
                      <div className="bg-amber-50/10 border border-amber-300/20 p-3 rounded-lg space-y-3">
                        <p className="text-amber-200 text-xs font-semibold">01. Process states</p>
                        <p className="text-amber-100/70 text-[10px]">02. Process Control Block</p>
                        <p className="text-amber-100/70 text-[10px]">03. Context switching</p>
                      </div>
                    </>
                  )}

                  {feature.type === 'quiz' && (
                    <>
                      <p className="text-white text-xs font-bold">Q1. What is an array?</p>
                      <div className="space-y-2">
                        {['A. Collection of elements', 'B. A loop', 'C. A function'].map((option, i) => (
                          <div
                            key={option}
                            className={`px-3 py-2 rounded-lg text-[10px] ${
                              i === 0
                                ? 'bg-amber-300 text-slate-950 font-semibold'
                                : 'bg-white/5 text-slate-400'
                            }`}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {feature.type === 'chat' && (
                    <>
                      <div className="bg-indigo-950/80 border border-indigo-500/30 rounded-lg p-3">
                        <p className="text-indigo-200 text-[10px]">What is an array?</p>
                      </div>
                      <div className="bg-white/5 border border-white/5 rounded-lg p-3 ml-5">
                        <p className="text-slate-300 text-[10px] leading-5">
                          An array stores multiple elements of the same type...
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-indigo-300 text-[10px]">
                        <Sparkles size={13} /> Lecture-aware AI response
                      </div>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-500/15 flex items-center justify-center text-indigo-300">
                    <Icon size={19} />
                  </div>
                  <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                </div>

                <p className="text-slate-400 text-xs leading-6 mb-5 flex-1">
                  {feature.description}
                </p>

                <div className="flex gap-2 mb-5">
                  {feature.tags.map(tag => (
                    <span key={tag} className="text-[10px] text-slate-400 border border-white/10 px-2 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  to={feature.path}
                  className="w-full bg-white text-slate-950 font-semibold py-3 rounded-xl text-sm text-center hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                >
                  {feature.action} <ChevronRight size={15} />
                </Link>
              </div>
            )
          })}
        </div>
      </section>

      {/* RECENT LECTURES — LIGHT SECTION */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mt-12 mb-24">
        <div className="bg-slate-100 text-slate-900 py-12 sm:py-16 px-6 sm:px-10 lg:px-12 rounded-[2rem] sm:rounded-[2.5rem]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">
            <div>
              <span className="text-indigo-600 font-bold text-xs tracking-widest uppercase">
                Your learning library
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold mt-3 tracking-tight">
                Pick up where you left off
              </h2>
              <p className="text-slate-600 text-sm mt-3">
                Your lectures stay in one place, with their status.
              </p>
            </div>

            <Link
              to="/lectures"
              className="inline-flex items-center gap-2 text-indigo-700 font-semibold text-sm hover:gap-3 transition-all"
            >
              View all lectures <ArrowRight size={17} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {demoLectures.map(lecture => {
              const Icon = lecture.icon

              return (
                <div key={lecture.title} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                  <div className={`h-32 bg-gradient-to-br ${lecture.bg} flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute w-36 h-36 bg-white/10 rounded-full blur-2xl" />
                    <div className="relative w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                      <Icon size={27} className={lecture.color} />
                    </div>
                    <span className={`absolute top-3 right-3 text-[10px] font-semibold px-3 py-1 rounded-full ${
                      lecture.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800 animate-pulse'
                    }`}>
                      {lecture.status}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="text-slate-900 font-bold">{lecture.title}</h3>
                    <p className="text-slate-500 text-xs mt-2">{lecture.subject}</p>
                    <Link
                      to="/lectures"
                      className="mt-5 flex items-center justify-between text-xs text-indigo-700 font-semibold"
                    >
                      View lecture <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              )
            })}

            <Link
              to="/upload"
              className="border-2 border-dashed border-slate-300 rounded-2xl p-6 flex flex-col items-center justify-center text-center bg-slate-50 hover:bg-white hover:border-indigo-400 transition-all min-h-60"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                <Upload size={22} />
              </div>
              <h3 className="font-bold text-slate-900">Upload new lecture</h3>
              <p className="text-slate-500 text-xs mt-2 leading-5">
                Add a video or audio file to start learning.
              </p>
              <span className="bg-indigo-600 text-white text-xs font-semibold px-5 py-2.5 rounded-lg mt-5">
                Choose file
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
        <div className="relative overflow-hidden bg-indigo-600 rounded-3xl p-8 sm:p-12 lg:p-14 flex flex-col sm:flex-row items-center justify-between gap-8 shadow-2xl shadow-indigo-600/20">
          <div className="absolute -top-28 -right-20 w-80 h-80 bg-violet-400/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-28 -left-20 w-72 h-72 bg-indigo-900/40 rounded-full blur-3xl" />

          <div className="relative max-w-xl">
            <span className="text-indigo-200 text-xs font-bold tracking-widest uppercase">
              Start learning differently
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 leading-tight">
              Your next lecture is ready to be understood.
            </h2>
          </div>

          <Link
            to="/register"
            className="relative shrink-0 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-8 py-4 rounded-full text-sm sm:text-base whitespace-nowrap shadow-lg transition-all hover:scale-105 flex items-center gap-2"
          >
            Create free account <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-5">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center">
              <Play size={17} fill="white" />
            </div>
            <span className="text-white font-bold">AI Learning Assistant</span>
          </Link>

          <p className="text-slate-500 text-xs text-center">
            Learn smarter. Understand better. © 2026 AI Learning Assistant.
          </p>

          <div className="flex gap-5 text-xs text-slate-400">
            <a href="#features" className="hover:text-white">Features</a>
            <Link to="/lectures" className="hover:text-white">Lectures</Link>
            <Link to="/chat" className="hover:text-white">AI Tutor</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing
