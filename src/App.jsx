import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './sections/HeroSection'
import WhisperInput from './sections/WhisperInput'
import SafePopup from './sections/SafePopup'
import TrustSection from './sections/TrustSection'
import FeatureCards from './sections/FeatureCards'
import CoreEmotion from './sections/CoreEmotion'
import LoginModal from './components/LoginModal'
import EmotionCheckModal from './components/EmotionCheckModal'
import SafeExitButton from './components/SafeExitButton'
import JournalModal from './components/JournalModal' // new Journal import

export default function App() {
  const [showModal, setShowModal] = useState(false)
  const [mode, setMode] = useState('login') // login | emotion | signup
  const [showSafePopup, setShowSafePopup] = useState(true)
  const [showJournal, setShowJournal] = useState(false) // new Journal modal

  const handleSafeContinue = () => {
    setShowSafePopup(false)
    setMode('emotion')
    setShowModal(true)
  }

  useEffect(() => {
    document.body.style.overflow = showSafePopup ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [showSafePopup])

  return (
    <div className="bg-[#fefcfc] text-[#4a2f2f] font-sans relative">
      {/*  Always visible Safe Exit button */}
      <div className="fixed top-4 right-4 z-[100]">
        <SafeExitButton />
      </div>

      {/*  SafePopup modal */}
      {showSafePopup && (
        <div className="relative z-50">
          <SafePopup onContinue={handleSafeContinue} />
        </div>
      )}

      {/*  Main site content, pushed down a bit */}
      <div id="main-content" className="pt-20 relative z-10">
        <Navbar
          onLoginClick={() => {
            setMode('login')
            setShowModal(true)
          }}
        />
        <HeroSection />
        <WhisperInput />
        <TrustSection />
        <FeatureCards />
        <CoreEmotion />
      </div>

      {/*  Login modal */}
      {showModal && mode === 'login' && (
        <LoginModal
          onClose={() => setShowModal(false)}
          mode={mode}
          setMode={setMode}
        />
      )}

      {/*  Emotion modal */}
      {mode === 'emotion' && (
        <EmotionCheckModal
          show={showModal}
          onClose={() => setShowModal(false)}
        />
      )}

      {/*  Journal modal */}
      {showJournal && (
        <JournalModal
          show={showJournal}
          onClose={() => setShowJournal(false)}
          onSave={async (entry) => {
            try {
              const res = await fetch('http://localhost:8000/journal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  ...entry,
                  user_id: 'TEMP_USER', // replace with real user later
                  timeStamp: Date.now(),
                }),
              })
              return res.json()
            } catch (err) {
              console.error('Failed to save journal', err)
            }
          }}
        />
      )}
    </div>
  )
}
