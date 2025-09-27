import { Link, NavLink } from "react-router";

import Swal from "sweetalert2";
import useAuth from "../../../hook/useAuth";
import ZapshiftLogo from "../zapshift/ZapshiftLogo";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const navItems = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/send-parcel"}>Send Parcel</NavLink>
      </li>
      <li>
        <NavLink to={"/coverage"}>Coverage</NavLink>
      </li>
      <li>
        <NavLink to={"/about"}>About</NavLink>
      </li>
    </>
  );

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire({
              title: "Logged out!",
              text: "You have been successfully logged out.",
              icon: "success",
            }).then(() => {});
          })
          .catch((err) => {
            console.error("Logout error:", err);
            Swal.fire(
              "Error",
              "Something went wrong while logging out.",
              "error"
            );
          });
      }
    });
  };

  return (
    <div>
      <div className="navbar w-11/12 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navItems}
            </ul>
          </div>
          <div>
            <ZapshiftLogo></ZapshiftLogo>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end gap-4">
          {user?.email ? (
            <>
              <button
                onClick={handleLogout}
                className="btn btn-primary text-black"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {" "}
              <Link className="btn btn-primary text-black" to={"login"}>
                Login
              </Link>
              <Link className="btn btn-primary text-black" to={"register"}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
