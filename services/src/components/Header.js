import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/Header.css";
import logo from "../Assets/logo/logo.jpg";
import { Home, Briefcase, Mail, User } from "lucide-react";

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const storedArtisan = JSON.parse(localStorage.getItem("artisan"));
    const storedClient = JSON.parse(localStorage.getItem("client"));
    
    if (storedArtisan) {
      setUser(storedArtisan);
      setUserType("artisan");
    } else if (storedClient) {
      setUser(storedClient);
      setUserType("client");
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("artisan");
    localStorage.removeItem("client");
    setUser(null);
    setUserType(null);
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="ServicesPro Logo" />
          </Link>
        </div>

        <nav className="nav-links">
          <Link to="/" className="nav-link">
            <Home className="nav-icon" size={20} />
            <span>Accueil</span>
          </Link>
          <Link to="/Catalogue" className="nav-link">
            <Briefcase className="nav-icon" size={20} />
            <span>Services</span>
          </Link>
          <Link to="/contact" className="nav-link">
            <Mail className="nav-icon" size={20} />
            <span>Contact</span>
          </Link>
        </nav>

        {/* AUTH / PROFILE */}
        {!user ? (
          <div className="auth-buttons">
            <Link to="/login" className="btn-outline">
              Connexion
            </Link>
            <Link to="/register" className="btn-solid">
              Inscription
            </Link>
          </div>
        ) : (
          <div className="profile-menu">
            <div
              className="profile-trigger"
              onClick={() => setOpen(!open)}
            >
              <div className="profile-avatar">
                {user.prenom?.charAt(0) || user.nom?.charAt(0) || <User size={20} />}
              </div>
              <span>{user.prenom || user.nom || "Profil"}</span>
            </div>

            {open && (
              <div className="profile-dropdown">
                {userType === "artisan" ? (
                  <>
                    <button onClick={() => navigate("/dashboard-artisan")}>
                      Tableau de bord
                    </button>
                    <button onClick={() => navigate("/mon-profil-artisan")}>
                      Mon profil
                    </button>
                    <button onClick={() => navigate("/mes-publications")}>
                      Mes publications
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => navigate("/mon-profil-client")}>
                      Mon profil
                    </button>
                    <button onClick={() => navigate("/mes-reservations")}>
                      Mes réservations
                    </button>
                  </>
                )}
                <button onClick={logout}>
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;