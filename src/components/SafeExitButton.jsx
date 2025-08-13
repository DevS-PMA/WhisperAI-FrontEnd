export default function SafeExitButton() {
  const handleExit = () => {
    // Attempt to close (may fail)
    window.close()
    // Fallback to redirect
    setTimeout(() => {
      window.location.href = 'https://www.google.com'
    }, 100)
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleExit}
        className="cursor-pointer bg-[#f4d9dd] text-[#4a2f2f] px-4 py-2 rounded-full border border-[#a07c84] text-sm shadow-md hover:bg-[#f1cfd4] transition-all duration-200"
      >
        Safe Exit
      </button>
      <span className="text-xs hidden sm:inline">Tap here to Exit Safely</span>
    </div>
  )
}
