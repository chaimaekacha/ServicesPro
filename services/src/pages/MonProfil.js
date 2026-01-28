 import React, { useState } from "react";
import "../style/MonProfil.css";
function MonProfil() {
  const stored = JSON.parse(localStorage.getItem("artisan"));
  const [artisan, setArtisan] = useState(stored);

  if (!artisan) {
    return <p>Veuillez vous connecter</p>;
  }

  const handleChange = (e) => {
    setArtisan({ ...artisan, [e.target.name]: e.target.value });
  };

  const saveChanges = () => {
    localStorage.setItem("artisan", JSON.stringify(artisan));
    alert("Profil mis à jour");
  };

  return (
    <div>
      <h2>Mon profil (Privé)</h2>

      <input
        name="prenom"
        value={artisan.prenom}
        onChange={handleChange}
      />

      <input
        name="nom"
        value={artisan.nom}
        onChange={handleChange}
      />

      <input
        name="ville"
        value={artisan.ville}
        onChange={handleChange}
      />

      <input
        name="telephone"
        value={artisan.telephone}
        onChange={handleChange}
      />

      <textarea
        name="description"
        value={artisan.description}
        onChange={handleChange}
      />

      <button onClick={saveChanges}>
        Enregistrer modifications
      </button>
    </div>
  );
}

export default MonProfil;
