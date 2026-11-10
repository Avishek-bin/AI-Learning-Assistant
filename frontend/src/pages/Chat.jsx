
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowUp,
  Bot,
  Brain,
  BookOpen,
  Sparkles,
  MessageCircle,
  RefreshCw,
  Copy,
  Check,
  FileText,
  Lightbulb,
  PanelTop,
  GraduationCap
} from 'lucide-react'

const initialMessages = [
  {
    id: 1,
    role: 'assistant',
    text: "Hey! I'm your AI Study Tutor. Ask me anything about your lecture. I can explain concepts, simplify difficult topics, or help you prepare for exams.",
    time: 'Just now'
  }
]

const suggestions = [
  {
    icon: Brain,
    title: 'Explain process states',
    prompt: 'Explain the different states of a process with an example.'
  },
  {
    icon: BookOpen,
    title: 'What is a PCB?',
    prompt: 'Explain Process Control Block (PCB) in simple words.'
  },
  {
    icon: Lightbulb,
    title: 'Context switching',
    prompt: 'What is context switching and why is it needed?'
  },
  {
    icon: FileText,
    title: 'Revision questions',
    prompt: 'Give me 5 important revision questions from this lecture.'
  }
]

function getDemoResponse(question) {
  const q = question.toLowerCase()

  if (q.includes('process state') || q.includes('states of a process')) {
    return `A process moves through different states during its life cycle.

1. New — The process is being created.
2. Ready — It is waiting for CPU allocation.
3. Running — The CPU is executing the process.
4. Waiting — It is waiting for an event, such as I/O completion.
5. Terminated — The process has finished execution.

Example: When you open a browser, it is created, waits for CPU time, runs when scheduled, and may wait while loading a webpage.

Remember: The operating system manages these transitions using the process scheduler.`
  }

  if (q.includes('pcb') || q.includes('control block')) {
    return `A Process Control Block (PCB) is a data structure maintained by the operating system for every process.

It stores important information such as:

1. Process ID — Unique process identification.
2. Process state — Ready, running, waiting, etc.
3. Program counter — Address of the next instruction.
4. CPU registers — Values needed to resume execution.
5. Scheduling information — Priority and scheduling details.
6. Memory information — Details about allocated memory.

Think of a PCB as the identity card and record file of a process. The OS uses it to manage and track processes.`
  }

  if (q.includes('context switch') || q.includes('context switching')) {
    return `Context switching is the process of saving the state of one running process and loading the saved state of another process.

How it works:

1. The CPU stops executing the current process.
2. The OS saves its current state in its PCB.
3. The scheduler selects another process.
4. The OS restores that process's saved state.
5. The CPU resumes its execution.

Example: You are listening to music while browsing. The OS switches CPU execution between the browser and music player.

Important: Context switching enables multitasking, but it also creates overhead because saving and restoring state takes time.`
  }

  if (q.includes('revision') || q.includes('questions') || q.includes('quiz')) {
    return `Here are 5 useful revision questions from Operating Systems:

1. What are the different states of a process?
2. What is a Process Control Block (PCB)?
3. Explain context switching.
4. Differentiate between a process and a program.
5. What is the role of a process scheduler?

Try answering them without looking at your notes. That is a good way to test your understanding.`
  }

  if (q.includes('summary') || q.includes('summarize') || q.includes('summarise')) {
    return `Quick summary — Process Management:

• A process is a program currently in execution.
• Each process has its own PCB.
• A process moves through states such as New, Ready, Running, Waiting and Terminated.
• The CPU scheduler selects a process for execution.
• Context switching allows the OS to switch between processes.

Key exam point: The PCB stores the information needed by the operating system to manage and resume a process.`
  }

  if (q.includes('simple') || q.includes('example')) {
    return `Let's understand it with a simple example.

Imagine you are studying while listening to music on your laptop.

The operating system manages both applications. It decides which process gets CPU time, saves their execution states and switches between them.

This is how multitasking works.

Tell me which specific concept you want to understand, and I can break it down step by step.`
  }

  return `Good question!

I'm currently running in demo mode, so I can answer a few sample Operating Systems topics, including:

• Process states
• Process Control Block (PCB)
• Context switching
• Process management revision

For your question, the real lecture-aware AI tutor will need to be connected to our backend and Gemini API.

Try one of the suggested questions while we finish the interface.`
}

