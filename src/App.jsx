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

export default function App() {
  const [showModal, setShowModal] = useState(false)
  const [mode, setMode] = useState('login') // login | emotion | signup
  const [showSafePopup, setShowSafePopup] = useState(true)

  // When SafePopup is closed, show emotion modal
  const handleSafeContinue = () => {
    setShowSafePopup(false)
    setMode('emotion')
    setShowModal(true)
  }

  // Prevent scrolling when SafePopup is open
  useEffect(() => {
    document.body.style.overflow = showSafePopup ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [showSafePopup])

  return (
    <div className="bg-[#fefcfc] text-[#4a2f2f] font-sans">
      {/* Safe intro popup */}
      {showSafePopup && <SafePopup onContinue={handleSafeContinue} />}

      <div id="main-content">
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

      {/* Login modal */}
      {showModal && mode === 'login' && (
        <LoginModal
          onClose={() => setShowModal(false)}
          mode={mode}
          setMode={setMode}
        />
      )}

      {/* Emotion check modal */}
      {mode === 'emotion' && (
        <EmotionCheckModal
          show={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}
