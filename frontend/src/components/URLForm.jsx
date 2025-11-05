import { useState } from "react";
import { Link2, Sparkles, Copy, Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { shortenURL, generateAISlug } from "../utils/api";

const URLForm = ({ onURLCreated }) => {
  const [activeTab, setActiveTab] = useState("normal");
  const [url, setUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const tabs = [
    { id: "normal", label: "Quick Shorten", icon: Link2 },
    { id: "custom", label: "Custom Slug", icon: Link2 },
    { id: "ai", label: "AI-Powered", icon: Sparkles },
  ];

  const handleNormalShorten = async () => {
    if (!url) {
      setError("Please enter a URL");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await shortenURL(url);
      setResult(data);
      onURLCreated?.(data);
      setUrl("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to shorten URL");
    } finally {
      setLoading(false);
    }
  };

  const handleCustomShorten = async () => {
    if (!url || !customSlug) {
      setError("Please enter both URL and custom slug");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await shortenURL(url, customSlug);
      setResult(data);
      onURLCreated?.(data);
      setUrl("");
      setCustomSlug("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create custom URL");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateAI = async () => {
    if (!url) {
      setError("Please enter a URL");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await generateAISlug(url);
      setResult(data);
      onURLCreated?.(data);
      setUrl("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to generate AI suggestions"
      );
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result?.shortUrl) {
      navigator.clipboard.writeText(result.shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-lg"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Shorten Your URL
      </h2>

      <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setError("");
                setResult(null);
                setAiSuggestions([]);
              }}
              className="relative px-4 py-2 text-sm font-medium transition-colors"
            >
              <div
                className={`flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </div>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600"
                />
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "normal" && (
          <motion.div
            key="normal"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4"
          >
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter your long URL here..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNormalShorten}
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Shortening...
                </>
              ) : (
                <>
                  <Link2 className="w-5 h-5" />
                  Shorten URL
                </>
              )}
            </motion.button>
          </motion.div>
        )}

        {activeTab === "custom" && (
          <motion.div
            key="custom"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4"
          >
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter your long URL here..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"></span>
              <input
                type="text"
                value={customSlug}
                onChange={(e) => setCustomSlug(e.target.value)}
                placeholder="your-custom-slug"
                className="w-full pl-32 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCustomShorten}
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Link2 className="w-5 h-5" />
                  Create Custom URL
                </>
              )}
            </motion.button>
          </motion.div>
        )}

        {activeTab === "ai" && (
          <motion.div
            key="ai"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4"
          >
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter your long URL here..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGenerateAI}
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate AI Slugs
                </>
              )}
            </motion.button>

            {/* {aiSuggestions && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
              >
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Select a suggestion:
                </p>
                {aiSuggestions.map((slug, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    onClick={() => handleSelectAI(slug)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 text-gray-900 dark:text-white font-medium transition-all text-left"
                  >
                    shortify.com/
                    <span className="text-purple-600 dark:text-purple-400">
                      {slug}
                    </span>
                  </motion.button>
                ))}
              </motion.div>
            )} */}
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm"
        >
          {error}
        </motion.div>
      )}

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800"
        >
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your shortened URL:
          </p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={result.shortUrl}
              readOnly
              className="flex-1 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-mono text-sm"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={copyToClipboard}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default URLForm;
