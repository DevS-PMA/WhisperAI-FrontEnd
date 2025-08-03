import Navbar from './sections/Navbar'
import HeroSection from './sections/HeroSection'
import WhisperInput from './sections/WhisperInput'
import SafePopup from './sections/SafePopup'
import TrustSection from './sections/TrustSection'
import FeatureCards from './sections/FeatureCards'
import CoreEmotion from './sections/CoreEmotion'

export default function App() {
  return (
    <div className="bg-[#fefcfc] text-[#4a2f2f] font-sans">
      <SafePopup />
      <div id="main-content">
        <Navbar />
        <HeroSection />
        <WhisperInput />
        <TrustSection />
        <FeatureCards />
        <CoreEmotion />
      </div>
    </div>
  )
}
