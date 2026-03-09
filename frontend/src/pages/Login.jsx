import { useState, useContext } from "react";
import { motion } from "framer-motion";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { LogIn } from "lucide-react";

function Login() {

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    if (loading) return; // prevent multiple clicks

    setLoading(true); // loader immediately show

    try {

      const res = await API.post("/auth/login", {
        email,
        password
      });

      const userData = res.data.data;

      localStorage.setItem("token", userData.token);

      login(userData);

      toast.success("Login successful 🎉");

      navigate("/dashboard");

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Login failed ❌"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="bg-white border border-slate-200 shadow-xl rounded-2xl p-8 w-full max-w-md"
      >

        <div className="flex flex-col items-center mb-6">

          <motion.div
            className="bg-blue-100 p-3 rounded-full mb-3"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogIn className="text-blue-600"/>
          </motion.div>

          <h2 className="text-2xl font-bold text-slate-800">
            Login to FinTrack
          </h2>

          <p className="text-sm text-slate-500">
            Manage your finances easily
          </p>

        </div>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-slate-300 p-3 rounded-lg w-full mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-slate-300 p-3 rounded-lg w-full mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          className={`p-3 w-full rounded-lg font-medium transition cursor-pointer text-white
          ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {loading ? "Logging in..." : "Login"}
        </motion.button>

        <p className="text-center text-sm mt-4 text-slate-600">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Register
          </Link>

        </p>

      </motion.form>

    </div>

  );

}

export default Login;