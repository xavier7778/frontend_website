import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { HamburgetMenuClose, HamburgetMenuOpen } from "./Icons";
// import botIcon from '../Icons/bot.jpg';

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <span>Reivax</span>
            {/* <i className="fas fa-code"></i> */}
            <span className="icon">
                {/* <img src={botIcon} alt="Example" /> */}
            </span>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/summarise"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Summarise
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/rag"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                RAG-chatbot
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/about"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/blog"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/contact"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>

            {click ? (
              <span className="icon">
                <HamburgetMenuOpen />{" "}
              </span>
            ) : (
              <span className="icon">
                <HamburgetMenuClose />
              </span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;