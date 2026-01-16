import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    service: "",
    ville: "",
    telephone: "",
    description: "",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const artisan = JSON.parse(localStorage.getItem("artisan"));

    const fullProfile = {
      ...artisan,
      ...profile,
    };

    localStorage.setItem("artisan", JSON.stringify(fullProfile));

    navigate("/");
  };

  return (
    <div className="profile-page">
      <h2>Créer votre profil</h2>

      <form onSubmit={handleSubmit} className="profile-form">
        <select name="service" onChange={handleChange} required>
          <option value="">Choisir un service</option>
          <option>Plombier</option>
          <option>Électricien</option>
          <option>Menuisier</option>
          <option>Zlayji</option>
        </select>

        <input
          type="text"
          name="ville"
          placeholder="Ville"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="telephone"
          placeholder="Téléphone"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description de votre service"
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn-solid">
          Enregistrer le profil
        </button>
      </form>
    </div>
  );
}

export default CreateProfile;
