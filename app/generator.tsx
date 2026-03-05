"use client";
import { useState } from "react";

export default function Generator() {
  const [form, setForm] = useState({
    fabric: "",
    color: "",
    style: "",
    occasion: "",
    bodyType: "",
  });

  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setForm({ ...form, [name]: value });
};


const handleGenerate = async () => {
  alert("TEST WORKING");
};

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        AI Outfit Generator
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input name="fabric" placeholder="Fabric" onChange={handleChange} className="border p-2 rounded" />
        <input name="color" placeholder="Color" onChange={handleChange} className="border p-2 rounded" />
        <input name="style" placeholder="Style" onChange={handleChange} className="border p-2 rounded" />
        <input name="occasion" placeholder="Occasion" onChange={handleChange} className="border p-2 rounded" />
        <input name="bodyType" placeholder="Body Type" onChange={handleChange} className="border p-2 rounded" />
      </div>

      <button
        onClick={handleGenerate}
        className="bg-blue-500 text-white px-6 py-2 rounded"
      >
        {loading ? "Generating..." : "Generate Outfit"}
      </button>

    {image && (
  <div className="mt-8">
    <img
      src={image}
      alt="AI Generated Outfit"
      className="rounded-xl shadow-md"
    />
  </div>
)}
    </div>
  );
}
