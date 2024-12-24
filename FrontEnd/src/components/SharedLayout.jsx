import Header from "./Header";
import { Outlet } from "react-router";
import Footer from "./Footer";
const SharedLayout = () => {
  return (
    <main className="flex flex-col justify-between h-screen ">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default SharedLayout;
