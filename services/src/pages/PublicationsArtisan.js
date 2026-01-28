import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  PlusCircle, 
  Edit, 
  Trash2, 
  Eye, 
  Filter,
  Search,
  MoreVertical
} from "lucide-react";
import "../style/PublicationsArtisan.css";

function PublicationsArtisan() {
  const navigate = useNavigate();
  const [publications, setPublications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Simuler des données
    const mockData = [
      { id: 1, title: "Rénovation Salle de Bain", category: "Plomberie", status: "Actif", date: "2024-01-15", views: 156, reservations: 12, price: "À partir de 500€" },
      { id: 2, title: "Installation Électrique", category: "Électricité", status: "Actif", date: "2024-01-10", views: 89, reservations: 8, price: "À partir de 300€" },
      { id: 3, title: "Peinture Appartement", category: "Peinture", status: "En attente", date: "2024-01-05", views: 45, reservations: 3, price: "À partir de 200€" },
      { id: 4, title: "Réparation Toiture", category: "Maçonnerie", status: "Inactif", date: "2023-12-20", views: 120, reservations: 5, price: "À partir de 800€" },
    ];
    setPublications(mockData);
  }, []);

  const filteredPublications = publications.filter(pub => {
    const matchesSearch = pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pub.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || pub.status.toLowerCase() === filter;
    return matchesSearch && matchesFilter;
  });

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette publication ?")) {
      setPublications(publications.filter(pub => pub.id !== id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setPublications(publications.map(pub => 
      pub.id === id ? { ...pub, status: newStatus } : pub
    ));
  };

  return (
    <div className="publications-page">
      <div className="page-header">
        <h1>Mes publications</h1>
        <button 
          className="btn-new-publication"
          onClick={() => navigate("/nouvelle-publication")}
        >
          <PlusCircle size={20} />
          Nouvelle publication
        </button>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="controls-bar">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Rechercher une publication..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-group">
          <Filter size={20} />
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Tous les statuts</option>
            <option value="actif">Actif</option>
            <option value="en attente">En attente</option>
            <option value="inactif">Inactif</option>
          </select>
        </div>
      </div>

      {/* Liste des publications */}
      <div className="publications-grid">
        {filteredPublications.length > 0 ? (
          filteredPublications.map(pub => (
            <div key={pub.id} className="publication-card">
              <div className="publication-header">
                <div className="publication-title">
                  <h3>{pub.title}</h3>
                  <span className={`status-badge status-${pub.status.toLowerCase().replace(' ', '-')}`}>
                    {pub.status}
                  </span>
                </div>
                <div className="publication-actions">
                  <button className="btn-action">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>
              
              <div className="publication-info">
                <div className="info-item">
                  <span className="label">Catégorie:</span>
                  <span className="value">{pub.category}</span>
                </div>
                <div className="info-item">
                  <span className="label">Date:</span>
                  <span className="value">{pub.date}</span>
                </div>
                <div className="info-item">
                  <span className="label">Vues:</span>
                  <span className="value">{pub.views}</span>
                </div>
                <div className="info-item">
                  <span className="label">Réservations:</span>
                  <span className="value">{pub.reservations}</span>
                </div>
                <div className="info-item">
                  <span className="label">Prix:</span>
                  <span className="value price">{pub.price}</span>
                </div>
              </div>
              
              <div className="publication-footer">
                <button 
                  className="btn-view"
                  onClick={() => navigate(`/publication/${pub.id}`)}
                >
                  <Eye size={16} />
                  Voir
                </button>
                <button 
                  className="btn-edit"
                  onClick={() => navigate(`/modifier-publication/${pub.id}`)}
                >
                  <Edit size={16} />
                  Modifier
                </button>
                <button 
                  className="btn-delete"
                  onClick={() => handleDelete(pub.id)}
                >
                  <Trash2 size={16} />
                  Supprimer
                </button>
                
                <select 
                  className="status-select"
                  value={pub.status}
                  onChange={(e) => handleStatusChange(pub.id, e.target.value)}
                >
                  <option value="Actif">Actif</option>
                  <option value="En attente">En attente</option>
                  <option value="Inactif">Inactif</option>
                </select>
              </div>
            </div>
          ))
        ) : (
          <div className="no-publications">
            <p>Aucune publication trouvée</p>
            <button 
              className="btn-new-publication"
              onClick={() => navigate("/nouvelle-publication")}
            >
              <PlusCircle size={20} />
              Créer votre première publication
            </button>
          </div>
        )}
      </div>

      {/* Statistiques */}
      <div className="publication-stats">
        <div className="stat-item">
          <h4>Total des publications</h4>
          <p className="stat-number">{publications.length}</p>
        </div>
        <div className="stat-item">
          <h4>Publications actives</h4>
          <p className="stat-number">
            {publications.filter(p => p.status === "Actif").length}
          </p>
        </div>
        <div className="stat-item">
          <h4>Vues totales</h4>
          <p className="stat-number">
            {publications.reduce((sum, pub) => sum + pub.views, 0)}
          </p>
        </div>
        <div className="stat-item">
          <h4>Réservations totales</h4>
          <p className="stat-number">
            {publications.reduce((sum, pub) => sum + pub.reservations, 0)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PublicationsArtisan;