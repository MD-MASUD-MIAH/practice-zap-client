import { Outlet } from "react-router";
import imageAuth from "../../assets/authImage.png";
import ZapshiftLogo from "../pages/shared/zapshift/ZapshiftLogo";
const AuthenticationLayout = () => {
  return (
    <div>
      <div className=" flex-col md:flex md:flex-row items-center justify-center h-screen">
        <div className=" relative w-full h-full">
          <div className="mt-12  ml-12 absolute">
            <ZapshiftLogo></ZapshiftLogo>
          </div>
          <div className="flex items-center justify-center w-full h-full">
            <Outlet></Outlet>
          </div>
        </div>

        <div className="flex items-center justify-center w-full h-full bg-[#FAFDF0]">
          <img src={imageAuth} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AuthenticationLayout;