function Chat() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [lecture, setLecture] = useState('Operating Systems — Process Management')
  const [copiedId, setCopiedId] = useState(null)

  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = (text = input) => {
    const question = text.trim()

    if (!question) return

    const userMessage = {
      id: Date.now(),
      role: 'user',
      text: question,
      time: 'Just now'
    }

    const assistantMessage = {
      id: Date.now() + 1,
      role: 'assistant',
      text: getDemoResponse(question),
      time: 'Just now'
    }

    setMessages(previous => [
      ...previous,
      userMessage,
      assistantMessage
    ])

    setInput('')
  }

  const handleKeyDown = event => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  const clearChat = () => {
    setMessages(initialMessages)
  }

  const copyMessage = async message => {
    try {
      await navigator.clipboard.writeText(message.text)
      setCopiedId(message.id)
    } catch {
      setCopiedId(null)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[500px] bg-indigo-700/20 blur-[150px] rounded-full" />
        <div className="absolute top-[450px] -right-40 w-[450px] h-[450px] bg-violet-700/10 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8">

        {/* PAGE INTRO */}
        <section className="pt-16 sm:pt-20 pb-10">
          <Link
            to="/lectures"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={16} /> Back to lectures
          </Link>

          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
              <Sparkles size={14} />
              Your personal study companion
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Ask. Understand.{' '}
              <span className="gradient-text">Learn.</span>
            </h1>

            <p className="text-slate-400 text-sm sm:text-base leading-7 mt-5 max-w-xl mx-auto">
              Get explanations, clear your doubts and explore concepts
              from your lecture through conversation.
            </p>
          </div>
        </section>

        {/* LECTURE CONTEXT */}
        <section className="glass-card p-4 sm:p-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center text-indigo-300">
              <BookOpen size={21} />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                Current lecture
              </p>

              <select
                value={lecture}
                onChange={event => setLecture(event.target.value)}
                className="bg-transparent text-white text-sm font-semibold mt-1 outline-none max-w-full"
              >
                <option className="bg-slate-900" value="Operating Systems — Process Management">
                  Operating Systems — Process Management
                </option>
                <option className="bg-slate-900" value="Database Management Systems">
                  Database Management Systems
                </option>
                <option className="bg-slate-900" value="General conversation">
                  General conversation
                </option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 text-[10px] font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-3 py-2 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              DEMO MODE
            </span>

            <button
              onClick={clearChat}
              className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <RefreshCw size={14} />
              Clear chat
            </button>
          </div>
        </section>

        {/* CHAT WINDOW */}
        <section className="bg-slate-900/50 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl shadow-black/20">

          {/* CHAT HEADER */}
          <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-white/[0.07]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-700 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Bot size={22} className="text-white" />
              </div>

              <div>
                <h2 className="text-white text-sm font-bold">AI Study Tutor</h2>
                <p className="text-emerald-400 text-[10px] mt-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Interface ready
                </p>
              </div>
            </div>

            <span className="text-[10px] text-slate-500 border border-white/10 rounded-full px-3 py-2">
              <GraduationCap size={13} className="inline mr-1" />
              Learning mode
            </span>
          </div>

          {/* MESSAGES */}
          <div className="h-[480px] sm:h-[540px] overflow-y-auto p-5 sm:p-7 space-y-7">

            {messages.map(message => {
              const isUser = message.role === 'user'

              return (
                <div
                  key={message.id}
                  className={`flex gap-3 sm:gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-9 h-9 shrink-0 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center text-indigo-300">
                      <Bot size={19} />
                    </div>
                  )}

                  <div className={`max-w-[88%] sm:max-w-[80%] ${isUser ? 'order-first' : ''}`}>
                    <div className={`rounded-2xl px-4 sm:px-5 py-4 ${
                      isUser
                        ? 'bg-indigo-600 text-white rounded-tr-sm'
                        : 'bg-white/[0.05] border border-white/[0.07] text-slate-200 rounded-tl-sm'
                    }`}>
                      <p className="text-sm leading-7 whitespace-pre-wrap">
                        {message.text}
                      </p>
                    </div>

                    <div className={`flex items-center gap-3 mt-2 text-[10px] text-slate-500 ${isUser ? 'justify-end' : ''}`}>
                      <span>{isUser ? 'You' : 'AI Tutor'}</span>
                      <span>•</span>
                      <span>{message.time}</span>

                      {!isUser && (
                        <button
                          onClick={() => copyMessage(message)}
                          className="hover:text-white transition-colors flex items-center gap-1"
                          title="Copy response"
                        >
                          {copiedId === message.id
                            ? <Check size={12} />
                            : <Copy size={12} />
                          }
                          {copiedId === message.id ? 'Copied' : 'Copy'}
                        </button>
                      )}
                    </div>
                  </div>

                  {isUser && (
                    <div className="w-9 h-9 shrink-0 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-300">
                      <GraduationCap size={19} />
                    </div>
                  )}
                </div>
              )
            })}

            <div ref={bottomRef} />
          </div>

          {/* SUGGESTED QUESTIONS */}
          {messages.length === 1 && (
            <div className="px-5 sm:px-7 pb-6">
              <p className="text-slate-500 text-[10px] font-bold tracking-widest uppercase mb-4">
                Try asking
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {suggestions.map(suggestion => {
                  const Icon = suggestion.icon

                  return (
                    <button
                      key={suggestion.title}
                      onClick={() => sendMessage(suggestion.prompt)}
                      className="flex items-center gap-3 text-left bg-white/[0.03] border border-white/[0.07] hover:bg-indigo-500/10 hover:border-indigo-500/30 rounded-xl px-4 py-3 transition-all group"
                    >
                      <Icon size={17} className="text-indigo-300 shrink-0" />
                      <span className="text-xs text-slate-300 group-hover:text-white">
                        {suggestion.title}
                      </span>
                      <ArrowUp size={14} className="ml-auto text-slate-600 group-hover:text-indigo-300 rotate-45" />
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* INPUT */}
          <div className="p-4 sm:p-6 border-t border-white/[0.07] bg-black/10">
            <div className="flex items-end gap-3 bg-[#0b0918] border border-white/10 rounded-2xl p-3 focus-within:border-indigo-500/50 transition-colors">
              <textarea
                value={input}
                onChange={event => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything about your lecture..."
                rows={1}
                className="flex-1 resize-none bg-transparent text-white text-sm placeholder:text-slate-600 px-2 py-2 outline-none max-h-32"
              />

              <button
                onClick={() => sendMessage()}
                disabled={!input.trim()}
                className="w-10 h-10 shrink-0 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 text-white flex items-center justify-center transition-colors"
                aria-label="Send message"
              >
                <ArrowUp size={19} />
              </button>
            </div>

            <div className="flex flex-wrap justify-between gap-3 mt-3 px-1">
              <p className="text-[10px] text-slate-600">
                Enter to send · Shift + Enter for a new line
              </p>

              <p className="text-[10px] text-slate-600">
                Demo responses · AI integration pending
              </p>
            </div>
          </div>
        </section>

        {/* BOTTOM NOTE */}
        <div className="py-8 flex justify-center">
          <p className="text-xs text-slate-600 flex items-center gap-2 text-center">
            <Sparkles size={13} className="text-indigo-400" />
            Your learning assistant, designed around your lectures.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Chat
