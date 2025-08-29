import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Mic } from 'lucide-react'

export default function JournalModal({ show, onClose, onSave }) {
  const [entry, setEntry] = useState("")

  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "auto"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [show])

  if (!show) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (entry.trim() === "") return
    onSave?.({ text: entry })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="relative w-[95%] max-w-lg rounded-xl bg-white border border-[#e1bfc4] shadow-[0_0_15px_rgba(213,152,163,0.5)] p-6"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-black hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold text-center mb-4">New Journal Entry</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Large Textarea */}
          <textarea
            rows={8}
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="Write freely here... Your thoughts are safe and private."
            className="w-full border border-pink-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          {/* Journaling Tips */}
          <div className="text-sm text-gray-500 space-y-1">
            <p>• Write without judgement</p>
            <p>• Focus on your feelings</p>
            <p>• Be kind to yourself</p>
            <p>• There’s no right way</p>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-3">
            {/* Mic Button (for voice journaling) */}
            <button
              type="button"
              className="p-3 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-600"
            >
              <Mic size={20} />
            </button>

            {/* Save Button */}
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-b from-[#eecdd5] to-[#d8aeb9] text-black font-semibold rounded-md shadow hover:opacity-90"
            >
              Save Entry
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
