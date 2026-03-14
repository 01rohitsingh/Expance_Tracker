import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/adminApi";

function AdminLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      alert("Admin Login Successful");

      // ✅ Correct redirect
      navigate("/admin/dashboard");

    } catch (error) {

      alert(error.response?.data?.message || "Login failed");

    }

  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow w-96"
      >

        <h2 className="text-2xl font-bold mb-6 text-center">
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 mb-4"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-4"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Login
        </button>

      </form>

    </div>
  );
}

export default AdminLogin;
