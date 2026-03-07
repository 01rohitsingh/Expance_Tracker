import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./components/Layout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Wallets from "./pages/Wallets";
import Budgets from "./pages/Budgets";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";   // ⭐ NEW

function App() {

  return (

    <BrowserRouter>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="colored"
        newestOnTop
        closeOnClick
        pauseOnHover
        style={{ zIndex: 9999 }}
      />

      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/wallets" element={<Layout><Wallets /></Layout>} />
        <Route path="/budgets" element={<Layout><Budgets /></Layout>} />
        <Route path="/analytics" element={<Layout><Analytics /></Layout>} />
        <Route path="/settings" element={<Layout><Settings /></Layout>} />

        {/* ⭐ Notification Page */}
        <Route path="/notifications" element={<Layout><Notifications /></Layout>} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;