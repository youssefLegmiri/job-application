import Header from "./Header";
import { Outlet } from "react-router";
import Footer from "./Footer";
import Loading from "./Loading";
import { AuthContext } from "./AuthProvider";
import { useContext } from "react";
const SharedLayout = () => {
  const { isLogout } = useContext(AuthContext);
  return (
    <main className="h-screen relative flex flex-col justify-between items-center">
      <Header />
      <Outlet />
      <Footer />
      {isLogout && <Loading text={"Logout ..."} />}
    </main>
  );
};

export default SharedLayout;
