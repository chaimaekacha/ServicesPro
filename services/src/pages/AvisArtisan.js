import React, { useState, useEffect } from "react";
import { Star, Filter, Calendar, User, Check } from "lucide-react";
import "../style/AvisArtisan.css";

function AvisArtisan() {
  const [avis, setAvis] = useState([]);
  const [filter, setFilter] = useState("all");
  const [stats, setStats] = useState({
    moyenne: 0,
    total: 0,
    distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  });

  useEffect(() => {
    const mockAvis = [
      {
        id: 1,
        client: "Marie Dupont",
        note: 5,
        commentaire: "Excellent travail ! Le plombier était ponctuel et professionnel. Je recommande vivement.",
        date: "2024-01-15",
        projet: "Rénovation salle de bain",
        repondu: true,
        reponse: "Merci beaucoup Marie pour votre confiance ! Ce fut un plaisir de travailler pour vous."
      },
      {
        id: 2,
        client: "Jean Martin",
        note: 4,
        commentaire: "Bon travail dans l'ensemble, un peu de retard mais résultat satisfaisant.",
        date: "2024-01-10",
        projet: "Installation électrique",
        repondu: false
      },
      {
        id: 3,
        client: "Sophie Leroy",
        note: 5,
        commentaire: "Artisan très compétent, travail soigné et respect du devis. Je ferai à nouveau appel à ses services.",
        date: "2024-01-05",
        projet: "Peinture appartement",
        repondu: true,
        reponse: "Merci Sophie, ravi que vous soyez satisfaite du résultat !"
      },
      {
        id: 4,
        client: "Thomas Bernard",
        note: 3,
        commentaire: "Prix un peu élevé pour le service rendu. Qualité moyenne.",
        date: "2024-01-02",
        projet: "Réparation fenêtre",
        repondu: true,
        reponse: "Bonjour Thomas, nous regrettons que vous ne soyez pas entièrement satisfait. Nous nous efforçons de nous améliorer constamment."
      }
    ];

    setAvis(mockAvis);
    
    // Calcul des statistiques
    const total = mockAvis.length;
    const moyenne = mockAvis.reduce((sum, avis) => sum + avis.note, 0) / total;
    
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    mockAvis.forEach(avis => {
      distribution[avis.note]++;
    });

    setStats({
      moyenne: moyenne.toFixed(1),
      total,
      distribution
    });
  }, []);

  const filteredAvis = avis.filter(avis => {
    if (filter === "all") return true;
    if (filter === "repondu") return avis.repondu;
    if (filter === "non-repondu") return !avis.repondu;
    if (filter === "5-stars") return avis.note === 5;
    return true;
  });

  const renderStars = (note) => {
    return (
      <div className="stars">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            fill={i < note ? "#FFD700" : "#E5E7EB"} 
            color={i < note ? "#FFD700" : "#E5E7EB"} 
          />
        ))}
      </div>
    );
  };

  const handleRepondre = (avisId) => {
    const reponse = prompt("Votre réponse :");
    if (reponse) {
      setAvis(avis.map(a => 
        a.id === avisId 
          ? { ...a, repondu: true, reponse } 
          : a
      ));
    }
  };

  return (
    <div className="avis-artisan">
      <div className="page-header">
        <h1>Mes avis et commentaires</h1>
        <p>Gérez les retours de vos clients</p>
      </div>

      {/* Statistiques */}
      <div className="stats-section">
        <div className="stats-card main-stat">
          <div className="rating-average">
            <span className="average">{stats.moyenne}</span>
            <div className="stars-large">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={24} 
                  fill={i < Math.floor(stats.moyenne) ? "#FFD700" : "#E5E7EB"} 
                  color="#FFD700" 
                />
              ))}
            </div>
            <span className="total-avis">({stats.total} avis)</span>
          </div>
        </div>

        <div className="stats-card">
          <h3>Répartition des notes</h3>
          <div className="distribution">
            {[5, 4, 3, 2, 1].map(star => (
              <div key={star} className="distribution-item">
                <span className="star-label">{star} étoiles</span>
                <div className="distribution-bar">
                  <div 
                    className="bar-fill"
                    style={{ 
                      width: `${(stats.distribution[star] / stats.total) * 100}%` 
                    }}
                  ></div>
                </div>
                <span className="distribution-count">
                  {stats.distribution[star]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="stats-card">
          <h3>Réponses aux avis</h3>
          <div className="reponse-stats">
            <div className="reponse-stat">
              <span className="stat-label">Répondu</span>
              <span className="stat-value">
                {avis.filter(a => a.repondu).length}
              </span>
            </div>
            <div className="reponse-stat">
              <span className="stat-label">Non répondu</span>
              <span className="stat-value">
                {avis.filter(a => !a.repondu).length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="filters-section">
        <div className="filter-group">
          <Filter size={18} />
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Tous les avis</option>
            <option value="5-stars">5 étoiles seulement</option>
            <option value="repondu">Avis répondu</option>
            <option value="non-repondu">Avis non répondu</option>
          </select>
        </div>
      </div>

      {/* Liste des avis */}
      <div className="avis-list">
        {filteredAvis.length > 0 ? (
          filteredAvis.map(avis => (
            <div key={avis.id} className="avis-card">
              <div className="avis-header">
                <div className="client-info">
                  <div className="client-avatar">
                    <User size={20} />
                  </div>
                  <div>
                    <h4>{avis.client}</h4>
                    <div className="avis-meta">
                      <span className="projet">{avis.projet}</span>
                      <span className="date">
                        <Calendar size={14} />
                        {avis.date}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="avis-note">
                  {renderStars(avis.note)}
                  <span className="note-text">{avis.note}/5</span>
                </div>
              </div>

              <div className="avis-comment">
                <p>{avis.commentaire}</p>
              </div>

              {avis.repondu ? (
                <div className="avis-reponse">
                  <div className="reponse-header">
                    <Check size={16} />
                    <strong>Votre réponse :</strong>
                  </div>
                  <p>{avis.reponse}</p>
                </div>
              ) : (
                <div className="avis-actions">
                  <button 
                    className="btn-repondre"
                    onClick={() => handleRepondre(avis.id)}
                  >
                    Répondre à cet avis
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="no-avis">
            <p>Aucun avis ne correspond à votre filtre</p>
          </div>
        )}
      </div>

      {/* Conseils */}
      <div className="tips-section">
        <h3>Conseils pour gérer vos avis</h3>
        <div className="tips">
          <div className="tip">
            <strong>Répondez rapidement</strong>
            <p>Les clients apprécient une réponse rapide à leurs commentaires</p>
          </div>
          <div className="tip">
            <strong>Soyez professionnel</strong>
            <p>Toujours répondre avec politesse, même aux critiques</p>
          </div>
          <div className="tip">
            <strong>Remerciez</strong>
            <p>Remerciez toujours pour les avis positifs</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AvisArtisan;