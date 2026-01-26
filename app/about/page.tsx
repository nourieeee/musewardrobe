// pages/about.js

"use client";
import Link from "next/link";

export default function About() {
  return (
    <div className="bg-gradient-to-br from-pink-50 to-purple-50 min-h-screen flex flex-col">
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

      {/* About Section */}
      <section className="flex flex-col items-center text-center py-20 px-6 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100">
        <h1 className="text-5xl font-extrabold text-purple-800 mb-4">About MuseWardrobe</h1>
        <p className="max-w-3xl text-lg text-purple-700">
          MuseWardrobe is an AI-powered fashion platform that blends creativity and technology. 
          Our mission is to empower every individual to discover their personal style effortlessly. 
          With the help of intelligent outfit generation, fashion chatbot guidance, and personalized dashboards — 
          we make dressing up a truly enjoyable experience.
        </p>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-pink-100 hover:shadow-xl transition-all">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">Our Vision</h2>
          <p className="text-purple-600 leading-relaxed">
            To revolutionize the fashion world by fusing AI with creativity, making fashion more inclusive, sustainable, and inspiring for everyone.
          </p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-purple-100 hover:shadow-xl transition-all">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">Our Mission</h2>
          <p className="text-purple-600 leading-relaxed">
            We aim to help users express themselves confidently through outfits that match their style, mood, and occasion — all powered by AI recommendations.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gradient-to-r from-pink-50 to-purple-50 text-center">
        <h2 className="text-3xl font-bold text-purple-800 mb-6">Meet the Team</h2>
        <p className="max-w-3xl mx-auto text-purple-600 mb-10">
          MuseWardrobe is built by a passionate team of developers, designers, and AI enthusiasts 
          who believe fashion should be smart, personal, and fun.
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          {[
            { name: "Ayisha Nourin", role: "Founder & Lead Developer" },
            { name: "AI Stylist", role: "Virtual Fashion Assistant" },
            { name: "Design Team", role: "UI/UX & Creative Direction" },
          ].map((member, i) => (
            <div
              key={i}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-pink-100 hover:shadow-xl transition-all"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl text-white font-bold">
                {member.name.charAt(0)}
              </div>
              <h3 className="text-xl font-semibold text-purple-800">{member.name}</h3>
              <p className="text-purple-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-16">
        <h3 className="text-3xl font-bold text-purple-800">Join Our Fashion Revolution</h3>
        <p className="mt-2 text-purple-600 max-w-xl mx-auto">
          Be part of the journey to create a smarter, more expressive fashion experience.
        </p>
        <Link
            href="/generator"
          className="mt-6 inline-block bg-gradient-to-r from-pink-400 to-purple-500 text-white px-8 py-4 rounded-xl shadow-lg hover:from-pink-500 hover:to-purple-600 hover:shadow-xl transition-all font-semibold"
        >
          Get Started
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm text-center py-8 mt-auto border-t border-pink-100">
        <p className="text-purple-600">
          © {new Date().getFullYear()} MuseWardrobe. Crafted with ❤️ by Ayisha Nourin.
        </p>
      </footer>
    </div>
  );
}
