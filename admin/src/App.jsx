import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "./components/AdminLayout";

import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import TransactionsPage from "./pages/TransactionsPage";
import UserDetails from "./pages/UserDetails";
import BlockedUsers from "./pages/BlockedUsers";
import AdminLogin from "./pages/AdminLogin";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* DEFAULT */}
        <Route path="/" element={<Navigate to="/admin/login" />} />

        {/* LOGIN */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ADMIN PANEL */}
        <Route path="/admin" element={<AdminLayout />}>

          <Route path="dashboard" element={<Dashboard />} />

          <Route path="users" element={<Users />} />

          <Route path="blocked-users" element={<BlockedUsers />} />

          <Route path="transactions" element={<TransactionsPage />} />

          <Route path="user/:id" element={<UserDetails />} />

        </Route>

      </Routes>

    </BrowserRouter>

  );

}

export default App;