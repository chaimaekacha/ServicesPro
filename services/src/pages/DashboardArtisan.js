import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  PlusCircle, 
  Edit, 
  Trash2, 
  Star, 
  MessageSquare, 
  Calendar,
  TrendingUp,
  Users,
  Award
} from "lucide-react";
import "../style/DashboardArtisan.css";

function DashboardArtisan() {
  const navigate = useNavigate();
  const [artisan, setArtisan] = useState(null);
  const [publications, setPublications] = useState([]);
  const [statistics, setStatistics] = useState({
    totalPublications: 0,
    totalReservations: 0,
    averageRating: 4.5,
    totalRevenue: 0
  });

  useEffect(() => {
    const storedArtisan = JSON.parse(localStorage.getItem("artisan"));
    
    if (!storedArtisan) {
      navigate("/login-artisan");
      return;
    }
    
    setArtisan(storedArtisan);
    const mockPublications = [
      { id: 1, title: "Rénovation Salle de Bain", category: "Plomberie", status: "Actif", views: 156, reservations: 12 },
      { id: 2, title: "Installation Électrique", category: "Électricité", status: "Actif", views: 89, reservations: 8 },
      { id: 3, title: "Peinture Appartement", category: "Peinture", status: "En attente", views: 45, reservations: 3 }
    ];
    setPublications(mockPublications);
  }, [navigate]);

  const handleDeletePublication = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette publication ?")) {
      setPublications(publications.filter(pub => pub.id !== id));
    }
  };

  if (!artisan) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="dashboard-artisan">
      <div className="dashboard-header">
        <h1>Tableau de bord</h1>
        <button 
          className="btn-add-publication"
          onClick={() => navigate("/nouvelle-publication")}
        >
          <PlusCircle size={20} />
          Nouvelle publication
        </button>
      </div>

      {/* Statistiques */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <TrendingUp />
          </div>
          <div className="stat-info">
            <h3>{statistics.totalPublications}</h3>
            <p>Publications</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <Calendar />
          </div>
          <div className="stat-info">
            <h3>{statistics.totalReservations}</h3>
            <p>Réservations</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <Star />
          </div>
          <div className="stat-info">
            <h3>{statistics.averageRating}</h3>
            <p>Note moyenne</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <Award />
          </div>
          <div className="stat-info">
            <h3>{statistics.totalRevenue}€</h3>
            <p>Revenus totaux</p>
          </div>
        </div>
      </div>

      {/* Publications récentes */}
      <div className="publications-section">
        <div className="section-header">
          <h2>Mes publications</h2>
          <Link to="/mes-publications">Voir tout</Link>
        </div>
        
        <div className="publications-table">
          <table>
            <thead>
              <tr>
                <th>Titre</th>
                <th>Catégorie</th>
                <th>Statut</th>
                <th>Vues</th>
                <th>Réservations</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {publications.map(pub => (
                <tr key={pub.id}>
                  <td>{pub.title}</td>
                  <td>{pub.category}</td>
                  <td>
                    <span className={`status-badge status-${pub.status.toLowerCase().replace(' ', '-')}`}>
                      {pub.status}
                    </span>
                  </td>
                  <td>{pub.views}</td>
                  <td>{pub.reservations}</td>
                  <td className="actions">
                    <button 
                      className="btn-action btn-edit"
                      onClick={() => navigate(`/modifier-publication/${pub.id}`)}
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      className="btn-action btn-delete"
                      onClick={() => handleDeletePublication(pub.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                    <button 
                      className="btn-action btn-view"
                      onClick={() => navigate(`/publication/${pub.id}`)}
                    >
                      Voir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Actions rapides</h2>
        <div className="actions-grid">
          <button 
            className="action-card"
            onClick={() => navigate("/nouvelle-publication")}
          >
            <PlusCircle size={24} />
            <span>Créer une publication</span>
          </button>
          
          <button 
            className="action-card"
            onClick={() => navigate("/mon-profil-artisan")}
          >
            <Users size={24} />
            <span>Modifier mon profil</span>
          </button>
          
          <button 
            className="action-card"
            onClick={() => navigate("/mes-avis")}
          >
            <Star size={24} />
            <span>Voir mes avis</span>
          </button>
          
          <button 
            className="action-card"
            onClick={() => navigate("/messages")}
          >
            <MessageSquare size={24} />
            <span>Messages</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardArtisan;