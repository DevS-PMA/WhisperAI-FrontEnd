export default function WhisperInput() {
  return (
    <section className="w-full px-6 md:px-20 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center border border-[#e3dada] rounded-full px-4 py-2 shadow-sm bg-white">
          <input
            type="text"
            placeholder="You can whisper anything here..."
            className="flex-1 px-4 py-2 outline-none text-sm md:text-base bg-transparent"
          />
          <button className="bg-[#bda5aa] text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-[#a4898e] transition-all">
            Whisper Now
          </button>
        </div>
        <div className="mt-8 text-sm text-gray-600 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
          <p>I feel controlled but I’m not sure it’s abuse…</p>
          <p>I think I’m being gaslighted, but I’m confused…</p>
          <p>I don’t know how to talk to anyone about this…</p>
          <p>I just need a safe space to express how I feel…</p>
        </div>
      </div>
    </section>
  )
}
