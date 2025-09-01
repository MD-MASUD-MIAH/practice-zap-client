import { Outlet } from "react-router";
import Footer from "../pages/shared/Footer/Footer";
import Navbar from "../pages/shared/Navbar/Navbar";

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar></Navbar>
      <div className="flex-grow">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
