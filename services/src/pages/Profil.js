import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import data from "../data/db.json";
import "../style/Profil.css";

const Profil = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const artisan = data.prestataires.find(
    (p) => p.id === parseInt(id)
  );

  if (!artisan) {
    return (
      <div className="container">
        <h2>Prestataire non trouvé</h2>
        <button onClick={() => navigate("/catalogue")}>
          Retour au catalogue
        </button>
      </div>
    );
  }

  return (
    <div className="profil-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Retour
      </button>

      <div className="profil-card">
        <img src={artisan.image} alt={artisan.nom} className="profil-img" />

        <div className="profil-info">
          <h1>{artisan.nom}</h1>
          <p className="metier">{artisan.metier}</p>
          <p className="ville"> {artisan.ville}</p>

          <p className="description">
            Prestataire professionnel avec expérience dans le domaine de{" "}
            {artisan.metier}.
          </p>

          <button className="btn-contact">
            Contacter {artisan.nom.split(" ")[0]}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profil;
