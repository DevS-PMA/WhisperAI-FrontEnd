export default function SafePopup({ onContinue }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl px-6 py-6 w-full max-w-sm text-center border border-[#e1bfc4]">
        <div className="flex flex-col items-center justify-center mb-4">
          <img
            src="/whisper-ai/icons/logo.webp"
            alt="Kyrah AI"
            className="h-20 w-auto object-contain"
          />
        </div>

        <h3 className="text-lg font-semibold text-[#2e1a1a] mb-1">
          You’re safe here
        </h3>
        <p className="text-sm text-gray-500 mb-4">Take your time</p>

        <p className="text-sm text-gray-700 leading-relaxed mb-2">
          Your privacy is paramount. For added discretion, use Incognito/Private mode or clear your browser history.
          We employ cookies to enhance your experience—by continuing, you consent to our cookie policy.
        </p>
        <p className="text-xs text-gray-600 leading-snug mb-3">
          Need to leave fast? Click the{" "}
          <span className="text-[#c05e6f] font-medium">Safe Exit</span> button at
          the top right.
        </p>

        <p className="text-green-700 text-sm font-medium flex items-center justify-center gap-1 mb-4">
          🛡️ Everything you share is private and secure
        </p>

        <button
          onClick={onContinue}
          className="bg-[#d6a9ac] hover:bg-[#c2898f] text-white font-medium px-6 py-2 text-sm rounded-full w-full flex items-center justify-center gap-2"
        >
          I understand, let’s continue <span className="text-lg">→</span>
        </button>

        <p className="text-[10px] text-gray-500 mt-3 leading-snug">
          By continuing, you acknowledge this is a support tool and not a
          replacement for professional help.
        </p>
      </div>
    </div>
  )
}
