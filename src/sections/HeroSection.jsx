export default function HeroSection() {
  return (
    <section className="w-full px-4 md:px-8 py-12 relative">
      <div className="max-w-7xl mx-auto overflow-hidden rounded-[24px] relative h-[300px] md:h-[360px]">
        
        {/* Background image */}
        <img
          src={`${import.meta.env.BASE_URL}hero.webp`}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* White blur overlay */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-10" />

        {/* Text content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4 text-center">
          <h1 className="text-[28px] md:text-5xl font-semibold text-[#5c2c2c] leading-snug mb-3">
            Your Quiet <span className="text-[#c05e6f]">Ally</span> in Emotional Awareness
          </h1>
          <p className="text-base md:text-lg text-[#3c2c2c] max-w-3xl">
            Kyrah AI offers compassionate and confidential support for women experiencing abuse. You are not alone.
          </p>
        </div>

      </div>
    </section>
  )
}
