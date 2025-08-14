import { useState } from 'react'
import SafeExitButton from '../components/SafeExitButton'
import { Mic } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { ChevronDown, ChevronRight, PlusSquare, History, NotebookPen, Shield, ExternalLink } from 'lucide-react'


export default function ChatPage() {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hi there,' },
    { sender: 'ai', text: `I'm Whisper, your safe space to talk things through.` },
    { sender: 'ai', text: `I'm here to help you make sense of your feelings and support your emotional safety.` },
    { sender: 'ai', text: `This conversation is completely private and will vanish if you leave or use the quick exit.` },
    { sender: 'user', text: `I don't know if this is abuse, but he keeps controlling who I talk to...` },
  ])

  const [input, setInput] = useState('')
const [open, setOpen] = useState({ myChat: true })
  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: 'user', text: input }])
      setInput('')
      // Simulate AI response (you can replace with actual logic)
      setTimeout(() => {
        setMessages((prev) => [...prev, { sender: 'ai', text: 'Thank you for sharing. I’m here with you.' }])
      }, 1000)
    }
  }

  return (
    <div className="min-h-screen bg-[#fffaf9] text-[#4a2f2f] relative">
      {/*  Fixed SafeExit button */}
      <div className="fixed top-4 right-4 z-[100]">
        <SafeExitButton />
      </div>

      <div className="flex pt-20">
        {/* Sidebar */}
        <aside className="w-[260px] min-h-screen bg-[#f2dbdb] p-6 hidden md:flex flex-col justify-between">
  {/* Top menu */}
  <div>
    <h2 className="text-3xl font-[cursive] mb-6">Whisper Ai</h2>

    {/* My Chat (collapsible) */}
    <button
      onClick={() => setOpen(o => ({ ...o, myChat: !o.myChat }))}
      className="w-full flex items-center justify-between text-left text-[#d77474] font-semibold mb-2"
    >
      <span className="flex items-center gap-2">
        <ExternalLink size={18} />
        My Chat
      </span>
      {open.myChat ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
    </button>

    {/* Sub-items */}
    {open.myChat && (
      <ul className="ml-6 mb-4 space-y-2 text-sm">
        <li>
          <NavLink
            to="/chat" // or /chat/new if you later route it
            className="flex items-center gap-2 hover:underline"
          >
            <PlusSquare size={16} />
            New Chat
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/chat" // or /chat/history
            className="flex items-center gap-2 hover:underline"
          >
            <History size={16} />
            Chat History
          </NavLink>
          {/* Example of a small dated item under history */}
          <div className="ml-6 mt-1 text-xs text-gray-600">8-8-2025</div>
        </li>
      </ul>
    )}

    {/* Other top-level links */}
    <ul className="space-y-4 text-sm">
      <li className="flex items-center gap-2">
        <NotebookPen size={18} />
        <span>Journaling</span>
      </li>
      <li className="flex items-center gap-2">
        <Shield size={18} />
        <span>Safety Tips</span>
      </li>
      <li className="flex items-center gap-2">
        <ExternalLink size={18} />
        <span>Resources Hub</span>
      </li>
    </ul>
  </div>

  {/* Bottom Login/Sign up */}
  <div className="pt-8">
    <Link
      to="/login"
      className="block text-[#c88f8f] font-semibold text-lg hover:underline"
    >
      Login/Sign up
    </Link>
  </div>
</aside>


        {/* Chat Content */}
        <main className="flex-1 p-6">
          <p className="text-center text-sm mb-4">
      Anonymous chats are erased when you exit. Want to save them?{' '}
      <Link
        to="/signup"
        className="text-[#d77474] underline cursor-pointer"
      >
        Sign up here
      </Link>
    </p>
          <h1 className="text-xl font-semibold mb-6 text-center">
            Welcome. You can talk to me about anything.<br />
            What’s on your mind today?
          </h1>

          {/* Chat Messages */}
          <div className="space-y-3 max-w-xl mx-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-md w-fit max-w-[80%] text-sm ${
                  msg.sender === 'user' ? 'ml-auto bg-[#e5bcbc]' : 'bg-[#f7f7f7]'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="mt-10 max-w-xl mx-auto relative">
            <div className="relative flex items-center bg-[#fefefe] border border-[#e6cfcf] rounded-full px-4 py-2">
              <button className="text-[#a07c84] text-xl mr-2">➕</button>
              <button className="text-[#a07c84] text-xl mr-4">🎛️</button>
              <input
                type="text"
                placeholder="You can whisper anything here..."
                className="flex-1 outline-none placeholder:text-gray-500 bg-transparent"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button className="text-[#4a2f2f] text-xl mr-3">
                <Mic size={18} />
              </button>
              <button
                onClick={handleSend}
                className="bg-gradient-to-r from-pink-200 to-pink-300 text-[#4a2f2f] p-2 rounded-full"
              >
                📨
              </button>
            </div>
            <p className="text-center text-xs text-gray-500 mt-4">
              Mistakes can happen — even with Whisper. See our{' '}
              <span className="underline">terms of Use</span>
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}
