import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import cookies from 'js-cookie'

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

  useEffect(() => {
    if (show) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'auto'
  }, [show])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="relative w-[90%] max-w-md rounded-xl bg-white border border-[#e1bfc4] shadow-[0_0_15px_rgba(213,152,163,0.5)] p-6"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-black hover:text-gray-600"
        >
          <X size={20} />
        </button>
        <h2 className="text-xl font-bold text-center mb-2">
          How are you feeling today?
        </h2>
        <p className="text-sm text-center mb-4 text-gray-600">
          Take a moment to check in with yourself. Select the emotion that best
          describes how you're feeling right now.
        </p>

        <div className="grid grid-cols-6 gap-2 justify-center mb-4">
          {emotions.map((emotion) => (
            <button
              key={emotion.label}
              onClick={() => setSelectedEmotion(emotion.label)}
              className={`w-[60px] h-[70px] border rounded-xl px-2 py-1 flex flex-col items-center justify-center text-sm transition 
                ${
                  selectedEmotion === emotion.label
                    ? 'border-[#cc8d9b] bg-[#fae9ec]'
                    : 'border-black/40 bg-white'
                }`}
            >
              <div className="text-xl">{emotion.emoji}</div>
              <span className="mt-1">{emotion.label}</span>
            </button>
          ))}
        </div>

        <button
          disabled={!selectedEmotion}
          className={`w-full py-2 rounded-lg font-medium transition ${
            selectedEmotion
              ? 'bg-[#d598a3] text-white hover:bg-[#bf7d8a]'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
          onClick={() => {
            cookies.set('selectedEmotion', selectedEmotion, { expires: 1 })
            onClose()
          }}
        >
          Continue
        </button>
      </motion.div>
    </div>
  )
}
