"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, Grid, Clock, Plus, Menu, X } from "lucide-react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/firebase"; // adjust path if needed

type Outfit = {
  id: number;
  image: string;
  dateCreated: string;
  isFavorite?: boolean;
  selections: {
    fabric: string;
    color: string;
    style: string;
    occasion: string;
    bodyType: string;
  };
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const allCount = outfits.length;
  const [user, setUser] = useState<any>(null);

const favoriteCount = outfits.filter(
  (outfit) => outfit.isFavorite
).length;

const recentCount = outfits.filter((outfit) => {
  const created = new Date(outfit.dateCreated);
  const now = new Date();
  const diffDays =
    (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays <= 7; // last 7 days
}).length;
  useEffect(() => {
  const saved = localStorage.getItem("savedOutfits");

  if (saved) {
    setOutfits(JSON.parse(saved));
  }
}, []);
useEffect(() => {
  const auth = getAuth(app);

  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
    } else {
      setUser(null);
    }
  });

  return () => unsubscribe();
}, []);

  // Stats data from your image
  const createdThisMonth = outfits.filter((outfit) => {
  const created = new Date(outfit.dateCreated);
  const now = new Date();

  return (
    created.getMonth() === now.getMonth() &&
    created.getFullYear() === now.getFullYear()
  );
}).length;

const stats = [
  {
    label: "Total Outfits",
    value: allCount,
    icon: <Grid className="w-5 h-5" />,
    color: "from-purple-500 to-pink-500",
  },
  {
    label: "Favorites",
    value: favoriteCount,
    icon: <Heart className="w-5 h-5" />,
    color: "from-pink-500 to-rose-500",
  },
  {
    label: "Created This Month",
    value: createdThisMonth,
    icon: <Clock className="w-5 h-5" />,
    color: "from-blue-500 to-purple-500",
  },
];

  // Sidebar menu items
  const menuItems = [
  { label: "Home", icon: <Grid className="w-5 h-5" /> },
  { label: "All Outfits", icon: <Grid className="w-5 h-5" />, badge: allCount },
  { label: "Favorites", icon: <Heart className="w-5 h-5" />, badge: favoriteCount },
  { label: "Recent", icon: <Clock className="w-5 h-5" />, badge: recentCount },
];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-xl shadow-lg"
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <div className="flex">
        {/* Sidebar */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-40
          transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 transition-transform duration-300
          w-64 bg-white/80 backdrop-blur-xl border-r border-pink-100 shadow-xl
        `}>
          <div className="p-6">
            {/* Logo */}
            <Link href="/" className="block mb-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                MuseWardrobe
              </h1>
            </Link>

            {/* User Profile */}
            <div className="flex items-center gap-3 mb-6 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                {user?.displayName?.charAt(0).toUpperCase() || "U"}
              </div>
              <div>
                <p className="font-medium text-sm">
  {user?.displayName || "User"}
</p>
<p className="text-xs text-gray-500">
  {user?.email}
</p>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-1">
              {menuItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(item.label.toLowerCase())}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                    item.active 
                      ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md" 
                      : "text-gray-600 hover:bg-pink-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={item.active ? "text-white" : "text-gray-500"}>{item.icon}</span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                 {item.badge !== undefined && (
  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
    {item.badge}
  </span>
)}
                </button>
              ))}
            </nav>

            {/* Stats from first image */}
            <div className="mt-8 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Your Collection</h3>
              <div className="space-y-3">
                {stats.map((stat, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center text-white`}>
                        {stat.icon}
                      </div>
                      <span className="text-sm text-gray-600">{stat.label}</span>
                    </div>
                    <span className="font-bold text-gray-800">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-h-screen">
          {/* Top Bar */}
          <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-pink-100 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Welcome Back!
                </h2>
                <span className="text-sm text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                  Your fashion journey continues here
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                
                {/* Create New Button */}
                <Link
  href="/generator"
  className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:shadow-lg transition-shadow"
>
  <Plus className="w-4 h-4" />
  <span>New Outfit</span>
</Link>
              </div>
            </div>
          </div>

          <div className="p-6">

            {/* Category Tabs */}
            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
              {["All Outfits", "Favorites", "Recent"].map((tab, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.toLowerCase()
                      ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md"
                      : "bg-white text-gray-600 hover:bg-pink-50 border border-pink-100"
                  }`}
                >
                  {tab} {tab === "All Outfits" && `(${allCount})`}
{tab === "Favorites" && `(${favoriteCount})`}
{tab === "Recent" && `(${recentCount})`}
                </button>
              ))}
            </div>

            {/* Outfits Grid - NO DATES, NO VIEW DETAILS, NO DOWNLOAD */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {outfits.length > 0 ? (
  outfits.map((outfit) => (
    <div
      key={outfit.id}
      className="group bg-white rounded-2xl shadow-lg border border-pink-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={outfit.image}
          alt="Saved Outfit"
          className="w-full h-full object-cover"
        />

        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-white text-xs rounded-full">
            {outfit.selections?.occasion}
          </span>
        </div>

        <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <Heart className="w-4 h-4 text-pink-500" />
        </button>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-gray-800 text-lg">
          {outfit.selections?.style} Outfit
        </h3>

        <p className="text-sm text-gray-600">
          Fabric: {outfit.selections?.fabric} • Color: {outfit.selections?.color}
        </p>
      </div>
    </div>
  ))
) : (
  <div className="text-center py-16 text-gray-500">
    No saved outfits yet 💔
  </div>
)}
            </div>

            {/* Empty State for Recent */}
            {activeTab === "recent" && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-10 h-10 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">No Recent Outfits</h3>
                <p className="text-gray-500 mb-6">Start creating your perfect outfits!</p>
                <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-shadow">
                  Create New Outfit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}