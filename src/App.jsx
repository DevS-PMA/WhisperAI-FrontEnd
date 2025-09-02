import { useState, useEffect, createContext } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import HeroSection from './sections/HeroSection'
import WhisperInput from './sections/WhisperInput'
import SafePopup from './sections/SafePopup'
import TrustSection from './sections/TrustSection'
import FeatureCards from './sections/FeatureCards'
import CoreEmotion from './sections/CoreEmotion'
import SafeExitButton from './components/SafeExitButton'
import ChatPage from './pages/ChatPage'
import SignInPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'

export const LoginContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {}
})

export default function App() {
  const [mode, setMode] = useState('login') 
  const [showSafePopup, setShowSafePopup] = useState(true)

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const navigate = useNavigate()

  const handleSafeContinue = () => {
    setShowSafePopup(false)
    setMode('emotion')
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
            navigate("/login");
          }}
          onChatClick={() => {
            navigate("/chat");
          }}
        />
        <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <WhisperInput />
                  <TrustSection />
                  <FeatureCards />
                  <CoreEmotion />
                </>
              }
            />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/login" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            
          </Routes>
        </LoginContext.Provider>
      </div>

      
    </div>
  );
}
