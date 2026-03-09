import { useState, useContext } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { User, Lock, Trash2, Eye, EyeOff, Image } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

function Settings() {

const { user, updateUser } = useContext(AuthContext);

const [name, setName] = useState(user?.name || "");
const [email, setEmail] = useState(user?.email || "");
const [photo, setPhoto] = useState(null);
const [preview, setPreview] = useState(null);

const [currentPassword, setCurrentPassword] = useState("");
const [newPassword, setNewPassword] = useState("");

const [showCurrentPassword, setShowCurrentPassword] = useState(false);
const [showNewPassword, setShowNewPassword] = useState(false);


/* ================= PHOTO PREVIEW ================= */

const handlePhoto = (e) => {

  const file = e.target.files[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    toast.error("Please select a valid image");
    return;
  }

  setPhoto(file);
  setPreview(URL.createObjectURL(file));

};


/* ================= UPDATE PHOTO ================= */

const updatePhoto = async () => {

  if (!photo) {
    toast.error("Please select an image");
    return;
  }

  try {

    const formData = new FormData();
    formData.append("photo", photo);

    const res = await API.put("/auth/upload-photo", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    updateUser({
      ...user,
      photo: res.data.photo
    });

    setPreview(null);
    setPhoto(null);

    toast.success("Profile photo updated");

  } catch (error) {

    console.error(error);
    toast.error(error?.response?.data?.message || "Photo upload failed");

  }

};


/* ================= UPDATE PROFILE ================= */

const updateProfile = async () => {

  try {

    const res = await API.put("/auth/profile", {
      name,
      email
    });

    updateUser({
      ...user,
      name: res.data.data.name,
      email: res.data.data.email
    });

    toast.success("Profile updated");

  } catch (error) {

    toast.error(error?.response?.data?.message || "Profile update failed");

  }

};


/* ================= CHANGE PASSWORD ================= */

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

    toast.error(error?.response?.data?.message || "Password change failed");

  }

};


/* ================= DELETE ACCOUNT ================= */

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

    toast.error(error?.response?.data?.message || "Account deletion failed");

  }

};


return (

<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
className="p-4 md:p-6"
>

<motion.h1
initial={{y:-20,opacity:0}}
animate={{y:0,opacity:1}}
transition={{duration:0.3}}
className="text-2xl font-bold mb-6"
>
Settings
</motion.h1>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


{/* ================= PROFILE PHOTO ================= */}

<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
whileHover={{y:-4}}
className="bg-purple-50 p-5 rounded-xl shadow-sm border border-purple-300 hover:border-purple-500 transition"
>

<div className="flex items-center gap-2 mb-4">
<Image size={18}/>
<h2 className="text-base font-semibold">Profile Photo</h2>
</div>

<div className="flex flex-col items-center gap-3">

<img
src={
preview ||
user?.photo ||
"https://cdn-icons-png.flaticon.com/512/149/149071.png"
}
alt="profile"
onError={(e)=>{
e.target.src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
}}
className="w-20 h-20 rounded-full object-cover border"
/>

<input
type="file"
accept="image/*"
onChange={handlePhoto}
className="w-full border border-gray-300 rounded-lg p-2.5 cursor-pointer"
/>

<motion.button
whileHover={{scale:1.04}}
whileTap={{scale:0.96}}
onClick={updatePhoto}
className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white py-2.5 rounded-lg cursor-pointer"
>
Update Photo
</motion.button>

</div>

</motion.div>


{/* ================= PROFILE INFO ================= */}

<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
whileHover={{y:-4}}
className="bg-blue-50 p-5 rounded-xl shadow-sm border border-blue-300 hover:border-blue-500 transition"
>

<div className="flex items-center gap-2 mb-4">
<User size={18}/>
<h2 className="text-base font-semibold">Profile Information</h2>
</div>

<div className="space-y-3">

<input
type="text"
value={name}
onChange={(e)=>setName(e.target.value)}
className="w-full border border-gray-300 rounded-lg p-2.5"
placeholder="Full Name"
/>

<input
type="email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="w-full border border-gray-300 rounded-lg p-2.5"
placeholder="Email"
/>

<motion.button
whileHover={{scale:1.04}}
whileTap={{scale:0.96}}
onClick={updateProfile}
className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg cursor-pointer"
>
Update Profile
</motion.button>

</div>

</motion.div>


{/* ================= CHANGE PASSWORD ================= */}

<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
whileHover={{y:-4}}
className="bg-green-50 p-5 rounded-xl shadow-sm border border-green-300 hover:border-green-500 transition"
>

<div className="flex items-center gap-2 mb-4">
<Lock size={18}/>
<h2 className="text-base font-semibold">Change Password</h2>
</div>

<div className="space-y-3">

<div className="relative">

<input
type={showCurrentPassword ? "text" : "password"}
placeholder="Current Password"
value={currentPassword}
onChange={(e)=>setCurrentPassword(e.target.value)}
className="w-full border border-gray-300 rounded-lg p-2.5"
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
className="w-full border border-gray-300 rounded-lg p-2.5"
/>

<span
onClick={()=>setShowNewPassword(!showNewPassword)}
className="absolute right-3 top-3 cursor-pointer text-gray-500"
>
{showNewPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
</span>

</div>

<motion.button
whileHover={{scale:1.04}}
whileTap={{scale:0.96}}
onClick={changePassword}
className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg cursor-pointer"
>
Change Password
</motion.button>

</div>

</motion.div>


{/* ================= DELETE ACCOUNT ================= */}

<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
whileHover={{y:-4}}
className="bg-red-50 p-5 rounded-xl shadow-sm border border-red-300 hover:border-red-500 transition"
>

<div className="flex items-center gap-2 mb-3 text-red-500">
<Trash2 size={18}/>
<h2 className="text-base font-semibold">Danger Zone</h2>
</div>

<p className="text-gray-500 mb-3 text-sm">
Deleting your account will permanently remove your data.
</p>

<motion.button
whileHover={{scale:1.04}}
whileTap={{scale:0.96}}
onClick={deleteAccount}
className="w-full bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-lg cursor-pointer"
>
Delete Account
</motion.button>

</motion.div>

</div>

</motion.div>

);

}

export default Settings;