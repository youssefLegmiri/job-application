import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Register from "./components/Register";
import ResetPassword from "./components/ResetPassword";
import SharedLayout from "./components/sharedLayout";
import { Routes, Route } from "react-router";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { createContext, useState } from "react";

export const userContext = createContext();
export const loginContext = createContext();

const App = () => {
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <loginContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
      <userContext.Provider value={[user, setUser]}>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
        </Routes>
      </userContext.Provider>
    </loginContext.Provider>
  );
};

export default App;
