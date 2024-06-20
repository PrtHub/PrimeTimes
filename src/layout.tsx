import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <>
    <Toaster />
    <main className="w-full h-full flex flex-col justify-between items-center max-w-7xl mx-auto text-white font-poppins">
      <Navbar />
      <Outlet />
    </main>
    </>
  );
};

export default Layout;
