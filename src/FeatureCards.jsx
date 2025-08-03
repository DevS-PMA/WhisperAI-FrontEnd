export default function FeatureCards() {
  const features = [
    {
      title: 'Emotional Intelligence',
      desc: 'Understands nuanced emotions and responds with genuine empathy and care.',
      icon: '🧠',
    },
    {
      title: 'Thoughtful Responses',
      desc: 'Processes conversations with depth, considering context and emotional state.',
      icon: '💬',
    },
    {
      title: 'Safe & Secure',
      desc: 'Your conversations are private, encrypted, and never shared or stored.',
      icon: '🔒',
    },
    {
      title: 'Designed for Women',
      desc: 'Built with understanding of women’s communication styles and emotional needs.',
      icon: '👩‍🦰',
    },
  ]

  return (
    <section className="px-6 md:px-20 py-16 bg-[#fef9f9]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((f, idx) => (
          <div
            key={idx}
            className="bg-white border border-[#e5dcdc] rounded-xl p-6 shadow-sm text-center"
          >
            <div className="text-2xl mb-2">{f.icon}</div>
            <h4 className="font-semibold text-[#4a2f2f] mb-2">{f.title}</h4>
            <p className="text-sm text-[#6b5a5a]">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
