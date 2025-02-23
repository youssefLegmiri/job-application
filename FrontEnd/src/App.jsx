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
import image from "./assets/images/image3.jpg";
import { useLocation } from "react-router";
import useBreakPoint from "./CustomHook/useBreakPoint";
const App = () => {
  const { pathname } = useLocation();
  const isMd = useBreakPoint("(min-width:768px)");
  return (
    <div
      className={`w-full h-full bg-cover bg-no-repeat ${!isMd && "bg-center"}`}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0  bg-opacity-20 bg-purple-50 backdrop-blur-[2px] "></div>
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
    </div>
  );
};

export default App;
