import { useState, useContext } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { UserPlus } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

function Register() {

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);

      if (photo) {
        formData.append("photo", photo);
      }

      const res = await API.post("/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      // ⭐ TOKEN SAVE
      localStorage.setItem("token", res.data.data.token);

      // ⭐ AUTO LOGIN (IMPORTANT)
      login(res.data.data);

      toast.success("Registration successful 🎉");

      // ⭐ DIRECT DASHBOARD
      navigate("/dashboard");

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Registration failed ❌"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200 shadow-xl rounded-2xl p-8 w-full max-w-md"
      >

        <div className="flex flex-col items-center mb-6">

          <div className="bg-green-100 p-3 rounded-full mb-3">
            <UserPlus className="text-green-600"/>
          </div>

          <h2 className="text-2xl font-bold text-slate-800">
            Create FinTrack Account
          </h2>

          <p className="text-sm text-slate-500">
            Start managing your finances
          </p>

        </div>

        {/* Name */}

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-slate-300 p-3 rounded-lg w-full mb-4 focus:ring-2 focus:ring-green-500 outline-none"
        />

        {/* Email */}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-slate-300 p-3 rounded-lg w-full mb-4 focus:ring-2 focus:ring-green-500 outline-none"
        />

        {/* Password */}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-slate-300 p-3 rounded-lg w-full mb-4 focus:ring-2 focus:ring-green-500 outline-none"
        />

        {/* Photo Upload */}

        <input
          type="file"
          onChange={(e) => setPhoto(e.target.files[0])}
          className="border border-slate-300 p-2 rounded-lg w-full mb-4"
        />

        {/* Button */}

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white p-3 w-full rounded-lg font-medium transition cursor-pointer"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="text-center text-sm mt-4 text-slate-600">

          Already have an account?{" "}

          <Link
            to="/"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </Link>

        </p>

      </form>

    </div>

  );

}

export default Register;