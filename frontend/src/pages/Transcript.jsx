
import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Search,
  Copy,
  Check,
  FileText,
  Clock,
  Sparkles,
  BookOpen,
  Brain,
  Play,
  AudioLines,
  ListFilter,
  Download
} from 'lucide-react'

import sampleTranscript from '../data/sampleTranscript'

function Transcript() {
  const { id } = useParams()

  const [search, setSearch] = useState('')
  const [activeSegment, setActiveSegment] = useState(null)
  const [copied, setCopied] = useState(false)

  const transcript = useMemo(() => {
    const term = search.trim().toLowerCase()

    if (!term) return sampleTranscript

    return sampleTranscript.filter(segment =>
      segment.text.toLowerCase().includes(term)
    )
  }, [search])

  const fullTranscript = sampleTranscript
    .map(segment => `[${segment.time}] ${segment.text}`)
    .join('\n\n')

  const copyTranscript = async () => {
    try {
      await navigator.clipboard.writeText(fullTranscript)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const formatDuration = seconds => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60

    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
  }

  const highlightText = text => {
    if (!search.trim()) return text

    const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const parts = text.split(new RegExp(`(${escaped})`, 'gi'))

    return parts.map((part, index) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <mark
          key={index}
          className="bg-amber-400/25 text-amber-200 rounded px-1"
        >
          {part}
        </mark>
      ) : (
        part
      )
    )
  }

  const handleSegmentClick = segment => {
    setActiveSegment(segment.id)
  }

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[500px] bg-indigo-700/20 blur-[150px] rounded-full" />
        <div className="absolute top-[550px] -right-40 w-[450px] h-[450px] bg-violet-700/15 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        {/* INTRODUCTION */}
        <section className="pt-16 sm:pt-20 pb-12">

          <Link
            to="/lectures"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-9"
          >
            <ArrowLeft size={16} />
            Back to lectures
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-7">

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-indigo-300 text-xs font-bold tracking-[0.2em] uppercase mb-6">
                <AudioLines size={16} />
                Your lecture, word by word
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
                Smart <span className="gradient-text">Transcript.</span>
              </h1>

              <p className="text-slate-400 text-base sm:text-lg leading-8 mt-6 max-w-2xl">
                Find any concept in seconds. Search your lecture,
                explore timestamps and revisit the important explanations.
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-7">
                <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs">
                  <BookOpen size={13} />
                  Operating Systems
                </span>

                <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/[0.04] border border-white/10 text-slate-400 text-xs">
                  <Clock size={13} />
                  05:25 minutes
                </span>

                <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
                  <Sparkles size={13} />
                  Sample transcript
                </span>
              </div>
            </div>

            <button
              onClick={copyTranscript}
              className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/15 bg-white/[0.04] text-white text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              {copied ? <Check size={17} /> : <Copy size={17} />}
              {copied ? 'Copied!' : 'Copy transcript'}
            </button>
          </div>
        </section>

        {/* TRANSCRIPT STATS */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-9">
          <div className="glass-card p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-indigo-500/15 flex items-center justify-center text-indigo-300">
              <FileText size={21} />
            </div>
            <div>
              <p className="text-slate-500 text-xs">Transcript segments</p>
              <h3 className="text-white text-xl font-bold mt-1">
                {sampleTranscript.length}
              </h3>
            </div>
          </div>

          <div className="glass-card p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-violet-500/15 flex items-center justify-center text-violet-300">
              <Clock size={21} />
            </div>
            <div>
              <p className="text-slate-500 text-xs">Lecture duration</p>
              <h3 className="text-white text-xl font-bold mt-1">05:25</h3>
            </div>
          </div>

          <div className="glass-card p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Check size={21} />
            </div>
            <div>
              <p className="text-slate-500 text-xs">Transcription status</p>
              <h3 className="text-emerald-400 text-xl font-bold mt-1">
                Completed
              </h3>
            </div>
          </div>
        </section>

        {/* SEARCH */}
        <section className="glass-card p-4 sm:p-5 mb-7">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">

            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type="text"
                value={search}
                onChange={event => setSearch(event.target.value)}
                placeholder="Search words, topics or concepts..."
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-slate-500 outline-none focus:border-indigo-500/60 transition-colors"
              />
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3">
              <span className="text-slate-500 text-xs flex items-center gap-2">
                <ListFilter size={14} />
                {transcript.length} results
              </span>

              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="text-xs text-indigo-300 hover:text-white font-semibold"
                >
                  Clear search
                </button>
              )}
            </div>
          </div>
        </section>

        {/* TRANSCRIPT CONTENT */}
        <section className="glass-card overflow-hidden mb-10">

          {/* HEADER */}
          <div className="px-5 sm:px-7 py-5 border-b border-white/[0.07] flex items-center justify-between gap-4">
            <div>
              <h2 className="text-white font-bold text-lg">
                Lecture transcript
              </h2>
              <p className="text-slate-500 text-xs mt-1">
                Select any segment to highlight it.
              </p>
            </div>

            <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full px-3 py-2 font-semibold">
              <Check size={12} className="inline mr-1" />
              Ready
            </span>
          </div>

          {/* SEGMENTS */}
          <div className="p-4 sm:p-7">
            {transcript.length > 0 ? (
              <div className="space-y-3">
                {transcript.map((segment, index) => {
                  const selected = activeSegment === segment.id

                  return (
                    <button
                      key={segment.id}
                      onClick={() => handleSegmentClick(segment)}
                      className={`w-full text-left flex gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl border transition-all ${
                        selected
                          ? 'bg-indigo-500/10 border-indigo-400/40 shadow-lg shadow-indigo-950/20'
                          : 'bg-white/[0.025] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/15'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2 shrink-0">
                        <span className={`text-xs font-mono font-semibold ${
                          selected ? 'text-indigo-300' : 'text-slate-500'
                        }`}>
                          {segment.time}
                        </span>

                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                          selected
                            ? 'bg-indigo-500 text-white'
                            : 'bg-white/[0.05] text-slate-500'
                        }`}>
                          {selected
                            ? <Play size={13} fill="currentColor" />
                            : <span className="text-[10px]">{index + 1}</span>
                          }
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className={`text-sm sm:text-[15px] leading-7 ${
                          selected ? 'text-white' : 'text-slate-300'
                        }`}>
                          {highlightText(segment.text)}
                        </p>

                        {selected && (
                          <div className="flex items-center gap-2 text-indigo-300 text-[10px] font-semibold mt-3">
                            <Check size={12} />
                            Selected segment
                          </div>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            ) : (
              <div className="py-20 text-center">
                <Search size={30} className="text-slate-600 mx-auto mb-5" />

                <h3 className="text-white font-bold text-lg">
                  No matching text
                </h3>

                <p className="text-slate-500 text-sm mt-2">
                  Try another search term.
                </p>
              </div>
            )}
          </div>

          {/* FOOTER */}
          <div className="px-5 sm:px-7 py-4 border-t border-white/[0.07] flex flex-wrap items-center justify-between gap-3">
            <p className="text-slate-500 text-xs">
              Showing {transcript.length} of {sampleTranscript.length} segments
            </p>

            <button
              onClick={copyTranscript}
              className="text-xs text-indigo-300 hover:text-white font-semibold flex items-center gap-2"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy all text'}
            </button>
          </div>
        </section>

        {/* NEXT STEPS */}
        <section className="pb-24">
          <div className="mb-7">
            <p className="text-indigo-400 text-xs font-bold tracking-widest uppercase">
              Continue learning
            </p>
            <h2 className="text-2xl font-bold text-white mt-3">
              Go beyond the transcript.
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Turn this lecture into more ways to understand and revise.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <Link
              to="/notes"
              className="group glass-card p-6 sm:p-7 hover:border-indigo-500/40 transition-all"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/15 text-indigo-300 flex items-center justify-center">
                  <BookOpen size={23} />
                </div>
                <ArrowRight size={19} className="text-slate-500 group-hover:text-indigo-300 group-hover:translate-x-1 transition-all" />
              </div>

              <h3 className="text-white font-bold text-lg">
                Explore smart notes
              </h3>

              <p className="text-slate-400 text-xs leading-6 mt-3">
                Review key concepts, important points and concise explanations.
              </p>
            </Link>

            <Link
              to="/quiz"
              className="group glass-card p-6 sm:p-7 hover:border-amber-400/40 transition-all"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-amber-400/10 text-amber-300 flex items-center justify-center">
                  <Brain size={23} />
                </div>
                <ArrowRight size={19} className="text-slate-500 group-hover:text-amber-300 group-hover:translate-x-1 transition-all" />
              </div>

              <h3 className="text-white font-bold text-lg">
                Test your knowledge
              </h3>

              <p className="text-slate-400 text-xs leading-6 mt-3">
                Attempt interactive questions and check your understanding.
              </p>
            </Link>

          </div>
        </section>
      </div>
    </div>
  )
}

export default Transcript
