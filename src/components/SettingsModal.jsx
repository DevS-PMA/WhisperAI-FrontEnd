// src/components/SettingsModal.jsx
import { useEffect } from "react";

export default function SettingsModal({ open, onClose, email = "user@example.com" }) {
  if (!open) return null;

  // Close on ESC
  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30"
      onMouseDown={onClose} // click backdrop closes
    >
      <div
        className="mx-4 w-full max-w-3xl rounded-2xl bg-white shadow-xl border border-[#e6dddd] overflow-hidden"
        onMouseDown={(e) => e.stopPropagation()} // prevent backdrop close when clicking inside
      >
        {/* content wrapper */}
        <div className="flex">
          {/* left rail */}
          <aside className="w-52 bg-[#f4eaea] p-5">
            <div className="flex items-center justify-between mb-4">
              <button
                aria-label="Close"
                onClick={onClose}
                className="text-[#7a5757] text-xl"
              >
                ✕
              </button>
            </div>

            <button className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-[#e4caca] text-[#4a2f2f] font-medium">
              <span>👤</span>
              <span>Profile</span>
            </button>
          </aside>

          {/* right pane */}
          <section className="flex-1 p-6">
            <h2 className="text-[#4a2f2f] text-lg font-semibold mb-1">Profile</h2>
            <p className="text-sm text-[#8b6b6b] mb-4">Manage your Whisper Ai profile</p>
            <hr className="border-[#eadfdf] mb-4" />

            {/* Email (read-only for now) */}
            <div className="mb-6">
              <label className="block text-sm text-[#7a5757] mb-1">Email</label>
              <p className="text-[#8b6b6b]">{email}</p>
            </div>

            <hr className="border-[#eadfdf] mb-4" />

            {/* Change Password */}
            <div className="mb-6">
              <h3 className="text-[#4a2f2f] font-medium mb-2">Change Password</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="password"
                  placeholder="Current Password"
                  className="h-9 rounded-md border border-[#eadfdf] bg-[#f6eeee] px-3 text-sm outline-none"
                  disabled
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="h-9 rounded-md border border-[#eadfdf] bg-[#f6eeee] px-3 text-sm outline-none"
                  disabled
                />
                <input
                  type="password"
                  placeholder="Confirm new Password"
                  className="h-9 rounded-md border border-[#eadfdf] bg-[#f6eeee] px-3 text-sm outline-none"
                  disabled
                />
              </div>

              <div className="mt-3 flex items-center gap-3">
                <button
                  className="px-4 h-9 rounded-md bg-[#c79898] text-white text-sm"
                  disabled
                  title="Hook to backend to enable"
                >
                  Save
                </button>
                <button
                  className="text-sm text-[#7a5757]"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </div>

            <hr className="border-[#eadfdf] mb-4" />

            {/* Delete account */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#7a5757]">Delete my account</span>
              <button
                className="px-4 h-9 rounded-md border border-[#e6a3a3] text-[#b64f4f] text-sm hover:bg-[#fff1f1]"
                disabled
                title="Wire this to backend endpoint"
              >
                Delete
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
