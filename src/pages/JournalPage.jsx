// src/pages/JournalPage.jsx

import { Mic } from 'lucide-react';

export default function JournalPage() {
  return (
    <div className="min-h-screen bg-[#fffaf9] text-[#4a2f2f] px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <p className="text-center text-sm mb-4">
          Anonymous Journals are erased when you exit. Want to save them?{' '}
          <span className="text-[#d77474] underline cursor-pointer">Sign up here</span>
        </p>

        <h2 className="text-lg font-semibold mb-6">Today’s gentle prompt:</h2>
        <p className="italic mb-4 text-[#7b5e5e] bg-[#f9f3f3] p-3 rounded-md">
          How am I feeling right now, and what might be causing these emotions?
        </p>

        {[
          "Something that made me smile today…",
          "Currently dealing with...",
          "Thankful for...",
          "Looking forward to..."
        ].map((label, i) => (
          <div key={i} className="mb-6">
            <p className="mb-2 font-medium">{label}</p>
            <textarea
              placeholder="Write freely here..."
              className="w-full h-28 p-4 border border-[#e4c8c8] rounded-md bg-[#fdf8f8] text-sm resize-none"
            />
            <div className="flex justify-center mt-2">
              <button className="bg-[#e6c4c4] hover:bg-[#deaeae] text-white p-2 rounded-full shadow">
                <Mic size={20} />
              </button>
            </div>
          </div>
        ))}

        <p className="text-center text-xs text-gray-500 mt-6">
          Your entries are stored securely and privately. <br />
          Take your time. Every feeling is valid and worth acknowledging.
        </p>
      </div>
    </div>
  );
}