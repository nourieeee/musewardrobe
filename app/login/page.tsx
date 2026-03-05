"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { 
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    await signInWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );

    router.push("/dashboard");

  } catch (error: any) {
    alert(error.message);
  }

  setIsLoading(false);
};
const handleGoogleLogin = async () => {
  try {
     const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
console.log(result.user);

router.push("/dashboard");

  } catch (error: any) {
    alert(error.message);
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex flex-col">
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
                  href="/about" 
                  className="text-purple-700 hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  About
                </Link>
              </div>
            </div>

            {/* Sign Up Button */}
            <div className="flex items-center">
              <Link
                href="/signup"
                className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white px-6 py-2 rounded-xl text-sm font-medium transition-all shadow-md hover:shadow-lg"
              >
                Sign Up
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
              href="/about" 
              className="text-purple-700 hover:text-pink-500 block px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </Link>
          </div>
        </div>
      </nav>

      {/* Login Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center mb-4">
              <User className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="mt-2 text-purple-600">
              Sign in to your MuseWardrobe account
            </p>
          </div>

          {/* Login Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Email Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-purple-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-purple-200 rounded-xl placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent bg-white/80 backdrop-blur-sm text-purple-800"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-purple-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-12 py-3 border border-purple-200 rounded-xl placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent bg-white/80 backdrop-blur-sm text-purple-800"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-pink-500 focus:ring-pink-400 border-purple-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-purple-600">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/forgot-password" className="font-medium text-pink-500 hover:text-pink-600 transition-colors">
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-xl text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  "Sign in to your account"
                )}
              </button>
            </div>

{/* Divider */}
<div className="flex items-center my-6">
  <div className="flex-grow h-px bg-purple-200"></div>
  <span className="px-4 text-purple-500 text-sm">OR</span>
  <div className="flex-grow h-px bg-purple-200"></div>
</div>

{/* Google Login */}
<button
  type="button"
  onClick={handleGoogleLogin}
  className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-purple-200 bg-white hover:bg-purple-50 transition"
>
  <img
    src="https://www.svgrepo.com/show/475656/google-color.svg"
    alt="Google"
    className="w-5 h-5"
  />
  Continue with Google
</button>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-purple-600">
                Don't have an account?{" "}
                <Link href="/signup" className="font-medium text-pink-500 hover:text-pink-600 transition-colors">
                  Sign up now
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm text-center py-8 border-t border-pink-100">
        <p className="text-purple-600">
          © {new Date().getFullYear()} MuseWardrobe. All rights reserved.
        </p>
      </footer>
    </div>
  );
}