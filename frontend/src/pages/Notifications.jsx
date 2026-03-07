import { useEffect, useState } from "react";
import { getNotifications, markAllSeen, formatTime } from "../utils/notifications";
import { Bell } from "lucide-react";
import { motion } from "framer-motion";

function Notifications() {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {

    const data = getNotifications();
    setNotifications(data);

    // mark as seen when page open
    markAllSeen();

  }, []);

  return (

    <div className="p-6 bg-slate-100 min-h-screen">

      {/* HEADER */}

      <div className="flex items-center gap-3 mb-6">

        <div className="bg-blue-100 p-3 rounded-lg">
          <Bell className="text-blue-600"/>
        </div>

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Notifications
          </h1>

          <p className="text-sm text-slate-500">
            Your recent activity updates
          </p>

        </div>

      </div>


      {/* NOTIFICATION LIST */}

      {notifications.length === 0 ? (

        <div className="bg-white rounded-xl shadow-sm p-10 text-center text-gray-500">

          <p className="text-lg font-medium">
            No notifications yet
          </p>

          <p className="text-sm mt-2">
            Your activity notifications will appear here
          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {notifications.map((n) => (

            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white p-4 rounded-xl border shadow-sm flex justify-between items-center
              ${!n.seen ? "border-blue-300" : "border-slate-200"}`}
            >

              <div>

                <p className="text-sm text-slate-800">
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

    </div>

  );

}

export default Notifications;