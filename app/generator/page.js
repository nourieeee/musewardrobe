"use client";
import { useState, useEffect } from "react";
import { 
  Sparkles, 
  ChevronDown, 
  Heart, 
  Scissors, 
  Palette, 
  TrendingUp, 
  Calendar, 
  User, 
  Image as ImageIcon, 
  Check, 
  Download 
} from "lucide-react";
import Link from "next/link";

export default function Generator() {
  const [selections, setSelections] = useState({
    fabric: "",
    color: "",
    style: "",
    occasion: "",
    bodyType: "",
  });

  const [outfitImage, setOutfitImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [savedOutfits, setSavedOutfits] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
const [animateHeart, setAnimateHeart] = useState(false);
useEffect(() => {
  const saved = localStorage.getItem("savedOutfits");
  if (saved) {
    setSavedOutfits(JSON.parse(saved));
  }
}, []);

  const options = {
    fabric: ["Cotton", "Linen", "Silk", "Denim", "Satin"],
    color: ["Black", "White", "Blue", "Pink", "Yellow", "Green", "Brown"],
    style: ["Casual", "Formal", "Bohemian", "Streetwear"],
    occasion: ["Day Out", "Office", "Party", "Beach"],
    bodyType: ["Pear", "Hourglass", "Average", "Rectangle", "Slim"],
  };

  const toggleDropdown = (key) => {
    setActiveDropdown(activeDropdown === key ? null : key);
  };

  const handleSelect = (key, value) => {
    setSelections((prev) => ({ ...prev, [key]: value }));
    setActiveDropdown(null);
  };

  const generateOutfit = async () => {
    const allSelected = Object.values(selections).every(Boolean);
    if (!allSelected) {
      alert("Please select all options");
      return;
    }

    setLoading(true);
    setOutfitImage("");

    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selections),
      });

      if (!res.ok) {
        const errorText = await res.text();
        alert("Backend Error: " + errorText);
        setLoading(false);
        return;
      }

     const blob = await res.blob();

const reader = new FileReader();
reader.readAsDataURL(blob);

reader.onloadend = () => {
  const base64data = reader.result;
  setOutfitImage(base64data);
};

setLoading(false);

} catch (err) {
  alert("Failed to generate image");
  setLoading(false);
}
}; // ✅ CLOSE generateOutfit HERE

