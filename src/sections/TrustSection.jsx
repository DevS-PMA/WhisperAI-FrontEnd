import { useNavigate } from 'react-router-dom'
import { ShieldCheck, Sparkles, Clock } from 'lucide-react'

export default function TrustSection() {
  const navigate = useNavigate()

  return (
    <section className="px-6 lg:px-24 py-20 bg-white">
  <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
    {/* Left Image with background shape and floating dots */}
    <div className="relative w-full lg:w-[40%] flex justify-center">
      {/* Background shape */}
      <div className="relative w-[280px] h-[400px] bg-[#df8474] rounded-[100px_0_100px_0] z-0">
        {/* Girl image */}
        <img
          src={`${import.meta.env.BASE_URL}girl-phone.webp`}
          alt="Smiling woman using phone"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[280px] h-[400px] object-cover rounded-[40px] z-10"
        />

        {/* Floating Dots */}
        <span className="absolute bottom-[-12px] left-[-10px] w-2.5 h-2.5 bg-[#f4a9bd] rounded-full" />
        <span className="absolute top-[60%] right-[-10px] w-4 h-4 bg-[#f4a9bd] rounded-full" />
        <span className="absolute top-[42%] right-[-16px] w-6 h-6 bg-[#f4a9bd] rounded-full" />
      </div>
    </div>

        {/* Right Text */}
        <div className="w-full lg:w-[60%] text-center lg:text-left">
          {/* Trust Icons */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-base mb-6">
            <div className="text-green-700 font-medium flex items-center gap-2">
              <span className="text-xl">🛡️</span> 100% Private
            </div>
            <div className="text-pink-800 font-medium flex items-center gap-2">
              <span className="text-xl">💫</span> Emotionally Intelligent
            </div>
            <div className="text-rose-800 font-medium flex items-center gap-2">
              <span className="text-xl">🕒</span> Always Available
            </div>
          </div>

          {/* Description */}
          <p className="text-xl text-[#392d2d] leading-relaxed italic mb-8">
            More than just AI – It’s a companion that truly understands emotional intelligence and creates genuine connections.
            <br />
            <span className="block mt-1 not-italic">Let’s try:</span>
          </p>

          {/* Button */}
          <button
            onClick={() => navigate('/chat')}
            className="px-6 py-3 bg-gradient-to-r from-pink-200 to-pink-300 text-gray-900 font-semibold rounded-full shadow-md hover:shadow-lg transition"
          >
            Whisper Now
          </button>
        </div>
      </div>
    </section>
  )
}
