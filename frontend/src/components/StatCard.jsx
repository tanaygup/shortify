import { motion } from "framer-motion";

const StatCard = ({ icon: Icon, label, value, change, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Icon className="w-6 h-6 text-white" />
          </div>
          {change && (
            <span
              className={`text-sm font-semibold ${
                change > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {change > 0 ? "+" : ""}
              {change}%
            </span>
          )}
        </div>

        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
          {value.toLocaleString()}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
      </div>
    </motion.div>
  );
};

export default StatCard;
