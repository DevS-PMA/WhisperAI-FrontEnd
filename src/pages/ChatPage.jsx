import { useEffect, useState, useContext, useRef } from 'react'
import SafeExitButton from '../components/SafeExitButton'
import VoiceDots from '../components/VoiceDots';
import { Mic } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, ChevronRight, PlusSquare, History, NotebookPen, Shield, ExternalLink } from 'lucide-react'
import api from '../scripts/api' 
import { LoginContext } from '../App.jsx'


export default function ChatPage() {
  const [messages, setMessages] = useState([
    // { sender: 'ai', text: 'Hi there,' },
    // { sender: 'ai', text: `I'm Whisper, your safe space to talk things through.` },
    // { sender: 'ai', text: `I'm here to help you make sense of your feelings and support your emotional safety.` },
    // { sender: 'ai', text: `This conversation is completely private and will vanish if you leave or use the quick exit.` },
    // { sender: 'user', text: `I don't know if this is abuse, but he keeps controlling who I talk to...` },
  ])

  const [input, setInput] = useState('')
  const [open, setOpen] = useState({ myChat: true, journaling: false })
  const recognitionRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [noVoiceTimeout, setNoVoiceTimeout] = useState(null);
  const [noVoiceDetected, setNoVoiceDetected] = useState(false);
  const [showJournal, setShowJournal] = useState(false);
  // Journal input state and ref
  const [journalInput, setJournalInput] = useState('');
  const journalRef = useRef(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialMessage = queryParams.get('message');

  const { isLoggedIn } = useContext(LoginContext)

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await api.get('/chat/history')
        setChatHistory(response.data.chat_history)
      } catch (error) {
        console.error("Error fetching chat history:", error)
      }
    }
    fetchChatHistory()
}, [])

useEffect(() => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    const recog = new SpeechRecognition();
    recog.continuous = true;
    recog.interimResults = true;
    recog.lang = 'en-US';
    recognitionRef.current = recog;

    recog.onresult = (event) => {
      const activeEl = document.activeElement;
      const result = event.results[event.resultIndex];
      // Only use transcript if result is final to prevent duplication
      const transcript = result.isFinal ? result[0].transcript : '';

      if (activeEl && activeEl.tagName === 'TEXTAREA') {
        const start = activeEl.selectionStart;
        const end = activeEl.selectionEnd;
        const value = activeEl.value;
        if (transcript) {
          const newValue = value.slice(0, start) + transcript + value.slice(end);
          activeEl.value = newValue;
          activeEl.selectionStart = activeEl.selectionEnd = start + transcript.length;
          activeEl.dispatchEvent(new Event('input', { bubbles: true }));
        }
      } else if (transcript && !showJournal) {
        setInput(prev => prev + transcript);
      }

      resetNoVoiceTimeout();
    };

    recog.onerror = () => setRecording(false);
    recog.onend = () => setRecording(false);
  }
}, []);

const startRecording = () => {
  setNoVoiceDetected(false);
  if (recognitionRef.current && !recording) {
    recognitionRef.current.start();
    setRecording(true);
    resetNoVoiceTimeout();
  }
};

const stopRecording = () => {
  if (recognitionRef.current && recording) {
    recognitionRef.current.stop();
    setRecording(false);
    clearTimeout(noVoiceTimeout);
  }
};

const resetNoVoiceTimeout = () => {
  clearTimeout(noVoiceTimeout);
  const timeout = setTimeout(() => {
    stopRecording();
    setNoVoiceDetected(true);
  }, 10000);
  setNoVoiceTimeout(timeout);
};

  const handleSend = async (customInput) => {
    const messageToSend = customInput || input;
    if (messageToSend.trim()) {
      setMessages([...messages, { role: 'user', message: messageToSend }])
      setInput('')
      let response
      if(!isLoggedIn){
        response = await api.post('/chat/anonymous', { 
          role: 'user',
          message: messageToSend,
          thread_id: threadId,
          title: title,
          timeStamp:  Date.now() / 1000,
          newThread: newThread
        })
      }else{
        response = await api.post('/chat/chat', { 
          role: 'user',
          message: messageToSend,
          thread_id: threadId,
          title: title,
          timeStamp:  Date.now() / 1000,
          newThread: newThread
        })
     }
      setThreadId(response.data.thread_id)
      setTitle(response.data.title)
      setNewThread(false)
      setMessages((prev) => [...prev, { role: 'whisper', message: response.data.message }])
    }
  }

useEffect(() => {
  if (initialMessage) {
    setInput(initialMessage);
    handleSend(initialMessage); // Move handleSend call here directly
  }
}, [initialMessage]);

useEffect(() => {
  const isNew = queryParams.get('new');
  if (isNew) {
    setMessages([]); // clear chat
    setInput('');
    setShowJournal(false);
  }
}, [location.search]);

