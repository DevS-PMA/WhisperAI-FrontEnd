export default function HeroSection() {
  return (
    <section className="w-full text-center px-6 md:px-20 py-12 relative">
      <div className="rounded-xl overflow-hidden max-w-5xl mx-auto">
        <img src="/hero-bg.png" alt="Background" className="w-full h-auto opacity-80" />
      </div>
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-center px-4">
        <h1 className="text-3xl md:text-5xl font-semibold leading-snug mb-4 text-[#4a2f2f]">
          Your Quiet <span className="text-[#b87777] font-bold">Ally</span> in Emotional Awareness
        </h1>
        <p className="text-base md:text-lg max-w-2xl mx-auto text-[#4a2f2f]">
          Whisper AI offers compassionate and confidential support for women experiencing abuse. You are not alone.
        </p>
      </div>
    </section>
  )
}
