import { useState } from 'react'
import SafeExitButton from '../components/SafeExitButton'
import { Mic } from 'lucide-react'

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hi there,' },
    { sender: 'ai', text: `I'm Whisper, your safe space to talk things through.` },
    { sender: 'ai', text: `I'm here to help you make sense of your feelings and support your emotional safety.` },
    { sender: 'ai', text: `This conversation is completely private and will vanish if you leave or use the quick exit.` },
    { sender: 'user', text: `I don't know if this is abuse, but he keeps controlling who I talk to...` },
  ])

  const [input, setInput] = useState('')

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
      {/* ✅ Fixed SafeExit button */}
      <div className="fixed top-4 right-4 z-[100]">
        <SafeExitButton />
      </div>

      <div className="flex pt-20">
        {/* Sidebar */}
        <aside className="w-[260px] min-h-screen bg-[#f2dbdb] p-6 hidden md:block">
          <h2 className="text-3xl font-[cursive] mb-8">Whisper Ai</h2>
          <ul className="space-y-4 text-sm">
            <li>📝 New Chat</li>
            <li>📔 Start Journaling</li>
            <li>🛡️ Safety Tips</li>
            <li>🔗 Resources Hub</li>
            <li className="text-gray-400">⏳ Recent Entries</li>
          </ul>
          <p className="mt-20 text-[#c88f8f] font-medium">Login</p>
        </aside>

        {/* Chat Content */}
        <main className="flex-1 p-6">
          <p className="text-center text-sm mb-4">
            Anonymous chats are erased when you exit. Want to save them?{' '}
            <span className="text-[#d77474] underline cursor-pointer">Sign up here</span>
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
