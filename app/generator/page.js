"use client";
import { useState } from "react";
import { Sparkles, ChevronDown, Heart, Scissors, Palette, TrendingUp, Calendar, User, Image as ImageIcon } from "lucide-react";

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

  const options = {
    fabric: ["Cotton", "Linen", "Silk"],
    color: ["Black", "White", "Blue", "Pink"],
    style: ["Casual", "Formal", "Bohemian"],
    occasion: ["Day Out", "Office", "Party"],
    bodyType: ["Pear", "Hourglass", "Average"],
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

      const data = await res.json();
      setOutfitImage(data.imageUrl);
    } catch (err) {
      alert("Failed to generate image");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <ImageIcon className="text-white w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold text-purple-700">
            AI Outfit Image Generator
          </h1>
          <p className="text-purple-600 mt-2">
            Choose your preferences and generate an AI outfit image
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* LEFT: Controls */}
          <div className="bg-white p-8 rounded-3xl shadow-xl">
            <h2 className="text-xl font-bold mb-6">Design Parameters</h2>

            {Object.keys(options).map((key) => (
              <div key={key} className="mb-6">
                <div className="flex items-center gap-2 mb-2 capitalize text-purple-700">
                  {key === "fabric" && <Scissors size={18} />}
                  {key === "color" && <Palette size={18} />}
                  {key === "style" && <TrendingUp size={18} />}
                  {key === "occasion" && <Calendar size={18} />}
                  {key === "bodyType" && <User size={18} />}
                  {key}
                </div>

                <button
                  onClick={() => toggleDropdown(key)}
                  className="w-full border p-3 rounded-xl flex justify-between"
                >
                  {selections[key] || `Select ${key}`}
                  <ChevronDown />
                </button>

                {activeDropdown === key && (
                  <div className="border rounded-xl mt-2 bg-white shadow">
                    {options[key].map((item) => (
                      <div
                        key={item}
                        onClick={() => handleSelect(key, item)}
                        className="p-3 hover:bg-purple-50 cursor-pointer"
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
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-xl font-bold"
            >
              {loading ? "AI is Designing..." : "Generate Outfit Image"}
            </button>
          </div>

          {/* RIGHT: Result */}
          <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col">
            <h2 className="text-xl font-bold mb-4">AI Generated Outfit</h2>

            {outfitImage ? (
              <>
                <img
                  src={outfitImage}
                  alt="Generated Outfit"
                  className="rounded-xl mb-4"
                />
                <div className="flex flex-wrap gap-2">
                  {Object.entries(selections).map(([k, v]) => (
                    <span key={k} className="bg-purple-100 px-3 py-1 rounded-full text-sm">
                      {k}: {v}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col justify-center items-center text-gray-500">
                <div className="text-6xl mb-4">👗</div>
                Select options to generate outfit
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
