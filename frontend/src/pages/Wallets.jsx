import { useEffect, useState } from "react";
import WalletCard from "../components/WalletCard";
import WalletForm from "../components/WalletForm";
import API from "../services/api";
import { motion } from "framer-motion";
import { cardAnimation } from "../utils/animations";

function Wallets({ searchQuery = "" }) {

  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    fetchWallets();
  }, []);

  const fetchWallets = async () => {

    try {

      const res = await API.get("/wallets");
      setWallets(res.data);

    } catch (error) {

      console.error("Error fetching wallets", error);

    }

  };

  const filteredWallets = wallets.filter((wallet) => {

    if (!searchQuery) return true;

    const search = searchQuery.toLowerCase();

    const name = wallet.name?.toLowerCase() || "";
    const balance = String(wallet.balance || "");

    return (
      name.includes(search) ||
      balance.includes(search)
    );

  });

  return (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-6 bg-gray-100 min-h-screen"
    >

      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Wallets
      </h1>

      <motion.div {...cardAnimation}>
        <WalletForm refresh={fetchWallets} />
      </motion.div>

      {filteredWallets.length === 0 ? (

        <p className="text-gray-500 mt-4">
          No wallets found
        </p>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">

          {filteredWallets.map((wallet, index) => (

            <motion.div
              key={wallet._id}
              {...cardAnimation}
              transition={{
                ...cardAnimation.transition,
                delay: index * 0.05
              }}
              className="cursor-pointer"
            >

              <WalletCard
                wallet={wallet}
                refresh={fetchWallets}
              />

            </motion.div>

          ))}

        </div>

      )}

    </motion.div>

  );

}

export default Wallets;