// src/sections/HeroSection.jsx
export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-6 text-center bg-gradient-to-b from-[#F8FAFF] to-white">
      <h1 className="text-5xl md:text-6xl font-bold mb-4">
        Whisper AI
      </h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-xl">
        AI-powered transcription that understands you — fast, accurate, and intuitive.
      </p>
      <button className="mt-8 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition">
        Get Started
      </button>
    </section>
  );
}
