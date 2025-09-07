import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar({ user, onLoginClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // --- DEMO: show avatar menu even when not logged in
  const DEMO_USER_MENU = true; // <-- set to false when backend is ready
  const demoUser = { displayName: "Vaishnavi N", email: "demo@whisper.ai" };
  const effectiveUser = user || (DEMO_USER_MENU ? demoUser : null);

  useEffect(() => setMenuOpen(false), [location.pathname, location.search]);

  const initial = (effectiveUser?.displayName?.[0] || effectiveUser?.email?.[0] || "U").toUpperCase();

  const handleLogout = () => {
    if (!user) {
      // DEMO mode: just close and stay on the page
      console.log("Demo logout clicked");
      setMenuOpen(false);
      return;
    }
    // real logout (when backend/auth is live)
    try {
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("refreshToken");
      navigate("/login");
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  return (
    <header className="w-full flex justify-between items-center px-6 md:px-10 py-4 border-b border-[#d7cfcf] bg-white sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <Link to="/whisper-ai">
          <img src="/logo.webp" alt="Whisper Logo" className="w-8 h-8" />
        </Link>
      </div>

      <nav className="hidden md:flex gap-6 text-sm font-medium">
        <button type="button" onClick={() => navigate("/chat")} className="hover:text-[#b87777] transition-colors">
          Chat with WhisperXXXX
        </button>
        <Link to="/whisper-ai/journal" className="hover:text-[#b87777]">Start Journaling</Link>
        <Link to="/whisper-ai/safety" className="hover:text-[#b87777]">Safety Tips</Link>
        <Link to="/whisper-ai/resources" className="hover:text-[#b87777]">Resource Hub</Link>
      </nav>

      <div className="flex items-center gap-4">
        {/* Avatar menu uses effectiveUser (real OR demo) */}
        {effectiveUser && (
          <div className="relative">
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((s) => !s)}
              className="flex items-center gap-2"
            >
              <span
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#c79898] text-white font-semibold"
                title={effectiveUser.displayName || effectiveUser.email || "User"}
              >
                {initial}
              </span>
              <svg
                className={`w-4 h-4 text-[#4a2f2f] transition-transform ${menuOpen ? "rotate-180" : ""}`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
              </svg>
            </button>

            {menuOpen && (
              <div role="menu" className="absolute right-0 mt-2 w-44 rounded-xl shadow-md border border-[#e7dcdc] bg-white p-2">
                <button
                  role="menuitem"
                  onClick={() => { setMenuOpen(false); navigate("/settings"); }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#f7eeee] flex items-center gap-2"
                >
                  ⚙️ <span>Settings</span>
                </button>
                <button
                  role="menuitem"
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#f7eeee] flex items-center gap-2"
                >
                  ↪️ <span>Log Out</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Keep Login visible so you can still test login page—even in demo */}
        <button onClick={onLoginClick} className="text-[#884b4b] font-semibold hidden sm:block">
          Login
        </button>
      </div>
    </header>
  );
}
