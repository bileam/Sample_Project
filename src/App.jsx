import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import AdminLayout from "./Components/Layout/AdminLayout";
import ProtectedRoute from "./Routes/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import MasterUser from "./pages/MasterUser";
import MasterItem from "./pages/MasterItem";
import Transaction from "./pages/Transaction";
import Report from "./pages/Report";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/master-user" element={<MasterUser />} />
          <Route path="/master-item" element={<MasterItem />} />
          <Route path="/transaksi" element={<Transaction />} />
          <Route path="/report" element={<Report />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