const saveOutfit = () => {
  if (!outfitImage) return;

  const newOutfit = {
    id: Date.now(),
    selections: { ...selections },
    image: outfitImage,
    dateCreated: new Date().toISOString(),
    isFavorite: false,
  };

  const existing = JSON.parse(localStorage.getItem("savedOutfits")) || [];

  const updated = [newOutfit, ...existing];

  localStorage.setItem("savedOutfits", JSON.stringify(updated));

  // ✅ Update state also
  setSavedOutfits(updated);

  setIsSaved(true);
  setAnimateHeart(true);
  setTimeout(() => setAnimateHeart(false), 400);
};

  return (
  <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">

    {/* Navbar */}
    <nav className="bg-white/80 backdrop-blur-md border-b border-pink-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            MuseWardrobe
          </Link>

          {/* Back to Home */}
          <Link
            href="/"
            className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white px-6 py-2 rounded-xl text-sm font-medium transition-all shadow-md hover:shadow-lg"
          >
            Home
          </Link>

        </div>
      </div>
    </nav>

    {/* Page Content */}
    <div className="p-8">
      </div>
      <div className="max-w-5xl mx-auto">
        {/* Header - Smaller */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl rotate-6 hover:rotate-0 transition-transform duration-500 flex items-center justify-center mb-3 shadow-xl">
            <Sparkles className="text-white w-8 h-8" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            AI Outfit Generator
          </h1>
          <p className="text-purple-600 text-sm md:text-base mt-1">
            Choose preferences & generate your AI outfit
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* LEFT: Controls - Smaller Box */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-purple-100 hover:shadow-2xl transition-shadow">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-pink-500 to-purple-600 rounded-full"></div>
                Design Parameters
              </h2>
              <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                5 selections
              </span>
            </div>

            <div className="space-y-4">
              {Object.keys(options).map((key) => (
                <div key={key} className="relative">
                  <div className="flex items-center gap-2 mb-1.5 text-xs font-medium text-gray-600 uppercase tracking-wider">
                    {key === "fabric" && <Scissors size={14} className="text-pink-500" />}
                    {key === "color" && <Palette size={14} className="text-purple-500" />}
                    {key === "style" && <TrendingUp size={14} className="text-blue-500" />}
                    {key === "occasion" && <Calendar size={14} className="text-green-500" />}
                    {key === "bodyType" && <User size={14} className="text-orange-500" />}
                    {key}
                  </div>

                  <button
                    onClick={() => toggleDropdown(key)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-sm rounded-xl border transition-all ${
                      selections[key] 
                        ? "border-purple-300 bg-purple-50 text-purple-700" 
                        : "border-gray-200 bg-gray-50 text-gray-500 hover:border-purple-200"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {selections[key] && <Check size={14} className="text-green-500" />}
                      {selections[key] || `Select ${key}`}
                    </span>
                    <ChevronDown size={16} className={`transition-transform ${activeDropdown === key ? "rotate-180" : ""}`} />
                  </button>

                  {activeDropdown === key && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-purple-100 rounded-xl shadow-xl overflow-hidden animate-fadeIn">
                      {options[key].map((item) => (
                        <div
                          key={item}
                          onClick={() => handleSelect(key, item)}
                          className={`px-4 py-2.5 text-sm hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 cursor-pointer transition-all ${
                            selections[key] === item ? "bg-purple-100 text-purple-700 font-medium" : ""
                          }`}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <button
                onClick={generateOutfit}
                disabled={loading}
                className="w-full mt-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3.5 rounded-xl font-medium text-sm hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    AI is Designing...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Generate Outfit Image
                  </>
                )}
              </button>
            </div>
          </div>

          {/* RIGHT: Result - Smaller Box */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-pink-100 hover:shadow-2xl transition-shadow flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-pink-500 to-purple-600 rounded-full"></div>
                AI Generated Outfit
              </h2>
              {outfitImage && (
                <div className="flex gap-1.5">
<button
  onClick={saveOutfit}
  className="p-2 rounded-lg bg-pink-100 hover:bg-pink-200 transition"
>
  <Heart
    size={18}
    className={`
      ${isSaved ? "text-pink-500 fill-pink-500" : "text-pink-500"}
      ${animateHeart ? "scale-125" : "scale-100"}
      transition-transform duration-300
    `}
  />
</button>
                  <button 
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = outfitImage;
                      link.download = `outfit-${Date.now()}.png`;
                      link.click();
                    }}
                    className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
                    title="Download"
                  >
                    <Download size={16} />
                  </button>
                </div>
              )}
            </div>

            {outfitImage ? (
              <div className="space-y-4">
                <div className="relative group">
                  <img
                    src={outfitImage}
                    alt="Generated Outfit"
                    className="w-full rounded-xl border-2 border-purple-100 group-hover:border-purple-300 transition-all"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                </div>
                
                {/* Compact Selection Tags */}
                <div className="bg-purple-50/50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-2">Outfit details:</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {Object.entries(selections).map(([k, v]) => (
                      <div key={k} className="text-xs flex items-center gap-1.5">
                        <span className="text-gray-500 capitalize">{k}:</span>
                        <span className="font-medium text-purple-700">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col justify-center items-center text-gray-400 py-12">
                <div className="w-20 h-20 bg-purple-50 rounded-2xl flex items-center justify-center mb-4">
                  <ImageIcon className="w-8 h-8 text-purple-300" />
                </div>
                <p className="text-sm text-center max-w-[200px]">
                  Select options above to generate your AI outfit
                </p>
              </div>
            )}
          </div>
        </div>

        {/* AI Generated Vault - Compact */}
        {savedOutfits.length > 0 && (
          <div className="mt-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-purple-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <Heart size={16} className="text-pink-500" />
                AI Generated Vault
              </h3>
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                {savedOutfits.length} saved
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {savedOutfits.map((outfit) => (
                <div key={outfit.id} className="group relative">
                  <img 
                    src={outfit.image} 
                    alt="Saved outfit" 
                    className="w-full h-20 object-cover rounded-lg border border-purple-100 group-hover:border-purple-300 transition-all"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-end p-2">
                    <div className="text-[10px] text-white">
                      {outfit.selections.style} • {outfit.selections.color}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}