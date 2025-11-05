import { FormEvent, ReactNode } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function AuthForm({
  title,
  subtitle,
  children,
  onSubmit,
  buttonText,
  isLoading = false,
  successMessage,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 w-full max-w-md"
    >
      <div className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          {title}
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">{subtitle}</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {children}

        {successMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 border-2 border-green-200 rounded-xl p-4 text-green-700 text-sm font-medium text-center"
          >
            {successMessage}
          </motion.div>
        )}

        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2 mt-6"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <span>{buttonText}</span>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}
