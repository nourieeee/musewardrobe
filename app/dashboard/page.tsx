"use client";
import { useState } from "react";
import Link from "next/link";
import { Heart, Share2, Download, Plus, Settings, User, Calendar, Star, MapPin } from "lucide-react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"all" | "favorites" | "recent">("all");
  
  // Sample outfit data
  const [outfits, setOutfits] = useState([
    {
      id: "1",
      name: "Floral Midi Dress",
      description: "Perfect for summer with a floral print. Wedge heels complement the look beautifully.",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop",
      occasion: "Casual",
      style: "Bohemian",
      isFavorite: true,
      dateCreated: "2024-01-15",
    },
    {
      id: "2",
      name: "Professional Blazer Set",
      description: "Sharp and sophisticated for office meetings and professional events.",
      image: "https://images.unsplash.com/photo-1485231183945-fffde7cb34f0?w=300&h=400&fit=crop",
      occasion: "Formal",
      style: "Professional",
      isFavorite: false,
      dateCreated: "2024-01-10",
    },
    {
      id: "3",
      name: "Evening Gown Elegance",
      description: "Elegant navy blue gown perfect for formal dinners and special occasions.",
      image: "https://images.unsplash.com/photo-1566479179816-d8643d6d39fc?w=300&h=400&fit=crop",
      occasion: "Evening",
      style: "Elegant",
      isFavorite: true,
      dateCreated: "2024-01-08",
    },
    {
      id: "4",
      name: "Weekend Casual",
      description: "Comfortable yet stylish for weekend outings and casual gatherings.",
      image: "https://images.unsplash.com/photo-1583496661160-fb5886a13d77?w=300&h=400&fit=crop",
      occasion: "Casual",
      style: "Streetwear",
      isFavorite: false,
      dateCreated: "2024-01-05",
    },
    {
      id: "5",
      name: "Beach Summer Outfit",
      description: "Light and breezy perfect for beach days and summer vacations.",
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&h=400&fit=crop",
      occasion: "Beach",
      style: "Summer",
      isFavorite: true,
      dateCreated: "2024-01-03",
    },
    {
      id: "6",
      name: "Winter Cozy Look",
      description: "Warm and stylish for cold winter days with layered clothing.",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=400&fit=crop",
      occasion: "Winter",
      style: "Cozy",
      isFavorite: false,
      dateCreated: "2024-01-01",
    },
  ]);

  // Calculate outfits created this month
  const getOutfitsThisMonth = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    return outfits.filter(outfit => {
      const outfitDate = new Date(outfit.dateCreated);
      return outfitDate.getMonth() === currentMonth && outfitDate.getFullYear() === currentYear;
    }).length;
  };

  // Toggle favorite status
  const toggleFavorite = (id: string) => {
    setOutfits(outfits.map(outfit => 
      outfit.id === id ? { ...outfit, isFavorite: !outfit.isFavorite } : outfit
    ));
  };

  // Filter outfits based on active tab
  const filteredOutfits = outfits.filter(outfit => {
    if (activeTab === "favorites") return outfit.isFavorite;
    if (activeTab === "recent") {
      const date = new Date(outfit.dateCreated);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return date >= weekAgo;
    }
    return true;
  });

  const favoritesCount = outfits.filter(o => o.isFavorite).length;
  const outfitsThisMonth = getOutfitsThisMonth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                MuseWardrobe
              </span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:block">
  <div className="ml-10 flex items-baseline space-x-8">
    <Link href="/" className="text-purple-700 hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
      Home
    </Link>
    <Link href="/generator" className="text-purple-700 hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
      Outfit Generator
    </Link>

<Link 
href="/virtualtryon" 
className="text-purple-700 hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
>
Virtual Try-On
</Link>
    <Link href="/chatbot" className="text-purple-700 hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
      Fashion Chatbot
    </Link>
    <Link href="/dashboard" className="text-purple-700 hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
      Dashboard
    </Link>
    <Link href="/about" className="text-purple-700 hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
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
                {/* Hamburger icon */}
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden" id="mobile-menu">
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
              href="/about" 
              className="text-purple-700 hover:text-pink-500 block px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </Link>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="flex-1 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Welcome Back!</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your fashion journey continues here. Discover, create, and inspire with your personal style collection.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Total Outfits Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Outfits</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{outfits.length}</p>
                  <p className="text-green-600 text-sm mt-1">Your complete collection</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <User className="text-blue-600" size={28} />
                </div>
              </div>
            </div>
            
            {/* Favorites Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Favorites</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{favoritesCount}</p>
                  <p className="text-pink-600 text-sm mt-1">Your most loved styles</p>
                </div>
                <div className="p-3 bg-pink-100 rounded-full">
                  <Heart className="text-pink-600" size={28} />
                </div>
              </div>
            </div>
            
            {/* Outfits Created This Month Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Created This Month</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">6</p>
                  <p className="text-purple-600 text-sm mt-1">New outfits created</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Calendar className="text-purple-600" size={28} />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-4 mb-8">
            {[
              { id: "all", label: "All Outfits", count: outfits.length },
              { id: "favorites", label: "Favorites", count: favoritesCount },
              { id: "recent", label: "Recent", count: outfitsThisMonth },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {tab.label} <span className="ml-2 bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Generate New Outfit Button */}
          <div className="text-center mb-8">
            <Link
              href="/generator"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-2xl transition-all hover:scale-105"
            >
              <Plus size={24} />
              Generate New Outfit
            </Link>
          </div>

          {/* Outfits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOutfits.map((outfit) => (
              <div
                key={outfit.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden border border-gray-100 group"
              >
                {/* Outfit Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={outfit.image}
                    alt={outfit.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={() => toggleFavorite(outfit.id)}
                      className={`p-2 rounded-full backdrop-blur-sm transition-all ${
                        outfit.isFavorite
                          ? "bg-pink-500 text-white shadow-lg"
                          : "bg-white/80 text-gray-600 hover:bg-pink-50 hover:text-pink-500"
                      }`}
                    >
                      <Heart size={18} fill={outfit.isFavorite ? "currentColor" : "none"} />
                    </button>
                    <button className="p-2 rounded-full backdrop-blur-sm bg-white/80 text-gray-600 hover:bg-purple-50 hover:text-purple-500 transition-all">
                      <Share2 size={18} />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {outfit.occasion}
                    </span>
                  </div>
                </div>

                {/* Outfit Details */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">{outfit.name}</h3>
                    <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                      {outfit.style}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {outfit.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      Created: {new Date(outfit.dateCreated).toLocaleDateString()}
                    </span>
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <Download size={16} />
                      </button>
                      <button className="text-xs bg-gradient-to-r from-pink-400 to-purple-500 text-white px-4 py-2 rounded-lg hover:shadow-md transition-all">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredOutfits.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Plus className="text-purple-400" size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No outfits yet</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Start your fashion journey by creating your first AI-generated outfit!
              </p>
              <Link
                href="/generator"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-2xl hover:shadow-2xl transition-all font-semibold"
              >
                <Plus size={20} />
                Create Your First Outfit
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}