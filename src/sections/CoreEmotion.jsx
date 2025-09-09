import { useNavigate } from 'react-router-dom'

export default function CoreEmotion() {
  const navigate = useNavigate()

  return (
    <section className="px-6 md:px-20 py-20 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
        {/* Left Box */}
        <div className="w-full lg:w-2/3 bg-[#f0d9dc] rounded-3xl px-10 py-12 text-center shadow-sm relative">
          {/* Icon */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2">
            <div className="w-16 h-16 bg-[#e6b2b2] rounded-full flex items-center justify-center border border-[#cc8e8e] shadow">
              <img
                src={`${import.meta.env.BASE_URL}icons/brain.png`}
                alt="brain icon"
                className="w-10 h-10"
              />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-semibold text-[#5b1f2e] mt-10 mb-4">
            Emotional Intelligence at Its Core
          </h3>

          {/* Description */}
          <p className="text-base md:text-lg text-[#5b1f2e] leading-relaxed max-w-3xl mx-auto">
            Kyrah AI doesn't just process words—it understands emotions, recognizes patterns in your communication, and responds with the kind of empathy that makes you feel truly heard and validated.
          </p>
        </div>

        {/* Right Image */}
        <div className="relative w-full lg:w-[40%] flex justify-center">
          <div className="relative w-[280px] h-[400px] bg-[#df8474] rounded-[100px_0_100px_0] z-0">
            {/* Floating dots */}
            <span className="absolute bottom-[-12px] left-[-10px] w-2.5 h-2.5 bg-[#f4a9bd] rounded-full" />
            <span className="absolute top-[60%] right-[-10px] w-4 h-4 bg-[#f4a9bd] rounded-full" />
            <span className="absolute top-[42%] right-[-16px] w-6 h-6 bg-[#f4a9bd] rounded-full" />

            <img
              src={`${import.meta.env.BASE_URL}girl-stop.webp`}
              alt="Woman hand stop"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[280px] h-[400px] object-cover rounded-[40px] z-10"
            />
          </div>
        </div>
      </div>

      {/* Button BELOW box */}
      <div className="text-center mt-10">
        <button
          onClick={() => navigate('/chat')}
          className="px-10 py-3 text-base font-medium rounded-full bg-gradient-to-b from-[#eecdd5] to-[#d8aeb9] text-[#321212] shadow-md hover:shadow-lg transition"
        >
          Talk with Kyrah
        </button>
      </div>
    </section>
  )
}
