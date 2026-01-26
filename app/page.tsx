import Link from "next/link";
export default function Home() {
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

      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100">
        <h2 className="text-5xl font-extrabold text-purple-800">
          MuseWardrobe
        </h2>
        <p className="mt-4 text-2xl font-extrabold text-purple-700 max-w-2xl mx-auto">
          Your Personal AI Stylist
        </p>
        <p className="mt-3 text-lg text-purple-600 max-w-2xl mx-auto">
          MuseWardrobe helps you discover the perfect outfit for any occasion. 
          Powered by AI, it personalizes your fashion journey and makes styling effortless.
        </p>
        <div className="mt-6">
          <Link
            href="/generator"
            className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold text-lg transform hover:-translate-y-0.5"
          >
            Try Outfit Generator
          </Link>
        </div>
      </section>

      {/* Features Section */}
<section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
  <Link href="/generator" className="block">
    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-pink-100 text-center hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1 cursor-pointer">
      <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl">👗</span>
      </div>
      <h3 className="text-xl font-bold mb-3 text-purple-800">Outfit Generator</h3>
      <p className="text-purple-600">
        Get AI-powered outfit suggestions tailored to your style and occasion.
      </p>
    </div>
  </Link>
  
  <Link href="/chatbot" className="block">
    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-purple-100 text-center hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1 cursor-pointer">
      <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl">💬</span>
      </div>
      <h3 className="text-xl font-bold mb-3 text-purple-800">Fashion Chatbot</h3>
      <p className="text-purple-600">
        Ask our AI stylist for instant fashion tips, color matches, and more.
      </p>
    </div>
  </Link>
  
  <Link href="/dashboard" className="block">
    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-blue-100 text-center hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1 cursor-pointer">
      <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl">📊</span>
      </div>
      <h3 className="text-xl font-bold mb-3 text-purple-800">User Dashboard</h3>
      <p className="text-purple-600">
        Stay on top of your saved outfits, style profile, and personalized AI recommendations.
      </p>
    </div>
  </Link>
  
  <Link href="/about" className="block">
    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-pink-100 text-center hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1 cursor-pointer">
      <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl">👥</span>
      </div>
      <h3 className="text-xl font-bold mb-3 text-purple-800">About Us</h3>
      <p className="text-purple-600">
        Discover our mission to blend AI with fashion and provide personalized style solutions.
      </p>
    </div>
  </Link>
  
  <Link href="/login" className="block">
    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-purple-100 text-center hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1 cursor-pointer">
      <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl">🔐</span>
      </div>
      <h3 className="text-xl font-bold mb-3 text-purple-800">Login</h3>
      <p className="text-purple-600">
        Access your account securely to manage outfits, chat with AI stylist, and explore fashion insights.
      </p>
    </div>
  </Link>
</section>

      {/* Call to Action */}
      <section className="text-center py-16 bg-gradient-to-r from-pink-50 to-purple-50">
        <h3 className="text-3xl font-bold text-purple-800">
          Ready to Transform Your Style?
        </h3>
        <p className="mt-2 text-purple-600 text-lg">
          Start exploring fashion that's personalized for you.
        </p>
        <Link
          href="/generator"
          className="mt-6 inline-block bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold text-lg transform hover:-translate-y-0.5"
        >
          Get Started
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm text-center py-8 mt-auto border-t border-pink-100">
        <p className="text-purple-600">
          © {new Date().getFullYear()} MuseWardrobe. All rights reserved.
        </p>
      </footer>
    </div>
  );
}