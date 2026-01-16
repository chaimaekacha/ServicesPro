import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import plombierImg from "../Assets/images/plombier.jpg";
import electricienImg from "../Assets/images/electricien.jpg";
import menageImg from "../Assets/images/menage.jpg";
import menuisierImg from "../Assets/images/menuisier.jpg";
import coiffeuseImg from "../Assets/images/coiffeuse.jpg";
import climatisationImg from "../Assets/images/climatisation.jpg";
import couturierImg from "../Assets/images/couturier.jpg";
import peintreImg from "../Assets/images/peintre.jpg";

const prestataires = [
  { id: 1, nom: "Ahmed", metier: "Plombier", ville: "Casablanca", image: plombierImg },
  { id: 2, nom: "Sara", metier: "Électricienne", ville: "Rabat", image: electricienImg },
  { id: 3, nom: "Youssef", metier: "Menuisier", ville: "Marrakech", image: menuisierImg },
  { id: 4, nom: "Khadija", metier: "Coiffeuse", ville: "Fès", image: coiffeuseImg },
  { id: 5, nom: "Omar", metier: "Peintre", ville: "Tanger", image: peintreImg },
  { id: 6, nom: "Imane", metier: "Couturière", ville: "Agadir", image: couturierImg },
  { id: 7, nom: "Hassan", metier: "Technicien Climatisation", ville: "Salé", image: climatisationImg },
  { id: 8, nom: "Nadia", metier: "Femme de ménage", ville: "Kénitra", image: menageImg },
];

const Catalogue = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const cities = useMemo(() => [...new Set(prestataires.map(p => p.ville))], []);

  const filteredPrestataires = useMemo(() => {
    return prestataires.filter((p) => {
      const matchSearch =
        p.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.metier.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCity = selectedCity === "" || p.ville === selectedCity;

      return matchSearch && matchCity;
    });
  }, [searchQuery, selectedCity]);

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>

      <aside style={{ width: "250px", borderRight: "1px solid #ddd" }}>
        <h3>Choisissez votre prestataire: </h3>

        <input
          type="text"
          placeholder="Rechercher un service ou un nom"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: "90%", padding: "8px", marginBottom: "15px" }}
        />

        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          style={{ width: "95%", padding: "8px" }}
        >
          <option value="">Toutes les villes</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </aside>

      <main style={{ flex: 1 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredPrestataires.length > 0 ? (
            filteredPrestataires.map((p) => (
              <div key={p.id} style={cardStyle}>
                <img src={p.image} alt={p.nom} style={imgStyle} />
                <div style={{ padding: "15px" }}>
                  <h3>{p.nom}</h3>
                  <p>{p.metier}</p>
                  <p>{p.ville}</p>
                  <button
                    onClick={() => navigate(`/profil/${p.id}`)}
                    style={btnStyle}
                  >
                    Voir profil
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Aucun prestataire trouvé.</p>
          )}
        </div>
      </main>
    </div>
  );
};

// styles
const cardStyle = {
  border: "1px solid #eee",
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
};

const imgStyle = {
  width: "100%",
  height: "180px",
  objectFit: "cover",
};

const btnStyle = {
  marginTop: "10px",
  width: "100%",
  padding: "10px",
  background: "#2bb0a6",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default Catalogue;
