import React, { forwardRef } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { motion } from "framer-motion";

const InputField = forwardRef(({ label, icon: Icon, error, ...props }, ref) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-4"
    >
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Icon className="w-5 h-5" />
        </div>
        <input
          ref={ref}
          {...props}
          className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all focus:outline-none text-gray-900 placeholder-gray-400 ${
            error
              ? "border-red-500 focus:border-red-600 bg-red-50"
              : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
          }`}
        />
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm mt-2"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
});

InputField.displayName = "InputField";

// Add propTypes for validation in JavaScript
InputField.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired, // Validates that 'icon' is a React component
  error: PropTypes.string,
};

export default InputField;
