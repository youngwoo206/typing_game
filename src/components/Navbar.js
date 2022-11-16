import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import { Context } from "../utils/UserContext";
import "./Navbar.css";

function Navbar(props) {
  const { user } = useContext(Context);

  const [sidebar, setSidebar] = useState(false);

  const toggleSidebar = () => setSidebar(!sidebar);

  const LinkItems = SidebarData.map((item, index) => (
    <li key={index} className={item.className} onClick={toggleSidebar}>
      <Link to={item.path}>
        {item.icon}
        <span>{item.title}</span>
      </Link>
    </li>
  ));

  return (
    <>
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <FaIcons.FaBars onClick={toggleSidebar} />
        </Link>
        <h1 className="nav-header">TypeTrainer: Online Typing Game</h1>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items">
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <AiIcons.AiOutlineClose onClick={toggleSidebar} />
            </Link>
          </li>
          {LinkItems}
          <li className="navbar-toggle">
            <div className="nav-text">Toggle Mode:</div>
            <label className="darkmode-toggle">
              <input
                className="darkmode-input"
                type="checkbox"
                onClick={props.toggleTheme}
              />
              <span className="darkmode-toggle-span" />
            </label>
          </li>
          <li className="navbar-toggle">
            <div className="user-section">
              <p>{user.username}</p>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
