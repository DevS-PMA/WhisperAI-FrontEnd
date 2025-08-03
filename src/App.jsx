import Navbar from './sections/Navbar'
import HeroSection from './sections/HeroSection'
import WhisperInput from './sections/WhisperInput'

export default function App() {
  return (
    <div className="bg-[#fefcfc] text-[#4a2f2f] font-sans">
      <Navbar />
      <HeroSection />
      <WhisperInput />
    </div>
  )
}
