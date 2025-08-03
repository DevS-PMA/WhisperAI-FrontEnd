export default function CoreEmotion() {
  return (
    <section className="px-6 md:px-20 py-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left Text Box */}
        <div className="w-full md:w-1/2 bg-[#f3d6d9] rounded-xl p-8 text-center md:text-left shadow">
          <h3 className="text-lg font-semibold text-[#824646] mb-3">
            🧠 Emotional Intelligence at Its Core
          </h3>
          <p className="text-sm text-[#4a2f2f] leading-relaxed">
            Whisper AI doesn't just process words — it understands emotions,
            recognizes patterns in your communication, and responds with the kind
            of empathy that makes you feel truly heard and validated.
          </p>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 relative">
          <img
            src="/hand-stop.png"
            alt="Woman hand stop"
            className="rounded-[40px] object-cover w-full max-w-sm"
          />
          <div className="absolute top-0 left-0 h-full w-full rounded-[40px] bg-[#f3c4cb33] -z-10" />
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-10">
        <button className="bg-[#bda5aa] hover:bg-[#a78d91] text-white text-sm font-medium px-6 py-2 rounded-full">
          Whisper Now
        </button>
      </div>
    </section>
  );
}
