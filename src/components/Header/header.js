import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import SideNav from "./SideNav/sidenav.js";

const Header = props => {
  const NavBar = () => {
    return (
      <div onClick={props.onOpenNav} className="bars">
        <FontAwesomeIcon icon={faBars} className="bars-icon" />
      </div>
    );
  };

  return (
    <div className="header">
      <SideNav {...props} />
      <div className="main-header">
        {NavBar()}
        <div className="logo">
          <Link to="/home">
            <img alt="TU logo" src="http://localhost:3000/images/logo2.png" height="64" width="55" />
          </Link>
        </div>
        <div className="text-area">
          <div className="main-title">
 
              <Link to="/" style={{textDecoration:"none", color:"white"}}>Exam Package Management System</Link>
          </div>
        </div>
        <div className="user-logo">
          <FontAwesomeIcon icon={faUser} className="user-icon" />
        </div>
      </div>
    </div>
  );
};

export default Header;
