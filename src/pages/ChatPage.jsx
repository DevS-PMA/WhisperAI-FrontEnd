export default function ChatPage() {
  return (
    <div className="min-h-screen bg-[#fffaf9] text-[#4a2f2f]">
      <div className="flex">
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
            Anonymous chats are erased when you exit. Want to save them? <span className="text-[#d77474] underline cursor-pointer">Sign up here</span>
          </p>
          <h1 className="text-xl font-semibold mb-6 text-center">
            Welcome. You can talk to me about anything.<br />
            What’s on your mind today?
          </h1>

          <div className="space-y-3 max-w-xl mx-auto">
            <div className="bg-[#f7f7f7] p-3 rounded-md w-fit">Hi there,</div>
            <div className="bg-[#f7f7f7] p-3 rounded-md w-fit">I'm Whisper, your safe space to talk things through.</div>
            <div className="bg-[#f7f7f7] p-3 rounded-md w-fit">I'm here to help you make sense of your feelings and support your emotional safety.</div>
            <div className="bg-[#f7f7f7] p-3 rounded-md w-fit">This conversation is completely private and will vanish if you leave or use the quick exit.</div>

            <div className="bg-[#e5bcbc] text-sm p-3 rounded-md w-fit self-end ml-auto">
              I don’t know if this is abuse, but he keeps controlling who I talk to...
            </div>
          </div>

          {/* Input Area */}
          <div className="mt-10 max-w-xl mx-auto relative">
            <input
              type="text"
              placeholder="You can whisper anything here..."
              className="w-full px-5 py-3 rounded-full border border-[#e6cfcf] placeholder:text-gray-500"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#d4a5aa] hover:bg-[#b67e87] p-2 rounded-full text-white">
              🚀
            </button>
          </div>

          <p className="text-center text-xs text-gray-500 mt-6">
            Mistakes can happen — even with Whisper. See our <span className="underline">terms of Use</span>
          </p>
        </main>
      </div>
    </div>
  )
}
