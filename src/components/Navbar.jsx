export default function Navbar({ onLoginClick }) {
  return (
    <header className="w-full px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white z-50 sticky top-0">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img
          src="/logo.webp"
          alt="Whisper Ai logo"
          className="h-10 w-auto object-contain drop-shadow-md"
        />
      </div>

      {/* Center Nav Links */}
      <nav className="hidden md:flex items-center space-x-8 text-[15px] text-[#5c4140] font-light">
        <a href="#" className="hover:text-[#d4948d]">Chat with whisper</a>
        <a href="#" className="hover:text-[#d4948d]">Start Journaling</a>
        <a href="#" className="hover:text-[#d4948d]">Safety Tips</a>
        <a href="#" className="hover:text-[#d4948d]">Resource Hub</a>
      </nav>

        {/* Login button */}
        <button
          onClick={onLoginClick}
          className="ml-3 text-[#ba6d65] hover:text-[#a15048] text-sm font-medium"
        >
          Login
        </button>
      </div>
    </header>
  );
}
