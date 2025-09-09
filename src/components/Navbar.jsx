// Navbar.jsx
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import SettingsModal from './SettingsModal'; // <- import it
import { LoginContext } from '../App';
import logo from '../assets/logo.webp';

export default function Navbar({ onLoginClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);       // dropdown
  const [settingsOpen, setSettingsOpen] = useState(false); // NEW: modal

  const { isLoggedIn } = useContext(LoginContext);

  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '/home') {
      setActiveTab('');
      window.dispatchEvent(new CustomEvent('sidebar-toggle', { detail: { section: '' } }));
    } else if (location.pathname.includes('/chat')) {
      if (location.search.includes('mode=journal')) {
        setActiveTab('journal');
        window.dispatchEvent(new CustomEvent('sidebar-toggle', { detail: { section: 'journal' } }));
      } else {
        setActiveTab('chat');
        window.dispatchEvent(new CustomEvent('sidebar-toggle', { detail: { section: 'chat' } }));
      }
    }
  }, [location]);

  const buttonBaseStyle = 'hover:text-[#b87777] transition-colors duration-200';
  const activeStyle = 'text-[#b87777] font-bold';

  const demoInitial = 'D'; // show avatar even before login

  return (
    <header className="w-full flex justify-between items-center px-6 md:px-10 py-4 border-b border-[#d7cfcf] bg-white sticky top-0 z-50">
      <div
  className="flex items-center gap-2 cursor-pointer"
  onClick={() => navigate('/')}
  title="Go to Home"
>
  <img src={logo} alt="Kyrah Logo" className="w-22 h-20 object-contain" />
</div>


      <nav className="hidden md:flex gap-6 text-sm font-medium">
        <button
          onClick={() => {
            setActiveTab("chat");
            window.dispatchEvent(
              new CustomEvent("sidebar-toggle", { detail: { section: "chat" } })
            );
            navigate("/chat?new=true");
          }}
          className={`${buttonBaseStyle} ${
            activeTab === "chat" ? activeStyle : ""
          }`}
        >
          Chat with Kyrah
        </button>
        <button
          onClick={() => {
            setActiveTab("journal");
            window.dispatchEvent(
              new CustomEvent("sidebar-toggle", {
                detail: { section: "journal" },
              })
            );
            navigate("/chat?mode=journal");
          }}
          className={`${buttonBaseStyle} ${
            activeTab === "journal" ? activeStyle : ""
          }`}
        >
          Journaling
        </button>
        <a href="#" className={buttonBaseStyle}>
          Safety Tips
        </a>
        <a href="#" className={buttonBaseStyle}>
          Resource Hub
        </a>
      </nav>

      <div className="flex gap-4 items-center">
        {/* Avatar + dropdown (visible now, even before real login) */}
        {isLoggedIn ? (
          <div className="relative">
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((s) => !s)}
              className="flex items-center gap-2"
              title="Demo User"
            >
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#c79898] text-white font-semibold">
                {demoInitial}
              </span>
              <svg
                className={`w-4 h-4 text-[#4a2f2f] transition-transform ${
                  menuOpen ? "rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
              </svg>
            </button>

            {menuOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-44 rounded-xl shadow-md border border-[#e7dcdc] bg-white p-2"
              >
                <button
                  role="menuitem"
                  onClick={() => {
                    setMenuOpen(false);
                    setSettingsOpen(true);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg bg-[#f7eeee] hover:bg-[#e9d7d7] flex items-center gap-2"
                >
                  <span>⚙️</span> <span>Settings</span>
                </button>
                <button
                  role="menuitem"
                  onClick={() => {
                    setMenuOpen(false);
                    console.log("Demo Log Out");
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg bg-[#f7eeee] hover:bg-[#e9d7d7] flex items-center gap-2"
                >
                  <span>↪️</span> <span>Log Out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={onLoginClick}
            className="text-[#884b4b] font-semibold hidden sm:block"
          >
            Login
          </button>
        )}
      </div>
      {/* Render the modal */}
      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        email="Diwakar@gmail.com"
      />
    </header>
  );
}
