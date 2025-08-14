import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="w-full flex justify-between items-center px-6 md:px-10 py-4 border-b border-[#d7cfcf] bg-white sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <img src="/logo.webp" alt="Whisper Logo" className="w-8 h-8" />
      </div>

      <nav className="hidden md:flex gap-6 text-sm font-medium">
        <Link to="/chat" className="hover:text-[#b87777] transition-colors">
          Chat with whisper
        </Link>
        <a href="#" className="hover:text-[#b87777]">Start Journaling</a>
        <a href="#" className="hover:text-[#b87777]">Safety Tips</a>
        <a href="#" className="hover:text-[#b87777]">Resource Hub</a>
      </nav>

      <div className="flex gap-4 items-center">
        <Link to="/login" className="text-[#884b4b] font-semibold hidden sm:block">
          Login
        </Link>
      </div>
    </header>
  )
}
