import Navbar from './sections/Navbar'
import HeroSection from './sections/HeroSection'
import WhisperInput from './sections/WhisperInput'
import SafePopup from './sections/SafePopup'
import TrustSection from './sections/TrustSection'

export default function App() {
  return (
    <div className="bg-[#fefcfc] text-[#4a2f2f] font-sans">
      <Navbar />
      <SafePopup />
      <HeroSection />
      <WhisperInput />
    </div>
  )
}
