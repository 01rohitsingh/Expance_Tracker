import API from "../services/api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { Wallet, Landmark, CreditCard, Smartphone, Trash2 } from "lucide-react";
import { addNotification } from "../utils/notifications";
import { cardAnimation, iconAnimation, buttonAnimation } from "../utils/animations";

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
        return <Wallet size={22} className="text-green-600" />;

      case "bank":
        return <Landmark size={22} className="text-blue-600" />;

      case "credit":
        return <CreditCard size={22} className="text-purple-600" />;

      case "upi":
        return <Smartphone size={22} className="text-orange-600" />;

      default:
        return <Wallet size={22} className="text-gray-600" />;

    }

  };

  return (

    <motion.div
      {...cardAnimation}
      className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-lg flex justify-between items-center cursor-pointer"
    >

      <div className="flex items-center gap-3">

        <motion.div
          {...iconAnimation}
          className="bg-slate-100 p-3 rounded-lg"
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
        {...buttonAnimation}
        onClick={deleteWallet}
        className="text-red-500 hover:text-red-700 cursor-pointer"
      >
        <Trash2 size={20} />
      </motion.button>

    </motion.div>

  );

}

export default WalletCard;