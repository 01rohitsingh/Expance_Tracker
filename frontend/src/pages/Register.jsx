import { useState, useContext } from "react";
import { motion } from "framer-motion";
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
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {

      setLoading(true);

      const res = await API.post("/auth/register", {
        name,
        email,
        password
      });

      const userData = res.data.data;

      localStorage.setItem("token", userData.token);

      login(userData);

      toast.success("Registration successful 🎉");

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

    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="bg-white border border-slate-200 shadow-xl rounded-2xl p-8 w-full max-w-md"
      >

        {/* HEADER */}

        <div className="flex flex-col items-center mb-6">

          <motion.div
            className="bg-green-100 p-3 rounded-full mb-3"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <UserPlus className="text-green-600"/>
          </motion.div>

          <h2 className="text-2xl font-bold text-slate-800">
            Create FinTrack Account
          </h2>

          <p className="text-sm text-slate-500">
            Start managing your finances
          </p>

        </div>


        {/* NAME */}

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-slate-300 p-3 rounded-lg w-full mb-4 focus:ring-2 focus:ring-green-500 outline-none"
        />


        {/* EMAIL */}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-slate-300 p-3 rounded-lg w-full mb-4 focus:ring-2 focus:ring-green-500 outline-none"
        />


        {/* PASSWORD */}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-slate-300 p-3 rounded-lg w-full mb-4 focus:ring-2 focus:ring-green-500 outline-none"
        />


        {/* BUTTON */}

        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          className="bg-green-600 hover:bg-green-700 text-white p-3 w-full rounded-lg font-medium transition"
        >
          {loading ? "Creating account..." : "Register"}
        </motion.button>


        {/* LOGIN LINK */}

        <p className="text-center text-sm mt-4 text-slate-600">

          Already have an account?{" "}

          <Link
            to="/"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </Link>

        </p>

      </motion.form>

    </div>

  );

}

export default Register;