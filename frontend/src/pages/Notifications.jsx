import { useEffect, useState } from "react";
import { getNotifications, markAllSeen, formatTime } from "../utils/notifications";
import { Bell, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

function Notifications() {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {

    const data = getNotifications();
    setNotifications(data);
    markAllSeen();

  }, []);

  const deleteNotification = (id) => {

    const updated = notifications.filter((n) => n.id !== id);

    setNotifications(updated);

    localStorage.setItem("notifications", JSON.stringify(updated));

  };

  return (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-slate-100 px-4 sm:px-6 md:px-10 lg:px-14 py-6 sm:py-8"
    >

      {/* HEADER */}

      <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-10">

        <div className="bg-blue-100 p-2 sm:p-3 rounded-xl">
          <Bell className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6"/>
        </div>

        <div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800">
            Notifications
          </h1>

          <p className="text-xs sm:text-sm text-slate-500">
            Your recent activity updates
          </p>

        </div>

      </div>


      {/* GRID */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">

        {notifications.map((n) => (

          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
              y: -10,
              scale: 1.03,
              boxShadow: "0px 15px 25px rgba(0,0,0,0.1)"
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm cursor-pointer flex flex-col justify-between"
          >

            <div className="flex gap-3">

              <div className="bg-blue-50 p-2 rounded-lg h-fit">
                <Bell size={16} className="text-blue-600"/>
              </div>

              <div>

                <p className="text-sm sm:text-base font-semibold text-slate-800 leading-snug break-words">
                  {n.message}
                </p>

                <p className="text-[11px] sm:text-xs text-slate-400 mt-2">
                  {formatTime(n.timestamp)}
                </p>

              </div>

            </div>


            {/* DELETE BUTTON */}

            <div className="flex justify-end mt-4">

              <button
                onClick={() => deleteNotification(n.id)}
                className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
              >
                <Trash2 size={18}/>
              </button>

            </div>

          </motion.div>

        ))}

      </div>

    </motion.div>

  );

}

export default Notifications;