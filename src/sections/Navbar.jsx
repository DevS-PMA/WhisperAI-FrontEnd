import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()

  return (
    <header className="w-full flex justify-between items-center px-6 md:px-10 py-4 border-b border-[#d7cfcf] bg-white sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <img src="/logo.webp" alt="Whisper Logo" className="w-8 h-8" />
      </div>

      <nav className="hidden md:flex gap-6 text-sm font-medium">
        <button
          onClick={() => navigate('/chat')}
          className="hover:text-[#b87777] transition-colors"
        >
          Chat with whisper
        </button>
        <a href="#" className="hover:text-[#b87777]">Start Journaling</a>
        <a href="#" className="hover:text-[#b87777]">Safety Tips</a>
        <a href="#" className="hover:text-[#b87777]">Resource Hub</a>
      </nav>

      <div className="flex gap-4 items-center">
        <button className="text-[#884b4b] font-semibold hidden sm:block">Login</button>
      </div>
    </header>
  )
}
