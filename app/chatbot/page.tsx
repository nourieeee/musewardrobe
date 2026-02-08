"use client";
import { useState, useRef, useEffect } from "react";
import { askRealFashionAI } from "@/services/ai";
import { Send, Bot, User, Sparkles, ThumbsUp } from "lucide-react";

export default function FashionChatbotPage() {
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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

 const handleSend = async (e: React.FormEvent) => {

    e.preventDefault();
    if (!input.trim() || loading) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Get AI response
      const aiResponse = await askRealFashionAI(input);
      
      // Add bot message
      const botMessage = {
        id: messages.length + 2,
        text: aiResponse,
        sender: "bot",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, {
        id: messages.length + 2,
        text: "Oops! I'm having a fashion emergency! 🚨 Try asking again!",
        sender: "bot",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center shadow-xl">
              <Bot className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Fashion AI Assistant
          </h1>
          <p className="text-gray-600 text-lg">
            Your personal stylist available 24/7! Ask anything fashion-related 💫
          </p>
        </div>

        {/* Chat Container */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-blue-100">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">Fashion Expert Bot</h2>
                  <p className="text-sm opacity-90">Online • Ready to help</p>
                </div>
              </div>
              <div className="text-sm bg-white/20 px-3 py-1 rounded-full">
                💃 Style Assistant
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-[500px] overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-blue-500 to-teal-600 text-white rounded-br-none"
                      : "bg-gradient-to-r from-blue-50 to-teal-50 text-gray-800 rounded-bl-none border border-blue-100"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {message.sender === "bot" ? (
                      <Bot className="w-4 h-4 text-blue-500" />
                    ) : (
                      <User className="w-4 h-4 text-white" />
                    )}
                    <span className="text-xs opacity-75">
                      {message.sender === "bot" ? "Fashion Bot" : "You"} • {message.time}
                    </span>
                  </div>
                  <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
                  
                  {message.sender === "bot" && (
                    <button className="mt-2 text-xs opacity-75 hover:opacity-100">
                      <ThumbsUp className="w-3 h-3 inline mr-1" />
                      Helpful
                    </button>
                  )}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl rounded-bl-none p-4 border border-blue-100">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-600">Fashion bot is thinking...</span>
                  </div>
                  <div className="flex gap-1 mt-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="border-t border-blue-100 p-4 bg-blue-50/50">
            <p className="text-sm text-gray-600 mb-3 font-medium">💡 Quick questions to try:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => setInput(question)}
                  className="px-4 py-2 bg-white text-blue-700 rounded-full hover:bg-blue-50 transition-all border border-blue-200 text-sm hover:scale-105"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-blue-100 p-4 bg-white">
            <form onSubmit={handleSend} className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about outfits, styles, fashion tips..."
                  className="w-full px-5 py-4 border-2 border-blue-200 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-lg"
                  disabled={loading}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  💬
                </div>
              </div>
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-teal-600 text-white rounded-2xl hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 flex items-center gap-2 font-bold"
              >
                <Send className="w-5 h-5" />
                Ask
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-3 text-center">
  ✨ Powered by OpenAI • Real-time fashion advice
</p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white/80 p-6 rounded-2xl text-center shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-3">👗</div>
            <h3 className="font-bold text-gray-800 mb-2">Personal Stylist</h3>
            <p className="text-gray-600">Get personalized outfit recommendations</p>
          </div>
          <div className="bg-white/80 p-6 rounded-2xl text-center shadow-lg border border-teal-100 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-3">💡</div>
            <h3 className="font-bold text-gray-800 mb-2">Trend Expert</h3>
            <p className="text-gray-600">Latest fashion trends and tips</p>
          </div>
          <div className="bg-white/80 p-6 rounded-2xl text-center shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-3">⏰</div>
            <h3 className="font-bold text-gray-800 mb-2">24/7 Available</h3>
            <p className="text-gray-600">Always ready to help with fashion</p>
          </div>
        </div>
      </div>
    </div>
  );
}