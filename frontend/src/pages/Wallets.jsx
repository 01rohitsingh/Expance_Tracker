import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import WalletCard from "../components/WalletCard";
import WalletForm from "../components/WalletForm";
import API from "../services/api";

function Wallets({ searchQuery = "" }) {

  const [wallets, setWallets] = useState([]);

  const isMobile = window.innerWidth < 768;

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
      whileTap={isMobile ? { scale: 0.99 } : {}}
      className="p-4 md:p-6 bg-gray-100 min-h-screen"
    >

      <motion.h1
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        whileTap={isMobile ? { scale: 0.97 } : {}}
        className="text-2xl md:text-3xl font-bold mb-6"
      >
        Wallets
      </motion.h1>

      <WalletForm refresh={fetchWallets} />

      {filteredWallets.length === 0 ? (

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-500 mt-4"
        >
          No wallets found
        </motion.p>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">

          {filteredWallets.map((wallet, index) => (

            <motion.div
              key={wallet._id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileTap={isMobile ? { scale: 0.97 } : {}}
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