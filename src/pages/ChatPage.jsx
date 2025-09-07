import { useEffect, useState, useContext, useRef } from "react";
import SafeExitButton from "../components/SafeExitButton";
import VoiceDots from "../components/VoiceDots";
import { Mic } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  ChevronDown,
  ChevronRight,
  PlusSquare,
  History,
  NotebookPen,
  Shield,
  ExternalLink,
} from "lucide-react";
import api from "../scripts/api";
import { LoginContext } from "../App.jsx";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    // { sender: 'ai', text: 'Hi there,' },
    // { sender: 'ai', text: `I'm Whisper, your safe space to talk things through.` },
    // { sender: 'ai', text: `I'm here to help you make sense of your feelings and support your emotional safety.` },
    // { sender: 'ai', text: `This conversation is completely private and will vanish if you leave or use the quick exit.` },
    // { sender: 'user', text: `I don't know if this is abuse, but he keeps controlling who I talk to...` },
  ]);

  const [input, setInput] = useState("");
  const [open, setOpen] = useState({ myChat: true, journaling: false });
  const recognitionRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [noVoiceTimeout, setNoVoiceTimeout] = useState(null);
  const [noVoiceDetected, setNoVoiceDetected] = useState(false);
  const [showJournal, setShowJournal] = useState(false);
  // Journal input state and ref
  const [journalInput, setJournalInput] = useState("");
  const journalRef = useRef(null);

  const [chatHistory, setChatHistory] = useState([]);
  const [threadId, setThreadId] = useState("");
  const [title, setTitle] = useState("");
  const [newThread, setNewThread] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialMessage = queryParams.get("message");

  const { isLoggedIn } = useContext(LoginContext);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await api.get("/chat/history");
        setChatHistory(response.data.chat_history);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };
    if (isLoggedIn) fetchChatHistory();
  }, []);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await api.get("/chat/history");
        setChatHistory(response.data.chat_history);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };
    if (isLoggedIn) fetchChatHistory();
  }, [messages, isLoggedIn]);

  const handleChatHistory = (chat) => {
    setThreadId(chat.threadId);
    setTitle(chat.title);
    setMessages(chat.messages);
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.continuous = true;
      recog.interimResults = true;
      recog.lang = "en-US";
      recognitionRef.current = recog;

      recog.onresult = (event) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        setInput(transcript);
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
    if (messageToSend) {
      setMessages([...messages, { role: "user", message: messageToSend }]);
      setInput("");
      let response;
      if (!isLoggedIn) {
        response = await api.post("/chat/anonymous", {
          role: "user",
          message: messageToSend,
          thread_id: threadId,
          title: title,
          timeStamp: Date.now() / 1000,
          newThread: newThread,
        });
      } else {
        response = await api.post("/chat/chat", {
          role: "user",
          message: messageToSend,
          thread_id: threadId,
          title: title,
          timeStamp: Date.now() / 1000,
          newThread: newThread,
        });
      }
      setThreadId(response.data.thread_id);
      setTitle(response.data.title);
      setNewThread(false);
      setMessages((prev) => [
        ...prev,
        { role: "whisper", message: response.data.message },
      ]);
    }
  };

  useEffect(() => {
    if (initialMessage) {
      setInput(initialMessage);
      handleSend(initialMessage); // Move handleSend call here directly
    }
  }, [initialMessage]);

  useEffect(() => {
    const isNew = queryParams.get("new");
    if (isNew) {
      setMessages([]); // clear chat
      setInput("");
      setShowJournal(false);
    }
  }, [location.search]);

  // Journal mode effect: show journal UI when ?mode=journal is in the URL, only on /chat page
  useEffect(() => {
    const isJournalMode = queryParams.get("mode") === "journal";
    const isChatPage = location.pathname === "/chat";
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
            <Link
              to="/"
              className="text-3xl font-[cursive] mb-6 hover:underline"
            >
              Whisper Ai
            </Link>

            {/* My Chat (collapsible) */}
            <button
              onClick={() => setOpen((o) => ({ ...o, myChat: !o.myChat }))}
              className="w-full flex items-center justify-between text-left text-[#d77474] font-semibold mb-2"
            >
              <span className="flex items-center gap-2">
                <ExternalLink size={18} />
                My Chat
              </span>
              {open.myChat ? (
                <ChevronDown size={18} />
              ) : (
                <ChevronRight size={18} />
              )}
            </button>

            {/* Sub-items */}
            {open.myChat && (
              <ul className="ml-6 mb-4 space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => {
                      setInput("");
                      setMessages([]);
                      setThreadId("");
                      setTitle("");
                      setNewThread(true);
                    }}
                    className="flex items-center gap-2 hover:underline"
                  >
                    <PlusSquare size={16} />
                    New Chat
                  </button>
                </li>
                <li>
                  <NavLink
                    to="/chat" // or /chat/history
                    className="flex items-center gap-2 hover:underline"
                  >
                    <History size={16} />
                    Chat History
                  </NavLink>
                  {/* Example of a small dated item under history */}
                  {chatHistory.map((chat, index) => (
                    <div
                      key={index}
                      className="ml-6 mt-1 text-xs text-gray-600"
                    >
                      <button
                        onClick={() => handleChatHistory(chat)}
                        className="text-[#d77474] underline cursor-pointer"
                      >
                        {chat.title},{" "}
                        {new Date(chat.timeStamp * 1000).toLocaleString()}
                      </button>
                    </div>
                  ))}
                </li>
              </ul>
            )}

            {/* Other top-level links */}
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-2">
                <NotebookPen size={18} />
                <span>Journaling</span>
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
          {
            !isLoggedIn && (
              <div className="pt-8">
                <Link
                  to="/login"
                  className="block text-[#c88f8f] font-semibold text-lg hover:underline"
                >
                  Login/Sign up
                </Link>
              </div>
            )
          }
        </aside>

        {/* Chat Content */}
        <main className="flex-1 p-6">
          {!isLoggedIn && (
            <p className="text-center text-sm mb-4">
              Anonymous chats are erased when you exit. Want to save them?{" "}
              <Link
                to="/signup"
                className="text-[#d77474] underline cursor-pointer"
              >
                Sign up here
              </Link>
            </p>
          )}
          <h1 className="text-xl font-semibold mb-6 text-center">
            Welcome. You can talk to me about anything.
            <br />
            What’s on your mind today?
          </h1>
          {/* Chat Messages */}
          <div className="space-y-3 max-w-xl mx-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-md w-fit max-w-[80%] text-sm ${
                  msg.role === "user" ? "ml-auto bg-[#e5bcbc]" : "bg-[#f7f7f7]"
                }`}
              >
                {msg.message}
              </div>
            ))}
          </div>
          {/* Input Area */}
          <div className="mt-10 max-w-xl mx-auto relative">
            <div className="relative flex items-center bg-[#fefefe] border border-[#e6cfcf] rounded-full px-4 py-2">
              <button className="text-[#a07c84] text-xl mr-2">➕</button>
              <button className="text-[#a07c84] text-xl mr-4">🎛️</button>
              <input
                type="text"
                placeholder="You can whisper anything here..."
                className="flex-1 outline-none placeholder:text-gray-500 bg-transparent"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                onClick={recording ? stopRecording : startRecording}
                className={`text-[#4a2f2f] text-xl mr-3 ${
                  recording ? "animate-pulse" : ""
                }`}
                title={recording ? "Stop Recording" : "Start Recording"}
              >
                <Mic size={18} />
                {recording && (
                  <span className="ml-1 text-red-500 text-xs">●</span>
                )}
              </button>
              <button
                onClick={() => handleSend(input)}
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
              Mistakes can happen — even with Whisper. See our{" "}
              <span className="underline">terms of Use</span>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
