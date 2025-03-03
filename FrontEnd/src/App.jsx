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
import Applications from "./components/Applications";
import MyApplication from "./components/MyApplication";
import JobDetails from "./components/JobDetails";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route
          path="jobs"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="jobs/applications" element={<Applications />} />
        <Route path="jobs/myApplication" element={<MyApplication />} />
        <Route path="jobs/:id" element={<JobDetails />} />
      </Route>
      <Route path="/account" element={<Account />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/ResetPassword" element={<ResetPassword />} />
    </Routes>
  );
};

export default App;
