import { motion } from "framer-motion";

function SummaryCard({ title, amount, icon: Icon, color }) {

  return (

    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}

      whileHover={{ y: -8, scale: 1.04 }}
      whileTap={{ scale: 0.94 }}

      transition={{
        type: "spring",
        stiffness: 300,
        damping: 18
      }}

      className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md flex items-center justify-between cursor-pointer"
    >

      <div>

        <h3 className="text-lg text-slate-500 font-semibold">
          {title}
        </h3>

        <p className="text-2xl font-bold text-slate-800 mt-1">
          ₹ {amount?.toLocaleString() || 0}
        </p>

      </div>

      {Icon && (

        <motion.div
          className={`p-3 rounded-lg ${color || "bg-blue-100"}`}

          whileHover={{ rotate: 10, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}

          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15
          }}
        >

          <Icon size={24} className="text-blue-600" />

        </motion.div>

      )}

    </motion.div>

  );

}

export default SummaryCard;