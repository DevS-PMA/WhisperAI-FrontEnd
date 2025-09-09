import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mic } from 'lucide-react'

const emotions = [
  { label: 'Happy', emoji: '🙂', prompt: 'I am feeling Happy' },
  { label: 'Calm', emoji: '😌', prompt: 'I am feeling Calm' },
  { label: 'Anxious', emoji: '😟', prompt: 'I am feeling Anxious today' },
  { label: 'Angry', emoji: '😠', prompt: 'I feel Angry today' },
  { label: 'Sad', emoji: '🙁', prompt: 'I am feeling Sad' },
  { label: 'Unsafe', emoji: '😧', prompt: 'I feel Unsafe today' },
]

export default function WhisperInput() {
  const navigate = useNavigate()
  const [question, setQuestion] = useState('')
  const [emotionText, setEmotionText] = useState('')
  const inputRef = useRef(null)
  const [selectedEmotion, setSelectedEmotion] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [timeoutMessage, setTimeoutMessage] = useState(false);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const recognition = SpeechRecognition ? new SpeechRecognition() : null

  if (recognition) {
    recognition.continuous = false
    recognition.lang = 'en-US'
    recognition.interimResults = true
  }

  const suggestions = [
    "I feel controlled but I’m not sure it’s abuse…",
    "I think I’m being gaslighted, but I’m confused…",
    "I don’t know how to talk to anyone about this…",
    "I just need a safe space to express how I feel…"
  ]

  const useSuggestion = (text) => {
    setQuestion(text)
    setShowSuggestions(false)
    inputRef.current?.focus()
  }

  return (
    <section className="w-full px-6 md:px-20 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Emotion Emoji Picker */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {emotions.map((emotion) => (
            <button
              key={emotion.label}
              onClick={() => {
                navigate(`/chat?message=${encodeURIComponent(emotion.prompt)}`)
              }}
              title={`Feeling ${emotion.label}`}
              className={`w-[60px] h-[70px] border rounded-xl px-2 py-1 flex flex-col items-center justify-center text-sm transition 
                ${
                  selectedEmotion === emotion.label
                    ? 'border-[#cc8d9b] bg-[#fae9ec]'
                    : 'border-black/40 bg-white hover:border-[#cc8d9b] hover:bg-[#fae9ec]'
                }`}
            >
              <div className="text-xl">{emotion.emoji}</div>
              <span className="mt-1">{emotion.label}</span>
            </button>
          ))}
        </div>
        {/* Input + Mic + Button */}
        <div className="flex items-center border border-[#e3dada] rounded-full px-4 py-2 shadow-sm bg-white gap-2">
          <input
            ref={inputRef}
            type="text"
            placeholder="You can talk anything here with Kyrah..."
            className="flex-1 px-4 py-2 outline-none text-sm md:text-base bg-transparent"
            value={
              selectedEmotion && question
                ? `I am ${selectedEmotion}, ${question}`
                : selectedEmotion
                  ? `I am ${selectedEmotion}`
                  : question
            }
            onChange={(e) => {
              const raw = e.target.value;
              const emotionPrefix = selectedEmotion ? `I am ${selectedEmotion}` : '';
              const fullPrefix = selectedEmotion && question ? `${emotionPrefix}, ` : emotionPrefix;
              
              if (!raw.startsWith(fullPrefix)) {
                // User removed part of the prefix
                if (raw === '') {
                  setSelectedEmotion('');
                  setEmotionText('');
                  setQuestion('');
                } else {
                  setQuestion(raw);
                  setSelectedEmotion('');
                  setEmotionText('');
                }
                return;
              }

              const remaining = raw.slice(fullPrefix.length).trimStart();
              setQuestion(remaining);
            }}
          />
          <button
            className={`p-2 rounded-full text-[#5c4140] transition ${
              isListening ? 'bg-pink-100 animate-pulse' : 'hover:bg-gray-100'
            }`}
            aria-label="Record"
            onClick={() => {
              if (!recognition) return alert("Speech Recognition not supported")

              setIsListening(true)
              setTimeoutMessage(false);
              recognition.interimResults = true
              let finalTranscript = ''

              recognition.onresult = (event) => {
                let interimTranscript = ''
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                  const transcript = event.results[i][0].transcript
                  if (event.results[i].isFinal) {
                    finalTranscript += transcript + ' '
                  } else {
                    interimTranscript += transcript
                  }
                }
                console.log("Recognized:", finalTranscript, interimTranscript)
                setQuestion(finalTranscript + interimTranscript)
                setShowSuggestions(true)
                if (finalTranscript.trim() !== '' || interimTranscript.trim() !== '') {
                  setTimeoutMessage(false);
                }
              }

              recognition.onerror = () => {
                clearTimeout(timeoutId)
                setIsListening(false)
              }

              recognition.onend = () => {
                clearTimeout(timeoutId)
                setIsListening(false)
              }

              recognition.start()

              // Stop recognition if no speech is detected within 10 seconds
              const timeoutId = setTimeout(() => {
                recognition.stop()
                setIsListening(false)
                setTimeoutMessage(true);
              }, 10000)
            }}
          >
            <Mic className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              if (!question.trim() && !selectedEmotion) {
                navigate('/chat')
                return
              }

              const message = selectedEmotion
                ? `I am ${selectedEmotion}, ${question}`
                : question

              // Prevent double send
              if (window.location.pathname.includes('/chat')) return

              const queryParam = new URLSearchParams({ message: message.trim() }).toString()
              navigate(`/chat?${queryParam}`)
            }}
            className="bg-[#bda5aa] text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-[#a4898e] transition-all"
          >
            Talk with Kyrah
          </button>
        </div>

        {timeoutMessage && (
          <div className="mt-2 text-sm text-red-500 text-center">
            No speech detected. Please try again.
          </div>
        )}

        {/* Example whispers (click to drop into input) */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
          {suggestions.map((text, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => useSuggestion(text)}
              className="text-left bg-white border border-[#f0eaea] rounded-xl p-4 shadow-sm hover:border-[#e1c9cf] hover:bg-[#fffafa] transition"
            >
              {text}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}