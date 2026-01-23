// pages/generator.js

import { useState } from "react";

export default function Generator() {
  const [fabric, setFabric] = useState("");
  const [color, setColor] = useState("");
  const [occasion, setOccasion] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [style, setStyle] = useState("");
  const [generatedOutfit, setGeneratedOutfit] = useState(null);

  const handleGenerate = () => {
    // Placeholder for AI-generated outfit logic
    setGeneratedOutfit({
      name: "Elegant Summer Dress",
      description: "A light, breezy dress perfect for summer outings.",
      links: [
        { name: "Amazon", url: "https://amazon.com" },
        { name: "Flipkart", url: "https://flipkart.com" },
      ],
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Generator</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Fabric"
          value={fabric}
          onChange={(e) => setFabric(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Occasion"
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Body Type"
          value={bodyType}
          onChange={(e) => setBodyType(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Style"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <button
        onClick={handleGenerate}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
      >
        Generate
      </button>

      {generatedOutfit && (
        <div className="mt-8 p-4 border rounded bg-gray-50">
          <h2 className="text-2xl font-semibold mb-2">{generatedOutfit.name}</h2>
          <p className="mb-2">{generatedOutfit.description}</p>
          <div className="flex gap-4">
            {generatedOutfit.links.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
