export default function TrustSection() {
  return (
    <section className="px-6 md:px-20 py-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left Image */}
        <div className="w-full md:w-1/2 relative">
          <img
            src="/girl-phone.png"
            alt="Smiling woman using phone"
            className="rounded-[40px] object-cover w-full max-w-sm md:ml-auto"
          />
          <div className="absolute top-0 left-0 h-full w-full rounded-[40px] bg-[#f3c4cb33] -z-10" />
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2 text-left">
          <div className="flex flex-wrap gap-4 text-sm mb-4">
            <span className="text-[#38753e] font-medium flex items-center gap-1">
              <span className="text-lg">🛡️</span> 100% Private
            </span>
            <span className="text-[#a264ad] font-medium flex items-center gap-1">
              <span className="text-lg">💫</span> Emotionally Intelligent
            </span>
            <span className="text-[#cc6f4f] font-medium flex items-center gap-1">
              <span className="text-lg">🕒</span> Always Available
            </span>
          </div>

          <p className="text-[#4a2f2f] mb-6 leading-relaxed">
            <strong>More than just AI –</strong> It’s a companion that truly understands emotional intelligence and creates genuine connections.
          </p>

          <button className="bg-[#bda5aa] hover:bg-[#a78d91] text-white text-sm font-medium px-6 py-2 rounded-full">
            Whisper Now
          </button>
        </div>
      </div>
    </section>
  );
}
