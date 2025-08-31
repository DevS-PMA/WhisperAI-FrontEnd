import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Navbar({ onLoginClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('');

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
  } else {
    setActiveTab('');
  }
}, [location]);

  const buttonBaseStyle = 'hover:text-[#b87777] transition-colors duration-200';
  const activeStyle = 'text-[#b87777] font-bold';

  return (
    <header className="w-full flex justify-between items-center px-6 md:px-10 py-4 border-b border-[#d7cfcf] bg-white sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="Whisper Logo" className="w-8 h-8" />
        <span className="text-sm font-semibold text-[#4a2f2f]">Whisper AI logo</span>
      </div>

      <nav className="hidden md:flex gap-6 text-sm font-medium">
        <button
          onClick={() => {
            setActiveTab('chat');
            window.dispatchEvent(new CustomEvent('sidebar-toggle', { detail: { section: 'chat' } }));
            navigate('/chat?new=true');
          }}
          className={`${buttonBaseStyle} ${activeTab === 'chat' ? activeStyle : ''}`}
        >
          Chat with Whisper
        </button>
        <button
          onClick={() => {
            setActiveTab('journal');
            window.dispatchEvent(new CustomEvent('sidebar-toggle', { detail: { section: 'journal' } }));
            navigate('/chat?mode=journal');
          }}
          className={`${buttonBaseStyle} ${activeTab === 'journal' ? activeStyle : ''}`}
        >
          Start Journaling
        </button>
        <a href="#" className={buttonBaseStyle}>Safety Tips</a>
        <a href="#" className={buttonBaseStyle}>Resource Hub</a>
      </nav>

      <div className="flex gap-4 items-center">
        <button
          onClick={onLoginClick}
          className="text-[#884b4b] font-semibold hidden sm:block"
        >
          Login
        </button>
      </div>
    </header>
  );
}
