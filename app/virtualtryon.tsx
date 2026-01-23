"use client";
import { useState, useRef } from "react";  
import Link from "next/link";
import { Camera, Upload, RefreshCw, Download, Plus, Minus, RotateCw, User, Sparkles } from "lucide-react";

export default function VirtualTryOn() {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [selectedClothing, setSelectedClothing] = useState("");
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Sample clothing items
  const clothingItems = [
    { id: "1", name: "Floral Dress", category: "Dresses", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop" },
    { id: "2", name: "Denim Jacket", category: "Jackets", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=400&fit=crop" },
    { id: "3", name: "Summer Top", category: "Tops", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=400&fit=crop" },
    { id: "4", name: "Maxi Skirt", category: "Skirts", image: "https://images.unsplash.com/photo-1583496661160-fb5886a13d77?w=300&h=400&fit=crop" },
    { id: "5", name: "Leather Jacket", category: "Jackets", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=400&fit=crop" },
    { id: "6", name: "Evening Gown", category: "Dresses", image: "https://images.unsplash.com/photo-1566479179816-d8643d6d39fc?w=300&h=400&fit=crop" },
  ];

  const handleCameraToggle = () => {
    setIsCameraActive(!isCameraActive);
    // In a real app, you would start/stop the camera stream here
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Handle file upload logic here
      console.log("Uploaded file:", file);
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        // Simulate processing
      }, 2000);
    }
  };

  const handleTryOn = (clothingId) => {
    setSelectedClothing(clothingId);
    // In a real app, this would trigger AR/VR try-on
    console.log("Trying on clothing:", clothingId);
  };

  const handleScaleChange = (increment) => {
    setScale(prev => Math.max(0.5, Math.min(3, prev + increment)));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handleDownload = () => {
    // In a real app, this would save the try-on result
    alert("Image downloaded successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                MuseWardrobe
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link 
                  href="/" 
                  className="text-purple-700 hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Home
                </Link>
                <Link 
                  href="/generator" 
                  className="text-purple-700 hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Outfit Generator
                </Link>
                <Link 
                  href="/chatbot" 
                  className="text-purple-700 hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Fashion Chatbot
                </Link>
                <Link 
                  href="/dashboard" 
                  className="text-purple-700 hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <Link 
                  href="/virtual-tryon" 
                  className="text-pink-600 font-semibold px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Virtual Try-On
                </Link>
                <Link 
                  href="/about" 
                  className="text-purple-700 hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  About
                </Link>
              </div>
            </div>

            {/* Login Button */}
            <div className="flex items-center">
              <Link
                href="/login"
                className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white px-6 py-2 rounded-xl text-sm font-medium transition-all shadow-md hover:shadow-lg"
              >
                Login
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                className="bg-purple-100 inline-flex items-center justify-center p-2 rounded-md text-purple-700 hover:text-pink-500 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-md border-b border-pink-100">
            <Link 
              href="/" 
              className="text-purple-700 hover:text-pink-500 block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link 
              href="/generator" 
              className="text-purple-700 hover:text-pink-500 block px-3 py-2 rounded-md text-base font-medium"
            >
              Outfit Generator
            </Link>
            <Link 
              href="/chatbot" 
              className="text-purple-700 hover:text-pink-500 block px-3 py-2 rounded-md text-base font-medium"
            >
              Fashion Chatbot
            </Link>
            <Link 
              href="/dashboard" 
              className="text-purple-700 hover:text-pink-500 block px-3 py-2 rounded-md text-base font-medium"
            >
              Dashboard
            </Link>
            <Link 
              href="/virtual-tryon" 
              className="text-pink-600 font-semibold block px-3 py-2 rounded-md text-base font-medium"
            >
              Virtual Try-On
            </Link>
            <Link 
              href="/about" 
              className="text-purple-700 hover:text-pink-500 block px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Virtual Try-On
          </h1>
          <p className="text-purple-600 mt-2 max-w-2xl mx-auto">
            See how clothes look on you in real-time using augmented reality technology
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Camera/Upload Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Camera/Upload Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-purple-800">Live Preview</h2>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-sm text-purple-600">
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                    AI-Powered
                  </span>
                </div>
              </div>

              {/* Camera/Upload Area */}
              <div className="relative h-96 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl border-2 border-dashed border-purple-200 overflow-hidden">
                {isCameraActive ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Camera className="w-10 h-10 text-white" />
                      </div>
                      <p className="text-purple-700 font-medium">Camera Active</p>
                      <p className="text-purple-500 text-sm mt-1">Point camera at yourself</p>
                    </div>
                    {/* In real app, video element would be here */}
                    <video ref={videoRef} className="hidden" />
                    <canvas ref={canvasRef} className="hidden" />
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6">
                    <div className="w-24 h-24 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center mb-4">
                      <User className="w-12 h-12 text-white" />
                    </div>
                    <p className="text-purple-700 font-medium text-center mb-2">
                      No camera active
                    </p>
                    <p className="text-purple-500 text-sm text-center mb-6">
                      Start camera or upload a photo to begin virtual try-on
                    </p>
                  </div>
                )}

                {/* Controls Overlay */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
                  <button
                    onClick={handleCameraToggle}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      isCameraActive
                        ? "bg-red-100 text-red-600 hover:bg-red-200"
                        : "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-lg"
                    }`}
                  >
                    <Camera className="w-4 h-4" />
                    {isCameraActive ? "Stop Camera" : "Start Camera"}
                  </button>
                  
                  <label className="flex items-center gap-2 bg-white border border-purple-200 text-purple-700 px-4 py-2 rounded-lg font-medium hover:bg-purple-50 transition-all cursor-pointer">
                    <Upload className="w-4 h-4" />
                    Upload Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Control Panel */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="bg-purple-50 rounded-xl p-4">
                  <p className="text-sm text-purple-600 mb-2">Adjust Size</p>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => handleScaleChange(-0.1)}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded-full border border-purple-200 text-purple-700 hover:bg-purple-100"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-lg font-semibold text-purple-800">
                      {scale.toFixed(1)}x
                    </span>
                    <button
                      onClick={() => handleScaleChange(0.1)}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded-full border border-purple-200 text-purple-700 hover:bg-purple-100"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-xl p-4">
                  <p className="text-sm text-purple-600 mb-2">Rotate</p>
                  <button
                    onClick={handleRotate}
                    className="w-full flex items-center justify-center gap-2 bg-white border border-purple-200 text-purple-700 px-4 py-2 rounded-lg font-medium hover:bg-purple-50 transition-all"
                  >
                    <RotateCw className="w-4 h-4" />
                    {rotation}°
                  </button>
                </div>

                <div className="bg-purple-50 rounded-xl p-4">
                  <p className="text-sm text-purple-600 mb-2">Save Result</p>
                  <button
                    onClick={handleDownload}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all"
                  >
                    <Download className="w-4 h-4" />
                    Download Image
                  </button>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-100">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-8 h-8 border-t-2 border-purple-500 rounded-full animate-spin"></div>
                  <p className="text-purple-700 font-medium">Processing your image...</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Clothing Selection */}
          <div className="space-y-6">
            {/* Clothing Items */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-purple-800">Clothing Items</h2>
                <span className="text-sm text-purple-500">{clothingItems.length} items</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {clothingItems.map((item) => (
                  <div
                    key={item.id}
                    className={`group relative rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                      selectedClothing === item.id
                        ? "border-pink-500 shadow-lg"
                        : "border-purple-100 hover:border-purple-300"
                    }`}
                    onClick={() => handleTryOn(item.id)}
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                      <p className="text-white font-medium text-sm">{item.name}</p>
                      <p className="text-purple-200 text-xs">{item.category}</p>
                    </div>
                    {selectedClothing === item.id && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Try-On Button */}
              <button
                onClick={() => selectedClothing && handleTryOn(selectedClothing)}
                disabled={!selectedClothing}
                className={`w-full mt-6 py-3 rounded-xl font-semibold transition-all ${
                  selectedClothing
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-lg"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {selectedClothing ? "Apply to Preview" : "Select an item to try on"}
              </button>
            </div>

            {/* Tips & Instructions */}
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-100">
              <h3 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                How to Use
              </h3>
              <ul className="space-y-2 text-sm text-purple-600">
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-pink-600 font-medium">1</span>
                  </div>
                  Start camera or upload a clear photo of yourself
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-purple-600 font-medium">2</span>
                  </div>
                  Select a clothing item from the gallery
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-pink-600 font-medium">3</span>
                  </div>
                  Adjust size and position using controls
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-purple-600 font-medium">4</span>
                  </div>
                  Download or save your virtual try-on result
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm text-center py-8 border-t border-pink-100 mt-auto">
        <p className="text-purple-600">
          © {new Date().getFullYear()} MuseWardrobe. All rights reserved.
        </p>
      </footer>
    </div>
  );
}