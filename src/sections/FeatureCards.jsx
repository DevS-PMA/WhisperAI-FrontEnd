export default function FeatureCards() {
  const features = [
    {
      icon: `${import.meta.env.BASE_URL}icons/heart.png`,
      title: 'Emotional Intelligence',
      desc: 'Understands nuanced emotions and responds with genuine empathy and care.',
    },
    {
      icon: `${import.meta.env.BASE_URL}icons/brain.png`,
      title: 'Thoughtful Responses',
      desc: 'Processes conversations with depth, considering context and emotional state.',
    },
    {
      icon: `${import.meta.env.BASE_URL}icons/sheild.png`,
      title: 'Safe & Secure',
      desc: 'Your conversations are private, encrypted, and never shared or stored.',
    },
    {
      icon: `${import.meta.env.BASE_URL}icons/women.png`,
      title: 'Designed for Women',
      desc: "Built with understanding of women's communication styles and emotional needs.",
    },
  ];

  return (
    <section className="px-6 md:px-20 py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-2xl md:text-3xl font-semibold text-[#392d2d] mb-14">
          What Makes Whisper Special?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
          {features.map((item, index) => (
            <div
              key={index}
              className="group border border-[#ecdede] p-8 rounded-tl-[2rem] rounded-br-[6rem] text-center md:text-left transition-all duration-300 hover:bg-[#e79595]"
            >
              <div className="w-14 h-14 rounded-full border border-[#d4b2a2] bg-white mx-auto md:mx-0 flex items-center justify-center mb-6 transition-colors duration-200 group-hover:border-white">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-10 h-10"
                />
              </div>
              <h3 className="text-xl font-semibold text-[#1c1c1c] mb-3">{item.title}</h3>
              <p className="text-[16px] leading-relaxed text-[#443e3e]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
