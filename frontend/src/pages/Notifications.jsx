import { useEffect, useState } from "react";
import { getNotifications, markAllSeen, formatTime } from "../utils/notifications";
import { Bell } from "lucide-react";
import { motion } from "framer-motion";

function Notifications() {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {

    const data = getNotifications();
    setNotifications(data);
    markAllSeen();

  }, []);

  return (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-slate-100 px-3 sm:px-5 md:px-8 py-5 flex justify-center"
    >

      {/* MAIN CONTAINER */}

      <div className="w-full max-w-2xl">

        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8"
        >

          <motion.div
            className="bg-blue-100 p-2 sm:p-3 rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6"/>
          </motion.div>

          <div>

            <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-slate-800">
              Notifications
            </h1>

            <p className="text-xs sm:text-sm text-slate-500">
              Your recent activity updates
            </p>

          </div>

        </motion.div>


        {/* NO NOTIFICATION */}

        {notifications.length === 0 ? (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-sm p-6 sm:p-8 text-center text-gray-500"
          >

            <p className="text-base sm:text-lg font-medium">
              No notifications yet
            </p>

            <p className="text-sm mt-2">
              Your activity notifications will appear here
            </p>

          </motion.div>

        ) : (

          <div className="space-y-3 sm:space-y-4">

            {notifications.map((n, index) => (

              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className={`border rounded-xl p-3 sm:p-4 shadow-sm transition cursor-pointer
                ${
                  !n.seen
                    ? "bg-blue-50 border-blue-300"
                    : "bg-white border-slate-200"
                }
                hover:shadow-md`}
              >

                <p className="text-sm sm:text-base font-medium text-slate-800 leading-relaxed">
                  {n.message}
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  {formatTime(n.timestamp)}
                </p>

              </motion.div>

            ))}

          </div>

        )}

      </div>

    </motion.div>

  );

}

export default Notifications;