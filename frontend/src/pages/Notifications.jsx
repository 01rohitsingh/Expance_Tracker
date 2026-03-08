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
      className="p-4 md:p-6 bg-slate-100 min-h-screen"
    >

      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex items-center gap-3 mb-8"
      >

        <motion.div
          className="bg-blue-100 p-3 rounded-lg"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          <Bell className="text-blue-600"/>
        </motion.div>

        <div>

          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            Notifications
          </h1>

          <p className="text-sm text-slate-500">
            Your recent activity updates
          </p>

        </div>

      </motion.div>

      {notifications.length === 0 ? (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow-sm p-10 text-center text-gray-500"
        >

          <p className="text-lg font-medium">
            No notifications yet
          </p>

          <p className="text-sm mt-2">
            Your activity notifications will appear here
          </p>

        </motion.div>

      ) : (

        <div className="space-y-3">

          {notifications.map((n, index) => (

            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className={`flex justify-between items-center border rounded-lg p-4 shadow-sm cursor-pointer
              
              ${
                !n.seen
                  ? "bg-blue-50 border-blue-300"
                  : "bg-white border-slate-200"
              }
              
              hover:shadow-md`}
            >

              <div>

                <p className="text-sm font-medium text-slate-800">
                  {n.message}
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  {formatTime(n.timestamp)}
                </p>

              </div>

            </motion.div>

          ))}

        </div>

      )}

    </motion.div>

  );

}

export default Notifications;