export default function FeatureCards() {
  const features = [
    {
      title: 'Emotional Intelligence',
      desc: 'Understands nuanced emotions and responds with genuine empathy and care.',
      icon: '🧠',
      color: 'hover:bg-[#fef3f3]',
    },
    {
      title: 'Thoughtful Responses',
      desc: 'Processes conversations with depth, considering context and emotional state.',
      icon: '💬',
      color: 'hover:bg-[#fef3f3]',
    },
    {
      title: 'Safe & Secure',
      desc: 'Your conversations are private, encrypted, and never shared or stored.',
      icon: '🔒',
      color: 'bg-[#e6b9b9] text-white hover:brightness-105',
    },
    {
      title: 'Designed for Women',
      desc: 'Built with understanding of women’s communication styles and emotional needs.',
      icon: '👩‍🦰',
      color: 'hover:bg-[#fef3f3]',
    },
  ]

  return (
    <section className="px-6 md:px-20 py-16 bg-[#fef9f9]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((f, idx) => (
          <div
            key={idx}
            className={`transition-all duration-200 cursor-pointer border border-[#e5dcdc] rounded-xl p-6 shadow-sm text-center ${f.color}`}
          >
            <div className="text-2xl mb-2">{f.icon}</div>
            <h4 className="font-semibold mb-2 text-lg">{f.title}</h4>
            <p className="text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
