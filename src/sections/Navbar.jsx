export default function Navbar() {
  return (
    <header className="w-full flex justify-between items-center px-6 md:px-10 py-4 border-b border-[#d7cfcf] bg-white sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <img src="/logo.svg" alt="Whisper Logo" className="w-8 h-8" />
      </div>
      <nav className="hidden md:flex gap-6 text-sm font-medium">
        <a href="#" className="hover:text-[#b87777]">Chat with whisper</a>
        <a href="#" className="hover:text-[#b87777]">Start Journaling</a>
        <a href="#" className="hover:text-[#b87777]">Safety Tips</a>
        <a href="#" className="hover:text-[#b87777]">Resource Hub</a>
      </nav>
      <div className="flex gap-4 items-center">
        <span className="text-xs hidden sm:block">Tap any time to exit safely.</span>
        <button className="text-[#884b4b] font-semibold hidden sm:block">Login</button>
        <button className="bg-[#eadde1] hover:bg-[#d9c6cb] px-4 py-1 text-sm rounded-full font-medium text-[#4a2f2f] border border-[#c4a6ab]">Safe Exit</button>
      </div>
    </header>
  )
}
