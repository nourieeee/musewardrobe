"use client";
import { useState } from "react";
import { getRealOutfitFromAI } from "@/services/ai";
import { Sparkles, Zap, Copy, Heart, RefreshCw } from "lucide-react";

export default function OutfitGeneratorPage() {
  const [prompt, setPrompt] = useState("");
  const [outfit, setOutfit] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [savedOutfits, setSavedOutfits] = useState([]);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError("Please describe what you want to wear! 💭");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const result = await getRealOutfitFromAI(prompt);
      setOutfit(result);
    } catch (err) {
      setError("Oops! AI needs a coffee break. Try again! ☕");
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    { emoji: "☀️", text: "Summer beach day" },
    { emoji: "💼", text: "Office professional" },
    { emoji: "🎉", text: "Party night out" },
    { emoji: "❄️", text: "Winter cozy outfit" },
    { emoji: "💑", text: "Date night special" },
    { emoji: "🏋️", text: "Gym to street style" },
  ];

  const saveOutfit = () => {
    if (outfit) {
      const newOutfit = {
        id: Date.now(),
        prompt: prompt,
        outfit: outfit,
        date: new Date().toLocaleDateString(),
      };
      setSavedOutfits([newOutfit, ...savedOutfits]);
      alert("Outfit saved to favorites! 💖");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outfit);
    alert("Outfit copied! 📋");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            AI Fashion Wizard
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Describe any occasion, get a complete AI-generated outfit instantly! ✨
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          {/* Left: Input Section */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-2xl border border-purple-100">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="w-5 h-5 text-purple-500" />
              <h2 className="text-2xl font-bold text-gray-800">
                Generate Your Outfit
              </h2>
            </div>

            <form onSubmit={handleGenerate} className="space-y-6">
              {/* Input */}
              <div>
                <label className="block text-gray-700 font-medium mb-3">
                  What's the occasion? 🎯
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Example: 'A stylish outfit for a coffee date in autumn'"
                  className="w-full h-40 p-4 border-2 border-purple-200 rounded-2xl focus:ring-2 focus:ring-pink-400 focus:border-transparent resize-none text-lg"
                  disabled={loading}
                />
              </div>

              {/* Quick Prompts */}
              <div>
                <p className="text-gray-600 mb-3">Try these ideas:</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {quickPrompts.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setPrompt(item.text)}
                      className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-xl hover:from-purple-100 hover:to-pink-100 transition-all text-left group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{item.emoji}</span>
                        <span className="text-gray-700 group-hover:text-purple-700">
                          {item.text}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                type="submit"
                disabled={loading || !prompt.trim()}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    AI is designing your outfit...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    ✨ Generate Magical Outfit
                  </div>
                )}
              </button>

              {error && (
                <div className="p-4 bg-red-50 border-2 border-red-200 text-red-700 rounded-2xl animate-pulse">
                  ⚠️ {error}
                </div>
              )}
            </form>

            {/* Stats */}
            <div className="mt-8 pt-6 border-t border-purple-100">
              <div className="flex justify-around">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">🤖</div>
                  <p className="text-sm text-gray-600">AI Powered</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-600">⚡</div>
                  <p className="text-sm text-gray-600">Instant Results</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">🎨</div>
                  <p className="text-sm text-gray-600">Unique Styles</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Output Section */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-2xl border border-pink-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Your AI Outfit
              </h2>
              {outfit && (
                <div className="flex gap-2">
                  <button
                    onClick={saveOutfit}
                    className="p-2 bg-pink-100 text-pink-600 rounded-lg hover:bg-pink-200 transition-colors"
                    title="Save to favorites"
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
                    title="Copy outfit"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Outfit Display */}
            <div className="h-[500px] overflow-y-auto">
              {loading ? (
                <div className="space-y-4 animate-pulse">
                  <div className="h-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl w-3/4"></div>
                  <div className="h-6 bg-purple-100 rounded w-1/2"></div>
                  <div className="h-6 bg-pink-100 rounded w-2/3"></div>
                  <div className="h-6 bg-purple-100 rounded w-3/4"></div>
                  <div className="h-6 bg-pink-100 rounded w-1/2"></div>
                  <div className="h-6 bg-purple-100 rounded w-2/3"></div>
                </div>
              ) : outfit ? (
                <div className="space-y-6">
                  <div className="prose prose-lg max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-gray-800 text-lg leading-relaxed">
                      {outfit}
                    </pre>
                  </div>
                  
                  {/* Outfit Preview */}
                  <div className="grid grid-cols-4 gap-4 mt-8">
                    {['👕', '👖', '👟', '💎'].map((emoji, idx) => (
                      <div key={idx} className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
                        <div className="text-3xl mb-2">{emoji}</div>
                        <div className="text-xs text-gray-600">
                          {['Top', 'Bottom', 'Shoes', 'Accessories'][idx]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="text-7xl mb-6">👗</div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-3">
                    Ready for Magic? ✨
                  </h3>
                  <p className="text-gray-500 max-w-sm">
                    Describe your occasion on the left, and watch AI create your perfect outfit!
                  </p>
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="p-3 bg-purple-50 rounded-xl">
                      <div className="text-2xl">💫</div>
                      <p className="text-sm mt-1">AI Styled</p>
                    </div>
                    <div className="p-3 bg-pink-50 rounded-xl">
                      <div className="text-2xl">🎯</div>
                      <p className="text-sm mt-1">Personalized</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Saved Outfits */}
            {savedOutfits.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-bold text-gray-700 mb-3">
                  💾 Saved Outfits ({savedOutfits.length})
                </h3>
                <div className="space-y-2">
                  {savedOutfits.slice(0, 3).map((item) => (
                    <div key={item.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between">
                        <span className="font-medium">{item.prompt}</span>
                        <span className="text-sm text-gray-500">{item.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>
            Powered by Google Gemini AI • Outfits generated in real-time • 
            <button 
              onClick={() => setPrompt("")}
              className="ml-2 text-purple-600 hover:text-purple-800 font-medium"
            >
              Clear & try again
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}