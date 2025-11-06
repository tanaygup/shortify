import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Zap, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isShortened, setIsShortened] = useState(false);
  const redirect = useNavigate();

  const handleShorten = async () => {
    // Logic to handle URL shortening by secnding request to backend API /api/create
    try {
      // 2. Send the request to your backend
      const response = await fetch(
        `${import.meta.env.VITE_PUBLIC_API_URL}/api/create/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: longUrl }), // Send the long URL in the body
        }
      );

      // 3. Check if the request was successful
      if (response.ok) {
        const data = await response.json();
        setShortUrl(data.shortUrl); // Save the short URL
        setLongUrl(data.shortUrl); // Display it in the input box
        setIsShortened(true); // Change button to "Copy"
      } else {
        // Handle server errors (e.g., invalid URL)
        const errorData = await response.json();
        if (response.status === 401) {
          redirect("/login");
          return;
        }
        alert(errorData.message || "Failed to shorten URL");
      }
    } catch (error) {
      // 4. Handle network or other errors
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    // You could add a "Copied!" toast notification here
  };

  const handleInputChange = (e) => {
    setLongUrl(e.target.value);
    setIsShortened(false); // Reset button when user types a new URL
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered URL Shortening</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Shorten. Share. Track.
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              All in one place.
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Transform long, messy URLs into short, trackable links with the
            power of AI. Get detailed analytics and grow your brand.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="flex flex-col sm:flex-row gap-3 bg-white p-2 rounded-2xl shadow-2xl border border-gray-200">
              <input
                type="url"
                value={longUrl}
                onChange={handleInputChange}
                readOnly={isShortened}
                placeholder="Enter your long URL here..."
                className={`flex-1 px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 ${
                  isShortened && "text-blue-600 font-medium" // Style the short link
                }`}
              />
              <button
                onClick={isShortened ? handleCopy : handleShorten}
                className={`text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center space-x-2 ${
                  isShortened
                    ? "bg-gradient-to-r from-green-500 to-emerald-500" // Optional: Change color for "Copy"
                    : "bg-gradient-to-r from-blue-600 to-cyan-500"
                }`}
              >
                {isShortened ? (
                  <>
                    <Copy className="w-5 h-5" />
                    <span>Copy</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    <span>Shorten Now</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-8 text-gray-600"
          >
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-900">10,000+</span>
              <span>Links shortened</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-900">1M+</span>
              <span>Clicks tracked</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-900">5,000+</span>
              <span>Happy users</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}
