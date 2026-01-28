import React, { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Catalogue.css";

// Importer les images
import plombierImg from "../Assets/images/plombier.jpg";
import electricienImg from "../Assets/images/electricien.jpg";
import menageImg from "../Assets/images/menage.jpg";
import menuisierImg from "../Assets/images/menuisier.jpg";
import coiffeuseImg from "../Assets/images/coiffeuse.jpg";
import climatisationImg from "../Assets/images/climatisation.jpg";
import couturierImg from "../Assets/images/couturier.jpg";
import peintreImg from "../Assets/images/peintre.jpg";
import plombierImg2 from "../Assets/images/plombier2.jpg";
import electricienImg2 from "../Assets/images/electricien2.jpg";
import menuisierImg2 from "../Assets/images/menuisier2.jpg";
import coiffeuseImg2 from "../Assets/images/coiffeuse2.jpg";
// Importer les icones
import { 
  FaTools,
  FaFaucet,
  FaPlug,
  FaBroom,
  FaHammer,
  FaCut,
  FaSnowflake,
  FaRulerCombined,
  FaPaintRoller,
  FaHome,
  FaCar,
  FaBaby,
  FaUtensils,
  FaLaptop,
  FaWifi,
  FaStar
} from "react-icons/fa";

// Données des prestataires 
const prestataires = [
  { 
    id: 1, 
    nom: "Ahmed", 
    metier: "Plombier", 
    ville: "Casablanca", 
    service: "plombier",
    description: "Plombier professionnel avec 10 ans d'expérience. Spécialisé en installation et réparation.",
    tarif: "250-400 MAD",
    note: 4.8,
    disponible: true,
    image: plombierImg 
  },
  { 
    id: 2, 
    nom: "Said", 
    metier: "Électricien", 
    ville: "Rabat", 
    service: "electricien",
    description: "Électricien certifié, installations sécurisées et conformes aux normes.",
    tarif: "300-500 MAD",
    note: 4.9,
    disponible: true,
    image: electricienImg 
  },
  { 
    id: 3, 
    nom: "Youssef", 
    metier: "Menuisier", 
    ville: "Marrakech", 
    service: "menuisier",
    description: "Artisan menuisier, création de meubles sur mesure et rénovation.",
    tarif: "400-600 MAD",
    note: 4.7,
    disponible: true,
    image: menuisierImg 
  },
  { 
    id: 4, 
    nom: "Khadija", 
    metier: "Coiffeuse", 
    ville: "Fès", 
    service: "coiffure",
    description: "Coiffeuse professionnelle, coupes modernes et soins capillaires.",
    tarif: "150-300 MAD",
    note: 4.6,
    disponible: true,
    image: coiffeuseImg 
  },
  { 
    id: 5, 
    nom: "Omar", 
    metier: "Peintre", 
    ville: "Tanger", 
    service: "peinture",
    description: "Peintre en bâtiment, travaux intérieurs et extérieurs de qualité.",
    tarif: "200-350 MAD/m²",
    note: 4.5,
    disponible: true,
    image: peintreImg 
  },
  { 
    id: 6, 
    nom: "Imane", 
    metier: "Couturière", 
    ville: "Agadir", 
    service: "couture",
    description: "Couturière expérimentée, retouches et créations sur mesure.",
    tarif: "100-250 MAD",
    note: 4.8,
    disponible: true,
    image: couturierImg 
  },
  { 
    id: 7, 
    nom: "Hassan", 
    metier: "Technicien Climatisation", 
    ville: "Salé", 
    service: "climatisation",
    description: "Installation et maintenance de systèmes de climatisation.",
    tarif: "500-800 MAD",
    note: 4.7,
    disponible: true,
    image: climatisationImg 
  },
  { 
    id: 8, 
    nom: "Nadia", 
    metier: "Femme de ménage", 
    ville: "Kénitra", 
    service: "menage",
    description: "Nettoyage professionnel résidentiel et bureaux.",
    tarif: "150-250 MAD/heure",
    note: 4.9,
    disponible: true,
    image: menageImg 
  },
  { 
    id: 9, 
    nom: "Karim", 
    metier: "Plombier", 
    ville: "Casablanca", 
    service: "plombier",
    description: "Expert en dépannage urgent et installation sanitaire.",
    tarif: "300-450 MAD",
    note: 4.6,
    disponible: true,
    image: plombierImg2 
  },
  { 
    id: 10, 
    nom: "Fatima", 
    metier: "Électricienne", 
    ville: "Rabat", 
    service: "electricien",
    description: "Spécialiste en éclairage et domotique résidentielle.",
    tarif: "350-550 MAD",
    note: 4.8,
    disponible: true,
    image: electricienImg2 
  },
  { 
    id: 11, 
    nom: "Mohamed", 
    metier: "Menuisier", 
    ville: "Marrakech", 
    service: "menuisier",
    description: "Spécialiste en meubles traditionnels marocains.",
    tarif: "450-700 MAD",
    note: 4.9,
    disponible: true,
    image: menuisierImg2 
  },
  { 
    id: 12, 
    nom: "Amina", 
    metier: "Coiffeuse", 
    ville: "Fès", 
    service: "coiffure",
    description: "Spécialiste en coiffure de mariage et événements.",
    tarif: "200-400 MAD",
    note: 4.7,
    disponible: true,
    image: coiffeuseImg2 
  }
];

const services = [
  { id: "all", nom: "Tous", icon: <FaTools />, color: "#2bb0a6", description: "Tous les services" },
  { id: "plombier", nom: "Plomberie", icon: <FaFaucet />, color: "#3498db", description: "Installation et réparation" },
  { id: "electricien", nom: "Électricité", icon: <FaPlug />, color: "#f1c40f", description: "Installation électrique" },
  { id: "menage", nom: "Ménage", icon: <FaBroom />, color: "#e74c3c", description: "Nettoyage domestique" },
  { id: "menuisier", nom: "Menuiserie", icon: <FaHammer />, color: "#9b59b6", description: "Bois et aménagement" },
  { id: "coiffure", nom: "Coiffure", icon: <FaCut />, color: "#e67e22", description: "Soins capillaires" },
  { id: "climatisation", nom: "Climatisation", icon: <FaSnowflake />, color: "#1abc9c", description: "Installation climatiseurs" },
  { id: "couture", nom: "Couture", icon: <FaRulerCombined />, color: "#d35400", description: "Travaux de couture" },
  { id: "peinture", nom: "Peinture", icon: <FaPaintRoller />, color: "#34495e", description: "Peinture intérieure/extérieure" },
  { id: "jardinage", nom: "Jardinage", icon: <FaHome />, color: "#27ae60", description: "Entretien des espaces verts" },
  { id: "mecanique", nom: "Mécanique", icon: <FaCar />, color: "#e74c3c", description: "Réparation automobile" },
  { id: "garde", nom: "Garde d'enfants", icon: <FaBaby />, color: "#f39c12", description: "Baby-sitting" },
  { id: "cuisine", nom: "Cuisine", icon: <FaUtensils />, color: "#c0392b", description: "Services culinaires" },
  { id: "informatique", nom: "Informatique", icon: <FaLaptop />, color: "#8e44ad", description: "Support informatique" },
  { id: "internet", nom: "Internet", icon: <FaWifi />, color: "#2980b9", description: "Installation réseau" },
];

const Catalogue = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedService, setSelectedService] = useState("all");
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const scrollContainerRef = useRef(null);
  const scrollIntervalRef = useRef(null);

  // Animation de défilement automatique horizontal
  useEffect(() => {
    if (isAutoScrolling && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      
      if (scrollWidth > clientWidth) {
        let scrollPosition = 0;
        const scrollStep = 1;
        
        scrollIntervalRef.current = setInterval(() => {
          scrollPosition += scrollStep;
          
          if (scrollPosition >= scrollWidth - clientWidth) {
            setTimeout(() => {
              scrollPosition = 0;
              container.scrollTo({ left: 0, behavior: 'smooth' });
            }, 2000);
          } else {
            container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
          }
        }, 50);
      }
    }

    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, [isAutoScrolling]);
//ville
  const cities = useMemo(() => {
    const uniqueCities = [...new Set(prestataires.map(p => p.ville))];
    return uniqueCities.sort();
  }, []);

  //  filtrer les prestataires
  const filteredPrestataires = useMemo(() => {
    return prestataires.filter((p) => {
      const matchSearch =
        p.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.metier.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchCity = selectedCity === "" || p.ville === selectedCity;

      const matchService = selectedService === "all" || p.service === selectedService;

      return matchSearch && matchCity && matchService;
    });
  }, [searchQuery, selectedCity, selectedService]);

  const handleServiceClick = (serviceId) => {
    setSelectedService(serviceId);
    setIsAutoScrolling(false);
    setTimeout(() => setIsAutoScrolling(true), 10000);
  };

  const handleMouseEnterService = () => {
    setIsAutoScrolling(false);
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
    }
  };

  const handleMouseLeaveService = () => {
    setTimeout(() => setIsAutoScrolling(true), 3000);
  };

  const selectedServiceData = services.find(s => s.id === selectedService);

  return (
    <div className="catalogue-container">
      <div className="services-header">
  <h2 className="services-title">
    خدمة اللي محتاجها تلقاها بسهولة  </h2>
</div>

      <div className="filters-section">
        <div className="search-filter">
          <div className="search-box">
            <input
              type="text"
              placeholder=" Rechercher un service, nom ou description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="select-box">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="city-select"
            >
              <option value=""> Toutes les villes</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="services-horizontal-section">
          <h3 className="services-title">
            <span className="title-text">Choisissez votre service</span>
            <span className="title-subtext"> - {prestataires.length} prestataires disponibles</span>
          </h3>
          
          <div className="scroll-controls">
            <button 
              className="scroll-btn left"
              onClick={() => {
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
                }
              }}
            >
              ←
            </button>
            
            <div 
              className="services-scroll-container"
              ref={scrollContainerRef}
              onMouseEnter={handleMouseEnterService}
              onMouseLeave={handleMouseLeaveService}
            >
              <div className="services-floating-track">
                {services.map((service, index) => (
                  <div
                    key={service.id}
                    className={`service-icon-item ${selectedService === service.id ? "active" : ""}`}
                    onClick={() => handleServiceClick(service.id)}
                    style={{ 
                      animationDelay: `${index * 0.1}s`,
                      borderColor: selectedService === service.id ? service.color : '#e2e8f0',
                    }}
                  >
                    <div 
                      className="service-icon-circle"
                      style={{ backgroundColor: service.color }}
                    >
                      {service.icon}
                    </div>
                    <span className="service-icon-name">{service.nom}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              className="scroll-btn right"
              onClick={() => {
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
                }
              }}
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div className="cards-section">
        <div className="results-info">
          <h2>
            {selectedService === "all" ? "Tous les prestataires" : 
             selectedServiceData?.nom}
            <span className="results-count"> ({filteredPrestataires.length} résultats)</span>
          </h2>
          
          {selectedService !== "all" && (
            <button 
              onClick={() => setSelectedService("all")}
              className="clear-filter-btn"
            >
              Voir tous les services
            </button>
          )}
        </div>

        <div className="square-cards-grid">
          {filteredPrestataires.length > 0 ? (
            filteredPrestataires.map((p) => {
              const serviceData = services.find(s => s.id === p.service);
              
              return (
                <div key={p.id} className="square-card">
                  <div className="square-card-image">
                    <img src={p.image} alt={p.nom} />
                    {serviceData && (
                      <div 
                        className="service-badge"
                        style={{ backgroundColor: serviceData.color }}
                      >
                        {serviceData.icon}
                      </div>
                    )}
                    {p.note && (
                      <div className="rating-badge">
                        <FaStar /> {p.note}
                      </div>
                    )}
                    {p.disponible === false && (
                      <div className="unavailable-badge">
                        Indisponible
                      </div>
                    )}
                  </div>
                  <div className="square-card-content">
                    <h3 className="square-card-title">{p.nom}</h3>
                    <p className="square-card-metier">
                      {serviceData?.icon}
                      {p.metier}
                    </p>
                    <p className="square-card-ville">{p.ville}</p>
                    
                    {p.tarif && (
                      <p className="square-card-tarif">
                         {p.tarif}
                      </p>
                    )}
                    
                    {p.note && (
                      <div className="square-card-rating">
                        <FaStar />
                        <span>{p.note}</span>
                      </div>
                    )}
                    
                    {p.description && (
                      <p className="square-card-description">
                        {p.description.length > 80 
                          ? `${p.description.substring(0, 80)}...` 
                          : p.description}
                      </p>
                    )}
                    
                    <div className="card-actions">
                      <button
                        onClick={() => navigate(`/profil/${p.id}`)}
                        className="square-card-btn"
                      >
                        Voir profil
                      </button>
                     
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-results">
              <p>Aucun prestataire trouvé pour cette recherche.</p>
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCity("");
                  setSelectedService("all");
                }}
                className="reset-btn"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalogue;