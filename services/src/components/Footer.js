import React from "react";
import { Link } from "react-router-dom";
import "../style/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-col">
          <h3 className="footer-logo">
            Services<span>P</span>ro
          </h3>
          <p>
            La plateforme numéro 1 au Maroc pour trouver des prestataires
            de confiance.
          </p>
        </div>

        <div className="footer-col">
          <h4>Liens rapides</h4>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/about">À propos</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <p>Email : contact@proservices.ma</p>
          <p>Téléphone : +212 6 00 00 00 00</p>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} ProServices — Tous droits réservés
      </div>
    </footer>
  );
}

export default Footer;
