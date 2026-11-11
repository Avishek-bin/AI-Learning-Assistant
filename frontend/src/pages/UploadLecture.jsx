
import { useRef, useState } from 'react'
import {
  ArrowRight,
  CheckCircle2
} from 'lucide-react'

import UploadHeader from '../components/upload/UploadHeader'
import FileDropzone from '../components/upload/FileDropzone'
import SelectedFile from '../components/upload/SelectedFile'
import LectureDetailsForm from '../components/upload/LectureDetailsForm'
import UploadInfo from '../components/upload/UploadInfo'

function UploadLecture() {
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

  // File size formatter
  const formatSize = bytes => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  // Validate selected file
  const handleFile = selectedFile => {
    setError('')
    setValidated(false)

    if (!selectedFile) return

    const extension = selectedFile.name
      .split('.')
      .pop()
      .toLowerCase()

    if (!supportedExtensions.includes(extension)) {
      setError(
        'Unsupported format. Please select MP4, MOV, WEBM, MP3, WAV or M4A.'
      )
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

  // Drag and drop
  const handleDragOver = event => {
    event.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = event => {
    event.preventDefault()
    setDragActive(false)
  }

  const handleDrop = event => {
    event.preventDefault()
    setDragActive(false)

    handleFile(event.dataTransfer.files[0])
  }

  // Open file picker
  const openFilePicker = () => {
    if (inputRef.current) {
      inputRef.current.value = ''
      inputRef.current.click()
    }
  }

  // Remove selected file
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

  // Frontend validation
  const handleSubmit = event => {
    event.preventDefault()

    setError('')
    setValidated(false)

    if (!file) {
      setError('Please select a video or audio file first.')
      return
    }

    if (!title.trim() || !subject.trim()) {
      setError('Please enter both lecture title and subject.')
      return
    }

    setValidated(true)
  }

  const isAudio = file
    ? file.type.startsWith('audio/') ||
      ['mp3', 'wav', 'm4a'].includes(
        file.name.split('.').pop().toLowerCase()
      )
    : false

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[500px] bg-indigo-700/20 blur-[150px] rounded-full" />

        <div className="absolute top-[500px] -right-40 w-[450px] h-[450px] bg-violet-700/15 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        <UploadHeader />

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-24">

            {/* LEFT SIDE */}
            <div className="lg:col-span-7 space-y-6">

              {/* FILE INPUT */}
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
                </div>

                {/* Hidden input */}
                <input
                  ref={inputRef}
                  type="file"
                  accept="video/mp4,video/webm,video/quicktime,audio/mpeg,audio/wav,audio/mp4,.mp4,.mov,.webm,.mp3,.wav,.m4a"
                  className="hidden"
                  onChange={event => handleFile(event.target.files[0])}
                />

                {/* NEON DROPZONE WRAPPER */}
                <div className="relative isolate group/dropzone">

                  {/* Animated-style purple glow */}
                  <div
                    className={`pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-500 to-fuchsia-500 blur-xl transition-opacity duration-500 ${
                      dragActive
                        ? 'opacity-45'
                        : 'opacity-0 group-hover/dropzone:opacity-25'
                    }`}
                  />

                  {/* Neon border surface */}
                  <div
                    className={`relative rounded-2xl border transition-all duration-300 ${
                      dragActive
                        ? 'border-violet-400/70 bg-violet-500/[0.06] shadow-[0_0_30px_rgba(139,92,246,0.18)]'
                        : 'border-violet-500/20 bg-[#0b0818]/30 group-hover/dropzone:border-violet-400/50'
                    }`}
                  >
                    {!file ? (
                      <FileDropzone
                        dragActive={dragActive}
                        onBrowse={openFilePicker}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                      />
                    ) : (
                      <SelectedFile
                        file={file}
                        isAudio={isAudio}
                        formatSize={formatSize}
                        onRemove={removeFile}
                        onChoose={openFilePicker}
                      />
                    )}
                  </div>
                </div>

                {/* ERROR MESSAGE */}
                {error && (
                  <div className="mt-5 bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-300 text-xs leading-5">
                    {error}
                  </div>
                )}
              </div>

              {/* LECTURE DETAILS */}
              <LectureDetailsForm
                title={title}
                setTitle={value => {
                  setTitle(value)
                  setValidated(false)
                }}
                subject={subject}
                setSubject={value => {
                  setSubject(value)
                  setValidated(false)
                }}
              />

              {/* VALIDATE BUTTON */}
              <button
                type="submit"
                disabled={!file}
                className="gradient-button w-full rounded-xl py-4 flex items-center justify-center gap-3 font-bold text-white text-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Validate lecture details
                <ArrowRight size={18} />
              </button>

              {/* SUCCESS MESSAGE */}
              {validated && (
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-5">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                    <CheckCircle2 size={18} />
                    File and lecture details are ready
                  </div>

                  <p className="text-emerald-200/70 text-xs leading-6 mt-2">
                    Frontend validation succeeded. Actual upload and
                    transcription will be activated when the backend
                    is implemented.
                  </p>
                </div>
              )}

            </div>

            {/* RIGHT SIDE */}
            <div className="lg:col-span-5">
              <UploadInfo />
            </div>

          </div>
        </form>
      </div>
    </div>
  )
}

export default UploadLecture
