import React, { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../util/auth-ctx";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const authCtx = useContext(AuthContext);
  return (
    <div className="navbar">
      <img
        className="logo-img"
        src={require("../user/components/PlaceHolder-Logo.png")}
      />

      <div className="links">
        {authCtx.loggedstate.isLogged ? (
          <React.Fragment>
            <NavLink
              className={
                `linksbutton ` + (location.pathname === "/" ? "activelink" : "")
              }
              to="/"
            >
              All Users
            </NavLink>
            <NavLink
              className={
                `linksbutton ` +
                (location.pathname ===
                `/${authCtx.loggedstate.user?._id}/places`
                  ? "activelink"
                  : "")
              }
              to={`/${authCtx.loggedstate.user?._id}/places`}
            >
              My Profile
            </NavLink>
            <NavLink
              className={
                `linksbutton ` +
                (location.pathname === "/add-place" ? "activelink" : "")
              }
              to="/add-place"
            >
              Add Place
            </NavLink>
          </React.Fragment>
        ) : null}
        {authCtx.loggedstate.isLogged ? (
          <div>
            {authCtx.loggedstate.user?.name}{" "}
            <button onClick={() => authCtx.logout("logout", {})}>
              Log Out
            </button>
          </div>
        ) : (
          <NavLink
            className={
              `linksbutton ` +
              (location.pathname === "/auth" ? "activelink" : "")
            }
            to="/auth"
          >
            Authenticate
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
