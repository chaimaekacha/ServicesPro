import React from "react";
import { Link } from "react-router-dom";
import "../style/Header.css";
import logo from "../Assets/logo/logo.jpg";

function Header() {
  return (
    <header className="header">
      <div className="header-container">

        {/* Logo image */}
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="ServicesPro Logo" />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="nav-links">
          <Link to="/">Accueil</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        {/* Auth */}
        <div className="auth-buttons">
          <Link to="/login-artisan" className="btn-outline">
            Connexion
          </Link>
          <Link to="/register-artisan" className="btn-solid">
            Inscription
          </Link>
        </div>

      </div>
    </header>
  );
}

export default Header;
