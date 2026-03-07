import { useState, useEffect } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { User, Lock, Trash2, Moon } from "lucide-react";

function Settings() {

  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  /* DARK MODE */

  useEffect(() => {

    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

  }, [darkMode]);

  /* UPDATE PROFILE */

  const updateProfile = async () => {

    try {

      const res = await API.put("/auth/profile", {
        name,
        email
      });

      localStorage.setItem("name", res.data.data.name);
      localStorage.setItem("email", res.data.data.email);

      toast.success("Profile updated successfully");

    } catch (error) {

      console.error(error);
      toast.error("Profile update failed");

    }

  };

  /* CHANGE PASSWORD */

  const changePassword = async () => {

    if (!currentPassword || !newPassword) {
      toast.error("Please fill all fields");
      return;
    }

    try {

      await API.put("/auth/change-password", {
        currentPassword,
        newPassword
      });

      toast.success("Password changed successfully");

      setCurrentPassword("");
      setNewPassword("");

    } catch (error) {

      console.error(error);
      toast.error("Password change failed");

    }

  };

  /* DELETE ACCOUNT */

  const deleteAccount = async () => {

    const result = await Swal.fire({
      title: "Delete Account?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete"
    });

    if (!result.isConfirmed) return;

    try {

      await API.delete("/auth/delete-account");

      localStorage.clear();

      toast.success("Account deleted");

      window.location.href = "/";

    } catch (error) {

      console.error(error);
      toast.error("Account deletion failed");

    }

  };

  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-8">
        Settings
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* PROFILE */}

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border">

          <div className="flex items-center gap-2 mb-5">

            <User size={20} />

            <h2 className="text-lg font-semibold">
              Profile Information
            </h2>

          </div>

          <div className="space-y-4">

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg p-3 dark:bg-gray-700"
              placeholder="Full Name"
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg p-3 dark:bg-gray-700"
              placeholder="Email"
            />

            <button
              onClick={updateProfile}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg cursor-pointer"
            >
              Update Profile
            </button>

          </div>

        </div>


        {/* PASSWORD */}

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border">

          <div className="flex items-center gap-2 mb-5">

            <Lock size={20} />

            <h2 className="text-lg font-semibold">
              Change Password
            </h2>

          </div>

          <div className="space-y-4">

            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full border rounded-lg p-3 dark:bg-gray-700"
            />

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border rounded-lg p-3 dark:bg-gray-700"
            />

            <button
              onClick={changePassword}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg cursor-pointer"
            >
              Change Password
            </button>

          </div>

        </div>


        {/* DARK MODE */}

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">

              <Moon size={20} />

              <h2 className="text-lg font-semibold">
                Dark Mode
              </h2>

            </div>

            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="cursor-pointer"
            />

          </div>

        </div>


        {/* DELETE ACCOUNT */}

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-red-200">

          <div className="flex items-center gap-2 mb-3 text-red-500">

            <Trash2 size={20} />

            <h2 className="text-lg font-semibold">
              Danger Zone
            </h2>

          </div>

          <p className="text-gray-500 mb-4">
            Deleting your account will permanently remove your data.
          </p>

          <button
            onClick={deleteAccount}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg cursor-pointer"
          >
            Delete Account
          </button>

        </div>

      </div>

    </div>

  );

}

export default Settings;