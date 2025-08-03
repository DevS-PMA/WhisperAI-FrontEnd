import { useState } from 'react'

export default function SafePopup() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md text-center">
        <h2 className="text-2xl font-[cursive] text-[#824646] mb-2">Whisper AI</h2>
        <h3 className="text-lg font-semibold text-[#4a2f2f] mb-2">You're safe here</h3>
        <p className="text-sm text-gray-600 mb-4">Take your time</p>
        <p className="text-xs text-gray-500 mb-2">
          Your privacy is paramount. For added discretion, use Incognito/Private mode and remember to close the tab when you're done.
        </p>
        <p className="text-xs text-gray-500 mb-4">
          Need to leave fast? Click the Safe Exit button on the top right.
        </p>
        <button
          onClick={() => setVisible(false)}
          className="bg-[#c99da6] hover:bg-[#b27d88] text-white font-medium px-5 py-2 text-sm rounded-full"
        >
          I understand, let’s continue →
        </button>
      </div>
    </div>
  )
}
