import API from "../services/api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { Wallet, Landmark, CreditCard, Smartphone, Trash2 } from "lucide-react";
import { addNotification } from "../utils/notifications";

function WalletCard({ wallet, refresh }) {

  const deleteWallet = async () => {

    try {

      const result = await Swal.fire({
        title: "Delete wallet?",
        text: "This action cannot be undone",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        backdrop: true,
        allowOutsideClick: false
      });

      if (!result.isConfirmed) return;

      await API.delete(`/wallets/${wallet._id}`);

      toast.success("Wallet deleted successfully 🗑");

      addNotification(`Wallet "${wallet.name}" deleted`);

      refresh();

    } catch (error) {

      console.error("Delete wallet failed", error);

      toast.error("Failed to delete wallet ❌");

    }

  };

  const getWalletIcon = () => {

    switch (wallet.type) {

      case "cash":
        return <Wallet size={20} className="text-green-600" />;

      case "bank":
        return <Landmark size={20} className="text-blue-600" />;

      case "credit":
        return <CreditCard size={20} className="text-purple-600" />;

      case "upi":
        return <Smartphone size={20} className="text-orange-600" />;

      default:
        return <Wallet size={20} className="text-gray-600" />;

    }

  };

  return (

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md flex justify-between items-center"
    >

      <div className="flex items-center gap-3">

        <motion.div
          className="bg-slate-100 p-3 rounded-lg"
          whileHover={{ rotate: 8, scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          {getWalletIcon()}
        </motion.div>

        <div>

          <h3 className="text-md font-semibold text-slate-800 capitalize">
            {wallet.name}
          </h3>

          <p className="text-sm text-slate-500">
            Balance: ₹ {Number(wallet.balance).toLocaleString()}
          </p>

        </div>

      </div>

      <motion.button
        onClick={deleteWallet}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        className="text-red-500 hover:text-red-700 cursor-pointer transition"
      >
        <Trash2 size={18} />
      </motion.button>

    </motion.div>

  );

}

export default WalletCard;