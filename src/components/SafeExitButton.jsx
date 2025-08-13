export default function SafeExitButton() {
  const handleExit = () => {
    window.close()
  }

  return (
    <div className="fixed top-4 right-4 z-[100] flex items-center gap-2">
      <span className="text-sm text-[#4a2f2f] hidden sm:inline">
        Tap any time to exit safely.
      </span>
      <button
        onClick={handleExit}
        className="bg-[#f4d9dd] text-[#4a2f2f] px-4 py-2 rounded-full border border-[#a07c84] text-sm shadow-md hover:bg-[#f1cfd4] transition-all duration-200"
      >
        Safe Exit
      </button>
    </div>
  )
}
