import { motion } from "framer-motion";

function SummaryCard({ title, amount, icon: Icon, color }) {

  return (

    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.35 }}
      className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md flex items-center justify-between"
    >

      <div>

        <h3 className="text-sm text-slate-500 font-medium">
          {title}
        </h3>

        <p className="text-2xl font-bold text-slate-800 mt-1">
          ₹ {amount?.toLocaleString() || 0}
        </p>

      </div>

      {Icon && (

        <motion.div
          className={`p-3 rounded-lg ${color || "bg-blue-100"}`}
          whileHover={{ rotate: 8, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.25 }}
        >

          <Icon size={22} className="text-blue-600" />

        </motion.div>

      )}

    </motion.div>

  );

}

export default SummaryCard;