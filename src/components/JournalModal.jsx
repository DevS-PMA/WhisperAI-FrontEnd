import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

export default function JournalModal({ show, onClose, onSave }) {
  const [fields, setFields] = useState({
    field1: '',
    field2: '',
    field3: '',
    field4: '',
  })

  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [show])

  if (!show) return null

  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave?.(fields) // safe call if provided
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="relative w-[90%] max-w-md rounded-xl bg-white border border-[#e1bfc4] shadow-[0_0_15px_rgba(213,152,163,0.5)] p-6"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-black hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold text-center mb-4">New Journal Entry</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {['field1', 'field2', 'field3', 'field4'].map((field, i) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={`Note ${i + 1}`}
              value={fields[field]}
              onChange={handleChange}
              className="w-full border border-pink-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          ))}

          <button
            type="submit"
            className="w-full mt-4 bg-gradient-to-b from-[#eecdd5] to-[#d8aeb9] text-black font-semibold py-2 rounded-md shadow hover:opacity-90"
          >
            Save Entry
          </button>
        </form>
      </motion.div>
    </div>
  )
}
