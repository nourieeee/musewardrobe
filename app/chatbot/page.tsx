"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, ThumbsUp, ChevronRight, MessageCircle, Zap, Shield, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

export default function FashionChatbotPage() {
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your personal fashion assistant! 👗 Ask me about outfits, styles, trends, or any fashion questions!",
      sender: "bot",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const isFirstLoad = useRef(true);

useEffect(() => {
  if (isFirstLoad.current) {
    isFirstLoad.current = false;
    return; // ❌ skip scrolling on first load
  }

  scrollToBottom(); // ✅ scroll only after first render
}, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      const botMessage = {
        id: messages.length + 2,
        text: data.reply,
        sender: "bot",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);

      setMessages((prev) => [
        ...prev,
        {
          id: messages.length + 2,
          text: "AI is currently unavailable.",
          sender: "bot",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickQuestions = [
    "What should I wear to a wedding?",
    "Summer outfit ideas for hot weather",
    "How to style ripped jeans?",
    "Office fashion do's and don'ts",
    "Best colors for summer 2024",
    "Casual date night outfit"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Navbar */}
<div className="w-full bg-white shadow-md py-3 px-6 flex justify-between items-center">
  <h2 className="font-bold text-purple-600 text-lg">
    MuseWardrobe
  </h2>

  <Link
    href="/"
    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
  >
     Home
  </Link>
</div>
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* CHANGED: max-w-4xl to max-w-2xl for narrower width */}
      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header - REDUCED MAIN HEADING TEXT SIZE */}
        <div className="text-center mb-6 sm:mb-8 animate-fadeIn">
          <div className="inline-flex items-center justify-center mb-4 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl relative">
              <Bot className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
          </div>
          {/* CHANGED: text-3xl/sm:text-4xl/md:text-5xl to text-2xl/sm:text-3xl/md:text-4xl */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Fashion AI Assistant
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Your personal stylist available 24/7! Ask anything fashion-related 💫
          </p>
        </div>

        {/* Chat Container */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-white/20 hover:shadow-3xl transition-all duration-300 animate-slideUp">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 p-3 sm:p-4 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-pulse" />
                </div>
                <div>
                  <h2 className="font-bold text-sm sm:text-base md:text-lg">Fashion Expert Bot</h2>
                  <div className="flex items-center gap-1 text-xs sm:text-sm opacity-90">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                    <span>Online • Ready to help</span>
                  </div>
                </div>
              </div>
              <div className="text-xs sm:text-sm bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm inline-flex items-center gap-1 w-fit">
                <MessageCircle className="w-3 h-3" />
                <span>Style Assistant</span>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-[350px] sm:h-[400px] md:h-[500px] overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 scroll-smooth">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-slideIn`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-3 sm:p-4 ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 text-white rounded-br-none shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                      : "bg-gradient-to-r from-gray-50 to-purple-50 text-gray-800 rounded-bl-none border border-purple-100 shadow-md hover:shadow-lg transition-all duration-300"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1 sm:mb-2">
                    {message.sender === "bot" ? (
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-purple-100 rounded-full flex items-center justify-center">
                        <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white/20 rounded-full flex items-center justify-center">
                        <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                    )}
                    <span className="text-[10px] sm:text-xs opacity-75">
                      {message.sender === "bot" ? "Fashion Bot" : "You"} • {message.time}
                    </span>
                  </div>
                  
                  <div className="prose prose-sm sm:prose-base max-w-none leading-relaxed text-[13px] sm:text-[15px] prose-headings:text-inherit prose-strong:text-inherit">
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                  </div>
                  
                  {message.sender === "bot" && (
                    <button className="mt-2 text-[10px] sm:text-xs opacity-60 hover:opacity-100 transition-opacity flex items-center gap-1 group">
                      <ThumbsUp className="w-3 h-3 group-hover:scale-110 transition-transform" />
                      Helpful
                    </button>
                  )}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start animate-slideIn">
                <div className="bg-gradient-to-r from-gray-50 to-purple-50 rounded-2xl rounded-bl-none p-4 border border-purple-100 shadow-md">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                      <Bot className="w-3 h-3 text-purple-600 animate-pulse" />
                    </div>
                    <span className="text-sm text-gray-600">Fashion bot is thinking...</span>
                  </div>
                  <div className="flex gap-1 mt-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="border-t border-purple-100 p-3 sm:p-4 bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50">
            <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 font-medium flex items-center gap-1">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500" />
              Quick questions to try:
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {quickQuestions.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => setInput(question)}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white text-purple-700 rounded-full hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300 border border-purple-200 text-[11px] sm:text-sm hover:scale-105 hover:shadow-lg group"
                >
                  <span className="group-hover:hidden">{question.length > 25 ? question.substring(0, 20) + '...' : question}</span>
                  <span className="hidden group-hover:inline">{question}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-purple-100 p-3 sm:p-4 bg-white">
            <form onSubmit={handleSend} className="flex gap-2 sm:gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about outfits, styles, fashion tips..."
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-purple-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-transparent text-sm sm:text-base bg-gray-50 hover:bg-white transition-colors pr-10"
                  disabled={loading}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lg sm:text-xl">
                  💬
                </div>
              </div>
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="px-5 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 text-white rounded-xl sm:rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 flex items-center gap-1 sm:gap-2 font-bold text-sm sm:text-base whitespace-nowrap group"
              >
                <span className="hidden sm:inline">Ask</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-2 sm:mt-3 text-center flex items-center justify-center gap-1">
              <Shield className="w-3 h-3 text-purple-400" />
              Powered by OpenAI • Real-time fashion advice
            </p>
          </div>
        </div>

        {/* Features - REDUCED BOX SIZES */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mt-4 sm:mt-6">
          <div className="bg-white/80 backdrop-blur-sm p-3 sm:p-4 rounded-lg sm:rounded-xl text-center shadow-md border border-purple-100 hover:shadow-lg transition-all duration-300 hover:scale-105 group animate-fadeIn">
            <div className="text-2xl sm:text-3xl mb-1 sm:mb-2 transform group-hover:scale-110 transition-transform">👗</div>
            <h3 className="font-bold text-xs sm:text-sm text-gray-800 mb-0.5 sm:mb-1">Personal Stylist</h3>
            <p className="text-[10px] sm:text-xs text-gray-600">Get personalized outfit recommendations</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm p-3 sm:p-4 rounded-lg sm:rounded-xl text-center shadow-md border border-pink-100 hover:shadow-lg transition-all duration-300 hover:scale-105 group animate-fadeIn animation-delay-200">
            <div className="text-2xl sm:text-3xl mb-1 sm:mb-2 transform group-hover:scale-110 transition-transform">💡</div>
            <h3 className="font-bold text-xs sm:text-sm text-gray-800 mb-0.5 sm:mb-1">Trend Expert</h3>
            <p className="text-[10px] sm:text-xs text-gray-600">Latest fashion trends and tips</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm p-3 sm:p-4 rounded-lg sm:rounded-xl text-center shadow-md border border-blue-100 hover:shadow-lg transition-all duration-300 hover:scale-105 group animate-fadeIn animation-delay-400">
            <div className="text-2xl sm:text-3xl mb-1 sm:mb-2 transform group-hover:scale-110 transition-transform">⏰</div>
            <h3 className="font-bold text-xs sm:text-sm text-gray-800 mb-0.5 sm:mb-1">24/7 Available</h3>
            <p className="text-[10px] sm:text-xs text-gray-600">Always ready to help with fashion</p>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
}