import React, { useState, useEffect } from "react";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  DollarSign,
  CheckCircle,
  XCircle,
  ClockIcon,
  Search,
  Filter,
  MessageSquare
} from "lucide-react";
import "../style/ReservationsClient.css";

function ReservationsClient() {
  const [reservations, setReservations] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Données fictives
    const mockReservations = [
      {
        id: 1,
        artisan: "Jamil",
        service: "Rénovation salle de bain",
        date: "2024-01-20",
        heure: "09:00",
        adresse: "12 Rue de Meknes, 75001 ",
        prix: 500,
        statut: "confirmé",
        noteArtisan: 4.5,
        dateReservation: "2024-01-15"
      },
      {
        id: 2,
        artisan: "Mariya ",
        service: "Installation électrique",
        date: "2024-01-22",
        heure: "14:00",
        adresse: "25 s, 75008 Ouajda",
        prix: 300,
        statut: "en attente",
        noteArtisan: 4.8,
        dateReservation: "2024-01-16"
      },
      {
        id: 3,
        artisan: "Nour ",
        service: "Peinture appartement",
        date: "2024-01-18",
        heure: "10:30",
        adresse: "8 Rue du Commerce, 75015 fes",
        prix: 750,
        statut: "terminé",
        noteArtisan: 4.2,
        dateReservation: "2024-01-10"
      },
      {
        id: 4,
        artisan: "Sophie ",
        service: "Dépannage plomberie",
        date: "2024-01-25",
        heure: "16:00",
        adresse: "40 Tizimi, Meknes",
        prix: 120,
        statut: "annulé",
        noteArtisan: 4.7,
        dateReservation: "2024-01-17"
      }
    ];

    setReservations(mockReservations);
  }, []);

  const filteredReservations = reservations.filter(res => {
    const matchesSearch = 
      res.artisan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.adresse.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filter === "all" || 
      res.statut === filter;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (statut) => {
    switch(statut) {
      case "confirmé":
        return <CheckCircle size={20} color="#10B981" />;
      case "en attente":
        return <ClockIcon size={20} color="#F59E0B" />;
      case "terminé":
        return <CheckCircle size={20} color="#3B82F6" />;
      case "annulé":
        return <XCircle size={20} color="#EF4444" />;
      default:
        return null;
    }
  };

  const getStatusColor = (statut) => {
    switch(statut) {
      case "confirmé": return "#10B981";
      case "en attente": return "#F59E0B";
      case "terminé": return "#3B82F6";
      case "annulé": return "#EF4444";
      default: return "#6B7280";
    }
  };

  const handleAnnuler = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir annuler cette réservation ?")) {
      setReservations(reservations.map(res =>
        res.id === id ? { ...res, statut: "annulé" } : res
      ));
    }
  };

  const handleContacter = (artisan) => {
    alert(`Contacter ${artisan}`);
  };

  const handleNoter = (id) => {
    const note = prompt("Notez ce service (1 à 5 étoiles):");
    if (note && note >= 1 && note <= 5) {
      alert(`Merci pour votre note de ${note} étoiles !`);
    }
  };

  return (
    <div className="reservations-client">
      <div className="page-header">
        <h1>Mes réservations</h1>
        <p>Gérez toutes vos réservations de services</p>
      </div>

      {/* Statistiques */}
      <div className="reservations-stats">
        <div className="stat-card">
          <h3>Total</h3>
          <p className="stat-number">{reservations.length}</p>
        </div>
        <div className="stat-card">
          <h3>Confirmées</h3>
          <p className="stat-number">
            {reservations.filter(r => r.statut === "confirmé").length}
          </p>
        </div>
        <div className="stat-card">
          <h3>En attente</h3>
          <p className="stat-number">
            {reservations.filter(r => r.statut === "en attente").length}
          </p>
        </div>
        <div className="stat-card">
          <h3>Terminées</h3>
          <p className="stat-number">
            {reservations.filter(r => r.statut === "terminé").length}
          </p>
        </div>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="controls-bar">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Rechercher une réservation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-group">
          <Filter size={20} />
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Tous les statuts</option>
            <option value="confirmé">Confirmées</option>
            <option value="en attente">En attente</option>
            <option value="terminé">Terminées</option>
            <option value="annulé">Annulées</option>
          </select>
        </div>
      </div>

      {/* Liste des réservations */}
      <div className="reservations-list">
        {filteredReservations.length > 0 ? (
          filteredReservations.map(res => (
            <div key={res.id} className="reservation-card">
              <div className="reservation-header">
                <div className="reservation-info">
                  <h3>{res.service}</h3>
                  <div className="reservation-meta">
                    <span className="artisan">
                      <User size={16} />
                      {res.artisan}
                    </span>
                    <span className="note">
                       {res.noteArtisan}/5
                    </span>
                  </div>
                </div>
                <div className="reservation-status">
                  {getStatusIcon(res.statut)}
                  <span 
                    className="status-text"
                    style={{ color: getStatusColor(res.statut) }}
                  >
                    {res.statut.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="reservation-details">
                <div className="detail-item">
                  <Calendar size={18} />
                  <div>
                    <span className="label">Date:</span>
                    <span className="value">{res.date} à {res.heure}</span>
                  </div>
                </div>
                
                <div className="detail-item">
                  <MapPin size={18} />
                  <div>
                    <span className="label">Adresse:</span>
                    <span className="value">{res.adresse}</span>
                  </div>
                </div>
                
                <div className="detail-item">
                  <DollarSign size={18} />
                  <div>
                    <span className="label">Prix:</span>
                    <span className="value price">{res.prix}€</span>
                  </div>
                </div>
                
                <div className="detail-item">
                  <Clock size={18} />
                  <div>
                    <span className="label">Réservé le:</span>
                    <span className="value">{res.dateReservation}</span>
                  </div>
                </div>
              </div>

              <div className="reservation-actions">
                {res.statut === "en attente" && (
                  <>
                    <button 
                      className="btn-confirm"
                      onClick={() => alert("Confirmation envoyée à l'artisan")}
                    >
                      Confirmer
                    </button>
                    <button 
                      className="btn-cancel"
                      onClick={() => handleAnnuler(res.id)}
                    >
                      Annuler
                    </button>
                  </>
                )}
                
                {res.statut === "confirmé" && (
                  <>
                    <button 
                      className="btn-contact"
                      onClick={() => handleContacter(res.artisan)}
                    >
                      <MessageSquare size={16} />
                      Contacter
                    </button>
                    <button 
                      className="btn-cancel"
                      onClick={() => handleAnnuler(res.id)}
                    >
                      Annuler
                    </button>
                  </>
                )}
                
                {res.statut === "terminé" && (
                  <>
                    <button 
                      className="btn-note"
                      onClick={() => handleNoter(res.id)}
                    >
                      Noter le service
                    </button>
                    <button 
                      className="btn-contact"
                      onClick={() => handleContacter(res.artisan)}
                    >
                      <MessageSquare size={16} />
                      Recontacter
                    </button>
                  </>
                )}
                
                {res.statut === "annulé" && (
                  <button 
                    className="btn-rebook"
                    onClick={() => alert("Redirection vers le catalogue...")}
                  >
                    Réserver à nouveau
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="no-reservations">
            <p>Aucune réservation trouvée</p>
            <button 
              className="btn-explore"
              onClick={() => window.location.href = "/catalogue"}
            >
              Explorer les services
            </button>
          </div>
        )}
      </div>

      {/* Calendrier des prochaines réservations */}
      <div className="upcoming-section">
        <h2>Prochaines réservations</h2>
        <div className="upcoming-list">
          {reservations
            .filter(r => r.statut === "confirmé" || r.statut === "en attente")
            .filter(r => new Date(r.date) >= new Date())
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 3)
            .map(res => (
              <div key={res.id} className="upcoming-item">
                <div className="upcoming-date">
                  <span className="day">{new Date(res.date).getDate()}</span>
                  <span className="month">
                    {new Date(res.date).toLocaleString('fr-FR', { month: 'short' })}
                  </span>
                </div>
                <div className="upcoming-info">
                  <h4>{res.service}</h4>
                  <p>{res.artisan} • {res.heure}</p>
                </div>
                <button 
                  className="btn-details"
                  onClick={() => alert(`Détails de ${res.service}`)}
                >
                  Détails
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ReservationsClient;