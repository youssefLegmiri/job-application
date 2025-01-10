import Header from "./Header";
import { Outlet } from "react-router";
import Footer from "./Footer";
import Loading from "./Loading";
import { AuthContext } from "./AuthProvider";
import { useContext } from "react";
const SharedLayout = () => {
  const { isLogout } = useContext(AuthContext);
  return (
    <main className="flex flex-col justify-between items-center h-screen ">
      <Header />
      <Outlet />
      <Footer />
      {isLogout && <Loading message={"Logout ..."} />}
    </main>
  );
};

export default SharedLayout;
