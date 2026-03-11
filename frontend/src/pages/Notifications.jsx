import { useEffect, useState } from "react";
import API from "../services/api";
import { Bell, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { cardAnimation, buttonAnimation, iconAnimation } from "../utils/animations";

function Notifications() {

  const [notifications, setNotifications] = useState([]);

  const formatTime = (time) => {
    return new Date(time).toLocaleString();
  };

  const fetchNotifications = async () => {
    try {

      const res = await API.get("/notifications");

      setNotifications(res.data);

      // mark notifications seen
      await API.put("/notifications/mark-seen");

      // tell navbar to refresh count
      window.dispatchEvent(new Event("notificationsUpdated"));

    } catch (error) {

      console.error("Failed to load notifications", error);

    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const deleteNotification = async (id) => {
    try {

      await API.delete(`/notifications/${id}`);

      setNotifications((prev) =>
        prev.filter((n) => n._id !== id)
      );

      window.dispatchEvent(new Event("notificationsUpdated"));

    } catch (error) {

      console.error("Delete failed", error);

    }
  };

  return (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-slate-100 px-6 py-8"
    >

      <div className="flex items-center gap-3 mb-8">

        <div className="bg-blue-100 p-3 rounded-xl">
          <Bell className="text-blue-600"/>
        </div>

        <div>

          <h1 className="text-2xl font-bold text-slate-800">
            Notifications
          </h1>

          <p className="text-sm text-slate-500">
            Your recent activity updates
          </p>

        </div>

      </div>

      {notifications.length === 0 ? (

        <div className="flex flex-col items-center mt-20 text-slate-500">

          <Bell size={50} className="opacity-40 mb-4"/>

          <p className="text-lg font-semibold">
            No Notifications Yet
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {notifications.map((n, index) => (

            <motion.div
              key={n._id}
              {...cardAnimation}
              transition={{
                ...cardAnimation.transition,
                delay: index * 0.05
              }}
              className="bg-white border rounded-xl p-5 shadow-sm flex justify-between items-start"
            >

              <div className="flex gap-3">

                <div className="bg-blue-50 p-2 rounded-lg">
                  <Bell size={16} className="text-blue-600"/>
                </div>

                <div>

                  <p className="font-semibold text-slate-800">
                    {n.message}
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    {formatTime(n.createdAt)}
                  </p>

                </div>

              </div>

              <button
                onClick={() => deleteNotification(n._id)}
                className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
              >
                <Trash2 size={18}/>
              </button>

            </motion.div>

          ))}

        </div>

      )}

    </motion.div>

  );

}

export default Notifications;