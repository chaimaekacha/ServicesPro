
import React, { useState } from "react";
import "../style/Home.css";

import { Link } from "react-router-dom";
import data from "../data/db.json";
import { 
  Droplet, 
  Zap, 
  PaintBucket, 
  Hammer, 
  Brush,
  Scissors,
  Wind,
  Trash2,
  Sparkles,
  Shield,
  Clock,
  Phone,
  CheckCircle,
  Star
} from "lucide-react";
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

const avisPlateforme = [
  {
    id: 1,
    nom: "Fatima",
    commentaire: "منصة سهلة بزاف ولقّيت خدمة بسرعة 👌",
    note: 5,
  },
  {
    id: 2,
    nom: "Yassine",
    commentaire: "فكرة زوينة وخدمات محترفة",
    note: 4,
  },
  {
    id: 3,
    nom: "Khadija",
    commentaire: "تعاملت مع كهربائي ممتاز عبر الموقع",
    note: 5,
  },
];

const avisPrestataires = [
  {
    id: 1,
    prestataire: "Ahmed",
    commentaire: "خدمة نظيفة واحترافية 👍",
    note: 5,
  },
  {
    id: 2,
    prestataire: "Sara",
    commentaire: "جت فالوقت وخدمتها مزيانة",
    note: 4,
  },
];

function Home() {
 
  const [ville, setVille] = useState("");
  const [service, setService] = useState("");
  const [resultats, setResultats] = useState([]);
  const [searched, setSearched] = useState(false);

  
  const handleSearch = () => {
    const filtered = prestataires.filter((p) => {
      const matchVille =
        ville === "" ||
        p.ville.toLowerCase().includes(ville.toLowerCase());

      const matchService =
        service === "" || p.metier === service;

      return matchVille && matchService;
    });

    setResultats(filtered);
    setSearched(true);
  };

  const [avisPlateforme, setAvisPlateforme] = useState([
  {
    id: 1,
    nom: "Fatima",
    commentaire: "منصة سهلة ولقّيت خدمة بسرعة",
    note: 5,
  },
  {
    id: 2,
    nom: "Yassine",
    commentaire: "خدمة مزيانة ولكن خاص تحسين فالfiltrage",
    note: 3,
  },
  {
    id: 3,
    nom: "Khadija",
    commentaire: "تعاملت مع سباك ممتاز",
    note: 4,
  },
]);

const [newRating, setNewRating] = useState(0);
const [newComment, setNewComment] = useState("");

const StarRating = ({ rating, onRate }) => {
  return (
    <div style={{ fontSize: "1.4rem", cursor: "pointer" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onRate(star)}
          style={{
            color: star <= rating ? "#facc15" : "#cbd5e1",
            marginRight: "4px",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const handleAddAvis = () => {
  if (newRating === 0 || newComment === "") return;

  setAvisPlateforme([
    ...avisPlateforme,
    {
      id: Date.now(),
      nom: "Utilisateur",
      commentaire: newComment,
      note: newRating,
    },
  ]);

  setNewRating(0);
  setNewComment("");
};

  return (

    <div className="home">

      {/* HERO */}
      <section className="hero">
        <h1 className="typewriter">
          Trouvez le bon service,<br />au bon moment
        </h1>
        <p>
          Plombiers, Électriciens, Menuisiers… des profitionel près de chez vous
        </p>

        {/* SEARCH */}
        <div className="search-container">
          <div className="input-group">
            <input
              type="text"
              placeholder="Ville"
              value={ville}
              onChange={(e) => setVille(e.target.value)}
            />
          </div>

          <div className="input-group border-left">
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              <option value="">Choisir un service</option>
              <option value="Plombier">Plombier</option>
              <option value="Électricien">Électricien</option>
              <option value="Menuisier">Menuisier</option>
              <option value="Coiffeuse">Coiffeuse</option>
              <option value="Menage">Menage</option>
            </select>
          </div>

          <button className="btn-search" onClick={handleSearch}>
            Rechercher
          </button>
        </div>
      </section>

      {/* SERVICES POPULAIRES */}
      <section className="services">
        <h2>Services populaires</h2><br></br>
        <div className="service-cards">
          <div className="card"><h3>Plombier</h3></div>
          <div className="card"><h3>Électricien</h3></div>
          <div className="card"><h3>Menuisier</h3></div>
          <div className="card"><h3>Menage</h3></div>
        </div>
      </section>

      {/* RESULTATS */}
      {searched && (
        <section className="services">
          <h2>Résultats de recherche</h2>
              <br></br>
          {resultats.length === 0 ? (
            <p className="subtitle">Aucun prestataire trouvé </p>
          ) : (
            <div className="service-cards">
              {resultats.map((p) => (
                <div className="card" key={p.id}>
            <img
                src={prestataires[p.metier]}
                alt={p.nom}
                style={{
                width: "100%",
                height: "130px",
                objectFit: "cover",
                borderRadius: "15px",
                marginBottom: "10px",}} />
                  <h3>{p.nom}</h3>
                  <p>{p.metier}</p>
                  <p>{p.ville}</p>

                  <Link to={`/profil/${p.id}`} className="btn-go-profile">
                    Voir profil
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* VOIR TOUS */}
      <div className="see-all-container">
        <Link to="/catalogue" className="btn-see-all">
          Voir tous les prestataires
        </Link>
      </div>

      {/* (Avantages) */}
      <section className="why">
        <div className="section-header">
          <h2>Pourquoi ServicesPro ?</h2>
        </div>

        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon-box">
              <Shield />
            </div>
            <div>
              <h4>Prestataires vérifiés</h4>
              <p>Identité et compétences validées.</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon-box">
              <Star />
            </div>
            <div>
              <h4>Avis clients réels</h4>
              <p>Consultez les notes avant de choisir.</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon-box">
              <Clock />
            </div>
            <div>
              <h4>Rapide & Simple</h4>
              <p>Trouvez un pro en moins de 2 minutes.</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon-box">
              <CheckCircle />
            </div>
            <div>
              <h4>Garantie & support</h4>
              <p>Service client disponible, possibilité de signaler un problème</p>
            </div>
          </div>
        </div>
      </section>
{/* AVIS */}
<section className="services">
  <h2>Avis des utilisateurs</h2>
  <p className="subtitle">ServicesPro رأي الناس حول     </p>

  <div className="service-cards">
    {avisPlateforme.map((avis) => (
      <div className="card" key={avis.id}>
        <h3>{avis.nom}</h3>
        <p>{"⭐".repeat(avis.note)}</p>
        <p>{avis.commentaire}</p>
      </div>
    ))}
  </div>
</section>

<section className="services">
  <h2>Avis sur les prestataires</h2>
  <p className="subtitle">تجارب حقيقية مع مهنيين</p>

  <div className="service-cards">
    {avisPrestataires.map((avis) => (
      <div className="card" key={avis.id}>
        <h3>{avis.prestataire}</h3>
        <p>{"⭐".repeat(avis.note)}</p>
        <p>{avis.commentaire}</p>
      </div>
    ))}
    
  </div>
</section>

  <section className="services avis-section">
    <div className="avis-form">
    <h3>Donnez votre avis</h3>
  <p className="subtitle">Ils nous font confiance</p>
    <StarRating rating={newRating} onRate={setNewRating} />
    <textarea
      className="avis-textarea"
      placeholder="Écrivez votre avis..."
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
    />

    <button
      className="btn-search"
      style={{ width: "10%", marginTop: "15px" }}
      onClick={handleAddAvis}
    >
      Envoyer
    </button>
  </div>
</section>
    </div>

  );
}

export default Home;