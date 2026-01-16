import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/LoginArtisan.css";

function LoginArtisan() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const artisan = JSON.parse(localStorage.getItem("artisan"));

    if (!artisan) {
      setError("Aucun compte trouvé. Veuillez vous inscrire.");
      return;
    }

    if (
      form.email === artisan.email &&
      form.password === artisan.password
    ) {
      // connexion réussie
      navigate("/");
    } else {
      setError("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="auth-page">
      <h2>Connexion Prestataire</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        {error && <p className="error-msg">{error}</p>}

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
          Se connecter
        </button>
      </form>
      <p>ci vous n'avez pas de compte, <a href="/register-artisan">inscrivez-vous</a></p>
      <p>ublier mot de passe ? <a href="#">Réinitialiser</a></p>
    </div>
  );
}

export default LoginArtisan;
