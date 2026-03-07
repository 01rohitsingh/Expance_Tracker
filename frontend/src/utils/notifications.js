export const getNotifications = () => {

  const data = JSON.parse(localStorage.getItem("notifications")) || [];

  const now = Date.now();
  const threeMonths = 90 * 24 * 60 * 60 * 1000;

  // remove old notifications
  const filtered = data.filter(n => now - n.timestamp < threeMonths);

  // latest first
  filtered.sort((a, b) => b.timestamp - a.timestamp);

  localStorage.setItem("notifications", JSON.stringify(filtered));

  return filtered;

};


export const addNotification = (message) => {

  const notifications = getNotifications();

  const newNotification = {
    id: Date.now(),
    message,
    timestamp: Date.now(),
    seen: false
  };

  notifications.unshift(newNotification);

  localStorage.setItem("notifications", JSON.stringify(notifications));

};


export const markAllSeen = () => {

  const notifications = getNotifications().map(n => ({
    ...n,
    seen: true
  }));

  localStorage.setItem("notifications", JSON.stringify(notifications));

};


/* FORMAT TIME FOR UI */

export const formatTime = (timestamp) => {

  const date = new Date(timestamp);

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

};