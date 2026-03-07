import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { User, Lock, Trash2, Eye, EyeOff, Image } from "lucide-react";

function Settings() {

const BASE_URL = import.meta.env.VITE_API_URL;

const [name, setName] = useState(localStorage.getItem("name") || "");
const [email, setEmail] = useState(localStorage.getItem("email") || "");
const [photo, setPhoto] = useState(null);

const [currentPassword, setCurrentPassword] = useState("");
const [newPassword, setNewPassword] = useState("");

const [showCurrentPassword, setShowCurrentPassword] = useState(false);
const [showNewPassword, setShowNewPassword] = useState(false);

/* UPDATE PHOTO */

const updatePhoto = async () => {


if (!photo) {
  toast.error("Please select image");
  return;
}

try {

  const formData = new FormData();
  formData.append("photo", photo);

  const res = await API.put("/auth/upload-photo", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });

  localStorage.setItem("photo", res.data.photo);

  toast.success("Profile photo updated");

  window.location.reload();

} catch (error) {

  console.error(error);
  toast.error("Photo upload failed");

}


};

/* UPDATE PROFILE */

const updateProfile = async () => {


try {

  const res = await API.put("/auth/profile", {
    name,
    email
  });

  localStorage.setItem("name", res.data.data.name);
  localStorage.setItem("email", res.data.data.email);

  toast.success("Profile updated");

} catch (error) {

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

  toast.success("Password changed");

  setCurrentPassword("");
  setNewPassword("");

} catch (error) {

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

  toast.error("Account deletion failed");

}


};

return (


<div className="p-6">

  <h1 className="text-2xl font-bold mb-6">
    Settings
  </h1>

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


    {/* PROFILE PHOTO */}

    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white p-5 rounded-xl shadow-sm border border-purple-200 hover:border-purple-500"
    >

      <div className="flex items-center gap-2 mb-4">
        <Image size={18}/>
        <h2 className="text-base font-semibold">
          Profile Photo
        </h2>
      </div>

      <div className="flex flex-col items-center gap-3">

        <img
          src={
            localStorage.getItem("photo")
              ? `${BASE_URL}${localStorage.getItem("photo")}`
              : `${BASE_URL}/photo/download.png`
          }
          alt="profile"
          className="w-20 h-20 rounded-full object-cover border"
          onError={(e)=>{
            e.target.src = `${BASE_URL}/photo/download.png`
          }}
        />

        <input
          type="file"
          onChange={(e)=>setPhoto(e.target.files[0])}
          className="border p-2 rounded-lg w-full"
        />

        <button
          onClick={updatePhoto}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-lg"
        >
          Update Photo
        </button>

      </div>

    </motion.div>


    {/* PROFILE INFO */}

    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white p-5 rounded-xl shadow-sm border border-blue-200 hover:border-blue-500"
    >

      <div className="flex items-center gap-2 mb-4">
        <User size={18}/>
        <h2 className="text-base font-semibold">
          Profile Information
        </h2>
      </div>

      <div className="space-y-3">

        <input
          type="text"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="w-full border rounded-lg p-2.5"
          placeholder="Full Name"
        />

        <input
          type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full border rounded-lg p-2.5"
          placeholder="Email"
        />

        <button
          onClick={updateProfile}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg"
        >
          Update Profile
        </button>

      </div>

    </motion.div>


    {/* PASSWORD */}

    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white p-5 rounded-xl shadow-sm border border-green-200 hover:border-green-500"
    >

      <div className="flex items-center gap-2 mb-4">
        <Lock size={18}/>
        <h2 className="text-base font-semibold">
          Change Password
        </h2>
      </div>

      <div className="space-y-3">

        <div className="relative">

          <input
            type={showCurrentPassword ? "text" : "password"}
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e)=>setCurrentPassword(e.target.value)}
            className="w-full border rounded-lg p-2.5"
          />

          <span
            onClick={()=>setShowCurrentPassword(!showCurrentPassword)}
            className="absolute right-3 top-3 cursor-pointer text-gray-500"
          >
            {showCurrentPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
          </span>

        </div>

        <div className="relative">

          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="New Password"
            value={newPassword}
            onChange={(e)=>setNewPassword(e.target.value)}
            className="w-full border rounded-lg p-2.5"
          />

          <span
            onClick={()=>setShowNewPassword(!showNewPassword)}
            className="absolute right-3 top-3 cursor-pointer text-gray-500"
          >
            {showNewPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
          </span>

        </div>

        <button
          onClick={changePassword}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg"
        >
          Change Password
        </button>

      </div>

    </motion.div>


    {/* DELETE ACCOUNT */}

    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white p-5 rounded-xl shadow-sm border border-red-200 hover:border-red-500"
    >

      <div className="flex items-center gap-2 mb-3 text-red-500">
        <Trash2 size={18}/>
        <h2 className="text-base font-semibold">
          Danger Zone
        </h2>
      </div>

      <p className="text-gray-500 mb-3 text-sm">
        Deleting your account will permanently remove your data.
      </p>

      <button
        onClick={deleteAccount}
        className="w-full bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-lg"
      >
        Delete Account
      </button>

    </motion.div>

  </div>

</div>


);

}

export default Settings;
