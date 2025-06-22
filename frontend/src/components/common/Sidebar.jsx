import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import {
  FaHome,
  FaVideo,
  FaUpload,
  FaUser,
  FaSearch,
  FaSignOutAlt,
} from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="sidebar">
      <div>
        <div className="sidebar-logo">
          <NavLink to="/feed">STRMLY</NavLink>
        </div>
        <nav className="sidebar-nav">
          <NavLink
            to="/feed"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <FaHome />
            <span>Home</span>
          </NavLink>
          <NavLink
            to="/videos"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <FaVideo />
            <span>Long Videos</span>
          </NavLink>
          <NavLink
            to="/search"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <FaSearch />
            <span>Search</span>
          </NavLink>
          <NavLink
            to="/upload"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <FaUpload />
            <span>Upload</span>
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <FaUser />
            <span>Profile</span>
          </NavLink>
        </nav>
      </div>
      <div className="sidebar-logout">
        <button onClick={logout} className="nav-item">
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
