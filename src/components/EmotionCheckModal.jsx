import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const emotions = [
  { label: 'Happy', emoji: '🙂' },
  { label: 'Calm', emoji: '😌' },
  { label: 'Anxious', emoji: '😟' },
  { label: 'Angry', emoji: '😠' },
  { label: 'Sad', emoji: '🙁' },
  { label: 'Unsafe', emoji: '😧' },
]

export default function EmotionCheckModal({ show, onClose }) {
  const [selectedEmotion, setSelectedEmotion] = useState('')

  // Lock body scroll while open + restore on unmount; add ESC to close
  useEffect(() => {
    if (typeof document === 'undefined') return
    const body = document.body
    const prevOverflow = body.style.overflow

    if (show) body.style.overflow = 'hidden'
    else body.style.overflow = prevOverflow || ''

    const onKey = (e) => {
      if (e.key === 'Escape' && show) onClose?.()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      body.style.overflow = prevOverflow || ''
      window.removeEventListener('keydown', onKey)
    }
  }, [show, onClose])

  return (
    <AnimatePresence>
      {show && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="emotion-modal-title"
        >
          {/* Overlay (click to close) */}
          <motion.button
            type="button"
            aria-label="Close modal"
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="relative w-[90%] max-w-md rounded-xl bg-white border border-[#e1bfc4] shadow-[0_0_15px_rgba(213,152,163,0.5)] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 text-black hover:text-gray-600"
            >
              <X size={20} aria-hidden="true" />
              <span className="sr-only">Close</span>
            </button>

            <h2 id="emotion-modal-title" className="text-xl font-bold text-center mb-2">
              How are you feeling today?
            </h2>
            <p className="text-sm text-center mb-4 text-gray-600">
              Take a moment to check in with yourself. Select the emotion that best
              describes how you&apos;re feeling right now.
            </p>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 justify-center mb-4">
              {emotions.map((emotion) => {
                const isSelected = selectedEmotion === emotion.label
                return (
                  <button
                    key={emotion.label}
                    type="button"
                    onClick={() => setSelectedEmotion(emotion.label)}
                    aria-pressed={isSelected}
                    className={`w-[60px] h-[70px] border rounded-xl px-2 py-1 flex flex-col items-center justify-center text-sm transition
                      ${
                        isSelected
                          ? 'border-[#cc8d9b] bg-[#fae9ec]'
                          : 'border-black/40 bg-white hover:border-black/60'
                      }`}
                  >
                    <span className="text-xl" role="img" aria-label={emotion.label}>
                      {emotion.emoji}
                    </span>
                    <span className="mt-1">{emotion.label}</span>
                  </button>
                )
              })}
            </div>

            <button
              type="button"
              disabled={!selectedEmotion}
              className={`w-full py-2 rounded-lg font-medium transition ${
                selectedEmotion
                  ? 'bg-[#d598a3] text-white hover:bg-[#bf7d8a] focus:outline-none focus:ring-2 focus:ring-[#d598a3]/40'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
              // add your onClick here if needed, e.g., () => onContinue(selectedEmotion)
            >
              Continue
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