// Journal mode effect: show journal UI when ?mode=journal is in the URL, only on /chat page
useEffect(() => {
  const isJournalMode = queryParams.get('mode') === 'journal';
  const isChatPage = location.pathname === '/chat';
  if (isChatPage) {
    if (isJournalMode) {
      setShowJournal(true);
      setOpen({ myChat: false, journaling: true });
    } else {
      setShowJournal(false);
      setOpen({ myChat: true, journaling: false });
    }
  }
}, [location.pathname, location.search]);

  return (
    <div className="min-h-screen bg-[#fffaf9] text-[#4a2f2f] relative">
      {/*  Fixed SafeExit button */}
      <div className="fixed top-4 right-4 z-[100]">
        <SafeExitButton />
      </div>

      <div className="flex pt-0">
        {/* Sidebar */}
        <aside className="w-[260px] min-h-screen bg-[#f2dbdb] p-6 hidden md:flex flex-col justify-between">
  {/* Top menu */}
  <div>
    <Link to="/" className="text-4xl font-[cursive] mb-6 hover:underline">
      Whisper Ai
    </Link>

    {/* My Chat (collapsible) */}
    <button
      onClick={() => setOpen(o => ({ myChat: !o.myChat, journaling: false }))}
      className={`w-full flex items-center justify-between text-left mb-2 ${
        open.myChat
          ? 'text-[#4a2f2f] font-bold'
          : 'text-[#4a2f2f] font-normal'
      } text-[18px] md:text-[20px]`}
    >
      <span className="flex items-center gap-2">
        <ExternalLink size={18} />
        My Chat
      </span>
      {open.myChat ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
    </button>

    {/* Sub-items */}
    {open.myChat && (
      <ul className="ml-6 mb-4 space-y-2 text-[16px] md:text-[18px]">
        <li>
          <NavLink
            to="/chat?new=true"
            onClick={() => {
              setOpen((prev) => ({ ...prev, myChat: true, journaling: false }));
              setShowJournal(false);
            }}
            className="flex items-center gap-2 hover:underline"
          >
            <PlusSquare size={16} />
            New Chat
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/chat" // or /chat/history
            onClick={() => {
              setOpen((prev) => ({ ...prev, myChat: true, journaling: false }));
              setShowJournal(false);
            }}
            className="flex items-center gap-2 hover:underline"
          >
            <History size={16} />
            Chat History
          </NavLink>
          {/* ---------------------------------------------------------------------------------------------------------------------------- */}
          {/* Example of a small dated item under history */}
          
          <div className="ml-6 mt-1 text-[13px] text-gray-600">8-8-2025</div>
        </li>
      </ul>
    )}

    {/* Other top-level links */}
    <ul className="space-y-4 text-[18px] md:text-[20px]">
      <li>
        <button
          onClick={() => setOpen(o => ({ myChat: false, journaling: !o.journaling }))}
          className={`w-full flex items-center justify-between text-left mb-2 ${
            open.journaling
              ? 'text-[#4a2f2f] font-bold'
              : 'text-[#4a2f2f] font-normal'
          } text-[18px] md:text-[20px]`}
        >
          <span className="flex items-center gap-2">
            <NotebookPen size={18} />
            Journaling
          </span>
          {open.journaling ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </button>

        {open.journaling && (
          <ul className="ml-6 mt-2 space-y-2 text-[16px] md:text-[18px] text-[#874d4d]">
            <li className="flex items-center gap-2">
              <PlusSquare size={16} />
              <NavLink
                to="/chat?mode=journal"
                onClick={() => {
                  setOpen((prev) => ({ ...prev, myChat: false, journaling: true }));
                  setShowJournal(true);
                }}
                className="hover:underline"
              >
                New journal
              </NavLink>
            </li>
            <li className="flex items-center gap-2">
              <History size={16} />
              <NavLink
                to="/chat?mode=journal"
                onClick={() => {
                  setOpen((prev) => ({ ...prev, myChat: false, journaling: true }));
                  setShowJournal(true);
                }}
                className="hover:underline"
              >
                Journal History
              </NavLink>
            </li>
            <ul className="ml-4 mt-1 space-y-1 text-[13px] text-gray-500">
              <li>▣ 8–8–2025</li>
              <li>▣ 7–8–2025</li>
            </ul>
          </ul>
        )}
      </li>
      <li className="flex items-center gap-2">
        <Shield size={18} />
        <span>Safety Tips</span>
      </li>
      <li className="flex items-center gap-2">
        <ExternalLink size={18} />
        <span>Resources Hub</span>
      </li>
    </ul>
  </div>

  {/* Bottom Login/Sign up */}
  <div className="pt-8">
    <Link
      to="/login"
      className="block text-[#c88f8f] font-semibold text-lg hover:underline"
    >
      Login/Sign up
    </Link>
  </div>
</aside>


        {/* Chat Content */}
        <main className="flex-1 p-6 pt-6">
          {!showJournal && (
            <>
              <h1 className="text-xl font-semibold mb-6 text-center">
                Welcome. You can talk to me about anything.<br />
                What’s on your mind today?
              </h1>

              <div className="space-y-3 max-w-xl mx-auto">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-md w-fit max-w-[80%] text-sm ${
                      msg.sender === 'user' ? 'ml-auto bg-[#e5bcbc]' : 'bg-[#f7f7f7]'
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>
            </>
          )}

          {!showJournal && (
            <div className="mt-10 max-w-xl mx-auto relative">
              <div className="relative flex items-center bg-[#fefefe] border border-[#e6cfcf] rounded-full px-4 py-2">
                <button className="text-[#a07c84] text-xl mr-2">➕</button>
                <button className="text-[#a07c84] text-xl mr-4">🎛️</button>
                <textarea
                  placeholder="You can whisper anything here..."
                  className="flex-1 outline-none placeholder:text-gray-500 bg-transparent resize-none overflow-y-auto max-h-40"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  rows={1}
                />
                <button
                  onClick={recording ? stopRecording : startRecording}
                  className={`text-[#4a2f2f] text-xl mr-3 ${recording ? 'animate-pulse' : ''}`}
                  title={recording ? 'Stop Recording' : 'Start Recording'}
                >
                  <Mic size={18} />
                  {recording && <span className="ml-1 text-red-500 text-xs">●</span>}
                </button>
                <button
                  onClick={handleSend}
                  className="px-4 py-2 bg-gradient-to-r from-pink-300 to-pink-400 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Whisper
                </button>
              </div>
              {noVoiceDetected && (
                <p className="text-center text-xs text-red-500 mt-2">
                  No voice detected for 10 seconds. Stopped recording.
                </p>
              )}
              <p className="text-center text-xs text-gray-500 mt-4">
                Mistakes can happen — even with Whisper. See our{' '}
                <span className="underline">terms of Use</span>
              </p>
            </div>
          )}

          {showJournal && (
            <section id="journal" className="mt-4 max-w-3xl mx-auto bg-[#fefcfc] p-8 rounded-xl text-[#4a2f2f]">
              <p className="text-sm text-center mb-4">
                Anonymous Journals are erased when you exit. Want to save them?{' '}
                <Link to="/signup" className="text-[#b87373] underline">Sign up here</Link>
              </p>
              <h2 className="text-xl font-semibold mb-4 text-center">Today's gentle prompt:</h2>
              <p className="italic text-center text-gray-700 mb-4">
                How am I feeling right now, and what might be causing these emotions?
              </p>

              <div className="bg-[#f9f7f7] border border-[#e4cfcf] rounded-xl p-6">
                <div>
                  <textarea
                    ref={journalRef}
                    value={journalInput}
                    onChange={(e) => setJournalInput(e.target.value)}
                    className="w-full border border-[#e4cfcf] rounded p-2 resize-none"
                    placeholder="Write/Speak freely here... Your thoughts are safe and private. There’s no right or wrong way to journal."
                  ></textarea>
                </div>

                <div className="text-xs text-gray-500 space-y-1 mb-6">
                  <p>. Write without Judgement</p>
                  <p>. Focus on your feelings</p>
                  <p>. Be kind to yourself</p>
                  <p>. There’s no right way</p>
                </div>

                <hr className="border-[#d8a9a9] mb-6" />

                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Something that made me smile today…</label>
                    <textarea className="w-full border border-[#e4cfcf] rounded p-2" rows={3}></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Currently dealing with...</label>
                    <textarea className="w-full border border-[#e4cfcf] rounded p-2" rows={3}></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Thankful for...</label>
                    <textarea className="w-full border border-[#e4cfcf] rounded p-2" rows={3}></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Looking forward to...</label>
                    <textarea className="w-full border border-[#e4cfcf] rounded p-2" rows={3}></textarea>
                  </div>
                </div>

                <div className="mt-8 flex justify-center">
                  <button
                    className="rounded-full bg-[#f3dede] p-4 flex items-center justify-center w-14 h-14"
                    onClick={recording ? stopRecording : startRecording}
                    title={recording ? "Stop Recording" : "Start Recording"}
                  >
                    {recording ? <VoiceDots /> : <Mic className="text-[#944c4c]" size={22} />}
                  </button>
                </div>

                <p className="mt-4 text-xs text-center text-gray-500">
                  Your entries are stored securely and privately. Take your time. Every feeling is valid and worth acknowledging.
                </p>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}