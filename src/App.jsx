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

export default function App() {
  const [showModal, setShowModal] = useState(false)
  const [mode, setMode] = useState('login') // login | emotion | signup
  const [showSafePopup, setShowSafePopup] = useState(true)

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
    </div>
  )
}
