import Header from "./Header";
import { Outlet } from "react-router";
import Footer from "./Footer";

const SharedLayout = () => {
  return (
    <main className="min-h-screen relative flex flex-col justify-between items-center mb-10 ">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default SharedLayout;
