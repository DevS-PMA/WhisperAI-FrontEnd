import { useState } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './sections/HeroSection'
import WhisperInput from './sections/WhisperInput'
import SafePopup from './sections/SafePopup'
import TrustSection from './sections/TrustSection'
import FeatureCards from './sections/FeatureCards'
import CoreEmotion from './sections/CoreEmotion'
import LoginModal from './components/LoginModal'

export default function App() {
  const [showModal, setShowModal] = useState(false)
  const [mode, setMode] = useState('login') // 'login' or 'signup'

  return (
    <div className="bg-[#fefcfc] text-[#4a2f2f] font-sans">
      <SafePopup />
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

      {showModal && (
        <LoginModal
          onClose={() => setShowModal(false)}
          mode={mode}
          setMode={setMode}
        />
      )}
    </div>
  )
}
