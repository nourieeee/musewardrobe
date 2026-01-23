"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User, Calendar } from "lucide-react";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false);
      // Handle signup logic here
      console.log("Signup attempted with:", formData);
    }, 1500);
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
              href="/about" 
              className="text-purple-700 hover:text-pink-500 block px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </Link>
          </div>
        </div>
      </nav>

      {/* Signup Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center mb-4">
              <User className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Join MuseWardrobe
            </h2>
            <p className="mt-2 text-purple-600">
              Create your account and start your fashion journey
            </p>
          </div>

          {/* Signup Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-purple-400" />
                  </div>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-purple-200 rounded-xl placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent bg-white/80 backdrop-blur-sm text-purple-800"
                    placeholder="First name"
                  />
                </div>
                <div className="relative">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="block w-full px-3 py-3 border border-purple-200 rounded-xl placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent bg-white/80 backdrop-blur-sm text-purple-800"
                    placeholder="Last name"
                  />
                </div>
              </div>

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

              {/* Birth Date */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-purple-400" />
                </div>
                <input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  autoComplete="bday"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-purple-200 rounded-xl placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent bg-white/80 backdrop-blur-sm text-purple-800"
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
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-12 py-3 border border-purple-200 rounded-xl placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent bg-white/80 backdrop-blur-sm text-purple-800"
                  placeholder="Create password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-purple-400 hover:text-purple-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-purple-400 hover:text-purple-600" />
                  )}
                </button>
              </div>

              {/* Confirm Password Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-purple-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-12 py-3 border border-purple-200 rounded-xl placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent bg-white/80 backdrop-blur-sm text-purple-800"
                  placeholder="Confirm password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-purple-400 hover:text-purple-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-purple-400 hover:text-purple-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-pink-500 focus:ring-pink-400 border-purple-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-purple-600">
                I agree to the{" "}
                <Link href="/terms" className="font-medium text-pink-500 hover:text-pink-600 transition-colors">
                  Terms and Conditions
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="font-medium text-pink-500 hover:text-pink-600 transition-colors">
                  Privacy Policy
                </Link>
              </label>
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
                    Creating account...
                  </div>
                ) : (
                  "Create your account"
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-purple-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gradient-to-br from-pink-50 to-purple-50 text-purple-500">
                  Or sign up with
                </span>
              </div>
            </div>

            {/* Social Signup */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full inline-flex justify-center py-3 px-4 border border-purple-200 rounded-xl text-sm font-medium text-purple-700 bg-white hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 transition-all duration-200"
              >
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="ml-2">Facebook</span>
              </button>
              <button
                type="button"
                className="w-full inline-flex justify-center py-3 px-4 border border-purple-200 rounded-xl text-sm font-medium text-purple-700 bg-white hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 transition-all duration-200"
              >
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span className="ml-2">Instagram</span>
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-purple-600">
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-pink-500 hover:text-pink-600 transition-colors">
                  Sign in now
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