import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../style/RegisterArtisan.css";
function RegisterArtisan() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("artisan", JSON.stringify(form));

    navigate("/create-profile");
  };

  return (
    <div className="auth-page">
      <h2>Inscription Prestataire</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          name="nom"
          placeholder="Nom"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="prenom"
          placeholder="Prénom"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn-solid">
          S'inscrire
        </button>
      </form>
      <p>ci vous avez déjà un compte! <Link to="/login-artisan">connectez-vous</Link></p>
    </div>
  );
}

export default RegisterArtisan;
