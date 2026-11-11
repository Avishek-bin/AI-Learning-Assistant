
import { motion } from 'motion/react'
import {
  Sparkles,
  CheckCircle2,
  Play,
  Brain,
  MessageCircle
} from 'lucide-react'

function WorkspacePreview() {
  const transcriptItems = [
    ['00:12', 'Introduction to process management'],
    ['01:34', 'Understanding process states'],
    ['02:48', 'Process Control Block (PCB)'],
    ['04:16', 'Context switching explained']
  ]

  return (
    <div className="relative">

      {/* Ambient glow */}
      <div className="absolute inset-0 bg-indigo-600/20 blur-[90px] rounded-full" />

      {/* Floating workspace card */}
      <motion.div
        className="relative bg-slate-900/80 border border-white/10 rounded-3xl p-5 sm:p-7 shadow-2xl shadow-indigo-950/50 backdrop-blur-xl"
        animate={{ y: [-6, 6] }}
        transition={{
          duration: 4,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'mirror'
        }}
      >
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

        {/* Preview tabs */}
        <div className="flex items-center gap-5 border-b border-white/10 mb-5 overflow-x-auto">
          <span className="text-white text-xs font-semibold border-b-2 border-indigo-500 pb-3 whitespace-nowrap">
            Transcript
          </span>
          <span className="text-slate-500 text-xs pb-3 whitespace-nowrap">Summary</span>
          <span className="text-slate-500 text-xs pb-3 whitespace-nowrap">Quiz</span>
          <span className="text-slate-500 text-xs pb-3 whitespace-nowrap">AI Chat</span>
        </div>

        {/* Transcript preview */}
        <div className="space-y-3">
          {transcriptItems.map((item, index) => (
            <div
              key={item[0]}
              className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.05] rounded-xl px-3 py-3"
            >
              <span className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" />

              <span className="text-indigo-300 text-xs font-mono">
                {item[0]}
              </span>

              <span className="text-slate-300 text-xs flex-1">
                {item[1]}
              </span>

              {index === 0 && (
                <Play size={13} className="text-slate-500" />
              )}
            </div>
          ))}
        </div>

        {/* AI status */}
        <div className="mt-6 flex items-center gap-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
          <div className="w-9 h-9 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-300">
            <Brain size={18} />
          </div>

          <div>
            <p className="text-white text-xs font-semibold">
              AI generated learning material
            </p>
            <p className="text-slate-500 text-[11px] mt-1">
              Transcript, notes and quiz ready
            </p>
          </div>

          <CheckCircle2 size={17} className="ml-auto text-emerald-400" />
        </div>
      </motion.div>

      {/* Floating notification */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 18,
          delay: 1.2
        }}
        className="hidden sm:flex absolute -bottom-7 -right-4 lg:-right-8 bg-amber-400 text-slate-950 text-xs font-bold px-5 py-4 rounded-xl shadow-2xl items-center gap-3 border border-amber-300"
      >
        <MessageCircle size={17} />
        "What is an array?" answered
      </motion.div>
    </div>
  )
}

export default WorkspacePreview
