import React from "react";
import { Link } from "react-router-dom";
import "../style/Footer.css";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col">
          <h3 className="footer-logo">
            Services<span>P</span>ro
          </h3>
          <p className="footer-description">
            La plateforme numéro 1 au Maroc pour trouver des prestataires
            de confiance.
          </p>
          
          {/* Réseaux sociaux  */}
          <div className="social-links">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Facebook className="social-icon" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <Twitter className="social-icon" />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram className="social-icon" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="social-icon" />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Liens rapides</h4>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/catalogue">Services</Link></li>
            <li><Link to="/about">À propos</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <p><strong>Email :</strong> contact@servicespro.ma</p>
          <p><strong>Téléphone :</strong> +212 6 00 00 00 00</p>
        </div>

      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <div className="copyright">
            © {new Date().getFullYear()} ServicesPro — Tous droits réservés
          </div>
          <div className="legal-links">
            <Link to="/privacy">Confidentialité</Link>
            <Link to="/terms">Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;