import API from "../services/api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Wallet, Landmark, CreditCard, Smartphone, Trash2 } from "lucide-react";

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

      refresh();

    } catch (error) {

      console.error("Delete wallet failed", error);

      toast.error("Failed to delete wallet ❌");

    }

  };

  // wallet icon based on type

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

    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition flex justify-between items-center">

      {/* Left Section */}

      <div className="flex items-center gap-3">

        <div className="bg-slate-100 p-3 rounded-lg">
          {getWalletIcon()}
        </div>

        <div>

          <h3 className="text-md font-semibold text-slate-800 capitalize">
            {wallet.name}
          </h3>

          <p className="text-sm text-slate-500">
            Balance: ₹ {Number(wallet.balance).toLocaleString()}
          </p>

        </div>

      </div>

      {/* Delete Button */}

      <button
        onClick={deleteWallet}
        className="text-red-500 hover:text-red-700 cursor-pointer transition"
      >
        <Trash2 size={18} />
      </button>

    </div>

  );

}

export default WalletCard;