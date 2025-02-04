import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Register from "./components/Register";
import ResetPassword from "./components/ResetPassword";
import Account from "./components/Account";
import SharedLayout from "./components/SharedLayout";
import { Routes, Route } from "react-router";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

import JobDetails from "./components/JobDetails";
import { AuthContext } from "./components/AuthProvider";
import { useContext } from "react";
const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route
          path={user?.role === "admin" ? "Dashboard" : "Jobs"}
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path={user?.role === "admin" ? "Dashboard/:id" : "Jobs/:id"}
          element={<JobDetails />}
        />
      </Route>
      <Route path="/account" element={<Account />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/ResetPassword" element={<ResetPassword />} />
    </Routes>
  );
};

export default App;
