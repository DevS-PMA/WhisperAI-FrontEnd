import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="w-full flex justify-between items-center px-6 md:px-10 py-4 border-b border-[#d7cfcf] bg-white sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src="/logo.webp" alt="Whisper Logo" className="w-8 h-8" />
        <span className="text-sm font-semibold text-[#4a2f2f]">Whisper AI logo</span>
      </div>

      {/* Menu */}
      <nav className="hidden md:flex gap-6 text-sm font-medium">
        <a href="#" className="hover:text-[#b87777]">Chat with whisper</a>
        <a href="#" className="hover:text-[#b87777]">Start Journaling</a>
        <a href="#" className="hover:text-[#b87777]">Safety Tips</a>
        <a href="#" className="hover:text-[#b87777]">Resource Hub</a>
      </nav>

      {/* Login */}
      <div className="flex gap-4 items-center">
        <button
          onClick={() => navigate('/login')}
          className="text-[#884b4b] font-semibold hidden sm:block"
        >
          Login
        </button>
      </div>
    </header>
  );
}
