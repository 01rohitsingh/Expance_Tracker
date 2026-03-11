import { motion } from "framer-motion";
import { cardAnimation, iconAnimation } from "../utils/animations";

function SummaryCard({ title, amount = 0, icon: Icon, color = "bg-blue-100", iconColor = "text-blue-600" }) {

  return (

    <motion.div
      {...cardAnimation}
      className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-lg flex items-center justify-between cursor-pointer"
    >

      <div>

        <h3 className="text-sm text-slate-500 font-semibold">
          {title}
        </h3>

        <p className="text-2xl font-bold text-slate-800 mt-1">
          ₹ {Number(amount).toLocaleString()}
        </p>

      </div>

      {Icon && (

        <motion.div
          {...iconAnimation}
          className={`p-3 rounded-lg ${color}`}
        >

          <Icon size={24} className={iconColor} />

        </motion.div>

      )}

    </motion.div>

  );

}

export default SummaryCard;