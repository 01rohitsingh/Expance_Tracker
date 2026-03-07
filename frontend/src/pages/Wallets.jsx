import { useEffect, useState } from "react";
import WalletCard from "../components/WalletCard";
import WalletForm from "../components/WalletForm";
import API from "../services/api";

function Wallets() {

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

  return (

    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">
        Wallets
      </h1>

      <WalletForm refresh={fetchWallets} />

      {wallets.length === 0 ? (

        <p className="text-gray-500 mt-4">
          No wallets created yet
        </p>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">

          {wallets.map((wallet) => (

            <WalletCard
              key={wallet._id}
              wallet={wallet}
              refresh={fetchWallets}
            />

          ))}

        </div>

      )}

    </div>

  );

}

export default Wallets;