
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Upload,
  FileVideo,
  FileAudio,
  X,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  BookOpen,
  ShieldCheck,
  Clock,
  FileText,
  CloudUpload,
  FolderOpen
} from 'lucide-react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addLocalLecture } from '../features/lectures/lectureSlice'

function UploadLecture() {
  const dispatch = useDispatch()
const navigate = useNavigate()
  const inputRef = useRef(null)

  const [file, setFile] = useState(null)
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState('')
  const [validated, setValidated] = useState(false)

  const supportedExtensions = [
    'mp4', 'mov', 'webm', 'mp3', 'wav', 'm4a'
  ]

  const maxSize = 500 * 1024 * 1024

  const formatSize = bytes => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const handleFile = selectedFile => {
    setError('')
    setValidated(false)

    if (!selectedFile) return

    const extension = selectedFile.name.split('.').pop().toLowerCase()

    if (!supportedExtensions.includes(extension)) {
      setError('Unsupported file format. Please select MP4, MOV, WEBM, MP3, WAV or M4A.')
      return
    }

    if (selectedFile.size > maxSize) {
      setError('File size exceeds 500 MB. Please choose a smaller file.')
      return
    }

    if (selectedFile.size === 0) {
      setError('This file is empty. Please choose another file.')
      return
    }

    setFile(selectedFile)
    setTitle(selectedFile.name.replace(/\.[^/.]+$/, ''))
  }

  const handleDrop = event => {
    event.preventDefault()
    setDragActive(false)

    const selectedFile = event.dataTransfer.files[0]
    handleFile(selectedFile)
  }

  const removeFile = () => {
    setFile(null)
    setTitle('')
    setSubject('')
    setValidated(false)
    setError('')

    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const handleSubmit = event => {
  event.preventDefault()
  setError('')

  if (!file) {
    setError('Please select a video or audio file first.')
    return
  }

  if (!title.trim() || !subject.trim()) {
    setError('Please enter both lecture title and subject.')
    return
  }

  const newLecture = {
    id: `local-${Date.now()}`,
    title: title.trim(),
    subject: subject.trim(),
    fileName: file.name,
    fileSize: file.size,
    duration: 0,
    date: new Date().toISOString(),
    status: 'Processing',
    localOnly: true
  }

  dispatch(addLocalLecture(newLecture))
  navigate('/lectures')
}

  const isAudio = file?.type.startsWith('audio/') ||
    ['mp3', 'wav', 'm4a'].includes(file?.name.split('.').pop().toLowerCase())

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[500px] bg-indigo-700/20 blur-[150px] rounded-full" />
        <div className="absolute top-[500px] -right-40 w-[450px] h-[450px] bg-violet-700/15 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        {/* INTRO */}
        <section className="pt-16 sm:pt-20 pb-12">
          <Link
            to="/lectures"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-9 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to lectures
          </Link>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-indigo-300 text-xs font-bold tracking-[0.2em] uppercase mb-6">
              <Sparkles size={15} />
              Start a new learning experience
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
              Upload your{' '}
              <span className="gradient-text">lecture.</span>
            </h1>

            <p className="text-slate-400 text-base sm:text-lg leading-8 mt-6 max-w-2xl">
              Bring your recordings here. Turn long lectures into
              searchable transcripts, smart notes, interactive quizzes
              and conversations with your AI tutor.
            </p>
          </div>
        </section>

        {/* UPLOAD CONTENT */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-24">

            {/* LEFT: FILE UPLOAD */}
            <div className="lg:col-span-7 space-y-6">

              <div className="glass-card p-5 sm:p-7">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-white text-lg font-bold">
                      Upload your file
                    </h2>
                    <p className="text-slate-500 text-xs mt-2">
                      Select a lecture recording from your device.
                    </p>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center text-indigo-300">
                    <CloudUpload size={21} />
                  </div>
                </div>

                {!file ? (
                  <div
                    onDragOver={event => {
                      event.preventDefault()
                      setDragActive(true)
                    }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={handleDrop}
                    onClick={() => inputRef.current?.click()}
                    className={`min-h-[310px] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-center p-8 cursor-pointer transition-all ${
                      dragActive
                        ? 'border-indigo-400 bg-indigo-500/15'
                        : 'border-indigo-400/25 bg-indigo-500/[0.03] hover:bg-indigo-500/[0.08] hover:border-indigo-400/60'
                    }`}
                  >
                    <div className="w-20 h-20 rounded-2xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center text-indigo-300 mb-6">
                      <Upload size={34} />
                    </div>

                    <h3 className="text-white text-xl font-bold">
                      Drag and drop your file
                    </h3>

                    <p className="text-slate-500 text-sm mt-3">
                      or click here to browse your device
                    </p>

                    <span className="mt-7 bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-xl text-white text-sm font-semibold transition-colors">
                      <FolderOpen size={16} className="inline mr-2" />
                      Browse files
                    </span>

                    <p className="text-slate-600 text-[11px] mt-6">
                      Maximum file size: 500 MB
                    </p>

                    <input
                      ref={inputRef}
                      type="file"
                      accept="video/mp4,video/webm,video/quicktime,audio/mpeg,audio/wav,audio/mp4,.mp4,.mov,.webm,.mp3,.wav,.m4a"
                      className="hidden"
                      onChange={event => handleFile(event.target.files[0])}
                    />
                  </div>
                ) : (
                  <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/[0.06] p-5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-indigo-500/15 flex items-center justify-center text-indigo-300 shrink-0">
                        {isAudio
                          ? <FileAudio size={27} />
                          : <FileVideo size={27} />
                        }
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-white font-semibold text-sm truncate">
                          {file.name}
                        </p>
                        <p className="text-slate-500 text-xs mt-2">
                          {formatSize(file.size)} · {file.name.split('.').pop().toUpperCase()}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={removeFile}
                        className="w-9 h-9 rounded-lg bg-white/5 hover:bg-red-500/15 text-slate-400 hover:text-red-400 flex items-center justify-center transition-colors"
                        aria-label="Remove file"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    <div className="mt-5 pt-4 border-t border-white/10 flex items-center gap-2 text-emerald-400 text-xs">
                      <CheckCircle2 size={15} />
                      File selected and format validated
                    </div>

                    <button
                      type="button"
                      onClick={() => inputRef.current?.click()}
                      className="mt-5 text-xs font-semibold text-indigo-300 hover:text-white"
                    >
                      Choose a different file
                    </button>

                    <input
                      ref={inputRef}
                      type="file"
                      accept="video/mp4,video/webm,video/quicktime,audio/mpeg,audio/wav,audio/mp4,.mp4,.mov,.webm,.mp3,.wav,.m4a"
                      className="hidden"
                      onChange={event => handleFile(event.target.files[0])}
                    />
                  </div>
                )}

                {error && (
                  <div className="mt-5 bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-300 text-xs leading-5">
                    {error}
                  </div>
                )}
              </div>

              {/* LECTURE DETAILS */}
              <div className="glass-card p-5 sm:p-7">
                <h2 className="text-white text-lg font-bold mb-2">
                  Lecture details
                </h2>

                <p className="text-slate-500 text-xs mb-7">
                  Give your recording a name so you can find it easily.
                </p>

                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Lecture title
                    </label>

                    <input
                      type="text"
                      value={title}
                      onChange={event => {
                        setTitle(event.target.value)
                        setValidated(false)
                      }}
                      placeholder="e.g. Introduction to Database Management"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-slate-600 outline-none focus:border-indigo-500/60 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Subject or course
                    </label>

                    <input
                      type="text"
                      value={subject}
                      onChange={event => {
                        setSubject(event.target.value)
                        setValidated(false)
                      }}
                      placeholder="e.g. Operating Systems"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-slate-600 outline-none focus:border-indigo-500/60 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* ACTION */}
              <button
                type="submit"
                disabled={!file}
                className="gradient-button w-full rounded-xl py-4 flex items-center justify-center gap-3 font-bold text-white text-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Validate lecture details
                <ArrowRight size={18} />
              </button>

              {validated && (
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-5">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                    <CheckCircle2 size={18} />
                    File and lecture details are ready
                  </div>
                  <p className="text-emerald-200/70 text-xs leading-6 mt-2">
                    Frontend validation succeeded. Actual upload and transcription
                    will be activated when our backend is implemented.
                  </p>
                </div>
              )}
            </div>

            {/* RIGHT: INFORMATION */}
            <div className="lg:col-span-5 space-y-6">

              <div className="glass-card p-6 sm:p-7">
                <div className="flex items-center gap-3 mb-7">
                  <div className="w-11 h-11 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-300">
                    <Sparkles size={21} />
                  </div>

                  <div>
                    <h3 className="text-white font-bold">
                      Your lecture becomes
                    </h3>
                    <p className="text-slate-500 text-xs mt-1">
                      Four ways to learn
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  {[
                    {
                      icon: FileText,
                      title: 'Smart transcript',
                      description: 'Searchable text with timestamps.'
                    },
                    {
                      icon: BookOpen,
                      title: 'Detailed notes',
                      description: 'Summaries and important concepts.'
                    },
                    {
                      icon: Clock,
                      title: 'Interactive quiz',
                      description: 'Questions to test your understanding.'
                    },
                    {
                      icon: Sparkles,
                      title: 'AI study tutor',
                      description: 'Ask questions about your lecture.'
                    }
                  ].map(item => {
                    const Icon = item.icon

                    return (
                      <div key={item.title} className="flex gap-4">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/15 flex items-center justify-center text-indigo-300 shrink-0">
                          <Icon size={19} />
                        </div>

                        <div>
                          <h4 className="text-white text-sm font-semibold">
                            {item.title}
                          </h4>
                          <p className="text-slate-500 text-xs mt-1 leading-5">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-900/35 via-[#171126] to-[#0b0918] p-6">
                <ShieldCheck size={25} className="text-indigo-300 mb-5" />

                <h3 className="text-white text-lg font-bold">
                  Your files, your learning
                </h3>

                <p className="text-slate-400 text-xs leading-6 mt-3">
                  This demo currently validates files locally in your browser.
                  Permanent storage and secure processing will be added with
                  the backend.
                </p>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-white font-bold text-sm mb-4">
                  Supported formats
                </h3>

                <div className="flex flex-wrap gap-2">
                  {['MP4', 'MOV', 'WEBM', 'MP3', 'WAV', 'M4A'].map(format => (
                    <span key={format} className="bg-white/[0.05] border border-white/10 text-slate-300 text-xs px-3 py-2 rounded-lg">
                      {format}
                    </span>
                  ))}
                </div>

                <p className="text-slate-500 text-xs mt-4">
                  Maximum file size: 500 MB
                </p>
              </div>

            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UploadLecture
