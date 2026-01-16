import React, { useState, useEffect } from "react";
import "../style/Home.css";
// import "../style/prestataire.css";
import { Link } from "react-router-dom";
import data from "../data/db.json";
function Home() {

  const [isArtisan, setIsArtisan] = useState(false);
  const [loading, setLoading] = useState(true);

// const [prestataires, setPrestataires] = useState([]);

//   useEffect(() => {
//     setPrestataires(data.prestataires);
//   }, []);

// useEffect(() => {
//   const artisan = localStorage.getItem("artisan");
//   if (artisan) {
//     setIsArtisan(true);
//   }
// }, []);

const handleLogout = () => {
  localStorage.removeItem("artisan");
  setIsArtisan(false);
};

  return (

    
    
    <div className="home">
        <section className="hero">
        <div className="hero-content">
          <h1>Trouvez le bon service, <br />au bon moment</h1>
          <p>Plombiers, Électriciens,...etc, Des professionnels vérifiés près de chez vous.</p>
          <div className="artisan-auth-box">
              
</div>
          {/* Barre de recherche  */}
          <div className="search-container">
            <div className="input-group">
              <input type="text" placeholder="Ville " />
            </div>
            <div className="input-group border-left">
              <select>
                <option>Choisir un service</option>
                <option>Plombier</option>
                <option>Électricien</option>
                <option>Menuisier</option>
                <option>Coiffeuse</option>
                <option>Menage</option>
              </select>
              
            </div>
            <button className="btn-search">
               Rechercher
            </button>
          </div>
        </div>
      </section>

      {/* Services populaires  */}
      <section className="services">
        <div className="section-header"> 
          <h2>Services populaires</h2>
        </div>

        <p className="subtitle">Les catégories les plus demandées cette semaine</p>
        <div className="service-cards">
          <div className="card">
            <h3>Plombier</h3>
          </div>
      
          <div className="card">
            <h3>Électricien</h3>
          </div>
          <div className="card">
            <h3>Menuisier</h3>
          </div>
           <div className="card">
            <h3>Menage</h3>
          </div>
        </div>
      </section>

        {/* Prestataires disponibles */}
        {/* <section className="services">
        <h2>Nos Prestataires</h2>
        <p className="subtitle">
          Découvrez les meilleurs artisans près de chez vous
        </p>

        <div className="prestataires-grid">
          {prestataires.map((p) => (
            <div className="prestataire-card" key={p.id}>
              <img src={p.image} alt={p.nom} />
              <h3>{p.nom}</h3>
              <p>{p.metier}</p>
              <span>{p.ville}</span>
            </div>
          ))}
        </div>
      </section> */}

      <Link to="/catalogue" className="btn-search">
  Voir tous les prestataires
</Link>


      {/*  (Avantages) */}
      <section className="why">
        <div className="section-header">
          <h2>Pourquoi PrServices ?</h2>
        </div>

        <div className="features-grid">
          <div className="feature-item">
            <div>
              <h4>Prestataires vérifiés</h4>
              <p>Identité et compétences validées.</p>
            </div>
          </div>
          <div className="feature-item">
            <div>
              <h4>Avis clients réels</h4>
              <p>Consultez les notes avant de choisir.</p>
            </div>
          </div>
          <div className="feature-item">
            <div>
              <h4>Rapide & Simple</h4>
              <p>Trouvez un pro en moins de 2 minutes.</p>
            </div>
          </div>
        </div>
     </section>
    </div>
    
  );
}

export default Home;