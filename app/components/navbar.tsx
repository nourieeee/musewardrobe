"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // install: npm install lucide-react

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          {/* <Link href="/" className="text-2xl font-bold text-blue-600">
            MuseWardrobe
          </Link> */}

          {/* Desktop Menu */}
          {/* <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
            <Link href="/" className="hover:text-blue-600 transition">Home</Link>
            <Link href="/outfit" className="hover:text-blue-600 transition">Outfit Generator</Link>
            <Link href="/chatbot" className="hover:text-blue-600 transition">Chatbot</Link>
            <Link href="/about" className="hover:text-blue-600 transition">About</Link>
          </div> */}

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="flex flex-col space-y-2 px-4 py-3 text-gray-700 font-medium">
            <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-blue-600 transition">Home</Link>
            <Link href="/outfit" onClick={() => setIsOpen(false)} className="hover:text-blue-600 transition">Outfit Generator</Link>
            <Link href="/chatbot" onClick={() => setIsOpen(false)} className="hover:text-blue-600 transition">Chatbot</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-blue-600 transition">About</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
