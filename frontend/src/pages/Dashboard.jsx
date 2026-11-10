
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Search,
  Upload,
  FileVideo,
  Clock,
  CalendarDays,
  CheckCircle2,
  LoaderCircle,
  BookOpen,
  Play,
  ArrowUpRight,
  RefreshCw,
  Sparkles,
  SlidersHorizontal,
  FileText
} from 'lucide-react'
import { fetchLectures } from '../features/lectures/lectureSlice'

function Dashboard() {
  const dispatch = useDispatch()

  const { lectures, loading, error } = useSelector(
    state => state.lectures
  )

  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [sortOrder, setSortOrder] = useState('newest')

  useEffect(() => {
    dispatch(fetchLectures())
  }, [dispatch])

  const getStatus = lecture => {
    const status = (lecture.status || '').toLowerCase()

    if (['processed', 'completed'].includes(status)) {
      return 'completed'
    }

    if (status === 'failed') {
      return 'failed'
    }

    return 'processing'
  }

  const filteredLectures = useMemo(() => {
    let result = [...lectures]

    if (search.trim()) {
      const term = search.toLowerCase()

      result = result.filter(lecture =>
        `${lecture.title || ''} ${lecture.subject || ''}`
          .toLowerCase()
          .includes(term)
      )
    }

    if (activeFilter !== 'all') {
      result = result.filter(
        lecture => getStatus(lecture) === activeFilter
      )
    }

    result.sort((a, b) => {
      const dateA = new Date(a.date || a.createdAt || 0).getTime()
      const dateB = new Date(b.date || b.createdAt || 0).getTime()

      return sortOrder === 'newest'
        ? dateB - dateA
        : dateA - dateB
    })

    return result
  }, [lectures, search, activeFilter, sortOrder])

  const completedCount = lectures.filter(
    lecture => getStatus(lecture) === 'completed'
  ).length

  const processingCount = lectures.filter(
    lecture => getStatus(lecture) === 'processing'
  ).length

  const stats = [
    {
      title: 'Total lectures',
      value: lectures.length,
      icon: FileVideo,
      color: 'text-indigo-300',
      background: 'bg-indigo-500/15'
    },
    {
      title: 'Completed',
      value: completedCount,
      icon: CheckCircle2,
      color: 'text-emerald-400',
      background: 'bg-emerald-500/10'
    },
    {
      title: 'Processing',
      value: processingCount,
      icon: LoaderCircle,
      color: 'text-amber-400',
      background: 'bg-amber-500/10'
    }
  ]

  const formatDate = date => {
    if (!date) return 'Recently added'

    const parsedDate = new Date(date)

    if (Number.isNaN(parsedDate.getTime())) {
      return 'Recently added'
    }

    return parsedDate.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const formatDuration = duration => {
    if (!duration) return 'Duration unavailable'

    const minutes = Math.floor(duration / 60)
    const seconds = Math.floor(duration % 60)

    return `${minutes}:${String(seconds).padStart(2, '0')} min`
  }

  const filters = [
    { label: 'All lectures', value: 'all' },
    { label: 'Completed', value: 'completed' },
    { label: 'Processing', value: 'processing' }
  ]

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[500px] bg-indigo-700/20 blur-[150px] rounded-full" />
        <div className="absolute top-[500px] -right-40 w-[450px] h-[450px] bg-violet-700/10 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        {/* INTRODUCTION */}
        <section className="pt-20 sm:pt-24 pb-14">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">

            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-indigo-300 text-xs font-bold tracking-[0.2em] uppercase mb-6">
                <Sparkles size={15} />
                Your learning workspace
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
                My <span className="gradient-text">Lectures.</span>
              </h1>

              <p className="text-slate-400 text-base sm:text-lg leading-8 mt-6 max-w-xl">
                Every lecture, every insight, all in one place.
                Pick up where you left off and keep learning at your own pace.
              </p>
            </div>

            <Link
              to="/upload"
              className="gradient-button inline-flex items-center justify-center gap-3 text-white font-semibold px-7 py-4 rounded-full shadow-xl shadow-indigo-600/25 shrink-0"
            >
              <Upload size={18} />
              Upload a lecture
              <ArrowUpRight size={17} />
            </Link>

          </div>
        </section>

        {/* STATISTICS */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
          {stats.map(stat => {
            const Icon = stat.icon

            return (
              <div
                key={stat.title}
                className="glass-card p-6 flex items-center justify-between hover:border-indigo-500/30 transition-colors"
              >
                <div>
                  <p className="text-sm text-slate-400">{stat.title}</p>
                  <h2 className="text-3xl font-bold text-white mt-3">
                    {stat.value}
                  </h2>
                </div>

                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.background} ${stat.color}`}>
                  <Icon size={23} />
                </div>
              </div>
            )
          })}
        </section>

        {/* LECTURES SECTION */}
        <section className="pb-24">

          {/* SECTION HEADING */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-7">
            <div>
              <p className="text-indigo-400 text-xs font-bold uppercase tracking-[0.18em]">
                Your library
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-3">
                All lectures
              </h2>
              <p className="text-slate-500 text-sm mt-2">
                Manage and revisit your uploaded learning material.
              </p>
            </div>

            <button
              onClick={() => dispatch(fetchLectures())}
              disabled={loading}
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors disabled:opacity-50"
            >
              <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>

          {/* SEARCH AND FILTERS */}
          <div className="glass-card p-3 sm:p-4 mb-7">
            <div className="flex flex-col lg:flex-row gap-4 justify-between">

              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="text"
                  value={search}
                  onChange={event => setSearch(event.target.value)}
                  placeholder="Search lectures or subjects..."
                  className="w-full bg-white/[0.04] border border-white/[0.07] rounded-xl py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-slate-500 outline-none focus:border-indigo-500/60 transition-colors"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 mr-1 text-slate-500">
                  <SlidersHorizontal size={15} />
                  <span className="text-xs">Filter</span>
                </div>

                {filters.map(filter => (
                  <button
                    key={filter.value}
                    onClick={() => setActiveFilter(filter.value)}
                    className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                      activeFilter === filter.value
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                        : 'bg-white/[0.04] text-slate-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}

                <select
                  value={sortOrder}
                  onChange={event => setSortOrder(event.target.value)}
                  className="bg-[#171426] border border-white/10 text-slate-300 text-xs rounded-lg px-3 py-2.5 outline-none"
                >
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                </select>
              </div>
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-6 border border-red-500/20 bg-red-500/10 rounded-xl p-4 text-sm text-red-300">
              {error}
            </div>
          )}

          {/* LOADING */}
          {loading && lectures.length === 0 && (
            <div className="py-24 flex flex-col items-center justify-center text-center">
              <LoaderCircle size={35} className="text-indigo-400 animate-spin mb-5" />
              <p className="text-white font-medium">Loading your lectures...</p>
              <p className="text-slate-500 text-sm mt-2">Getting your library ready.</p>
            </div>
          )}

          {/* EMPTY STATE */}
          {!loading && filteredLectures.length === 0 && (
            <div className="glass-card py-20 px-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-6">
                {search || activeFilter !== 'all'
                  ? <Search size={27} className="text-indigo-300" />
                  : <FileVideo size={27} className="text-indigo-300" />
                }
              </div>

              <h3 className="text-xl font-bold text-white">
                {search || activeFilter !== 'all'
                  ? 'No matching lectures'
                  : 'Your library is waiting'
                }
              </h3>

              <p className="text-slate-400 text-sm mt-3 max-w-md mx-auto leading-6">
                {search || activeFilter !== 'all'
                  ? 'Try changing your search or selecting another filter.'
                  : 'Upload your first lecture and transform it into notes, quizzes and interactive learning.'
                }
              </p>

              {search || activeFilter !== 'all' ? (
                <button
                  onClick={() => {
                    setSearch('')
                    setActiveFilter('all')
                  }}
                  className="mt-6 text-indigo-300 text-sm font-semibold hover:text-white"
                >
                  Clear filters
                </button>
              ) : (
                <Link
                  to="/upload"
                  className="gradient-button inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold mt-7"
                >
                  <Upload size={16} /> Upload your first lecture
                </Link>
              )}
            </div>
          )}

          {/* LECTURE GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {filteredLectures.map(lecture => {
              const id = lecture._id || lecture.id
              const status = getStatus(lecture)
              const isCompleted = status === 'completed'
              const isFailed = status === 'failed'
              const Icon = isCompleted ? FileText : FileVideo

              return (
                <article
                  key={id}
                  className="group bg-slate-900/65 border border-white/[0.08] rounded-2xl overflow-hidden hover:border-indigo-500/50 hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-black/10"
                >
                  {/* THUMBNAIL */}
                  <div className="h-40 relative overflow-hidden bg-gradient-to-br from-indigo-950 via-[#17112e] to-[#0c0b19] flex items-center justify-center">
                    <div className="absolute -top-16 -left-10 w-52 h-52 rounded-full bg-indigo-600/20 blur-3xl" />
                    <div className="absolute -bottom-20 -right-10 w-52 h-52 rounded-full bg-violet-600/20 blur-3xl" />

                    <div className="relative w-16 h-16 rounded-2xl bg-white/[0.07] border border-white/10 flex items-center justify-center text-indigo-300 group-hover:scale-110 transition-transform duration-300">
                      <Icon size={30} />
                    </div>

                    <div className="absolute top-4 left-4">
                      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-semibold border ${
                        isCompleted
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                          : isFailed
                            ? 'bg-red-500/10 border-red-500/20 text-red-400'
                            : 'bg-amber-500/10 border-amber-500/20 text-amber-300'
                      }`}>
                        {isCompleted
                          ? <CheckCircle2 size={12} />
                          : <LoaderCircle size={12} className={isFailed ? '' : 'animate-spin'} />
                        }
                        {isCompleted ? 'Completed' : isFailed ? 'Failed' : 'Processing'}
                      </span>
                    </div>

                    <span className="absolute bottom-4 right-4 text-[10px] font-medium text-slate-400 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                      <Clock size={11} className="inline mr-1" />
                      {formatDuration(lecture.duration)}
                    </span>
                  </div>

                  {/* CARD CONTENT */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="text-white font-bold text-base truncate group-hover:text-indigo-300 transition-colors">
                          {lecture.title || 'Untitled lecture'}
                        </h3>

                        <p className="text-slate-500 text-xs mt-2 truncate">
                          {lecture.subject || 'General'}
                        </p>
                      </div>

                      <div className="w-9 h-9 shrink-0 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-slate-400">
                        <BookOpen size={17} />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-slate-500 text-xs mt-5 pt-4 border-t border-white/[0.07]">
                      <CalendarDays size={14} />
                      {formatDate(lecture.date || lecture.createdAt)}
                    </div>

                    {isCompleted ? (
                      <Link
                        to={id ? `/transcript/${id}` : '/transcript'}
                        className="mt-5 w-full flex items-center justify-center gap-2 bg-white text-slate-950 py-3 rounded-xl text-xs font-bold hover:bg-indigo-100 transition-colors"
                      >
                        <Play size={14} fill="currentColor" />
                        Open lecture
                        <ArrowUpRight size={14} />
                      </Link>
                    ) : (
                      <div className="mt-5 w-full flex items-center justify-center gap-2 bg-white/[0.05] text-slate-400 py-3 rounded-xl text-xs font-semibold">
                        {isFailed ? 'Processing failed' : 'Being processed'}
                      </div>
                    )}
                  </div>
                </article>
              )
            })}

            {/* UPLOAD CARD */}
            <Link
              to="/upload"
              className="min-h-[350px] border-2 border-dashed border-indigo-400/25 hover:border-indigo-400/70 rounded-2xl p-7 flex flex-col items-center justify-center text-center bg-indigo-500/[0.03] hover:bg-indigo-500/[0.08] transition-all group"
            >
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all">
                <Upload size={28} />
              </div>

              <h3 className="text-white text-lg font-bold">
                Add a new lecture
              </h3>

              <p className="text-slate-500 text-xs leading-6 mt-3 max-w-[220px]">
                Drop in a video or audio file and turn it into a complete learning experience.
              </p>

              <span className="mt-6 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-xl text-xs font-semibold transition-colors">
                Choose a file <ArrowUpRight size={15} />
              </span>

              <p className="text-slate-600 text-[10px] mt-5">
                MP4 · MOV · WEBM
              </p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Dashboard
